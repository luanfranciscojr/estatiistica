# Cobertura Atual do SDD

## Implementado

- `RF-01` login local com `login` e `senha`
- `RF-02` identificacao de perfil do usuario autenticado
- `RF-03` criacao de sessao local autenticada via cookie `httpOnly`
- `RF-04` autenticacao tecnica na NIB no backend
- `RF-05` cache e reutilizacao de bearer token da NIB
- `RF-06` painel operacional com rotas protegidas
- `RF-07` exibicao da rodada ativa no painel
- `RF-08` contagem manual por sala e categoria
- `RF-09` recalculo imediato de total por sala e total geral
- `RF-10` importacao de rodada da NIB
- `RF-11` cadastro manual de rodada
- `RF-12` persistencia da origem `api_nib` ou `manual`
- `RF-13` bloqueio de duplicidade por chave externa de `rodada_materia`
- `RF-14` fluxo de selecao quando ha mais de uma rodada elegivel
- `RF-15` ignorar notas e itens avaliativos
- `RF-16` dashboard local com filtros e indicadores consolidados
- `RF-17` modulo de usuarios restrito a `admin`
- `RF-18` parser com preview e confirmacao antes da gravacao
- `RF-19` logout e encerramento da sessao local
- `RF-20` logs minimos de auditoria e importacao

## Parcial

- Dashboard:
  historico consolidado existe, mas o detalhamento por aula e comparativos historicos ainda nao foi aprofundado.
- Integracao NIB:
  cliente real existe, mas o mapeamento ainda depende de validacao com o payload oficial da NIB.
- MySQL:
  o projeto esta configurado para MySQL no Prisma, mas a execucao completa depende de uma instancia MySQL real e migrations aplicadas.
- Testes de ponta a ponta:
  os fluxos estao implementados em API e UI, mas ainda nao foram validados contra backend rodando com MySQL real neste ambiente.

## Pendente

- suite de testes automatizados do V1
- validacao operacional com ambiente real da NIB
- migrations reais contra a base MySQL final
