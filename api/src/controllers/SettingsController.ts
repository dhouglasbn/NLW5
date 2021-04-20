import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";



class SettingsController {
    async create(request: Request, response: Response) {
        // coletar dados da requisição
        const { chat, username } = request.body;

        // pegar o repositório
        const settingsRepository = getCustomRepository(SettingsRepository);

        // criar representação do objeto
        const settings = settingsRepository.create({
            chat,
            username
        })

        // salvar o objeto
        await settingsRepository.save(settings);

        // retornar resposta
        return response.json(settings);
    }
}

export { SettingsController }