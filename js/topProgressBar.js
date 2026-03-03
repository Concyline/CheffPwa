class TopProgressBar {

    static bar = null;

    static init() {

        if (this.bar) return;

        const container = document.createElement("div");
        container.id = "top-progress-container";

        Object.assign(container.style, {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "50px",
            overflow: "hidden",
            zIndex: "99999",
            display: "none"
        });

        const bar = document.createElement("div");
        bar.id = "top-progress-bar";

        Object.assign(bar.style, {
            width: "40%",
            height: "100%",
            background: "linear-gradient(90deg, #00FF55, #00cc44)",
            position: "absolute",
            animation: "progress-indeterminate 1.2s infinite ease-in-out"
        });

        container.appendChild(bar);
        document.body.appendChild(container);

        // 🔥 adiciona animação dinamicamente
        const style = document.createElement("style");
        style.innerHTML = `
            @keyframes progress-indeterminate {
                0% { left: -40%; }
                50% { left: 60%; }
                100% { left: 100%; }
            }
        `;
        document.head.appendChild(style);

        this.bar = container;
    }

    static start() {
        this.init();
        this.bar.style.display = "block";
    }

    static finish() {
        if (!this.bar) return;
        this.bar.style.display = "none";
    }
}