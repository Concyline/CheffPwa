function injectScript(path) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = path;

        script.onload = resolve;
        script.onerror = reject;

        document.body.appendChild(script);
    });
}

injectScript("./js/ready.js")
injectScript("./js/storageManager.js")
injectScript("./js/topProgressBar.js")
injectScript("./js/componentes.js")
injectScript("./js/menu_lateral.js")
injectScript("./js/gerenteToken.js")
injectScript("./js/serviceWorker.js")
injectScript("./js/tokenManager.js")
injectScript("./js/apiService.js")
injectScript("./js/router.js")
injectScript("./js/app.js")
injectScript("./js/cropper.min.js")


