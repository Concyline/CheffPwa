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

    // LOGUIN NO SISTEMA

    $("#email-lateral").on("click", function (e) {

        e.preventDefault();

        $("#login-dialog").fadeIn(200).css("display", "flex");

    });


    // FECHA COM SETA
    $("#btn-login-back").on("click", function () {

        $("#login-dialog").fadeOut(200).css("display", "none");

    });

    $("#form-login").on("submit", async function (e) {

        e.preventDefault();

        const api = new ApiService()

        try {

            const formData = new FormData(this);

            const login = {
                email: formData.get("email"),
                password: formData.get("senha")
            };

            const response = await api.post("/user/login", login);

            if (!response.Success) {
                showAlert({ message: response.Message });
                return;
            }

            StorageManager.set(Constantes.Token, response.Data.token);
            StorageManager.set(Constantes.User, response.Data.user);

            showToast(response.Message)

            clearForm()
            App.showUserLocalStorage()
            App.aplicarPermisoes()

            $("#login-dialog").fadeOut(200).css("display", "none");

        } catch (e) {
            showAlert({ message: e.message });
        }

    });

    function clearForm() {

        const form = $("#form-login")[0]
        form.reset()

    }


    // ^^^^^^^^^^^^ LOGUIN NO SISTEMA


    $('.menu').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.has-submenu').toggleClass('open');
    });

    $('.menu-add-user').on('click', function (e) {
        e.preventDefault();

        if (window.matchMedia("(max-width: 768px)").matches) {
            fecharMenu();
        }
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

        if (window.matchMedia("(max-width: 768px)").matches) {
            fecharMenu();
        }
    });

    // LOGOUT DO SISTEMA
    $('.menu-logout').on('click', function (e) {
        e.preventDefault();

        StorageManager.remove(Constantes.User)
        StorageManager.remove(Constantes.Token)

        App.showUserLocalStorage()
        App.aplicarPermisoes()

        if (window.matchMedia("(max-width: 768px)").matches) {
            fecharMenu();
        }

    });

    $(".menu-navigate").on("click", function (e) {

        e.preventDefault();

        $(".menu-navigate").removeClass("active"); // remove de todos os links

        $(this).addClass("active"); // adiciona no clicado

    });

});