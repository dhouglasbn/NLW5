import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository"



class UsersService {
    // como deve vir o repositório
    private usersRepository: Repository<User>

    // pegar o repositório
    constructor () {
        this.usersRepository = getCustomRepository(UsersRepository)
    }
    async create(email: string) {
        // Verificar se usuário existe
        const userExists = await this.usersRepository.findOne({
            email
        });

        // Se existir, retorna user
        if (userExists) {
            return userExists;
        }

        // Se não existir, salvar no DB
        const user = this.usersRepository.create({
            email
        })

        await this.usersRepository.save(user)
        

        return user;
    }

    async findByEmail(email: string) {
        // encontrar usuário com tal email
        const user = await this.usersRepository.findOne({ email });
      
        // retornar dados do usuário
        return user;
      }
}

export { UsersService }