<?php

    require_once '../db/database.php';
    require_once '../services/generateToken.php';

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $email = $_GET['email'];
        $password = $_GET['password'];

        $sql = "SELECT * FROM users WHERE email=:email";
        
        $result = getUser($sql, $email);

        if(!$result){
            echo json_encode(["response" => $result]);
        }else{
            if(password_verify($password,  $result['password'])) {
                $user = [
                    "id" => $result['id'],
                    "name" => $result['name'],
                    "email" => $result['email']
                ];
                $token = tokenGenerate($result['id']);
                echo json_encode(["response" => $user, "token" => $token, "message" => "Logado!"]);
            } else{
                echo json_encode(["message" => "Senha inválida!"]);
            }
        }

        
    }

?>