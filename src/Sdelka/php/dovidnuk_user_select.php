<?php
    session_start();
    $pdo = null;
    require_once("pdoconnect.php");
    
    $dovid = $_GET['dovid'];
    $user = $_GET['userid'];
    $result = array();
    $sql = "select dus.field_caption, dus.table_user_select, dus.field_user_select, dus.field_user_view, dus.field_user_id, dus.user_table, dus.user_field, dus.is_selected
            from Dovidnuku d, Dov_user_select dus
            where d.code_dovid = ".$dovid." and d.id = dus.id_dov and dus.table_user_select is not null
            ";
    $res = $pdo->query($sql);
    $r = $res->fetchAll();
    
    $result = array();
    for ($i = 0; $i < count($r); $i++){
        if ($r[$i]['is_selected'] == 1){
            $result[$i]['field_caption'] = $r[$i]['field_caption'];
            $result[$i]['table_user_select'] = $r[$i]['table_user_select'];
            $result[$i]['user_field'] = $r[$i]['user_field'];
            
            $sql = "select ".$r[$i]['table_user_select'].".".$r[$i]['field_user_id'].", ".$r[$i]['table_user_select'].".".$r[$i]['field_user_view'].", ".$r[$i]['table_user_select'].".".$r[$i]['field_user_select'];
            $sql .= " from Users, ".$r[$i]['user_table'].", ".$r[$i]['table_user_select'];
            $sql .= " where Users.id = '".$user."' and Users.id = ".$r[$i]['user_table'].".id_user and ".$r[$i]['user_table'].".".$r[$i]['user_field']." = ".$r[$i]['table_user_select'].".".$r[$i]['field_user_select'];

            $res = $pdo->query($sql);
            $rr = $res->fetchAll();
            for ($j = 0; $j < count($rr); $j++){
                $result[$i]['data_select'][$j]['field_user_id'] = $rr[$j][$r[$i]['field_user_id']];
                $result[$i]['data_select'][$j]['field_user_view'] = $rr[$j][$r[$i]['field_user_view']];
                $result[$i]['data_select'][$j]['field_id'] = $rr[$j][$r[$i]['field_user_select']];
            }
        }
    }

    echo json_encode($result);
?>