<?php
    session_start();
    $pdo = null;
    require_once("pdoconnect.php");
    
    $roles = $_GET['dovid'];
    $id = $_GET['id'];
    $user = $_GET['userlogin'];
    $result = array();
    $sql = "select dt.name_col, dt.name_table, dt.name_table_row, dt.ref_table, dt.ref_key, dt.ref_row, dt.setorder
            from Dovidnuku d, Dov_table dt
            where d.code_dovid = ".$roles." and d.id = dt.id_dov
            order by dt.ord
            ";
    $res = $pdo->query($sql);
    $r = $res->fetchAll();

    $select = $r[0]['name_table'].".id ";
    $from = $r[0]['name_table'];
    $where = '';
    $order = '';
    for ($i = 0; $i < count($r); $i++){
        if ($r[$i]['ref_table'] != null){
            if (strlen($select)>0) {$select .= ",";}
            $select .= $r[$i]['ref_table'].".".$r[$i]['ref_row'];
            if (stripos($from, $r[$i]['ref_table'],0) === false){
                $from .= ", ".$r[$i]['ref_table'];
                if (strlen($where)>0) {$where .= " and ";}
                $where .= $r[$i]['name_table'].".".$r[$i]['name_table_row']." = ".$r[$i]['ref_table'].".".$r[$i]['ref_key'];
            }
            if ($r[$i]['setorder'] == 1) {
                if (strlen($order) > 0) $order .= ', ';
                $order .= $r[$i]['ref_table'] . "." . $r[$i]['ref_row'];
            }
        } else {
            if (strlen($select)>0) {$select .= ",";}
            $select .= $r[$i]['name_table'].".".$r[$i]['name_table_row'];
            if ($r[$i]['setorder'] == 1) {
                if (strlen($order) > 0) $order .= ', ';
                $order .= $r[$i]['name_table'].".".$r[$i]['name_table_row'];
            }
        }
    }
    
    $sql = "select ds.field_select, ds.field_value, ds.select_pidr, ds.table_select, ds.select_where, ds.table_user_select, ds.field_user_select, ds.field_user_id, ds.field_user_view, ds.user_table, ds.user_field, ds.field_user_type, ds.is_selected from Dov_user_select ds, Dovidnuku d where d.code_dovid = ".$roles." and d.id = ds.id_dov";

    $res = $pdo->query($sql);
    $rs = $res->fetchAll();

    for ($i = 0; $i < count($rs); $i++){
        if ($rs[$i]['select_pidr'] == 1 ){
            if (strlen($where) > 0) $where .= " and ";
            if ($rs[$i]['is_selected'] == 0) {
                if ($id > 0) {
                    if (strlen($where) > 0) $where .= " and ";
                    $where .= $rs[$i]['table_select'].".".$rs[$i]['field_select']." = ".$id;
                }
                if ($id == -9){
                    $str = stripos($from, $rs[$i]['table_select'],0);
                   if (stripos($from, $rs[$i]['table_select'],0) === false){
                        $from .= ", ".$rs[$i]['table_select'];
                    }
                    $str = stripos($from, $rs[$i]['table_user_select'],0);
                    if (stripos($from, $rs[$i]['table_user_select'],0) === false){
                        $from .= ", ".$rs[$i]['table_user_select'];
                    }
                    $str = stripos($from, $rs[$i]['user_table'],0);
                    if (stripos($from, $rs[$i]['user_table'],0) === false){
                        $from .= ", ".$rs[$i]['user_table'];
                    }
           
                    if (strlen($where) > 0) $where .= " and ";
                    $where .= $rs[$i]['table_select'].".".$rs[$i]['field_select']." = ".$rs[$i]['user_table'].".".$rs[$i]['user_field']." and ".$rs[$i]['user_table'].".".$rs[$i]['field_user_id']." = ".$rs[$i]['table_user_select'].".".$rs[$i]['field_user_select']." and ";
                    if ($rs[$i]['field_user_type'] == 'txt'){
                        $where .= $rs[$i]['table_user_select'].".".$rs[$i]['field_user_view']." = '".$user."'";
                    } else {
                        $where .= $rs[$i]['table_user_select'].".".$rs[$i]['field_user_view']." = ".$user;
                    }
                }
            } else {
                if (stripos($from, $rs[$i]['table_user_select']) === false) {
                    $from .= ", ".$rs[$i]['table_user_select'];
                }
                if ($rs[$i]['field_user_type'] == 'txt'){
                    $where .= $rs[$i]['table_user_select'].".".$rs[$i]['field_user_id']." = '".$id."' and ". $rs[$i]['table_user_select'].".". $rs[$i]['field_user_select']." = ". $rs[$i]['table_select'].".". $rs[$i]['field_select'];
                } else {
                    $where .= $rs[$i]['table_user_select'].".".$rs[$i]['field_user_id']." = ".$id." and ". $rs[$i]['table_user_select'].".". $rs[$i]['field_user_select']." = ". $rs[$i]['table_select'].".". $rs[$i]['field_select'];
                }
            }
        }
        if ($rs[$i]['select_where'] != null){
            if (strlen($where) > 0) $where .= " and ";
            $where .= $rs[$i]['select_where'];
        }
        if ($rs[$i]['field_value']){
            if (strlen($where) > 0) $where .= " and ";
            $where .= $rs[$i]['table_select'].".".$rs[$i]['field_select']." = ".$rs[$i]['field_value'];
        }
    }    
    
    $sql = "select ".$select." from ".$from;
    if (strlen($where)>0) {$sql.=" where ".$where;}
    if (strlen($order) > 0) $sql .= ' order by '.$order;
   
    
    $res = $pdo->query($sql);
    $rt = $res->fetchAll();
    $result['table'] = [];
    for ($i = 0; $i < count($rt); $i++){
        $result['table'][$i][0] = $rt[$i]['id'];
        for ($j = 0; $j < count($r); $j++){
            if ($r[$j]['ref_row'] == null || $r[$j]['ref_row'] == '') {
                $result['table'][$i][$r[$j]['name_table_row']] = $rt[$i][$r[$j]['name_table_row']];
            } else {
                $result['table'][$i][$r[$j]['name_table_row']] = $rt[$i][$r[$j]['ref_row']];
            }
        }    
    }
    
    $sql = "select dt.name_table_row, dt.ref_table, dt.ref_key, dt.ref_row
            from Dovidnuku d, Dov_table dt
            where d.code_dovid = ".$roles." and d.id = dt.id_dov and dt.ref_table is not null
            order by dt.ord
            ";
    $res = $pdo->query($sql);
    $r = $res->fetchAll();

    for ($i = 0; $i < count($r); $i++){
        $select = $r[$i]['ref_key'].', '.$r[$i]['ref_row'];
        $from = $r[$i]['ref_table'];
        $order = $r[$i]['ref_row'];
        $sql = "select ".$r[$i]['ref_key']." as id, ".$r[$i]['ref_row']." as name_col from ".$r[$i]['ref_table']." order by ".$r[$i]['ref_row'];
        $res = $pdo->query($sql);
        $rs = $res->fetchAll();
        $result['combo'][$r[$i]['name_table_row']] = $rs;
    }    
    
   echo json_encode($result);
?>