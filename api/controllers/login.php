<?php

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $email = $_GET['email'];
        $pasword = $_GET['password'];

        $sql = "SELECT * FROM users WHERE email=:email";

        echo getUser($sql, $email);
    }

?>