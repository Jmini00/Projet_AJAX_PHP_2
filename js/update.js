async function updateVinyle(id, artiste, album, year) {
    try {
        const response = await fetch('update.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                artiste: artiste.trim(),
                album: album.trim(),
                year: year.trim(),
            }),
        });

        const result = await response.json();

        if (result.success) {
            alert("Vinyle mis à jour avec succès !");
            // Optionnel : mettre à jour l'interface utilisateur
            const vinyleElement = document.querySelector(`#vinyle-${id}`);
            if (vinyleElement) {
                vinyleElement.querySelector('.artiste').textContent = artiste;
                vinyleElement.querySelector('.album').textContent = album;
                vinyleElement.querySelector('.year').textContent = year;
            }
        } else {
            alert("Erreur : " + result.message);
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour :', error);
        alert("Une erreur s'est produite. Veuillez réessayer.");
    }
}
