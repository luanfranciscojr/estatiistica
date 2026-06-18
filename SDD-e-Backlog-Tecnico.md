# SDD Consolidado e Backlog Tecnico

## 1. Visao Geral

Este documento define a especificacao funcional e tecnica do novo sistema de estatisticas da SENIB, tomando como referencia as telas atuais analisadas no sistema publicado e considerando a arquitetura alvo com:

- operacao principal no sistema local
- base de dados local em MySQL ja existente
- integracao com a API da NIB para autenticacao tecnica e importacao academica

O objetivo do V1 e garantir operacao estavel, aderente a rotina atual, com baixa dependencia operacional da NIB apos a importacao da rodada.

## 2. Objetivo do Sistema

O sistema devera permitir:

- autenticacao de usuarios do sistema
- preparacao de rodadas
- importacao de materias e rodadas da NIB
- cadastro manual de rodadas
- registro operacional de presenca por sala e categoria
- consulta de indicadores e historico
- controle de acesso por perfil
- administracao de usuarios

## 3. Escopo do V1

### Incluido no V1

- login local do sistema
- autenticacao tecnica com a API da NIB
- painel operacional
- dashboard
- modulo de usuarios
- importacao de rodada da NIB
- cadastro manual de rodada
- importacao auxiliar via texto e WhatsApp
- persistencia local em MySQL
- controle de perfis e permissoes

### Fora do escopo do V1

- notas
- itens avaliativos
- lancamento academico na NIB
- sincronizacao obrigatoria com Google Sheets
- edicao de dados academicos diretamente na NIB

## 4. Contexto da Solucao

A solucao sera hibrida:

- o usuario opera no sistema local
- o backend local gerencia autenticacao do sistema, sessao, permissoes e persistencia
- o backend local consome a API da NIB quando necessario
- o frontend nunca acessa a NIB diretamente

A NIB sera usada como fonte externa para importar dados academicos da rodada.
O sistema local sera a fonte operacional para contagem, historico, dashboard e controle de acesso.

## 5. Perfis de Acesso

### Perfis identificados

- `admin`
- `estatistica`
- `verdinho`
- `pastor`

### Permissoes esperadas

`admin`

- acessar painel
- acessar dashboard
- acessar usuarios
- importar rodada
- cadastrar rodada manualmente
- gerenciar rodada ativa

`estatistica`

- acessar dashboard
- executar importacao quando permitido
- apoiar operacao
- sem acesso ao modulo de usuarios

`verdinho`

- acessar painel operacional
- acessar dashboard

`pastor`

- acessar dashboard
- acesso de consulta, sem operacao de administracao

## 6. Autenticacao

### 6.1 Autenticacao do usuario no sistema

O acesso ao sistema sera feito com:

- `login`
- `senha`

Essas credenciais poderao permanecer iguais as ja utilizadas no sistema atual.

Fluxo:

1. usuario informa login e senha
2. backend valida as credenciais locais
3. sistema identifica perfil e permissoes
4. sistema cria sessao autenticada
5. usuario e redirecionado para os modulos permitidos

### 6.2 Autenticacao de integracao com a NIB

A integracao com a NIB utilizara uma credencial tecnica separada baseada em:

- `matricula`
- `senha`

Essa autenticacao sera usada exclusivamente pelo backend para:

- obter bearer token
- consumir endpoints da NIB
- executar importacoes

Fluxo:

1. backend recupera matricula e senha tecnicas
2. backend chama `POST /v2/login`
3. recebe bearer token
4. armazena o token com controle de expiracao
5. reutiliza o token nas chamadas seguintes
6. renova o token quando necessario

Regras:

- o usuario final nao digita matricula da NIB
- o bearer token nao pode ser exposto ao frontend
- a autenticacao com a NIB e responsabilidade exclusiva do backend

## 7. Integracao com a API da NIB

### Endpoints minimos previstos

- `POST /v2/login`
- `GET /v2/senib/rodada_materias`

O endpoint principal de importacao sera `rodada_materias`, desde que ele forneca os dados necessarios para preparar a rodada.

