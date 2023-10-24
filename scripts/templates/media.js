function mediaTemplate(mediaData) {
    const { title, image, video, likes, date, price} = mediaData;

    let mediaImage = "";
    let mediaVideo = "";
    if (image.length > 0){
        mediaImage = `assets/images/${mediaData.photographerId}/${image}`;
    }else{
        mediaVideo = `assets/images/${mediaData.photographerId}/${video}`;
    }
    
    function getMediaCardDOM() {
        const figure = document.createElement('figure');
        img.setAttribute('src', );
        img.setAttribute('alt', `Photo de ${name}`);
        img.classList.add('round-image'); // Ajoutez la classe "round-image" à l'image
        const figcaption = document.createElement('figcaption');
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const h3 = document.createElement('h3');
        h3.textContent = `${city}, ${country}`;
        const h4 = document.createElement('h4');
        h4.textContent = `${tagline}`;
        const h5 = document.createElement('h5');
        h5.textContent = `${price}€`;
        figure.addEventListener('click', function() {
            const photographerUrl = `/photographer.html?id=${id}`;
            window.location.href = photographerUrl;
        });
        figure.appendChild(img);
        figcaption.appendChild(h2); 
        figcaption.appendChild(h3); 
        figcaption.appendChild(h4); 
        figcaption.appendChild(h5);
        figure.appendChild(figcaption);
        article.appendChild(figure);
        return article;
    }
    return { name, id, city, country, tagline, price, picture, getUserCardDOM }
}

// function generateMediaHTML(media) {
// if (media instanceof ImageMedia) {
// return `<img src="${media.image}" alt="${media.title}">`;
// } else if (media instanceof VideoMedia) {
// return `<video controls><source src="${media.video}" type="video/mp4">Your browser does not support the video tag.</video>`;
// }
// }