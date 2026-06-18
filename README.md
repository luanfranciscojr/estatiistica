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

## Observacao de banco

O schema Prisma agora esta configurado para `MySQL`, como exigido no SDD. Para executar de ponta a ponta ainda e necessario apontar `DATABASE_URL` para uma instancia MySQL valida e aplicar as migrations quando a base estiver disponivel.
