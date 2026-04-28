<?php
include 'db.php';

$sql = "SELECT id, ruta_imagen, nombre_archivo FROM galerias ORDER BY id DESC";
$result = $conn->query($sql);

$imagenes = array();
while ($row = $result->fetch_assoc()) {
    $imagenes[] = $row;
}

header('Content-Type: application/json');
echo json_encode($imagenes);
?>