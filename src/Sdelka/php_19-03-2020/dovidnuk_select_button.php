<?php
    session_start();
    $pdo = null;
    require_once("pdoconnect.php");

    $id_dov = $_GET['id_dov'];
    $id_but = $_GET['id_but'];

    if ($id_but == 'AddParoll') {
	$sql = 'select php_file_result from buttons where id_button = "'.$id_but.'"';
        $res = $pdo->query($sql);
        $r = $res->fetchAll();
        echo json_encode(['0' => 0, 'text' => 'Встановлення паролю', textresult => $r[0]['php_file_result'], 'typedata' => 'insert', 'fields' => ['password1' => 'Введіть пароль', 'password2' => 'Підтвердіть пароль'], 'fieldsdata' => ['password1' => '', 'password2' => ''] ]);
    } else
    if ($id_but == 'ExitButton') {
        echo json_encode(['0' => 1, 'text' => 'exit', 'typedata' => 'exit']);
    } else {
        $sql = 'select php_file, php_file_result from buttons where id_button = "'.$id_but.'"';
        $res = $pdo->query($sql);
        $r = $res->fetchAll();
        echo json_encode(['0' => 2, 'text' => $r[0]['php_file'], textresult => $r[0]['php_file_result'], 'typedata' => 'table']);
    }
?>