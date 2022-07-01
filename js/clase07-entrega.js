
const listaProductos = [
    {nombre:"Polera", categoria: "Tops", valor:100},
    {nombre:"Camisa", categoria: "Tops", valor:150},
    {nombre:"Pantalón", categoria: "Bottoms", valor:200},
    {nombre:"Falda", categoria: "Bottoms", valor:250},
    {nombre:"Botín", categoria: "Zapatos", valor:300},
    {nombre:"Bota", categoria: "Zapatos", valor:350},
]

// Categorías
const categorias = ["Tops","Bottoms","Zapatos"];

//Para identificar la selección
let seleccion;

//Carrito de compras
let carrito = [];
//Suma el precio total
let total = 0;


// filtrar y mostrar productos dentro de los objetos presentes en el Array
//tops
const filtrarTops = listaProductos.filter(producto=>producto.categoria==="Tops");
const mostrarTops = filtrarTops.map(mostrar=> mostrar.nombre);
const precioTops = filtrarTops.map(mostrar=> mostrar.valor);
console.log("estos son los tops: "+mostrarTops);
console.log("estos son los precios:"+precioTops);

//Bottoms
const filtrarBottoms = listaProductos.filter(producto=>producto.categoria==="Bottoms");
const mostrarBottoms = filtrarBottoms.map(mostrar=> mostrar.nombre);
const precioBottoms = filtrarBottoms.map(mostrar=> mostrar.valor);
console.log("estos son los Bottoms: "+mostrarBottoms);
console.log("estos son los Bottoms:"+precioBottoms);

//Zapatos
const filtrarZapatos = listaProductos.filter(producto=>producto.categoria==="Zapatos");
const mostrarZapatos = filtrarZapatos.map(mostrar=> mostrar.nombre);
const precioZapatos= filtrarZapatos.map(mostrar=> mostrar.valor);
console.log("estos son los Bottoms: "+mostrarZapatos);
console.log("estos son los Bottoms:"+precioZapatos);


//Se define la función del éxto al agregar el producto al carrito
function mensajeExito(seleccion, precio){
    total=total+precio;
    alert(`Se ha añadido ${seleccion} a $${precio} a tu carrito de forma exitosa. \nTotal de la compra = $${total}`);
}

//Se define la función donde se indica qué productos se deben mostrar en cada una de las categorías
function seleccionarCategoria(categoriaSeleccionada,prodDisponible1, precio1, prodDisponible2, precio2){
    alert(`seleccionaste ${categoriaSeleccionada}`);
    
    //debe seleccionar un producto
    seleccion = parseInt(prompt(`Selecciona alguno de estos productos para agregarlos a tu carrito \n 1- ${prodDisponible1} \n 2- ${prodDisponible2} \n 3- Volver al menú incial \n 4- para ver el carrito`));
    
    while (seleccion>=1&&seleccion<=4){
        switch(seleccion){
            //cuando selecciona el primer producto
            case 1:
                mensajeExito (prodDisponible1, precio1)
                seleccion = parseInt(prompt(`Selecciona alguno de estos productos para agregarlos a tu carrito \n 1- ${prodDisponible1} \n 2- ${prodDisponible2} \n 3- Volver al menú incial \n 4- para ver el carrito`));
                carrito.push(prodDisponible1);
                break
            //cuando selecciona el segundo producto
            case 2:
                mensajeExito (prodDisponible2, precio2)
                seleccion = parseInt(prompt(`Selecciona alguno de estos productos para agregarlos a tu carrito \n 1- ${prodDisponible1} \n 2- ${prodDisponible2} \n 3- Volver al menú incial \n 4- para ver el carrito`));
                carrito.push(prodDisponible2);
                break;
            //cuando quiere volver al menú principal
            case 3:
                alert("Seleccionaste Volver al menú principal");
                seleccion="esc";
                break;
            //carrito
            case 4:
                alert(`Tienes ${carrito.length} productos añadidos al carrito: ${carrito} \nEl total de tu compra es $${total}`)
                seleccion = parseInt(prompt(`Selecciona alguno de estos productos para agregarlos a tu carrito \n 1- ${prodDisponible1} \n 2- ${prodDisponible2} \n 3- Volver al menú incial`));
                break;
        }
    }

    //Si no selecciona una opción válida del menú
    while(seleccion<1||seleccion>4){
        lert("No ingresaste una opción válida")
        break;
    }      

}




// este es el menú
let opcion = parseInt(prompt(`Ingresa al menú que prefieres: \n 1- para ${categorias[0]} \n 2- para ${categorias[1]} \n 3- para ${categorias[2]}\n 0- para salir`));


//Que pasa si selecciona una opción no válida del menú
while (opcion<0||opcion>3){
    alert("opción no válida")
    opcion = parseInt(prompt(`Ingresa al menú que prefieres: \n 1- para ${categorias[0]} \n 2- para ${categorias[1]} \n 3- para ${categorias[2]}\n 0- para salir`));
}


//Cuando sí selecciona una opción válida
while(opcion!=0){
    
    switch(opcion){
        case 0:
            break;
        //en caso de que seleccione Tops
        case 1:
            seleccionarCategoria(categorias[0],mostrarTops[0], precioTops[0], mostrarTops[1], precioTops[1]);
            break;
        //En caso de que seleccione Bottoms
        case 2:
            seleccionarCategoria(categorias[1],mostrarBottoms[0], precioBottoms[0], mostrarBottoms[1], precioBottoms[1]);
            break;
        //En caso de que seleccione Zapatos
        case 3:
            seleccionarCategoria(categorias[2],mostrarZapatos[0], precioZapatos[0], mostrarZapatos[1], precioZapatos[1]);
            break;
        //Para opciones no válidas
        default:
            alert("Opción no válida");
            break;
    }
    opcion = parseInt(prompt(`Ingresa al menú que prefieres: \n 1- para ${categorias[0]} \n 2- para ${categorias[1]} \n 3- para ${categorias[2]}\n 0- para salir`));
}

$('.collapse').collapse()
