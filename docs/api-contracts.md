# Contratos de API do Backend Local

## Convencoes

- Base path sugerido: `/api`
- Autenticacao do frontend: sessao local
- Formato de resposta: JSON
- Datas: ISO 8601

## Autenticacao

### `POST /api/auth/login`

Request:

```json
{
  "login": "admin",
  "senha": "123456"
}
```

Response `200`:

```json
{
  "user": {
    "id": 1,
    "nome": "Administrador",
    "login": "admin",
    "roles": ["admin"]
  }
}
```

### `POST /api/auth/logout`

Response `204`

### `GET /api/auth/session`

Response `200`:

```json
{
  "authenticated": true,
  "user": {
    "id": 1,
    "nome": "Administrador",
    "roles": ["admin", "estatistica"]
  }
}
```

## Rodadas

### `GET /api/rodadas`

Response `200`:

```json
{
  "items": [
    {
      "id": 10,
      "referencia": "2026.1 - T1",
      "titulo": "Rodada Junho Noite",
      "turno": "noite",
      "origem": "api_nib",
      "status": "ativa",
      "ativa": true,
      "created_at": "2026-06-11T02:00:00.000Z",
      "total_salas": 8,
      "total_materias": 8,
      "total_presenca": 280
    }
  ]
}
```

### `GET /api/rodadas/ativa`

Response `200`:

```json
{
  "rodada": {
    "id": 10,
    "referencia": "2026.1 - T1",
    "turno": "noite",
    "origem": "api_nib",
    "status": "ativa"
  }
}
```

### `GET /api/rodadas/{id}`

Response `200`:

```json
{
  "rodada": {
    "id": 10,
    "referencia": "2026.1 - T1",
    "titulo": "Rodada Junho Noite",
    "turno": "noite",
    "origem": "api_nib",
    "status": "ativa",
    "ativa": true,
    "salas": [
      {
        "id": 1,
        "codigo": "S1",
        "nome": "Sala 1",
        "local": "Bloco A",
        "contagem": {
          "id": 99,
          "alunos": 31,
          "verdinhos": 3,
          "amarelinhos": 2,
          "professor": 2,
          "total": 38
        },
        "materias": [
          {
            "id": 501,
            "external_id": "rm-001",
            "materia": "Teologia 1",
            "local": "Bloco A",
            "sessao": "SENIB",
            "professores": ["Pr. Joao"]
          }
        ]
      }
    ]
  }
}
```

### `POST /api/rodadas/manual`

Request:

```json
{
  "referencia": "2026.1 - T2",
  "titulo": "Rodada Manual Junho",
  "turno": "manha",
  "salas": [
    {
      "codigo": "S1",
      "nome": "Sala 1",
      "local": "Bloco A",
      "materias": [
        {
          "materia": "Teologia 1",
          "professores": ["Pr. Joao"]
        }
      ]
    }
  ]
}
```

Response `201`:

```json
{
  "rodada": {
    "id": 11,
    "origem": "manual",
    "status": "rascunho"
  }
}
```

### `POST /api/rodadas/{id}/ativar`

Response `200`:

```json
{
  "rodada": {
    "id": 11,
    "status": "ativa",
    "ativa": true
  }
}
```

## Importacao NIB

### `GET /api/importacoes/nib/rodadas-elegiveis`

Quando houver uma unica rodada elegivel:

```json
{
  "tipo": "importacao_direta",
  "rodada": {
    "external_id": "rod-001",
    "referencia": "2026.1 - T1",
    "turno": "noite",
    "total_materias": 8
  }
}
```

Quando houver varias:

```json
{
  "tipo": "selecao_necessaria",
  "rodadas": [
    {
      "external_id": "rod-001",
      "referencia": "2026.1 - T1",
      "turno": "noite",
      "total_materias": 8
    },
    {
      "external_id": "rod-002",
      "referencia": "2026.1 - T2",
      "turno": "manha",
      "total_materias": 6
    }
  ]
}
```

### `POST /api/importacoes/nib/rodadas`

Request:

```json
{
  "external_id": "rod-001",
  "forcar": false
}
```

Response `201`:

