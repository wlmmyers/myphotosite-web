<?php
  extract( $_GET );

  $code = array('isabelle', 'Isabelle');
  $isvalid = FALSE;
  foreach($code as $val) {
    if ($val == $_GET['thecode']) {
      $isvalid = TRUE;
    }
  }

  if($isvalid==TRUE) {
    echo json_encode( (object) array("message" => "Success") );
  } else {
    echo json_encode( (object) array("message" => "Failed") );
  }

?>
