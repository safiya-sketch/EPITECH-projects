<?php
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Accept");

require_once("./database.php");

$query = "SELECT artists.id, artists.name AS artist_name, artists.photo AS artist_picture FROM artists LIMIT 50";
$result = $connect->query($query);
$array_artists = array();

while ($row = $result->fetch()) {
    $arr = array(
        "id" => $row["id"], 
        "picture" => $row["artist_picture"],
        "artist" => $row["artist_name"],
    );
    $array_artists[] = $arr;
}
echo json_encode($array_artists);
?>
