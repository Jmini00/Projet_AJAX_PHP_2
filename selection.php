<?php

// Connexion à la BDD
require_once 'connexion.php';

$query = $db->query('SELECT * FROM vinyles ORDER BY artiste ASC');
$vinyles = $query->fetchAll();

// Force l'entête du navigateur au format JSON
header('Content-Type: application/json; charset=UTF-8');
echo json_encode($vinyles);
