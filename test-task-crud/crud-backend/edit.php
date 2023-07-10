<?php
include("cors.php");

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id']) && isset($data['name']) && isset($data['count'])) {
    $id = trim($data['id']);
    $name = trim($data['name']);
    $count = $data['count'];

    if (empty($id) || empty($name) || !is_numeric($count)) {
        echo "Invalid data";
    } else {
        include("config.php");
        include("firebaseRDB.php");
        $db = new firebaseRDB($databaseURL);

        $update = $db->update("data", $id, [
            "name" => $name,
            "count" => $count
        ]);

        echo "Data updated successfully";
    }
} else {
    echo "Invalid data";
}
?>
