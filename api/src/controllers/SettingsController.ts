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

        // chamando a função create do settingsService
        const settings = await settingsService.create({chat, username});

        // retornar resposta
        return response.json(settings);
    }
}

export { SettingsController }