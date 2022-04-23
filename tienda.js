window.onload = agregarATienda();

alert(
    "Si la tienda esta vacía, se deben agregar productos desde la sección administrador. Gracias!"
);

function agregarATienda() {
    let listaProductos = JSON.parse(localStorage.getItem("QuesosEnLS"));
    let contenedor = document.getElementById("cards");
    contenedor.innerHTML = "";

    for (let i = 0; i < listaProductos.length; i++) {
        let marca = listaProductos[i].marca;
        let tipo = listaProductos[i].tipo;
        let descrip = listaProductos[i].descrip;

        contenedor.innerHTML += `
    <div class="col-8 col-sm-6 col-md-4 m-0 p-0 colTiendaCard" data-aos="fade-right">
            <div id="${i}2" class="card m-3 p-0 tiendaCard">
                <figure class="imagenes">
                    <img src="../img/quesos/${marca}/${tipo}.jpg" alt="" />
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