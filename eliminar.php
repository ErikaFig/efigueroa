<?php
include 'db.php';

if (isset($_GET['id'])) {

    $id = intval($_GET['id']);

    $stmt = $conexion->prepare("SELECT ruta_imagen FROM galerias WHERE id = ?");
    $stmt->execute([$id]);
    $row = $stmt->fetch();

    if ($row) {

        $ruta = __DIR__ . "/" . $row['ruta_imagen'];

        if (file_exists($ruta)) {
            unlink($ruta);
        }

        $deleteStmt = $conexion->prepare("DELETE FROM galerias WHERE id = ?");
        $deleteStmt->execute([$id]);

        echo json_encode(["status" => "success"]);

    } else {
        echo json_encode(["status" => "error", "mensaje" => "Imagen no encontrada"]);
    }

} else {
    echo json_encode(["status" => "error", "mensaje" => "ID no proporcionado"]);
}
?>