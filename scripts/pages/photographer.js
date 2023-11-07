/**
 * Importe la fonction getOnePhotographer du module "request.js".
 * @module request
 * @function getOnePhotographer
 */
import { getOnePhotographer } from "../utils/request.js";

// Analyse les paramètres de l'URL pour obtenir l'ID du photographe
const params = new URLSearchParams(window.location.search);
const photographerId = params.get("id");

// Appelle la fonction getOnePhotographer pour obtenir les détails du photographe
const onePhotographer = await getOnePhotographer(photographerId);

// Filtre les médias pour ne conserver que ceux du photographe actuel
onePhotographer.media = onePhotographer.media.filter(
  (media) => media.photographerId == photographerId
);

// Filtre les photographes pour ne conserver que le photographe actuel
onePhotographer.photographers = onePhotographer.photographers.filter(
  (photographer) => photographer.id == photographerId
);

// Récupère les détails du photographe
const photographer = onePhotographer.photographers[0];

// Sélectionnez l'élément où afficher les informations du photographe
const photographerName = document.querySelector(".photographer-header-name");
photographerName.textContent = photographer.name;
const photographerCountry = document.querySelector(".photographer-header-country");
photographerCountry.textContent = `${photographer.city}, ${photographer.country}`;
const photographerTagline = document.querySelector(".photographer-header-tagline");
photographerTagline.textContent = photographer.tagline;
const photographerImageContainer = document.querySelector(".image-wrapper");
photographerImageContainer.setAttribute('data-photographer-name',`${photographer.name}`);
const photographerImage = document.querySelector("#photographer-header-image");
photographerImage.setAttribute("src",`../assets/photographers/${photographer.portrait}`);
photographerImage.setAttribute("alt", `${photographer.name}`);
const photographerInfoPrice = document.querySelector(".photographer-info-price");
photographerInfoPrice.innerHTML = `${photographer.price}€ / jour`;
const photographerInfoLikes = document.querySelector(".photographer-info-likes");

document.querySelector(".sort-select-button").addEventListener("click", function () {
  toggleSortDropdown();
});

document.querySelector(".sort-select-button").addEventListener("keydown", function (event) {
  if(event.key === 'Enter'){
    toggleSortDropdown();
  }
});
//la fonction reduce() pour parcourir le tableau OnePhotographer.media
//et accumule les valeurs de la propriété likes. Le 0 permet l'initialisation
//  à O pour éviter les erreurs elle donne la somme des likes du tableau.
/**
 * Calcule la somme des likes des médias d'un photographe.
 * @param {Array} mediaList - La liste des médias du photographe.
 * @returns {number} - La somme des likes des médias.
 */
function calculateTotalLikes(mediaList) {
  return mediaList.reduce((acc, current) => acc + current.likes, 0);
}

photographerInfoLikes.innerHTML = calculateTotalLikes(onePhotographer.media);

const openButton = document.querySelector(".open-modal-btn");

// Gestionnaire d'événement pour ouvrir la modal
openButton.addEventListener("click", () => {
  displayModal(photographer.name);
});

openButton.addEventListener("keydown", (event) => {
  if (event.key === 'Enter') {
    displayModal(photographer.name);
  }
});

// Appelez la fonction displayMedia pour afficher les médias
displayMedia(onePhotographer.media);

// Initialisation de la variable enregistrant la dernière option de tri choisie par l'utilisateur
let lastSort = "";

/**
 * Trie un tableau d'objets en fonction de la valeur de la clé spécifiée.
 * @param {Array} media - Le tableau d'objets à trier.
 * @param {string} key - La clé sur laquelle baser le tri.
 * @param {function} compareFn - La fonction de comparaison personnalisée.
 */
function sortByKey(media, key, compareFn) {
  // Utilise la méthode Array.sort() pour trier le tableau.
  // La méthode compareFn est utilisée pour comparer les valeurs de la clé spécifiée.
  media.sort((a, b) => compareFn(a[key], b[key]));
}

/**
 * Fonction de comparaison pour trier les titres des médias de manière insensible à la casse.
 * @param {string} a - Le titre du premier média.
 * @param {string} b - Le titre du deuxième média.
 * @returns {number} - Un nombre négatif si a précède b, un nombre positif si b précède a, 0 s'ils sont égaux.
 */
