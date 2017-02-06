<?php

  extract( $_POST );
    require_once 'dbConnection.php';

    try {
      $connection = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    }
    catch(PDOException $e) {
        echo $e->getMessage();
    }

  // TODO eek, refactor!
  $getid = $connection->prepare("SELECT id FROM categories WHERE title = :title");
  $getid->bindParam(':title', $category, PDO::PARAM_STR);
  $getid->execute();
  $category_id = $getid->fetchColumn();

  $sql = "UPDATE photos SET category_id = :category_id WHERE ";
    foreach ($images as $ordinal => $imgid) {
      $sql .= "id = '" . $imgid . "' OR ";
    }
  $sql = rtrim($sql, " OR ");

  $statement = $connection->prepare($sql);

  $statement->bindParam(':category_id', $category_id, PDO::PARAM_STR);

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
