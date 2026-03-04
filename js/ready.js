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

    async function obterCacheName() {
        try {
            const response = await fetch('./service-worker.js');

            if (!response.ok) {
                $('#versao').text(`Versão Offline: ${StorageManager.get("versao")}`);
                throw new Error('Não foi possível ler o service-worker.js');
            }

            const conteudo = await response.text();
            const match = conteudo.match(/CACHE_NAME\s*=\s*['"`](.*?)['"`]/);

            if (match && match[1]) {
                $('#versao').text(`Versão: ${match[1]}`);
                StorageManager.set("versao", match[1])
            } else {
                console.warn('CACHE_NAME não encontrado');
                $('#versao').text('CACHE_NAME não encontrado')
            }

        } catch (error) {
            console.error('Erro ao ler service-worker:', error);
            $('#versao').text('Erro ao ler service-worker:', error.message)

        }
    }

    obterCacheName()


});