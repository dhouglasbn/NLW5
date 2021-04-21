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

        // tentar encontra username no banco de dados
        const userAlreadyExists = await settingsRepository.findOne({
            username
        })

        // verificar se usuário já existe
        if (userAlreadyExists) {
            throw new Error("User already exists!")
        }

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