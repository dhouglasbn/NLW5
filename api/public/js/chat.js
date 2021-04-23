document.querySelector("#start_chat").addEventListener("click", (event) => {

    

    const chat_help = document.getElementById("chat_help");
    chat_help.style.display = "none";

    const chat_in_support = document.getElementById("chat_in_support");
    chat_in_support.style.display = "block";
    const socket = io();

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
});
