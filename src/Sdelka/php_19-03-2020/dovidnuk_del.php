<?php
    session_start();
    $pdo = null;
    require_once("pdoconnect.php");
    $roles = $_GET['dovid'];//$_SESSION['userroles']-100;
    $id = $_GET['id'];
    $sql = "select dt.name_col, dt.name_table, dt.name_table_row, dt.ref_table, dt.ref_key, dt.ref_row, dt.setorder, dt.type_col
            from Dovidnuku d, Dov_table dt
            where d.code_dovid = ".$roles." and d.id = dt.id_dov
            order by dt.ord
            ";
    $res = $pdo->query($sql);
    $r = $res->fetchAll();
    
    $sql = 'delete from '.$r[0]['name_table']." where id = $id";
    $res = $pdo->exec($sql);
?>