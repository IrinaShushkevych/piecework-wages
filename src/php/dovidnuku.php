<?php
    session_start();
    global $pdo;
    require_once 'pdoconnect.php';
    $sql = "select ua.id_access from User_access ua, Users u where u.id = ua.id_user and u.id = '".$_GET['userid']."'";
    $res = $pdo->query($sql);
    $r = $res->fetchAll();
    $access = '';
    for ($i = 0; $i < count($r); $i++){
        $access .= $r[$i]['id_access'];
    }
    
    $sql = "select name_dovid, code_dovid from Dovidnuku where first_show = 1 and (accesses like '%".$access."%' or accesses is null or accesses = '') order by ord";
    $res = $pdo->query($sql);
    $r = $res->fetchAll();
    
    echo json_encode($r);
?>