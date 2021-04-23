let socket_admin_id = null;

document.querySelector("#start_chat").addEventListener("click", (event) => {
    const socket = io();
    

    const chat_help = document.getElementById("chat_help");
    chat_help.style.display = "none";

    const chat_in_support = document.getElementById("chat_in_support");
    chat_in_support.style.display = "block";
    

    const email = document.getElementById("email").value;
    const text = document.getElementById("txt_help").value;

    socket.on("connect", () => {
        const params = {
            email,
            text
        }
        socket.emit("client_first_access", params, (call, err) => {
            if  (err) {

                console.err(err);
            } else {
                console.log(call)
            }
        })
    })

    // mostrar mensagens que foram emitidas pelo client.ts
    socket.on("client_list_all_messages", messages => {
        // coletando elementos html do chat
        var template_client = document.getElementById("message-user-template").innerHTML;
        var template_admin = document.getElementById("admin-template").innerHTML;

        // passando por cada elemento da array messages q foi emitida pelo ws
        messages.forEach(message => {
            // se a mensagem for do cliente
            if (message.admin_id === null) {
                // criar uma box no html com email e mensagem
                const rendered = Mustache.render(template_client, {
                    message: message.text,
                    email
                });

                // vai adicionando no chat uma rendered
                document.getElementById("messages").innerHTML += rendered;
            } else {
                const rendered = Mustache.render(template_admin, {
                    message_admin: message.text
                });

                document.getElementById("messages").innerHTML += rendered;
            }
        }) 
    })

    socket.on("admin_send_to_client", message => {
        socket_admin_id = message.socket_id;

        // pegando o conteúdo da div admin-template
        const template_admin = document.getElementById("admin-template").innerHTML;

        // atribuindo a rendered uma renderização da mensagem do admin
        const rendered = Mustache.render(template_admin, {
            message_admin: message.text
        });

        // adicionando rendered ao conteúdo do elemento messages
        document.getElementById("messages").innerHTML += rendered;
    })
});

// há um listener que fica vendo quando o botão é clicado
// quando for clicado vai rodar o seguint script
document.querySelector("#send_message_button").addEventListener("click", event => {

    // pegar o elemento de mensagem do usuário
    const text = document.getElementById("message_user");

    // colocando o text e o socket_id do admin em params
    const params = {
        text,
        socket_admin_id
    }

    // emitindo este emit junto com os params
    socket.emit("client_send_to_admin", params)
})


