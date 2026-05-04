<?php
include 'db.php';

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    //$conexion = conectarDB();
    // Obtener ruta de la imagen
    $sql = "SELECT ruta_imagen FROM galerias WHERE id = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($row = $result->fetch_assoc()) {
        // Eliminar archivo físico
        if (file_exists($row['ruta_imagen'])) {
            unlink($row['ruta_imagen']);
        }
        
        // Eliminar registro de BD
        $deleteSql = "DELETE FROM galerias WHERE id = ?";
        $deleteStmt = $conexion->prepare($deleteSql);
        $deleteStmt->bind_param("i", $id);
        
        if ($deleteStmt->execute()) {
            echo json_encode(["status" => "success"]);
        } else {
            echo json_encode(["status" => "error", "mensaje" => $conexion->error]);
        }
        $deleteStmt->close();
    } else {
        echo json_encode(["status" => "error", "mensaje" => "Imagen no encontrada"]);
    }
    $stmt->close();
} else {
    echo json_encode(["status" => "error", "mensaje" => "ID no proporcionado"]);
}

$conexion->close();
?>