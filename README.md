# Estatisticas SENIB

Base de arranque do V1 do sistema local de operacao e estatistica da SENIB.

## Objetivo

Construir um sistema local que use:

- MySQL local como base oficial operacional
- API da NIB apenas para autenticacao tecnica e importacao de rodadas e materias
- frontend consumindo somente o backend local

## Estado atual

O repositorio ainda nao possui aplicacao implementada. Neste ponto ele contem a especificacao consolidada e os artefatos tecnicos iniciais para iniciar o desenvolvimento com menos ambiguidade.

## Documentos principais

- [SDD consolidado](./SDD-e-Backlog-Tecnico.md)
- [Arquitetura inicial](./docs/architecture.md)
- [Modelo de dados](./docs/data-model.md)
- [Contratos de API](./docs/api-contracts.md)
- [Backlog do V1](./docs/backlog-v1.md)

## Diretrizes fechadas

- Login do usuario continua local com login e senha.
- Integracao com a NIB usa credencial tecnica separada no backend.
- Endpoint principal de importacao: `GET /v2/senib/rodada_materias`.
- O frontend nao acessa a NIB diretamente.
- O V1 ignora notas e itens avaliativos.
- O sistema deve suportar importacao da NIB e cadastro manual de rodada.

## Direcao de implementacao

1. Implementar backend com autenticacao local, autorizacao por perfil e integracao NIB.
2. Persistir rodada operacional local com origem `api_nib` ou `manual`.
3. Entregar painel operacional com contagem por sala e categoria.
4. Entregar dashboard consolidado somente com dados locais.
5. Entregar modulo administrativo de usuarios e auditoria minima.

## UI

Toda implementacao de UI futura neste projeto deve seguir obrigatoriamente estes skills:

- `ui-ux-pro-max`
- `frontend-design`
- `web-design-guidelines`

## Stack adotada

- backend: `NestJS`
- ORM e acesso ao banco: `Prisma`
- frontend: `React + Vite`

## Estrutura inicial

- `apps/api`: backend NestJS com `PrismaModule` e endpoint `GET /api/health`
- `apps/web`: frontend React + Vite com tela inicial de bootstrap
- `apps/api/prisma/schema.prisma`: schema inicial alinhado ao SDD

## Como rodar localmente

1. Instale as dependencias com `npm install`
2. Copie `apps/api/.env.example` para `apps/api/.env`
3. Suba o MySQL com `docker compose up -d`
4. Gere o client Prisma com `npm run prisma:generate`
5. Aplique as migrations no MySQL com `npm run prisma:migrate:dev`
6. Gere os dados iniciais com `npm run seed -w @estatisticas-senib/api`
7. Suba o backend com `npm run dev:api`
8. Suba o frontend com `npm run dev:web`

## Migration inicial

- Migration SQL inicial: [apps/api/prisma/migrations/20260611092000_init/migration.sql](/Users/luanfernandes/nib/nova-web/estatistica/apps/api/prisma/migrations/20260611092000_init/migration.sql)
- O arquivo foi gerado a partir do schema Prisma para MySQL e reduz o bloqueio de inicializacao do banco local.

## Preparar domingo e perfis por modulo

Administradores e usuarios de estatistica geral podem usar **Preparar domingo** para escolher uma data de domingo e criar os registros ausentes dos modulos selecionados. A preparacao preserva contagens e turnos encerrados. O SENIB exige uma rodada ativa com aulas na data.

No **Cadastro manual** do SENIB, informe as datas de domingo de cada materia antes de adicionar a sala. Novas rodadas criam contagens por aula, sem depender da importacao NIB. Em **Ver materias e aulas**, uma rodada manual aberta permite acrescentar datas. Contagens antigas, inclusive o consolidado legado, permanecem preservadas; nao sao redistribuidas automaticamente pelas novas aulas. Rodadas encerradas precisam ser reabertas para receber novas datas.

Em **Preparar domingo**, o card SENIB oferece **Criar aula em todas as materias** para rodadas ativas, manuais ou importadas da NIB. O botao adiciona a data selecionada ao calendario de todas as materias e cria apenas as contagens ausentes. Uma nova importacao da mesma materia preserva as datas ja cadastradas e suas contagens. Se varias materias dividirem a mesma sala e sessao, resolva o conflito no cadastro antes de preparar em lote.

Em **Usuarios**, os perfis `estatistica_culto`, `nova_teens`, `um_com_deus`, `nova_baby`, `nova_infantil` e `nova_kids` permitem consultar e lancar contagens apenas nos respectivos modulos. E possivel combinar perfis de modulo. Perfis gerais (`admin`, `estatistica`, `verdinho`, `pastor`) continuam dando acesso amplo conforme suas permissoes existentes; nao os atribua a quem deve ficar restrito a um modulo.

A migration `20260930120000_module_roles` adiciona e cadastra os novos perfis, sem precisar executar o seed em producao. O container da API ja executa `prisma migrate deploy` ao iniciar. Publique a API com a migration antes do frontend. Testes de permissoes: `npm run test:access -w @estatisticas-senib/api`.

## Nova Jovens

O modulo **Nova Jovens** tem um encontro por fim de semana. Em **Preparar domingo**, selecionar 04/10/2026 prepara o encontro de sabado 03/10/2026. Repetir a preparacao nao altera contagens, observacoes ou datas especiais existentes.

Em **Configuracao > Nova Jovens**, informe o domingo de referencia, a data real do encontro (alteravel para eventos especiais) e uma observacao opcional, como Acampamento. Para editar um encontro, selecione-o na lista. O relatorio busca total, observacao e data automaticamente pelo domingo de referencia, sem somar esse total aos cultos de domingo.

Em **Usuarios**, atribua o perfil `nova_jovens` para permitir consulta, lancamento, configuracao e preparacao apenas desse modulo. Esse perfil nao libera usuarios, relatorio geral nem outros modulos. Nao combine com perfis gerais se o acesso deve ser restrito.

Publique primeiro a API: a migration `20261001120000_nova_jovens` cria a tabela e cadastra a permissao, sem seed adicional. O container executa `prisma migrate deploy` ao iniciar. Depois publique o frontend. Testes de backend (apos build): `node --test apps/api/tests/*.test.cjs`. O teste de navegador `apps/web/tests/nova-jovens.cjs` usa API simulada e aceita `TEST_URL`, `PLAYWRIGHT_MODULE` e `CHROME_PATH`.

## Observacao de banco

O schema Prisma agora esta configurado para `MySQL`, como exigido no SDD. Para executar de ponta a ponta ainda e necessario apontar `DATABASE_URL` para uma instancia MySQL valida e aplicar as migrations quando a base estiver disponivel.
