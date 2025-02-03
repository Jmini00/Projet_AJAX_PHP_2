<?php
// Définit l'entête de réponse au format JSON
header('Content-Type: application/json');

// Connexion à la BDD
require_once 'connexion.php';

// Récupère et décode le corps de la requête PUT en JSON
$values = json_decode(file_get_contents('php://input', true));

$id = htmlspecialchars(strip_tags($values->id));
$artiste = htmlspecialchars(strip_tags($values->artiste));
$album = htmlspecialchars(strip_tags($values->album));
$year = htmlspecialchars(strip_tags($values->year));
$preview = htmlspecialchars(strip_tags($values->preview));

if ($id && $artiste && $album && $year && $preview) {
    try {
        $query = $db->prepare('
            UPDATE vinyles 
            SET artiste = :artiste, album = :album, year = :year, preview = :preview 
            WHERE id = :id
        ');
        $query->bindValue(':id', $id, PDO::PARAM_INT);
        $query->bindValue(':artiste', $artiste);
        $query->bindValue(':album', $album);
        $query->bindValue(':year', $year);
        $query->bindValue(':preview', $preview);
        $success = $query->execute();

        echo json_encode([
            'status' => $success ? 200 : 500,
            'success' => $success,
            'message' => $success ? 'Vinyle mis à jour avec succès' : 'Erreur lors de la mise à jour du vinyle',
        ]);
    } catch (Exception $e) {
        echo json_encode([
            'status' => 500,
            'success' => false,
            'message' => 'Une erreur est survenue : ' . $e->getMessage(),
        ]);
    }
} else {
    echo json_encode([
        'status' => 400,
        'success' => false,
        'message' => 'Données manquantes ou invalides',
    ]);
}
?>
