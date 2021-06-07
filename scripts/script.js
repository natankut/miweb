class Producto {

    constructor(nombre, tipo, precio) {
        this.nombre = nombre.toUpperCase();
        this.tipo = tipo;
        this.precio = precio;

    }
    sumarIva() {
        this.precioIVA = this.precio * 1.21;
    }

}

const listaDeCarrito = [];

function agregarAListaCarrito(items) {
    listaDeCarrito.push(items);
    listaDeCarrito.sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio));

    console.log(listaDeCarrito);
    document.getElementById("notif").innerHTML = listaDeCarrito.length;
}

function verListaCarrito() {

    let total = 0;
    let totalIVA = 0;
    for (compras of listaDeCarrito) {
        console.log("Nombre: " + compras.nombre + " Precio: $" + compras.precio);
        total += compras.precio;
        totalIVA += compras.precioIVA;
    }
    console.log("Total de productos: " + listaDeCarrito.length + "\n Total de: $ " + totalIVA + "(IVA incluido)");
}

const producto1 = new Producto("palta", "vegetal", 350);
const producto2 = new Producto("Tomate", "vegetal", 200);
const producto3 = new Producto("Cebolla", "vegetal", 100);
const producto4 = new Producto("Lima", "vegetal", 400);


function comprarTomate() {
    var productoElegido = prompt("Elegiste TOMATE, confirmas? si o no");
    if (productoElegido == "si") {
        agregarAListaCarrito(producto2);
    } else {
        alert("Selecciona nuevamente lo que desees comprar")
    }
}
function comprarPalta() {
    agregarAListaCarrito(producto1);

}
function comprarCebolla() {

    var productoElegido = prompt("Elegiste CEBOLLA, confirmas? si o no");
    if (productoElegido == "si") {
        agregarAListaCarrito(producto3);
    } else {
        alert("Selecciona nuevamente lo que desees comprar")
    }

}
function comprarLima() {

    var productoElegido = prompt("Elegiste LIMA, confirmas? si o no");
    if (productoElegido == "si") {

        agregarAListaCarrito(producto4);
    } else {
        alert("Selecciona nuevamente lo que desees comprar")
    }

}



producto1.sumarIva();
producto2.sumarIva();
producto3.sumarIva();
producto4.sumarIva();


var botonAgregar = document.getElementById('agregarCarrito');
botonAgregar.onclick = () => { comprarPalta() };
let verCarrito = document.getElementById("mostrar");
verCarrito.onclick = () => { verListaCarrito() };