import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import path from "path";

import "./database";
import { routes } from "./routes";

const app = express();

// informar ao node:
// utilizar arquivos estáticos(html, css, imgs etc ...)
app.use(express.static(path.join(__dirname, "..", "public")))
// onde estão as views
app.set("views", path.join(__dirname, "..", "public"));
// que tipo de arquivo eu quero renderizar(utilizando ejs)
app.engine("html", require("ejs").renderFile);
// informar que engine vou usar pra fzr isso e que tipo de arquivo quero renderizar
app.set("view engine", "html");

// renderizar a página do cliente
app.get("/pages/client", (request, response) => {
    return response.render("html/client.html")
})

// renderizar a página do admin
app.get("/pages/admin", (request, response) => {
    return response.render("html/admin.html")
})

/**
 * a gente tem duas situações
 * admin usando rotas pra enviar mensagem para o cliente
 * cliente usando rotas pra enviar mensagem para o admin
 * para isso precisamos de dois arquivos websocket trabalhando no mesmo servidor ws(web socket)
 */

const http = createServer(app); // criando protocolo http
const io = new Server(http); // criando protocolo ws(web socket);

// quando houver uma conexão socket enviar no console "Se conectou socket.id"
io.on("connection", (socket: Socket) => {
    console.log("Se conectou", socket.id)
})

// oferecer ao node as ferramentas para trabalhar com o json
app.use(express.json())
// oferecer ao node as ferramentas para trabalhar com rotas
app.use(routes);

export { http, io };
