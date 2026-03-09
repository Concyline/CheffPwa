$(".fone").on("input", function () {

    let v = $(this).val().replace(/\D/g, "");

    if (v.length > 10) {
        v = v.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else {
        v = v.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }

    $(this).val(v);

});

$("#form-usuario").on("submit", function (e) {

    e.preventDefault();

    const action = document.activeElement.value;

    console.log(action);

    if (action === "save") {
        console.log("Salvar");

        const formData = new FormData(this);

        var user = {
            name: formData.get("nome"),
            email: formData.get("email"),
            phone: formData.get("telefone"),
            password: formData.get("senha"),
            role: 5
        }

        save(user)

    } else if (action === "edit") {
        console.log("Editar");

    } else if (action === "delete") {
        console.log("Excluir");

    }



});

async function save(user) {
    const api = new ApiService()

    try {

        const response = await api.post("/user", user);

        if (!response.Success) {
            showAlert({ message: response.Message });
            return;
        }

        showAlert({ message: JSON.stringify(response.Message) });

    } catch (e) {
        showAlert({ message: e.message });
    }
}

$("#btn-imagem").on("click", () => $("#file-input").click());

$("#file-input").on("change", function () {

    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        const base64 = e.target.result; // aqui está o base64

        console.log(base64);

        showAlert({ message: base64 });

        //$("#preview").attr("src", base64);

    };

    reader.readAsDataURL(file);

});

$("#file-input").on("change", function () {

    const file = this.files[0];

    if (!file) {
        showAlert({ message: "Nenhum arquivo selecionado" });
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {

        const base64 = e.target.result;

        showAlert({ message: base64 });

        //$("#preview").attr("src", base64);

    };

    reader.onerror = function (error) {
        showAlert({ message: "Erro ao ler arquivo " + error });
    };

    reader.readAsDataURL(file);

});


