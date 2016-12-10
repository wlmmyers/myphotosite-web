<?php 
$hour = time() - 3600; 
setcookie("user", $_COOKIE['user'], $hour, '/'); 
setcookie("pass", $_COOKIE['pass'], $hour, '/');
echo json_encode("cleared");
?>