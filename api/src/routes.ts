// imports
import { Router } from "express";
import { MessagesController } from "./controllers/MessagesController";
import { SettingsController } from "./controllers/SettingsController";
import { UsersController } from "./controllers/UsersController";

// usando o router do express para realizar rotas http
const routes = Router();

// instanciamento das classes
const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();

// rotas
routes.post("/settings", settingsController.create); // entrar no chat

routes.post("/users", usersController.create); // criar user

routes.post("/messages", messagesController.create); // enviar mensagem
routes.get("/messages/:id", messagesController.showByUser); // listar mensagens de um usuário

export { routes };