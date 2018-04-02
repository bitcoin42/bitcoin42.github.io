<?php 
//////////////////////////
//Specify default values//
//////////////////////////

//Your E-mail
$your_email = 'contact@bitcoin42.com.mx';

//Default Subject if 'subject' field not specified
$default_subject = 'From My Contact Form';

//Message if 'name' field not specified
$name_not_specified = 'Please type a valid name';

//Message if e-mail sent successfully
$email_was_sent = 'Thanks, your message successfully sent';

//Message if e-mail not sent (server not configured)
$server_not_configured = 'Sorry, mail server not configured (function "mail()" disabled on your server?)';


///////////////////////////
//Contact Form Processing//
///////////////////////////
$errors = array();

//"name" field required by this PHP script even if 
// there are no 'aria-required="true"' or 'required' 
// attributes on this HTML input field
if(isset($_POST['name'])) {
	
	if(!empty($_POST['name']))
		$sender_name  = stripslashes(strip_tags(trim($_POST['name'])));
	
	if(!empty($_POST['message']))
		$message      = stripslashes(strip_tags(trim($_POST['message'])));
	
	if(!empty($_POST['email']))
		$sender_email = stripslashes(strip_tags(trim($_POST['email'])));
	
	if(!empty($_POST['subject']))
		$subject      = stripslashes(strip_tags(trim($_POST['subject'])));


	//Message if no sender name was specified
	if(empty($sender_name)) {
		$errors[] = $name_not_specified;
	}

	$from = "MIME-Version: 1.0" . "\r\n" ;
	$from .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
	$from .= (!empty($sender_email)) ? 'From: '.$sender_email : '';

	$subject = (!empty($subject)) ? $subject : $default_subject;


	//sending message if no errors
	if(empty($errors)) {
		
		//duplicating email meta (from and subject) to email message body
		$message_meta = '';
			//From name and email
		$message_meta .= 'From: '. $sender_name . ' ' . $sender_email . "<br>";
			//Subject or default subject
		$message_meta .= 'Subject: '. ( $subject ? $subject : $default_subject ) . "<br>";

		//adding another CUSTOM contact form fields that added by user to email message body
		foreach ($_POST as $key => $value) {
			//checking for standard fields 
			if ($key == 'name' || $key == 'message' || $key == 'subject' || $key == 'email'  ) {
				continue;
			}
			//adding key-value pare to email message body
			$message_meta .= stripslashes(strip_tags(trim($key))) . ': ' . stripslashes(strip_tags(trim($value))) . "<br>";
		}

		$message = $message_meta . "<br>" . 'Message:' . "<br>" . $message;
		$message = wordwrap($message, 70);
	
		if (mail($your_email, $subject, $message, $from)) {
			echo $email_was_sent;
		} else {
			$errors[] = $server_not_configured;
			echo '<span class="form-errors">' . implode('<br>', $errors ) . '</span>';
		}
	} else {
		echo '<span class="form-errors">' . implode('<br>', $errors ) . '</span>';
	}
} else {
	// if "name" var not send ('name' attribute of contact form input field was changed or missing)
	echo '"name" variable were not received by server. Please check "name" attributes for your input fields';
}
?>