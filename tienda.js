window.onbeforeunload = agregarATiendaDeJson();

function agregarATiendaDeJson() {
    localStorage.getItem("QuesosEnLS") ||
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Estamos en mantenimiento, pronto estaremos online",
        });

    let contenedor = document.getElementById("cards");
    contenedor.innerHTML = "";

    fetch("../bbdd.json")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            localStorage.setItem("QuesosEnLS", JSON.stringify(data));
            for (let i = 0; i < data.length; i++) {
                let tipo = data[i].tipo;
                let descrip = data[i].descrip;
                let src = data[i].img;
                let id = data[i].id;

                contenedor.innerHTML += `
                <div class="col-8 col-sm-6 col-md-4 m-0 p-0 colTiendaCard" data-aos="fade-right">
                        <div id="${i}2" class="card m-3 p-0 tiendaCard">
                            <figure class="imagenes">
                                <img src="${src}" alt="foto de un queso ${tipo}" />
                                    <figcaption>
                                         <h5>${tipo}</h5>
                                         <p id="descrip" class="text-black">${descrip}</p>
                                     </figcaption>
                            </figure>
                                 <a id=agrg${id} class="btn btn-warning text-black agrgCarr">Agregar a carrito</a>
                        </div>
                </div>`;
            }
        });
}

function limpiarSessionStorage() {
    sessionStorage.clear();
    Swal.fire({
        icon: "success",
        title: "Cerraste sesión correctamente",
        showConfirmButton: true,
        timer: 1500,
    });
    setTimeout(() => {
        location.reload();
    }, 5000);
}