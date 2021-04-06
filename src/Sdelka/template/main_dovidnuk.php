<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <script type="text/javascript" src="js/jquery.js"></script>
        <link href="css/style.css" rel="stylesheet" type='text/css'>
    </head>
    <body class = sdelkamaindovidnuk>
        <script src = 'js/selectroles.js'></script>
        <script src = 'js/selectdovidnuk.js'></script>
        
        <hr> 
        <?php
            require_once("template/user_panel.php");
        ?>
        <hr>
        
        <?php
            require_once("php/dovidnuku.php");
        ?>
        
        <div class = 'MainDovidnuk'>
        </div>
        
        <div id="modal_form">
            <div><span id="modal_close">X</span></div>
        </div>
        <div id="overlay"></div>
    </body>
</html>