### Dados esperados

- identificacao da rodada
- identificacao da rodada materia
- nome da materia
- professores
- sala e local
- sessao SENIB
- status de materia aberta e ativa
- datas e aulas, quando disponiveis

### Dados fora do escopo

- notas
- itens avaliativos
- calculo de nota
- importacao de desempenho academico

## 8. Modulos do Sistema

### 8.1 Login

Responsavel por autenticar o usuario local do sistema e iniciar sessao com perfil e permissoes.

### 8.2 Painel Operacional

Tela principal de operacao em tempo real. Deve refletir a logica ja existente nas telas analisadas.

Funcoes:

- exibir rodada ativa
- exibir turno ativo
- exibir salas e materias
- exibir contagem por categoria
- permitir incremento e decremento
- exibir total por sala
- exibir total geral
- permitir importar rodada
- permitir cadastro manual de rodada
- permitir importacao auxiliar por texto e WhatsApp

Categorias minimas:

- alunos
- verdinhos
- amarelinhos
- professor

### 8.3 Preparacao de Rodada

A preparacao de rodada devera suportar dois modos:

- `Importar da NIB`
- `Cadastrar manualmente`

Os dois caminhos devem convergir para a criacao de uma rodada operacional valida no banco local.

### 8.4 Dashboard

Modulo de consulta consolidada, mantendo aderencia ao modelo atual.

Funcoes:

- visao da ultima rodada
- media por rodada
- media geral
- filtros por turno
- historico por aula e data
- ranking de salas
- composicao de presenca
- comparativos historicos

### 8.5 Usuarios

Modulo administrativo para criacao e gestao de contas e perfis.

Funcoes:

- listar usuarios
- criar usuario
- alterar senha
- ativar e desativar usuario
- alterar perfis
- excluir conforme regra de negocio

### 8.6 Importacao por WhatsApp

Modulo auxiliar do painel para interpretar texto colado e sugerir lancamentos operacionais.

## 9. Requisitos Funcionais

- `RF-01` O sistema devera permitir login com `login` e `senha`.
- `RF-02` O sistema devera identificar o perfil do usuario autenticado.
- `RF-03` O sistema devera criar sessao local autenticada.
- `RF-04` O backend devera autenticar tecnicamente na API da NIB com `matricula` e `senha`.
- `RF-05` O backend devera obter e utilizar bearer token da NIB nas rotinas de importacao.
- `RF-06` O sistema devera disponibilizar painel operacional para usuarios autorizados.
- `RF-07` O sistema devera exibir a rodada ativa no painel.
- `RF-08` O sistema devera permitir contagem manual por sala e categoria.
- `RF-09` O sistema devera recalcular totais por sala e total geral apos cada alteracao.
- `RF-10` O sistema devera permitir importar rodada da NIB.
- `RF-11` O sistema devera permitir cadastrar rodada manualmente.
- `RF-12` O sistema devera registrar a origem da rodada como `api_nib` ou `manual`.
- `RF-13` O sistema devera impedir duplicidade de importacao da mesma `rodada_materia`.
- `RF-14` O sistema devera exibir modal de selecao quando houver mais de uma rodada elegivel para importacao.
- `RF-15` O sistema devera ignorar notas e itens avaliativos na importacao do V1.
- `RF-16` O sistema devera disponibilizar dashboard com filtros e indicadores consolidados.
- `RF-17` O sistema devera disponibilizar modulo de usuarios apenas para administradores.
- `RF-18` O sistema devera permitir importacao auxiliar via texto e WhatsApp com confirmacao antes da gravacao.
- `RF-19` O sistema devera permitir logout e encerramento da sessao local.
- `RF-20` O sistema devera registrar logs minimos de importacao e erro de integracao.

## 10. Regras de Negocio

