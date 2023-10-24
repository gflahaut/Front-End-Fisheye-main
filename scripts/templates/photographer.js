function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `assets/photographers/${portrait}`;
    function getUserCardDOM() {
        const article = document.createElement('article');
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', `Photo de ${name}`);
        img.classList.add('round-image');
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