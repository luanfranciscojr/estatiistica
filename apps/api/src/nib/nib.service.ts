import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type NormalizedRodadaMateria = {
  externalRodadaId: string;
  referencia: string;
  titulo: string;
  turno: string;
  sessaoSenib: number;
  externalId: string;
  materia: string;
  professores: string[];
  sala: string;
  local?: string;
  sessao?: string;
  status: string;
  ativa: boolean;
  datasAulas: string[];
};

type NibRawItem = Record<string, unknown>;

type RodadaResumo = {
  external_id: string;
  referencia: string;
  titulo: string;
  turno: string;
  sessoes_senib: number[];
  total_materias: number;
  available_aulas: string[];
  nib_rodada_id?: number;
};

type NibAlunoResumo = {
  id: string;
  matricula: string;
  nome: string;
  sessaoSenib: number | null;
  ativo: boolean;
};

type NibFonteDiagnostico = {
  fonte: 'rodada_materias_andamento' | 'rodada_materias' | 'alunos';
  endpoint: string;
  disponivel: boolean;
  total_itens: number;
  referencias: string[];
  sessoes_senib: number[];
  observacao?: string;
};

type V1Rodada = {
  id: number;
  referencia: string;
  inicio?: string;
  termino?: string;
};

type V1Materia = {
  id: number;
  materia: string;
  professor1: string;
  professor2: string;
  sala: string;
  matriculasRestritas: number;
  sessaoSenib: number;
};

type XmlItem = {
  attributes: Record<string, string>;
  text: string;
};

@Injectable()
export class NibService {
  private tokenCache?: {
    token: string;
    expiresAt: number;
  };

  private v1IgrejaCache?: {
    idIgreja: number;
    expiresAt: number;
  };

  constructor(private readonly configService: ConfigService) {}

  private buildUrl(path: string) {
    const baseUrl = this.configService.get<string>('NIB_BASE_URL');
    if (!baseUrl) {
      throw new UnauthorizedException('Base URL da NIB nao configurada.');
    }

    return this.joinUrl(baseUrl, path);
  }

  private buildV1Url(path: string) {
    const baseUrl = this.configService.get<string>('NIB_V1_BASE_URL');
    if (!baseUrl) {
      throw new UnauthorizedException('Base URL v1 da NIB nao configurada.');
    }

    return this.joinUrl(baseUrl, path);
  }

