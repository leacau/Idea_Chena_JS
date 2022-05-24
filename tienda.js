window.onwaiting = agregarATiendaDeJson();

function agregarATiendaDeJson() {
    let contenedor = document.getElementById("cards");
    contenedor.innerHTML = "";

    fetch("../bbdd.json")
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem("QuesosEnLS", JSON.stringify(data.quesos));
            for (let i = 0; i < data.quesos.length; i++) {
                let tipo = data.quesos[i].tipo;
                let descrip = data.quesos[i].descrip;
                let src = data.quesos[i].img;
                let id = data.quesos[i].id;

                contenedor.innerHTML += `
                <div class="col-8 col-sm-6 col-md-4 m-0 p-0 colTiendaCard" data-aos="fade-right">
                        <div id="" class="card m-3 p-0 tiendaCard">
                            <figure class="imagenes">
                                <img src="${src}" alt="foto de un queso ${tipo}" />
                                    <figcaption>
                                         <h5>${tipo}</h5>
                                         <p id="descrip" class="text-black">${descrip}</p>
                                     </figcaption>
                            </figure>
                            <a id=${id} class="btn btn-warning text-black agrgCarr" title="hola">Agregar a carrito</a>
                        </div>
                </div>`;
            }
        });
}