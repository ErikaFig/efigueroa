<?php
include 'db.php';


// Verificamos que se haya enviado la imagen
if (isset($_FILES['foto'])) {

    
    $directorio = "uploads/";
    // Si la carpeta no existe, la creamos
    if (!is_dir($directorio)) {
        mkdir($directorio, 0777, true);
    }
    $nombre = $_POST['nombre'];

    
    $nombrePersonalizado = $_POST['nombre'] ?? 'Sin nombre';
    $extension = pathinfo($_FILES["foto"]["name"], PATHINFO_EXTENSION);
    
    // Validar formatos permitidos
    $formatosPermitidos = ['jpg', 'jpeg', 'png', 'gif'];
    if (!in_array(strtolower($extension), $formatosPermitidos)) {
        echo json_encode(["status" => "error", "message" => "Formato no permitido"]);
        exit;
    }

    //$conexion = conectarDB();
    $nombreArchivo = time() . "_" . preg_replace('/[^a-zA-Z0-9_.-]/', '', $_FILES['foto']['name']);
    $ruta = $directorio . $nombreArchivo;


    // Mover el archivo
    if (move_uploaded_file($_FILES["foto"]["tmp_name"], $ruta)) {
        // Guardamos en la base de datos usando la ruta relativa

        //tendria que ser en lugar de conexion, dsn

        $stmt=$conexion->prepare("INSERT INTO galerias(nombre_archivo,ruta_imagen) VALUES(?,?)");
        $stmt->bind_param("ss",$nombre,$ruta);
        $stmt->execute();
        //tendria que ser en lugar de conexion, dsn
        if($conexion->query($sql)){
            echo json_encode(["status"=>"success"]);
        } else {
            echo json_encode(["status"=>"error","mensaje"=>$conexion->error]);
        }

    } else {
        echo json_encode(["status"=>"error","mensaje"=>"No se pudo guardar archivo"]);
    }
}

?>