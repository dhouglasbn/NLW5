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
            // encontrou usuário

            user_id = userExists.id;
            
            // tentar encontrar na table connections tudo aquilo que tiver a id do meu user
            const connection = await connectionsService.FindByUserId(userExists.id);

            // se não há conexão nenhuma no banco de dados
            if(!connection) {

                // salvar no banco de dados uma connection com a id da minha conexão socket 
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

        const allMessages = await messagesService.listByUser(user_id);

        socket.emit("client_list_all_messages", allMessages);

        const allUsers = await connectionsService.findAllWithoutAdmin();

        io.emit("admin_list_all_users", allUsers);
    });

    // na emissão do clientToAdmin ...
    socket.on("client_send_to_admin", async params => {
        // desestruturar text e socket_admin_id das params
        const { text, socket_admin_id } = params;

        // atribuindo a socket_id o id da socket
        const socket_id = socket.id;

        // consultando conexão pelo socket_id e coletando a user_id
        const { user_id } =  await connectionsService.findBySocketId(socket_id);

        // salvar na table messages a mensagem do usuário requerinte
        const message = await messagesService.create({
            text,
            user_id
        });

        // emitindo esta emmit com message e socket_id para o server ws
        io.to(socket_admin_id).emit("admin_receive_message", {
            message,
            socket_id
        })
    })

//     socket.on("disconnect", async () => {
//         await connectionsService.deleteBySocketId(socket.id);
//     })
})
