$(function () {

})

async function notificar(pedidoId, mesa) {

    const reg = await navigator.serviceWorker.ready;

    reg.showNotification("Novo pedido!", {
        body: `Mesa ${mesa} solicitou atendimento`,
        icon: "/img/avatar.png",
        data: {
            url: `#/pedido/${pedidoId}`
        }
    });

}