/**
 * Insertion des données
 */
/*const form = document.querySelector('form').addEventListener('submit', function(event) {
    // Empêche le formulaire de recharger la page
    event.preventDefault()

    // Récupère les valeurs de mes champs de formulaire
    const artiste = document.querySelector('#artiste').value.trim();
    const album = document.querySelector('#album').value.trim();
    const year = document.querySelector('#year').value.trim();
    const preview = document.querySelector('#preview').files[0].name;

    // Vérifie que tous les champs sont remplis
    if (!artiste || !album || !year) {
        Swal.fire({
            position: "bottom",
            icon: 'warning',
            title: 'Attention',
            text: 'Remplissez tous les champs !',
            showConfirmButton: false,
            timer: 2000,
            width: '30%',
        });
        return;
    }

    fetch('insertion.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            artiste: artiste,
            album: album,
            year: year,
            preview: preview
        })
    })
        .then(response => response.json())
        .then(data => {
            
            if(data.success) {
            // Création d'une "li" et d'une "carte"
            const li = document.createElement('li');
            li.textContent = `${artiste} - ${album} (${year})`;

            const template = document.getElementById('template').content
            const card = document.importNode(template, true)
            card.querySelector('.card-title').textContent = artiste
            card.querySelector('.card-text').textContent = album
            card.querySelector('.card-small').textContent = year
            card.querySelector('.card-back-img').src = `public/assets/albums/${preview}`

            // Ajoute la "li" à la liste en place et une carte
            document.querySelector('section ul').appendChild(li)
            document.querySelector('#vinyles').appendChild(card)
            
            // Réinitialise le formulaire
            document.querySelector('form').reset();

            Swal.fire({
                position: "top-end",
                icon: 'success',
                title: 'Bravo',
                text: 'Vinyle ajouté avec succès !',
                showConfirmButton: false,
                timer: 2000
            });
            }
            else {
                alert('Une erreur s\'est produite lors de l\'ajout du vinyle.');
            }
        })
        .catch(error => console.error(error))
        //alert('Impossible de soumettre le formulaire pour le moment.');
})*/



/**
 * Insertion des données
 */
const form = document.querySelector('form');
form.addEventListener('submit', async function (event) {
    // Empêche le formulaire de recharger la page
    event.preventDefault();

    // Récupération des champs
    const artisteInput = document.querySelector('#artiste');
    const albumInput = document.querySelector('#album');
    const yearInput = document.querySelector('#year');
    const previewInput = document.querySelector('#preview');

    const artiste = artisteInput.value.trim();
    const album = albumInput.value.trim();
    const year = yearInput.value.trim();
    const preview = previewInput.files[0].name;

    // Validation des champs
    if (!artiste || !album || !year) {
        Swal.fire({
            position: 'bottom',
            icon: 'warning',
            title: 'Attention',
            text: 'Remplissez tous les champs !',
            showConfirmButton: false,
            timer: 2000,
            width: '30%',
        });
        return;
    }

    if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
        Swal.fire({
            position: 'bottom',
            icon: 'warning',
            title: 'Erreur',
            text: 'Veuillez saisir une année valide !',
            showConfirmButton: false,
            timer: 2000,
            width: '30%',
        });
        return;
    }

    try {
        // Envoi des données au serveur
        const response = await fetch('insertion.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ artiste, album, year, preview }),
        });

        const data = await response.json();

        if (data.success) {
            // Ajout dynamique des éléments
            const li = document.createElement('li');
            li.textContent = `${artiste} - ${album} (${year})`;

            const template = document.getElementById('template').content;
            const card = document.importNode(template, true);
            card.querySelector('.card-title').textContent = artiste;
            card.querySelector('.card-text').textContent = album;
            card.querySelector('.card-small').textContent = year;
            card.querySelector('.card-back-img').src = `public/assets/albums/${preview}`

            document.querySelector('section ul').appendChild(li);
            document.querySelector('#vinyles').appendChild(card);

            // Réinitialiser le formulaire
            form.reset();

            // Afficher une alerte de succès
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Bravo',
                text: 'Vinyle ajouté avec succès !',
                showConfirmButton: false,
                timer: 2000,
            });
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Erreur',
                text: data.message || "Une erreur s'est produite lors de l'ajout du vinyle.",
                showConfirmButton: true,
            });
        }
    } catch (error) {
        // Gestion des erreurs de requête
        console.error('Erreur lors de l\'envoi des données :', error);
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Erreur',
            text: 'Impossible de soumettre le formulaire pour le moment.',
            showConfirmButton: true,
        });
    }
});


