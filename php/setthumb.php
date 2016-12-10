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


	$sql = "UPDATE categories SET thumb = :thumb WHERE name = :category";
						
	$statement = $connection->prepare($sql);
	$statement->bindParam(':thumb', $thumb, PDO::PARAM_STR);
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