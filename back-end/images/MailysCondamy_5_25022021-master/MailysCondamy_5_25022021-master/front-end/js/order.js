


//Récupération de l'ID de la commande et du total dans l'url
const urlParams = window.location.search;
const searchParams = new URLSearchParams(urlParams);

const orderId = searchParams.get('orderId');
console.log(orderId);

const totalOrder = searchParams.get('total');
console.log(totalOrder);

if (!orderId || !totalOrder){
    window.location = "index.html";
}

//Affichage de l'ID de la commande
const displayOrderId = () =>{
    var contentOrderId = document.getElementById('orderId');
    contentOrderId.textContent = 'Numéro de la commande: ' + orderId + ".";
}

//Affichage du montant total de la commande
const displayTotalOrder = () =>{
    var contentTotalOrder = document.getElementById('totalOrder');
    contentTotalOrder.textContent = 'Montant de la commande: ' + totalOrder + " €.";
}

//Réinitialisation du panier
const resetCart = (cart) =>{
    localStorage.clear();
    contact = {};
    products = [];

}

displayOrderId();
displayTotalOrder();
resetCart();