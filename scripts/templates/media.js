/**
 * Fonction qui génère un modèle de média à partir des données du média.
 * @param {Object} mediaData - Les données du média.
 * @returns {Object} - Un objet contenant des propriétés et une méthode pour générer le DOM du média.
 */
function mediaTemplate(mediaData) {
    const { title, image, video, likes, date, price } = mediaData;
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
        const article = document.createElement('article');
        const figure = document.createElement('figure');

        // Fonction pour générer le contenu HTML du média en fonction du type (image ou vidéo)
        function generateMediaHTML(mediaImage, mediaVideo) {
            if (mediaImage.length > 0) {
                const img = document.createElement('img');
                img.setAttribute('src', mediaImage);
                img.setAttribute('alt', `${title}`);
                img.classList.add('media-image');
                figure.appendChild(img);
            }
            if (mediaVideo.length > 0) {
                const video = document.createElement('video');
                const meta = document.createElement('meta');
                const type = "video/mp4";
                const videoName = title;
                video.setAttribute('controls', '');
                video.setAttribute('src', mediaVideo);
                video.setAttribute('type', type);
                video.classList.add('media-video');
                meta.setAttribute('itemprop', 'name');
                meta.setAttribute('content', videoName);
                figure.appendChild(video);
                video.appendChild(meta);
            }
        }

        // Appel de la fonction pour générer le contenu HTML du média
        generateMediaHTML(mediaImage, mediaVideo);

        const figcaption = document.createElement('figcaption');
        const h2 = document.createElement('h2');
        h2.textContent = title;
        figcaption.appendChild(h2);
        const likesInfo = document.createElement('span');
        figcaption.appendChild(likesInfo);
        likesInfo.textContent = likes;
        figure.appendChild(figcaption);
        article.appendChild(figure);

        return article;
    }

    // Retourne un objet contenant des propriétés et la méthode de génération du DOM du média
    return { title, image, video, likes, date, price, getMediaCardDOM };
}
