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
}

export { ConnectionsService }