- `RN-01` A operacao do dia a dia ocorrera no sistema local.
- `RN-02` A NIB sera usada como origem externa para importacao academica.
- `RN-03` O login do sistema e independente da credencial tecnica da NIB.
- `RN-04` A credencial tecnica da NIB sera usada apenas pelo backend.
- `RN-05` Uma rodada podera ser criada por importacao ou manualmente.
- `RN-06` Toda rodada devera possuir origem identificada.
- `RN-07` A importacao devera considerar apenas materias abertas e ativas.
- `RN-08` Se houver apenas uma rodada elegivel, a importacao podera ocorrer diretamente.
- `RN-09` Se houver mais de uma rodada elegivel, o sistema devera exigir selecao do usuario.
- `RN-10` O sistema nao devera importar notas nem itens avaliativos no V1.
- `RN-11` O sistema nao devera permitir contagens negativas.
- `RN-12` O sistema nao devera gravar interpretacao de WhatsApp sem confirmacao explicita.
- `RN-13` O modulo de usuarios sera exclusivo do perfil `admin`.
- `RN-14` O dashboard utilizara dados consolidados locais, e nao consultas operacionais diretas na NIB.
- `RN-15` O sistema devera tolerar indisponibilidade temporaria da NIB, mantendo possivel o cadastro manual de rodada.

## 11. Requisitos Nao Funcionais

- `RNF-01` O bearer token da NIB nao podera ser exposto ao frontend.
- `RNF-02` As credenciais tecnicas da NIB deverao ser armazenadas com seguranca no backend.
- `RNF-03` O sistema devera possuir resposta adequada para operacao em desktop e mobile.
- `RNF-04` O painel operacional devera ter atualizacao rapida apos acoes de contagem.
- `RNF-05` O sistema devera manter rastreabilidade de importacoes.
- `RNF-06` O sistema devera registrar falhas de integracao para diagnostico.
- `RNF-07` O sistema devera respeitar controle de acesso por perfil em todas as rotas protegidas.
- `RNF-08` O banco MySQL local sera a base oficial da operacao.
- `RNF-09` O frontend devera comunicar-se apenas com o backend local.
- `RNF-10` O sistema devera continuar operavel sem importacao automatica, por meio do cadastro manual.

## 12. Modelo Logico de Dados

### Entidades principais

- `usuarios`
- `perfis`
- `usuario_perfil`
- `rodadas`
- `rodada_materias`
- `salas`
- `rodada_salas`
- `contagens`
- `importacoes`
- `auditoria`

### Campos relevantes

- origem da rodada
- id externo da rodada na NIB
- id externo da rodada materia na NIB
- turno
- status da rodada
- data da rodada
- timestamps de criacao, atualizacao e importacao

## 13. Casos de Uso

### UC-01 Login no Sistema

Objetivo: autenticar usuario local.

Atores:

- `admin`
- `estatistica`
- `verdinho`
- `pastor`

Fluxo:

1. usuario informa login e senha
2. sistema valida credenciais
3. sistema identifica perfis
4. sistema cria sessao
5. sistema redireciona para a area permitida

### UC-02 Autenticar Integracao com a NIB

Objetivo: obter bearer token para consumo da API.

Ator:

- backend local

Fluxo:

1. backend usa matricula e senha tecnicas
2. backend chama `POST /v2/login`
3. backend recebe token
4. backend armazena token
5. backend reutiliza token nas chamadas

### UC-03 Importar Rodada da NIB

Objetivo: criar rodada local a partir da API.

Atores:

- `admin`
- `estatistica` autorizado

Fluxo:

1. usuario clica em importar
2. sistema autentica na NIB, se necessario
3. sistema consulta `rodada_materias`
4. sistema identifica materias abertas
5. sistema agrupa por rodada
6. sistema importa a rodada elegivel
7. sistema grava dados localmente
8. sistema apresenta resumo da importacao

### UC-04 Selecionar Rodada para Importacao

Objetivo: escolher rodada quando houver mais de uma opcao elegivel.

Atores:

- `admin`
- `estatistica` autorizado

Fluxo:

1. sistema detecta multiplas rodadas elegiveis
2. sistema abre modal de selecao
3. usuario escolhe a rodada
4. sistema executa a importacao da selecionada

