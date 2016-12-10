<?php

//////////////////////////////////////////////////////////////
////////////////////// DATABASE STUFF ////////////////////////
//////////////////////////////////////////////////////////////

	extract( $_POST );
    require_once 'dbConnection.php';

    try {  
      $connection = new PDO("mysql:host=$host;dbname=$db", $user, $pass);  
    }  
    catch(PDOException $e) {  
        echo $e->getMessage();  
    } 

   $sql = "CREATE TEMPORARY TABLE tempcopytable ENGINE=MEMORY SELECT * FROM phototable WHERE ";
		foreach ($images as $ordinal => $imgid) {
			$sql .= "img_id = '" . $imgid . "' OR ";
	}
	$sql = rtrim($sql, " OR ");

  	$sql .= "; UPDATE tempcopytable SET category = :category, img_id = NULL; 
  		INSERT INTO phototable SELECT * FROM tempcopytable;
  		DROP TABLE tempcopytable;";

	$statement = $connection->prepare($sql);

	$statement->bindParam(':category', $category, PDO::PARAM_STR);

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