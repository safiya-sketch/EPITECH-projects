<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

require_once("./database.php");

$query = "
    SELECT 
        albums.id AS album_id,
        artists.name AS artist_name,
        albums.name AS music_title,
        albums.cover_small,
        genres.name AS genre_name,
        albums.description AS album_description  
    FROM albums
    JOIN artists ON albums.artist_id = artists.id
    JOIN genres_albums ON albums.id = genres_albums.album_id
    JOIN genres ON genres.id = genres_albums.genre_id
";

$result = $connect->query($query);

$array_albums = [];

while ($row = $result->fetch()) {
    $arr = [
        "id" => $row["album_id"],
        "cover" => $row["cover_small"],
        "title" => $row["music_title"],
        "artist" => $row["artist_name"],
        "genre" => $row["genre_name"],
        "description" => $row["album_description"],  
    ];
    $array_albums[] = $arr;
}

echo json_encode($array_albums);

?>