import { getPhotographers } from "../utils/request.js";

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        console.log(photographer);
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    try {
        const { photographers } = await getPhotographers();
        displayData(photographers);      
    } catch (error) {
        console.log(error);
    }
}
init();
