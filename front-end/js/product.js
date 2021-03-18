//axios

main ()

async function main() {
    detailCameraProd ()
    
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

async function detailCameraProd () {

    const queryString = window.location.search;
    console.log (queryString);

    const urlParams = new URLSearchParams (queryString);
    console.log (urlParams);

    const id = urlParams.get('id');
    console.log(id);

    //console.log(detailProduct)


    //Element section product html

    const detailCamera = await getCamera(id);
    console.log(detailCamera)

    const detailProduct = document.getElementById("product");


    let detailContent = document.createElement("article");
    let detailPicturebox = document.createElement("div");
    let detailPicture = document.createElement("img");
    let detailDesrciption = document.createElement("div");
    let detailName = document.createElement("h2");
    let detailPrice = document.createElement("p");
    let detailText = document.createElement("p");
    

    detailContent.setAttribute("class", "detail_content");
    detailPicturebox.setAttribute("class", "detail_picturebox");
    detailPicture.setAttribute("alt", "photo de la caméra");
    detailDesrciption.setAttribute("class", "detail_description");
    detailName.setAttribute("class", "detail_name");
    detailPrice.setAttribute("class", "detail_price");
    detailText.setAttribute("class", "detail_text");

    detailPicture.src(camera.imageUrl)
    detailName.textContent(camera.name)
    detailPrice.textContent(camera.price / 100 + " euros")

}