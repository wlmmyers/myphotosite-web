  <?php

  extract( $_POST );
  require_once 'dbConnection.php';

    try {
      $connection = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    }
    catch(PDOException $e) {
        echo $e->getMessage();
    }

  $sql = "UPDATE phototable SET caption = :caption WHERE filename = :filename;";
    $statement = $connection->prepare($sql);
    $statement->bindParam(':caption', $caption, PDO::PARAM_STR);
    $statement->bindParam(':filename', $imagefor, PDO::PARAM_STR);
    $statement->execute();

    $result = $statement->fetch(PDO::FETCH_ASSOC);

    if($result)
    {
      echo json_encode("Success");

    }
    else
    {
      echo json_encode("Failed");
    }

  $statement = NULL;

  ?>
