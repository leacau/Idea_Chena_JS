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

function agregado() {
    Swal.fire({
        icon: "success",
        title: "Producto agregado!",
        showConfirmButton: false,
        timer: 1000,
    });
    verCarrito();
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
        agregado();
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
                console.log(CARRO);

            }
            crearCarrito();
            agregado();
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
        const pedido = [];
        let suma = 0;
        let mensaje = "";
        let contenedorModal = document.getElementById("carritoBody");
        contenedorModal.innerHTML = "";
        for (let i = 0; i < carritoUser.length; i++) {
            let tipoM = carritoUser[i].tipo;
            let marcaM = carritoUser[i].marca;
            let cantM = carritoUser[i].cantidad;
            let srcM = carritoUser[i].img;
            let costoM = carritoUser[i].costo * cantM;
            suma = suma + costoM;
            
            let itemPedido = {
                    "marca":`${marcaM}`, 
                    "tipo":`${tipoM}`,
                    "cantidad":`${cantM}`,
                    "costo":`${costoM}`,
                }
            pedido.push(itemPedido);
            
            contenedorModal.innerHTML += `
            <div class="row m-0 p-0  border-bottom border-2">
                <div class="m-0 p-0 col-2">
                    <img src="${srcM}" class="img-fluid p-0 m-0 w-100 h-auto" alt="foto de un queso ${tipoM}"/>
                </div>
                <div class="col-5">${marcaM} - ${tipoM}</div>
                <div class="col-2">Cantidad: ${cantM}</div>
                <div class="col-2">Valor: $${costoM}</div>
            </div>`;
        
                
            mensaje += `%0AQueso ${marcaM} - ${tipoM}\n
            Cantidad: ${cantM}\n
            Precio: $${costoM}\n`
            let finalMsj =""
            finalMsj += `%0A*Total Final: $${suma}*%0A`

            let whatsapp = mensaje + finalMsj
            ;
        

        let footerModal = document.getElementById("modalFooter");
        footerModal.innerHTML=""
        footerModal.innerHTML+=`
        <div class="m-0 p-0 text-end align-text-top text-bg-info text-black">Total: $${suma}</div>
        <br>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerra</button>
        <button type="button" class="btn btn-primary" onclick="limpiarCarro()">Limpiar carrito</button>
        <a href="https://api.whatsapp.com/send?phone=5493425051513&text=Hola, hice el siguiente pedido desde la web:
        ${whatsapp}" target="_blank"><button type="button" class="btn btn-primary">Enviar Pedido </button></a>
        `
        }     
    }   
}

function limpiarCarro() {
    let CARRO = JSON.parse(localStorage.getItem("CarroEnLS"));
    let carritoLimpio = CARRO.filter(
        (elemento) => elemento.user != sessionStorage.usuarioLogueado
    );
    localStorage.removeItem("CarroEnLS");
    CARRO = carritoLimpio;
    localStorage.setItem("CarroEnLS", JSON.stringify(CARRO));
   location.reload();
}
console.log(document.querySelector("#carritoBody").value);