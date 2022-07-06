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

//Identificar la selección
let seleccion = "Tops";

//Carrito de compras
let carrito = [];
//Suma el precio total
let total = 0;

//filtrar y mostrar productos dentro de los objetos presentes en el Array
let filtrarCategoria = listaProductos.filter(producto=>producto.categoria===seleccion);

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
//crear dentro del html
menuCategorias.innerHTML=cantidadCategorias;



//Seleccionar categoría haciendo clic en el menu
const buttonCategorias = document.querySelectorAll(".categoria");
// Seleccionar categoría
const selectCategoria = (el)=> {
    seleccion = el.target.getAttribute("ref");
    console.log(seleccion);
    //filtrar y mostrar productos dentro de los objetos presentes en el Array
}
buttonCategorias.forEach(categoria => categoria.addEventListener("click", selectCategoria));



//Cambiar el titulo de la pagina segun categoria seleccionada
const productTitle = document.getElementById("productTitle");
productTitle.innerText= seleccion;

// se vincula el contenedor de los productos y se crea el render
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

/* // agregar al carrito
const clicKToItem = (e) => {
    console.log(e.target.getAttribute("id"));
}

const items = document.querySelectorAll(".item");
items.forEach(item=>item.addEventListener("click", clicKToItem));
 */




