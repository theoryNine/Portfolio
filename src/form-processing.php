<?php $email = $_POST['email'];
$reason = $_POST['ContactReason'];
$message = $_POST['message'];
$formcontent="From: $email \n Contact Reason: $reason \n Message: $message";
$recipient = "anselcolvin@gmail.com";
$subject = "Contact Form";
$mailheader = "From: $email \r\n";
mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
echo "Thank You!";
?>
