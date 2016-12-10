	<?php

	extract( $_POST );
	
	require_once 'dbConnection.php';

    try {  
      $connection = new PDO("mysql:host=$host;dbname=$db", $user, $pass);  
    }  
    catch(PDOException $e) {  
        echo $e->getMessage();  
    } 

    $sql = "UPDATE categories SET catsort = CASE catid ";
			foreach ($sort as $id => $ordinal) {
				$sql .= sprintf("WHEN %d THEN '%s' ", $id, $ordinal);
			}
			$sql .= "END";
			
	$statement = $connection->prepare($sql);

    $statement->execute();
			
	$statement = NULL;
			
	?>