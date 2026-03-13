$(function () {

})

async function notificar(pedidoId, mesa) {

    console.log('NOTIFICAR', pedidoId, mesa)

    if (!("Notification" in window)) {
        alert("Este navegador não suporta notificações");
        return;
    }

    let permissao = Notification.permission;

    if (permissao === "default") {
        permissao = await Notification.requestPermission();
    }

    if (permissao === "granted") {

        const reg = await navigator.serviceWorker.ready;

        reg.showNotification("Novo pedido!", {
            body: `Mesa ${mesa} solicitou atendimento`,
            icon: "/img/icon.png",
            vibrate: [200, 100, 200],
            data: {
                url: `/index.html?page=pedido&id=${pedidoId}`
            }
        });

    } else {
        console.log("Permissão negada");
    }

}

// async function notificar() {

//     console.log('NOTIFICAR')

//     if (!("Notification" in window)) {
//         alert("Este navegador não suporta notificações");
//         return;
//     }

//     let permissao = Notification.permission;

//     if (permissao === "default") {
//         permissao = await Notification.requestPermission();
//     }

//     if (permissao === "granted") {

//         const reg = await navigator.serviceWorker.ready;

//         reg.showNotification("Novo pedido!", {
//             body: "Mesa 4 solicitou atendimento",
//             icon: "/img/avatar.png",
//             badge: "/img/avatar.png",
//             vibrate: [200, 100, 200],
//             data: {
//                 url: "/?pagina=123"
//             }
//         });

//         // reg.showNotification("Novo pedido!", {
//         //     body: "Mesa 4 solicitou atendimento",
//         //     icon: "/img/icon.png"
//         // });

//         // new Notification("Novo pedido!", {
//         //     body: "Mesa 4 solicitou atendimento",
//         //     icon: "/img/icon.png"
//         // });

//     } else {
//         console.log("Permissão negada");
//     }

// }