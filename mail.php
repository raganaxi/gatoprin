<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] != "POST") {
   header("HTTP/1.1 405 Method not allowed");
    echo 'Message could not be sent.' ;
        die();
}
// Variables
$name = isset($_REQUEST["name"]) ? $_REQUEST["name"]:'';
$mail = isset($_REQUEST["mail"])? $_REQUEST["mail"]: '';
$msg = isset($_REQUEST["message"])? $_REQUEST["message"]: '';

// Varios destinatarios
$to  = 'raganaxi@gmail.com';
$from = 'contacto@gatoprin.com';

// título
$title = 'Gatoprin - Contacto';

// mensaje
$message  = "";
$message .= "Nombre: " . $name . "\r\n <br />";
$message .= "Correo: " . $mail . "\r\n <br />";
$message .= "Pregunta: " . $msg . "\r\n <br />";


$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
try {
    
    //Server settings
    $mail->SMTPDebug = 0;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    //$mail->Host = 'smtp1.example.com;smtp2.example.com';  // Specify main and backup SMTP servers
    //$mail->SMTPAuth = true;                               // Enable SMTP authentication
    //$mail->Username = 'user@example.com';                 // SMTP username
    //$mail->Password = 'secret';                           // SMTP password
    //$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    //$mail->Port = 587;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom($from, 'Gatoprin');
    $mail->addAddress($to);     // Add a recipient


    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = $title;
    $mail->Body    = $message;
    $mail->AltBody = $message;

    $mail->send();
    echo 'Message has been sent: '.$message;
} catch (Exception $e) {
    header("HTTP/1.1 500 ERROR");
    echo 'Message could not be sent. Mailer Error: '. $mail->ErrorInfo;
	
}