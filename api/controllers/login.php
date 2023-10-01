<?php

    require_once '../db/database.php';

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $email = $_GET['email'];
        $pasword = $_GET['password'];

        $sql = "SELECT * FROM users WHERE email=:email";
        
        $result = getUser($sql, $email);

        echo json_encode(["response" => $result]);
    }

?>