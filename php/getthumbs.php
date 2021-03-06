<?php
  require_once 'dbConnection.php';

  try {
    $connection = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
  }
  catch(PDOException $e) {
    echo $e->getMessage();
  }

  $sql = "SELECT title,thumb FROM categories";

  $statement = $connection->prepare($sql);

  $statement->execute();

  $statement->setFetchMode(PDO::FETCH_ASSOC);

  while($rows = $statement->fetch()) {
    $thumbs[$rows['title']] = json_decode($rows['thumb']);
  }

  echo json_encode($thumbs);

  $connection = NULL;
?>
