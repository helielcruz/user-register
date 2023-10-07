<?php
    require_once '../services/validateToken.php';

        function auth (){
            $key = "chave-ultra-secreta";
            $headers = getallheaders();
            if(isset($headers['Authorization'])) {
        
                if (strpos($headers['Authorization'], "Bearer ") === 0) {
                    
                    $token = str_replace('Bearer ', '', $headers['Authorization']);
        
                    $result = validateToken($token, $key);

                    if ($result) {
                        
                        return json_encode(["auth" => true, "message" => "Authenticated", "user" => $result]);
                    } else {
                        http_response_code(401);
                        return json_encode(["auth" => false, "message" => "Invalid token!", "token" => $token, "result" => $result]);
                    }
                }
            }else{
                http_response_code(401);
                return json_encode(["auth" => false, "message" => "Missing token!", "headers" => $headers['Authorization']]);
            }
        }
        auth()
?>