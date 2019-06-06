<?php

define('DB_NAME', 'jkwork');
define('DB_USER', 'root');
define('DB_PASSWORD', '1234');
define('DB_HOST', 'localhost');

$connect = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
if (!$connect){
    die("Error in connection" . mysqli_connect_error()) ;
 } 
?>