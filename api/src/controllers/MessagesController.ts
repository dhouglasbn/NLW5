import { Request, Response } from "express";
import { MessagesService } from "../services/MessagesService";


class MessagesController {
    async create(request: Request, response: Response) {
        // coleta de dados da requisição
        const { admin_id, text, user_id } = request.body;
        
        // instanciando a service de messages
        const messagesService = new MessagesService();

        // inserindo dados na tabela messages
        const message = await messagesService.create({
            admin_id,
            text,
            user_id
        });

        // retornar message
        return response.json(message);
    }

    async showByUser(request: Request, response: Response) {
        // coleta de dados da requisição
        const { id } = request.params;

        // instanciando a service de messages
        const messagesService = new MessagesService();

        // coletar mensagens do usuário no banco de dados com os dados do usuário
        const list = await messagesService.listByUser(id);

        // retorna todos esses dados
        return response.json(list);
    }
}


export { MessagesController }