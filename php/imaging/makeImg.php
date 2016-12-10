<?php

	include 'WideImage/WideImage.php';

	$filenamepre = '../../photos/';

	$outputfile = 'small.jpg';

	$image = $_GET["file"];

	$imagewidth = $_GET["width"];

	$imageheight = $_GET["height"];

	$spacing = 10;

	$resizetype = 'inside';

	$outputimage = WideImage::load($filenamepre . $image)-> resize($imagewidth, $imageheight, $resizetype);

	$outputimage->output('jpg', 90);

?>