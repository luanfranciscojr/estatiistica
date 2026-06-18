# Modelo de Dados Local

## Objetivo

Definir a estrutura minima local para sustentar o V1 sem depender da NIB em tempo real.

## Entidades

### `users`

Campos minimos:

- `id`
- `login`
- `password_hash`
- `nome`
- `ativo`
- `created_at`
- `updated_at`

Regras:

- `login` unico
- usuario inativo nao autentica

### `roles`

Campos minimos:

- `id`
- `code`
- `nome`

Valores esperados:

- `admin`
- `estatistica`
- `verdinho`
- `pastor`

### `user_roles`

Campos minimos:

- `user_id`
- `role_id`

Regra:

- chave unica composta por `user_id` e `role_id`

### `rodadas`

Campos minimos:

- `id`
- `external_id`
- `referencia`
- `titulo`
- `turno`
- `origem`
- `status`
- `ativa`
- `data_inicio`
- `data_fim`
- `imported_at`
- `created_by_user_id`
- `created_at`
- `updated_at`

Valores relevantes:

- `origem`: `api_nib` ou `manual`
- `status`: `rascunho`, `ativa`, `encerrada`, `bloqueada`

Regras:

- somente uma rodada pode estar `ativa = true`
- `external_id` opcional para rodadas manuais

### `rodada_materias`

Campos minimos:

- `id`
- `rodada_id`
- `external_id`
- `external_rodada_id`
- `materia`
- `sala`
- `local`
- `sessao`
- `turno`
- `professores_json`
- `status`
- `origem`
- `datas_aulas_json`
- `created_at`
- `updated_at`

Regras:

- unicidade por `external_id` quando vier da NIB
- ligacao obrigatoria com `rodadas`
- nao persistir notas nem itens avaliativos

### `salas`

Campos minimos:

- `id`
- `rodada_id`
- `codigo`
- `nome`
- `local`
- `turno`
- `created_at`
- `updated_at`

Regras:

- chave unica composta por `rodada_id` e `codigo`

### `contagens`

Representa o estado consolidado atual por sala.

Campos minimos:

- `id`
- `rodada_id`
- `sala_id`
- `alunos`
- `verdinhos`
- `amarelinhos`
- `professor`
- `total`
- `updated_by_user_id`
- `created_at`
- `updated_at`

Regras:

- nenhum campo de contagem pode ser negativo
- `total` deve refletir a soma das categorias

### `contagem_eventos`

Representa o historico granular da operacao.

Campos minimos:

- `id`
- `contagem_id`
- `categoria`
- `operacao`
- `valor_anterior`
- `valor_atual`
- `user_id`
- `created_at`

Valores esperados:

- `operacao`: `incremento`, `decremento`, `ajuste`

### `importacoes`

Campos minimos:

- `id`
- `fonte`
- `external_reference`
- `status`
- `payload_resumo_json`
- `erro`
- `executed_by_user_id`
- `created_at`

Valores esperados:

- `fonte`: `api_nib`, `manual`, `texto`
- `status`: `sucesso`, `erro`, `cancelada`, `pendente_confirmacao`

### `auditoria`

Campos minimos:

- `id`
- `actor_user_id`
- `acao`
- `entidade`
- `entidade_id`
- `payload_json`
- `created_at`

## Relacionamentos

- `users` N:N `roles` por `user_roles`
- `rodadas` 1:N `rodada_materias`
- `rodadas` 1:N `salas`
- `rodadas` 1:N `contagens`
- `contagens` 1:N `contagem_eventos`
- `users` 1:N `auditoria`

## Indices recomendados

- `users(login)`
- `roles(code)`
- `rodadas(ativa)`
- `rodadas(external_id)`
- `rodada_materias(external_id)`
- `rodada_materias(rodada_id, sala)`
- `salas(rodada_id, codigo)`
- `contagens(rodada_id, sala_id)`
- `auditoria(entidade, entidade_id, created_at)`

## Regras de negocio criticas

- Contagem negativa deve falhar no backend.
- Importacao nao pode duplicar `rodada_materias` com mesma chave externa.
- Parser de WhatsApp ou texto nunca persiste automaticamente.
- Dados operacionais importados podem ser complementados manualmente, mas a origem deve permanecer rastreavel.
