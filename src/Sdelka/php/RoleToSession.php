<?php
    session_start();
    if (isset($_POST['roles'])) $_SESSION['userroles'] = $_POST['roles'];
?>