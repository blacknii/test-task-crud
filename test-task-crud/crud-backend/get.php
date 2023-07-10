<?php

include("cors.php");
include("config.php");
include("firebaseRDB.php");

$db = new firebaseRDB($databaseURL);

$data = $db->retrieve("data");
$data = json_decode($data, true);

header("Content-Type: application/json");

echo json_encode($data);
?>
