<?php
include 'db-pgsql.php';

$sql = "SELECT * FROM galerias ORDER BY id DESC";
$stmt = $postgres->query($sql);

$imagenes = [];

while ($row = $stmt->fetch()) {
    if (file_exists(__DIR__ . "/" . $row['ruta_imagen'])) {
        $imagenes[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($imagenes);
?>