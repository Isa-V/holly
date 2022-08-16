/* --- URL DE MERCADO PAGO --- */
const url_api_mercadoPago = "https://api.mercadopago.com";
const api_key_mercadoPago = "TEST-3726406462130735-081421-8879f58907ed1d1a4354534fae4255e0-1170351237";
const URL = "https://isa-v.github.io/holly-e-commerce-Vera/"

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
let carritoCantidad = carrito.map(producto=> producto.quantity).reduce((prev,curr)=> prev+curr,0);

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
        <div class="col mb-4">
            <div class="card h-100">
                <img src="${producto.imagen}" id="${producto.id}" ref ="${producto.id}" class="productCardImg buttonCard card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h6 class="card-title">${producto.nombre}</h6>
                </div>
                <div class="card-footer">
                    <h4 class="card-text">$${preciosConPunto(producto.valor)}</h4>
                </div>
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


// crear funcion para hacer clic en el producto
const productClic = (e) =>{
    const idProducto = parseInt(e.target.getAttribute("id"));
    const producto = listaProductos.find(producto => producto.id === idProducto);

    // agregar productos al carro solo si no está repedido
    if(carrito.some(element => element.id==producto.id)){
        if(carrito.some(element=> element.quantity<5)){
            const repetido = carrito.findIndex(element=> element.id === producto.id);
            carrito[repetido].quantity +=1;
            sweetAlertAgregaste()
        }else if(carrito.some(element=> element.quantity>=5)){
            sweetAlertError()
        }

    } else{
        carrito.push({
            id: producto.id,
            title:producto.nombre, 
            unit_price:producto.valor,
            imagen:producto.imagen,
            quantity:1,
        });
        sweetAlertAgregaste();
    }
    actualizarVariables()
    
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

//sumar el total de la compra
let total=0;
const calcularTotal = () => {
    total=0;
    carrito.forEach(producto=>{
        total+= producto.unit_price*producto.quantity;
    })
    carritoModalTotal.innerText=preciosConPunto(`Total: $${total}`);
}
calcularTotal()


// mostrar productos en el carrito
const rendercarrito = (productos, target) => {
    let sumaProductos = "";
    productos.map(producto => {
        sumaProductos += `
        <div class="row carritoModal_producto">
            <img src="${producto.imagen}" alt="${producto.title}" class="col-3">
            <div class="col-7">
                <h5 class="col-9">${producto.title}</h5>
                <div class="d-flex gap-4">
                    <h6>Talla: S</h6>
                    <h6>$${preciosConPunto(producto.unit_price)} c/u</h6>
                </div>
                <div class="input-group-sm flex-nowrap">
                    <input type="number" min="0" max="5" class="carritoModalCantidad" value="${producto.quantity}" id="${producto.id}">
                </div>
                <div class="carritoModalTotal">
                    <h4>$${preciosConPunto(parseInt(producto.quantity)*parseInt(producto.unit_price))}</h4>
                </div>
            </div>
            <div class="col-2 d-flex justify-content-center align-items-start">
                <button type="button" class="btn btn-danger eliminarCarrito" id="${producto.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-trash-fill eliminarCarrito" viewBox="0 0 16 16">
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
    carritoModalItems ? carritoModalItems.innerHTML = (carritoCantidad+" items") : carritoModalItems.innerHTML ="0 items";


    //elementos del DOM que se van a modificar dentro del modal del carrito
    const eliminarCarro = document.querySelectorAll(".eliminarCarrito")
    const carritoModalCantidad = document.querySelectorAll(".carritoModalCantidad");

    //llamar a la función para eliminar producto del carrito
    eliminarCarro.forEach(button => button.addEventListener("click", funcionEliminar));

    //llamar a la función para modificar cantidad de elementos
    carritoModalCantidad.forEach(input=>input.addEventListener("change", funcionActualizaCantidad))
}


//eliminar productos del carrito con el boton eliminar
const funcionEliminar = (e) => {
    const idButton = parseInt(e.target.getAttribute("id"));
    const indexOfObject = carrito.findIndex(object =>{
        return object.id===idButton;
    })

    if(indexOfObject>=0){
        carrito.splice(indexOfObject,1);
        // actualizar y renderizar
        actualizarVariables()
    }
}

const funcionActualizaCantidad = (e) =>{
    let valorActualizado = parseInt(e.target.value);
    let indexProducto = parseInt(e.target.id);

    if (valorActualizado>0 && valorActualizado<=5){
        const buscar = carrito.findIndex(element=> element.id === indexProducto)
        carrito[buscar].quantity = valorActualizado;
        actualizarVariables();
        e.target.classList.toggle("disabled">=5)
    }else if (valorActualizado<=0){
        funcionEliminar(e)
    }else if (valorActualizado>5){
        const buscar = carrito.findIndex(element=> element.id === indexProducto)
        carrito[buscar].quantity = 5;
        sweetAlertError()
        actualizarVariables();
    }
}


// renderizar los productos en el carro
rendercarrito(carrito, contenedorCarrito);
//cantidad de items siempre y cuando se vea el modal
carritoModalItems ? carritoModalItems.innerHTML = (carritoCantidad+" items") : carritoModalItems.innerHTML ="0 items";
//conectar el DOM con el modal del carrito:
const myModal = new bootstrap.Modal(document.getElementById("carritoModal"), {});




/* --- SWEET ALERT DE TOASTIFY--- */
const sweetAlertAgregaste = () => {
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
const sweetAlertError = () => {
    Toastify({
        text: "Puedes agregar hasta 5 productos iguales al carro",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#CC1B31",
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



/* ---FUNCION PARA ACTUALIZAR LAS VARIABLES */
const actualizarVariables =()=>{
    //identificar el producto seleccionado en el local storage
    localStorage.setItem("carrito",JSON.stringify(carrito));
    rendercarrito(carrito, contenedorCarrito);
    //actualizar el valor que se muestra en el contador de elementos del carrito:
    carritoCantidad = carrito.map(producto=> producto.quantity).reduce((prev,curr)=> prev+curr,0);
    carritoCounter.innerText = carritoCantidad;
    //actualizar cantidad en el modal del carrito:
    carritoModalItems.innerHTML = (carritoCantidad+" items");
    calcularTotal()
    carritoModalTotal.innerText=preciosConPunto(`Total: $${total}`);
    finalizarCompra.classList.toggle("disabled", total<=0)
}




/* --- HACER LA COMPRA CON MERCADO PAGO ---  */
let id_compra;
const finalizarCompra = document.getElementById("compra");
//deshabilitar boton si la compra está en 0
finalizarCompra.classList.toggle("disabled", total<=0)

const comprarMercadoPago = async () => {
    //agregar productos del carrito a items:
    let items = [];
    carrito.forEach(element => {
        items.push({
            title:element.title, 
            unit_price:element.unit_price,
            quantity: element.quantity,
            picture_url: element.imagen
        });
    });

    
    //configuracion del fetch para mercado pago
    const configuracionMP = 
    {
        method:"post",
        headers:{
            "Authorization": `Bearer ${api_key_mercadoPago}`,
            "Content-Type": "application/json",
            "cache-control": "no-cache"
        },
        body:JSON.stringify({
            "items": items,
            "back_urls": {
                "success": `${URL}pages/success-checkout.html`,
                "failure": `${URL}pages/error-checkout.html`
            },
            "auto_return": "approved",
        }),

    }
    //fetch de la respuesta
    const respuesta = fetch(`${url_api_mercadoPago}/checkout/preferences`,configuracionMP)
    respuesta
    .then(res => res.json())
    .then((res)=> {
        //lleva a pagar en mercado pago
        if(res.init_point){
            window.location.href= res.init_point;
        }
    })
}

finalizarCompra.addEventListener("click", comprarMercadoPago);

