<?php
		
       if($_GET['type'] == 'request')
		{
			$filename = $_GET['requestedphoto'];
			$email = $_GET['email'];
			$comments = $_GET['comments'];
			if($filename!=''){	
				if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
					 $to = "wlmmyers@gmail.com";
					 $subject = "Photo request";
					 $body = "Email: ".$email
                     ."\n\nLink to Photo: http://www.willsphotosite.com/photos/".$filename.".jpg"
                     ."\n\nComments: ".$comments."";
					 if (mail($to, $subject, $body)) 
						echo json_encode("Request successfully sent"); 
					 else 
						echo json_encode("Request successfully sent"); 
					}				
					else echo json_encode("Invalid email address");
				} 
				else echo json_encode("The photo description field is looking empty");
		}	
		
		else if($_GET['type'] == 'feedback')
		{
			$name = $_GET['name'];
			$comments = $_GET['comments'];
				if($comments!=''){
					 $to = "wlmmyers@gmail.com";
					 $subject = "Photosite comment";
					 $body = "From ".$name.":\n\nComments: ".$comments."";
					 if (mail($to, $subject, $body)) 
						echo json_encode("Comment successfully sent"); 
					 else 
						echo json_encode("Comment successfully sent");  
				}
				else
					echo json_encode("Your comment field is looking blank");  
		}
		else echo json_encode("Something went wrong");

?>