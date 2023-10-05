<?php

    require_once '../db/database.php';
    require_once '../services/generateToken.php';

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $email = $_GET['email'];
        $password = $_GET['password'];

        $sql = "SELECT * FROM users WHERE email=:email";
        
        $result = getUser($email);

        if(!$result){
            echo json_encode(["message" => "Usuário não encontrado!"]);
        }else{
            if(password_verify($password,  $result['password'])) {
                $user = [
                    "id" => $result['id'],
                    "email" => $result['email']
                ];
                $token = tokenGenerate($user);
                echo json_encode(["response" => $user, "token" => $token, "message" => "Logado!"]);
            } else{
                echo json_encode(["message" => "Senha inválida!"]);
            }
        }

        
    }

?>