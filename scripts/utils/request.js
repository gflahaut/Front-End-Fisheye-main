const photographersUrl = "../../data/photographers.json";

/**
 * Récupère la liste de tous les photographes.
 * @returns {Promise<Array>} Une promesse qui se résout avec un tableau de photographes.
 */
export async function getPhotographers() {
    try {
        const response = await fetch(photographersUrl);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des photographes : ", error);
        throw error; // Vous pouvez gérer l'erreur ou la propager pour une gestion ultérieure.
    }
}

export async function getOnePhotographer(id) {
    try {
        const response = await fetch(photographersUrl);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
    } catch (error) {
        console.error(`Une erreur s'est produite lors de la récupération du photographe ${id} : `, error);
        throw error; // Vous pouvez gérer l'erreur ou la propager pour une gestion ultérieure.
    }
}
