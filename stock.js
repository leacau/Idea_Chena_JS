class Queso {
    constructor(marca, tipo, costo) {
        this.marca = marca.toUpperCase();
        this.tipo = tipo.toUpperCase();
        this.costo = parseFloat(costo);
        this.vendido = false;
    }
}
const QUESOS = [];

function ingresarProductoHTML() {
    let contenedor = document.getElementById("tbody");
    contenedor.innerHTML = "";

    for (let i = 0; i < QUESOS.length; i++) {
        let marca = QUESOS[i].marca;
        let tipo = QUESOS[i].tipo;
        let costo = QUESOS[i].costo;

        contenedor.innerHTML += `
        <tr id="${i}">
            <td id="marca" class="bg-light">${marca}</td>
            <td id="tipo" class="bg-light">${tipo}</td>
            <td id="costo" class="bg-light">${costo}</td>
            <td class="bg-light"><button class="btn btn-warning" onClick="modificarProducto(${i})"><img src="./img/edit.png"alt=""/></button></td>
            <td class = "bg-light"><button class="btn btn-danger" onClick="eliminarProducto(${i})"><img src="./img/delete.png" alt=""/></button></td>
        </tr>
        `;
    }
}

function modificarProducto(i) {
    let contenedor = document.getElementById(`${i}`);
    contenedor.innerHTML = "";

    let marca = QUESOS[i].marca;
    let tipo = QUESOS[i].tipo;
    let costo = QUESOS[i].costo;

    document.getElementById("marca2").value = marca;
    document.getElementById("tipo2").value = tipo;
    document.getElementById("costo2").value = costo;

    QUESOS.splice(i, 1);
}

function eliminarProducto(i) {
    let contenedor = document.getElementById(`${i}`);
    contenedor.innerHTML = "";

    QUESOS.splice(i, 1);
}

document.getElementById("formulario").addEventListener("submit", (e) => {
    e.preventDefault();

    let marca = document.getElementById("marca2").value;
    let tipo = document.getElementById("tipo2").value;
    let costo = document.getElementById("costo2").value;

    /*    const datosDeQueso = {
                            marca,
                            tipo,
                            costo,
                        }; */

    QUESOS.push(new Queso(marca, tipo, costo));
    ingresarProductoHTML();
    document.getElementById("formulario").reset();
});