### UC-05 Cadastrar Rodada Manualmente

Objetivo: permitir criacao de rodada sem depender da API.

Atores:

- `admin`
- `estatistica` autorizado

Fluxo:

1. usuario seleciona cadastro manual
2. sistema abre a preparacao de rodada
3. usuario informa dados e distribui materias
4. usuario salva
5. sistema grava rodada com origem manual

### UC-06 Registrar Contagem no Painel

Objetivo: registrar presenca por sala e categoria.

Atores:

- `admin`
- `verdinho`
- `estatistica` autorizado

Fluxo:

1. sistema exibe rodada ativa
2. usuario incrementa e decrementa categorias
3. sistema atualiza total da sala
4. sistema atualiza total geral

### UC-07 Importar Contagem por WhatsApp

Objetivo: sugerir lancamentos a partir de texto.

Atores:

- `admin`
- `verdinho`
- `estatistica` autorizado

Fluxo:

1. usuario cola o texto
2. sistema interpreta a mensagem
3. sistema sugere contagens
4. usuario confirma
5. sistema grava os dados

### UC-08 Consultar Dashboard

Objetivo: consultar indicadores consolidados.

Atores:

- `admin`
- `estatistica`
- `verdinho`
- `pastor`

Fluxo:

1. usuario acessa o dashboard
2. sistema carrega indicadores
3. usuario aplica filtros
4. sistema atualiza graficos e comparativos

### UC-09 Gerenciar Usuarios

Objetivo: administrar contas e perfis.

Ator:

- `admin`

Fluxo:

1. admin acessa usuarios
2. sistema lista os registros
3. admin cria ou altera usuarios
4. sistema salva alteracoes
5. sistema registra auditoria minima

### UC-10 Logout

Objetivo: encerrar a sessao local.

Atores:

- todos os usuarios autenticados

Fluxo:

1. usuario clica em sair
2. sistema invalida sessao
3. sistema redireciona para o login

## 14. Criterios de Aceite

### CA-01 Login

- dado um usuario valido, quando informar login e senha corretos, entao o sistema deve autenticar e redirecionar corretamente
- dado um usuario invalido, quando tentar acessar, entao o sistema deve exibir erro e nao criar sessao
- dado um usuario sem permissao, quando acessar rota restrita, entao o sistema deve bloquear o acesso

### CA-02 Integracao NIB

- dado que as credenciais tecnicas estao validas, quando o backend autenticar na NIB, entao deve obter bearer token com sucesso
- dado que o token expirou, quando houver nova importacao, entao o backend deve renovar a autenticacao
- o bearer token nao deve ser exposto ao frontend

### CA-03 Importacao de Rodada

- dado que existe uma unica rodada aberta, quando o usuario clicar em importar, entao o sistema deve importa-la
- dado que existem varias rodadas abertas, quando o usuario clicar em importar, entao o sistema deve solicitar selecao
- o sistema deve importar apenas materias abertas e ativas
- o sistema nao deve importar notas nem itens avaliativos
- o sistema deve impedir duplicidade por referencia externa

### CA-04 Cadastro Manual

- o sistema deve permitir criar rodada sem dependencia da NIB
- a rodada manual deve ser gravada com origem `manual`
- os campos obrigatorios devem ser validados antes do salvamento
- a rodada criada deve ficar disponivel no painel

### CA-05 Painel Operacional

- o sistema deve exibir categorias `alunos`, `verdinhos`, `amarelinhos` e `professor`
- ao alterar uma contagem, o total da sala e o total geral devem ser recalculados
- o sistema nao deve permitir valores negativos
- o painel deve operar sobre a rodada ativa

### CA-06 WhatsApp

- o sistema deve interpretar texto colado sem persistir automaticamente
- o sistema deve exigir confirmacao antes da gravacao
- se o texto nao for interpretavel, deve exibir erro claro

### CA-07 Dashboard

- o dashboard deve exibir visao da ultima rodada, medias e historico
- o sistema deve permitir filtro por turno
- o sistema deve exibir ranking de salas e composicao de presenca
- usuarios sem permissao nao devem acessar o modulo

