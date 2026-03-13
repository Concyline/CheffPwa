
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
    Router.navigate("pratos", "Pratos");
    //Router.navigate("usuarios", "Usuários");

});

window.addEventListener("focus", () => {

    console.log('focus')

    const params = new URLSearchParams(window.location.search);

    const page = params.get("page");
    const id = params.get("id");

    console.log('param ', page, id)

    if (page === "pedido") {

        Router.navigate("usuarios", "Usuários");

    }

});