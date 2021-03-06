<?php

  extract( $_POST );

  require_once 'dbConnection.php';

  try {
    $connection = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
  }
  catch(PDOException $e) {
    echo $e->getMessage();
  }

  $sqltwo = "DELETE FROM categories WHERE title = :one";
  $statementtwo = $connection->prepare($sqltwo);
  $statementtwo->bindParam(':one', $one, PDO::PARAM_STR);

  if($statementtwo->execute()) {

    $sqlone = "UPDATE photos SET category = :two WHERE category = :one";
    $statementone = $connection->prepare($sqlone);
    $statementone->bindParam(':one', $one, PDO::PARAM_STR);
    $statementone->bindParam(':two', $two, PDO::PARAM_STR);
    $statementone->execute();

    echo json_encode( (object) array("message" => "Success") );

  } else {
    echo json_encode( (object) array("message" => "Failed") );
  }

  $connection = NULL;
?>
