<?php
include 'db.php';

$id = $_POST['id'];

$sql = "SELECT * FROM galerias where id= :id";
$stmt = $conexion->query($sql);

$imagenes = [];

while ($row = $stmt->fetch()) {
    if (file_exists(__DIR__ . "/" . $row['ruta_imagen'])) {
        $imagenes[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($imagenes);
?>