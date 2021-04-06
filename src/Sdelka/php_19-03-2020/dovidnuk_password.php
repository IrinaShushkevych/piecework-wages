<?php
    session_start();
    $pdo = null;
    require_once("pdoconnect.php");

    $pass = $_POST['passwordnew'];
    $user = $_POST['userid'];
    
    $sql = " update Users set password='".md5($pass)."' where id=".$user;
    echo $sql;
    $res = $pdo->exec($sql);
?>