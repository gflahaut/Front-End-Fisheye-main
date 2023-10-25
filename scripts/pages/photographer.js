// Importez la fonction getOnePhotographer du module "request.js"
import { getOnePhotographer } from "../utils/request.js";

// Analysez les paramètres de l'URL pour obtenir l'ID du photographe
const params = new URLSearchParams(window.location.search);
const photographerId = params.get("id");

// Appelez la fonction getOnePhotographer pour obtenir les détails du photographe
const onePhotographer = await getOnePhotographer(photographerId);

// Filtrez les médias pour ne conserver que ceux du photographe actuel
onePhotographer.media = onePhotographer.media.filter(
    (media) => media.photographerId == photographerId
);

// Filtrez les photographes pour ne conserver que le photographe actuel
onePhotographer.photographers = onePhotographer.photographers.filter(
    (photographer) => photographer.id == photographerId
);

// Récupérez les détails du photographe
const photographer = onePhotographer.photographers[0];

// Sélectionnez l'élément où afficher les informations du photographe
const photographerInfo = document.querySelector(".photographer-nav-info");

// Affichez les informations du photographe dans le HTML
photographerInfo.innerHTML = `
    <nav>
    <ul>
    <li><h1>${photographer.name}</h1></li>
    <li><p>${photographer.city}, ${photographer.country}</p></li>
    <li><p>${photographer.tagline}</p></li>
    <ul>
    </nav>
    <figure>
    <img src="assets/photographers/${photographer.portrait}" alt="${photographer.name}" class="round-image"></img>
    </figure>
`;

// Appelez la fonction displayMedia pour afficher les médias
displayMedia(onePhotographer.media);

// Sélectionnez l'élément de sélection pour trier les médias
const sortSelect = document.getElementById("sort-select");

// Ajoutez un gestionnaire d'événements pour réagir aux changements de sélection
sortSelect.addEventListener("change", function () {
    const selectedOption = sortSelect.value;
    /**
     * Fonction de gestion du changement de tri des médias par popularité.
     * @param {string} selectedOption - L'option de tri sélectionnée ("popularite" dans ce cas).
     */
    if (selectedOption === "popularite") {
        // Trier les médias par popularité (du plus aimé au moins aimé)
        onePhotographer.media.sort((a, b) => b.likes - a.likes);

        // Appeler la fonction displayMedia pour afficher les médias triés
        displayMedia(onePhotographer.media);
    } else if (selectedOption === "date") {
        // Trier par date (du plus récent au moins récent)
        /**
         * Cette méthode trie un tableau de médias en fonction de la date.
         * @param {Array} media - Le tableau de médias à trier.
         */
        onePhotographer.media.sort((a, b) => {
            // Convertir les dates en objets Date pour une comparaison précise
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            // Comparer les dates
            if (dateA < dateB) {
                // Si la date de 'a' est inférieure à la date de 'b', renvoyer 1
                return 1;
            }
            if (dateA > dateB) {
                // Si la date de 'a' est supérieure à la date de 'b', renvoyer -1
                return -1;
            }

            // Si les dates sont égales, renvoyer 0
            return 0;
        });

        displayMedia(onePhotographer.media);
        /**
         * Fonction de gestion du changement de tri des médias par titre.
         * @param {string} selectedOption - L'option de tri sélectionnée ("titre" dans ce cas).
         */
    } else if (selectedOption === "titre") {
        // Trier les médias par titre (ordre alphabétique)
        onePhotographer.media.sort((a, b) => {
            // Convertir les titres en minuscules pour une comparaison insensible à la casse
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();

            if (titleA < titleB) {
                return -1; // Si le titre de 'a' précède le titre de 'b', renvoyer -1
            }
            if (titleA > titleB) {
                return 1; // Si le titre de 'b' précède le titre de 'a', renvoyer 1
            }
            return 0; // Si les titres sont égaux, renvoyer 0
        });

        // Appeler la fonction displayMedia pour afficher les médias triés
        displayMedia(onePhotographer.media);
    }
});

/**
 * Affiche les médias dans le DOM en utilisant des modèles.
 * @param {Array} medias - Le tableau de médias à afficher.
 */
function displayMedia(medias) {
    // Sélectionnez l'élément du DOM où afficher les médias
    const mediaContainer = document.querySelector(".media-container");
    
    // Réinitialisez le contenu de l'élément pour supprimer les médias précédents
    mediaContainer.innerHTML = "";
    
    // Parcourez tous les médias et ajoutez-les au conteneur
    medias.forEach((media) => {
        // Créez un modèle de média en utilisant la fonction mediaTemplate
        const mediaModel = mediaTemplate(media);
        
        // Obtenez le DOM du média en utilisant la méthode getMediaCardDOM du modèle
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        
        // Ajoutez le DOM du média au conteneur
        mediaContainer.appendChild(mediaCardDOM);
    });
}