function compareTitles(a, b) {
  // Convertit les titres en minuscules pour une comparaison insensible à la casse*
  // Utilise localeCompare pour comparer les titres
  return a.toLowerCase().localeCompare(b.toLowerCase());
}

// Sélectionnez tous les boutons d'option de tri
const sortOptionButtons = document.querySelectorAll('button[role="option"]');

/**
 * Gère la sélection d'une option de tri.
 * @param {Event} event - L'événement de clic sur un bouton d'option de tri.
 */
function sortOptionClick(event) {
  // Désélectionne toutes les options de tri
  sortOptionButtons.forEach((button) => {
    button.setAttribute("aria-selected", "false");
  });

  // Sélectionne l'option de tri cliquée
  const selectedButton = event.target;
  selectedButton.setAttribute("aria-selected", "true");

  // Obtient la valeur de l'option sélectionnée
  const selectedValue = selectedButton.getAttribute("data-value");

  // Vous pouvez ajouter votre logique de tri et d'affichage ici en fonction de la valeur sélectionnée.
  sortMedias(selectedValue);
}

/**
 * Trie et affiche les médias en fonction de l'option de tri sélectionnée.
 * @param {string} selectedValue - La valeur de l'option de tri sélectionnée.
 */
function sortMedias(selectedValue) {
  // Enregistre la dernière option de tri choisie par l'utilisateur
  lastSort = selectedValue;
  let spanSelect = document.querySelector(".sort-select");

  if (selectedValue === "popularite") {
    // Trie les médias par popularité (nombre de likes décroissant)
    onePhotographer.media.sort((a, b) => b.likes - a.likes);
    spanSelect.textContent = " Popularité ";
  } else if (selectedValue === "date") {
    // Trie les médias par date (du plus récent au plus ancien)
    onePhotographer.media.sort((a, b) => new Date(b.date) - new Date(a.date));
    spanSelect.textContent = " Date ";
  } else if (selectedValue === "titre") {
    // Trie les médias par titre (ordre alphabétique)
    sortByKey(onePhotographer.media, "title", compareTitles);
    spanSelect.textContent = " Titre ";
  }

  // Affiche les médias triés dans le DOM
  displayMedia(onePhotographer.media);
}

// Ajoute un gestionnaire d'événements à chaque bouton d'option de tri
sortOptionButtons.forEach((button) => {
  button.addEventListener("click", sortOptionClick);
});

sortOptionButtons.forEach((button) => {
  button.addEventListener("keypress", (event) =>{
    if(event.key === 'Enter'){
      sortOptionClick
    }
  });
});

/**
 * Affiche les médias dans le DOM en utilisant des modèles.
 * @param {Array} medias - Le tableau de médias à afficher.
 */
function displayMedia(medias) {
  // Sélectionnez l'élément du DOM où afficher les médias
  const mediaContainer = document.querySelector(".media-container");

  // Réinitialise le contenu de l'élément pour supprimer les médias précédents
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

  // Ajoute un gestionnaire d'événements ici pour qu'il soit attaché aux nouveaux éléments créés à chaque fois (lors des tris)
  // Sélectionne tous les conteneurs d'icônes "likes" dans les médias
  const likesIcons = document.querySelectorAll(".media-likes-container");

  likesIcons.forEach((icon) => {
    icon.addEventListener("click", (event) => {
      let mediaSpan = event.target;
      // Détermine le bon contenu pour la variable mediaSpan
      if (event.target.nodeName === "I" || event.target.nodeName === "SPAN") {
        mediaSpan = event.target.parentNode;
      }
      // Si le média n'a pas encore été aimé
      if (!mediaSpan.classList.contains("liked")) {
        mediaSpan.classList.add("liked");
        updateLikes(mediaSpan, true);
      } else {
        mediaSpan.classList.remove("liked");
        updateLikes(mediaSpan, false);
      }
    });
  });

  /**
   * Sélectionne toutes les figures avec la classe 'lightbox' et ajoute des gestionnaires d'événements de clic à chacune d'entre elles.
   * Lorsque l'une de ces figures est cliquée, la fonction setLightboxContent est appelée pour afficher une lightbox.
   */

  const figures = document.querySelectorAll(".lightbox");
  figures.forEach((figure) => {
    figure.addEventListener("click", (event) => {
      event.preventDefault(); // Empêche le comportement par défaut du clic pour éviter la navigation
      let targetMediaElement = event.target;
      if(targetMediaElement.nodeName === 'IMG' || targetMediaElement.nodeName === 'H2'){
        const mediaId = figure.getAttribute("data-mediaId"); // Récupère l'identifiant de la média associée
      //Trouve l'index du média dans la liste des médias
      const lightboxDataIndex = onePhotographer.media.findIndex(
        (media) => media.id == mediaId
      );
      createLightbox();
      setLightboxContent("creation", lightboxDataIndex); // Affiche le contenu de la média dans la lightbox
      setLightboxEventListeners();
      }
    });
  });
}

