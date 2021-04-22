import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";
import { SettingsService } from "../services/SettingsService";



class SettingsController {
    async create(request: Request, response: Response) {
        // coletar dados da requisição
        const { chat, username } = request.body;

        // instanciando a class SettingsService
        const settingsService = new SettingsService();

        try {
            // inserindo dados na tabela settings
            const settings = await settingsService.create({chat, username});

            // retornar resposta de sucesso
            return response.json(settings)
        } catch (error) {
            // retornar resposta de erro
            return response.status(400).json({
                message: error.message
            })
        }
    }

    async findByUsername(request: Request, response: Response) {
        // coleta de dados da requisição
        const { username } = request.params;

        // instanciando a service de settings
        const settingsService = new SettingsService();

        // tentar encontrar na table settings tudo aquilo q tem username
        const settings = await settingsService.findByUsername(username);

        // retornar essa array de settings
        return response.json(settings);
    }
}

export { SettingsController }