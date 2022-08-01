/* --- URL DE MERCADO PAGO --- */
const url_api_mercadoPago = "https://api.mercadopago.com";
const api_key_mercadoPago = "TEST-6731662915555552-073101-9d94594a80fd804ce08aca2f6e495926-185076153";

/* // SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
    access_token: api_key_mercadoPago,
}); */


/* ---LISTA DE PRODUCTOS --- */
let listaProductos = [];

/* --- IDENTIFICAR LAS CATEGORIAS --- */
// Categorías
const categorias = ["Tops","Bottoms","Zapatos"];
//Conectar las categorías con el menú
const menuCategorias = document.getElementById("callToCategorias");
//Contar la cantidad de elementos
let cantidadCategorias = "";
//Agregar los li con el nombre de cada categoría (elemento) al menu
categorias.forEach(element => {
        cantidadCategorias += `
            <li class="nav-item">
                <a class="nav-link categoria" href="#" ref="${element}">${element}</a>
            </li>
        `
});
//crear categorias dentro del html
menuCategorias.innerHTML=cantidadCategorias;


//Identificar la selección
let seleccion = "Tops";
//Cambiar el titulo de la pagina segun categoria seleccionada
const productTitle = document.getElementById("productTitle");
productTitle ? productTitle.innerText = seleccion : null;
//guardar en el storage la seleccion realizada



//Carrito de compras en el local storage
let carrito = JSON.parse(localStorage.getItem("carrito")|| "[]")
//contar la cantidad de elementos del carrito
let carritoCantidad = carrito.map(producto=> producto.cantidad).reduce((prev,curr)=> prev+curr,0);
//valor del total de la compra



//contar productos del carrito reflejarlos en el contador del carro de compra
const carritoCounter = document.getElementById("carritoCounter");
carritoCounter ? carritoCounter.innerText = carritoCantidad: carritoCounter.innerText ="0";

/* --- AGREGAR UN PUNTO CADA 3 DIGITOS A LOS PRECIOS --- */
function preciosConPunto(valor) {
    return valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}


/* ---- MENU Y FILTRADO POR CATEGORIA --- */
//conectar con la class categoria
const buttonCategorias = document.querySelectorAll(".categoria");

//cambiar valor de la variable de la categoria seleccionada cuando hago clic
const selectCategoria = (el)=> {
    seleccion = el.target.getAttribute("ref");
}
buttonCategorias.forEach(categoria => categoria.addEventListener("click", selectCategoria));

//Filtrar productos por categoria seleccionada
const filtroCategorias = (listado, categoria) =>{
    return listado.filter(producto => producto.categoria==categoria)
}
const filtrar = () => {
    renderProductos(filtroCategorias(listaProductos, seleccion), contenedorProductos)
}
buttonCategorias.forEach(categoria => categoria.addEventListener("click", filtrar));

//Cambiar texto del menu segun categoría seleccionada
const cambiarTexto = () => {
    return productTitle.innerText= seleccion;
}
buttonCategorias.forEach(categoria => categoria.addEventListener("click", cambiarTexto));


/* ---LINKEAR CON ELEMENTOS DEL DOM --* */
// encontrar el contenedor de los productos por Id
const contenedorProductos= document.getElementById("contenedorProductos");


/* --- RENDERIZAR PRODUCTOS POR CATEGORIA --- */

//Agregar productos al contenedor
const renderProductos = (productos, target) => {
    let sumaProductos = "";
    productos.map(producto => {
        sumaProductos += `
        <div class="col-4 productCard">
            <img src="${producto.imagen}" id="${producto.id}" ref ="${producto.categoria}" class="productCardImg buttonCard" alt="${producto.nombre}">
            <div class="productCardInfo">
                <h6 class="productName">${producto.nombre}</h6>
                <h5 class="productPrice">$${preciosConPunto(producto.valor)}</h5>
            </div>
        </div>
        `
    })
    //agregar los productos al contenedor
    target ? target.innerHTML = sumaProductos: null;

    //hacer clic en el producto
    const buttonsProduct = document.querySelectorAll(".buttonCard");
    buttonsProduct.forEach(buttonProduct => buttonProduct.addEventListener("click", productClic));
}

// identificar el producto que se debe mostrar después de hacer clic en la proxima pestaña y guardarla en el local storage para que se mantenga en la proxima pestaña
let productShow = JSON.parse(localStorage.getItem("productShow")|| "[]")

// crear funcion para hacer clic en el producto
const productClic = (e) =>{
    const idProducto = parseInt(e.target.getAttribute("id"));
    const producto = listaProductos.find(producto => producto.id === idProducto);

    // agregar productos al carro solo si no está repedido
    if(carrito.some(element => element.id===producto.id)){
        const repetido = carrito.findIndex(element=> element.id === producto.id);
        carrito[repetido].cantidad +=1;
    } else{
        carrito.push({
            id: producto.id,
            nombre:producto.nombre, 
            valor:producto.valor,
            imagen:producto.imagen,
            cantidad:1,
        });
    }

    //identificar el producto seleccionado
    localStorage.setItem("carrito",JSON.stringify(carrito));
    rendercarrito(carrito, contenedorCarrito);
    //actualizar el valor que se muestra en el contador de elementos del carrito:
    carritoCantidad = carrito.map(producto=> producto.cantidad).reduce((prev,curr)=> prev+curr,0);
    carritoCounter.innerText = carritoCantidad;
    //actualizar cantidad en el modal del carrito:
    carritoModalItems.innerHTML = (carritoCantidad+" items");
    // agregar alert
    sweetAlert()
}



