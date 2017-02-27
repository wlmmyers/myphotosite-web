<?php
  require_once 'dbConnection.php';
  extract($_POST);

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
    echo json_encode( (object) array("message" => "Success") );
  } else {
    echo json_encode( (object) array("message" => "Failed") );
  }
  $connection = NULL;
?>
