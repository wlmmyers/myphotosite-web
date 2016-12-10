<?php

//////////////////////////////////////////////////////////////
////////////////////// DATABASE STUFF ////////////////////////
//////////////////////////////////////////////////////////////

	require_once 'dbConnection.php';

    try {  
      $connection = new PDO("mysql:host=$host;dbname=$db", $user, $pass);  
    }  
    catch(PDOException $e) {  
        echo $e->getMessage();  
    } 

	$sql = "SELECT * FROM config";
		
	$statement = $connection->prepare($sql);

    $statement->execute();
		
	$statement->setFetchMode(PDO::FETCH_ASSOC);  

	while($rows = $statement->fetch()) {  
    
        $config[$rows['property']]=$rows['value'];
  
    }

	echo json_encode($config);

	$connection = NULL;
		
?>