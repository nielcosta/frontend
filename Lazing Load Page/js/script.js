document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    const firstImage = images[0]; // A primeira imagem para foco inicial
    const maxBlur = 10; // Desfoque máximo em pixels
    // Distância do centro da tela para começar a desfocar.
    // Quanto menor esse valor, mais rápido o blur aparece ao se afastar do centro.
    const blurDistance = window.innerHeight * 0.4;

    // --- Função de Throttling para otimizar eventos de scroll e resize ---
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // --- Função para atualizar o desfoque das imagens ---
    function updateImageBlur() {
        const viewportCenter = window.innerHeight / 2;
        const scrollPosition = window.scrollY; // Posição atual do scroll

        images.forEach((img, index) => {
            // Apenas aplica o blur se a imagem já estiver carregada
            if (img.classList.contains('loaded')) {
                const imgRect = img.getBoundingClientRect();
                const imgCenter = imgRect.top + imgRect.height / 2;
                const distanceFromCenter = Math.abs(viewportCenter - imgCenter);

                let blurAmount = 0;

                // Lógica para a primeira imagem: foco total na posição inicial, perde foco ao rolar
                if (index === 0) {
                    // Calcula o blur baseado na distância do topo (scroll)
                    // Quanto mais scroll, mais blur na primeira imagem
                    const blurOnScroll = Math.min(scrollPosition / (window.innerHeight * 0.5), 1) * maxBlur;
                    blurAmount = blurOnScroll;
                } else {
                    // Lógica para as outras imagens: foco total no centro da tela
                    if (distanceFromCenter > 0) {
                        blurAmount = (distanceFromCenter / blurDistance) * maxBlur;
                        blurAmount = Math.min(blurAmount, maxBlur);
                    }
                }
                img.style.filter = `blur(${blurAmount}px)`;

            } else {
                // Imagem não carregada: mantém o blur máximo para indicar que está "escondida"
                img.style.filter = `blur(${maxBlur}px)`;
            }
        });
    }

    // --- Intersection Observer para Lazy Load ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.01
    };

    const imgObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const originalSrc = img.getAttribute('data-src');

                if (originalSrc) {
                    img.src = originalSrc;
                }

                img.onload = () => {
                    img.classList.add('loaded');
                    // Uma vez carregada, atualiza o blur imediatamente
                    updateImageBlur();
                };

                observer.unobserve(img); // Para de observar após o carregamento
            }
        });
    }, observerOptions);

    // --- Event Listeners para Lazy Load ---
    images.forEach(img => {
        imgObserver.observe(img);
    });

    // --- Configuração dos Vagalumes ---
    const firefliesContainer = document.querySelector('.fireflies-container');
    const numFireflies = 30; // Quantidade de vagalumes
    const fireflies = [];
    let mouseX = 0;
    let mouseY = 0;

    // Cria os elementos dos vagalumes
    for (let i = 0; i < numFireflies; i++) {
        const firefly = document.createElement('div');
        firefly.classList.add('firefly');
        firefliesContainer.appendChild(firefly);
        fireflies.push({
            element: firefly,
            x: Math.random() * window.innerWidth, // Posição inicial aleatória
            y: Math.random() * window.innerHeight,
            targetX: 0,
            targetY: 0,
            speed: Math.random() * 0.05 + 0.02, // Velocidade de perseguição
            delay: i * 50 // Atraso para criar o efeito de cauda
        });
    }

    // Atualiza a posição do mouse
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Função para animar os vagalumes
    function animateFireflies() {
        fireflies.forEach((firefly, index) => {
            // Define o alvo com um pequeno atraso para criar o efeito de rastro
            firefly.targetX = mouseX + Math.sin(index * 0.5) * 20; // Pequeno offset para dispersão
            firefly.targetY = mouseY + Math.cos(index * 0.5) * 20;

            // Move o vagalume gradualmente em direção ao alvo
            firefly.x += (firefly.targetX - firefly.x) * firefly.speed;
            firefly.y += (firefly.targetY - firefly.y) * firefly.speed;

            firefly.element.style.transform = `translate(${firefly.x}px, ${firefly.y}px)`;

            // Faz os vagalumes aparecerem e sumirem suavemente
            firefly.element.style.opacity = 0.7 + Math.sin(Date.now() / 500 + index) * 0.3; // Efeito de brilho pulsante
        });
        requestAnimationFrame(animateFireflies); // Loop de animação
    }

    // --- Início das funcionalidades ---
    // Chama a função de blur uma vez no carregamento inicial
    updateImageBlur();

    // Adiciona o listener de scroll com throttling
    window.addEventListener('scroll', throttle(updateImageBlur, 100));

    // Adiciona o listener de resize para recalcular o blur se a janela mudar de tamanho
    window.addEventListener('resize', throttle(updateImageBlur, 100));

    // Inicia a animação dos vagalumes
    animateFireflies();
});