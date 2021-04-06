<?php
    session_start();
    $pdo = null;
    require_once("pdoconnect.php");
    
    $roles = $_GET['dovid'];
    $but = $_GET['butid'];

    if (isset($but) && $but <> '') {
	$sql = "select d1.code_dovid, d1.name_table 
            from Dovidnuku d, Dov_button db, Buttons b, Dovidnuku d1
            where d.code_dovid = ".$roles." and b.id_button = '".$but."' and d.id = db.id_dov and db.id_button = b.id 
		and db.id_ref_dov=d1.id
             ";
	$res = $pdo->query($sql);
    	$r1 = $res->fetchAll();
	$roles = $r1[0]['code_dovid'];
    }

//print_r($r1);

    $result = array();
    $sql = "select dt.name_col, dt.name_table, dt.type_col, dt.name_table_row, dt.ref_table, dt.ref_key, dt.ref_row, dt.setorder
            from Dovidnuku d, Dov_table dt
            where d.code_dovid = ".$roles." and d.id = dt.id_dov
            order by dt.ord
            ";
    $res = $pdo->query($sql);
    $r = $res->fetchAll();
    
    for ($i = 0; $i < count($r); $i++){
        $result[$i]['name_col'] = $r[$i]['name_col']; 
        $result[$i]['name_table'] = $r[$i]['name_table_row'];
        $result[$i]['type_col'] = $r[$i]['type_col']; 
        if ($r[$i]['name_table'] == $r1[0]['name_table']){
            $result[$i]['ins'] = 1;
        } else {
            $result[$i]['ins'] = 0;
        }
    }        
    
 //   print_r($result);
    echo json_encode($result);
?>