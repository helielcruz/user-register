<?php

    require_once '../db/database.php';

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $email = $_GET['email'];
        $password = $_GET['password'];

        $sql = "SELECT * FROM users WHERE email=:email";
        
        $result = getUser($sql, $email);

        if(!$result){
            echo json_encode(["response" => $result]);
        }else{
            if(password_verify($password,  $result['password'])) {
                echo json_encode(["response" => $result, "message" => "Logado!"]);
            } else{
                echo json_encode(["message" => "Senha inválida!"]);
            }
        }

        
    }

?>