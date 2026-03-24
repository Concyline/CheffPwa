$(async function () {

    console.log('carregarPratos')
    carregarPratos()

})

async function carregarPratos() {
    try {

        var restautantTable = StorageManager.get(Constantes.RestautantTable)

        if (restautantTable) {

            console.log('carregarPratos restautantTable')

            const restaurantId = restautantTable.RestaurantId

            if (!restaurantId) {
                console.warn("RestaurantId não informado");
                return;
            }

            const dishes = await DishController.getDishes(restaurantId);

            console.log(dishes)

            renderPratos(dishes.data)

            //console.log(dishes)
            //renderizarPratos(dishes);
        }


    } catch (error) {
        console.error("Erro ao carregar pratos", error);
    }
}

function renderPratos(pratos) {

    const container = $("#lista-pratos");
    container.empty();

    pratos.forEach(p => {

        const html = `
            <div class="card-prato">
                <img src="${p.ImageBase64}" class="prato-img" />

                <div class="prato-info">
                    <h3>${p.Name}</h3>
                    <p>${p.Description}</p>
                    <strong>R$ ${p.Price.toFixed(2)}</strong>
                </div>
            </div>
        `;

        container.append(html);
    });
}