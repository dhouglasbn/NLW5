import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";


// informando ao TS as tipagens dos parametros
interface ISettingsCreate {
    chat: boolean;
    username: string
}

class SettingsService {

    async create({chat, username}: ISettingsCreate) {
        // pegar o repositório
        const settingsRepository = getCustomRepository(SettingsRepository);

        // criar representação do objeto
        const settings = settingsRepository.create({
            chat,
            username
        });

        // salvar o objeto
        await settingsRepository.save(settings);
        
        return settings;
    }
}

export { SettingsService }