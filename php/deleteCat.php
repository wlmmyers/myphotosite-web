<?php

//////////////////////////////////////////////////////////////
////////////////////// DATABASE STUFF ////////////////////////
//////////////////////////////////////////////////////////////
	$category = $_POST['category'];
	
	require_once 'dbConnection.php';
    
    try {  
      $connection = new PDO("mysql:host=$host;dbname=$db", $user, $pass);  
    }  
    catch(PDOException $e) {  
        echo $e->getMessage();  
    }  

	$sql = "DELETE FROM phototable WHERE category = :category";
    $sql_three = "DELETE FROM categories WHERE name = :category";
    $sql_four = "SELECT filename FROM phototable WHERE category = :category";
	
    $statement = $connection->prepare($sql);
    $statement_three = $connection->prepare($sql_three);	
    $statement_four = $connection->prepare($sql_four);

    $statement->bindParam(':category', $category, PDO::PARAM_STR);
    $statement_three->bindParam(':category', $category, PDO::PARAM_STR);
    $statement_four->bindParam(':category', $category, PDO::PARAM_STR);

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