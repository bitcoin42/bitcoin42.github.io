<?php

/**
* Subscription Form Processing
*
* Send subscriber email to your mailchimp mailing list
*
* @author Sven Creations <svencreations@gmail.com>
* @version 2.0
*/


/*	MailChimp Configuration
Replace "YOUR_API_KEY_HERE" with your own MailChimp API Key
Replace "YOUR_LIST_ID_HERE" with your own MailChimp List ID

"The MailChimp double opt-in process is a two-step process, where a subscriber fills out your signup form and receives an email with a link to confirm their subscription."
Change $double_opt_in to true if you want to enable it

change $verify_peer to false if you gets error "null" on subscription
Read before disabling:
http://snippets.webaware.com.au/howto/stop-turning-off-curlopt_ssl_verifypeer-and-fix-your-php-config/
*/
$api_key = "bb68f84620300a009d88e23e6";
$list_id = "757973705e";
$double_opt_in = false;
$verify_peer = true;


require('MailChimp.php');
use \DrewM\MailChimp\MailChimp;

/*	Validate input data
@param string $data Form Input Data
*/
function process_input($data) {
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}

if($double_opt_in) {
	$status = 'pending';
} else {
	$status = 'subscribed';
}

if(!empty($_POST)){

	if(isset($_POST["email"])) {
		$email = process_input($_POST["email"]);
	} else {
		echo json_encode(array('error' => true, 'message' => 'It is not a valid email address'));
		exit;
	}

	if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		echo json_encode(array('error' => true, 'message' => 'It is not a valid email address'));
		exit;
	} else {
		$MailChimp = new MailChimp($api_key);

		if($verify_peer) {
			$MailChimp->verify_ssl = true;
		} else {
			$MailChimp->verify_ssl = false;
		}

		$result = $MailChimp->post('lists/' .$list_id. '/members', array(
			'email_address'     => $email,
			'status'            => $status
		));
		if($result['status'] == $status) {
			echo json_encode(array('error' => false, 'message' => 'Thanks for subscribing with us'));
			exit;
		} else {
			echo json_encode(array('error' => true, 'message' => $result['title']));
			exit;
		}

	}
}
?>
