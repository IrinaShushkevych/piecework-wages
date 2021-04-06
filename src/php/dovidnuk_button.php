<?php
    session_start();
    $pdo = null;
    require_once("pdoconnect.php");
    
    $roles = $_GET['dovid'];
    $result = array();
    $sql = "select b.name_button, b.in_row, b.id_button, d.id as id_dovidnuk
            from Dovidnuku d, Dov_button db, Buttons b
            where d.code_dovid = ".$roles." and d.id = db.id_dov and db.id_button = b.id
            ";
    $res = $pdo->query($sql);
    $r = $res->fetchAll();
    
    echo json_encode($r);
?>