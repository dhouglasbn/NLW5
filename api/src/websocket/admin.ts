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
})