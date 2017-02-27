<?php

  require_once 'dbConnection.php';
  extract( $_POST );

  try {
    $connection = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
  } catch(PDOException $e) {
    echo $e->getMessage();
  }

  $sql = "DELETE FROM photos WHERE ";

  foreach ($images as $ordinal => $data) {
    $sql .= "id = :file" . $ordinal . " OR ";
  }
  $sql = rtrim($sql, " OR ");

  $statement = $connection->prepare($sql);

  foreach ($images as $ordinal => $data) {
    $statement->bindParam(":file".$ordinal, $data['imgid'], PDO::PARAM_STR);
    if($data['isUnique'] == true){
      unlink('../photos/'.$data['filename']);
      unlink('../photothumbs/'.$data['filename']);
    }
  }

  if($statement->execute()) {
    echo json_encode( (object) array("message" => "Success") );
  } else {
    echo json_encode( (object) array("message" => "Failed") );
  }

  $connection = NULL;

?>
