class Queso {
    constructor(nombreP, tipo, costo) {
        this.nombreP = nombreP.toUpperCase();
        this.tipo = tipo.toUpperCase();
        this.costo = parseFloat(costo);
        this.vendido = false;
    }
}
//algo de stock inicial
const queso1 = new Queso("DON ANGEL", "CREMOSO", 614);
const queso2 = new Queso("TREGAR", "CREMOSO", 815);
const queso3 = new Queso("DON ALBERTO", "CREMOSO", 540);

//muestra stock
function muestraStock(quesos) {
    var salida = "";
    for (var property in quesos) {
        salida += property + ": " + quesos[property] + "\n";
    }
    alert(salida);
}

//compra queso

function compraQueso(compQueso) {
    while (compQueso != "0") {
        switch (compQueso) {
            case "1":
                console.log(compQueso);
                alert(
                    "Adquiriste el juego: " + queso1.nombreP + " por $" + queso1.costo
                );
                break;
            case "2":
                alert(
                    "Adquiriste el juego: " + queso2.nombreP + " por $" + queso2.costo
                );
                break;
            case "3":
                alert(
                    "Adquiriste el juego: " + queso3.nombreP + " por $" + queso3.costo
                );
                break;
        }
        alert("Gracias por tu compra. Vuelve pronto.");
        break;
    }
}

alert("Hola! Bienvenido/a a nuestra web");
let ingreso = prompt(
    "Indicanos cómo queres Ingresar: \n 1.Administrador \n 2.Usuario"
);

while (ingreso != 1 && ingreso != 2) {
    ingreso = prompt(
        "Indicanos cómo queres Ingresar: \n 1.Administrador \n 2.Usuario"
    );
}

if (ingreso == 1) {
    alert("Hola!, te damos la bienvenida a esta stockeadora de productos");
    let nombre = prompt("Para comenzar, decinos tu nombre");

    let agregar = prompt(
        `${nombre} empecemos a ingresar productos a tu stock. Seguimos? (S-N)`
    );
    while (agregar != "s" && agregar != "S" && agregar != "N" && agregar != "n") {
        agregar = prompt(
            `${nombre} Necesitamos que ingreses un valor válido. Seguimos? (S-N)`
        );
    }
    const quesos = [];
    while (agregar != "N" && agregar != "n") {
        let nombreP = prompt("Indicá la marca del queso");
        let tipo = prompt("Indicá el tipo de queso");
        let costo = parseFloat(prompt("Indicá el precio de costo del queso"));

        quesos.push(new Queso(nombreP, tipo, parseFloat(costo)));

        agregar = prompt("Queres agregar otro producto? S-N");
        while (
            agregar !== "S" &&
            agregar !== "s" &&
            agregar !== "N" &&
            agregar !== "n"
        ) {
            agregar = prompt(
                nombre +
                ", necesitamos que ingreses un valor válido. Deseas continuar (S-N)"
            );
        }
    }

    alert(nombre + " has agregado " + quesos.length + " productos nuevos!!.");

    for (const producto of quesos) {
        alert(
            "Marca: " +
            producto.nombreP +
            " Tipo: " +
            producto.tipo +
            " Costo: " +
            producto.costo
        );
    }

    document.write(
        `<div style="color:black">Hola ${nombre} <br> Estos son los productos ingresados:</div>`
    );
    for (const producto of quesos) {
        document.write(
            `<div style="color:black">Marca: ${producto.nombreP} - Tipo: ${producto.tipo} - Costo: ${producto.costo}</div>`
        );
    }
    alert("Gracias " + nombre + " por usar esta app!");
} else {
    alert("Vamos de compras");

    let consultar = prompt("Querés ver nuestros productos para comprar? (S-N)");
    while (
        consultar != "S" &&
        consultar != "s" &&
        consultar != "N" &&
        consultar != "n"
    ) {
        consultar = prompt("Querés ver nuestros productos para comprar? (S-N)");
    }
    if (consultar == "S" || consultar == "s") {
        muestraStock(queso1);
        muestraStock(queso2);
        muestraStock(queso3);

        let compra = prompt(
            "Qué queso quieres comprar? \n1." +
            queso1.nombreP +
            "\n2." +
            queso2.nombreP +
            "\n3." +
            queso3.nombreP +
            "\n4. Ninguno"
        );
        compraQueso(compra);
    } else {
        alert("Gracias por tu visita");
    }
}