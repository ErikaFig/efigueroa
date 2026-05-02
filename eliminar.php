<?php
include 'db.php';

$id = $_GET['id'];

$sql = "SELECT ruta_imagen FROM galerias WHERE id=$id";

$result = $conn->query($sql);

if($row = $result->fetch_assoc()){

    if(file_exists($row['ruta_imagen'])){
        unlink($row['ruta_imagen']);
    }

    $conn->query("DELETE FROM galerias WHERE id=$id");

    echo json_encode(["status"=>"success"]);
}
?>