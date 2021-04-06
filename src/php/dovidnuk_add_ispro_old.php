<?php
    session_start();
    $pdo = null;
    $pdosys = null;
    $pdowork = null;
    $pdoi = null;
    require_once("pdoconnect.php");
    
    $roles = $_SESSION['userroles']-100;
    $result = array();
    $from = '';
    $base = 0;
    $sql = "select distinct dt.name_table_ispro as name, isprobase
            from Dovidnuku d, Dov_ispro dt
            where d.code_dovid = ".$roles." and d.id = dt.id_dov
            ";
    $res = $pdo->query($sql);
    $r = $res->fetchAll();
    for ($i = 0; $i < count($r); $i++){
        if (strlen($from)>0) $from .=', ';
        $from .= $r[$i]['name'];
        $base = $r[$i]['isprobase'];
    }

    if ($base == 0) {
        $pdoi = $pdowork;
    } else {
        $pdoi = $pdosys;
    }
    
    $select = '';
    $sql = "select distinct dt.name_col_ispro as name, name_table_ispro as namet
            from Dovidnuku d, Dov_ispro dt
            where d.code_dovid = ".$roles." and d.id = dt.id_dov
            ";
    $res = $pdo->query($sql);
    $r = $res->fetchAll();
    for ($i = 0; $i < count($r); $i++){
        if (strlen($select)>0) $select .=', ';
        $select .= $r[$i]['namet'].".".$r[$i]['name'];
    }
    $where = '';
    $sql = "select dt.wheretxt
            from Dovidnuku d, Dov_ispro_where dt
            where d.code_dovid = ".$roles." and d.id = dt.id_dov
            ";
    $res = $pdo->query($sql);
    $r = $res->fetchAll();
    $where = $r[0]['wheretxt'];
    
    $sql = "select dt.name_par, dt.value_par
            from Dovidnuku d, Dov_ispro_param dt
            where d.code_dovid = ".$roles." and d.id = dt.id_dov
            ";
    $res = $pdo->query($sql);
    $r = $res->fetchAll();
    
    $sql = "select ".$select." from ".$from;
    if ($where != '') {
        $sql.=" where ".$where;
    }
    $ressql = $pdoi->prepare($sql);
    for ($i = 0; $i < count($r); $i++){
        eval('$p = '.$r[$i]['value_par']);
        $ressql->bindValue(':'.$r[$i]['name_par'], $p);
    }
    $ressql->execute();
    $result = $ressql->fetchAll();

    $sql = "select distinct dt.name_col, dt.name_col_ispro, dt.osnova, d.name_table, dt.type_col
            from Dovidnuku d, Dov_ispro dt
            where d.code_dovid = ".$roles." and d.id = dt.id_dov
            ";
    $res = $pdo->query($sql);
    $r = $res->fetchAll();
    
    $from = $r[0]['name_table'];
    $where = '';
    $insert = '';
    $val = '';
    for ($i = 0; $i < count($r); $i++){
        if ($r[$i]['osnova']>0) {
            if (strlen($where)>0) $where .= " and ";
            $where .= $r[$i]['name_col']." = :".$r[$i]['name_col_ispro'];
            if (strlen($insert) == 0){ 
                $insert = 'insert into '.$r[0]['name_table'].' ('.$r[$i]['name_col'];
            } else { 
                $insert .= ', '.$r[$i]['name_col'];
            };
            if (strlen($val) == 0) {
                $val = 'values ( '.':'.$r[$i]['name_col_ispro'];
            }else{
                $val .= ', :'.$r[$i]['name_col_ispro'];
            };
        }
    }
    $insert .= ' )'; 
    $val .= ' )'; 
    $sqlselect = 'select id from '.$from.' where '.$where;
    $sqlinsert = $insert.' '.$val;
    
    $sel = $pdo->prepare($sqlselect);
    $ins = $pdo->prepare($sqlinsert);
    for ($j = 0; $j < count($result); $j++){
//        $sel->bindValue(':'.$)
        for ($i = 0; $i < count($r); $i++){
            if ($r[$i]['osnova']>0) { 
                $sel->bindValue(':'.$r[$i]['name_col_ispro'], $result[$j][$r[$i]['name_col_ispro']]);
            }
        }
        $sel->execute();
        $ressel = $sel->fetchAll();
        if (count($ressel) == 0) {
            for ($i = 0; $i < count($r); $i++){
                if ($r[$i]['osnova']>0) {
                    $ins->bindValue(':'.$r[$i]['name_col_ispro'], $result[$j][$r[$i]['name_col_ispro']]);
                }
            }
            $ins->execute();
        }
    }
    
//echo json_encode($result);    
?>