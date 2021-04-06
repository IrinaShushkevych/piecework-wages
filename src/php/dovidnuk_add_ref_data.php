<?php
    session_start();
    $pdo = null;
    require_once("pdoconnect.php");
    $_POST = json_decode(file_get_contents('php://input'), true);
    $id_dov = $_POST['data_dov'];
    $id_but = $_POST['data_but'];
    $id = $_POST['data_id'];
    $data = $_POST['datafields'];

//--------------------------------------------------------------------------------------------------------------------------------------    
    $sql = "select d.select_id_row, d.name_table, db.id_ref_dov
            from Dovidnuku d, Dov_button db, Buttons b
            where d.code_dovid = ".$id_dov." and b.id_button = '".$id_but."' and d.id = db.id_dov and db.id_button = b.id
             ";

    $res = $pdo->query($sql);
    $r1 = $res->fetchAll();
   
//--------------------------------------------------------------------------------------------------------------------------------------    
    $sql = "select d.name_table, d.select_id_row
            from Dovidnuku d
            where d.id = ".$r1[0]['id_ref_dov'];
 
    $res = $pdo->query($sql);
    $r2 = $res->fetchAll();
    
//--------------------------------------------------------------------------------------------------------------------------------------    
   $sql = "select distinct dt.name_table, dt.ref_table, dt.ref_key, dt.ref_row, dt.ord
            from Dovidnuku d, Dov_table dt
            where d.id = ".$r1[0]['id_ref_dov']." and d.id = dt.id_dov 
            order by dt.ord";


    $res = $pdo->query($sql);
    $r3 = $res->fetchAll();
    
//--------------------------------------------------------------------------------------------------------------------------------------    
 
    $sql = " delete from ".$r2[0]['name_table']." where ".$r2[0]['select_id_row']." = ".$id;
    $pdo->exec($sql);
 
    for ($i = 0; $i < count($data); $i++){
        $sql = "insert into ".$r2[0]['name_table']." (".$r2[0]['select_id_row'].", ".$r3[0]['ref_key'].") values (".$id.", ".$data[$i].")";
        $pdo->exec($sql);
    }
?>