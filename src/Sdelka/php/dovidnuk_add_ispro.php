<?php
    session_start();
    $pdo = null;
    $pdosys = null;
    $pdowork = null;
    $pdoi = null;
    require_once("pdoconnect.php");
    
    $roles = $_GET['dovid'];//$roles = $_SESSION['userroles']-100;
    $result = array();
    $from = '';
    $base = 0;
    $numb = 0;
    $namet = '';
    $tables = '';
    $id = $_GET['id'];//'03.08.';//$_POST['id'];
    $data = $_GET['data'];
    $ispro_rcd = 0;
    $numb_table = array();
    
 // Вибір таблиць і баз з яких треба перекачати інформацію
    $sql = "select distinct dt.name_table_ispro as name, dt.isprobase, dt.numb, dt.table_name as namet
            from Dovidnuku d, Dov_ispro dt
            where d.code_dovid = ".$roles." and d.id = dt.id_dov
            ";
    $res = $pdo->query($sql);
    $r = $res->fetchAll();

    for ($i = 0; $i < count($r); $i++){
        if ($r[$i]['numb'] == 0) {
            $from .= $r[$i]['name'];
            $base = $r[$i]['isprobase'];
            $namet = $r[$i]['namet'];
        } else {
            $j = count($numb_table);
            $numb_table[$j]['name'] .= $r[$i]['name'];
            $numb_table[$j]['isprobase'] = $r[$i]['isprobase'];
            $numb_table[$j]['numb'] = $r[$i]['numb'];
            $numb_table[$j]['namet'] = $r[$i]['namet'];
        }
    }

    if ($base == 0) {
        $pdoi = $pdowork;
    } else {
        $pdoi = $pdosys;
    }
    
//    Список полей которые необходимо вытянуть из ИСПРО    
    $select = '';
    $sql = "select distinct dt.name_col_ispro as name, name_table_ispro as namet
            from Dovidnuku d, Dov_ispro dt
            where d.code_dovid = ".$roles." and d.id = dt.id_dov and dt.numb = ".$numb;
    $res = $pdo->query($sql);
    $r = $res->fetchAll();
    for ($i = 0; $i < count($r); $i++){
        if (strlen($select)>0) $select .=', ';
        $select .= $r[$i]['namet'].".".$r[$i]['name'];
    }
    
// Условие вібора записей из ИСПРО        
        $where = '';
        $sql = "select dt.wheretxt, dt.table_from
                from Dovidnuku d, Dov_ispro_where dt
                where d.code_dovid = ".$roles." and d.id = dt.id_dov and dt.numb = ".$numb;
        $res = $pdo->query($sql);
        $r = $res->fetchAll();
        $where = $r[0]['wheretxt'];
        $tables = $r[0]['table_from'];
 
