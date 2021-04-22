import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import path from "path";

import "./database";
import { routes } from "./routes";

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")))
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
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

http.listen(3333, () =>{console.log("Server is running on port 3333!")})

