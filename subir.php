<?php
include 'db.php';

// Verificamos que se haya enviado la imagen y los datos del formulario
if (isset($_FILES['foto'])) {
    $directorio = "./wwwroot/uploads/";
    
    // Si la carpeta no existe, la creamos
    if (!is_dir($directorio)) {
        mkdir($directorio, 0777, true);
    }

    $nombrePersonalizado = $_POST['nombre'] ?? 'Sin nombre';
    $extension = pathinfo($_FILES["foto"]["name"], PATHINFO_EXTENSION);
    
    // Validar formatos permitidos
    $formatosPermitidos = ['jpg', 'jpeg', 'png', 'gif'];
    if (!in_array(strtolower($extension), $formatosPermitidos)) {
        echo json_encode(["status" => "error", "message" => "Formato no permitido"]);
        exit;
    }

    $nombreArchivoFisico = time() . "_" . uniqid() . "." . $extension;
    $rutaFinal = $directorio . $nombreArchivoFisico;

    // IMPORTANTE: Es tmp_name, no tmp_id
    if (move_uploaded_file($_FILES["foto"]["tmp_name"], $rutaFinal)) {
        // Guardamos la ruta y el nombre que el usuario ingresó en la interfaz
        $stmt = $conn->prepare("INSERT INTO galerias (ruta_imagen, nombre_archivo) VALUES (?, ?)");
        $stmt->bind_param("ss", $rutaFinal, $nombrePersonalizado);
        
        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "ruta" => $rutaFinal]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error en BD"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "No se pudo mover el archivo"]);
    }
}
?>