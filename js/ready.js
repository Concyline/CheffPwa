
// VARIAVEIS GLOBAIS DO SISTEMA
// VARIAVEIS GLOBAIS DO SISTEMA
// VARIAVEIS GLOBAIS DO SISTEMA

window.App = {

    aplicarPermisoes() {

        const user = StorageManager.get(Constantes.User);

        $('#div-role').hide();

        if (!user) return;

        if (user.Role === "RestaurantAdmin") {
            $('#div-role').show();
        }

    },

    showUserLocalStorage() {

        var user = StorageManager.get(Constantes.User);

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

        $('#avatar-lateral').attr("src", "../img/avatar.png")
        $('#email-lateral').text('Clique aqui para logar')
        $('#email-lateral').addClass('on-login')
        $("#email-lateral").css('pointer-events', 'auto')
        $('.menu-logout').hide()


    },

    async obterCacheName() {
        try {
            const response = await fetch('./service-worker.js');

            if (!response.ok) {
                $('#versao').text(StorageManager.get(Constantes.Versao));
                return
            }

            const conteudo = await response.text();
            const match = conteudo.match(/CACHE_NAME\s*=\s*['"`](.*?)['"`]/);

            if (match && match[1]) {
                $('#versao').text(match[1]);
                StorageManager.set(Constantes.Versao, match[1])
            } else {
                $('#versao').text('CACHE_NAME não encontrado')
            }

        } catch (error) {
            console.log('Erro', error.message)
            $('#versao').text(StorageManager.get(Constantes.Versao));
        }
    },

    getTokenUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        var tokenMesa = urlParams.get(Constantes.TokenMesa);

        if (tokenMesa) {
            StorageManager.set(Constantes.TokenMesa, tokenMesa)
        }
    }

};



// ON READY
// ON READY
// ON READY

$(function () {

    Router.init();

    App.showUserLocalStorage()
    App.obterCacheName()
    App.getTokenUrl()

    if (localStorage.getItem('theme') === 'dark-mode') {
        $('html').addClass('dark-mode');
    }

    const media = window.matchMedia("(min-width: 769px)");

    media.addEventListener("change", function (e) {

        if (e.matches) {
            $('.menu-lateral').css('left', '0');
            $('.overlay').hide();
        } else {
            $('.menu-lateral').css('left', '-320px');
        }

    });

    // registrando service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => {
                console.log('✅ Service Worker registrado:', reg.scope);

                // Verifica se há uma nova versão do SW sendo instalada
                reg.onupdatefound = () => {
                    const newWorker = reg.installing;

                    newWorker.onstatechange = () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            console.log('⚠️ Nova versão detectada. Recarregando...');
                            window.location.reload(); // Atualiza automaticamente
                        }
                    };
                };
            })
            .catch(err => {
                console.log('❌ Erro ao registrar SW:', err);
            });
    }

});
