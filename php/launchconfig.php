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

  $sql = "SELECT *
      FROM phototable
      RIGHT OUTER JOIN categories
      ON phototable.category=categories.name
      ORDER BY categories.catsort,categories.name,phototable.sort_id";

  $statement = $connection->prepare($sql);

   $statement->execute();

  $statement->setFetchMode(PDO::FETCH_ASSOC);

  $oldcategory = '';
  $output = "<div class = \"hidden\">";

  $hiddenval = '';
  $saveableval = '';
  $defaultView = '';
  $captionval = '';
  $commentsval = '';

  $counter = 0;

  while($rows = $statement->fetch()) {

                if($rows["hidden"]==0) $hiddenval = 'shown';
                else $hiddenval = 'hidden';

                if($rows["saveable"]==0) $saveableval = 'unsaveable';
                else $saveableval = 'saveable';

                if($rows["defaultView"] == 'slider' || $rows["defaultView"] == 'slideshow') $defaultView = $rows["defaultView"];
                else $defaultView = 'slideshow';

                if($rows["commentsEnabled"]==0) $commentsval = 'comments off';
                else $commentsval = 'comments on';

                if($rows["toggleCaption"]== 'off') $captionval = 'captions hidden';
                else $captionval = 'captions shown';

        $newcategory = $rows["name"];

        //per category
        if($oldcategory != $newcategory){
        $output.= "</div></div>
                     <div class = \"categoryContainer\" id = \"".$rows["name"]."_container\">
                         <section class = \"categoryHeader\" data-category = \"".$rows["name"]."\" data-catid = \"".$rows["catid"]."\"><h2>".$rows["name"]."</h2><span class = \"date-created\">".$rows["date_created"]."</span>
                             <div class = \"arrowUp configarrows\"></div><div class = \"arrowDown configarrows\"></div>
                             <div class = \"categoryOptions\">
                                <button class = \"upload standardButton\" title = \"upload photos to this category\">upload</button>
                                <button class = \"transfer standardButton\" title = \"transfer photos to this category\">transfer to</button>
                                <button class = \"copy standardButton\" title = \"copy photos to this category\">copy to</button>
                                <button class = \"deleteCatButton standardButton\" title = \"delete this category\">delete</button>
                                <button class = \"toggleview toggle standardButton\" data-variable = \"defaultView\" title = \"change the default view\">".$defaultView."</button>
                                <button class = \"togglehidden toggle standardButton\" data-variable = \"hidden\" title = \"add or remove from public view\">".$hiddenval."</button>
                                <button class = \"togglesaveable toggle standardButton\" data-variable = \"saveable\" title = \"allow public to download images\">".$saveableval."</button>
                                <button class = \"togglecomments toggle standardButton\" data-variable = \"commentsEnabled\" title = \"allow public to view and leave comments\">".$commentsval."</button>
                                <button class = \"togglecaptions toggle standardButton\" data-variable = \"toggleCaption\" title = \"show photo captions by default\">".$captionval."</button>
                                <button class = \"thumbnaillarger standardButton\" title = \"make thumbnails larger\">+</button>
                                <button class = \"thumbnailsmaller standardButton\" title = \"make thumbnails smaller\">-</button>
                             </div>
                             <input class = \"cat_id_field\" name = \"catid[]\" type = \"hidden\" value=\"".$rows["catid"]."\"/>
                         </section>
                         <div class = \"sortableContainerCloned\" id = \"".$rows["name"]."_sortable_container_cloned\"></div>
                         <div class = \"sortableContainer\" id = \"".$rows["name"]."_sortable_container\">";
                if ($rows['filename']==NULL) continue;
        }

                $exif = array();
                $exif['camera_make'] = $rows['camera_make'] != '' ? $rows['camera_make'] : "<span class=\"not-available\">not available</span>";
                $exif['camera_model'] = $rows['camera_model'] != '' ? $rows['camera_model'] : "<span class=\"not-available\">not available</span>";
                $exif['exposure_time'] = $rows['exposure_time'] != '' ? $rows['exposure_time'].'s' : "<span class=\"not-available\">not available</span>";
                $exif['f_number'] = $rows['f_number'] != '' ? 'f'.$rows['f_number'] : "<span class=\"not-available\">not available</span>";
                $exif['iso'] = $rows['iso'] != '' ? $rows['iso'] : "<span class=\"not-available\">not available</span>";
                $exif['focal_length'] = $rows['focal_length'] != '' ? $rows['focal_length'].'mm' : "<span class=\"not-available\">not available</span>";
                $exif['date_taken'] = $rows['date_taken'] != '' ? substr(str_replace(':', '-', $rows['date_taken']), 0 , 10) : "<span class=\"not-available\">not available</span>";

        //per image
        $output.= "<div class = \"onesection left\"
                  data-category = \"".$rows["name"]."\"
                  data-caption = \"".$rows["caption"]."\"
                  data-filename = \"".$rows["filename"]."\"
                                    data-tags = \"".$rows["tags"]."\"
                  data-added = \"".$rows["date_added"]."\"
                  data-taken = \"".$rows["date_taken"]."\"
                  data-aperature = \"".$rows["f_number"]."\"
                  data-exposuretime = \"".$rows["exposure_time"]."\"
                  data-focallength = \"".$rows["focal_length"]."\"
                  data-iso = \"".$rows["iso"]."\">
                        <button class = \"standardButton delete\" title = \"delete this image\">X</button>
                        <ul class = \"photoInfo\">
                            <li>name: ".$rows["filename"]."</li>
                            <li>date added: ".$rows["date_added"]."</li>
                            <li>date taken: ".$exif['date_taken']."</li>
                            <li>aperature: ".$exif['f_number']."</li>
                            <li>shutter speed: ".$exif['exposure_time']."</li>
                            <li>focal length: ".$exif['focal_length']."</li>
                            <li>ISO: ".$exif['iso']."</li>
                        </ul>
                        <ul class = \"photoTags\">";
                        if($rows["tags"] != ""){
                          foreach(explode(",",$rows["tags"]) as $x){
                    $output.="<li>".$x."</li>";
                  }
                }
                        $output.="</ul>
            <img class = \"sortimage\" data-filename = \"".$rows["filename"]."\" data-imgid = \"".$rows["img_id"]."\"src = \"images/blank.png\" style = \"background-image: url(photothumbs/".$rows["filename"].")\" alt = \"\"/><br/>
              </div>";

        $oldcategory = $rows["name"];

        $counter++;
      }



echo json_encode($output);

  $connection = NULL;

?>
