//Productos
const listaProductos = [
    {
        id: 1,
        nombre:"Polera", 
        categoria: "Tops",
        valor:15000,
        imagen:"/img/img-pantalon.webp",
        imgSecuntarias:
        {
            img1:"/img/img-pantalon.webp",
            img2:"/img/img-pantalon.webp",
            img3:"/img/img-pantalon.webp"
        },
        tallas:
        {
            tallaXS:"XS",
            tallaS:"S",
            tallaM:"M",
            tallaL:"L",
            tallaXL:"XL"
        }
    },
    {
        id:2,
        nombre:"Camisa", 
        categoria: "Tops", 
        valor:150,
        imagen:"/img/img-pantalon.webp",
        imgSecuntarias:
        {
            img1:"/img/img-pantalon.webp",
            img2:"/img/img-pantalon.webp",
            img3:"/img/img-pantalon.webp"
        },
        tallas:
        {
            tallaXS:"XS",
            tallaS:"S",
            tallaM:"M",
            tallaL:"L",
            tallaXL:"XL"
        }
        
    },
    {
        id:3,
        nombre:"Pantalón", 
        categoria: "Bottoms", 
        valor:200,
        imagen:"/img/img-pantalon.webp",
        imgSecuntarias:
        {
            img1:"/img/img-pantalon.webp",
            img2:"/img/img-pantalon.webp",
            img3:"/img/img-pantalon.webp"
        },
        tallas:
        {
            tallaXS:"XS",
            tallaS:"S",
            tallaM:"M",
            tallaL:"L",
            tallaXL:"XL"
        }
    },
    {
        id:4,
        nombre:"Falda", 
        categoria: "Bottoms", 
        valor:250,
        imagen:"/img/img-pantalon.webp",
        imgSecuntarias:
        {
            img1:"/img/img-pantalon.webp",
            img2:"/img/img-pantalon.webp",
            img3:"/img/img-pantalon.webp"
        },
        tallas:
        {
            tallaXS:"XS",
            tallaS:"S",
            tallaM:"M",
            tallaL:"L",
            tallaXL:"XL"
        }
    },
    {
        id:5,
        nombre:"Botín", 
        categoria: "Zapatos", 
        valor:300,
        imagen:"/img/img-pantalon.webp",
        imgSecuntarias:
        {
            img1:"/img/img-pantalon.webp",
            img2:"/img/img-pantalon.webp",
            img3:"/img/img-pantalon.webp"
        },
        tallas:
        {
            tallaXS:"36",
            tallaS:"37",
            tallaM:"38",
            tallaL:"39",
            tallaXL:"40"
        }
    },
    {
        id:6,
        nombre:"Bota", 
        categoria: "Zapatos", 
        valor:350,
        imagen:"/img/img-pantalon.webp",
        imgSecuntarias:
        {
            img1:"/img/img-pantalon.webp",
            img2:"/img/img-pantalon.webp",
            img3:"/img/img-pantalon.webp"
        },
        tallas:
        {
            tallaXS:"36",
            tallaS:"37",
            tallaM:"38",
            tallaL:"39",
            tallaXL:"40"
        }
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

//Suma el precio total
let total = 0;

//contar productos del carrito reflejarlos en el contador del carro de compra
console.log(carrito.length)
const carritoCounter = document.getElementById("carritoCounter");
carritoCounter ? carritoCounter.innerText = carrito.length: carritoCounter.innerText ="0";


// encontrar el contenedor de los productos por Id
const contenedorProductos= document.getElementById("contenedorProductos");


//Agregar productos al contenedor solo si estamos en la pagina de productos

const renderProductos = (productos, target) => {
    let sumaProductos = "";
    productos.map(producto => {
        sumaProductos += `
        <div class="col-4 productCard">
            <img src="${producto.imagen}" id="${producto.id}" ref ="${producto.categoria}" class="productCardImg buttonCard" alt="">
            <div class="productCardInfo">
                <h6 class="productName">${producto.nombre}</h6>
                <h5 class="productPrice">$${producto.valor}</h5>
            </div>
            <div class="d-grid gap-2">
            <button class="btn btn-primary" type="button">Añadir al carro</button>
            </div>
        </div>
        `
    })
    //agregar los productos al contenedor
    target ? target.innerHTML = sumaProductos: null;

    //Reconocer el producto para ver mas detalles
    const buttonsProduct = document.querySelectorAll(".buttonCard");
    buttonsProduct.forEach(buttonProduct => buttonProduct.addEventListener("click", productClic));
}

// identificar el producto que se debe mostrar después de hacer clic en la proxima pestaña y guardarla en el local storage para que se mantenga en la proxima pestaña
let productShow = JSON.parse(localStorage.getItem("productShow")|| "[]")

// crear funcion para hacer clic en el producto
const productClic = (e) =>{
    const idProducto = parseInt(e.target.getAttribute("id"));
    const producto = listaProductos.find(producto => producto.id === idProducto);

    //identificar el producto seleccionado
    carrito.push(producto);
    localStorage.setItem("carrito",JSON.stringify(carrito));

}



// conectar la función con el array de productos y el contenedor filtrando segun la categoria seleccionada
renderProductos(listaProductos.filter(producto=> producto.categoria==seleccion), contenedorProductos);

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



// agregar productos en la nueva pestana
