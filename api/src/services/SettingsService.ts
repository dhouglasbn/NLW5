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

    async findByUsername (username: string) {

        // encontrar na minha table settings tudo aquilo q tem username
        const settings = await this.settingsRepository.findOne({
            username
        })

        // retornar essa array de settings
        return settings;
    }

    async update(username: string, chat: boolean ) {
        // fazendo requisição query para:
        // atualizar na tabela settings
        // alterar valor de chat onde username tiver o valor da requisição
        // colocaro valor de chat no valor da requisição
        const settings = await this.settingsRepository
        .createQueryBuilder()
        .update(Setting)
        .set({chat})
        .where("username = :username", {
            username
        })
        .execute()
    }
}

export { SettingsService }