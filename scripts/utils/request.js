const url = "../../data/photographers.json";
export async function getPhotographers() {
    // Les options par défaut sont indiquées par *
    let response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "no-cors", // no-cors, *cors, same-origin
        cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log(response);
    return response.json(); // transforme la réponse JSON reçue en objet JavaScript natif
}


export async function getOnePhotographer(id) {
    // Les options par défaut sont indiquées par *
    let response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "no-cors", // no-cors, *cors, same-origin
        cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
        },
    });
    

    return response.json(); // transforme la réponse JSON reçue en objet JavaScript natif
}
