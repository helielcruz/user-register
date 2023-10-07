<?php
    require_once '../midlewares/auth.php';
    require_once '../db/database.php';

    $auth = json_decode(auth());

    if ($auth) {
        $user = getUser($auth->user->data->email);
        echo json_encode($user);
    } else{
        http_response_code(401);
        echo json_encode(["message" => "Invalid token!"]);
    }
?>