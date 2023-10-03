<?php

    function DecodeBase64Url($base64Url) {
        $base64 = str_replace(['-', '_'], ['+', '/'], $base64Url);
        return base64_decode($base64);
    }

    function validateToken($token, $key) {

        $tokenSliced = explode('.', $token);

        if (count($tokenSliced) !== 3) {
            return false;
        }

        $header = json_decode(DecodeBase64Url($tokenSliced[0]), true);
        $payload = json_decode(DecodeBase64Url($tokenSliced[1]), true);

        if (!$header || !$payload) {
            return false;
        }

        if ($header['typ'] !== 'JWT' || $header['alg'] !== 'HS256') {
            return false;
        }

        $signature = hash_hmac('sha256', "$tokenSliced[0].$tokenSliced[1]", $key, true);
        $SignatureBase64Url = DecodeBase64Url($signature);

        if ($SignatureBase64Url !== $tokenSliced[2]) {
            return false;
        }

        if (isset($payload['exp']) && $payload['exp'] < time()) {
            return false;
        }

        return $payload;
    }

?>