// Параметри запроса 
        $sql = "select dt.name_par, dt.value_par, dt.value_par_field
                from Dovidnuku d, Dov_ispro_param dt
                where d.code_dovid = ".$roles." and d.id = dt.id_dov and dt.numb = ".$numb;
        $res = $pdo->query($sql);
        $r = $res->fetchAll();
        $sql = "select ".$select." from ".$from;
        if ($tables != '') $sql .= ", ".$tables;
        if ($where != '') {
            $sql.=" where ".$where;
        }
        $ressql = $pdoi->prepare($sql);
        for ($i = 0; $i < count($r); $i++){
            if ($r[$i]['value_par']!= '' && $r[$i]['value_par'] != null) eval('$p = '.$r[$i]['value_par']);
            if ($r[$i]['value_par_field']!= '' && $r[$i]['value_par_field'] != null) {
                if ($r[$i]['value_par_field']!= 'ispro_rcd') {
                    $p = $id;//$_POST[$r[$i]['value_par_field']];
                } else {
                    $p = $ispro_rcd;
                }
            };
            $ressql->bindValue(':'.$r[$i]['name_par'], $p);
        }
        $ressql->execute();
        $result = $ressql->fetchAll();
        
        $sql = "select distinct dt.name_col, dt.name_col_ispro, dt.osnova, d.name_table, dt.type_col, dt.table_name, dt.ins_upd
                from Dovidnuku d, Dov_ispro dt
                where d.code_dovid = ".$roles." and d.id = dt.id_dov  and dt.numb = ".$numb;
        $res = $pdo->query($sql);
        $r = $res->fetchAll();
        $from = $r[0]['table_name'];
        $where = '';
        $insert = '';
        $update = '';
        $val = '';
        $ispro_rcd_name = '';
        for ($i = 0; $i < count($r); $i++){
            if ($r[$i]['osnova']>0) {
                if (strlen($where)>0) $where .= " and ";
                $where .= $r[$i]['name_col']." = :".$r[$i]['name_col_ispro'];
            }
            if (strlen($insert) == 0){ 
                $insert = 'insert into '.$r[0]['table_name'].' ('.$r[$i]['name_col'];
            } else { 
                $insert .= ', '.$r[$i]['name_col'];
            };
            if (strlen($val) == 0) {
                $val = 'values ( '.':'.$r[$i]['name_col_ispro'];
                if ($r[$i]['name_col'] == 'ispro_rcd') $ispro_rcd_name = $r[$i]['name_col_ispro'];
            }else{
                $val .= ', :'.$r[$i]['name_col_ispro'];
                if ($r[$i]['name_col'] == 'ispro_rcd') $ispro_rcd_name = $r[$i]['name_col_ispro'];
            };
            if ($r[$i]['osnova']==0) {
                if (strlen($update) == 0) {
                    $update = 'update '.$r[0]['table_name'].' set '.$r[$i]['name_col']." = :".$r[$i]['name_col_ispro'];
                    if ($r[$i]['name_col'] == 'ispro_rcd') $ispro_rcd_name = $r[$i]['name_col_ispro'];
                }else{
                    $update .= ', '.$r[$i]['name_col']." = :".$r[$i]['name_col_ispro'];
                    if ($r[$i]['name_col'] == 'ispro_rcd') $ispro_rcd_name = $r[$i]['name_col_ispro'];
                }
            }
        }
        
        $insert .= ' )'; 
        $val .= ' )'; 
        $sqlselect = 'select id from '.$from.' where '.$where;
        $sqlinsert = $insert.' '.$val;
        $sqlupdate = $update.' where '.$where;
        
        $sel = $pdo->prepare($sqlselect);
        $ins = $pdo->prepare($sqlinsert);
        $upd = $pdo->prepare($sqlupdate);
        for ($j = 0; $j < count($result); $j++){
            $ispro_rcd = 0;
            for ($i = 0; $i < count($r); $i++){
                if ($r[$i]['osnova']>0) { 
                    $sel->bindValue(':'.$r[$i]['name_col_ispro'], $result[$j][$r[$i]['name_col_ispro']]);
                }
            }
            $sel->execute();
            $ressel = $sel->fetchAll();
            if (count($ressel) == 0) {
                for ($i = 0; $i < count($r); $i++){
                    $ins->bindValue(':'.$r[$i]['name_col_ispro'], $result[$j][$r[$i]['name_col_ispro']]);
                    if ($r[$i]['name_col_ispro'] == $ispro_rcd_name) $ispro_rcd = $result[$j][$r[$i]['name_col_ispro']];
                }
                $ins->execute();
            } else {
                for ($i = 0; $i < count($r); $i++){
                    $upd->bindValue(':'.$r[$i]['name_col_ispro'], $result[$j][$r[$i]['name_col_ispro']]);
                    if ($r[$i]['name_col_ispro'] == $ispro_rcd_name) $ispro_rcd = $result[$j][$r[$i]['name_col_ispro']];
                }
                $upd->execute();
            }
            
//  Перенесення додаткових даних            
            for ($num = 0; $num < count($numb_table); $num++){
//-------------------------------------------------------------------------------
                if ($numb_table[$num]['isprobase'] == 0) {
                    $pdoinumb = $pdowork;
                } else {
                    $pdoinumb = $pdosys;
                }
    
//    Список Связей    
                $num_key = array();
                $sql = "select distinct dt.key_table, dt.key_field
                        from Dovidnuku d, Dov_ispro dt
                        where d.code_dovid = ".$roles." and d.id = dt.id_dov and dt.numb = ".$numb_table[$num]['numb'];
                $num_res = $pdo->query($sql);
                $num_r = $num_res->fetchAll();
                for ($ii = 0; $ii < count($num_r); $ii++){
                    $num_key[$ii]['key_table'] = $num_r[$ii]['key_table'];
                    $num_key[$ii]['key_field'] = $num_r[$ii]['key_field'];
                }

//    Список полей которые необходимо вытянуть из ИСПРО    
                $select = '';
                $sql = "select distinct dt.name_col_ispro as name, name_table_ispro as namet
                        from Dovidnuku d, Dov_ispro dt
                        where d.code_dovid = ".$roles." and d.id = dt.id_dov and dt.numb = ".$numb_table[$num]['numb'];
                $num_res = $pdo->query($sql);
                $num_r = $num_res->fetchAll();
                for ($ii = 0; $ii < count($num_r); $ii++){
                    if (strlen($select)>0) $select .=', ';
                    $select .= $num_r[$ii]['namet'].".".$num_r[$ii]['name'];
                }

    
// Условие вібора записей из ИСПРО        
                $where = '';
                $sql = "select dt.wheretxt, dt.table_from
                        from Dovidnuku d, Dov_ispro_where dt
                        where d.code_dovid = ".$roles." and d.id = dt.id_dov and dt.numb = ".$numb_table[$num]['numb'];
                $num_res = $pdo->query($sql);
                $num_r = $num_res->fetchAll();
                $where = $num_r[0]['wheretxt'];
                $tables = $num_r[0]['table_from'];
 
// Параметри запроса 
                $sql = "select dt.name_par, dt.value_par, dt.value_par_field
                        from Dovidnuku d, Dov_ispro_param dt
                        where d.code_dovid = ".$roles." and d.id = dt.id_dov and dt.numb = ".$numb_table[$num]['numb'];
                $num_res = $pdo->query($sql);
                $num_r = $num_res->fetchAll();
            
                $sql = "select ".$select." from ".$numb_table[$num]['name'];
                if ($tables != '') $sql .= ", ".$tables;
                if ($where != '') {
                    $sql.=" where ".$where;
                }
                $num_ressql = $pdoi->prepare($sql);
                
                for ($ii = 0; $ii < count($num_r); $ii++){
                    if ($num_r[$ii]['value_par']!= '' && $num_r[$ii]['value_par'] != null) eval('$p = '.$num_r[$ii]['value_par']);
                    if ($num_r[$ii]['value_par_field']!= '' && $num_r[$ii]['value_par_field'] != null) {
                        $p = $result[$j][$num_r[$ii]['value_par_field']];
                    }
                    $num_ressql->bindValue(':'.$num_r[$ii]['name_par'], $p);
                }
                $num_ressql->execute();
                $num_result = $num_ressql->fetchAll();
                $sql = "select distinct dt.name_col, dt.name_col_ispro, dt.osnova, d.name_table, dt.type_col, dt.table_name, dt.ins_upd
                        from Dovidnuku d, Dov_ispro dt
                        where d.code_dovid = ".$roles." and d.id = dt.id_dov  and dt.numb = ".$numb_table[$num]['numb'];
                $num_res = $pdo->query($sql);
                $num_r = $num_res->fetchAll();
                
                $from = $r[0]['table_name'];
                $where = '';
                $insert = '';
                $update = '';
                $val = '';
                for ($ii = 0; $ii < count($num_r); $ii++){
                    if ($ispro_rcd > 0 && $num_r[$ii]['ins_upd']==1){
                        $where = 'ispro_rcd = '.$ispro_rcd;
                    }
                    if ($num_r[$ii]['osnova']>0) {
                        if (strlen($where)>0) $where .= " and ";
                        $where .= $num_r[$ii]['name_col']." = :".$num_r[$ii]['name_col_ispro'];
                    }
                    if (strlen($insert) == 0){ 
                        $insert = 'insert into '.$num_r[0]['table_name'].' ('.$num_r[$ii]['name_col'];
                    } else { 
                        $insert .= ', '.$num_r[$ii]['name_col'];
                    }
                    if (strlen($val) == 0) {
                        $val = 'values ( '.':'.$num_r[$ii]['name_col_ispro'];
                    }else{
                        $val .= ', :'.$num_r[$ii]['name_col_ispro'];
                    }
                    if ($num_r[$ii]['osnova'] == 0){
                        if (strlen($update) == 0) {
                            $update = 'update '.$num_r[0]['table_name'].' set '.$num_r[$ii]['name_col']." = :".$num_r[$ii]['name_col_ispro'];
                        }else{
                            $update .= ', '.$num_r[$ii]['name_col']." = :".$num_r[$ii]['name_col_ispro'];
                        }
                    }
                }
        
                $insert .= ' )'; 
                $val .= ' )'; 
                $sqlselect = 'select id from '.$num_r[0]['table_name'];
                if (strlen($where) > 0) $sqlselect .= ' where '.$where;
                $sqlinsert = $insert.' '.$val;
                $sqlupdate = $update.' where '.$where;
                
                $num_sel = $pdo->prepare($sqlselect);
                $num_ins = $pdo->prepare($sqlinsert);
                $num_upd = $pdo->prepare($sqlupdate);
                for ($jj = 0; $jj < count($num_result); $jj++){
                    for ($ii = 0; $ii < count($num_r); $ii++){
                        if ($num_r[$ii]['osnova']>0) { 
                            $num_sel->bindValue(':'.$num_r[$ii]['name_col_ispro'], $num_result[$jj][$num_r[$ii]['name_col_ispro']]);
                        }
                    }
                    $num_sel->execute();
                    $num_ressel = $num_sel->fetchAll();
                    if (count($num_ressel) == 0) {
                        for ($ii = 0; $ii < count($num_r); $ii++){
                            $num_ins->bindValue(':'.$num_r[$ii]['name_col_ispro'], $num_result[$jj][$num_r[$ii]['name_col_ispro']]);
                        }
                        $num_ins->execute();
                        $num_id = $pdo->lastInsertId();
                        for ($k = 0; $k < count($num_key); $k++){
                            $sql = 'update '.$num_key[$k]['key_table'].' set '.$num_key[$k]['key_field'].' = '.$num_id.' where ispro_rcd = '.$ispro_rcd ;
                            $pdo->exec($sql);
                        }
                    } else {
                        $num_id =$num_ressel[0]['id'];
                        for ($ii = 0; $ii < count($num_r); $ii++){
                            $num_upd->bindValue(':'.$num_r[$ii]['name_col_ispro'], $num_result[$jj][$num_r[$ii]['name_col_ispro']]);
                        }
                        $num_upd->execute();
                        for ($k = 0; $k < count($num_key); $k++){
                            if ($num_key[$k]['key_table'] != null && $num_key[$k]['key_table'] != ''){
                                $sql = 'update ' . $num_key[$k]['key_table'] . ' set ' . $num_key[$k]['key_field'] . ' = ' . $num_id . ' where ispro_rcd = ' . $ispro_rcd;
                                $pdo->exec($sql);
                            }
                        }
                    }
               }
//-------------------------------------------------------------------------------                
            }
        }
    

?>