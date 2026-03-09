
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

});