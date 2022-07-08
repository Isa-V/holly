//Productos
const listaProductos = [
    {
        id: 1,
        nombre:"Polera", 
        categoria: "Tops",
        valor:15000,
        imagen:""
    },
    {
        id:2,
        nombre:"Camisa", 
        categoria: "Tops", 
        valor:150,
        imagen:""
    },
    {
        id:3,
        nombre:"Pantalón", 
        categoria: "Bottoms", 
        valor:200,
        imagen:""
    },
    {
        id:4,
        nombre:"Falda", 
        categoria: "Bottoms", 
        valor:250,
        imagen:""
    },
    {
        id:5,
        nombre:"Botín", 
        categoria: "Zapatos", 
        valor:300,
        imagen:""
    },
    {
        id:6,
        nombre:"Bota", 
        categoria: "Zapatos", 
        valor:350,
        imagen:"",
    },
]


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
                <a class="nav-link categoria" href="#" ref="${element}" >${element}</a>
            </li>
        `
});
//crear categorias dentro del html
menuCategorias.innerHTML=cantidadCategorias;



//Identificar la selección
let seleccion = "Tops";
//Cambiar el titulo de la pagina segun categoria seleccionada
const productTitle = document.getElementById("productTitle");
productTitle.innerText= seleccion;



//Carrito de compras
let carrito = [];
//Suma el precio total
let total = 0;


// encontrar el contenedor de los productos por Id
const contenedorProductos= document.getElementById("contenedorProductos");

//Agregar productos al contenedor
const renderProductos = (productos, target) => {
    let sumaProductos = "";
    productos.map(producto => {
        sumaProductos += `
        <div class="col-4 productCard item" id="${producto.id}" ref ="${producto.categoria}">
            <div class="productCardImg"></div>
            <div class="productCardInfo">
                <h6 class="productName">${producto.nombre}</h6>
                <h5 class="productPrice">${producto.valor}</h5>
            </div>
        </div>
        `
    })

    target.innerHTML = sumaProductos;
}
// conectar la función con el array de productos y el contenedor
renderProductos(listaProductos.filter(producto=> producto.categoria==seleccion), contenedorProductos);


/* //Seleccionar categoría haciendo clic en el menu
const buttonCategorias = document.querySelectorAll(".categoria");
// Seleccionar categoría
const selectCategoria = (el)=> {
    seleccion = el.target.getAttribute("ref");
    console.log(seleccion);

}
buttonCategorias.forEach(categoria => categoria.addEventListener("click", selectCategoria));
 */




//conectar con la class categoria
const buttonCategorias = document.querySelectorAll(".categoria");

//cambiar valor de la variable cuando hago clic
const selectCategoria = (el)=> {
    seleccion = el.target.getAttribute("ref");
}
buttonCategorias.forEach(categoria => categoria.addEventListener("click", selectCategoria));


//Filtrar productos por categoria
const filtroCategorias = (listado, categoria) =>{
    return listado.filter(producto => producto.categoria==categoria)
}
const filtrar = () => {
    renderProductos(filtroCategorias(listaProductos, seleccion), contenedorProductos)
}
buttonCategorias.forEach(categoria => categoria.addEventListener("click", filtrar));

//Cambiar texto del menu
const cambiarTexto = () => {
    return productTitle.innerText= seleccion;
}
buttonCategorias.forEach(categoria => categoria.addEventListener("click", cambiarTexto));





/* const menuButton = document.getElementsByClassName("categoria"); */





/* 
//filtrar y mostrar productos dentro de los objetos presentes en el Array
let filtrarCategoria = listaProductos.filter(producto=>producto.categoria===seleccion); */

/* // se vincula el contenedor de los productos y se crea el render
const contenedorProductos= document.getElementById("contenedorProductos");
let renderProductos ="";

//crear las cards según categoría
filtrarCategoria.forEach(element => {
    renderProductos += `
        <div class="col-4 productCard item" id="${element.id}" ref ="${element.categoria}">
            <div class="productCardImg"></div>
            <div class="productCardInfo">
                <h6 class="productName">${element.nombre}</h6>
                <h5 class="productPrice">${element.valor}</h5>
            </div>
        </div>
    `
});
contenedorProductos.innerHTML=renderProductos;

// agregar al carrito
const clicKToItem = (e) => {
    console.log(parseInt(e.target.getAttribute("id")));
}

const items = document.querySelectorAll(".item");
items.forEach(item=>item.addEventListener("click", clicKToItem));
 */




