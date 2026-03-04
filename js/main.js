function injectScript(path) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = path;

        script.onload = resolve;
        script.onerror = reject;

        document.body.appendChild(script);
    });
}

//injectScript("https://code.jquery.com/jquery-3.6.0.min.js")
injectScript("./js/topProgressBar.js")
injectScript("./js/ready.js")
injectScript("./js/componentes.js")
injectScript("./js/menu_lateral.js")
injectScript("./js/gerenteToken.js")
injectScript("./js/serviceWorker.js")

injectScript("./js/tokenManager.js")
injectScript("./js/apiService.js")
injectScript("./js/storageManager.js")