function createLightbox(){
  //Crée les éléments HTML pour la lighbox
  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox-overlay");
  const content = document.createElement("div");
  content.classList.add("lightbox-content");
  lightbox.appendChild(content);
  // Ajouter la lightbox au document
  document.body.appendChild(lightbox);
}

/**
 * Remplit la lightbox avec le contenu du média correspondant à mediaId.
 * @param {string} mediaId - L'identifiant de la média.
 */
function setLightboxContent(origin, lightboxDataIndex) {
  const lightbox = document.querySelector(".lightbox-overlay");
  const content = document.querySelector(".lightbox-content");
  content.innerHTML = "";

  //Récupère les données du média à affciher
  const lightboxData = onePhotographer.media[lightboxDataIndex];

  const lightboxFigure = document.createElement("figure");
  lightboxFigure.setAttribute("data-index", lightboxDataIndex);
  lightboxFigure.classList.add('lightbox-figure');

  const figcaption = document.createElement("figcaption");
  figcaption.classList.add('lightbox-figcaption');

  const title = document.createElement("h2");
  title.textContent = lightboxData.title;
  title.classList.add('lightbox-h2');

  //Crée un conteneur pour les flèches de navigation
  const figureContainer = document.createElement("div");
  figureContainer.classList.add('lightbox', 'arrow-container');
  
  // vérifie si l'index de l'image actuellement affichée dans la lightbox (lightboxDataIndex) est supérieur à 0. 
  //Elle permet de déterminer si l'image actuelle n'est pas la première image dans la liste des médias du photographe.
  //selon la réponse à la condition affiche ou non l'icone gauche.
  if (lightboxDataIndex > 0) {
    const iconLeft = document.createElement("i");
    iconLeft.setAttribute("tabIndex", "0");
    iconLeft.classList.add('lightbox',"fa-solid", "fa-chevron-left");
    figureContainer.appendChild(iconLeft);

    // Gestionnaire pour passer à la média précédente
    iconLeft.addEventListener("click", (event) => {
      setLightboxContent("left-arrow", lightboxDataIndex - 1);
    });
  }

  if(lightboxData.image){
    const image = document.createElement("img");
    image.classList.add('lightbox-img');
    const href = `assets/images/${lightboxData.photographerId}/${lightboxData.image}`;
    image.src = href;
    figureContainer.appendChild(image);
  }else if(lightboxData.video){
    const video = document.createElement('video');
    video.setAttribute('controls', '');
    video.classList.add('lightbox-video');
    video.setAttribute('alt', lightboxData.title);
    
    const source = document.createElement('source');
    source.setAttribute('type', 'video/mp4');
    source.setAttribute('src',  `assets/images/${lightboxData.photographerId}/${lightboxData.video}`);
    video.append(source);
    figureContainer.appendChild(video);
  }
 

  //vérifie si l'index de l'image actuellement affichée dans la lightbox (lightboxDataIndex) est inférieur à l'index du dernier média disponible. 
  //elle permet de déterminer si l'image actuelle n'est pas la dernière image dans la liste des médias du photographe.
  //selon la réponse à la condition affiche ou non l'icone droite.
  if (lightboxDataIndex < onePhotographer.media.length - 1) {
    const iconRight = document.createElement("i");
    iconRight.setAttribute("tabIndex", "0");
    iconRight.classList.add('lightbox', "fa-solid", "fa-chevron-right");
    figureContainer.appendChild(iconRight);

    // Gestionnaire pour passer à la média suivante
    iconRight.addEventListener("click", (event) => {
      setLightboxContent("right-arrow", lightboxDataIndex + 1);
    });
  }

  // Crée un conteneur pour l'icône de fermeture
  const closeIconContainer = document.createElement("span");
  closeIconContainer.classList.add('lightbox', 'close-icon-container');
  const closeIcon = document.createElement("i");
  closeIcon.classList.add('lightbox', "fa-solid", "fa-xmark");
  closeIcon.setAttribute("tabIndex", "0");

  // Gestionnaire pour fermer la lightbox
  closeIcon.addEventListener("click", () => {
    lightbox.remove();
  });

  // Construction de la structure HTML de la lightbox
  content.append(closeIconContainer, lightboxFigure);
  closeIconContainer.append(closeIcon);
  lightboxFigure.append(figureContainer, figcaption);
  figcaption.appendChild(title);

  switch(origin){
    case "creation": 
      document.querySelector(".lightbox-content .fa-xmark").focus();
    break;
    case "left-arrow":
      if (lightboxDataIndex > 0) {
        document.querySelector(".lightbox-content .fa-chevron-left").focus();
      }else{
        document.querySelector(".lightbox-content .fa-chevron-right").focus();
      }
    break;
    case "right-arrow":
      if (lightboxDataIndex < onePhotographer.media.length - 1) {
        document.querySelector(".lightbox-content .fa-chevron-right").focus();
      }else{
        document.querySelector(".lightbox-content .fa-chevron-left").focus();
      }
    break;
  }
}

