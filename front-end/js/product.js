//axios

main()

async function main() {
    detailCameraProd();

}

//Lien avec l'API

function getCamera(id) {

    return fetch(`http://localhost:3000/api/cameras/${id}`)

        .then(function (httpBodyResponse) {
            return httpBodyResponse.json()
        })

        .then(function (camera) {
            return camera
        })

        .catch(function (error) {
            alert(error)
            return undefined;
        })
}

async function detailCameraProd() {

    const queryString = window.location.search;
    console.log(queryString);

    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams);

    const id = urlParams.get('id');
    console.log(id);

    const detailCamera = await getCamera(id);
    console.log(detailCamera);

    document.getElementById('cardContainer').innerHTML += `

        <div class="detailCard__pictureBox">
            <img class="detailCard__picture" alt="Photo de la caméra" src=${detailCamera.imageUrl}>
        </div>
        <div class="detailCard__descriptionBox">
            <h2 class= "detailCard__name">${detailCamera.name}</h2>
            <p class="detailCard__description">${detailCamera.description}</p>
            <p class="detailCard__price">${detailCamera.price / 100 + " euros"}</p>
        </div>
        <label for="option">Choisissez votre lentille:</label>
            <select name="option" id="choiceLenses">
                <option disabled value="" selected>Choix lentille</option>
            </select>`

    detailCamera.lenses.forEach(camera => {
        let choiceOption = document.createElement("Option");
        document
            .getElementById("choiceLenses")
            .appendChild(choiceOption).innerHTML = camera;

    });
}


/*const detailPicture = document.getElementsByClassName('detailCard__picture');
const detailDescription = document.getElementsByClassName('detailCard__description');
const detailName = document.getElementsByClassName('detailCard__name');
const detailPrice = document.getElementsByClassName('detailCard__price');

detailPicture.src = detailCamera.imageUrl;
console.log(detailPicture);
detailDescription.innerHtml = detailCamera.description;
console.log(detailDescription)
detailName.textContent = detailCamera.name;
console.log(detailName)
detailPrice.textContent = detailCamera.price /100 +" euros";
console.log(detailPrice)
*/


