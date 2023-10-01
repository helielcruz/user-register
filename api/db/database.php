<?php

    function databaseConnection() {
        $path = __DIR__ . '/../.env';

        $enviroments = parse_ini_file($path);

        $host = $enviroments['HOST'];
        $dbname = $enviroments['DATABASE'];
        $username = $enviroments['USERNAME'];
        $password = $enviroments['PASSWORD'];

        try {
            $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $pdo;
        } catch (PDOException $e) {
            echo json_encode(["message" => "Erro de conexão", "error" => $e->getMessage()]);
        }
    }
    
    function insertUser($sql, $name, $email, $password) {
        $pdo = databaseConnection();
        if ($pdo) {
            try {
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(':name', $name);
                $stmt->bindParam(':email', $email);
                $stmt->bindParam(':password', $password);
                $stmt->execute();
                return true;
            } catch (\Throwable $error) {
                error_log("Exceção capturada: " . $error->getMessage());
                return $error->getMessage();
            }
        }
    }
?>