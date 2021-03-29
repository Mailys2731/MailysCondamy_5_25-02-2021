
main()

async function main() {
    detailCameraProd();

}

//Lien avec l'API

function getCamera(id) {

    return fetch(`http://localhost:3000/api/cameras/${id}`)

        .then(function (httpBodyResponse) {
            console.log(httpBodyResponse)
            if (httpBodyResponse.status === 404) {
                throw new Error;
            }
            return httpBodyResponse.json()
        })

        .then(function (camera) {
            return camera
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

async function detailCameraProd() {

    const queryString = window.location.search;
    console.log(queryString);

    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams);

    const id = urlParams.get('id');
    console.log(id);

    const detailCamera = await getCamera(id);
    console.log(detailCamera);


    const detailPicture = document.getElementById('detailCard__picture');
    const detailDescription = document.getElementById('detailCard__description');
    const detailName = document.getElementById('detailCard__name');
    const detailPrice = document.getElementById('detailCard__price');

    detailPicture.src = detailCamera.imageUrl;
    console.log(detailPicture);
    detailDescription.textContent = detailCamera.description;
    console.log(detailDescription)
    detailName.textContent = detailCamera.name;
    console.log(detailName)
    detailPrice.textContent = detailCamera.price / 100 + " euros";
    console.log(detailPrice)

    detailCamera.lenses.forEach(camera => {
        let option = document.createElement("Option");
        document
            .getElementById("choiceLenses")
            .appendChild(option).innerHTML = camera;

    });


    //Création du panier
    let cart = JSON.parse(localStorage.getItem("cart"));


    // Ajout d'un article au pannier
    addToCart = () => {
        let buy = document.getElementById('addToCart');
        buy.addEventListener("click", async function () {
            const add = await getCameras();
            cart.push(add);
            localStorage.setItem("cart", jsonStringify(cart));
            console.log("Le produit a été ajouté au panier");
            alert("Vous avez ajouté cet article au panier !")
        })
    }
}



