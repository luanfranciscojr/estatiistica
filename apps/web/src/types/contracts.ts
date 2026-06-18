export const roleOptions = ['admin', 'estatistica', 'verdinho', 'pastor'] as const;
export const operationOptions = ['senib', 'culto', 'nova_teens'] as const;

export const categoryLabels = [
  ['alunos', 'Alunos'],
  ['verdinhos', 'Verdinhos'],
  ['amarelinhos', 'Amarelinhos'],
  ['professor', 'Professor'],
] as const;

export type AppTab = 'painel' | 'configuracao' | 'dashboard' | 'usuarios';
export type OperationMode = (typeof operationOptions)[number];

export type SessionUser = {
  id: number;
  nome: string;
  login: string;
  roles: string[];
};

export type SessionPayload = {
  authenticated: boolean;
  user: SessionUser | null;
};

export type DashboardPayload = {
  ultima_rodada: {
    rodada_id: number;
    referencia: string;
    total_presenca: number;
    sessao_senib: number | null;
  } | null;
  media_por_rodada: number;
  media_geral: number;
  aulas_disponiveis: string[];
  aula_atual: string | null;
  ranking_salas: Array<{ sala: string; media: number }>;
  ranking_materias: Array<{ materia: string; media: number }>;
  composicao_presenca: Record<string, number>;
  historico: Array<{
    rodada_id: number;
    referencia: string;
    sessao_senib: number | null;
    total_presenca: number;
    data: string;
  }>;
};

export type CultoPainelPayload = {
  data_atual: string | null;
  datas_disponiveis: string[];
  cultos: Array<{
    id: number;
    ordem: number;
    nome: string;
    total: number;
    status: string;
  }>;
  total_geral: number;
};

export type CultoDatasPayload = {
  items: Array<{
    data_referencia: string;
    total_geral: number;
    status: string;
  }>;
};

export type CultoDashboardPayload = {
  ultima_leitura: {
    data_referencia: string;
    total_geral: number;
    cultos: Array<{
      ordem: number;
      nome: string;
      total: number;
    }>;
  } | null;
  media_por_culto: number;
  media_geral: number;
  pico: number;
  datas_disponiveis: string[];
  data_atual: string | null;
  comparativo_cultos: Array<{
    ordem: number;
    nome: string;
    media: number;
    ultimo_total: number;
  }>;
  historico: Array<{
    data_referencia: string;
    total_geral: number;
    cultos: Array<{
      ordem: number;
      nome: string;
      total: number;
    }>;
  }>;
};

export type NovaTeensPainelPayload = {
  data_atual: string | null;
  datas_disponiveis: string[];
  encontros: Array<{
    id: number;
    ordem: number;
    nome: string;
    teens: number;
    lideres: number;
    total: number;
    status: string;
  }>;
  total_geral: number;
};

export type NovaTeensDatasPayload = {
  items: Array<{
    data_referencia: string;
    total_geral: number;
    status: string;
  }>;
};

export type NovaTeensDashboardPayload = {
  ultima_leitura: {
    data_referencia: string;
    total_geral: number;
    encontros: Array<{
      ordem: number;
      nome: string;
      teens: number;
      lideres: number;
      total: number;
    }>;
  } | null;
  media_por_encontro: number;
  media_geral: number;
  pico: number;
  datas_disponiveis: string[];
  data_atual: string | null;
  comparativo_encontros: Array<{
    ordem: number;
    nome: string;
    media_total: number;
    media_teens: number;
    media_lideres: number;
    ultimo_total: number;
  }>;
  historico: Array<{
    data_referencia: string;
    total_geral: number;
    encontros: Array<{
      ordem: number;
      nome: string;
      teens: number;
      lideres: number;
      total: number;
    }>;
  }>;
};

