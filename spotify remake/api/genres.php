<?php

header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Accept");

require_once("./database.php");

$query = "
SELECT 
    genres.name AS genre_name,
    artists.name AS artist_name,
    albums.name AS album_title,
    albums.cover_small
FROM albums
JOIN artists ON albums.artist_id = artists.id
JOIN genres_albums ON albums.id = genres_albums.album_id
JOIN genres ON genres_albums.genre_id = genres.id
ORDER BY genres.name";

$result = $connect->query($query);

$grouped_albums = array();

while ($row = $result->fetch()) {
    $genre = $row["genre_name"];

    if (!isset($grouped_albums[$genre])) {
        $grouped_albums[$genre] = [];
    }

    $grouped_albums[$genre][] = array(
        "cover" => $row["cover_small"],
        "title" => $row["album_title"],
        "artist" => $row["artist_name"],
    );
}

echo json_encode($grouped_albums);

?>