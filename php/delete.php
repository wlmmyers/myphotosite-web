<?php

//////////////////////////////////////////////////////////////
////////////////////// DATABASE STUFF ////////////////////////
//////////////////////////////////////////////////////////////
  extract( $_POST );

  require_once 'dbConnection.php';

    try {
        $connection = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    }
    catch(PDOException $e) {
        echo $e->getMessage();
    }

    $sql = "DELETE FROM phototable WHERE ";

    foreach ($images as $ordinal => $data) {
      $sql .= "img_id = :file" . $ordinal . " OR ";
    }
    $sql = rtrim($sql, " OR ");

    echo $sql;

    $statement = $connection->prepare($sql);

    foreach ($images as $ordinal => $data) {
      $statement->bindParam(':file'.$ordinal, $data['imgid'], PDO::PARAM_STR);
      if($data['isUnique'] == true){
        unlink('/photos/'.$data['filename']);
          unlink('/photothumbs/'.$data['filename']);
       }
    }

    $statement->execute();

    echo json_encode("Deleted");


  $connection = NULL;

?>
