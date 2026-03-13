
$(function () {

    Router.init();

    $(".menu-navigate").on("click", function (e) {
        e.preventDefault();

        const route = $(this).data("route");
        const navigation = $(this).data("navigation");

        Router.navigate(route, navigation);

        // ----------------------------------------------

        if (window.matchMedia("(max-width: 768px)").matches) {
            $('.menu-lateral').css('left', '-320px').removeClass('aberto');
            $('.overlay').fadeOut();
        }


    });

    // root da aplicação
    //Router.navigate("pratos", "Pratos");
    //Router.navigate("usuarios", "Usuários");

    processarRota()

});

function processarRota() {

    console.log('cru')

    Router.navigate("pratos", "Pratos");

    const hash = location.hash;

    console.log("rota:", hash);

    if (hash.startsWith("#/pedido/")) {

        console.log("entrou");

        const id = hash.split("/")[2];

        Router.navigate("usuarios", "Usuários");

        //carregarPedido(id);

        return;
    }

}