  private joinUrl(baseUrl: string, path: string) {
    const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${normalizedBase}${normalizedPath}`;
  }

  private withQuery(path: string, query: Record<string, string | number | undefined>) {
    const [pathname, existingQuery] = path.split('?');
    const params = new URLSearchParams(existingQuery ?? '');
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, String(value));
      }
    }

    const suffix = params.toString();
    return suffix ? `${pathname}?${suffix}` : pathname;
  }

  private hasV1Configured() {
    return Boolean(this.configService.get<string>('NIB_V1_BASE_URL'));
  }

  async getBearerToken() {
    if (this.tokenCache && this.tokenCache.expiresAt > Date.now()) {
      return this.tokenCache.token;
    }

    const matricula = this.configService.get<string>('NIB_MATRICULA');
    const senha = this.configService.get<string>('NIB_SENHA');
    const loginPath = this.configService.get<string>('NIB_LOGIN_PATH') ?? '/v2/login';

    if (!matricula || !senha) {
      throw new UnauthorizedException('Credenciais tecnicas da NIB nao configuradas.');
    }

    const response = await fetch(this.buildUrl(loginPath), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ usuario: matricula, senha }),
    });

    if (!response.ok) {
      const responseText = await response.text();
      throw new UnauthorizedException(
        `Falha ao autenticar tecnicamente na NIB (${response.status}). ${responseText || 'Sem detalhes.'}`,
      );
    }

    const payload = (await response.json()) as Record<string, unknown>;
    const token = String(payload.access_token ?? payload.token ?? payload.bearerToken ?? '');
    if (!token) {
      throw new UnauthorizedException('Resposta da NIB sem bearer token utilizavel.');
    }

    const expiresInSeconds = Number(payload.expires_in ?? 3600);
    this.tokenCache = {
      token,
      expiresAt: Date.now() + expiresInSeconds * 1000 - 10_000,
    };

    return token;
  }

  async getRodadaMaterias(): Promise<NormalizedRodadaMateria[]> {
    const rodadaMateriasPath =
      this.configService.get<string>('NIB_RODADA_MATERIAS_PATH') ?? '/v2/senib/rodada_materias';
    return this.fetchRodadaItems(this.withQuery(rodadaMateriasPath, { limit: 1000 }));
  }

  async getRodadaMateriasByRodadaId(rodadaId: number): Promise<NormalizedRodadaMateria[]> {
    if (this.hasV1Configured()) {
      return this.getRodadaStructureByV1Id(rodadaId);
    }

    const rodadaMateriasPath =
      this.configService.get<string>('NIB_RODADA_MATERIAS_PATH') ?? '/v2/senib/rodada_materias';

    return this.fetchRodadaItems(
      this.withQuery(rodadaMateriasPath, {
        q: JSON.stringify({ id_rodada: rodadaId }),
        limit: 1000,
      }),
    );
  }

  async getRodadaMateriasAndamento(): Promise<NormalizedRodadaMateria[]> {
    const rodadaMateriasAndamentoPath =
      this.configService.get<string>('NIB_RODADA_MATERIAS_ANDAMENTO_PATH') ??
      '/v2/senib/rodada_materias_andamento';
    return this.fetchRodadaItems(rodadaMateriasAndamentoPath);
  }

  private async fetchRodadaItems(path: string): Promise<NormalizedRodadaMateria[]> {
    const items = await this.fetchRawItems(path);
    return items.map((item) => this.normalize(item));
  }

  private async fetchRawItems(path: string): Promise<NibRawItem[]> {
    const token = await this.getBearerToken();
    const response = await fetch(this.buildUrl(path), {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      this.tokenCache = undefined;
      return this.fetchRawItems(path);
    }

    if (!response.ok) {
      const responseText = await response.text();
      throw new Error(
        `Falha ao consultar dados da NIB (${response.status}). ${responseText || 'Sem detalhes.'}`,
      );
    }

    const payload = await response.json();
    const items = Array.isArray(payload)
      ? payload
      : Array.isArray((payload as { data?: unknown[] }).data)
        ? (payload as { data: unknown[] }).data
        : [];
    return items as NibRawItem[];
  }

  private async fetchV1Text(path: string, init?: RequestInit) {
    const response = await fetch(this.buildV1Url(path), init);
    if (!response.ok) {
      const responseText = await response.text();
      throw new Error(
        `Falha ao consultar dados da NIB v1 (${response.status}). ${responseText || 'Sem detalhes.'}`,
      );
    }

    const buffer = await response.arrayBuffer();
    return new TextDecoder('latin1').decode(buffer);
  }

  private async resolveV1IgrejaId() {
    const configured = Number(this.configService.get<string>('NIB_V1_ID_IGREJA') ?? 0);
    if (configured > 0) {
      return configured;
    }

    if (this.v1IgrejaCache && this.v1IgrejaCache.expiresAt > Date.now()) {
      return this.v1IgrejaCache.idIgreja;
    }

    const usuario =
      this.configService.get<string>('NIB_V1_EMAIL')?.trim() ??
      'matricula@ntb.org.br';
    const senha =
      this.configService.get<string>('NIB_V1_SENHA') ??
      this.configService.get<string>('NIB_SENHA') ??
      'admin@NIB$';
    const authPath = this.configService.get<string>('NIB_V1_AUTH_PATH') ?? '/autenticar.php';

    if (!usuario || !senha) {
      throw new UnauthorizedException('Credenciais tecnicas da NIB v1 nao configuradas.');
    }

    const body = new URLSearchParams({
      tx_email: usuario,
      tx_senha: senha,
    });

    const response = await this.fetchV1Text(authPath, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
    });

    const match = response.match(/^OK;(\d+);(\d+);(\d+);/);
    if (!match) {
      throw new UnauthorizedException(
        `Falha ao autenticar tecnicamente na NIB v1. Resposta: ${response || 'Sem detalhes.'}`,
      );
    }

    const idIgreja = Number(match[3]);
    this.v1IgrejaCache = {
      idIgreja,
      expiresAt: Date.now() + 60 * 60 * 1000,
    };

    return idIgreja;
  }

  private parseXmlItems(xml: string) {
    const items: XmlItem[] = [];
    const regex = /<item\b([^>]*)>(.*?)<\/item>/gms;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(xml)) !== null) {
      items.push({
        attributes: this.parseXmlAttributes(match[1] ?? ''),
        text: this.decodeXmlText(match[2] ?? ''),
      });
    }

    return items;
  }

  private parseXmlAttributes(source: string) {
    const attributes: Record<string, string> = {};
    const regex = /(\w+)="([^"]*)"/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(source)) !== null) {
      attributes[match[1]] = this.decodeXmlText(match[2] ?? '');
    }

    return attributes;
  }

  private decodeXmlText(value: string) {
    return value
      .replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .trim();
  }

  private async getV1Rodadas() {
    const idIgreja = await this.resolveV1IgrejaId();
    const rodadaPath =
      this.configService.get<string>('NIB_V1_RODADAS_PATH') ?? '/senib/rodada_consultar.php';
    const xml = await this.fetchV1Text(this.withQuery(rodadaPath, { id_igreja: idIgreja }));

    return this.parseXmlItems(xml).map((item) => ({
      id: Number(item.attributes.id ?? 0),
      referencia: item.text,
      inicio: item.attributes.inicio,
      termino: item.attributes.termino,
    }));
  }

  private async getV1MateriasByRodadaId(rodadaId: number) {
    const materiasPath =
      this.configService.get<string>('NIB_V1_MATERIAS_PATH') ??
      '/senib/rodada_materia_consultar.php';
    const sessions = [1, 2];
    const batches = await Promise.all(
      sessions.map(async (sessaoSenib) => {
        const xml = await this.fetchV1Text(
          this.withQuery(materiasPath, {
            id_rodada: rodadaId,
            nb_sessao_senib: sessaoSenib,
          }),
        );

        return this.parseXmlItems(xml).map((item) => ({
          id: Number(item.attributes.id ?? 0),
          materia: item.text,
          professor1: item.attributes.professor1 ?? '',
          professor2: item.attributes.professor2 ?? '',
          sala: item.attributes.sala ?? '',
          matriculasRestritas: Number(item.attributes.matriculas_restritas ?? 0),
          sessaoSenib,
        }));
      }),
    );

    return batches.flat();
  }

  private async getV1AulasByMateriaId(idRodadaMateria: number) {
    const aulasPath =
      this.configService.get<string>('NIB_V1_AULAS_PATH') ??
      '/senib/rodada_materia_aula_consultar.php';
    const xml = await this.fetchV1Text(
      this.withQuery(aulasPath, { id_rodada_materia: idRodadaMateria }),
    );

    return this.parseXmlItems(xml)
      .map((item) => item.text)
      .filter(Boolean)
      .sort((left, right) => this.compareAulaDates(left, right));
  }

  private buildRodadaResumoFromItems(
    items: NormalizedRodadaMateria[],
    overrides?: Partial<RodadaResumo>,
  ): RodadaResumo | null {
    if (items.length === 0 && !overrides?.external_id) {
      return null;
    }

    if (items.length === 0) {
      return {
        external_id: overrides?.external_id ?? '',
        referencia: overrides?.referencia ?? '',
        titulo: overrides?.titulo ?? overrides?.referencia ?? '',
        turno: overrides?.turno ?? 'indefinido',
        sessoes_senib: overrides?.sessoes_senib ?? [],
        total_materias: overrides?.total_materias ?? 0,
        available_aulas: overrides?.available_aulas ?? [],
        nib_rodada_id: overrides?.nib_rodada_id,
      };
    }

    const first = items[0];
    return {
      external_id: first.externalRodadaId,
      referencia: first.referencia,
      titulo: first.titulo,
      turno: first.turno,
      sessoes_senib: [...new Set(items.map((item) => item.sessaoSenib))].sort((a, b) => a - b),
      total_materias: items.length,
      available_aulas: [...new Set(items.flatMap((item) => item.datasAulas))].sort((a, b) =>
        this.compareAulaDates(a, b),
      ),
      nib_rodada_id: overrides?.nib_rodada_id,
    };
  }

  private async getRodadaStructureByV1Id(rodadaId: number) {
    const rodadas = await this.getV1Rodadas();
    const rodada = rodadas.find((item) => item.id === rodadaId);
    const materias = await this.getV1MateriasByRodadaId(rodadaId);

    const aulasByMateria = await Promise.all(
      materias.map(async (materia) => ({
        materiaId: materia.id,
        aulas: await this.getV1AulasByMateriaId(materia.id),
      })),
    );

    const aulaMap = new Map(aulasByMateria.map((item) => [item.materiaId, item.aulas]));
    const referencia = rodada?.referencia ?? String(rodadaId);
    const latestReference = rodadas[0]?.referencia ?? referencia;

    return materias.map((materia) => ({
      externalRodadaId: referencia,
      referencia,
      titulo: referencia,
      turno: 'indefinido',
      sessaoSenib: materia.sessaoSenib,
      externalId: String(materia.id),
      materia: materia.materia,
      professores: [materia.professor1, materia.professor2].filter(Boolean),
      sala: materia.sala || 'Sem sala',
      local: materia.sala || 'Sem sala',
      sessao: `${materia.sessaoSenib}º SENIB`,
      status: referencia === latestReference ? 'EM ANDAMENTO' : 'ENCERRADA',
      ativa: referencia === latestReference,
      datasAulas: aulaMap.get(materia.id) ?? [],
    }));
  }

  async getAlunos(): Promise<NibAlunoResumo[]> {
    const alunosPath = this.withQuery('/v2/senib/alunos', { limit: 1000 });
    const items = await this.fetchRawItems(alunosPath);

    return items.map((raw) => ({
      id: String(raw.id_aluno ?? raw.id ?? ''),
      matricula: String(raw.tx_matricula ?? raw.matricula ?? ''),
      nome: String(raw.tx_aluno ?? raw.nome ?? raw.tx_nome ?? 'Aluno'),
      sessaoSenib:
        raw.nb_sessao_senib === null || raw.nb_sessao_senib === undefined
          ? null
          : Number(raw.nb_sessao_senib),
      ativo: Boolean(raw.nb_ativo ?? raw.ativo ?? false),
    }));
  }

  async getEligibleGroupedRodadas() {
    const andamentoItems = await this.getRodadaMateriasAndamento();
    const historicoItems = await this.getRodadaMaterias();
    const items = this.mergeRodadaItems(andamentoItems, historicoItems);
    const elegiveis = items.filter(
      (item) =>
        item.ativa &&
        ['aberta', 'ativo', 'ativa', 'open', 'em andamento'].includes(
          item.status.toLowerCase(),
        ),
    );

    const grouped = this.groupRodadaItems(elegiveis);
    return {
      rodadas: grouped.rodadas,
      items: grouped.items,
    };
  }

  async getAvailableGroupedRodadas() {
    if (this.hasV1Configured()) {
      const rodadas = await this.getV1Rodadas();
      return {
        rodadas: rodadas.map((rodada) => ({
          external_id: rodada.referencia,
          referencia: rodada.referencia,
          titulo: rodada.referencia,
          turno: 'indefinido',
          sessoes_senib: [],
          total_materias: 0,
          available_aulas: [],
          nib_rodada_id: rodada.id,
        })),
        items: [] as NormalizedRodadaMateria[],
      };
    }

    const andamentoItems = await this.getRodadaMateriasAndamento();
    const historicoItems = await this.getRodadaMaterias();
    const items = this.mergeRodadaItems(andamentoItems, historicoItems);

    return this.groupRodadaItems(items);
  }

  async inspectRodadaByReference(referencia: string) {
    if (this.hasV1Configured()) {
      const rodadas = await this.getV1Rodadas();
      const rodadaV1 = rodadas.find((item) => item.referencia === referencia);
      if (!rodadaV1) {
        return {
          referencia,
          rodada: null,
          items: [],
        };
      }

      const items = await this.getRodadaStructureByV1Id(rodadaV1.id);
      return {
        referencia,
        rodada:
          this.buildRodadaResumoFromItems(items, {
            external_id: referencia,
            referencia,
            titulo: referencia,
            nib_rodada_id: rodadaV1.id,
          }) ?? null,
        items,
      };
    }

    const { items } = await this.getAvailableGroupedRodadas();
    const selectedItems = items.filter((item) => item.referencia === referencia);
    const grouped = this.groupRodadaItems(selectedItems);

    return {
      referencia,
      rodada: grouped.rodadas[0] ?? null,
      items: grouped.items,
    };
  }

  async inspectRodadaById(rodadaId: number) {
    const items = await this.getRodadaMateriasByRodadaId(rodadaId);
    const grouped = this.groupRodadaItems(items);
    const rodada =
      this.buildRodadaResumoFromItems(grouped.items, {
        external_id: grouped.rodadas[0]?.external_id ?? String(rodadaId),
        referencia: grouped.rodadas[0]?.referencia ?? String(rodadaId),
        titulo: grouped.rodadas[0]?.titulo ?? String(rodadaId),
        nib_rodada_id: rodadaId,
      }) ?? null;

    return {
      rodadaId,
      rodada,
      items: grouped.items,
    };
  }

  async getSourceDiagnostics() {
    const [andamentoItems, rodadaItems, alunos] = await Promise.all([
      this.getRodadaMateriasAndamento(),
      this.getRodadaMaterias(),
      this.getAlunos(),
    ]);
    const rodadaAtual = [...andamentoItems].sort((a, b) =>
      this.compareRodadaReferences(a.referencia, b.referencia),
    )[0];
    const rodadaAtualItems = rodadaAtual
      ? andamentoItems.filter((item) => item.referencia === rodadaAtual.referencia)
      : [];

    const fontes: NibFonteDiagnostico[] = [
      this.buildRodadaDiagnostic(
        'rodada_materias_andamento',
        this.configService.get<string>('NIB_RODADA_MATERIAS_ANDAMENTO_PATH') ??
          '/v2/senib/rodada_materias_andamento',
        andamentoItems,
        'Melhor fonte v2 para detectar rodada em andamento e aulas disponiveis.',
      ),
      this.buildRodadaDiagnostic(
        'rodada_materias',
        this.withQuery(
          this.configService.get<string>('NIB_RODADA_MATERIAS_PATH') ??
            '/v2/senib/rodada_materias',
          { limit: 1000 },
        ),
        rodadaItems,
        this.hasV1Configured()
          ? 'Fonte complementar da v2. A estrutura de rodadas/materias/aulas prioriza a v1 quando configurada.'
          : 'Fonte complementar. No legado ela costuma retornar historico associado ao usuario autenticado.',
      ),
      {
        fonte: 'alunos',
        endpoint: this.withQuery('/v2/senib/alunos', { limit: 1000 }),
        disponivel: alunos.length > 0,
        total_itens: alunos.length,
        referencias: [],
        sessoes_senib: [
          ...new Set(
            alunos
              .map((item) => item.sessaoSenib)
              .filter((item): item is number => typeof item === 'number' && item > 0),
          ),
        ].sort((a, b) => a - b),
        observacao:
          'Endpoint administrativo de alunos. Ajuda em conferencia por sessao, mas nao entrega materias/aulas da rodada.',
      },
    ];

    return {
      melhor_fonte_importacao: andamentoItems.length
        ? 'rodada_materias_andamento'
        : rodadaItems.length
          ? 'rodada_materias'
          : null,
      rodada_em_andamento: rodadaAtual
        ? {
            referencia: rodadaAtual.referencia,
            titulo: rodadaAtual.titulo,
            sessoes_senib: [...new Set(rodadaAtualItems.map((item) => item.sessaoSenib))].sort(
              (a, b) => a - b,
            ),
            total_materias: rodadaAtualItems.length,
          }
        : null,
      fontes,
    };
  }

  private buildRodadaDiagnostic(
    fonte: NibFonteDiagnostico['fonte'],
    endpoint: string,
    items: NormalizedRodadaMateria[],
    observacao?: string,
  ): NibFonteDiagnostico {
    return {
      fonte,
      endpoint,
      disponivel: items.length > 0,
      total_itens: items.length,
      referencias: [...new Set(items.map((item) => item.referencia))]
        .sort((a, b) => this.compareRodadaReferences(a, b))
        .slice(0, 8),
      sessoes_senib: [...new Set(items.map((item) => item.sessaoSenib))].sort((a, b) => a - b),
      observacao,
    };
  }

  private groupRodadaItems(items: NormalizedRodadaMateria[]) {
    const grouped = new Map<string, RodadaResumo>();

    for (const item of items) {
      if (!grouped.has(item.externalRodadaId)) {
        grouped.set(item.externalRodadaId, {
          external_id: item.externalRodadaId,
          referencia: item.referencia,
          titulo: item.titulo,
          turno: item.turno,
          sessoes_senib: [],
          total_materias: 0,
          available_aulas: [],
        });
      }

      const registro = grouped.get(item.externalRodadaId)!;
      registro.total_materias += 1;
      if (!registro.sessoes_senib.includes(item.sessaoSenib)) {
        registro.sessoes_senib.push(item.sessaoSenib);
        registro.sessoes_senib.sort((a, b) => a - b);
      }
      for (const aula of item.datasAulas) {
        if (!registro.available_aulas.includes(aula)) {
          registro.available_aulas.push(aula);
        }
      }
    }

    const rodadas = [...grouped.values()].sort((a, b) =>
      this.compareRodadaReferences(a.referencia, b.referencia),
    );
    for (const rodada of rodadas) {
      rodada.available_aulas.sort((a, b) => this.compareAulaDates(a, b));
    }

    const sortedItems = [...items].sort((a, b) => {
      const byRodada = this.compareRodadaReferences(a.referencia, b.referencia);
      if (byRodada !== 0) return byRodada;

      const bySessao = a.sessaoSenib - b.sessaoSenib;
      if (bySessao !== 0) return bySessao;

      return a.materia.localeCompare(b.materia, 'pt-BR');
    });

    return {
      rodadas,
      items: sortedItems,
    };
  }

  private mergeRodadaItems(
    primary: NormalizedRodadaMateria[],
    secondary: NormalizedRodadaMateria[],
  ) {
    const merged = new Map<string, NormalizedRodadaMateria>();

    for (const item of [...primary, ...secondary]) {
      const key =
        item.externalId ||
        `${item.externalRodadaId}:${item.sessaoSenib}:${item.materia}:${item.sala}`;
      const existing = merged.get(key);

      if (!existing) {
        merged.set(key, item);
        continue;
      }

      merged.set(key, {
        ...existing,
        ativa: existing.ativa || item.ativa,
        status:
          existing.status.toLowerCase() === 'encerrada' && item.status
            ? item.status
            : existing.status,
        datasAulas: [...new Set([...existing.datasAulas, ...item.datasAulas])].sort((a, b) =>
          this.compareAulaDates(a, b),
        ),
      });
    }

    return [...merged.values()];
  }

  private compareRodadaReferences(left: string, right: string) {
    const leftMeta = this.parseRodadaReference(left);
    const rightMeta = this.parseRodadaReference(right);

    if (leftMeta.year !== rightMeta.year) {
      return rightMeta.year - leftMeta.year;
    }

    if (leftMeta.numericSegment !== rightMeta.numericSegment) {
      return leftMeta.numericSegment ? -1 : 1;
    }

    if (leftMeta.numericValue !== rightMeta.numericValue) {
      return rightMeta.numericValue - leftMeta.numericValue;
    }

    return left.localeCompare(right, 'pt-BR');
  }

  private parseRodadaReference(value: string) {
    const match = value.match(/^(\d{4})\/(.+)$/);
    const year = match ? Number(match[1]) : 0;
    const segment = match ? match[2].trim() : value.trim();
    const numericMatch = segment.match(/^(\d+)$/);

    return {
      year,
      numericSegment: Boolean(numericMatch),
      numericValue: numericMatch ? Number(numericMatch[1]) : -1,
    };
  }

  private compareAulaDates(left: string, right: string) {
    const leftParts = left.split('/');
    const rightParts = right.split('/');
    if (leftParts.length === 3 && rightParts.length === 3) {
      const leftDate = new Date(`${leftParts[2]}-${leftParts[1]}-${leftParts[0]}`).getTime();
      const rightDate = new Date(`${rightParts[2]}-${rightParts[1]}-${rightParts[0]}`).getTime();
      return leftDate - rightDate;
    }

    return left.localeCompare(right, 'pt-BR');
  }

  private normalize(raw: NibRawItem): NormalizedRodadaMateria {
    const status = String(raw.status ?? raw.situacao ?? raw.tx_situacao ?? 'aberta');
    const sessaoText = String(raw.tx_sessao_senib ?? raw.sessao ?? '');
    const sessaoMatch = sessaoText.match(/\d+/);
    const professor1 = String(raw.tx_professor1 ?? raw.professor ?? raw.docente ?? '').trim();
    const professor2 = String(raw.tx_professor2 ?? '').trim();
    const referencia = String(
      raw.rodada_referencia ??
        raw.referencia ??
        raw.nome_rodada ??
        raw.tx_rodada ??
        'Sem referencia',
    );
    const local = String(
      raw.local ?? raw.tx_local ?? raw.sala ?? raw.local_sala ?? raw.codigo_sala ?? 'Sem sala',
    );

    return {
      externalRodadaId: String(
        raw.rodada_id ?? raw.id_rodada ?? raw.rodadaId ?? raw.rodada ?? raw.tx_rodada ?? referencia,
      ),
      referencia,
      titulo: String(
        raw.rodada_titulo ?? raw.titulo ?? raw.nome_rodada ?? raw.tx_rodada ?? 'Rodada',
      ),
      turno: String(raw.turno ?? raw.sessao_turno ?? 'indefinido'),
      sessaoSenib: Number(
        raw.nb_sessao_senib ?? raw.sessao_senib ?? raw.nb_sessao ?? sessaoMatch?.[0] ?? 1,
      ),
      externalId: String(
        raw.rodada_materia_id ?? raw.id_rodada_materia ?? raw.id ?? raw.id_externo ?? '',
      ),
      materia: String(raw.materia ?? raw.nome_materia ?? raw.tx_materia ?? 'Materia'),
      professores: Array.isArray(raw.professores)
        ? raw.professores.map(String)
        : [professor1, professor2].filter(Boolean),
      sala: local,
      local,
      sessao: raw.sessao ? String(raw.sessao) : sessaoText || undefined,
      status,
      ativa: Boolean(
        raw.ativa ??
          raw.ativo ??
          ['aberta', 'ativo', 'ativa', 'open', 'em andamento'].includes(status.toLowerCase()),
      ),
      datasAulas: Array.isArray(raw.datas_aulas)
        ? raw.datas_aulas.map(String)
        : Array.isArray(raw.aulas)
          ? raw.aulas
              .map((item) => {
                if (item && typeof item === 'object' && 'dt_aula' in item) {
                  return String((item as { dt_aula?: unknown }).dt_aula ?? '');
                }
                return String(item);
              })
              .filter(Boolean)
          : [],
    };
  }
}
