<?php

  extract( $_POST );
    require_once 'dbConnection.php';

    try {
      $connection = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    }
    catch(PDOException $e) {
        echo $e->getMessage();
    }

    $sql = "UPDATE photos SET ".$toset." = CASE id ";
  foreach ($images as $ordinal => $imgid) {
    $sql .= sprintf("WHEN '%s' THEN '%s' ", $imgid, str_replace("'", "\'",$data[$ordinal]));
  }
  $sql .= "END WHERE id IN (";
  foreach ($images as $ordinal => $imgid) {
    $sql .= "'".$imgid."',";
  }
  $sql = rtrim($sql, ",");
  $sql .= ")";

  echo $sql;

  $statement = $connection->prepare($sql);

  $statement->execute();

  $result = $statement->fetch(PDO::FETCH_ASSOC);

  if($result) {
    echo json_encode( (object) array("message" => "Success") );
  } else {
    echo json_encode( (object) array("message" => "Failed") );
  }

  $statement = NULL;

?>
