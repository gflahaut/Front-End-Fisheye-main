/**
 * Fonction qui génère un modèle de photographe à partir des données du photographe.
 * @param {Object} data - Les données du photographe.
 * @returns {Object} - Un objet contenant des propriétés et une méthode pour générer le DOM du photographe.
 */
function photographerTemplate(data) {
    // Extrait les données du photographe
    const { name, id, city, country, tagline, price, portrait } = data;

    /**
     * Méthode pour générer le DOM du photographe (article HTML).
     * @returns {HTMLElement} - Élément HTML représentant le photographe.
     */
    function getUserCardDOM() {
        // Créez un élément img pour la photo du photographe
        const img = document.createElement('img');
        img.setAttribute('src', `assets/photographers/${portrait}`);
        img.setAttribute('alt', `Photo de ${name}`);
        img.classList.add('round-image');

        // Créez un élément figure pour contenir l'image
        const figure = document.createElement('figure');
        figure.classList.add('photographer-section-figure');
        figure.setAttribute('tabindex', '1');

         // Ajoutez un gestionnaire d'événements au clic pour rediriger vers la page du photographe
         figure.addEventListener('click', function() {
            window.location.href = `/photographer.html?id=${id}`;
        });
        figure.addEventListener('keydown', function() {
            window.location.href = `/photographer.html?id=${id}`;
        });
       
        // Créez un élément figcaption pour contenir le texte
        const figcaption = document.createElement('figcaption');

        // Créez des éléments h2, h3, h4, h5 pour le nom, la ville, la tagline et le prix
        const h2 = document.createElement('h2');
        h2.textContent = name;

        //Créez un éléments pour l'image
        const div = document.createElement('div');
        div.classList.add('image-wrapper');

        
        // Créez un élément article pour contenir la figure
        const article = document.createElement('article');
        
        
       
        
        

        const h3 = document.createElement('h3');
        h3.textContent = `${city}, ${country}`;

        const h4 = document.createElement('h4');
        h4.textContent = tagline;

        const h5 = document.createElement('h5');
        h5.textContent = `${price}€/jour`;

        const divInformations = document.createElement('div');
        divInformations.classList.add('index-infos-photographers');
        
     
        article.append(figure, divInformations);
        figure.append(div,figcaption);
        div.appendChild(img);
        figcaption.append(h2);
        
        divInformations.append(h3, h4, h5);

        return article;
    }

    // Retourne un objet contenant des propriétés et la méthode de génération du DOM du photographe
    return { name, id, city, country, tagline, price, getUserCardDOM };
}
