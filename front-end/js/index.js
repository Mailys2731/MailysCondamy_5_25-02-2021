
main()

async function main() {
    const cameras = await getCameras()
    console.log(cameras)
    cameras.forEach((camera) => {
        displayCamera(camera);
    });

}


//Lien avec l'API

function getCameras() {

    return fetch("http://localhost:3000/api/cameras")

        .then(function (httpBodyResponse) {
            return httpBodyResponse.json()
        })

        .then(function (cameras) {
            return cameras
        })

        .catch(function (error) {
            (Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Une erreur interne s'est produite !",
                type:"success",
            }))
            return []
        })
}

//Création du HTML pour afficher les caméras

async function displayCamera(camera) {

    //const cameras = await getCameras()

    //Lien avec la page HTML

    const listCamera = document.getElementById('list-camera');

    //Structure index.html
    let cameraContentbox = document.createElement("div");
    let cameraContent = document.createElement("article");
    let cameraDescription = document.createElement("div");
    let cameraPicturebox = document.createElement("div");
    let cameraPicture = document.createElement("img");
    let cameraName = document.createElement("h2");
    let cameraPrice = document.createElement("p");
    let cameraActionBox = document.createElement("div");
    let cameraAction = document.createElement("a")


    //Attributs balises html
    cameraContentbox.setAttribute("class", "camera_contentbox col-md-6 col-lg-4 px-0")
    cameraContent.setAttribute("class", "camera_content shadow");
    cameraDescription.setAttribute("class", "camera_description px-2");
    cameraPicturebox.setAttribute("class", "camera_picturebox card-img-top");
    cameraPicture.setAttribute("alt", "Photo de la caméra");
    cameraName.setAttribute("class", "camera_name card-title");
    cameraPrice.setAttribute("class", "cameraPrice card-text");
    cameraActionBox.setAttribute("class", "camera_actionbox button-effect");
    cameraAction.setAttribute("href", "product.html?id=" + camera._id);
    cameraAction.setAttribute("class", "camera_action btn")

    //contenu des balises

    cameraPicture.src = camera.imageUrl;
    cameraName.textContent = camera.name;
    cameraPrice.textContent = camera.price / 100 + " euros";
    cameraAction.textContent = "En savoir plus";

    //Agencement des élèments 

    listCamera.appendChild(cameraContentbox);
    cameraContentbox.append(cameraContent);
    cameraContent.appendChild(cameraPicturebox);
    cameraPicturebox.appendChild(cameraPicture);
    cameraContent.appendChild(cameraDescription);
    cameraDescription.appendChild(cameraName);
    cameraDescription.appendChild(cameraPrice);
    cameraDescription.appendChild(cameraActionBox);
    cameraActionBox.appendChild(cameraAction)
}
//es6?
