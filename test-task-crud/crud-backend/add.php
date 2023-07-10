<?php
include("cors.php");
include("config.php");
include("firebaseRDB.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (isset($_POST['name']) && isset($_POST['count'])) {
    $name = trim($_POST['name']);
    $count = $_POST['count'];

    if (empty($name) || !is_numeric($count)) {
      echo "Invalid data";
    } else {
      $db = new firebaseRDB($databaseURL);

      $insert = $db->insert("data", [
        "name" => $name,
        "count" => $count
      ]);

      echo "Data added successfully";
    }
  } else {
    echo "Missing data";
  }
}
?>
