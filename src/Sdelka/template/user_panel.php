<?php
    session_start();
    global $pdo;
    if (!isset($_SESSION['userlogin'])) {
        $str = "<form method='post'>
                    <label>Логін <input type='text' class='sdelkatext' name='login' required></label>
                    <label>Пароль <input type='text' class='sdelkatext' name='password' required></label>
                    <input type='submit' class='sdelkabutton' name='entered' value='Вхід'>
                </form>";
    } else {
        $str = "<form method='post'>
                    <label>Доброго дня, ".$_SESSION['username']."</label>
                    <input type='submit' class='sdelkabutton' name='logout' value='Вихід'>
                </form>";
        $sql = "select r.coder, r.namer from user_role ur, Roles r, Users u where u.login = :login and u.id = ur.id_user and r.id = ur.id_role ";
        $user_name = $pdo->prepare($sql);
        $user_name->bindValue(":login",$_SESSION['userlogin']);
        $user_name->execute();
        $r = $user_name->fetchAll();

        if (count($r)>0){
            $str ="<div class='wraper'><div class='navdiv'><div class='ribbon'>";  
            if (count($r)>1)
            for ($i = 0; $i < count($r); $i++){
                $str .= "<a href='#' name = 'button".$r[$i]['coder']."'  id = 'button".$r[$i]['coder']."'><span>".$r[$i]['namer']."</span></a>";
            }
            $str .="<a href='/?option=logout' id = 'exitsite'><span>Вихід</a></span></div></div></div>";  
        }
    }
    
    if (isset($_POST['entered'])){
        $sql = "select login, password, name_user from users where login='".$_POST['login']."'";
        $res = $pdo->query($sql);
        $r = $res->fetchAll();
        if (count($r) == 0) {
            $str .= "Користувач ".$_POST['login']." не зареєстрований в системі";
        } else {

            if (md5($_POST['password']) != $r[0]['password']){
                $str .= "Невірно вказаний пароль";
            } else {
                $_SESSION['userlogin'] = $r[0]['login'];
                $_SESSION['username'] = $r[0]['name_user'];
/*                $str = "<form method='post'>
                    <label>Доброго дня, ".$_SESSION['username']."</label>
                    <input type='submit' class='sdelkabutton' name='logout' value='Вихід'>
                </form>";
*/                $str = "<meta http-equiv='Refresh' content='0; URL =/?option=users'>";
            }
        }
    }        
    if (isset($_GET['option']) &&  $_GET['option']== 'logout'){

        session_unset();
        session_destroy();
        $str = "<meta http-equiv='Refresh' content='0; URL = /'>";        
    }        
    echo $str;
?>