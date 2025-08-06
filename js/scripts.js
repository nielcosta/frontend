document.addEventListener('DOMContentLoaded', function() {
    // Seleciona o formulário pelo seu seletor
    const form = document.querySelector('.formulario form');

    // Adiciona um 'ouvinte' de evento para o envio do formulário
    form.addEventListener('submit', function(event) {
        // Previne o comportamento padrão de recarregar a página
        event.preventDefault();

        // Obtém os valores dos campos do formulário
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('e-mail').value;
        const celular = document.getElementById('celular').value;
        const mensagem = document.getElementById('mensagem').value;

        // Seu número de telefone do WhatsApp (incluindo o código do país, como 55 para o Brasil)
        const numeroWhatsApp = '5522998082922'; 

        // Cria a mensagem para o WhatsApp
        
        const textoWhatsApp = `Olá, meu nome é ${encodeURIComponent(nome)}.
E-mail: ${encodeURIComponent(email)}
Celular: ${encodeURIComponent(celular)}

Mensagem:
${encodeURIComponent(mensagem)}`;

        // Cria a URL da API do WhatsApp
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${textoWhatsApp}`;

        // Abre o link em uma nova aba
        window.open(urlWhatsApp, '_blank');

        // Opcional: Limpar o formulário após o envio
        form.reset();
    });
});

// MENU DE NAVEGAÇÃO
const btnAbrirMenu = document.querySelector('.btn-abrir-menu');
const menuMobile = document.querySelector('.menu-mobile');
const btnFecharMenu = document.querySelector('.btn-fechar');

btnAbrirMenu.addEventListener('click', () => {
    menuMobile.classList.add('abrir-menu');
});

btnFecharMenu.addEventListener('click', () => {
    menuMobile.classList.remove('abrir-menu');
});

// Opcional: Fecha o menu quando um link é clicado
const menuLinks = document.querySelectorAll('.menu-mobile a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuMobile.classList.remove('abrir-menu');
    });
});

// ANIMAÇÃO DE NAVEGAÇÃO (CORRIGIDO)
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os links com um atributo href que começa com '#'
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const targetId = link.getAttribute('href');

            if (targetId === '#') {
                // Rola para o topo da página se o href for '#'
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // Caso contrário, rola para o elemento com o ID correspondente
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});