<?php
define('EMAIL_SENDER_NAME', 'Yocle Team');
define('EMAIL_SENDER_ADRS', 'noreply@yocle.net');
//$email_sender = [EMAIL_SENDER_ADRS => EMAIL_SENDER_ADRS];
//$email_sender = [EMAIL_SENDER_ADRS => EMAIL_SENDER_NAME];
$email_sender = EMAIL_SENDER_ADRS;

function sendEmail($email_sender2, $recipients, $subject, $body){
	global $test_qs;
	$result = 0;
	$debug = isset($test_qs);

	//$debug = 1;	// for testing only

	$server = my_server_url();
	
	$email_host = '';
	$email_username = '';
	$email_password = '';
	switch ($server){
		case 'https://yocle.net':
		case 'https://yocle.net/dev':
		case 'https://www.yocle.net':
		case 'https://www.yocle.net/dev':
			$email_host = 'gmail'; $email_username = 'alantypoon@gmail.com'; $email_password = 'vbisgreat';
			//$email_host = 'localhost'; $email_username = 'alan'; $email_password = 'btrtmrcool';
			break;
			
		case 'https://yolofolio2.cetl.hku.hk:18443':
			$email_host = 'smtproam.hku.hk';
			$email_username = 'yfolio@hku.hk';
			$email_password = 'rnquXky0rn';
			break;
	}
	if ($debug){
		echo "server=$server<br/>emailhost=$email_host<br/>email_username=$email_username<br/>email_password=$email_password<br/>";
	}

	if ($email_host && $email_username && $email_password){

		// send confirmation email
		if ($email_host == 'gmail'){
			$transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, 'ssl');
		} else {
			$transport = Swift_SmtpTransport::newInstance($email_host, 25);
		}

		// transport
		$transport
			->setUsername($email_username)
			->setPassword($email_password)
		;
		if ($debug){
			echo "sender=$email_sender2<br/> recipients=$recipients<br/> body=$body<br/>";
		}

		// Create the Mailer using your created Transport
		$mailer = Swift_Mailer::newInstance($transport);
		//$logger = new \Swift_Plugins_Loggers_EchoLogger(); $mailer->registerPlugin(new \Swift_Plugins_LoggerPlugin($logger));	// testing only
		$message = Swift_Message::newInstance($subject)
			->setFrom($email_sender2)
			->setTo($recipients)
			->setBody($body)
		;
		// Send the message
		$result = $mailer->send($message);
	}
	// debug
	$tmp = "sendEmail: server=$server sender=$email_sender2 recipients=$recipients subject=$subject body=$body";
	if ($debug){
		echo "$tmp<br><br>";
	} else {
		wlog($tmp);
	}
	return $result;
}

/////////////////////////////////////////////////////////////////////

function sendEmail_confirmation($username, $email, $secret_token){
	global $test_qs, $email_sender;
	$recipients = $email;
	$server = my_server_url();
	$url = "$server/?confirmed_email=$email&secret_token=$secret_token";
	$subject = 'Yolofolio Account Confirmation';
	$body = "Dear $username,\r\n\r\nThank you for signing up with Yolofolio. Please click the following link to continue:\r\n\t$url\r\n\r\nBest regards,\r\n\r\nYolofolio Team";
	sendEmail($email_sender, $recipients, $subject, $body);	
}

/////////////////////////////////////////////////////////////////////

function sendEmail_forgotpwd($username, $email, $secret_token){
	global $test_qs, $email_sender;
	$recipients = $email;
	$server = my_server_url();
	$url = "$server/?confirmed_email=$email&reset_pwd=$secret_token";
	$subject = 'Yolofolio Reset Password Request';
	$body = "Dear $username,\r\n\r\nWe have received a request to reset your password. " .
					"Please click the following link to continue:\r\n\t$url\r\n\r\n".
					"In case if the request is not made by you, please contact us.\r\n\r\n".
					"Best regards,\r\n Yolofolio Team";
	sendEmail($email_sender, $recipients, $subject, $body);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function sendEmail_invitation($coor_name, $confirmed_email, $user_email, $user_types, $activity){
	global $test_qs, $email_sender;
	global $database, $error, $type, $email, $pwd, $error, $output, $secret, $template_user, $user_id;
	$debug = isset($test_qs);
	$debug = 0;
	if ($debug){
		echo "sendEmail_invitation: $user_email<br><br>";
	}
	$server = my_server_url();
	if (!$confirmed_email){
		$url = "$server/?signupemail=$user_email";
	} else {
		$url = "$server/?act_id=$activity->act_id"; 
	}
	$subject = "Yocle Invitation: $activity->title";
	$body = "Hello,\r\n\r\n"
	
					."$coor_name would like to invite you to be $user_types in the activity named:\r\n\r\n"
					."     $activity->title .\r\n\r\n"
					
					."Please check this out at:\r\n\r\n"
					."     $url\r\n\r\n"
					
					."\r\n\r\n"
					."Best regards,\r\n\r\n"
					."Yocle Team";
					
	sendEmail($email_sender, $user_email, $subject, $body);
}
?>