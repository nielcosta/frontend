const mmenu = document.querySelector('.mmobile');
const mmenuUl = document.querySelector('.mmobile ul');
const body = document.body;

mmenu.addEventListener('click', function() {
  if (mmenuUl.style.display === 'block') {
    mmenuUl.style.display = 'none';
    mmenu.style.backgroundImage = 'url("../img/menu.png")';
    body.style.overflow = 'auto'; // opcional: permite rolar a página novamente
  } else {
    mmenuUl.style.display = 'block';
    mmenu.style.backgroundImage = 'url("../img/close.png")';
    body.style.overflow = 'hidden'; // opcional: impede rolar a página
  }
});


document.getElementById("Formulario_Unes").addEventListener("submit", function(event) {
  event.preventDefault(); // Impede o envio do formulário padrão
  
  // Obter os dados do formulário
  var formData = new FormData(this);
  
  // Criar uma requisição HTTP
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "email.php"); // Substitua "enviar_email.php" pelo arquivo que irá processar o envio do email
  xhr.onload = function() {
    if (xhr.status === 200) {
      alert("Mensagem enviada com sucesso!");
      // Limpar o formulário após o envio
      document.getElementById("Formulario_Unes").reset();
    } else {
      alert("Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.");
    }
  };
  xhr.send(formData);
});