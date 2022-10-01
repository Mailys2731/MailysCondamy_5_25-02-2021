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
                title: 'Erreur connexion serveur',
                text: "Il semble qu'Orinoco rencontre un problème...",
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

//Tableau nécessaire au calcul du prix total
let dataCameras = [];
//Initialisation total
let total = undefined;


//Fonction affichage des articles du panier d'achat
const displayCart = async () => {
    for (let i = 0; i < cart.length; i++) {
        try {
            let id = cart[i];
            let camera = await getCamera(id);
            console.log(camera);
            //ajout des caméras présentent dans le panier à la liste pour le calcul du total
            dataCameras.push(camera);

            //Création du contenu du panier
            const boardCart = document.getElementById('board-cart');

            let productContentBox = document.createElement('div');
            productContentBox.id = id;
            let productPictureBox = document.createElement('div');
            let productPicture = document.createElement('img');
            let productDescription = document.createElement('div');
            let productName = document.createElement('p');
            let productPrice = document.createElement('p');
            let buttonCutCartBox = document.createElement('div');
            let buttonCutCart = document.createElement('a');
            let buttonCutCartText = document.createElement('p');
            let buttonCartIconBox = document.createElement('span');
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
            buttonCutCart.appendChild(buttonCartIconBox);
            buttonCartIconBox.appendChild(buttonCutCartIcon);


            productPicture.src = camera.imageUrl;
            productName.textContent = camera.name;
            productPrice.textContent = camera.price / 100 + " euros";
            buttonCutCartText.textContent = "Retirer du panier";

            productContentBox.setAttribute("class", "camera_contentboxcart row d-flex justify-content-between my-2");
            productPictureBox.setAttribute("class", "camera_pictureBox  col-4 px-0");
            productPicture.setAttribute("alt", "Photo de la caméra");
            productPicture.setAttribute("class", "mb-0");
            productDescription.setAttribute("class", " camera_description d-flex flex-column justify-content-center");
            productName.setAttribute("class", "camera_name");
            productPrice.setAttribute("class", "camera_price");
            buttonCutCartBox.setAttribute("class", "buttonCutCart__box col-3 col-md-4");
            buttonCutCart.setAttribute("class", "buttonCutCart btn");
            buttonCutCartText.setAttribute("class", "buttonCutCartText");
            buttonCartIconBox.setAttribute("class", "buttonCutCartIconBox");
            buttonCutCartIcon.setAttribute("class", "fas fa-trash buttonCutCartIcon");

            //Fonction de retrait d'un article du panier
            const cutToCart = async () => {
                cart = cart.filter((productId) => productId !== id);
                localStorage.setItem("cart", JSON.stringify(cart));
                console.log("Le produit a été retiré du panier");
                console.log(cart);

                dataCameras = dataCameras.filter((c) => {
                    if (c._id === id) {
                        camera = c;
                        return false;
                    }
                    return true;
                })
                
                if (total != 0) {
                    total -= camera.price / 100;
                    document.querySelector("#totalBox p").innerHTML = "Total de votre panier : " + total + "€";
                }

                if (total === 0) {
                    displayTotal.setAttribute("class", "d-none");
                    var emptyCart = document.getElementById("panierVide");
                    emptyCart.setAttribute("class", "d-inline");
                }

                var nodeCamera = document.getElementById(id);
                nodeCamera.remove();

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

document.getElementById("firstName").addEventListener("change", (e) => {
    e.target.setAttribute("class", "");
});

document.getElementById("lastName").addEventListener("change", (e) => {
    e.target.setAttribute("class", "");
});

document.getElementById("address").addEventListener("change", (e) => {
    e.target.setAttribute("class", "");
});

document.getElementById("city").addEventListener("change", (e) => {
    e.target.setAttribute("class", "");
});

document.getElementById("email").addEventListener("change", (e) => {
    e.target.setAttribute("class", "");
});


// fonction de validation du formulaire avant envoi
const formValid = () => {

    //validation prénom
    var regfirstName = new RegExp('^([a-zA-Zéëèïöü\ \-]+)$');
    let response = true;
    if (!(regfirstName.test(document.getElementById("firstName").value))) {
        document.getElementById("firstName").setAttribute("class", "invalidInput");
        response = false;
    }

    //validation nom
    var regLastName = new RegExp('^([a-zA-Zéêëèïöü\ \-]+)$');
    if (!(regLastName.test(document.getElementById("lastName").value))) {
        document.getElementById("lastName").setAttribute("class", "invalidInput");
        response = false;
    }

    //validation adresse postale
    var regAddress = new RegExp('^([a-z0-9A-Zêéëèïöü\ \-\'\,]+)$');
    if (!(regAddress.test(document.getElementById("address").value))) {
        document.getElementById("address").setAttribute("class", "invalidInput");
        response = false;
    }

    //validation ville
    var regVille = new RegExp('^([a-zA-Zéëêèïöü\ \-\']+)$');
    if (!(regVille.test(document.getElementById("city").value))) {
        document.getElementById("city").setAttribute("class", "invalidInput");
        response = false;
    }

    //validation adresse email
    var regEmail = new RegExp(/^[0-9a-z\._\-]+@[0-9a-z\.\-]{2,}\.[a-z]{2,3}$/, 'i');
    if (!(regEmail.test(document.getElementById("email").value))) {
        document.getElementById("email").setAttribute("class", "invalidInput");
        response = false;
    }
    return response;

}

//Fonction d'envoi de la commande au serveur
const pushOrder = async (data) => {

    fetch("http://localhost:3000/api/cameras/order", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),

    }).then((response) => response.json())

        .then(function (httpBodyResponse) {
            if (httpBodyResponse.status === 404) {
                throw new Error;
            }
            console.log(httpBodyResponse);

            window.location = "./order.html?orderId=" + httpBodyResponse.orderId + "&total=" + dataCameras.reduce((price, camera) => price + camera.price / 100, 0);

        })

        .catch(function (error) {
            console.log(error);
            (Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Quelque chose c'est mal passé !",
            }))
            return undefined;
        })



}

const submitOrder = async () => {
    if (cart.length === 0) {
        (Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: "Votre panier est vide !",
            confirmButtonText: "Retourner à la page d'accueil",
        }).then(function () {
            window.location = "../index.html";
        }));

        return false
    }
    let data = {
        products: cart,
        contact: {},
    }
    data.contact.firstName = document.formOrder.firstName.value;
    data.contact.lastName = document.formOrder.lastName.value;
    data.contact.address = document.formOrder.address.value;
    data.contact.city = document.formOrder.city.value;
    data.contact.email = document.formOrder.email.value;

    console.log(data);
    //Valider le forrmulaire
    if (formValid(contact)) {
        console.log("ok")
        pushOrder(data);
    }
}


let startOrder = document.getElementById('startOrder');
startOrder.addEventListener("click", submitOrder);

