<?php

session_start();

header('Content-Type: application/json');

if (isset($_SESSION['username'])) {

    echo json_encode([
        "login" => true,
        "usuario" => $_SESSION['username']
    ]);

} else {

    echo json_encode([
        "login" => false
    ]);
}

?>