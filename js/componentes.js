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