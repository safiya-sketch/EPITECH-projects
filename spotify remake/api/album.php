<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

require_once("database.php"); 

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);

    $query = "
        SELECT 
            albums.id AS album_id,
            albums.name AS album_title,
            albums.cover_small,
            artists.name AS artist_name,
            genres.name AS genre_name,
            albums.description AS album_description  -- Ajout de la description
        FROM albums
        JOIN artists ON albums.artist_id = artists.id
        JOIN genres_albums ON albums.id = genres_albums.album_id
        JOIN genres ON genres.id = genres_albums.genre_id
        WHERE albums.id = :id
        LIMIT 1
    ";

    $stmt = $connect->prepare($query);
    $stmt->bindParam(":id", $id, PDO::PARAM_INT);
    $stmt->execute();

    $album = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($album) {
        $result = [
            "id" => $album["album_id"],
            "title" => $album["album_title"],
            "cover" => $album["cover_small"],
            "artist" => $album["artist_name"],
            "genre" => $album["genre_name"],
            "description" => $album["album_description"],  
        ];
        echo json_encode(["album" => $result]);
    } else {
        echo json_encode(["error" => "Album not found"]);
    }
} else {
    echo json_encode(["error" => "No album ID provided"]);
}
?>
