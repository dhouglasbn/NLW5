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
        console.log("Messages", messages)
    })
}