### CA-08 Usuarios

- somente admin deve acessar o modulo de usuarios
- o sistema deve permitir criar usuario, alterar senha, ativar, desativar e ajustar perfis
- alteracoes relevantes devem ser registradas para auditoria

### CA-09 Logout

- ao realizar logout, o sistema deve invalidar a sessao local
- apos logout, o usuario nao deve acessar rotas protegidas sem novo login

## 15. Matriz Resumida de Permissoes

| Modulo | admin | estatistica | verdinho | pastor |
|---|---|---|---|---|
| Login | Sim | Sim | Sim | Sim |
| Painel Operacional | Sim | Parcial | Sim | Nao |
| Dashboard | Sim | Sim | Sim | Sim |
| Importar Rodada | Sim | Parcial | Nao | Nao |
| Cadastro Manual de Rodada | Sim | Parcial | Nao | Nao |
| Usuarios | Sim | Nao | Nao | Nao |

`Parcial` significa acesso condicionado a regra operacional definida pelo projeto.

## 16. Premissas

- o MySQL ja existente sera reaproveitado
- a API da NIB continuara disponivel para autenticacao e consulta
- `GET /v2/senib/rodada_materias` fornecera os dados necessarios para a importacao do V1 ou sera complementado sem alterar o conceito funcional
- o sistema atual serve como referencia visual e operacional para o novo fluxo

## 17. Riscos

- o endpoint `rodada_materias` pode nao trazer todos os dados necessarios em um unico payload
- multiplas rodadas abertas na NIB podem gerar ambiguidade operacional
- indisponibilidade da NIB pode afetar a importacao
- divergencias entre a estrutura academica da NIB e o modelo operacional local podem exigir adaptacao de mapeamento

## 18. Conclusao

O V1 devera ser implementado como um sistema local de operacao e estatistica, com integracao controlada a NIB para autenticacao tecnica e importacao das rodadas. O desenho proposto preserva a logica das telas atuais, reduz dependencia operacional externa, mantem contingencia por cadastro manual e exclui do escopo inicial tudo que nao e necessario para a operacao imediata, especialmente notas e itens avaliativos.

---

## 19. Backlog Tecnico

## 19.1 Epico 1 - Fundacao do Projeto

### Objetivo

Preparar a base tecnica para desenvolvimento seguro, com configuracao de ambiente, banco, autenticacao e integracoes.

### Historias

**US-01** Como time tecnico, quero configurar a estrutura base do backend e frontend para iniciar o desenvolvimento.  
**US-02** Como time tecnico, quero configurar o acesso ao MySQL local para persistencia.  
**US-03** Como time tecnico, quero preparar variaveis seguras para integracao com a NIB.

### Tarefas

- definir stack oficial do frontend
- definir stack oficial do backend
- configurar conexao com MySQL local
- criar arquivo de ambiente com credenciais tecnicas da NIB
- configurar controle de migrations, se aplicavel
- configurar logging basico
- configurar controle de erros da integracao
- configurar ambientes `dev`, `homolog` e `prod`

### Dependencias

- definicao da stack final
- acesso ao MySQL
- credenciais tecnicas da NIB

## 19.2 Epico 2 - Autenticacao e Autorizacao

### Objetivo

Implementar login local do sistema e autorizacao por perfil, mantendo a autenticacao tecnica da NIB isolada no backend.

### Historias

**US-04** Como usuario, quero fazer login com meu login e senha atuais para acessar o sistema.  
**US-05** Como sistema, quero controlar acesso por perfil para restringir modulos.  
**US-06** Como backend, quero autenticar tecnicamente na NIB para obter bearer token.

### Tarefas de Backend

- modelar usuarios, perfis e relacoes
- implementar endpoint de login local
- implementar criacao e invalidacao de sessao
- implementar middlewares de autenticacao
- implementar middlewares de autorizacao por perfil
- implementar cliente HTTP da NIB
- implementar rotina de login tecnico na NIB
- implementar cache e renovacao do bearer token

