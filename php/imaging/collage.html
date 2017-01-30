<?php

  include 'WideImage/WideImage.php';

  $filenamepre = '../../photos/';

  $outputfile = 'small.jpg';

  //$images = ['_MG_2306.jpg', 'IMG_4946.jpg', '_MG_1456.jpg', 'IMG_3824.jpg'];
  $images = [$_GET["file"]];

  $imagewidth = 800;

  $imageheight = 500;

  $spacing = 10;

  $resizetype = 'inside';

  $numimages = count($images);

  $outputimage = WideImage::load($filenamepre . $images[0])-> resize($imagewidth, $imageheight, $resizetype);

  $black = $outputimage->allocateColor(0, 0, 0);

  $outputimage = $outputimage-> resizeCanvas( ($spacing + ($numimages * ($imagewidth + $spacing) ) ) , ('100% +'. ($spacing * 2)), $spacing, $spacing, $black);

  for($x=1; $x<count($images); $x++){

    if(file_exists($filenamepre . $images[$x])){

      $tempimage = WideImage::load($filenamepre . $images[$x]);

      $tempimage = $tempimage -> resize($imagewidth, $imageheight, $resizetype);

      $outputimage = $outputimage -> merge( $tempimage, ( $spacing + ($imagewidth + $spacing) * $x ) , $spacing, 100);

      //$image = $image->crop(0,0, '100%', '50%');
    }
  }

  $outputimage->output('jpg', 90);

?>
