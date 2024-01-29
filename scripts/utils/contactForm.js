const body = document.querySelector('body');
const modal = document.getElementById("contact_modal");
const modalContent = document.querySelector(".modal");
const closeButton = document.querySelector('.close-modal-btn');
const header = document.querySelector('header');
const main = document.querySelector('main');
const modalTitle = document.querySelector('#modalTitle');
const form = document.querySelector('form');
const prenomInput = document.getElementById('prenom');
const nomInput = document.getElementById('nom');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const validationButton = document.querySelector(".contact_button");
const successMessage = document.querySelector('.success-message');

/**
 * Affiche la boîte modale de contact.
 * @param {string} photographerName - Le nom du photographe à contacter.
 */
function displayModal(photographerName) {
    modalTitle.textContent ="";
    const modalHeaderTitle = document.createElement('span');
    const modalHeaderSubtitle = document.createElement('span');
    modalTitle.append(modalHeaderTitle, modalHeaderSubtitle);
    modalHeaderTitle.textContent = `Contactez-moi `;
    modalHeaderSubtitle.textContent = `${photographerName}`;
    modal.setAttribute('aria-hidden', 'false');
    body.classList.add('no-scroll');
    main.classList.add('overlay');
    header.classList.add('overlay');
    modal.classList.remove("d-none");
    modal.classList.add("d-flex");

    if(form.classList.contains("d-none")){
        document.querySelector('.success-message').classList.toggle('d-none');
        modalTitle.style.display = "flex";
        form.classList.toggle('d-none');
    }

    document.querySelector("#prenom").focus();
    // closeButton.focus();
    modal.addEventListener('keydown', modalDisposalEvent);
    // Gestionnaire d'événement pour fermer la modal
    closeButton.addEventListener("click", closeModal);
}

/**
 * Ferme la boîte modale de contact.
 */
function closeModal() {
    modalDisposal();
    modal.removeEventListener('keydown', modalDisposalEvent);
    closeButton.removeEventListener("click", closeModal);
}

/**
 * Effectue les opérations nécessaires pour disposer la boîte modale.
 */
function modalDisposal() {
    modal.setAttribute('aria-hidden', 'true');
    body.classList.remove('no-scroll');
    main.classList.remove('overlay');
    header.classList.remove('overlay');
    modal.classList.remove("d-flex");
    modal.classList.add("d-none");
    openButton.focus();
    document.querySelector("form").reset();
}

// /**
//  * Gère l'événement de pression de la touche "Escape" pour fermer la boîte modale.
//  * @param {KeyboardEvent} event - L'événement de touche.
//  */
function modalDisposalEvent(event) {
    if (event.key === 'Escape') {
        modalDisposal();
    }
}

/**
 * Gestionnaire d'événement pour la soumission du formulaire.
 * Valide les champs du formulaire avant de le soumettre.
 * @param {Event} event - L'événement de soumission du formulaire.
 */
form.addEventListener('click', (event) => {
    if(event.target = validationButton){
        let valid = "";
        /**
         * Affiche un message d'erreur pour un champ donné.
         * @param {HTMLInputElement} input - Le champ d'entrée en cours de validation.
         * @param {string} message - Le message d'erreur à afficher.
         */
        function showError(input, message) {
            const errorDiv = input.nextElementSibling; // Le div pour le message d'erreur
            errorDiv.textContent = message;
            errorDiv.classList.remove('hidden'); // Affiche le message d'erreur
            input.classList.add('invalid-border'); // Ajoute une bordure rouge
            input.classList.remove('valid-border'); // Supprime la bordure verte
            valid = false;
        }

        /**
         * Affiche un message de validation pour un champ donné.
         * @param {HTMLInputElement} input - Le champ d'entrée en cours de validation.
         */
        function showValid(input) {
            const errorDiv = input.nextElementSibling;
            errorDiv.textContent = '';
            errorDiv.classList.add('hidden'); // Cache le message d'erreur
            input.classList.remove('invalid-border'); // Supprime la bordure rouge
            input.classList.add('valid-border'); // Ajoute une bordure verte
            valid = true;
        }

        // Validation du prénom avec regex (exemple : au moins 2 caractères alphabétiques)
        const prenomRegex = /^[A-Za-z]{2,}$/;
        if (!prenomRegex.test(prenomInput.value)) {
            showError(prenomInput, 'Veuillez renseigner un prénom valide.');
        } else {
            showValid(prenomInput);
        }

        // Validation du nom (même regex que pour le prénom)
        if (!prenomRegex.test(nomInput.value)) {
            showError(nomInput, 'Veuillez renseigner un nom valide.');
        } else {
            showValid(nomInput);
        }

        // Validation de l'adresse email avec regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, 'Veuillez renseigner une adresse email valide.');
        } else {
            showValid(emailInput);
        }

        // Validation du message (exemple : au moins 10 caractères)
        if (messageInput.value.length < 10) {
            showError(messageInput, 'Veuillez renseigner un message d\'au moins 10 caractères.');
        } else {
            showValid(messageInput);
        }

        if (valid) {
            sendDataToServer();
        }
    }
});


function sendDataToServer(){
    // send data to server and then in the callback do the below instructions
    form.reset();
    form.classList.toggle('d-none');
    modalTitle.style.display = 'none';
    successMessage.classList.toggle('d-none');
}