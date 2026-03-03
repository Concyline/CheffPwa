function showToast(message) {
    let toast = document.getElementById("toast");

    // Se não existir, cria
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.className = "toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;

    // Mostrar
    toast.style.opacity = "1";
    toast.style.transform = "translate(-50%, 0)";

    // Esconder depois de 3s
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translate(-50%, 20px)";
    }, 3000);
}

// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------

function showSnackbar(message, actionText = null, actionCallback = null) {
    const snackbar = document.createElement("div");
    snackbar.className = "snackbar";

    const text = document.createElement("span");
    text.textContent = message;

    snackbar.appendChild(text);

    if (actionText && actionCallback) {
        const actionBtn = document.createElement("button");
        actionBtn.className = "snackbar-action";
        actionBtn.textContent = actionText;

        actionBtn.addEventListener("click", () => {
            actionCallback();
            snackbar.remove();
        });

        snackbar.appendChild(actionBtn);
    }

    document.body.appendChild(snackbar);

    requestAnimationFrame(() => {
        snackbar.classList.add("show");
    });

    setTimeout(() => {
        snackbar.classList.remove("show");
        setTimeout(() => snackbar.remove(), 300);
    }, 4000);
}



// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------

function showAlert({
    title = "Attention",
    message = "Something went wrong.",
    type = "ok", // ok | confirm | triple

    okText = "OK",
    yesText = "Sim",
    noText = "Não",
    cancelText = "Cancelar"

} = {}) {

    return new Promise((resolve) => {

        const overlay = document.createElement("div");
        overlay.className = "alert-overlay show";

        const alertBox = document.createElement("div");
        alertBox.className = "alert";

        // HEADER
        const header = document.createElement("div");
        header.className = "alert-header";

        const icon = document.createElement("div");
        icon.className = "alert-icon";

        const titleEl = document.createElement("div");
        titleEl.className = "alert-title";
        titleEl.innerText = title;

        header.appendChild(icon);
        header.appendChild(titleEl);

        // MESSAGE
        const messageEl = document.createElement("div");
        messageEl.className = "alert-message";
        messageEl.innerText = message;

        // ACTIONS
        const actions = document.createElement("div");
        actions.className = "alert-actions";

        function close(result) {
            overlay.classList.remove("show");
            setTimeout(() => {
                overlay.remove();
                resolve(result);
            }, 250);
        }

        // ===== TIPOS =====

        if (type === "ok") {

            const okBtn = document.createElement("button");
            okBtn.className = "alert-button";
            okBtn.innerText = okText;
            okBtn.onclick = () => close("ok");

            actions.appendChild(okBtn);
        }

        if (type === "confirm") {

            const cancelBtn = document.createElement("button");
            cancelBtn.className = "alert-button";
            cancelBtn.innerText = cancelText;
            cancelBtn.onclick = () => close("cancel");

            const yesBtn = document.createElement("button");
            yesBtn.className = "alert-button";
            yesBtn.innerText = yesText;
            yesBtn.onclick = () => close("yes");

            actions.appendChild(cancelBtn);
            actions.appendChild(yesBtn);
        }

        if (type === "triple") {

            const cancelBtn = document.createElement("button");
            cancelBtn.className = "alert-button";
            cancelBtn.innerText = cancelText;
            cancelBtn.onclick = () => close("cancel");

            const noBtn = document.createElement("button");
            noBtn.className = "alert-button";
            noBtn.innerText = noText;
            noBtn.onclick = () => close("no");

            const yesBtn = document.createElement("button");
            yesBtn.className = "alert-button";
            yesBtn.innerText = yesText;
            yesBtn.onclick = () => close("yes");

            actions.appendChild(cancelBtn);
            actions.appendChild(noBtn);
            actions.appendChild(yesBtn);
        }

        // MONTA
        alertBox.appendChild(header);
        alertBox.appendChild(messageEl);
        alertBox.appendChild(actions);
        overlay.appendChild(alertBox);

        document.body.appendChild(overlay);

        // Fecha clicando fora
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                close("cancel");
            }
        });
    });
}

// function showAlert(title, message) {

//     const overlay = document.createElement("div");
//     overlay.className = "alert-overlay";

//     const alertBox = document.createElement("div");
//     alertBox.className = "alert";

//     const header = document.createElement("div");
//     header.className = "alert-header";

//     const icon = document.createElement("div");
//     icon.className = "alert-icon";

//     const titleEl = document.createElement("div");
//     titleEl.className = "alert-title";
//     titleEl.textContent = title;

//     header.appendChild(icon);
//     header.appendChild(titleEl);

//     const messageEl = document.createElement("div");
//     messageEl.className = "alert-message";
//     messageEl.textContent = message;

//     const actions = document.createElement("div");
//     actions.className = "alert-actions";

//     const cancelBtn = document.createElement("button");
//     cancelBtn.className = "alert-button";
//     cancelBtn.textContent = "CANCEL";

//     const okBtn = document.createElement("button");
//     okBtn.className = "alert-button";
//     okBtn.textContent = "YES";

//     function closeAlert() {
//         overlay.classList.remove("show");
//         setTimeout(() => overlay.remove(), 250);
//     }

//     cancelBtn.addEventListener("click", closeAlert);
//     okBtn.addEventListener("click", closeAlert);

//     overlay.addEventListener("click", (e) => {
//         if (e.target === overlay) {
//             closeAlert();
//         }
//     });

//     actions.appendChild(cancelBtn);
//     actions.appendChild(okBtn);

//     alertBox.appendChild(header);
//     alertBox.appendChild(messageEl);
//     alertBox.appendChild(actions);

//     overlay.appendChild(alertBox);
//     document.body.appendChild(overlay);

//     requestAnimationFrame(() => {
//         overlay.classList.add("show");
//     });
// }

// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------