<?php
    session_start();
    $pdo = null;
    require_once("pdoconnect.php");
    $_POST = json_decode(file_get_contents('php://input'), true);
    $id_dov = $_POST['data_dov'];
    $id_but = $_POST['data_but'];
    $id = $_POST['data_id'];
    $data = $_POST['datafields'];
	$datacombo = $_POST['datacombo'];

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
            where d.id = ".$r1[0]['id_ref_dov']." and d.id = dt.id_dov and dt.ref_table = '".$r2[0]['name_table']."'
            order by dt.ord";


    $res = $pdo->query($sql);
    $r3 = $res->fetchAll();
    
//--------------------------------------------------------------------------------------------------------------------------------------    
   $sql = "select distinct name_table_row, ref_type
            from Dov_table
            where id_dov = ".$r1[0]['id_ref_dov']." and name_table = '".$r2[0]['name_table']."'";

    $res = $pdo->query($sql);
    $r4 = $res->fetchAll();
    
//--------------------------------------------------------------------------------------------------------------------------------------    
   

    $sql = " delete from ".$r2[0]['name_table']." where ".$r2[0]['select_id_row']." = ".$id;
    $pdo->exec($sql);
 
    for ($i = 0; $i < count($data); $i++){
	    $str = '';
	    $strval = '';
		
	    for ($k = 0; $k < count($datacombo[$i]); $k++){
			if (strlen($str) > 0) $str .= ', ';   
			if (strlen($strval) > 0) $strval .= ', ';
			$typ = '';
			for ($j = 0; $j < count($r4); $j++){
				if ($r4[$j]['name_table_row'] == $datacombo[$i][$k][0]) {
					$typ = $r4[$j]['ref_type'];
				}
			}
			
			$str .= $datacombo[$i][$k][0];
			if ($typ == 'txt'){
				$strval .= "'".$datacombo[$i][$k][1]."'";
			} else {
				$strval .= $datacombo[$i][$k][1];
			}
		}
		
					
		if (strlen($str) > 0) {
			$sql = "insert into ".$r2[0]['name_table']." (".$r2[0]['select_id_row'].", ".$r3[0]['ref_key'].", ".$str.") values (".$id.", ".$data[$i].", ".$strval.")";
		} else {
			$sql = "insert into ".$r2[0]['name_table']." (".$r2[0]['select_id_row'].", ".$r3[0]['ref_key'].") values (".$id.", ".$data[$i].")";
		}
echo $sql;
			$pdo->exec($sql);
	}
	    
    
?>