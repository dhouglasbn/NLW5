import { Request, Response } from "express"
import { UsersService } from "../services/UsersService";


class UsersController {
    async create(request: Request, response: Response): Promise<Response> {
        // coleta de dados da requisição
        const { email } = request.body;

        // instanciando a service de users
        const usersService = new UsersService();

        // salvar usuário no DB
        const user = await usersService.create(email);

        // retornar user
        return response.json(user)
    }
}

export { UsersController }