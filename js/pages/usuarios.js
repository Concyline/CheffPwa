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

    const formData = new FormData(this);

    var obj = {
        name: formData.get("nome"),
        email: formData.get("email"),
        phone: formData.get("telefone"),
        password: formData.get("senha"),
        role: 5
    }

    const json = JSON.stringify(obj);

    showAlert({ message: json });

});