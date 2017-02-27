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
  $getid->bindParam(':title', $title, PDO::PARAM_STR);
  $getid->execute();
  $category_id = $getid->fetchColumn();

  $sqlone = "UPDATE categories SET title = :newtitle WHERE id = :category_id;";
  $statementone = $connection->prepare($sqlone);
  $statementone->bindParam(':category_id', $category_id, PDO::PARAM_STR);
  $statementone->bindParam(':newtitle', $newtitle, PDO::PARAM_STR);

  if($statement->execute()) {
    echo json_encode( (object) array("message" => "Success") );
  } else {
    echo json_encode( (object) array("message" => "Failed") );
  }

  $connection = NULL;
?>
