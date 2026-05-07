<?php
include 'db-pgsql.php';

if (isset($_FILES['foto'])) {

    $directorio = __DIR__ . "/uploads/";

    if (!is_dir($directorio)) {
        mkdir($directorio, 0777, true);
    }

    $nombre = $_POST['nombre'] ?? 'Sin nombre';

    $extension = pathinfo($_FILES["foto"]["name"], PATHINFO_EXTENSION);

    $formatosPermitidos = ['jpg', 'jpeg', 'png', 'gif'];
    if (!in_array(strtolower($extension), $formatosPermitidos)) {
        echo json_encode(["status" => "error", "message" => "Formato no permitido"]);
        exit;
    }

    $nombreArchivo = time() . "_" . preg_replace('/[^a-zA-Z0-9_.-]/', '', $_FILES['foto']['name']);

    $rutaRelativa = "uploads/" . $nombreArchivo;
    $rutaAbsoluta = $directorio . $nombreArchivo;

    if (move_uploaded_file($_FILES["foto"]["tmp_name"], $rutaAbsoluta)) {

        $stmt = $postgres->prepare("INSERT INTO galerias(nombre_archivo, ruta_imagen) VALUES (?, ?)");
        $stmt->execute([$nombre, $rutaRelativa]);

        echo json_encode(["status" => "success"]);

    } else {
        echo json_encode(["status" => "error", "mensaje" => "No se pudo guardar archivo"]);
    }
}
?>