<?php

$files = array('responsive.css' , 'responsive.js' , 'dialogs.js' , 'events.js' , 'index.html');

if($argv[1]){
  $additionalfiles = explode(',', $argv[1]);
  $files = array_merge($files , $additionalfiles);
}

function get_web_page( $url,$curl_data )
{
    $options = array(
        CURLOPT_RETURNTRANSFER => true,         // return web page
        CURLOPT_ENCODING       => "",           // handle all encodings
        CURLOPT_POST           => 1,            // i am sending post data
        CURLOPT_POSTFIELDS     => $curl_data,   // this are my post vars
        CURLOPT_SSL_VERIFYHOST => 0,            // don't verify ssl
        CURLOPT_SSL_VERIFYPEER => false,        //
        CURLOPT_VERBOSE        => 1             //
    );

    $ch      = curl_init($url);
    curl_setopt_array($ch,$options);
    $content = curl_exec($ch);
    $err     = curl_errno($ch);
    $errmsg  = curl_error($ch) ;
    $header  = curl_getinfo($ch);
    curl_close($ch);
    return $content;
}

foreach($files as $file){
  $curl_data = "a=zone_file_purge&tkn=24e591ed51b9ec5c4475d9c2cc7c748c1c77f&email=wlmmyers@gmail.com&z=willsphotosite.com&url=http://www.willsphotosite.com/".$file;
  $url = "https://www.cloudflare.com/api_json.html";
  $response = get_web_page($url,$curl_data);
    print_r($response);
}

?>
