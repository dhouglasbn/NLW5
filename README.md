# NLW5 PROJECT

### building an app with nodeJS and WebSocket!

## terminal codes:

```
yarn init (use a form)
yarn init -y (autocomplete form)
yarn tsc --init (create tsconfig.json)
```

** query builders facilitam a migração entre tipos de bancos de dados **

** migrations permitem um gerenciamento do histórico do banco de dados para evitar conflito de trabalho em equipe **

** yarn typeorm migration:create -n MigrationName **

/**
 * GET: Buscas
 * POST: Criação
 * PUT: Alteração
 * DELETE: Deletar
 * PATCH: Alterar uma informação específica
 */

 ** quando eu uso o extends Repository, eu faço uma herança de todos os métodos do typeorm para interagir com o banco de dados ** 

 /*
 * Tipos de parametros
 * Routes Params => Parametros de rotas
 * http://localhost:3333/settings/1
 * Query Params => Filtros e buscas
 * http://localhost:3333/settings/1:search=algumacoisa
 * Body params => {
     "alguma": "coisa
 }
 */