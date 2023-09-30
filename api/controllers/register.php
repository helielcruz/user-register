<?php

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        $dataJson = file_get_contents('php://input');

        $data = json_decode($dataJson, true);

        $verifyData = isset($data)? json_encode(["message" => "Dados recebidos com sucesso", "data" => $data]) : json_encode(["error" => "Erro ao decodificar o JSON"]);
        echo $verifyData;
    }

?>