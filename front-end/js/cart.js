//const { response } = require("express");

//Lien avec l'API
const getCamera = (id) => {

    return fetch(`http://localhost:3000/api/cameras/${id}`)

        .then(function (httpBodyResponse) {
            if (httpBodyResponse.status === 404) {
                throw new Error;
            }
            return httpBodyResponse.json()
        })

        .then(function (camera) {
            return camera
        })

        //gestion des erreurs
        .catch(function (error) {

            (Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Quelque chose c'est mal passé !",
            }))
            return undefined;
        })
}

//Récupération/initialisation du panier d'achat
let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart) {
    cart = []
}

//Initialisation des variables nécessaires à la requete "POST"
let products = [];
let contact = {};

//Objet envoyé lors de la requête "POST"
let order = {
    contact,
    products
}

//Tableau nécessaire au calcul du prix total
let dataCameras = [];
//Initialisation total
let total = undefined;


//Fonction affichage des articles du panier d'achat
const displayCart = async (cart) => {
    for (let i = 0; i < cart.length; i++) {
        try {
            let id = cart[i];
            let camera = await getCamera(id);
            console.log(camera);
            //ajout des caméras présentent dans le panier à la liste pour le calcul du total
            dataCameras.push(camera);
            //ajout des ID des caméras du panier au tableau envoyé à la requête "POST"
            products.push(camera._id);
            console.log(products);

            //Création du contenu du panier
            const boardCart = document.getElementById('board-cart');

            let productContentBox = document.createElement('div');
            let productPictureBox = document.createElement('div');
            let productPicture = document.createElement('img');
            let productDescription = document.createElement('div');
            let productName = document.createElement('p');
            let productPrice = document.createElement('p');
            let buttonCutCartBox = document.createElement('div');
            let buttonCutCart = document.createElement('a');
            let buttonCutCartText = document.createElement('p');
            let buttonCutCartIcon = document.createElement('i');

            boardCart.appendChild(productContentBox);
            productContentBox.appendChild(productPictureBox);
            productPictureBox.appendChild(productPicture);
            productContentBox.appendChild(productDescription);
            productDescription.appendChild(productName);
            productDescription.appendChild(productPrice);
            productContentBox.appendChild(buttonCutCartBox);
            buttonCutCartBox.appendChild(buttonCutCart);
            buttonCutCart.appendChild(buttonCutCartText);
            buttonCutCart.appendChild(buttonCutCartIcon);
        

            productPicture.src = camera.imageUrl;
            productName.textContent = camera.name;
            productPrice.textContent = camera.price / 100 + " euros";
            buttonCutCartText.textContent = "Retirer du panier";

            productContentBox.setAttribute("class", "camera_contentboxcart row d-flex justify-content-between my-2");
            productPictureBox.setAttribute("class", "camera_pictureBox  col-4 px-0");
            productPicture.setAttribute("alt", "Photo de la caméra");
            productDescription.setAttribute("class", " camera_description d-flex flex-column justify-content-center");
            productName.setAttribute("class", "camera_name");
            productPrice.setAttribute("class", "camera_price");
            buttonCutCartBox.setAttribute("class", "buttonCutCart2__box col-4");
            buttonCutCart.setAttribute("class", "buttonCutCart2 btn");
            buttonCutCartText.setAttribute("class", "buttonCutCartText d-inline");
            buttonCutCartIcon.setAttribute("class", "fas fa-trash buttonCutCartIcon d-none");
            
            //Fonction de retrait d'un article du panier
            const cutToCart = async () => {
                cart = cart.filter((productId) => productId !== id);
                localStorage.setItem("cart", JSON.stringify(cart));
                console.log("Le produit a été retiré du panier");
                console.log(cart);
                
                dataCameras = dataCameras.filter((c) => {
                    if (c.id === id) {
                        camera = c;
                        return false;
                    }
                    return true;
                })
                total -= camera.price / 100;
                document.querySelector("#totalBox p").innerHTML = "Total de votre panier : " + total + "€";
                
                
                //Supprimer le noeud de la camera supprimée
                //location.reload();
            }

            buttonCutCart.addEventListener("click", cutToCart);

        } catch (e) {
            console.log(e)
        }

    }

    //Calcul de la somme des produits du panier 
    var total = dataCameras.reduce((price, camera) => price + camera.price / 100, 0);
    console.log(total);

    //Affichage du total du panier
    const totalBox = document.getElementById("totalBox");
    let displayTotal = document.createElement("p");
    displayTotal.setAttribute("class", "displayTotal");
    totalBox.appendChild(displayTotal);
    displayTotal.textContent = "Total de votre panier : " + total + "€";

    //Affichage "panier vide" si total=0
    if (total === 0) {
        displayTotal.setAttribute("class", "d-none");
        var emptyCart = document.getElementById("panierVide");
        emptyCart.setAttribute("class", "d-inline");
    }
}

displayCart(cart);


// fonction de validation du formulaire avant envoi
const formValid = (contact) => {

    //validation prénom
    var regfirstName = new RegExp('^([a-zA-Zéëèïöü\ \-]+)$');
    if (!(regfirstName.test(formOrder.firstName.value))) {
        alert("Prénom invalide!");
        return false;
    }

    //validation nom
    var regLastName = new RegExp('^([a-zA-Zéêëèïöü\ \-]+)$');
    if (!(regLastName.test(formOrder.lastName.value))) {
        alert("Nom invalide!");
        return false;
    }

    //validation adresse postale
    var regAddress = new RegExp('^([a-z0-9A-Zêéëèïöü\ \-\']+)$');
    if (!(regAddress.test(formOrder.address.value))) {
        alert("Adresse invalide!");
        return false;
    }

    //validation ville
    var regVille = new RegExp('^([a-zA-Zéëêèïöü\ \-\']+)$');
    if (!(regVille.test(formOrder.city.value))) {
        alert("Ville invalide!");
        return false;
    }

    //validation adresse email
    var regEmail = new RegExp('^[0-9a-z._-]+@[0-9a-z.-]{2,}.[a-z]{2,5}$', 'i');
    if (!(regEmail.test(formOrder.email.value))) {
        alert("Adresse email invalide!");
        return false;
    }
    return true;
}

//Fonction d'envoie de la commande au serveur
const pushOrder = async (data) => {

    fetch("http://localhost:3000/api/cameras/order", {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/JSON",
        },
    })
    .then(function (httpBodyResponse) {
        if (httpBodyResponse.status === 404) {
            throw new Error;
        }
        window.location = "/order.html?n=" & httpBodyResponse.response.order & order_id;
    })

        .catch(function (error) {

            (Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Quelque chose c'est mal passé !",
            }))
            return undefined;
        })

}

const submitOrder = () => {
    let data = {
        products: cart,
        contact: {},
    }
    data.contact.firstName = document.formOrder.firstName;
    data.contact.lastName = document.formOrder.lastName;
    data.contact.address = document.formOrder.address;
    data.contact.ville = document.formOrder.city;
    data.contact.email = document.formOrder.email;

    //Valider le forrmulaire
  //  if (formValid(contact)){
    //    pushOrder(data);
   // }
}

let startOrder = document.getElementById('startOrder');
startOrder.addEventListener("click", submitOrder);