function setLightboxEventListeners(){
  const lightbox = document.querySelector(".lightbox-overlay");
  // Gestionnaire pour la navigation au clavier
  lightbox.addEventListener("keydown", (event) => {
    const lightboxDataIndex = parseInt(document.querySelector(".lightbox-content figure").getAttribute("data-index"));
    switch (event.key) {
      case 'ArrowLeft':
        // Si la touche de la flèche gauche est enfoncée, passez à la média précédente
        if (lightboxDataIndex > 0) {
          setLightboxContent("left-arrow", lightboxDataIndex - 1);
        }
      break;

      case 'ArrowRight':
        // Si la touche de la flèche droite est enfoncée, passez à la média suivante
        if (lightboxDataIndex < onePhotographer.media.length - 1) {
          setLightboxContent("right-arrow", lightboxDataIndex + 1);
        }
      break;

      case 'Escape':
        // Si la touche Échap est enfoncée, fermez la lightbox
        lightbox.remove();
      break;

      case 'Enter':
        const iconLeft = document.querySelector('.lightbox .fa-chevron-left');
        const iconRight = document.querySelector('.lightbox .fa-chevron-right');
        const closeIcon = document.querySelector('.lightbox .fa-xmark');
        
        if (document.activeElement === iconLeft ) {
          // Gérer l'action de l'icône de gauche
          if (lightboxDataIndex > 0) {
            setLightboxContent("left-arrow", lightboxDataIndex - 1);
          }
        } else if (document.activeElement === iconRight ) {
          // Gérer l'action de l'icône de droite
          if (lightboxDataIndex < onePhotographer.media.length - 1) {
            setLightboxContent("right-arrow", lightboxDataIndex + 1);
          }
        } else if (document.activeElement === closeIcon ) {
          // Gérer l'action de l'icône de fermeture
          lightbox.remove();
        }
      break;

      default:
        // Ne rien faire pour les autres touches
      break;
    }
  });
}

/**
 * Met à jour le nombre de "likes" pour un élément de média donné.
 * @param {HTMLElement} element - L'élément du DOM associé aux likes.
 * @param {boolean} increment - Un booléen indiquant s'il faut incrémenter (true) ou décrémenter (false) les likes.
 */
function updateLikes(element, increment) {
  // Obtient l'ID des likes à partir de l'attribut 'id' de l'élément.
  let likesId = element.getAttribute("id");

  // Recherche l'objet média correspondant dans onePhotographer.media en fonction de l'ID.
  const likesValue = onePhotographer.media.find((media) => media.id == likesId);

  // Si likesValue n'est pas nul (c'est-à-dire que l'ID existe dans onePhotographer.media).
  if (likesValue) {
    // Si increment est vrai (true), incrémente les likes de 1 et définit 'liked' sur vrai (true).
    if (increment) {
      likesValue.likes += 1;
      likesValue.liked = true;
    } else {
      // Si increment est faux (false), décrémente les likes de 1 et définit 'liked' sur faux (false).
      likesValue.likes -= 1;
      likesValue.liked = false;
    }
    // Mise à jour du Total de likes dans le footer
    photographerInfoLikes.innerHTML = calculateTotalLikes(
      onePhotographer.media
    );
  }

  // Met à jour la valeur des likes dans le DOM.
  const likesCount = element.querySelector(".likes");
  if (likesCount) {
    likesCount.textContent = likesValue.likes;
  }

  // Si le dernier tri était basé sur la popularité ('popularite'), réorganise les médias en conséquence.
  if (lastSort == "popularite") {
    sortMedias("popularite");
  }
}

