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
		
    $sql = "UPDATE phototable SET ".$toset." = CASE img_id ";
	foreach ($images as $ordinal => $imgid) {
		$sql .= sprintf("WHEN '%s' THEN '%s' ", $imgid, str_replace("'", "\'",$data[$ordinal]));
	}
	$sql .= "END WHERE img_id IN (";
	foreach ($images as $ordinal => $imgid) {
		$sql .= "'".$imgid."',";
	}
	$sql = rtrim($sql, ",");
	$sql .= ")";

	echo $sql;
    			
	$statement = $connection->prepare($sql);

	$statement->execute();

	$result = $statement->fetch(PDO::FETCH_ASSOC);

	if($statement)
	{
		echo json_encode("Success");
	}
	else
	{
		echo json_encode("Failed");
	}
   
	$statement = NULL;
		
?>