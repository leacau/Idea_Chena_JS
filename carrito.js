window.onwaiting = verCarrito();

function verCarrito() {
    let CARRO = JSON.parse(localStorage.getItem("CarroEnLS"));
    if (CARRO != null) {
        let find = CARRO.find(
            (element) => element.user === sessionStorage.usuarioLogueado
        );
        if (find != null) {
            let botonCarr = document.getElementById("modalCarr");
            botonCarr.classList.remove("visually-hidden");
        }
    }
}

function Carrito(user, marca, tipo, costo) {
    class quesoCarro {
        constructor(user, marca, tipo, costo, cantidad) {
            this.user = user;
            this.marca = marca.toUpperCase();
            this.tipo = tipo.toUpperCase();
            this.costo = parseFloat(costo);
            this.cantidad = parseInt(cantidad);
            this.img = `/img/quesos/${marca}/MINI/${tipo}_mini.jpg`;
            this.id = `${marca}_${tipo}`;
            this.vendido = true;
        }
    }
    let CARRO = JSON.parse(localStorage.getItem("CarroEnLS"));
    if (CARRO === null) {
        const CARRO = [];
        CARRO.push(new quesoCarro(user, marca, tipo, costo, 1));
        localStorage.setItem("CarroEnLS", JSON.stringify(CARRO));
        Swal.fire({
            icon: "success",
            title: "Producto agregado!",
            showConfirmButton: false,
            timer: 1000,
        });
        verCarrito();
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
                let indexa = parseInt(CARRO.indexOf(buscarItemRep));
                CARRO.splice(indexa, 1);
                CARRO.push(new quesoCarro(user, marca, tipo, costo, totalItem));
                localStorage.setItem("CarroEnLS", JSON.stringify(CARRO));
            }
            Swal.fire({
                icon: "success",
                title: "Producto agregado!",
                showConfirmButton: false,
                timer: 1000,
            });
            crearCarrito();
            verCarrito();
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

function crearCarrito() {
    let CARRO = JSON.parse(localStorage.getItem("CarroEnLS"));
    let carritoUser = CARRO.filter(
        (elemento) => elemento.user === sessionStorage.usuarioLogueado
    );
    if (carritoUser === undefined) {
        console.log("no hay productos en el carro");
    } else {
        let contenedorModal = document.getElementById("carritoBody");
        contenedorModal.innerHTML = "";
        for (let i = 0; i < carritoUser.length; i++) {
            let tipoM = carritoUser[i].tipo;
            let marcaM = carritoUser[i].marca;
            let cantM = carritoUser[i].cantidad;
            let srcM = carritoUser[i].img;
            let costoM = carritoUser[i].costo * cantM;
            costoM += costoM;
            contenedorModal.innerHTML += `
<div class="row m-0 p-0">
        <div class="m-0 p-0 col-2">
            <img src="${srcM}" class="img-fluid p-0 m-0 w-100 h-auto" alt="foto de un queso ${tipoM}"/>
        </div>
        <div class="col-5">
        ${marcaM} - ${tipoM}
        </div>
        <div class="col-2">
        Cantidad: ${cantM}
        </div>
        <div class="col-2">
        Valor: $${costoM}
        </div>
</div>`;
        }
    }
}

function limpiarCarro() {
    let CARRO = JSON.parse(localStorage.getItem("CarroEnLS"));
    let carritoUser = CARRO.filter(
        (elemento) => elemento.user === sessionStorage.usuarioLogueado
    );
    carritoUser.splice(0);
    crearCarrito();
}