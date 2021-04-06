<?php
    header('Content-type: json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');

    global $pdowork;
    global $pdosys;
    global $pdo;
    
    if (file_exists('params.ini')) $ini = parse_ini_file('params.ini', true);
    if (file_exists('../params.ini')) $ini = parse_ini_file('../params.ini', true);
    
    $server = $ini['SQLServer']['server'];
    $bd = $ini['SQLServer']['bdwork']; 
    $dsn = "sqlsrv:server=$server;Database=$bd;";
    $user = $ini['SQLServer']['user'];
    $pass = $ini['SQLServer']['password'];
    $opt = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, 
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false];


//    $pdowork = new PDO($dsn, $user, $pass);
//    $pdowork->exec('SET CHARACTER SET utf8');

    $bd = $ini['SQLServer']['bdsys']; 
    $dsn = "sqlsrv:server=$server;Database=$bd;";
//    $pdosys = new PDO($dsn, $user, $pass);
//    $pdosys->exec('SET CHARACTER SET utf8');
  
    $host = $ini['mysql']['HOSTNAME'];
    $user = $ini['mysql']['login'];
    $pass = $ini['mysql']['password'];
    $bd = $ini['mysql']['database'];
    $dsn = "mysql:host=$host;dbname=$bd;charset=utf8";
    $pdo = new PDO($dsn, $user, $pass, $opt);
    $pdo->exec('SET CHARACTER SET utf8');
  
?>