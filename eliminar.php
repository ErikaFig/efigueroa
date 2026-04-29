<?php
include 'db.php';

$id = $_GET['id'] ?? 0;

$sql = "SELECT ruta_imagen FROM galerias WHERE id = $id";
$result = $conn->query($sql);
if ($row = $result->fetch_assoc()) {
    $ruta = $row['ruta_imagen'];
    if (file_exists($ruta)) {
        unlink($ruta);
    }
}

$sql = "DELETE FROM galerias WHERE id = $id";
$conn->query($sql);

echo json_encode(["status" => "success"]);
?>