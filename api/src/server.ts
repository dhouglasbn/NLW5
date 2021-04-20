import express from "express";
import "./database";

const app = express();

/**
 * GET: Buscas
 * POST: Criação
 * PUT: Alteração
 * DELETE: Deletar
 * PATCH: Alterar uma informação específica
 */

app.get("/", (request, response) => {
    return response.json({
        message: "Olá NLW05!"
    });
})

app.post("/", (request, response) => {
    return response.json({
        message: "Success! User saved"
    });
})

app.listen(3333, () =>{console.log("Server is running on port 3333!")})