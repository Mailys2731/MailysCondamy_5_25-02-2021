
//Lien avec l'API
const getCameras = async() => {

    return fetch("http://localhost:3000/api/cameras")

        .then(function (httpBodyResponse) {
            return httpBodyResponse.json()
        })

        .then(function (cameras) {
            return cameras
        })

        //gestion des erreurs
        .catch(function (error) {
            (Swal.fire({
                icon: 'error',
                title: 'Erreur connexion serveur',
                text: "Il semble qu'Orinoco rencontre un problème...",
                type: "success",

            }))
            return []
        })
}



const displayCamera = async() => {

    //récupération des données de l'API
    const cameras = await getCameras();
    console.log(cameras)

    //Boucle créant autant de cartes produits que de caméras dans présentes dans l'API
    cameras.forEach((camera) => {
 
        //Lien avec la page HTML
        const listCamera = document.getElementById('list-camera');

        //Eléments structurels de la carte produit
        let cameraContentbox = document.createElement("div");
        let cameraContent = document.createElement("article");
        let cameraDescription = document.createElement("div");
        let cameraPicturebox = document.createElement("div");
        let cameraPicture = document.createElement("img");
        let cameraName = document.createElement("h2");
        let cameraPrice = document.createElement("p");
        let cameraActionBox = document.createElement("div");
        let cameraAction = document.createElement("a")

        //Agencement des élèments
        listCamera.appendChild(cameraContentbox);
        cameraContentbox.appendChild(cameraContent);
        cameraContent.appendChild(cameraPicturebox);
        cameraPicturebox.appendChild(cameraPicture);
        cameraContent.appendChild(cameraDescription);
        cameraDescription.appendChild(cameraName);
        cameraDescription.appendChild(cameraPrice);
        cameraDescription.appendChild(cameraActionBox);
        cameraActionBox.appendChild(cameraAction)

        //Attributs balises html
        cameraContentbox.setAttribute("class", "camera_contentbox col-md-6 col-lg-4 px-0 h-100");
        cameraContent.setAttribute("class", "camera_content shadow");
        cameraDescription.setAttribute("class", "camera_description px-2");
        cameraPicturebox.setAttribute("class", "camera_picturebox card-img-top");
        cameraPicture.setAttribute("alt", "Photo de la caméra");
        cameraName.setAttribute("class", "camera_name card-title");
        cameraPrice.setAttribute("class", "cameraPrice card-text");
        cameraActionBox.setAttribute("class", "camera_actionbox button-effect");
        cameraAction.setAttribute("href", "/front-end/product.html?id=" + camera._id);
        cameraAction.setAttribute("class", "camera_action btn");

        //Contenu interractif des balises
        cameraPicture.src = camera.imageUrl;
        cameraName.textContent = camera.name;
        cameraPrice.textContent = camera.price / 100 + " euros";
        cameraAction.textContent = "En savoir plus";
    });
}

//Exécution de la fonction d'affichage de la liste des produits

displayCamera();


