async function deleteVinyle(id) {
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce vinyle ?");
    if (!confirmation) return;

    try {
        const response = await fetch(`delete.php`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });

        const result = await response.json();

        if (result.success) {
            alert("Vinyle supprimé avec succès !");
            // Optionnel : supprimer le vinyle du DOM
            const vinyleElement = document.querySelector(`#vinyle-${id}`);
            if (vinyleElement) {
                vinyleElement.remove();
            }
        } else {
            alert("Erreur : " + result.message);
        }
    } catch (error) {
        console.error('Erreur lors de la suppression :', error);
        alert("Une erreur s'est produite. Veuillez réessayer.");
    }
}
