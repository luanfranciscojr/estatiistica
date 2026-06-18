# Arquitetura Inicial do V1

## Visao geral

O V1 sera uma aplicacao local com backend como centro das regras de negocio. A API da NIB sera usada somente para autenticacao tecnica e importacao academica.

```text
Frontend local
  -> Backend local
      -> MySQL local
      -> API NIB
```

## Principios

- O backend e a unica camada autorizada a acessar a NIB.
- O MySQL local e a fonte oficial para operacao, dashboard, historico e auditoria.
- A importacao nao pode sobrescrever dados locais silenciosamente.
- Falha na NIB nao pode bloquear a operacao manual do sistema.

## Modulos do backend

### 1. Autenticacao local

Responsabilidades:

- login e logout
- sessao autenticada
- recuperacao do usuario atual
- autorizacao por perfil

Perfis:

- `admin`
- `estatistica`
- `verdinho`
- `pastor`

### 2. Integracao NIB

Responsabilidades:

- autenticar com `POST /v2/login`
- armazenar bearer token em cache
- renovar token por expiracao ou falha `401`
- consumir `GET /v2/senib/rodada_materias`
- normalizar resposta da NIB para formato interno

### 3. Preparacao de rodada

Responsabilidades:

- listar rodadas elegiveis da NIB
- decidir entre `importacao_direta` e `selecao_necessaria`
- importar rodada selecionada
- cadastrar rodada manual
- marcar rodada operacional ativa
- impedir duplicidade e sobrescrita silenciosa

### 4. Painel operacional

Responsabilidades:

- consultar rodada ativa
- listar salas e materias da rodada
- registrar contagens por categoria
- recalcular total por sala e total geral
- bloquear contagem negativa

Categorias obrigatorias:

- `alunos`
- `verdinhos`
- `amarelinhos`
- `professor`

### 5. Dashboard

Responsabilidades:

- ultima rodada
- media por rodada
- media geral
- ranking de salas
- composicao de presenca
- filtros por turno

### 6. Usuarios

Responsabilidades:

- listar usuarios
- criar usuario
- alterar senha
- ativar e desativar
- ajustar perfis

Restricao:

- modulo disponivel apenas para `admin`

### 7. Auditoria

Eventos minimos:

- login
- logout
- importacao da NIB
- criacao de rodada manual
- troca de rodada ativa
- alteracao de usuario
- alteracao de contagem

## Fluxos principais

### Fluxo 1. Login local

1. Usuario informa login e senha.
2. Backend valida credenciais locais.
3. Backend cria sessao e devolve perfil e permissoes.
4. Frontend redireciona para modulo permitido.

### Fluxo 2. Importacao de rodada da NIB

1. Frontend solicita rodadas elegiveis.
2. Backend autentica tecnicamente na NIB se necessario.
3. Backend busca `rodada_materias`.
4. Backend filtra somente materias abertas e ativas.
5. Backend agrupa por rodada.
6. Backend responde:
7. `importacao_direta` quando existir uma rodada elegivel.
8. `selecao_necessaria` quando existir mais de uma rodada elegivel.
9. Backend importa a rodada confirmada e a marca como ativa quando apropriado.

### Fluxo 3. Cadastro manual de rodada

1. Operador informa rodada, turno, salas, materias e professores.
2. Backend valida estrutura e duplicidade.
3. Backend persiste rodada com origem `manual`.
4. Backend permite ativacao da rodada operacional.

### Fluxo 4. Operacao de contagem

1. Frontend consulta a rodada ativa.
2. Operador incrementa ou decrementa categorias por sala.
3. Backend persiste o evento.
4. Backend recalcula e devolve totais consolidados.
5. Backend rejeita valores negativos.

## Decisoes tecnicas abertas

Estas decisoes ainda precisam ser fechadas antes da implementacao do codigo:

- framework do backend
- framework do frontend
- estrategia de sessao: cookie server-side ou JWT com cookie `httpOnly`
- ORM ou acesso SQL direto
- estrategia de migracao de schema no MySQL existente
- forma de execucao local e deploy operacional

## Recomendacao de arranque

Para iniciar com menor risco:

1. backend HTTP com camadas `auth`, `nib`, `rodadas`, `contagens`, `dashboard`, `usuarios`
2. migrations incrementais para o MySQL existente
3. frontend separado consumindo apenas a API local
4. testes integrados cobrindo importacao, rodada ativa e contagens