### Tarefas de Frontend

- criar tela de login
- criar fluxo de logout
- proteger rotas por sessao
- tratar estados de acesso restrito

### Criterios de pronto

- login local funcional
- perfis aplicados por rota
- bearer token da NIB sendo obtido apenas no backend

## 19.3 Epico 3 - Modelo de Dados Operacional

### Objetivo

Preparar as estruturas locais para armazenar rodadas, materias, salas, contagens e auditoria.

### Historias

**US-07** Como sistema, quero armazenar rodadas locais para operar sem depender da NIB no momento da contagem.  
**US-08** Como sistema, quero registrar origem e referencias externas para rastreabilidade.

### Tarefas

- revisar schema MySQL existente
- mapear tabelas reaproveitaveis
- criar ou ajustar tabelas de rodadas
- criar ou ajustar tabelas de rodada_materias
- criar ou ajustar tabelas de salas
- criar ou ajustar tabelas de contagens por categoria
- criar ou ajustar tabela de importacoes
- criar ou ajustar tabela de auditoria
- definir constraints de unicidade para evitar duplicidade de importacao

### Criterios de pronto

- schema local suportando origem `manual` e `api_nib`
- estrutura pronta para rastrear importacoes e contagens

## 19.4 Epico 4 - Integracao de Importacao da NIB

### Objetivo

Buscar as rodadas e materias da NIB e transformá-las em rodadas operacionais locais.

### Historias

**US-09** Como operador autorizado, quero importar uma rodada da NIB para iniciar a operacao.  
**US-10** Como sistema, quero impedir duplicidade de importacao da mesma rodada materia.  
**US-11** Como operador, quero escolher a rodada quando houver mais de uma elegivel.

### Tarefas de Backend

- implementar servico `NibAuthService`
- implementar servico `NibImportService`
- consumir `GET /v2/senib/rodada_materias`
- mapear payload externo para entidades locais
- filtrar apenas materias abertas e ativas
- agrupar materias por rodada
- detectar cenarios com uma ou varias rodadas elegiveis
- implementar persistencia transacional da importacao
- implementar validacao de duplicidade por id externo
- registrar logs e historico de importacao

### Tarefas de Frontend

- criar acao `Importar`
- criar modal de selecao quando houver varias rodadas
- criar resumo de importacao concluida
- criar mensagens de erro para indisponibilidade da NIB

### Criterios de pronto

- importacao funcional a partir da NIB
- notas ignoradas
- duplicidade bloqueada
- selecao manual disponivel quando houver mais de uma rodada

## 19.5 Epico 5 - Cadastro Manual de Rodada

### Objetivo

Permitir criar rodada localmente sem depender da API externa.

### Historias

**US-12** Como operador autorizado, quero cadastrar a rodada manualmente quando a importacao nao estiver disponivel.  
**US-13** Como operador, quero distribuir materias nas salas para preparar a contagem.

### Tarefas

- criar fluxo de criacao manual de rodada
- criar formulario de dados basicos da rodada
- criar interface de distribuicao de materias por sala
- persistir rodada com origem `manual`
- validar campos obrigatorios
- tratar conflito com rodada ativa existente

### Criterios de pronto

- rodada manual pode ser criada e ativada
- rodada manual aparece no painel operacional

## 19.6 Epico 6 - Painel Operacional

### Objetivo

Implementar a tela principal de contagem em tempo real, aderente ao sistema atual.

### Historias

**US-14** Como operador, quero visualizar a rodada ativa e as salas para registrar presenca.  
**US-15** Como operador, quero incrementar e decrementar as categorias de contagem.  
**US-16** Como operador, quero ver os totais por sala e o total geral.

### Tarefas de Backend

- criar endpoint para buscar rodada ativa
- criar endpoint para atualizar contagens
- validar contagens negativas
- recalcular totais
- manter consistencia transacional

### Tarefas de Frontend

- construir painel operacional com cards por sala
- exibir categorias operacionais
- implementar botoes de incremento e decremento
- atualizar totais em tempo real ou quase tempo real
- destacar rodada e turno ativos

