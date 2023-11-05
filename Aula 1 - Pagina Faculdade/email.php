<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST["nome"];
    $email = $_POST["email"];
    $assunto = $_POST["assunto"];
    $mensagem = $_POST["mensagem"];
    
    $to = "nielcosta@outlook.com"; // Endereço de email para onde a mensagem será enviada
    $subject = "Nova mensagem do formulário de contato";
    $message = "Nome: " . $nome . "\n\n";
    $message .= "Email: " . $email . "\n\n";
    $message .= "Assunto: " . $assunto . "\n\n";
    $message .= "Mensagem: " . $mensagem;
    $headers = "From: " . $email;
    
    if (mail($to, $subject, $message, $headers)) {
        echo "Mensagem enviada com sucesso!";
    } else {
        echo "Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.";
    }
}
?>