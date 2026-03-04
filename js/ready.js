$(function () {
    if (localStorage.getItem('theme') === 'dark-mode') {
        $('html').addClass('dark-mode');
    }


    // acao quando mudar o tamanho da tela
    $(window).on('resize', function () {

        // quando for tamanho de desktop
        if (window.matchMedia("(min-width: 769px)").matches) {
            $('.menu-lateral').css('left', '0');
            $('.overlay').hide();
        } else {
            $('.menu-lateral').css('left', '-320px');
        }

    });

    $('#btnLoader').on('click', function () {
        console.log('click');

        $('#loader')
            .css('display', 'flex') // força flex antes de animar
            .hide()                 // esconde imediatamente (caso visível)
            .fadeIn(200);           // anima a entrada

        setTimeout(() => {
            $('#loader').fadeOut(300); // Oculta após 5 segundos
        }, 5000); // corrigido: 500000 seria 8 minutos
    });


});