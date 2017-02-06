<?php
  require_once 'dbConnection.php';
  extract( $_POST );

  try {
    $connection = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
  } catch(PDOException $e) {
    echo $e->getMessage();
  }

  $sql = "CREATE TEMPORARY TABLE tempcopytable ENGINE=MEMORY SELECT * FROM photos WHERE ";

  foreach ($images as $ordinal => $imgid) {
    $sql .= "id = '" . $imgid . "' OR ";
  }

  $sql = rtrim($sql, " OR ");

  $sql .= "; UPDATE tempcopytable SET category_title = :category_title, id = NULL;
    INSERT INTO photos SELECT * FROM tempcopytable;
    DROP TABLE tempcopytable;";

  $statement = $connection->prepare($sql);

  $statement->bindParam(':category_title', $category_title, PDO::PARAM_STR);

  $statement->execute();

  $result = $statement->fetch(PDO::FETCH_ASSOC);

  if($result) {
    echo json_encode("Success");
  } else {
    echo json_encode("Failed");
  }

  $statement = NULL;
?>
