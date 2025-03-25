<?php

header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Accept");


require_once("./database.php");

$query = "SELECT 
tracks.name AS track_name,
tracks.mp3 AS track_mp3,
albums.name AS album_name,
albums.cover_small AS album_cover,
artists.name AS artist_name
FROM tracks
JOIN albums ON tracks.album_id = albums.id
JOIN artists ON albums.artist_id = artists.id LIMIT 50;
";
$result = $connect->query($query);
$array_songs = array();

while ($row = $result->fetch()) {
    $arr = array(
        "cover" => $row["album_cover"],
        "mp3" => $row["track_mp3"],
        "album" => $row["album_name"],
        "song" => $row["track_name"],
        "artist" => $row["artist_name"]
    );
    $array_songs[] = $arr;
}

echo json_encode($array_songs);

?>