/* ---- FETCH CON EL LISTADO DE PRODUCTOS ---- */
//funcion para traer a los productos desde el json
const llamarJSON = () =>{
    const respuesta = fetch("./js/productos.json")
    respuesta
    .then(res => res.json())
    .then((res)=>{
        listaProductos = res.productos;
        
        // conectar la función con el array de productos y el contenedor filtrando segun la categoria seleccionada
        renderProductos(listaProductos.filter(producto=> producto.categoria==seleccion), contenedorProductos);
    })
}
llamarJSON()



/* --- RENDERIZAR PRODUCTOS EN EL CARRITO */
//encontar el contenedor de productos en el carrito
const contenedorCarrito= document.getElementById("contenedorProductosCarrito");
//Encontrar los elementos del footer del modal del carrito
const carritoModalTotal = document.getElementById("carritoModalTotal");
const carritoModalItems = document.getElementById("carritoModalItems");


const calcularTotal = () => {
    let total = 0;
    carrito.forEach(producto=>{
        total+= producto.valor*producto.cantidad;
    })
    console.log(total)
    carritoModalTotal.innerText=preciosConPunto(`Total: $${total}`);
}

// mostrar productos en el carrito
const rendercarrito = (productos, target) => {
    let sumaProductos = "";
    productos.map(producto => {
        sumaProductos += `
        <div class="row carritoModal_producto">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="col-3">
            <div class="col-7">
                <h5 class="col-9">${producto.nombre}</h5>
                <div class="d-flex gap-4">
                    <h6>Talla: S</h6>
                    <h6>$${preciosConPunto(producto.valor)} c/u</h6>
                </div>
                <div class="input-group-sm flex-nowrap">
                    <input type="number" class="carritoModalCantidad" value="${producto.cantidad}">
                </div>
                <div class="carritoModalTotal">
                    <h4>$${preciosConPunto(parseInt(producto.cantidad)*parseInt(producto.valor))}</h4>
                </div>
            </div>
            <div class="col-2 d-flex justify-content-center align-items-start">
                <button type="button" class="btn btn-danger" id"${producto.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path
                            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z">
                        </path>
                    </svg>
                </button>
            </div>
        </div>
        `
    })
    //agregar los productos al contenedor
    target ? target.innerHTML = sumaProductos: null;
    calcularTotal()
}

// renderizar los productos en el carro
rendercarrito(carrito, contenedorCarrito);
carritoModalItems ? carritoModalItems.innerHTML = (carritoCantidad+" items") : carritoModalItems.innerHTML ="0 items";

//conectar el DOM con el modal del carrito:
const myModal = new bootstrap.Modal(document.getElementById("carritoModal"), {});



/* --- SWEET ALERT DE TOASTIFY--- */
const sweetAlert = () => {
    Toastify({
        text: "Agregaste un producto al carrito",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#000",
            color:"#fff"
        },
        onClick: () => myModal.show(), //abre el carrito si se hace clic
    }).showToast();
}

/* --- USO DE SETINTERVAL PARA INCENTIVAR LA COMPRA --- */
// agregar un alert cada X tiempo para mostrar que se están llevando los productos
const compraProductoAlert = () => {
    Toastify({
        text: "Andrés acaba de comprar Cardigan, no te quedes sin el tuyo",
        duration: 4000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#FFCFED",
            color:"#000"
        },
        onClick: () => myModal.show(), //abre el carrito si se hace clic
    }).showToast();
}

// funcion para que el tiempo en que salga el alert sea aleatorio

const randomIntervalTimer = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
let randomInt = randomIntervalTimer(30000, 50000);
setInterval (compraProductoAlert, randomInt);


/* --- HACER LA COMPRA CON MERCADO PAGO ---  */
const finalizarCompra = document.getElementById("compra");


const comprarMercadoPago = async () => {
    //configuracion del fetch para mercado pago
    const configuracionMP = 
    {
        method:"post",
        headers:{
            "Authorization": `Bearer${api_key_mercadoPago}`,
            "Content-Type": "application/json",
            "cache-control": "no-cache"
        },
        body:JSON.stringify({
            "items": [
            {
                "title": "Mi producto",
                "quantity": 3,
                "unit_price": 1000
            }
            ]
        })
    }
    //fetch de la respuesta
    const respuesta = fetch(`${url_api_mercadoPago}/checkout/preferences`,configuracionMP)
    respuesta
    .then(res => res.json())
    .then((res)=> {
        console.log(res);
    })
}

finalizarCompra.addEventListener("click", comprarMercadoPago);











