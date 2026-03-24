
// VARIAVEIS GLOBAIS DO SISTEMA
// VARIAVEIS GLOBAIS DO SISTEMA
// VARIAVEIS GLOBAIS DO SISTEMA

window.App = {


    // INICIA TODO O SISTEMA 
    async init() {
        await this.getTokenUrl();
        await this.obterCacheName();
        await this.aplicarPermisoes();

        await Router.init()
        await UserController.init()
    },

    aplicarPermisoes() {

        var user = Auth.getUser()

        var divRole = $('#div-role')
        var menuFood = $('.menu-food')

        divRole.hide(); // CAMPO NO CADASTRO DE USUARIOS PARA TIPOS DE USUARIOS
        menuFood.hide(); // MENU LATERAL PRATOS 

        if (!user) return;

        if (user.Role === Constantes.RestaurantAdmin) {
            divRole.show();
            menuFood.show();

        }

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

    async getTokenUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        var QrToken = urlParams.get(Constantes.QrToken);

        if (QrToken) {

            var result = await RestaurantTablesController.getRestautrantTable(QrToken)
            StorageManager.set(Constantes.RestautantTable, result.data)
        }
    }

};



// ON READY
// ON READY
// ON READY

$(async function () {

    await App.init()

    //Router.init()
    //UserController.init()

    //App.obterCacheName()
    //App.getTokenUrl()

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
