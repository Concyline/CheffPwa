class Router {

    static content = null;

    static init() {
        // onde sera inflado a nova pagina 
        this.content = document.getElementById("app-content");
    }

    static async navigate(page, navigation) {

        try {
            const response = await fetch(`./pages/${page}.html`);

            if (!response.ok) {
                throw new Error("Página não encontrada");
            }

            const html = await response.text();
            this.content.innerHTML = html;

            $('#top-bar-title').text(navigation)

            this.loadCss(page)
            this.loadJs(page)

        } catch (error) {
            this.content.innerHTML = "<h2>Erro ao carregar página</h2>";
            console.error(error);
        }
    }

    static loadCss(page) {

        const oldCss = document.getElementById("page-css");
        if (oldCss) oldCss.remove();

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = `./css/pages/${page}.css`;
        link.id = "page-css";

        document.head.appendChild(link);
    }

    static loadJs(page) {

        const oldJs = document.getElementById("page-js");
        if (oldJs) oldJs.remove();

        const script = document.createElement("script");
        script.src = `./js/pages/${page}.js`;
        script.id = "page-js";

        document.body.appendChild(script);
    }
}