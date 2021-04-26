
// variáveis que serão mutadas durante o código
let socket_admin_id = null;
let emailUser = null;
let socket = null

// escutando em tempo real o botão #start_chat, quando for clicado :
document.querySelector("#start_chat").addEventListener("click", (event) => {
    
    
    // tirar a box chat_help da tela
    const chat_help = document.getElementById("chat_help");
    chat_help.style.display = "none";

    // por a chat_in_support na tela
    const chat_in_support = document.getElementById("chat_in_support");
    chat_in_support.style.display = "block";

    // atribuindo a socket as ferramentas para trabalhar com socket.io
    socket = io();
    

    // pegando o valor do email inserido pelo user
    const email = document.getElementById("email").value;
    emailUser = email;

    // pegando o valor do texto inserido pelo user
    const text = document.getElementById("txt_help").value;

    // quando haver uma conexão socket
    socket.on("connect", () => {
        const params = {
            email,
            text
        }
        // emitir "client_first_access" com params, call e err
        socket.emit("client_first_access", params, (call, err) => {
            // mostrar no console o erro
            if  (err) {

                console.err(err);
            } else { // mostrar no console o callback
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

    // quando for emitida "admin_send_to_client":
    socket.on("admin_send_to_client", message => {
        // atribuir a socket_admin_id a socket.id da mensagem
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
        text: text.value,
        socket_admin_id
    }

    // emitindo este emit junto com os params
    socket.emit("client_send_to_admin", params)

    // atribuindo a template_client o seguinte elemento html
    const template_client = document.getElementById("message-user-template").innerHTML;

    // atribuindo a rendered um elemento com message e email
    const rendered = Mustache.render(template_client, {
        message: text.value,
        email: emailUser
    });

    // adicionando rendered a messages
    document.getElementById("messages").innerHTML += rendered;

    // apagando o valor da text
    text.value = "";
})


