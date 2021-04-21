import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Settings";
import { SettingsRepository } from "../repositories/SettingsRepository";


// informando ao TS as tipagens dos parametros
interface ISettingsCreate {
    chat: boolean;
    username: string
}

class SettingsService {
    // como deve vir o repositório
    private settingsRepository: Repository<Setting>

    // pegar o repositório
    constructor () {
        this.settingsRepository = getCustomRepository(SettingsRepository)
    }

    async create({chat, username}: ISettingsCreate) {
        // tentar encontra username no banco de dados
        const userAlreadyExists = await this.settingsRepository.findOne({
            username
        })

        // verificar se usuário já existe
        if (userAlreadyExists) {
            throw new Error("User already exists!")
        }

        // criar representação do objeto
        const settings = this.settingsRepository.create({
            chat,
            username
        });

        // salvar o objeto
        await this.settingsRepository.save(settings);
        
        return settings;
    }
}

export { SettingsService }