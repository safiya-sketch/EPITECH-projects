<?php

require_once("../database.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if (isset($_GET['id'])) {
    getArtist($connect, $_GET['id']);
} else {
    echo json_encode(['error' => 'Artist ID missing']);
}

function getArtist($connect, $id) {
    $stmt = $connect->prepare("SELECT * FROM artists WHERE id = :id");
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    $artist = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$artist) {
        echo json_encode(['error' => 'Artist not found']);
    } else {
        echo json_encode(['artist' => $artist]);
    }
}
?>
