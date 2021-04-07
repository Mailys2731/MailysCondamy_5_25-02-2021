
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

        .catch(function (error) {

            (Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Quelque chose c'est mal passé !",
            }))
            return undefined;
        })
}

let cart  = JSON.parse(localStorage.getItem('cart'));
if (!cart) {
    cart = []
}

cart.forEach(async (productId) => {
    try {
        let camera = await getCamera(productId);
        //Faire une fonction qui affiche les données
    } catch (e){
        console.log(e)
    }

})

//Valider l'email grâce à la librairie Validator