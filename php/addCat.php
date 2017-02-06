<?php
  require_once 'dbConnection.php';
  extract($_GET);

  try {
    $connection = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
  } catch(PDOException $e) {
    echo $e->getMessage();
  }

  $sql = "INSERT INTO categories(title,categories.order,created_at,hidden,saveable,commentsEnabled) VALUES (:category,99,NOW(),:ishidden,:issaveable,1)";

  $statement = $connection->prepare($sql);

  $statement->bindParam(':category', $category, PDO::PARAM_STR);
  $statement->bindParam(':ishidden', $ishidden, PDO::PARAM_STR);
  $statement->bindParam(':issaveable', $issaveable, PDO::PARAM_STR);

  if($statement->execute()) {
    echo json_encode("Added");
  } else{
    echo json_encode("Failed");
  }
  $connection = NULL;
?>
