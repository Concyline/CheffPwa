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