```json
{
  "importacao": {
    "id": 7,
    "status": "sucesso"
  },
  "rodada": {
    "id": 10,
    "origem": "api_nib",
    "status": "ativa"
  }
}
```

Response `409`:

```json
{
  "error": {
    "code": "RODADA_DUPLICADA",
    "message": "Ja existe rodada local com essa referencia externa."
  }
}
```

## Painel operacional

### `GET /api/painel/rodada-ativa`

Response `200`:

```json
{
  "rodada": {
    "id": 10,
    "referencia": "2026.1 - T1",
    "turno": "noite"
  },
  "salas": [
    {
      "sala_id": 1,
      "codigo": "S1",
      "nome": "Sala 1",
      "total": 38,
      "contagens": {
        "alunos": 31,
        "verdinhos": 3,
        "amarelinhos": 2,
        "professor": 2
      }
    }
  ],
  "total_geral": 38
}
```

### `PATCH /api/painel/contagens/{contagemId}`

Request:

```json
{
  "categoria": "alunos",
  "operacao": "incremento"
}
```

Response `200`:

```json
{
  "contagem": {
    "id": 99,
    "alunos": 32,
    "verdinhos": 3,
    "amarelinhos": 2,
    "professor": 2,
    "total": 39
  },
  "total_geral": 39
}
```

Response `422`:

```json
{
  "error": {
    "code": "CONTAGEM_NEGATIVA",
    "message": "A operacao resultaria em contagem negativa."
  }
}
```

## Dashboard

### `GET /api/dashboard?turno=noite`

Response `200`:

```json
{
  "ultima_rodada": {
    "referencia": "2026.1 - T1",
    "total_presenca": 280
  },
  "media_por_rodada": 265.4,
  "media_geral": 241.8,
  "ranking_salas": [
    {
      "sala": "Sala 1",
      "media": 38.2
    }
  ],
  "composicao_presenca": {
    "alunos": 220,
    "verdinhos": 20,
    "amarelinhos": 18,
    "professor": 22
  }
}
```

## Usuarios

### `GET /api/admin/users`

Response `200`:

```json
{
  "items": [
    {
      "id": 1,
      "nome": "Administrador",
      "login": "admin",
      "ativo": true,
      "roles": ["admin"]
    }
  ]
}
```

### `POST /api/admin/users`

Request:

```json
{
  "nome": "Operador",
  "login": "operador",
  "senha": "senha-forte",
  "roles": ["verdinho"]
}
```

### `PATCH /api/admin/users/{id}`

Request exemplo:

```json
{
  "ativo": false,
  "roles": ["pastor"]
}
```

### `PATCH /api/admin/users/{id}/password`

Request:

```json
{
  "senha": "nova-senha-forte"
}
```

### `GET /api/admin/users/{id}`

Response `200`:

```json
{
  "item": {
    "id": 1,
    "nome": "Administrador",
    "login": "admin",
    "ativo": true,
    "roles": ["admin"]
  }
}
```

### `DELETE /api/admin/users/{id}`

Response `200`:

```json
{
  "success": true
}
```

## Importacoes Recentes

### `GET /api/importacoes/recentes`

Response `200`:

```json
{
  "items": [
    {
      "id": 7,
      "fonte": "api_nib",
      "external_reference": "rod-001",
      "status": "sucesso",
      "erro": null,
      "created_at": "2026-06-11T02:10:00.000Z"
    }
  ]
}
```

## Parser operacional

### `POST /api/parser/preview`

Objetivo:

- processar texto colado ou conteudo vindo de WhatsApp
- gerar apenas uma pre-visualizacao
- nao persistir automaticamente

Request:

```json
{
  "texto": "Sala 1 alunos 30 verdinhos 2 professor 1"
}
```

Response `200`:

```json
{
  "preview": [
    {
      "sala": "Sala 1",
      "contagens": {
        "alunos": 30,
        "verdinhos": 2,
        "professor": 1
      }
    }
  ],
  "requer_confirmacao": true
}
```

### `POST /api/parser/confirmar`

Request:

```json
{
  "rodadaId": 10,
  "items": [
    {
      "sala": "Sala 1",
      "contagens": {
        "alunos": 30,
        "verdinhos": 2,
        "professor": 1
      }
    }
  ]
}
```
