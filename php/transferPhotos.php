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


  $sql = "UPDATE phototable SET category = :category WHERE ";
    foreach ($images as $ordinal => $imgid) {
      $sql .= "img_id = '" . $imgid . "' OR ";
    }
  $sql = rtrim($sql, " OR ");

  $statement = $connection->prepare($sql);

  $statement->bindParam(':category', $category, PDO::PARAM_STR);

   $statement->execute();

   $result = $statement->fetch(PDO::FETCH_ASSOC);

    if($result)
    {
      echo json_encode("Success");

    }
    else
    {
      echo json_encode("Failed");
    }


  $statement = NULL;

?>
