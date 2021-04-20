import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "./repositories/SettingsRepository";

const routes = Router();

routes.post("./settings", async (request, response) => {
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
})

export { routes };