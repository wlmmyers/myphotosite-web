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


		$sql = "UPDATE categories SET thumb = CASE name ";
			foreach ($thumbs as $ordinal => $src) {
				$sql .= sprintf("WHEN '%s' THEN '%s' ", $ordinal, $src);
			}
			$sql .= "END";
						
	$statement = $connection->prepare($sql);

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