<?php

    function EncodeBase64Url($element) {
        return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($element));
    }

    function tokenGenerate($userId, $expireIn = 3600) {
    
        $key = "chave-ultra-secreta";

        $header = [
            'typ' => 'JWT',
            'alg' => 'HS256'
        ];

        $HeaderBase64Url = EncodeBase64Url(json_encode($header));

        $payload = [
            'id' => $userId,
            'iat' => time(),
            'exp' => time() + $expireIn
        ];

        $Payloadbase64Url = EncodeBase64Url(json_encode($payload));

        $signature = hash_hmac('sha256', "$HeaderBase64Url.$Payloadbase64Url", $key, true);

        $SignatureBase64Url = EncodeBase64Url($signature);

        $jwt = "$HeaderBase64Url.$Payloadbase64Url.$SignatureBase64Url";

        return $jwt;
    }

?>
