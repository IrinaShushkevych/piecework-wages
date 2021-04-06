<?php
    session_start();
    $pdo = null;
    require_once("pdoconnect.php");
    
    //$roles = $_SESSION['userroles']-100;
//    $id_dov = $_POST['data_dov'];
//    $id_but = $_POST['data_but'];
//    $id = $_POST['data_id'];
    $id_dov = $_GET['data_dov'];
    $id_but = $_GET['data_but'];
    $id = $_GET['data_id'];
    $select = "";
    $from = "";
    $where = "";
    $select_union = "";
    $from_union = "";
    $where_union = "";
    $order = "";
    //$result = array();
//--------------------------------------------------------------------------------------------------------------------------------------    
    $sql = "select d.select_id_row, d.name_table, db.id_ref_dov
            from Dovidnuku d, Dov_button db, Buttons b
            where d.code_dovid = ".$id_dov." and b.id_button = '".$id_but."' and d.id = db.id_dov and db.id_button = b.id
             ";
echo $sql;
             
    $res = $pdo->query($sql);
    $r1 = $res->fetchAll();
    
print_r ($r1);

    if (strlen($from_union) > 0) {
        if (stripos($from_union, $r1[0]['name_table'],0) === false){
            $from_union .= ", ".$r1[0]['name_table'];
        }
    } else {
        $from_union .= $r1[0]['name_table'];
    }
    if (strlen($where_union) > 0) {
        $where_union .= " and ";
    } 
    $where_union .= $r1[0]['name_table'].".".$r1[0]['select_id_row']." = ".$id;

//--------------------------------------------------------------------------------------------------------------------------------------    
    $sql = "select d.name_table, d.select_id_row
            from Dovidnuku d
            where d.id = ".$r1[0]['id_ref_dov'];
 
    $res = $pdo->query($sql);
    $r2 = $res->fetchAll();

echo $sql;
        
print_r ($r2);

    if (strlen($from_union) > 0) {
        if (stripos($from_union, $r2[0]['name_table'],0) === false){
            $from_union .= ", ".$r2[0]['name_table'];
        }
    } else {
        $from_union .= $r2[0]['name_table'];
    }
    if (strlen($where_union) > 0) {
        $where_union .= " and ";
    } 
    $where_union .= $r1[0]['name_table'].".".$r1[0]['select_id_row']." = ".$r2[0]['name_table'].".".$r2[0]['select_id_row'];
    
//--------------------------------------------------------------------------------------------------------------------------------------    
   $sql = "select distinct dt.name_table, dt.ref_table, dt.ref_key, dt.ref_row, dt.ord
            from Dovidnuku d, Dov_table dt
            where d.id = ".$r1[0]['id_ref_dov']." and d.id = dt.id_dov 
            order by dt.ord";


    $res = $pdo->query($sql);
    $r3 = $res->fetchAll();

echo $sql;
   
print_r ($r3);

    $str = $r3[0]['name_table'].".".$r3[0]['ref_row'];
    if (strlen($select_union) > 0) {
        if (stripos($select_union, $str,0) === false){
            $select_union .= ", ".$str;
        }
    } else {
        $select_union .= $str;
    }
    if (strlen($from_union) > 0) {
        if (stripos($from_union, $r3[0]['name_table'],0) === false){
            $from_union .= ", ".$r3[0]['name_table'];
        }
    } else {
        $from_union .= $r3[0]['name_table'];
    }
    $str = $r3[0]['ref_table'].".".$r3[0]['ref_key']." = ".$r3[0]['name_table'].".".$r3[0]['ref_row'];

    if (strlen($where_union) > 0) {
        $where_union .= " and ";
    } 
    if (stripos($where_union, $str,0) === false){
        $where_union .= $str;    
    } 
    
//--------------------------------------------------------------------------------------------------------------------------------------    
   $sql = "select dt.name_table, dt.name_table_row, dt.ord
            from Dovidnuku d, Dov_table dt
            where d.id = ".$r1[0]['id_ref_dov']." and d.id = dt.id_dov 
            order by dt.ord";
    $res = $pdo->query($sql);
    $r4 = $res->fetchAll();
    
echo $sql;

print_r ($r4);

    for ($i = 0; $i < count($r4); $i++){
        $str = $r4[$i]['name_table'].".".$r4[$i]['name_table_row'];
        if (strlen($select) > 0) {
            if (stripos($select, $str,0) === false){
                $select .= ", ".$str;
            }
        } else {
            $select .= $str;
        }
        if ($r4[$i]['ord'] > 0) {
            if (strlen($order) > 0){
                if (stripos($order, $r4[$i]['name_table_row'], 0) === false){
                    $order .= ", ".$r4[$i]['name_table_row'];
                }
            } else {
                $order .= $r4[$i]['name_table_row'] ;
            }
        }
        if (strlen($from) > 0) {
            if (stripos($from, $r4[$i]['name_table'],0) === false){
                $from .= ", ".$r4[$i]['name_table'];
            }
        } else {
            $from .= $r4[$i]['name_table'];
        }
        
    }
    
//--------------------------------------------------------------------------------------------------------------------------------------    
    $sql_union = "select ".$select_union." from ".$from_union." where ".$where_union;
    
    $sql = "select * from (select 1 as checkes, ".$select." from ".$from." where ".$r3[0]['ref_row']." in (".$sql_union.") union select 0 as checkes, ".$select." from ".$from." where ".$r3[0]['ref_row']." not in (".$sql_union.") ) b order by ".$order;

echo $sql;
    
    $res = $pdo->query($sql);
    $result = $res->fetchAll();

print_r( $result);    
    echo json_encode($result);
?>