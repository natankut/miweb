const productos = [
    {
        id: 0,
        titulo: 'Aceite de oliva Barhein',
        imagen: 'images/tienda/aceite-oliva.jpg',
        descripcion: 'El Aceite de Oliva Extra Virgen Barhein se extrae cuidadosamente del primer proceso de prensado en frío de aceitunas seleccionadas de calidad.',
        precio: 1500,
        cantidad: 1,
    },
    {
        id: 1,
        titulo: 'Palta Hass',
        imagen: 'images/tienda/avocado.jpg',
        descripcion: 'Un tercio de un aguacate mediano (50 g) tiene 80 calorías y aporta casi 20 vitaminas y minerales, lo que lo convierte en una excelente opción de alimentos ricos en nutrientes. El aguacate es prácticamente la única fruta que contiene grasas monoinsaturadas saludables para el corazón.',
        precio: 250,
        cantidad: 1,
    },
    {
        id: 2,
        titulo: 'Lentejas arabes',
        imagen: 'images/tienda/lentejas-arabes.jpg',
        descripcion: 'El maíz es fuente de antioxidantes que combaten los radicales libres y el envejecimiento celular. Rico en fibra e hidratos de carbono el maíz es saciante y ayuda a controlar nuestro apetito.',
        precio: 500,
        cantidad: 1,
    },
    {
        id: 3,
        titulo: 'Avena Quaker Premium',
        imagen: 'images/tienda/quacker.jpg',
        descripcion: 'El desayuno es la primera comida del día. La palabra en castellano se refiere a romper el período de ayuno de la noche anterior. Una buena manera de agregar nutrientes es la avena.',
        precio: 350,
        cantidad: 1,
    },
    {
        id: 4,
        titulo: 'Mayonesa Heinz',
        imagen: 'images/tienda/mayonesa.jpg',
        descripcion: 'Condimento o aderezo frío espeso que generalmente se usa en sándwiches y ensaladas compuestas o en papas fritas.',
        precio: 300,
        cantidad: 1,
    },
    {
        id: 5,
        titulo: 'Tomate plum fresco',
        imagen: 'images/tienda/tomate.jpg',
        descripcion: 'El tomate es la verdura comestible, a menudo roja, de la planta Solanum lycopersicum, comúnmente conocida como planta de tomate. La planta pertenece a la familia de las solanáceas, las solanáceas. La especie se originó en el oeste de América del Sur.',
        precio: 150,
        cantidad: 1,
    },

];


$(document).ready(function () {

    console.log("ready!");

    let carrito = [];

    function agregarCarrito(prod) {
        console.log('se agrego al carrito el producto con ID ' + prod.id);
        //Traigo el localstorage, si no hay nada creo un array vacio
        var items = JSON.parse(localStorage.getItem('cart')) || [];
        // agrego solo si esta vacio
        var item = items.find(item => item.titulo === prod.titulo);

        if (item) {
            item.cantidad += prod.cantidad;
            item.precio += prod.precio;
        } else {
            items.push(prod);
        }
        // then volver a agregar.
        localStorage.setItem('cart', JSON.stringify(items));
        console.log(items);

        if (items.length === 0) {
            document.getElementById("notif").innerHTML = "";
        } else {

            var notif = $('#notif').text();
            //console.log(notif);
            if (notif == '') {
                $('#notif').html(prod.cantidad);
            } else {
                $('#notif').html(parseInt(notif) + 1);
            }


        }
    }

    const listaProductos = $('#productos');

    $.each(productos, function (_i, prod) {

        let card = document.createElement('div')
        card.classList.add('mt-4', 'col-lg-4', 'col-md-4', 'col-sm-6');

        card.innerHTML =

            `
        <div class="card mb-3 shadow h-100">
                <img src="${prod.imagen}" class="card-img-top" alt="${prod.titulo}">
            <div class="card-body d-flex flex-column justify-content-between">
                    <h5 class="card-title">${prod.titulo}</h5>
                    <p class="card-text">${prod.descripcion}</p>
                <div class="d-flex justify-content-between">
                    <p class="card-text precio align-content-end flex-wrap"><small class="text-muted">$${prod.precio}</small></p>
                    <a type="button" id="prod-${prod.id}" class="bi bi-cart-plus btn btn-secondary "></a>
                </div>
            </div>
        </div>
            `

        listaProductos.append(card);

        let boton = $('#prod-' + prod.id)
        boton.click(function () {
            agregarCarrito(prod);
        });
    });


    var guardado = JSON.parse(localStorage.getItem('cart'));

    $.each(guardado, function (_index, value) {
        carrito.push(value);
        document.getElementById("notif").innerHTML = carrito.length;
    });


    $('#vaciar').click(function () {
        localStorage.clear();
        document.getElementById("desplegable").innerHTML = "";
        document.getElementById("notif").innerHTML = "";
        carrito = [];
    });

    $('#carrito').click(function (e) {
        carrito = JSON.parse(localStorage.getItem('cart'))

        $('#desplegable').empty();

        $.each(carrito, function (_i, prod) {

            let muestra = document.createElement('tr');
            muestra.classList.add('w-100', 'cart-contain');
            muestra.innerHTML =
                `
                <td><img src="${prod.imagen}"></td><td>${prod.titulo}</td><td><button id="${prod.id}suma" class="shadow m-1 btnSuma">+</button><span>${prod.cantidad}</span><button id="${prod.id}resta" class="shadow m-1 btnResta"> - </button></td>
                <td class="${prod.precio}">$${prod.precio}</td>
                
                `
            $('#desplegable').prepend(muestra);

            var botonSuma = $('#' + prod.id + 'suma');
            var botonResta = $('#' + prod.id + 'resta');
            botonSuma.click(function (e) {
                var id = parseInt($(this).attr('id'));
                var items = JSON.parse(localStorage.getItem('cart'));
                // agrego solo si esta vacio
                var item = items.find(item => item.id === id);
                if (item) {
                    item.precio += item.precio / item.cantidad;
                    item.cantidad += 1;
                }
                // then volver a agregar.
                localStorage.setItem('cart', JSON.stringify(items));
                console.log(items);

                var notif = $('#notif').text();
                $('#notif').html(parseInt(notif) + 1);
                e.stopPropagation();
            });

            botonResta.click(function (e) {
                var id = parseInt($(this).attr('id'));
                var items = JSON.parse(localStorage.getItem('cart'));
                // agrego solo si esta vacio
                var item = items.find(item => item.id === id);
                if (item) {
                    item.precio -= item.precio / item.cantidad;
                    item.cantidad -= 1;
                }
                if (item.cantidad == 0) {
                    items = $.grep(items, function (e) {
                        return e.id != id;
                    });
                }
                // then volver a agregar.
                localStorage.setItem('cart', JSON.stringify(items));
                console.log(items);

                var notif = $('#notif').text();
                if (parseInt(notif) > 1) {
                    $('#notif').html(parseInt(notif) - 1);
                } else {
                    $('#notif').html('');
                }
                e.stopPropagation();
            });

        });

        if (carrito < 1) {
            $('#tablaProductos').hide();
        } else {
            $('#tablaProductos').slideToggle(500)
        }
        ;
    });




    $("#form1").submit(function (event) {


        var formValues = {
            name: $("#exampleFormControlInput1").val(),
            telefono: $("#exampleFormControlInput2").val(),
            horario: $("#horariosReserva").val(),
            comentarios: $("#exampleFormControlTextarea1").val(),
        };



        $.ajax({
            type: "GET",
            data: formValues,

        }).done(function (_data) {
            alert(formValues.name + " Tu reserva fue exitosa");
        });
        event.preventDefault();
    });

});


