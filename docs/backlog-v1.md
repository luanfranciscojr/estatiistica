# Backlog Tecnico do V1

## Ordem de execucao recomendada

### Fase 1. Fundacao do backend

- Definir stack do backend e padrao de configuracao local.
- Configurar conexao com MySQL existente.
- Implementar tabela de usuarios, perfis e auditoria minima.
- Implementar login local, logout, sessao e autorizacao por perfil.
- Implementar cliente NIB com cache de token e renovacao por expiracao.

## Criterios de aceite

- Login local funcional com perfis `admin`, `estatistica`, `verdinho` e `pastor`.
- Requisicoes protegidas falham sem sessao valida.
- Backend consegue obter e reutilizar bearer token da NIB.

### Fase 2. Preparacao de rodada

- Implementar schema de `rodadas`, `rodada_materias`, `salas` e `importacoes`.
- Implementar listagem de rodadas elegiveis na NIB.
- Implementar importacao direta quando houver uma unica rodada elegivel.
- Implementar fluxo de selecao quando houver varias rodadas elegiveis.
- Implementar cadastro manual de rodada.
- Implementar ativacao da rodada operacional.
- Implementar bloqueio de duplicidade e sobrescrita silenciosa.

## Criterios de aceite

- O backend retorna `importacao_direta` ou `selecao_necessaria`.
- Rodada importada ou manual pode ser marcada como ativa.
- Nao existe duplicidade por chave externa de `rodada_materias`.

### Fase 3. Painel operacional

- Implementar `contagens` e `contagem_eventos`.
- Expor API do painel com rodada ativa, salas e totais.
- Expor operacao de incremento e decremento por categoria.
- Recalcular total por sala e total geral imediatamente.
- Bloquear contagem negativa no backend.

## Criterios de aceite

- Painel consegue operar com dados locais sem consultar a NIB.
- Totais refletem cada operacao sem necessidade de recarga integral.
- Toda alteracao de contagem gera historico.

### Fase 4. Dashboard e usuarios

- Implementar consultas consolidadas de dashboard.
- Implementar filtro por turno.
- Implementar ranking de salas e composicao de presenca.
- Implementar modulo administrativo de usuarios.
- Registrar auditoria para eventos relevantes.

## Criterios de aceite

- Dashboard usa apenas dados locais.
- Apenas `admin` acessa endpoints administrativos.
- Alteracoes relevantes de usuario ficam auditadas.

### Fase 5. Parser e robustez

- Implementar parser de texto e WhatsApp com modo `preview`.
- Garantir confirmacao humana antes da persistencia.
- Cobrir indisponibilidade da NIB com fluxo manual.
- Adicionar testes integrados de regressao operacional.

## Criterios de aceite

- Parser nunca grava automaticamente.
- Sistema continua operando manualmente com NIB indisponivel.
- Fluxos criticos possuem cobertura automatizada minima.

## Matriz minima de testes

- login valido
- login invalido
- acesso negado por perfil
- token NIB novo
- token NIB expirado
- importacao com rodada unica
- importacao com varias rodadas
- bloqueio de duplicidade
- cadastro manual de rodada
- ativacao de rodada
- incremento de contagem
- decremento de contagem
- bloqueio de contagem negativa
- dashboard por turno
- parser sem persistencia automatica

## Riscos tecnicos

- Schema atual do MySQL pode divergir do modelo minimo proposto.
- Payload real de `rodada_materias` pode nao trazer todos os campos operacionais.
- Regras do sistema atual podem conter variacoes nao documentadas no SDD.

## Proximo corte recomendado

Se a proxima rodada for codigo, a implementacao deve comecar por:

1. stack e bootstrap do backend
2. migrations iniciais
3. autenticacao local
4. cliente NIB
5. importacao de rodada
