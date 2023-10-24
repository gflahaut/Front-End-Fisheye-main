//Mettre le code JavaScript lié à la page photographer.html
import { getOnePhotographer } from "../utils/request.js";

const params = new URLSearchParams(window.location.search);
const photographerId = params.get('id');
const onePhotographer = await getOnePhotographer(photographerId);
console.log(onePhotographer);
onePhotographer.media = onePhotographer.media.filter(media => media.photographerId == photographerId);
onePhotographer.photographers = onePhotographer.photographers.filter(photographer => photographer.id == photographerId);
console.log(onePhotographer);

const photographer = onePhotographer.photographers[0];
const photographerInfo = document.querySelector(".photographer-nav-info");
photographerInfo.innerHTML = `
    <nav>
    <ul>
    <li><h2>${photographer.name}</h2></li>
    <li><p>${photographer.city}, ${photographer.country}</p></li>
    <li><p>${photographer.tagline}</p></li>
    <ul>
    </nav>
    <figure>
    <img src="assets/photographers/${photographer.portrait}" alt="photo de ${photographer.name}" class="round-image"></img>
    </figure>
`;
// const mediaContainer = document.getElementsByClassName("media-container");

// photographerMedia.forEach(mediaData => {
//     const media = PhotographerFactory.createMedia(mediaData);
//     mediaContainer.innerHTML += generateMediaHTML(media);
// });
