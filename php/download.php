<?php
  require_once 'dbConnection.php';
  extract( $_GET );

  try {
    $connection = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
  }
  catch(PDOException $e) {
      echo $e->getMessage();
  }

  $sql = "SELECT photos.category_id, photos.filename, categories.title AS 'category_name', categories.order, categories.hidden
    FROM photos
    RIGHT OUTER JOIN categories
    ON photos.category_id=categories.id
    WHERE (categories.hidden = 0";

  if(isset($hidden)) {
      $sql.=" OR (";
      foreach($hidden as $key => $value){
          if(($key + 1) == count($hidden)) $sql.="categories.title = '".$value."'";
          else $sql.="categories.title = '".$value. "' OR ";
      }
      $sql.=")";
  }

  if(isset($tohide)) {
      $sql.=") AND (";
      foreach($tohide as $key => $value){
          if(($key + 1) == count($tohide)) $sql.="categories.title != '".$value."'";
          else $sql.="categories.title != '".$value. "' AND ";
      }
  }

  $sql.=") ORDER BY categories.order,categories.title,photos.order";

  $statement = $connection->prepare($sql);

  $statement->execute();

  $photos = array();

  $statement->setFetchMode(PDO::FETCH_ASSOC);
  while($rows = $statement->fetch()) {
    $photos[$rows['category_name']][]=$rows['filename'];
  }

  echo json_encode($photos);

  $connection = NULL;

?>