export type PainelPayload = {
  rodada: {
    id: number;
    referencia: string;
    titulo?: string | null;
    origem: string;
    status: string;
    ativa?: boolean;
  } | null;
  sessoes_disponiveis: number[];
  sessao_atual: number | null;
  aulas_disponiveis: string[];
  aula_atual: string | null;
  salas: Array<{
    sala_id: number;
    contagem_id: number | null;
    codigo: string;
    nome: string;
    local: string | null;
    sessao_senib: number;
    materias: Array<{
      id: number;
      materia: string;
      sessao_senib: number;
      professores: string[];
    }>;
    total: number;
    contagens: Record<string, number>;
  }>;
  total_geral: number;
};

export type UsersPayload = {
  items: Array<{
    id: number;
    nome: string;
    login: string;
    ativo: boolean;
    roles: string[];
  }>;
};

export type RodadasPayload = {
  items: Array<{
    id: number;
    referencia: string;
    titulo: string | null;
    origem: string;
    status: string;
    ativa: boolean;
    sessoes_senib: number[];
    created_at: string;
    total_salas: number;
    total_materias: number;
    total_presenca: number;
  }>;
};

export type RodadaDetailPayload = {
  rodada: {
    id: number;
    referencia: string;
    titulo: string | null;
    origem: string;
    status: string;
    ativa: boolean;
    sessoes_senib: number[];
    salas: Array<{
      id: number;
      codigo: string;
      nome: string;
      local: string | null;
      sessao_senib: number;
      contagem: {
        id: number;
        alunos: number;
        verdinhos: number;
        amarelinhos: number;
        professor: number;
        total: number;
      } | null;
      materias: Array<{
        id: number;
        external_id: string | null;
        materia: string;
        local: string | null;
        sessao_senib: number;
        sessao: string | null;
        professores: string[];
      }>;
    }>;
  };
};

export type ImportacoesRecentesPayload = {
  items: Array<{
    id: number;
    fonte: string;
    external_reference: string | null;
    status: string;
    erro: string | null;
    created_at: string;
  }>;
};

export type ImportacaoElegivelPayload =
  | {
      tipo: 'importacao_direta';
      rodada: {
        external_id: string;
        referencia: string;
        titulo: string;
        sessoes_senib: number[];
        total_materias: number;
        available_aulas: string[];
        nib_rodada_id?: number;
      };
    }
  | {
      tipo: 'selecao_necessaria';
      rodadas: Array<{
        external_id: string;
        referencia: string;
        titulo: string;
        sessoes_senib: number[];
        total_materias: number;
        available_aulas: string[];
        nib_rodada_id?: number;
      }>;
    };

export type NibDiagnosticoPayload = {
  melhor_fonte_importacao: 'rodada_materias_andamento' | 'rodada_materias' | null;
  rodada_em_andamento: {
    referencia: string;
    titulo: string;
    sessoes_senib: number[];
    total_materias: number;
  } | null;
  fontes: Array<{
    fonte: 'rodada_materias_andamento' | 'rodada_materias' | 'alunos';
    endpoint: string;
    disponivel: boolean;
    total_itens: number;
    referencias: string[];
    sessoes_senib: number[];
    observacao?: string;
  }>;
};

export type NibRodadaByIdPayload = {
  rodadaId: number;
  rodada: {
    external_id: string;
    referencia: string;
    titulo: string;
    turno: string;
    sessoes_senib: number[];
    total_materias: number;
    available_aulas: string[];
    nib_rodada_id?: number;
  } | null;
  items: Array<{
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
  }>;
};

export type NibRodadasDisponiveisPayload = {
  rodadas: Array<{
    external_id: string;
    referencia: string;
    titulo: string;
    turno: string;
    sessoes_senib: number[];
    total_materias: number;
    available_aulas: string[];
    nib_rodada_id?: number;
  }>;
};

export type NibRodadaByReferencePayload = {
  referencia: string;
  rodada: {
    external_id: string;
    referencia: string;
    titulo: string;
    turno: string;
    sessoes_senib: number[];
    total_materias: number;
    available_aulas: string[];
    nib_rodada_id?: number;
  } | null;
  items: Array<{
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
  }>;
};

export type ParserPreviewPayload = {
  preview: Array<{
    sala: string;
    contagens: Record<string, number | undefined>;
  }>;
  requer_confirmacao: boolean;
};
