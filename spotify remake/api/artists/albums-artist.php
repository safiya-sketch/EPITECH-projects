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
    $artist_id = $_GET['id'];

    $query = "SELECT id, name, cover FROM albums WHERE artist_id = :artist_id";
    $stmt = $connect->prepare($query);
    $stmt->bindParam(":artist_id", $artist_id);
    $stmt->execute();

    $albums = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["albums" => $albums]);
} else {
    echo json_encode(["message" => "Aucun ID d'artiste fourni"]);
}
?>
