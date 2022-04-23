window.onload = logueo();

function logueo() {
    /*     alert("Para utilizar esta sección debes tener registro");
      let usuario = prompt("Por favor indicá tu nombre de ususario");
      let pass = prompt("Por favor elegí tu contraseña");
      localStorage.setItem(usuario, pass); */

    tomarBBDD();
}

function tomarBBDD() {
    let listaProductos = JSON.parse(localStorage.getItem("QuesosEnLS"));
    if (listaProductos == null) {
        const QUESOS = [];
    } else {
        ingresarProductoHTML(listaProductos);
    }
}

//construcción del producto

class Queso {
    constructor(marca, tipo, costo, descrip, cantidad) {
        this.marca = marca.toUpperCase();
        this.tipo = tipo.toUpperCase();
        this.costo = parseFloat(costo);
        this.descrip = descrip.toUpperCase();
        this.cantidad = parseFloat(cantidad);
        this.id = `${marca}_${tipo}`;
        this.vendido = false;
    }
}
const QUESOS = [];

// agregar productos al arreglo y guardarlo en localStorage

document.getElementById("formulario").addEventListener("submit", (e) => {
    e.preventDefault();

    let marca = document.getElementById("marca2").value;
    let tipo = document.getElementById("tipo2").value;
    let costo = document.getElementById("costo2").value;
    let descrip = document.getElementById("descrip2").value;
    let cantidad = document.getElementById("cantidad2").value;
    let id = `${marca}_${tipo}`;

    QUESOS.push(new Queso(marca, tipo, costo, descrip, cantidad));

    if (localStorage.length === 0) {
        localStorage.setItem("QuesosEnLS", JSON.stringify(QUESOS));
    } else {
        let listaProductos = JSON.parse(localStorage.getItem("QuesosEnLS"));
        let elemento = listaProductos.find((elemento) => elemento.id === id);
        if (elemento == null) {
            localStorage.setItem("QuesosEnLS", JSON.stringify(QUESOS));

            console.log("Dio NULL");
        } else {
            console.log("NO DIO NULL");
            console.log(elemento.cantidad);
            modificarCantidadProducto(id, parseFloat(cantidad), "QuesosEnLS");
        }
    }
    tomarBBDD();
    document.getElementById("formulario").reset();
});

//creación de funciones para el mantenimiento del stock

function ingresarProductoHTML(arreglo) {
    let contenedor = document.getElementById("tbody");
    contenedor.innerHTML = "";
    for (let i = 0; i < arreglo.length; i++) {
        let marca = arreglo[i].marca;
        let tipo = arreglo[i].tipo;
        let costo = arreglo[i].costo;
        let cantidad = arreglo[i].cantidad;
        let id = arreglo[i].id;

        contenedor.innerHTML += `
        
        <tr id="${id}">
            <td id="marca" class="bg-light">${marca}</td>
            <td id="tipo" class="bg-light">${tipo}</td>
            <td id="costo" class="bg-light">${costo}</td>
            <td id="cantidad" class="bg-light">${cantidad}</td>
            <td class="bg-light"><button class="btn btn-warning" onClick="modificarProducto(${i})"><img src="../img/botones/edit.png"alt=""/></button></td>
            <td class = "bg-light"><button class="btn btn-danger" onClick="eliminarProducto(${i})"><img src="../img/botones/delete.png" alt=""/></button></td>
        </tr>
        `;
    }
}

function modificarProducto(i) {
    let listaProductos = JSON.parse(localStorage.getItem("QuesosEnLS"));
    let id = listaProductos[i].id;
    let producto = listaProductos.find((elemento) => elemento.id === `${id}`);
    let contenedor = document.getElementById(`${id}`);
    contenedor.innerHTML = "";

    let marca = listaProductos[i].marca;
    let tipo = listaProductos[i].tipo;
    let costo = listaProductos[i].costo;
    let cantidad = listaProductos[i].cantidad;
    let descrip = listaProductos[i].descrip;

    document.getElementById("marca2").value = marca;
    document.getElementById("tipo2").value = tipo;
    document.getElementById("costo2").value = costo;
    document.getElementById("cantidad2").value = cantidad;
    document.getElementById("descrip2").value = descrip;

    producto.marca = marca;
    producto.tipo = tipo;
    producto.costo = costo;
    producto.cantidad = cantidad;
    producto.descrip = descrip;

    /*     localStorage.setItem("QuesosEnLS", JSON.stringify(listaProductos));
     */
    localStorage.removeItem("QuesosEnLS");

    QUESOS.splice(i, 1);
}

function eliminarProducto(i) {
    let id = QUESOS[i].id;
    let contenedor = document.getElementById(`${id}`);
    contenedor.innerHTML = "";

    let listaProductos = JSON.parse(localStorage.getItem("QuesosEnLS"));
    listaProductos = listaProductos.filter((element) => element.id != `${id}`);
    localStorage.setItem("QuesosEnLS", JSON.stringify(listaProductos));

    QUESOS.splice(i, 1);
}

function modificarCantidadProducto(id, cantidadProducto, nombreArreglo) {
    let listaProductos = JSON.parse(localStorage.getItem(nombreArreglo));
    let elemento = listaProductos.find((elemento) => elemento.id === id);
    let cantidadTotal =
        parseFloat(elemento.cantidad) + parseFloat(cantidadProducto);
    elemento.cantidad = cantidadTotal;
    localStorage.setItem(nombreArreglo, JSON.stringify(listaProductos));
}