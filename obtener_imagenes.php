<?php
include 'db.php';

$sql = "SELECT * FROM galerias ORDER BY id DESC";
//$conexion = conectarDB();
 //tendria que ser en lugar de conexion, dsn
$result = $conexion->query($sql);

$imagenes = [];

if ($result) {
    while($row = $result->fetch_assoc()){
        // Verificar si la imagen existe físicamente
        if (file_exists($row['ruta_imagen'])) {
            $imagenes[] = $row;
        }
    }
}

header('Content-Type: application/json');
echo json_encode($imagenes);

$conexion->close();
?>