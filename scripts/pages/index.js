import { getPhotographers } from "../utils/request.js";

/**
 * Affiche les photographes dans la section dédiée.
 * @param {Array} photographers - Les données des photographes à afficher.
 */
async function displayData(photographers) {
  // Sélectionnez la section des photographes dans le DOM
  const photographersSection = document.querySelector(".photographer_section");

  // Parcourez les données de chaque photographe
  photographers.forEach((photographer) => {
    // Créez un modèle de photographe en utilisant la fonction photographerTemplate
    const photographerModel = photographerTemplate(photographer);

    // Obtenez le DOM de la carte de photographe en utilisant la méthode getUserCardDOM du modèle
    const userCardDOM = photographerModel.getUserCardDOM();

    // Ajoutez la carte de photographe au conteneur des photographes
    photographersSection.appendChild(userCardDOM);
  });
}

/**
 * Fonction d'initialisation de la page.
 */
async function init() {
  try {
    // Récupérez les données des photographes en utilisant la fonction getPhotographers
    const { photographers } = await getPhotographers();

    // Affichez les données des photographes dans la section dédiée
    displayData(photographers);
  } catch (error) {
    // En cas d'erreur, affichez un message d'erreur dans la console
    console.error(
      "Une erreur s'est produite lors de la récupération des photographes.",
      error
    );
  }
}

// Appelez la fonction d'initialisation au chargement de la page
init();
