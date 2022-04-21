window.onload = agregarATienda();

function agregarATienda() {
    let listaProductos = JSON.parse(localStorage.getItem("QuesosEnLS"));
    let contenedor = document.getElementById("cards");
    contenedor.innerHTML = "";

    for (let i = 0; i < listaProductos.length; i++) {
        let tipo = listaProductos[i].tipo;
        let descrip = listaProductos[i].descrip;
        let id = listaProductos[i].id;

        contenedor.innerHTML += `
        <div class="col-lg-3 col-md-4 col-sm-6">
        <div id="${i}2" class="card m-3 p-0" style="width: auto">
            <figure class="imagenes">
                <img src="../img/quesos/${id}" alt="foto de un queso azul, similar al Roquefort" />
                <figcaption>
                    <h2>${tipo}</h2>
                    <p id="descrip" class="text-black">${descrip}</p>
                </figcaption>
            </figure>
            <a id class="btn btn-warning text-black">Agregar a carrito</a>
        </div>
    </div>`;
    }
}