<?php

/**
 * Insère les données en BDD
 */

// Définit l'entête de réponse au format JSON
header('Content-Type: application/json');

// Connexion à la BDD
require_once 'connexion.php';

// Récupère et décode le corps de la requête POST en JSON
$values = json_decode(file_get_contents('php://input', true));

$artiste = htmlspecialchars(strip_tags($values->artiste));
$album = htmlspecialchars(strip_tags($values->album));
$year = htmlspecialchars(strip_tags($values->year));
$preview = htmlspecialchars(strip_tags($values->preview));

$query = $db->prepare('INSERT INTO vinyles (artiste, album, year, preview) VALUES (:artiste, :album, :year, :preview)');
$query->bindValue(':artiste', $artiste);
$query->bindValue(':album', $album);
$query->bindValue(':year', $year);
$query->bindValue(':preview', $preview);
$query->execute();

echo json_encode([
    'status' => 201,
    'success' => true,
    'message' => 'Vinyle ajouté avec succès'
]);
