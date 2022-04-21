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

// definición del array
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

    localStorage.setItem("QuesosEnLS", JSON.stringify(QUESOS));

    ingresarProductoHTML();

    document.getElementById("formulario").reset();
});

//creación de funciones para el mantenimiento del stock

function ingresarProductoHTML() {
    let contenedor = document.getElementById("tbody");
    contenedor.innerHTML = "";

    for (let i = 0; i < QUESOS.length; i++) {
        let marca = QUESOS[i].marca;
        let tipo = QUESOS[i].tipo;
        let costo = QUESOS[i].costo;
        let cantidad = QUESOS[i].cantidad;
        let id = QUESOS[i].id;

        contenedor.innerHTML += `
        
        <tr id="${id}">
            <td id="marca" class="bg-light">${marca}</td>
            <td id="tipo" class="bg-light">${tipo}</td>
            <td id="costo" class="bg-light">${costo}</td>
            <td id="cantidad" class="bg-light">${cantidad}</td>
            <td class="bg-light"><button class="btn btn-warning" onClick="modificarProducto(${i})"><img src="./img/botones/edit.png"alt=""/></button></td>
            <td class = "bg-light"><button class="btn btn-danger" onClick="eliminarProducto(${i})"><img src="./img/botones/delete.png" alt=""/></button></td>
        </tr>
        `;
    }
}

function modificarProducto(i) {
    let id = QUESOS[i].id;
    let contenedor = document.getElementById(`${id}`);
    contenedor.innerHTML = "";

    let marca = QUESOS[i].marca;
    let tipo = QUESOS[i].tipo;
    let costo = QUESOS[i].costo;
    let cantidad = QUESOS[i].cantidad;
    let descrip = QUESOS[i].descrip;

    document.getElementById("marca2").value = marca;
    document.getElementById("tipo2").value = tipo;
    document.getElementById("costo2").value = costo;
    document.getElementById("cantidad2").value = cantidad;
    document.getElementById("descrip2").value = descrip;

    let listaProductos = JSON.parse(localStorage.getItem("QuesosEnLS"));
    let producto = listaProductos.find((elemento) => elemento.id === `${id}`);
    producto.marca = marca;
    producto.tipo = tipo;
    producto.costo = costo;
    producto.cantidad = cantidad;
    producto.descrip = descrip;
    localStorage.setItem("QuesosEnLS", JSON.stringify(listaProductos));
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