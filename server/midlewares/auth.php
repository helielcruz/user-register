<?php
    require_once '../services/validateToken.php';
    
    function auth($token){
        $key = "chave-ultra-secreta";

        $result = validateToken($token, $key);

        if ($result) {
            return ["auth" => true, "message" => "Authenticated"];
        } else {
            http_response_code(401);
            return ["auth" => false, "message" => "Token inválido!"];
        }
    }

?>