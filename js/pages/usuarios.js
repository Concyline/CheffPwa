

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
            avatarbase64: formData.get("avatarbase64"),
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

$("#btn-imagem").click(function () {

    if (window.matchMedia("(min-width: 769px)").matches) {
        $("#file-galeria").click();

    } else {

        $(".popup-overlay").fadeIn(150);
        $("#popup-menu").addClass("show");

    }

});

$("#overlay").click(function () {
    $("#overlay").fadeOut(150);
    $("#popup-menu").removeClass("show");
});

$("#btn-camera").click(function () {
    $("#file-camera").click();

    $("#overlay").fadeOut(150);
    $("#popup-menu").removeClass("show");
});

$("#btn-galeria").click(function () {

    $("#file-galeria").click();

    $("#overlay").fadeOut(150);
    $("#popup-menu").removeClass("show");
});

$("#file-camera").on("change", function () {
    lerImagem(this);
    $(this).val(""); // limpa o input
});

$("#file-galeria").on("change", function () {
    lerImagem(this);
    $(this).val(""); // limpa o input
});

let cropper;

function lerImagem(input) {

    console.log('ta lnedo')

    const file = input.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    $("#image-crop").attr("src", url);

    $("#crop-dialog").fadeIn(200);
    $("#crop-dialog").addClass("show");

    if (cropper) cropper.destroy();

    cropper = new Cropper(document.getElementById("image-crop"), {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: "move",
        autoCropArea: 1,
        background: false,
        movable: true,
        zoomable: true
    });
}

$("#btn-cortar").click(function () {

    if (!cropper) return;

    const canvas = cropper.getCroppedCanvas({
        width: 256,
        height: 256
    });

    const base64 = canvas.toDataURL("image/webp", 0.8);

    $("#preview").attr("src", base64);
    $("#avatarbase64").val(base64);

    cropper.destroy();

    $("#crop-dialog").fadeOut(200);
    $("#crop-dialog").removeClass("show");

});

$("#btn-cancelar-crop").click(function () {

    if (cropper) {
        cropper.destroy();
    }

    //$("#crop-dialog").fadeOut(200);
    $("#crop-dialog").removeClass("show");

});

// function lerImagem(input) {

//     const file = input.files[0];
//     if (!file) return;

//     const reader = new FileReader();

//     reader.onload = function (e) {

//         const img = new Image();

//         img.onload = function () {

//             const canvas = document.createElement("canvas");
//             const ctx = canvas.getContext("2d");

//             const size = 256; // tamanho final do avatar

//             canvas.width = size;
//             canvas.height = size;

//             // menor lado da imagem
//             const minSide = Math.min(img.width, img.height);

//             // ponto inicial para cortar do centro
//             const sx = (img.width - minSide) / 2;
//             const sy = (img.height - minSide) / 2;

//             ctx.drawImage(
//                 img,
//                 sx, sy,           // origem do corte
//                 minSide, minSide, // área cortada
//                 0, 0,             // destino
//                 size, size        // tamanho final
//             );

//             const base64 = canvas.toDataURL("image/webp", 0.8);

//             $("#preview").attr("src", base64);
//             $("#avatarbase64").val(base64);

//         };

//         img.src = e.target.result;

//     };

//     reader.readAsDataURL(file);
// }

// function lerImagem(input) {

//     const file = input.files[0];

//     if (!file) return;

//     const reader = new FileReader();

//     reader.onload = function (e) {

//         const base64 = e.target.result;

//         $("#preview").attr("src", base64);
//         $("#avatarbase64").val(base64); // guarda no input hidden

//     };

//     reader.readAsDataURL(file);

// }


// $("#file-input").on("change", function () {

//     const file = this.files[0];

//     if (!file) {
//         showAlert({ message: "Nenhum arquivo selecionado" });
//         return;
//     }

//     const reader = new FileReader();

//     reader.onload = function (e) {

//         const base64 = e.target.result;

//         //showAlert({ message: base64 == null });

//         $("#preview").attr("src", base64);

//     };

//     reader.onerror = function (error) {
//         showAlert({ message: "Erro ao ler arquivo " + error });
//     };

//     reader.readAsDataURL(file);

// });


