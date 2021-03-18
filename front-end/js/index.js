
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
            alert(error)
            return []
        })
}

//Création du HTML pour afficher les caméras

async function displayCamera(camera) {

    //const cameras = await getCameras()

    //Lien avec la page HTML

    const listCamera = document.getElementById('list-camera');

    //Structure index.html

    let cameraContent = document.createElement("article");
    let cameraDescription = document.createElement("div");
    let cameraPicturebox = document.createElement("div");
    let cameraPicture = document.createElement("img");
    let cameraName = document.createElement("h2");
    let cameraPrice = document.createElement("p");
    let cameraAction = document.createElement("a");

    //Attributs balises html

    cameraContent.setAttribute("class", "camera_content card shadow my-3");
    cameraDescription.setAttribute("class", "camera_Description");
    cameraPicturebox.setAttribute("class", "camera_picturebox card-img-top");
    cameraPicture.setAttribute("alt", "Photo de la caméra");
    cameraName.setAttribute("class", "camera_name card-title");
    cameraPrice.setAttribute("class", "cameraPrice card-text");
    cameraAction.setAttribute("href", "product.html?id=" + camera._id);

    //contenu des balises

    cameraPicture.src = camera.imageUrl;
    cameraName.textContent = camera.name;
    cameraPrice.textContent = camera.price / 100 + " euros";
    cameraAction.textContent = "En savoir plus";

    //Agencement des élèments 

    listCamera.appendChild(cameraContent);
    cameraContent.appendChild(cameraPicturebox)
    cameraContent.appendChild(cameraDescription);
    cameraPicturebox.appendChild(cameraPicture);
    cameraDescription.appendChild(cameraName);
    cameraDescription.appendChild(cameraPrice);
    cameraDescription.appendChild(cameraAction)
}


