$(function () {
    let touchStartX = 0;
    let touchEndX = 0;

    function abrirMenu() {
        $('.menu-lateral').css('left', '0').addClass('aberto');
        $('.overlay').fadeIn();
    }

    function fecharMenu() {
        $('.menu-lateral').css('left', '-320px').removeClass('aberto');
        $('.overlay').fadeOut();
    }

    $('.menu-toggle').click(abrirMenu);
    $('.overlay').click(fecharMenu);

    document.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        let diffX = touchEndX - touchStartX;

        if (touchStartX < 50 && diffX > 50) {
            abrirMenu();
        }

        if (touchStartX > 50 && diffX < -50 && $('.overlay').is(':visible')) {
            fecharMenu();
        }
    });


    $('.menu-config').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.has-submenu').toggleClass('open');
    });

    $('.menu-tema').on('click', function (e) {
        e.preventDefault();

        if ($('html').hasClass('dark-mode')) {
            // 🔄 Se já estiver dark → volta para padrão
            $('html').removeClass('dark-mode');
            localStorage.removeItem('theme');
        } else {
            // 🌙 Se estiver padrão → ativa dark
            $('html').addClass('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        }

        // fecha submenu
        $(this).closest('.has-submenu').removeClass('open');

        if (window.matchMedia("(max-width: 768px)").matches) {
            fecharMenu();
        }
    });

});