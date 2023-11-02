const photographersUrl = "../../data/photographers.json";

/**
 * Récupère la liste de tous les photographes.
 * @returns {Promise<Array>} Une promesse qui se résout avec un tableau de photographes.
 */
export async function getPhotographers() {
    const response = await fetch(photographersUrl);
    return response.json();
}

export async function getOnePhotographer(id) {
    const response = await fetch(photographersUrl);
    return response.json();
}
  
// export async function getOnePhotographer(id) {
//     const response = await fetch(photographersUrl);
//     return response.json();
// }


// export async function getPhotographers(url = photographersUrl, donnees = {}) {
//     // Les options par défaut sont indiquées par *
//     const response = await fetch(url, {
//         mode: 'no-cors',
//         headers: {
//         "Content-Type": "application/json",
//       },
//     })
//     .then(response => response.json());
//   }
