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


    // LOGUIN NO SISTEMA
    $("#form-login").on("submit", async function (e) {

        e.preventDefault();

        const formData = new FormData(this);

        const user = {
            email: formData.get("email")?.trim(),
            password: formData.get("senha")?.trim()
        };

        const response = await UserController.login(user);

        if (response.success) {

            showToast(response.message);
            renderUser()

            $("#login-dialog").fadeOut(200);
            this.reset();
        }

    });


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


});

function renderUser() {

    App.aplicarPermisoes()

    var user = Auth.getUser()

    if (user) {

        if (user.AvatarBase64) {
            $("#avatar-lateral").attr("src", user.AvatarBase64)
        }

        $("#email-lateral").text(user.Email);
        $('#email-lateral').removeClass('on-login')
        $("#email-lateral").css('pointer-events', 'none')
        $('.menu-logout').show()
        return

    }
}

function renderVisitor() {
    $('#avatar-lateral').attr("src", "../img/avatar.png")
    $('#email-lateral').text('Clique aqui para logar')
    $('#email-lateral').addClass('on-login')
    $("#email-lateral").css('pointer-events', 'auto')
    $('.menu-logout').hide()
}

// LOGOUT DO SISTEMA
$(".menu-logout").on("click", function (e) {

    e.preventDefault();

    UserController.logout();

    App.aplicarPermisoes()
    renderVisitor()

    showToast('Deslogado com sucesso!')

    if (window.matchMedia("(max-width: 768px)").matches) {
        fecharMenu();
    }
});


$(".menu-navigate").on("click", function (e) {

    e.preventDefault();

    const route = $(this).data("route");

    location.hash = "#/" + encodeURIComponent(route);

    $(".menu-navigate").removeClass("active");

    $(this).addClass("active");

    if (window.matchMedia("(max-width: 768px)").matches) {
        fecharMenu();
    }

});

$('#toggleLogin').click(function () {

    const input = $('#senhaLogin');

    if (input.attr('type') === 'password') {
        input.attr('type', 'text');
    } else {
        input.attr('type', 'password');
    }

});