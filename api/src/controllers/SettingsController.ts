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
            // chamando a função create do settingsService
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
}

export { SettingsController }