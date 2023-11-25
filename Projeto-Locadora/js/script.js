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

// Obtém o elemento do link contato
const linkContato = document.querySelector(".contato a");

// Obtém o elemento da âncora contato
const anchorContato = document.getElementById("contato");

// Adiciona o evento de clique ao link contato
linkContato.addEventListener("click", function() {
  // Roda a página até a âncora
  window.scrollTo({ top: anchorContato.getBoundingClientRect().top, behavior: "smooth" });
});