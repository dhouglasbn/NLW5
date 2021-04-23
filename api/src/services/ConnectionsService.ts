import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

interface IConnectionCreate {
    socket_id: string;
    user_id: string;
    admin_id?: string;
    id?: string;
}


class ConnectionsService {
    // definindo tipagem do meu repositório
    private connectionsRepository: Repository<Connection>

    //  coletando todas as ferramentas do typeorm para usar como this.connectionsRepository
    constructor() {
        this.connectionsRepository = getCustomRepository(ConnectionsRepository)
    }
    
    async create({socket_id, user_id, admin_id, id}: IConnectionCreate) {

        // criando o modelo ded dados para ser inseridos na tabela
        const connection = this.connectionsRepository.create({
            socket_id,
            admin_id,
            user_id,
            id
        });

        // salvando os dados na tabela connection
        await this.connectionsRepository.save(connection);

        // retornando a array connection
        return connection
    }

    async FindByUserId (user_id: string) {

        // procurar na tabela connections tudo aquilo que tiver user_id
        const connection = await this.connectionsRepository.findOne({
            user_id
        });

        // retorna uma array dessas connections
        return connection;
    }

    async findAllWithoutAdmin() {
        // procurar na DB tudo aquele que admin_id === null
        const connections = await this.connectionsRepository.find({
            where: { admin_id: null },
            relations: ["user"]
        });

        return connections;
    }

    async findBySocketId (socket_id: string) {
        // consultar na DB uma conexão com socket_id que foi passado como argumento
        const connection = await this. connectionsRepository.findOne({
            socket_id
        });

        return connection;
    }

    async updateAdminID(user_id: string, admin_id: string) {
        // fazendo requisição query para:
        // atualizar na tabela settings
        // alterar valor de chat onde username tiver o valor da requisição
        // colocaro valor de chat no valor da requisição
        await this.connectionsRepository
        .createQueryBuilder()
        .update(Connection)
        .set({ admin_id })
        .where("user_id = :user_id", {
            user_id
        })
        .execute()
    }
}

export { ConnectionsService }