function toggleSortDropdown() {
  document.querySelector(".container-sort-options").classList.toggle("show");
}

/**
 * Gère la navigation au clavier à l'intérieur du conteneur modal et de la lightbox.
 * Intercepte l'événement 'keydown' et empêche la navigation en dehors du conteneur.
 * @param {Event} event - L'objet d'événement 'keydown'.
 */
const modalContact = document.querySelector("#contact_modal");
document.addEventListener('keydown', (event) => {
  // Gestion de la navigation au clavier pour le conteneur modal
  if (event.key === 'Tab' && modalContact.classList.contains('d-flex')){
    // Vérifie si la touche "Tab" est enfoncée et si le conteneur modal est visible (classe 'd-flex').
    // Si c'est le cas, nous devons gérer la navigation au clavier à l'intérieur du conteneur.

    event.preventDefault(); // Empêche la navigation en dehors du container

    // Utilise la fonction 'setModalTabulationBehavior' pour gérer la navigation au clavier
    // à l'intérieur du conteneur modal. Sélectionne tous les éléments focusables dans le modal,
    // tels que les boutons, les champs de texte, et les zones de texte.
    setModalTabulationBehavior(event, modalContact.querySelectorAll('button, input, textarea')); 
  }
   // Gestion de la navigation au clavier pour la lightbox
  const lightbox = document.querySelector(".lightbox-content");
  if (event.key === 'Tab' && lightbox){
    // Vérifie si la touche "Tab" est enfoncée et si la lightbox est visible.
    // Si c'est le cas, nous devons gérer la navigation au clavier à l'intérieur de la lightbox.

    event.preventDefault(); // Empêche la navigation en dehors du container

    // Utilise la fonction 'setModalTabulationBehavior' pour gérer la navigation au clavier
    // à l'intérieur de la lightbox. Sélectionne tous les éléments focusables dans la lightbox,
    // en l'occurrence, les icônes.
    setModalTabulationBehavior(event, lightbox.querySelectorAll('i'));
  }
});

/**
 * Gère le comportement de tabulation à l'intérieur d'un conteneur modal pour la navigation au clavier.
 * @param {KeyboardEvent} event - L'objet d'événement clavier.
 * @param {NodeListOf<HTMLElement>} focusableElements - Une liste d'éléments pouvant recevoir le focus à l'intérieur du conteneur modal.
 */
function setModalTabulationBehavior(event, focusableElements){
  // Récupère le premier et le dernier élément focusable à l'intérieur du conteneur modal.
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  // Si la touche "Shift" est enfoncée, naviguez en sens inverse.
  if (event.shiftKey) {
    // Si l'élément actif est le premier, passe le focus au dernier élément.
    if (document.activeElement === firstElement) {
      lastElement.focus();
    } else {
       // Si ce n'est pas le premier élément, trouve l'indice de l'élément actif et passe au précédent.
      const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);
      // Si on atteint le début de la liste, reboucle vers le dernier élément.
      const previousIndex = currentIndex - 1 < 0 ? focusableElements.length - 1 : currentIndex - 1; 
       // Met le focus sur l'élément précédent.
      focusableElements[previousIndex].focus();
    }
  } else {
    // Si la touche "Shift" n'est pas enfoncée (tabulation dans l'ordre normal).
    // Si l'élément actif est le dernier, passe le focus au premier élément.
    if (document.activeElement === lastElement) {
      firstElement.focus();
    } else {
       // Si ce n'est pas le dernier élément, trouve l'indice de l'élément actif.
      let currentIndex = Array.from(focusableElements).indexOf(document.activeElement);
      // Si l'indice n'est pas trouvé (par exemple, si aucun élément n'a le focus), le premier élément devient actif.
      if(currentIndex == -1){
        currentIndex = 0;
      }
       // Calcule l'indice de l'élément suivant en bouclant si nécessaire.
      const nextIndex = (currentIndex + 1) % focusableElements.length;
       // Met le focus sur l'élément suivant.
      focusableElements[nextIndex].focus();
    }
  }
}
