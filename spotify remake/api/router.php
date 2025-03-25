<?php
// Vérifie si le fichier demandé existe physiquement
if (file_exists(__DIR__ . parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH))) {
    return false; // Laisser PHP gérer le fichier normalement
}

// Sinon, rediriger toutes les requêtes vers index.php
require __DIR__ . "/api.php";
