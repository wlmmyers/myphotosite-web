<?php

  extract( $_POST );
  require_once 'dbConnection.php';

  try {
    $connection = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
  }
  catch(PDOException $e) {
      echo $e->getMessage();
  }

  if($action == 'set'){
    $sql = "UPDATE notes SET note_text = :note_text WHERE note_id = :note_id";
    $statement = $connection->prepare($sql);
    $statement->bindParam(':note_id', $note_id, PDO::PARAM_STR);
    $statement->bindParam(':note_text', $note_text, PDO::PARAM_STR);
  }
  else if($action == 'get'){
    $sql = "SELECT * FROM notes WHERE note_id = :note_id";
    $statement = $connection->prepare($sql);
    $statement->bindParam(':note_id', $note_id, PDO::PARAM_STR);
  }

  $statement->execute();
  $notes = array();
  $therows = $statement->fetchAll();

  if($action == 'set') {
    echo json_encode( (object) array("message" => "Success") );
  } else {
    echo json_encode( (object) array("result" => $therows[0]['note_text']) );
  }

  $statement = NULL;

?>
