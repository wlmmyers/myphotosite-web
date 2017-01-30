<?php

//////////////////////////////////////////////////////////////
////////////////////// DATABASE STUFF ////////////////////////
//////////////////////////////////////////////////////////////
   extract( $_GET );
  require_once 'dbConnection.php';

   try {
      $connection = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
   }
   catch(PDOException $e) {
        echo $e->getMessage();
   }

   $statement;
   $sql;

  $sql = "UPDATE categories SET sliderBackColor = :slbc, sliderTextColor = :sltc, sliderCaptionColor = :slcc, sliderAccentColor = :slac, slideshowBackColor = :ssbc,
    slideshowPlaceholderColor = :sspc, slideshowAccentColor = :ssac, toggleCaption = :tc, hidden = :h, saveable = :s, defaultView = :dv, commentsEnabled = :ce WHERE name = :cat";

  $statement = $connection->prepare($sql);
  $statement->bindParam(':ssbc', $config['slideshowBackColor'], PDO::PARAM_STR);
  $statement->bindParam(':sspc', $config['slideshowPlaceholderColor'], PDO::PARAM_STR);
    $statement->bindParam(':ssac', $config['slideshowAccentColor'], PDO::PARAM_STR);
    $statement->bindParam(':slbc', $config['sliderBackColor'], PDO::PARAM_STR);
  $statement->bindParam(':sltc', $config['sliderTextColor'], PDO::PARAM_STR);
  $statement->bindParam(':slcc', $config['sliderCaptionColor'], PDO::PARAM_STR);
    $statement->bindParam(':slac', $config['sliderAccentColor'], PDO::PARAM_STR);
  $statement->bindParam(':tc', $config['toggleCaption'], PDO::PARAM_STR);
    $statement->bindParam(':ce', $config['commentsEnabled'], PDO::PARAM_STR);
    $statement->bindParam(':dv', $config['defaultView'], PDO::PARAM_STR);
    $statement->bindParam(':h', $config['hidden'], PDO::PARAM_STR);
    $statement->bindParam(':s', $config['saveable'], PDO::PARAM_STR);
  $statement->bindParam(':cat', $cat, PDO::PARAM_STR);

   $statement->execute();

   $result = $statement->fetch(PDO::FETCH_ASSOC);

    if($result)
    {
      echo json_encode('success');

    }
    else
    {
      echo json_encode($sql);
    }

  $statement = NULL;

?>
