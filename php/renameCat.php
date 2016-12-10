<?php
    
extract( $_POST );

        require_once 'dbConnection.php';

        try {  
            $connection = new PDO("mysql:host=$host;dbname=$db", $user, $pass);  
        }  
        catch(PDOException $e) {  
            echo $e->getMessage();  
        }      

        $sqltwo = "UPDATE categories SET name = :two WHERE name = :one;";
        $statementtwo = $connection->prepare($sqltwo);
        $statementtwo->bindParam(':one', $one, PDO::PARAM_STR);
        $statementtwo->bindParam(':two', $two, PDO::PARAM_STR);
        
        if($statementtwo->execute())
        {
            
            $sqlone = "UPDATE phototable SET category = :two WHERE category = :one;";
            $statementone = $connection->prepare($sqlone);
            $statementone->bindParam(':one', $one, PDO::PARAM_STR);
            $statementone->bindParam(':two', $two, PDO::PARAM_STR);
            $statementone->execute();
            
            echo true;
        
        }
        else echo false;


        
        


		
		
$connection = NULL;	
?>
