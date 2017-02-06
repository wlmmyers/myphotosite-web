<?php
  require_once 'dbConnection.php';

  $category = $_POST['category'];

  try {
    $connection = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
  } catch(PDOException $e) {
    echo $e->getMessage();
  }

  // TODO eek, refactor!
$getid = $connection->prepare("SELECT id FROM categories WHERE title = :category_title");
  $getid->bindParam(':category_title', $category, PDO::PARAM_STR);
  $getid->execute();
  $category_id = $getid->fetchColumn();

  $sql = "DELETE FROM photos WHERE category_id = :category_id";
  $sql_three = "DELETE FROM categories WHERE id = :category_id";
  $sql_four = "SELECT filename FROM photos WHERE category_id = :category_id";

  $statement = $connection->prepare($sql);
  $statement_three = $connection->prepare($sql_three);
  $statement_four = $connection->prepare($sql_four);

  $statement->bindParam(':category_id', $category_id, PDO::PARAM_STR);
  $statement_three->bindParam(':category_id', $category_id, PDO::PARAM_STR);
  $statement_four->bindParam(':category_id', $category_id, PDO::PARAM_STR);

  $statement_four->execute();

  $statement_four->setFetchMode(PDO::FETCH_ASSOC);

  while($rows = $statement_four->fetch()) {
    unlink('../photos/'. $rows['filename']);
    unlink('../photothumbs/'. $rows['filename']);
  }

  $statement->execute();
  $statement_three->execute();

  echo json_encode("Deleted");

  $connection = NULL;

?>
