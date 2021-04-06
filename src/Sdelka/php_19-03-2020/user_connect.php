<?php
    session_start();
    global $pdo;
    require_once 'pdoconnect.php';
    
//    $sql = "select id, login, password, name_user from users where login='1'";
//    $sql = "select id, login, password, name_user from users where login='".$_POST['userlogin']."'";
    $sql = "select id, login, password, name_user from users where login='".$_GET['userlogin']."'";
        $res = $pdo->query($sql);
        $r = $res->fetchAll();
        $result = [];
        if (count($r) == 0) {
            $result['resultCode'] = 1;
            $result['value'] = "Користувач ".$_GET['userlogin']." не зареєстрований в системі";
           // echo "Користувач ".$_POST['userlogin']." не зареєстрований в системі";
        } else {
//            if (md5('1') != $r[0]['password']){
//            if (md5($_POST['userpassword']) != $r[0]['password']){
            if (md5($_GET['userpassword']) != $r[0]['password']){
                $result['resultCode'] = 1;
                $result['value'] = "Невірно вказаний пароль";
               // echo  "Невірно вказаний пароль";
            } else {
                $result['resultCode'] = 0;
                $result['value'] = $r;
                //echo json_encode($r);
            }
        }
        echo json_encode($result);
 ?>