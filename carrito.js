window.onwaiting = "";

function Carrito(user, marca, tipo, costo) {
    class quesoCarro {
        constructor(user, marca, tipo, costo, cantidad) {
            this.user = user;
            this.marca = marca.toUpperCase();
            this.tipo = tipo.toUpperCase();
            this.costo = parseFloat(costo);
            this.cantidad = parseInt(cantidad);
            this.img = `./img/quesos/${marca}/MINI/${tipo}_mini.jpg`;
            this.id = `${marca}_${tipo}`;
            this.vendido = true;
        }
    }
    let CARRO = JSON.parse(localStorage.getItem("CarroEnLS"));
    if (CARRO === null) {
        const CARRO = [];
        CARRO.push(new quesoCarro(user, marca, tipo, costo, 1));
        localStorage.setItem("CarroEnLS", JSON.stringify(CARRO));
    } else {
        let quesosDeUser = CARRO.filter(
            (elemento) => elemento.user === sessionStorage.usuarioLogueado
        );
        if (quesosDeUser === undefined) {
            CARRO.push(new quesoCarro(user, marca, tipo, costo, 1));
            localStorage.setItem("CarroEnLS", JSON.stringify(CARRO));
        } else {
            let buscarItemRep = quesosDeUser.find(
                (queso) => queso.id === `${marca}_${tipo}`
            );
            if (buscarItemRep === undefined) {
                CARRO.push(new quesoCarro(user, marca, tipo, costo, 1));
                localStorage.setItem("CarroEnLS", JSON.stringify(CARRO));
            } else {
                let totalItem = buscarItemRep.cantidad + 1;
                let indexa = parseInt(quesosDeUser.indexOf(buscarItemRep));
                CARRO.splice(indexa, 1);
                CARRO.push(new quesoCarro(user, marca, tipo, costo, totalItem));
                localStorage.setItem("CarroEnLS", JSON.stringify(CARRO));
            }
            localStorage.setItem("CarroEnLS", JSON.stringify(CARRO));
        }
        console.log(CARRO);
        let carritoUser = CARRO.filter(
            (elemento) => elemento.user === sessionStorage.usuarioLogueado
        );
        if (carritoUser === undefined) {
            console.log("no hay productos en el carro");
        } else {
            let contenedorModal = document.getElementById("carritoBody");
            console.log(contenedorModal);
            contenedorModal.innerHTML = "";
            console.log(carritoUser);
            for (let i = 0; i < carritoUser.length; i++) {
                let tipoM = carritoUser[i].tipo;
                let cantM = carritoUser[i].cantidad;
                let srcM = carritoUser[i].img;
                console.log(carritoUser[i].img);
                contenedorModal.innerHTML += `
        <div class="col-8 col-sm-6 col-md-4 m-0 p-0 colTiendaCard" data-aos="fade-right">
                <div id="" class="card m-3 p-0 tiendaCard">
                    <figure class="imagenes">
                        <img src="${srcM}" alt="foto de un queso ${tipoM}" />
                            <figcaption>
                                 <h5>${tipoM}</h5>
                                 <h5>${cantM}</h5>
                             </figcaption>
                    </figure>
                </div>
        </div>`;
            }
        }
    }
}

let listaProductos = JSON.parse(localStorage.getItem("QuesosEnLS"));

let contenedor = document.getElementById("cards");

contenedor.addEventListener("click", (e) => {
    if (sessionStorage.usuarioLogueado === undefined) {
        Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "Tenes que loguearte para agregar productos al carrito",
            confirmButtonText: "Ir",
        }).then((result) => {
            if (result.isConfirmed) {
                window.location = "../index.html";
            }
        });
    } else {
        let elemento = listaProductos.find(
            (elemento) => elemento.id === e.target.id
        );
        if (elemento != undefined) {
            let user = sessionStorage.usuarioLogueado;
            let marca = elemento.marca;
            let costo = elemento.costo;
            let tipo = elemento.tipo;

            Carrito(user, marca, tipo, costo);
        }
    }
});