### Criterios de pronto

- painel funcional para contagem
- totais atualizados corretamente
- sem possibilidade de contagem negativa

## 19.7 Epico 7 - Importacao por WhatsApp

### Objetivo

Permitir apoio operacional a partir de texto colado no painel.

### Historias

**US-17** Como operador, quero colar um texto de WhatsApp para sugerir contagens automaticamente.  
**US-18** Como operador, quero confirmar os valores antes da gravacao.

### Tarefas

- definir formato aceito das mensagens
- implementar parser de texto
- mapear texto para sala e categoria
- apresentar sugestoes sem gravacao automatica
- implementar confirmacao antes de persistir
- tratar erros de interpretacao

### Criterios de pronto

- parser funcional para formatos definidos
- nenhuma gravacao sem confirmacao explicita

## 19.8 Epico 8 - Dashboard

### Objetivo

Exibir indicadores consolidados da operacao local.

### Historias

**US-19** Como usuario autorizado, quero consultar a ultima rodada e historicos.  
**US-20** Como usuario autorizado, quero filtrar por turno e comparar resultados.

### Tarefas de Backend

- criar consultas agregadas de dashboard
- calcular medias por rodada e media geral
- montar ranking de salas
- montar composicao de presenca
- montar historico por aula e data

### Tarefas de Frontend

- criar tela de dashboard
- implementar filtros de turno
- implementar cards de indicadores
- implementar graficos e rankings
- tratar estados vazios

### Criterios de pronto

- dashboard refletindo dados consolidados locais
- filtros operando corretamente

## 19.9 Epico 9 - Gestao de Usuarios

### Objetivo

Permitir que administradores gerenciem contas e perfis do sistema.

### Historias

**US-21** Como admin, quero criar e administrar usuarios.  
**US-22** Como admin, quero alterar perfis e status de usuarios.

### Tarefas

- criar endpoints de listagem de usuarios
- criar endpoints de criacao e edicao
- implementar alteracao de senha
- implementar ativacao e desativacao
- implementar associacao de perfis
- registrar auditoria minima
- construir tela de administracao de usuarios

### Criterios de pronto

- apenas admin acessa usuarios
- CRUD administrativo basico funcional

## 19.10 Epico 10 - Observabilidade, Seguranca e Estabilizacao

### Objetivo

Garantir seguranca basica, rastreabilidade e qualidade minima de entrega.

### Historias

**US-23** Como time tecnico, quero logs e auditoria para diagnosticar falhas.  
**US-24** Como time tecnico, quero validar os fluxos criticos antes da entrada em producao.

### Tarefas

- estruturar logs de autenticacao e importacao
- registrar eventos criticos de operacao
- revisar protecao das credenciais tecnicas
- revisar controle de acesso por rota
- criar testes dos fluxos criticos
- validar cenarios de erro da NIB
- validar fallback de cadastro manual
- executar homologacao funcional

### Criterios de pronto

- logs minimos implementados
- fluxos criticos validados
- fallback manual operacional

## 20. Ordem Recomendada de Implementacao

1. Fundacao do projeto
2. Autenticacao e autorizacao
3. Modelo de dados operacional
4. Integracao de importacao da NIB
5. Cadastro manual de rodada
6. Painel operacional
7. Dashboard
8. Gestao de usuarios
9. Importacao por WhatsApp
10. Observabilidade, seguranca e estabilizacao

## 21. Backlog Priorizado

### Prioridade Must

- login local
- controle de perfis
- autenticacao tecnica na NIB
- importacao de rodada
- bloqueio de duplicidade
- cadastro manual de rodada
- painel operacional
- persistencia local em MySQL
- dashboard basico

### Prioridade Should

- modal de selecao para varias rodadas
- gestao completa de usuarios
- logs de importacao e auditoria
- historico detalhado no dashboard

### Prioridade Could

- parser de WhatsApp mais flexivel
- refinamentos visuais adicionais
- relatorios extras e exportacoes futuras

