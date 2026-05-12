<?php
include 'db.php';

// Verificamos si existe el ID, si no, evitamos que truene
$id = isset($_POST['id']) ? $_POST['id'] : null;

if (!$id) {
    echo json_encode(["error" => "No ID provided"]);
    exit;
}

try {
    // Usamos prepare() en lugar de query()
    $sql = "SELECT * FROM galerias WHERE id = :id";
    $stmt = $conexion->prepare($sql);
    $stmt->execute(['id' => $id]);

    $imagenes = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // Asegúrate de que la ruta sea correcta respecto a la ubicación del PHP
        if (file_exists(__DIR__ . "/" . $row['ruta_imagen'])) {
            $imagenes[] = $row;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($imagenes);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>