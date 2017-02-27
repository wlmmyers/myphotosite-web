<?php

  if ($_POST['type'] == 'request') {
    $filename = $_POST['requestedphoto'];
    $email = $_POST['email'];
    $comments = $_POST['comments'];

    if ($filename!='') {

      if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
       $to = "wlmmyers@gmail.com";
       $subject = "Photo request";
       $body = "Email: ".$email
                 ."\n\nLink to Photo: http://www.willsphotosite.com/photos/".$filename.".jpg"
                 ."\n\nComments: ".$comments."";

       if (mail($to, $subject, $body))
        echo json_encode({ "message": "Request successfully sent" } });
       else
        echo json_encode({ "message": "Request successfully sent" });
      } else echo json_encode({ "message": "Invalid email address" });
    } else echo json_encode({ "message": "The photo description field is looking empty" });

  } else if ($_POST['type'] == 'feedback') {
    $name = $_POST['name'];
    $comments = $_POST['comments'];

    if ($comments!='') {
       $to = "wlmmyers@gmail.com";
       $subject = "Photosite comment";
       $body = "From ".$name.":\n\nComments: ".$comments."";

       if (mail($to, $subject, $body))
        echo json_encode({ "message": "Comment successfully sent" });
       else
        echo json_encode({ "message": "Comment successfully sent" });
    } else {
      echo json_encode({ "message": "Your comment field is looking blank" });
    }
  } else {
    echo json_encode({ "message": "Something went wrong" });
  }
?>
