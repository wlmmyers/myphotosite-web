<?php

$file_name = $_GET['file'];


require_once 'dbConnection.php';

try {  
  $connection = new PDO("mysql:host=$host;dbname=$db", $user, $pass);  
}  
catch(PDOException $e) {  
    echo $e->getMessage();  
}  

$sql = "SELECT filename FROM phototable WHERE filename = :filename";

$statement = $connection->prepare($sql);

$statement->bindParam(':filename', $file_name, PDO::PARAM_STR);

$statement->execute();

$count = $statement->rowCount();

if($count>0){



    $file = '../photos/' . $file_name;

    if (file_exists($file)) {
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename='.basename($file));
        header('Content-Transfer-Encoding: binary');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($file));
        ob_clean();
        flush();
        readfile($file);
        exit;
    }
}
?>
