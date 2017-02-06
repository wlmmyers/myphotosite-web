<?php

    //usage:
    //willsphotosite.com/php/insertInto.php?prop=[prop]&val=[val]

    extract($_GET);

    require_once 'dbConnection.php';

    try {
      $connection = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    }
    catch(PDOException $e) {
        echo $e->getMessage();
    }
      echo("Property: ".$prop . ", Value: " . $val);
        $sql = "INSERT INTO config(property,value) VALUES (:prop,:val)";

        $statement = $connection->prepare($sql);

        $statement->bindParam(':prop', $prop, PDO::PARAM_STR);
        $statement->bindParam(':val', $val, PDO::PARAM_STR);
    $statement->execute();

        $result = $statement->fetch(PDO::FETCH_ASSOC);


    if($result)
    {
      echo json_encode("Added Config Data");
    }
    else
    {
      echo json_encode("Failed to add config data");
    }

        $connection = NULL;



?>
