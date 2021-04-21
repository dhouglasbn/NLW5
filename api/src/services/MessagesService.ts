import { Message } from "../entities/Message";
import { getCustomRepository, Repository } from "typeorm"
import { MessagesRepository } from "../repositories/MessagesRepository"

interface IMessageCreate {
    admin_id?: string; // colocar um ? antes dos : faz com que o atributo seja opcional
    text: string;
    user_id: string;
}

class MessagesService {
    // como deve vir o repositório
    private messagesRepository: Repository<Message>;

    // pegar o repositório assim que a classe for instanciada
    constructor() {
        this.messagesRepository = getCustomRepository(MessagesRepository)
    }

    async create({admin_id, text, user_id}: IMessageCreate) {


        const message = this.messagesRepository.create({
            admin_id,
            text,
            user_id
        })

        await this.messagesRepository.save(message);

        return message;
    }

    async listByUser (user_id: string) {
        const list = await this.messagesRepository.find({
            where: { user_id },
            relations: ["user"]
        })

        return list;
    }
}

export { MessagesService }