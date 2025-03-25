<?php

$servername = "127.0.0.1";
$username = "root";
$password = "";
try {
    $connect = new PDO("mysql:host=$servername;dbname=my_spotify", $username, $password);
    $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e) {
    echo "Erreur : ".$e->getMessage();
    die();
}