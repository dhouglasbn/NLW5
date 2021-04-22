import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { UsersService } from "../services/UsersService";
import { MessagesService } from "../services/MessagesService";

interface IParams {
    text: string;
    email: string;
}


io.on("connect", socket => {
    // instanciando nossas services
    const connectionsService = new ConnectionsService();
    const usersService = new UsersService();
    const messagesService = new MessagesService();

    

    // conexão de nome "client_first_access"
    socket.on("client_first_access", async params => {
        // atribuindo dos parametros de conexão a id da socket, texto e email
        const socket_id = socket.id;
        const { text, email } = params as IParams;

        let user_id = null

        // tentar encontrar usuário no DB
        const userExists = await usersService.findByEmail(email);

        // se não retornar nada
        if(!userExists) {
            // criar usuário no DB
            const user = await usersService.create(email);

            // criar conexão no DB
            await connectionsService.create({
                socket_id,
                user_id: user.id
            });

            user_id = user.id;
        } else {

            user_id = userExists.id;
            // encontrou usuário

            // tentar encontrar na table connections tudo aquilo que tiver a id do meu user
            const connection = await connectionsService.FindByUserId(userExists.id);

            // se não há conexão nenhuma no banco de dados
            if(!connection) {

                // ssalvar no banco de dados uma connection com a id da minha conexão socket 
                // e o id do meu usuário como valor de user_id
                await connectionsService.create({
                    socket_id,
                    user_id: userExists.id
                })

            } else {
                // se há conexão

                // sobrescrever a socket id
                connection.socket_id = socket_id

                // salvar a nova conexão em connections
                await connectionsService.create(connection)
            }
        }

        await messagesService.create({
            text,
            user_id
        })
    })
})