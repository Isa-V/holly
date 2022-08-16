//credenciales y urls
const url_api_mercadoPago = "https://api.mercadopago.com";
const api_key_mercadoPago = "TEST-3726406462130735-081421-8879f58907ed1d1a4354534fae4255e0-1170351237";
const URL = "https://isa-v.github.io/holly-e-commerce-Vera/"

//eliminar elementos en el carro
window.localStorage.clear("carrito");


//conectar al DOM
const detailContainer = document.getElementById("detailContainer");
const bodyTableContainer = document.getElementById("bodyTableContainer");
const headerMessage = document.getElementById("headerMessage");
const headerTitle = document.getElementById("headerTitle");
const headerSubText = document.getElementById("headerSubText");

// get para tomar el parámetro de la id del pago
const urlParams = new URLSearchParams(window.location.search);
const idParam = urlParams.get("collection_id");
let payment_id = idParam;


//que pasa si no hay payment_id
if(payment_id==null){
    headerTitle.innerText = "Parece que hay un problema"
    headerSubText.innerText = "Regresa al inicio para hacer tu compra"
    headerMessage.classList.toggle("redBackround")
}


/* --- agregar punto cada 3 digitos en el monto --- */
function preciosConPunto(valor) {
    return valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}


const litadoCompra = (productos, target) => {
    let sumaProductos = "";
    productos.map(producto => {
        sumaProductos += `
        <tr>
            <th scope="row"><img src="${URL+(producto.picture_url)}" class="miniImg" alt="${producto.title}"</th>
            <td>${producto.title}</td>
            <td>${producto.quantity}</td>
            <td>$${preciosConPunto(producto.unit_price*producto.quantity)}</td>
        </tr>
        `
    })
    //agregar los productos al contenedor
    target ? target.innerHTML = sumaProductos: null;
}


// función para reconocer el pago realizado
const comprarMercadoPagoCheckout = async () => {
    const configCheckout = 
    {   
        method:"get",
        headers:{"Authorization": `Bearer ${api_key_mercadoPago}`,}
    }   

    const respuesta = fetch(`${url_api_mercadoPago}/v1/payments/${payment_id}`,configCheckout)
    respuesta

    .then(res => res.json())
    .then((res)=> {
        // mostrar información en pantalla
        detailContainer.innerHTML = `
        <p>Id de compra: #${res.id}</p>
        <p>Estado: ${res.status}</p>
        <p>Método de pago: ${res.payment_method_id}</p>
        <p>Fecha y hora de la transacción: ${res.date_approved}</p>
        <h6>Total: ${res.currency_id} $${preciosConPunto(res.transaction_details.total_paid_amount)}</h6>
        `
        litadoCompra(res.additional_info.items, bodyTableContainer);

    })
}

//ejecutar funcion mercado pago 
comprarMercadoPagoCheckout()


