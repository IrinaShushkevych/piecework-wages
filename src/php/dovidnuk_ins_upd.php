<?php
    session_start();
    $pdo = null;
    require_once("pdoconnect.php");
    $_POST = json_decode(file_get_contents('php://input'), true);
    $roles = $_POST['userroles'];
    $data = ($_POST['datafields']);
    $id = $_POST['id'];
    
    
    print_r($data);
    
    
    $sql = "select dt.name_col, dt.name_table, dt.name_table_row, dt.ref_table, dt.ref_key, dt.ref_row, dt.setorder, dt.type_col
            from Dovidnuku d, Dov_table dt
            where d.code_dovid = ".$roles." and d.id = dt.id_dov
            order by dt.ord
            ";
    $res = $pdo->query($sql);
    $r = $res->fetchAll();
    $select = '';
    $from = $r[0]['name_table'];
    $where = '';
    if ($id > 0) {
        $select = 'update ';
        $where = ' set ';
        $j=0;
        for ($i = 0; $i < count($data); $i++){
            if ($j > 0) $where .= ", ";
            for ($k = 0; $k < count($r); $k++){
                if ($r[$k]['name_table_row'] == $data[$i][0]){
                    if ($r[$k]['type_col'] == 'txt' || $r[$k]['type_col'] == 'dat') {
                        $where .= $data[$i][0].' = "'.$data[$i][2].'"';
                    } else {   
                        $where .= $data[$i][0]." = ".$data[$i][2]; 
                    }
                    $j++;

                    }
            }
        }
        $where .= " where id = $id";
        $sql = $select.$from.$where;
    } else {
        $select = 'insert into ';
        $where = ' ( ';
        $j=0;
        $where1 = ' values( ';
        for ($i = 0; $i < count($data); $i++){
            if ($j > 0){
                $where .= ", ";
                $where1 .= ", ";
            }                
//            for ($k = 0; $k < count($r); $k++){
//                if ($r[$k]['name_table_row'] == $data[$i][0]){
//                        $where .= $data[$i][0];
//                    if ($r[$k]['type_col'] == 'txt' || $r[$k]['type_col'] == 'dat') {
//                        $where1 .= ' "'.$data[$i][2].'"';
//                    } else {   
//                        $where1 .= $data[$i][2]; 
//                    }
 //                   $j++;
  //              }
            $where .= $data[$i][0];
            if ($data[$i][3] == 'txt' || $data[$i][3] == 'dat') {
                $where1 .= ' "'.$data[$i][2].'"';
            } else {   
                $where1 .= $data[$i][2]; 
            }
            $j++;
//           }
            
        }
        $where .=")";
        $where1 .=")";
        $sql = $select.$from.$where.$where1;
    }
    echo $sql;
    $res = $pdo->exec($sql);
?>