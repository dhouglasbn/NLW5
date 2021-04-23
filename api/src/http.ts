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
// onde estão meus arquivos estáticos
app.set("views", path.join(__dirname, "..", "public"));
// que tipo de arquivo eu quero renderizar(utilizando ejs)
app.engine("html", require("ejs").renderFile);
// informar que engine vou usar pra fzr isso e que tipo de arquivo quero renderizar
app.set("view engine", "html");

app.get("/pages/client", (request, response) => {
    return response.render("html/client.html")
})

/**
 * a gente tem duas situações
 * admin usando rotas pra enviar mensagem para o cliente
 * cliente usando rotas pra enviar mensagem para o admin
 * para isso precisamos de dois arquivos websocket trabalhando no mesmo servidor ws(web socket)
 */

const http = createServer(app); // criando protocolo http
const io = new Server(http); // criando protocolo ws(web socket);

io.on("connection", (socket: Socket) => {
    console.log("Se conectou", socket.id)
})

app.use(express.json())
app.use(routes);

export { http, io }