<?php

	require_once 'dbConnection.php';

    try {  
      $connection = new PDO("mysql:host=$host;dbname=$db", $user, $pass);  
    }  
    catch(PDOException $e) {  
        echo $e->getMessage();  
    }  

	$sql = "SELECT phototable.img_id, phototable.filename, phototable.caption, phototable.comments, phototable.tags, phototable.date_added AS 'upload_date', 
                categories.name AS 'category', categories.catsort, categories.date_created AS 'date_created', categories.hidden, categories.saveable, categories.thumb,
                categories.slideshowBackColor, categories.slideshowAccentColor, categories.slideshowPlaceholderColor, categories.sliderBackColor, categories.sliderAccentColor,
                categories.sliderCaptionColor, categories.sliderTextColor, categories.toggleCaption, categories.defaultView, categories.commentsEnabled
			FROM phototable  
			RIGHT OUTER JOIN categories
			ON phototable.category=categories.name
            ORDER BY categories.catsort,categories.name,phototable.sort_id";

    $sql2 = "SELECT * FROM config";

    $statement = $connection->prepare($sql);
    $statement2 = $connection->prepare($sql2);

    $statement->execute();
    $statement2->execute();

    $therows = $statement->fetchAll();
    $therows2 = $statement2->fetchAll();
 	$data = array('photodata' => array(), 'configdata' => array() );

    foreach($therows as $rows) {  

        $data['photodata'][$rows['category']] = array( 
            'photos' => array(),
            'sort' => $rows['catsort'],
            'date_created' => $rows['date_created'],
            'hidden' => $rows['hidden'],
            'saveable' => $rows['saveable'],
            'commentsEnabled' => $rows['commentsEnabled'],
            'slideshowBackColor' => $rows['slideshowBackColor'],
            'slideshowAccentColor' => $rows['slideshowAccentColor'],
            'slideshowPlaceholderColor' => $rows['slideshowPlaceholderColor'],
            'sliderBackColor' => $rows['sliderBackColor'],
            'sliderAccentColor' => $rows['sliderAccentColor'],
            'sliderCaptionColor' => $rows['sliderCaptionColor'],
            'sliderTextColor' => $rows['sliderTextColor'],
            'toggleCaption' => $rows['toggleCaption'],
            'defaultView' => $rows['defaultView'],
            'hidden' => $rows['hidden'],
            'thumb' => json_decode($rows['thumb'])
        );
    }

    foreach($therows as $rows) {  
        if (json_decode($rows['comments']) != null) $thecomments =  json_decode($rows['comments']);
        else $thecomments = [];
        $data['photodata'][$rows['category']]['photos'][] = array( 
            'id' => $rows['img_id'],
            'filename' => $rows['filename'],
            'caption' => $rows['caption'],
            'comments' => $thecomments,
            'tags' => $rows['tags'],
            'upload_date' => $rows['upload_date']
        );
    }

    foreach($therows2 as $rows){
        $data['configdata'][$rows['property']]=$rows['value'];
    }

    echo json_encode($data);

	$connection = NULL;
		
?>