//$("#carrito").hide();

/*productos.forEach(prod => {
    let card = document.createElement('div')
    card.classList.add('mt-4', 'col-lg-4', 'col-md-4', 'col-sm-6');

    card.innerHTML =
        `
<div class="card mb-3 shadow h-100">
          <img src="${prod.imagen}" class="card-img-top" alt="${prod.titulo}">
    <div class="card-body d-flex flex-column justify-content-between">
            <h5 class="card-title">${prod.titulo}</h5>
            <p class="card-text">${prod.descripcion}</p>
        <div class="d-flex justify-content-between">
            <p class="card-text precio align-content-end flex-wrap"><small class="text-muted">$${prod.precio}</small></p>
            <a type="button" id="prod-${prod.id}" class="bi bi-cart-plus btn btn-secondary "></a>
        </div>
    </div>
</div>
`

    listaProductos.append(card);

    let boton = $('#prod-' + prod.id)
    boton.click(function () {
        agregarCarrito(prod);
    });
*/


//ACA ES PARA VER LA LISTA NADA MAS

function verListaCarrito() {

    let total = 0;
    let totalIVA = 0;
    for (compras of carrito) {
        console.log("Nombre: " + compras.titulo + " Precio: $" + compras.precio);
        total += compras.precio;
        totalIVA += compras.precio * 1.21;
    }
    //document.getElementById("total").innerHTML = ("Total a pagar: $ " + totalIVA + "(IVA incluido)");
    console.log("Total de productos: " + carrito.length + "\n Total a pagar: $ " + totalIVA + "(IVA incluido)");

}

/*
let botonCarrito = document.getElementById('mostrar')
botonCarrito.addEventListener("click", () => {
    verListaCarrito();
})*/

/*class Producto {

    constructor(id, nombre, tipo, precio) {
        this.id = id;
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
    listaDeCarrito.sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio)); // el array donde van los productos de mayor a menor

    console.log("se agrego al carrito el producto con ID: " + items.id);
    document.getElementById("notif").innerHTML = listaDeCarrito.length;

    /*listaDeCarrito.forEach(items => {

        let botonAgregar = document.getElementById('agregarCarrito');
        botonAgregar.addEventListener("click", () => {
            listaDeCarrito.push(items)

        })
    })
}

listaDeCarrito.forEach(items => {

    let botonAgregar = document.getElementById('agregarCarrito');
    botonAgregar.addEventListener("click", () => {
        listaDeCarrito.push(items)

    })
})

function verListaCarrito() {

    let total = 0;
    let totalIVA = 0;
    for (compras of listaDeCarrito) {
        console.log("Nombre: " + compras.nombre + " Precio: $" + compras.precio);
        total += compras.precio;
        totalIVA += compras.precioIVA;
    }
    console.log("Total de productos: " + listaDeCarrito.length + "\n Total a pagar: $ " + totalIVA + "(IVA incluido)");


}


const producto1 = new Producto(1, "Palta", "vegetal", 350);
const producto2 = new Producto(2, "Tomate", "vegetal", 200);
const producto3 = new Producto(3, "Cebolla", "vegetal", 100);
const producto4 = new Producto(4, "Lima", "vegetal", 400);


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




/*listaDeCarrito.forEach(prod => {

    let botonAgregar = document.getElementById('agregarCarrito');
    botonAgregar.addEventListener("click", () => {
        listaDeCarrito.push(prod)

    })
})


let botonAgregar = document.getElementById('agregarCarrito');
botonAgregar.onclick = () => { comprarPalta() }

let verCarrito = document.getElementById("mostrar");
verCarrito.onclick = () => { verListaCarrito() };*/