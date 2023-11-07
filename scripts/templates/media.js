/**
 * Fonction qui génère un modèle de média à partir des données du média.
 * @param {Object} mediaData - Les données du média.
 * @returns {Object} - Un objet contenant des propriétés et une méthode pour générer le DOM du média.
 */
function mediaTemplate(mediaData) {
    console.log(mediaData);
     // Extrait les données du média
     const { id, title, image, video, likes, date, price } = mediaData;
     let mediaImage = "";
     let mediaVideo = "";
 

    // Vérifiez si l'image existe et n'est pas nulle
    if (typeof image !== undefined && image) {
        mediaImage = `assets/images/${mediaData.photographerId}/${image}`;
    }
    if (typeof video !== undefined && video) {
        mediaVideo = `assets/images/${mediaData.photographerId}/${video}`;
    }

    /**
     * Méthode pour générer le DOM du média (article HTML).
     * @returns {HTMLElement} - Élément HTML représentant le média.
     */
    function getMediaCardDOM() {
        // Créez les éléments HTML pour le média
        const article = document.createElement('article');
        const figure = document.createElement('figure');
        const figcaption = document.createElement('figcaption');
        const h2 = document.createElement('h2');
        h2.classList.add('imgTitle');
        h2.textContent = title;


        // Créez un conteneur pour les likes
        const containerLikes = document.createElement('div');
        containerLikes.classList.add('media-likes-container');
        containerLikes.setAttribute('id', id);

        // If media was previously liked
        if (typeof mediaData.liked !== undefined && mediaData.liked) {
            containerLikes.classList.add('liked');
        }

        // Créez un élément pour afficher le nombre de likes
        const likesInfo = document.createElement('span');
        likesInfo.textContent = likes;
        likesInfo.classList.add('likes');

        // Créez l'icône de like
        const iconElement = document.createElement("i");
        iconElement.className = "fas fa-heart";
        iconElement.setAttribute('aria-label', 'likes');

        // Ajoutez les éléments au DOM
        containerLikes.append(likesInfo, iconElement);
        figcaption.appendChild(h2);
        figcaption.appendChild(containerLikes);


        /**
         * Génère le contenu HTML pour l'image et/ou la vidéo du média.
         * @param {string} mediaImage - URL de l'image du média.
         * @param {string} mediaVideo - URL de la vidéo du média.
         */
        function generateMediaHTML(mediaImage, mediaVideo) {
            if (mediaImage.length > 0) {
                const img = document.createElement('img');
                img.setAttribute('src', mediaImage);
                img.setAttribute('alt', title);
                img.classList.add('media-image');
                figure.setAttribute('data-mediaId', id);
                figure.appendChild(img);
            }
            if (mediaVideo.length > 0) {
                const video = document.createElement('video');
                video.setAttribute('controls', '');
                video.classList.add('media-video');
                video.setAttribute('alt', title);

                // Utilisez un objet de données pour stocker les informations sur la vidéo
                video.dataset.itemprop = 'name';
                video.dataset.content = title;

                // Utilisez un élément source pour spécifier le type de vidéo et la source
                const source = document.createElement('source');
                source.setAttribute('type', 'video/mp4');
                source.setAttribute('src', mediaVideo);
                video.appendChild(source);
                figure.setAttribute('data-mediaId', id);
                figure.appendChild(video);
                
            }
        }
        generateMediaHTML(mediaImage, mediaVideo);
        figure.classList.add('lightbox');
        

        article.appendChild(figure);
        figure.appendChild(figcaption);
        return article;
    }
    // Retourne un objet contenant des propriétés et la méthode de génération du DOM du média
    return { title, image, video, likes, date, price, getMediaCardDOM };
    
}
