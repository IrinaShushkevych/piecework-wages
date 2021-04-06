<?php
    session_start();
    global $pdo;
    require_once 'pdoconnect.php';
    
    $sql = "select r.coder as code_dov, r.namer as name_dovid, r.component as component from user_role ur, Roles r, Users u where u.id = :userid and u.id = ur.id_user and r.id = ur.id_role ";
    $user_name = $pdo->prepare($sql);
    $user_name->bindValue(":userid",$_GET['userid']);
    $user_name->execute();
    $r = $user_name->fetchAll();

    echo json_encode($r);
 ?>