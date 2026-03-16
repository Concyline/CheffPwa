class Router {

    static content = null;

    static init() {

        this.content = document.getElementById("app-content");

        window.addEventListener("hashchange", () => {
            this.handleRoute();
        });

        this.handleRoute();
    }

    static handleRoute() {

        console.log("Navegou")

        const hash = location.hash || "#/pratos";

        const parts = hash.replace("#/", "").split("/");

        const page = parts[0];

        //const navigation = page.charAt(0).toUpperCase() + page.slice(1);

        this.navigate(page);

    }

    static handleRoute() {

        const hash = location.hash || "#/pratos";

        const [page, query] = hash.replace("#/", "").split("?");


        const params = new URLSearchParams(query);

        const navigation = params.get("nav") || "Pratos";

        this.navigate(page, navigation);

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

            this.updateMenusTopbar(page)

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

    // RESETA TODOS OS MENUS DEPOIS DE NAVEGAR PARA UMA tela
    static updateMenusTopbar(page) {

        // esconde todos primeiro
        $('#btn-save').hide();
        $("#btn-imagem").hide();
        $("#btn-edit").hide();
        $("#btn-delet").hide();

        if (page === "mesas") {


        } else if (page === "pratos") {


        } else if (page === "usuarios") {
            $("#btn-save").show();
            $("#btn-imagem").show();
        }
    }
}