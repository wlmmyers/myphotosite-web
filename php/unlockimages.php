<?php

//////////////////////////////////////////////////////////////
////////////////////// DATABASE STUFF ////////////////////////
//////////////////////////////////////////////////////////////
  extract( $_GET );

    $code = array('isabelle', 'Isabelle');
    $isvalid = FALSE;
    foreach($code as $val){
        if ($val == $_GET['thecode'])
        $isvalid = TRUE;
    }

    if($isvalid==TRUE)
    echo json_encode('cleared');
    else
    echo json_encode('notclear');

?>
