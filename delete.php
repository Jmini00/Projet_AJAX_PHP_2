<?php
// Définit l'entête de réponse au format JSON
header('Content-Type: application/json');

// Connexion à la BDD
require_once 'connexion.php';

// Récupère l'ID du vinyle à partir des paramètres de la requête
parse_str(file_get_contents('php://input'), $data);
$id = isset($data['id']) ? intval($data['id']) : null;

if ($id) {
    try {
        $query = $db->prepare('DELETE FROM vinyles WHERE id = :id');
        $query->bindValue(':id', $id, PDO::PARAM_INT);
        $success = $query->execute();

        echo json_encode([
            'status' => $success ? 200 : 500,
            'success' => $success,
            'message' => $success ? 'Vinyle supprimé avec succès' : 'Erreur lors de la suppression du vinyle',
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
        'message' => 'ID manquant ou invalide',
    ]);
}
?>
