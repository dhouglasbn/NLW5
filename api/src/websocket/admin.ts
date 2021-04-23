import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { MessagesService } from "../services/MessagesService";


io.on("connect", async socket => {
    // instanciando a service de connections
    const connectionsService = new ConnectionsService();
    const messagesService = new MessagesService();

    // encontrarndo todas as conexões
    const allConnectionsWithoutAdmin = await connectionsService.findAllWIthoutAdmin();

    // emitindo uma ws com essa array de conexões sem admin
    io.emit("admin_list_all_users", allConnectionsWithoutAdmin);

    // na emissão dessa ws usando params e callback como parametros
    socket.on("admin_list_messages_by_user", async (params, callback) => {
        // desestruturar user_id de params
        const { user_id } = params;

        // listando mensagens por usuário tendo como referencia minha user_id e atribuindo a allMessages
        const allMessages = await messagesService.listByUser(user_id);

        // retornando de volta la para minha função call do admin.js
        callback(allMessages);
    })

    socket.on("admin_send_message", async params => {
        // qnd o admin.js emitir esse emit

        // pegando user_id, text dos params da emissão
        const { user_id, text } = params;

        // salvar esses dados na table messages
        await messagesService.create({
            text,
            user_id,
            admin_id: socket.id
        });

        // pegar o socket id pela table de connections
        const { socket_id } = await connectionsService.FindByUserId(user_id);

        // emitindo essa emit com text e a socket_id do chat com o user
        io.to(socket_id).emit("admin_send_to_client", {
            text,
            socket_id: socket.id
        })

        socket.on("admin_user_in_support", async params => {
            const { user_id } = params;
            await connectionsService.updateAdminID(user_id, socket.id);

            // encontrarndo todas as conexões
            const allConnectionsWithoutAdmin = await connectionsService.findAllWIthoutAdmin();

            // emitindo uma ws com essa array de conexões sem admin
            io.emit("admin_list_all_users", allConnectionsWithoutAdmin);
        })
    })
})