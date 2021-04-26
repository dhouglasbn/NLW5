# NLW5 PROJECT

### building an app with nodeJS and WebSocket!

today is monday, when I committed this project for tha last time
so I conclude that i learned a lot of socket.io tools and how it works
and i learned more about typeorm, entities and repositories 
that was the next level week #5

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
