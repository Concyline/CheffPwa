$(function () {

})

// async function notificar(pedidoId, mesa) {

//     const reg = await navigator.serviceWorker.ready;

//     reg.showNotification("Novo pedido!", {
//         body: `Mesa ${mesa} solicitou atendimento`,
//         icon: "/img/avatar.png",
//         data: {
//             url: `/index.html#/pedido/${pedidoId}`
//         }
//     });

// }

async function notificar(pedidoId, mesa) {

    if (!("Notification" in window)) {
        console.log("Navegador não suporta notificações");
        return;
    }

    let permissao = Notification.permission;

    if (permissao === "default") {
        permissao = await Notification.requestPermission();
    }



    if (permissao !== "granted") {
        console.log("Permissão negada");
        return;
    }

    const reg = await navigator.serviceWorker.ready;



    reg.showNotification("Novo pedido!", {
        body: `Mesa ${mesa} solicitou atendimento`,
        icon: "/img/avatar.png",
        data: {
            url: `/index.html#/pedido/${pedidoId}`
        }
    });

}


document.getElementById("btn-permissao").addEventListener("click", async () => {

    const perm = await Notification.requestPermission();

    console.log("Permissão:", perm);

});