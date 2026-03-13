
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


    processarRota()

});

function processarRota() {

    const hash = location.hash;

    var arrayNavigation = hash.split("/")


    if (arrayNavigation.length == 1) {
        // root da aplicação
        Router.navigate("pratos", "Pratos");

    } else if (arrayNavigation[1] == 'pedido') {

        Router.navigate("usuarios", "Usuários");

    }

    console.log("rota:", hash);
    console.log("arrayNavigation:", arrayNavigation);

    // if (hash.startsWith("#/pedido/")) {

    //     const id = hash.split("/")[2];

    //     // ficiticio ate definir oque fazer
    //     Router.navigate("usuarios", "Usuários");

    //     return;
    // }

}