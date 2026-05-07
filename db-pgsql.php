<?php
// db-pgsql.php

function conectarPostgres() {
    $host = "localhost";
    $port = "5432";
    $db   = "efigueroa1_db";
    $user = "figueroae"; // Usuario por defecto en Postgres
    $pass = "wisk@023";

    // El DSN cambia el prefijo a 'pgsql'
    $dsn = "pgsql:host=$host;port=$port;dbname=$db";

    try {
        // Creamos la instancia de PDO
        $pdo = new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);

        return $pdo;
    } catch (PDOException $e) {
        die("Error conectando a PostgreSQL: " . $e->getMessage());
    }
}
$postgres = conectarPostgres();
?>