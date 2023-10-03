<?php

    require_once '../db/database.php';

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        $dataJson = file_get_contents('php://input');

        $data = json_decode($dataJson, true);

        $userData = $data;

        $passwordHash = password_hash($data['password'], PASSWORD_DEFAULT);

        $sql = "INSERT INTO users (name, email, password) VALUES (:name, :email, :password)";

        $result = insertUser($sql, $data['name'], $data['email'], $passwordHash);

        if ($result === true) {
            echo json_encode(["message" => "Usuário cadastrado com sucesso", "user" => $result]);
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Erro ao inserir usuário", "error" => $result]);
        }
    }

?>