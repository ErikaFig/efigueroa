<?php
include 'db.php';

if(isset($_POST['guardar']) && isset($_FILES['foto'])){

    echo "<pre>";
    var_dump($_FILES);
    echo "</pre>";

    $carpeta = "./wwwroot/uploads/";

    if(!is_dir($carpeta)){
        mkdir($carpeta, 0777, true);
    }

    $nombre = $_POST['nombre'] ?? '';

    if($_FILES['foto']['error'] === 0){

        $nombreOriginal = $_FILES['foto']['name'];
        $nombreArchivo = time() . "_" . $nombreOriginal;

        $ruta = $carpeta . $nombreArchivo;

        if(move_uploaded_file($_FILES['foto']['tmp_name'], $ruta)){

            $sql = "INSERT INTO galerias (nombre_archivo, ruta_imagen)
                    VALUES ('$nombre', '$ruta')";

            if($conn->query($sql)){
                echo "✅ Imagen guardada y registro insertado";
            } else {
                echo "❌ Error BD: " . $conn->error;
            }

        } else {
            echo "❌ Error al mover archivo";
        }

    } else {
        echo "❌ Error en archivo: " . $_FILES['foto']['error'];
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Prueba subida</title>
</head>
<body>

<h2>Subir imagen (PRUEBA)</h2>

<form method="POST" enctype="multipart/form-data">
    <input type="file" name="foto" required><br><br>
    <input type="text" name="nombre" placeholder="Nombre"><br><br>
    <button name="guardar">Subir</button>
</form>

</body>
</html>