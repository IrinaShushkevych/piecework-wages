<?php
    session_start();
    $pdo = null;
    require_once("pdoconnect.php");
    
    $id_dov = $_GET['data_dov'];
    $id_but = $_GET['data_but'];
    $id = $_GET['data_id'];

    $select = "";
    $select1 = "";
    $from = "";
    $from1 = "";
    $where = "";
    $where1 = "";
    $select_union = "";
    $from_union = "";
    $where_union1 = "";
    $where_union = "";
    $order = "";
//--1------------------------------------------------------------------------------------------------------------------------------------    
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
    if (strlen($where_union1) > 0) {
        $where_union1 .= " and ";
    } 
    $where_union1 .= $r1[0]['name_table'].".".$r1[0]['select_id_row']." = ".$id;

//--2------------------------------------------------------------------------------------------------------------------------------------    
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
    
//--3------------------------------------------------------------------------------------------------------------------------------------    
   $sql = "select distinct dt.type_col, dt.name_table_row, dt.name_table, dt.ref_table, dt.ref_key, dt.ref_row, dt.ord
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

    for ($i = 0; $i < count($r3); $i++){
//select 
        if ($r3[$i]['ref_table'] == null || $r3[$i]['ref_table'] == $r2[0]['name_table']){ 
            $str = $r3[$i]['name_table'].".".$r3[$i]['name_table_row'];
            if ($r3[$i]['name_table'] != $r2[0]['name_table']){
                $str1 = $r3[$i]['name_table'].".".$r3[$i]['name_table_row'];
            } else {
                if ( $r3[$i]['type_col'] == 'txt' || $r3[$i]['type_col'] == 'int') $str1 = 'null';
                if ( $r3[$i]['type_col'] == 'log' ) $str1 = '0';
            }
        } else { 
            $str = $r3[$i]['ref_table'].".".$r3[$i]['ref_row'];
            if ($r3[$i]['name_table'] != $r2[0]['name_table']){
                $str1 = $r3[$i]['ref_table'].".".$r3[$i]['ref_row'];
            } else {
                if ( $r3[$i]['type_col'] == 'txt' || $r3[$i]['type_col'] == 'int') $str1 = 'null';
                if ( $r3[$i]['type_col'] == 'log' ) $str1 = ')';
            }
        }
        
        if (strlen($select) > 0 ) {
            if (stripos($select, $str,0) === false){
                $select .= ", ".$str;
            }
        } else {
            $select .= $str;
        }
        if (strlen($select1) > 0 ) {
            if (stripos($select1, $str1,0) === false || $str1 == 'null' || $str1 == '0'){
                $select1 .= ", ".$str1;
            }
        } else {
            $select1 .= $str1;
        }
//order        
        if ($r3[$i]['ord'] > 0) {
            if ($r3[$i]['ref_table'] == null || $r3[$i]['ref_table'] == $r2[0]['name_table']){ 
                if (strlen($order) > 0){
                    if (stripos($order, $r3[$i]['name_table_row'], 0) === false){
                        $order .= ", ".$r3[$i]['name_table_row'];
                    }
                } else {
                    $order .= $r3[$i]['name_table_row'] ;
                }
            }else {
                if (strlen($order) > 0){
                    if (stripos($order, $r3[$i]['ref_row'], 0) === false){
                        $order .= ", ".$r3[$i]['ref_row'];
                    }
                } else {
                    $order .= $r3[$i]['ref_row'] ;
                }
            }
        }
//from        
        if (strlen($from) > 0) {
            if (stripos($from, $r3[$i]['name_table'],0) === false){
                $from .= ", ".$r3[$i]['name_table'];
            }
        } else {
            $from .= $r3[$i]['name_table'];
        }
        if ($r3[$i]['ref_table'] != null){
            if (strlen($from) > 0) {
                if (stripos($from, $r3[$i]['ref_table'],0) === false){
                    $from .= ", ".$r3[$i]['ref_table'];
                }
            } else {
                $from .= $r3[$i]['ref_table'];
            }
        }
        
        if ($r3[$i]['name_table'] != $r2[0]['name_table']){
           
            if (strlen($from1) > 0) {
                if (stripos($from1, $r3[$i]['name_table'],0) === false){
                    $from1 .= ", ".$r3[$i]['name_table'];
                }
            } else {
                $from1 .= $r3[$i]['name_table'];
            }
            if ($r3[$i]['ref_table'] != null && $r3[$i]['ref_table'] != $r2[0]['name_table']){
                if (strlen($from1) > 0) {
                    if (stripos($from1, $r3[$i]['ref_table'],0) === false){
                        $from1 .= ", ".$r3[$i]['ref_table'];
                    }
                } else {
                    $from1 .= $r3[$i]['ref_table'];
                }
            }
        }
        
     
        
        
//where   
        if ($r3[$i]['ref_table'] != null ){
            $str = $r3[$i]['name_table'].".".$r3[$i]['name_table_row']." = ".$r3[$i]['ref_table'].".".$r3[$i]['ref_key'];
                if (strlen($where) > 0) {
                    if (stripos($where, $str, 0) === false){
                        $where .= " and ".$str;
                    }
                } else {
                    $where .= $str;
                }
        }
        
        if ($r3[$i]['ref_table'] != null && $r3[$i]['name_table'] != $r2[0]['name_table'] && $r3[$i]['ref_table'] != $r2[0]['name_table']){
            $str = $r3[$i]['name_table'].".".$r3[$i]['name_table_row']." = ".$r3[$i]['ref_table'].".".$r3[$i]['ref_key'];
                if (strlen($where1) > 0) {
                    if (stripos($where1, $str, 0) === false){
                        $where1 .= " and ".$str;
                    }
                } else {
                    $where1 .= $str;
                }
        }
    }
   
//--5------------------------------------------------------------------------------------------------------------------------------------    
    $sql_union = "select ".$select_union." from ".$from_union;
    $sql_union1 = "select ".$select_union." from ".$from_union;
    if ( strlen($where_union1) > 0 ) {
        $sql_union1 .= " where ".$where_union1;
        if ( strlen($where_union) > 0 ){
            $sql_union .= " where ".$where_union;
            $sql_union1 .= " and ".$where_union;
        }
    } else {
        $sql_union .= " where ".$where_union;
        $sql_union1 .= " where ".$where_union;
    }
    
    $sql = "select * from (select 1 as checkes, ".$select." from ".$from." where ".$r3[0]['name_table'].".".$r3[0]['name_table_row']." in (".$sql_union1.")";
    if (strlen($where) > 0) $sql .= " and ".$where;
    $sql .= " union select 0 as checkes, ".$select1." from ".$from1." where ".$r3[0]['name_table'].".".$r3[0]['name_table_row']." not in (".$sql_union.")";
    if (strlen($where1) > 0) $sql .= " and ".$where1;
    $sql .= " ) b order by ".$order;

echo $sql;
    
    $res = $pdo->query($sql);
    $result = $res->fetchAll();

print_r( $result);    
    echo json_encode($result);
?>