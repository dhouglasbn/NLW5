const socket = io();
let connectionsUsers = []

// quando for emitido a admin_list_all_users
socket.on("admin_list_all_users", connections => {
    connectionsUsers = connections;

    // informações de html que vão ser alteradas
    document.getElementById("list_users").innerHTML = "";
    let template = document.getElementById("template").innerHTML;

    // para cada conexão dentro da minha array connections
    connections.forEach(connection => {

        // renderizando um elemento html com email e a id da socket
        const rendered = Mustache.render(template, {
            email: connection.user.email,
            id: connection.socket_id
        });

        // adicionando o elemento dentro do element list_users
        document.getElementById("list_users").innerHTML += rendered;
    });
});

function call(id) {

    // chamando a conexão com o usuário
    
    // pra cada item da array o que tiver a id === socket_id retorna o valor pra connection
    const connection = connectionsUsers.find(connection => connection.socket_id === id);

    // coletando elemento html
    const template = document.getElementById("admin_template").innerHTML;

    // atribuindo um elemento com template, email e id
    const rendered = Mustache.render(template, {
        email: connection.user.email,
        id: connection.user_id
    })

    // adicionando a rendered
    document.getElementById("supports").innerHTML += rendered;

    /////////////////////////////////////////////////////////////////////

    // chamando as mensagens do usuário

    // atribuindo a params uma user_id com valor da user_id
    const params = {
        user_id: connection.user_id
    }

    // emitindo em admin_list_messages_by_user as params e parametro messages
    socket.emit("admin_list_messages_by_user", params, messages => {

        // pegando o elemento html responsável pelas mensagens do meu user
        const divMessages = document.getElementById(
            `allMessages${connection.user_id}`
        )

        // paracada mensagem dentro da array messages ele vai fzr oseguinte
        messages.forEach(message => {
            // criar uma div e atribuir a create div
            const createDiv = document.createElement("div");

            // se for uma mensagem de cliente
            if (message.admin_id === null) {
                // atribuir a createDiv uma classse com esse nome
                createDiv.className = "admin_message_client";

                // colocar dentro de div uma span com email e mensagem do user
                createDiv.innerHTML = `<span>${connection.user.email} - ${message.text}</span>`;

                // formatar dentro de div a data de criação da mensagem
                createDiv.innerHTML = `<span class="admin_date>${dayjs(
                    message.created_at
                ).format("DD/MM/YYYY HH:mm:ss")}`;

            } else {
                // se for mensagem de admin

                // nomear uma classe com esse nome para o elemento
                createDiv.className = "admin_message_admin";

                // colocar esse valor dentro do elemento de createDiv
                createDiv.innerHTML = `Atendente: <span>${message.text}</span>`;

                // adicionar uma span com valor de criação da mensagem com formatação citada
                createDiv.innerHTML += `<span class="admin_date>${dayjs(
                    message.created_at
                ).format("DD/MM/YYYY HH:mm:ss")}`;
            }

            // ao final de cada processo adicionar uma createDiv
            divMessages.appendChild(createDiv);
        })
    })
};