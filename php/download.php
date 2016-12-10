<?php
    
    extract( $_GET );
	require_once 'dbConnection.php';

    try {  
      $connection = new PDO("mysql:host=$host;dbname=$db", $user, $pass);  
    }  
    catch(PDOException $e) {  
        echo $e->getMessage();  
    }  

		$sql = "SELECT phototable.category, phototable.filename, categories.name AS 'category_name', categories.catsort, categories.hidden 
				FROM phototable  
				RIGHT OUTER JOIN categories
				ON phototable.category=categories.name
                WHERE (categories.hidden = 0";
                if(isset($hidden)) {
                    $sql.=" OR (";
                    foreach($hidden as $key => $value){
                        if(($key + 1) == count($hidden)) $sql.="phototable.category = '".$value."'";
                        else $sql.="phototable.category = '".$value. "' OR "; 
                    }
                    $sql.=")";
                }

                if(isset($tohide)) {
                    $sql.=") AND (";
                    foreach($tohide as $key => $value){
                        if(($key + 1) == count($tohide)) $sql.="phototable.category != '".$value."'";
                        else $sql.="phototable.category != '".$value. "' AND "; 
                    }
                }
        $sql.=") ORDER BY categories.catsort,categories.name,phototable.sort_id";

        $statement = $connection->prepare($sql);

        $statement->execute();

 		$photos = array();

        $statement->setFetchMode(PDO::FETCH_ASSOC);  
        while($rows = $statement->fetch()) {  
          $photos[$rows['category_name']][]=$rows['filename'];
        }  

        echo json_encode($photos);
		
	$connection = NULL;
		
?>