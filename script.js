// Script: tema, navegação suave, modal player e ações de login/convidado

// Seleções principais
const themeToggle = document.getElementById('themeToggle');
const playerModal = document.getElementById('playerModal');
const playerContainer = document.getElementById('playerContainer');
const closeModal = document.getElementById('closeModal');
const modalBackdrop = document.getElementById('modalBackdrop');

// Inicializa tema a partir do localStorage ou preferência do sistema
(function initTheme() {
    const saved = localStorage.getItem('pf_theme'); // 'light' ou 'dark'
    if (saved === 'light') document.documentElement.classList.add('light');
    else if (saved === 'dark') document.documentElement.classList.remove('light');
    else {
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        if (prefersLight) document.documentElement.classList.add('light');
    }
    // Atualiza atributo aria-pressed do botão
    if (themeToggle) {
        const isLight = document.documentElement.classList.contains('light');
        themeToggle.setAttribute('aria-pressed', String(isLight));
        themeToggle.textContent = isLight ? '🌞' : '🌗';
    }
})();

// Alterna tema e salva escolha
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isLight = document.documentElement.classList.toggle('light');
        localStorage.setItem('pf_theme', isLight ? 'light' : 'dark');
        themeToggle.setAttribute('aria-pressed', String(isLight));
        themeToggle.textContent = isLight ? '🌞' : '🌗';
    });
}

// Navegação suave para âncoras internas com leve animação de destaque
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // animação de destaque breve
        target.animate([{ filter: 'brightness(1.15)' }, { filter: 'brightness(1)' }], { duration: 500 });
    });
});

// Abre modal e insere iframe usando playerflixapi (conforme documentação)
function openPlayerFor(element) {
    playerContainer.innerHTML = '';
    const type = element.dataset.type;
    let src = '';
    if (type === 'filme') {
        const imdb = element.dataset.imdb;
        if (!imdb) return alert('IMDB ID ausente');
        src = `https://playerflixapi.com/filme/${encodeURIComponent(imdb)}`;
    } else if (type === 'serie') {
        const tmdb = element.dataset.tmdb;
        const season = element.dataset.season || 1;
        const episode = element.dataset.episode || 1;
        if (!tmdb) return alert('TMDB ID ausente');
        src = `https://playerflixapi.com/serie/${encodeURIComponent(tmdb)}/${encodeURIComponent(season)}/${encodeURIComponent(episode)}`;
    } else return;

    // Cria iframe e mostra modal
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    playerContainer.appendChild(iframe);
    playerModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

// Fecha modal e remove iframe
function closePlayer() {
    playerModal.setAttribute('aria-hidden', 'true');
    playerContainer.innerHTML = '';
    document.body.style.overflow = '';
}

// Eventos de fechamento
if (closeModal) closeModal.addEventListener('click', closePlayer);
if (modalBackdrop) modalBackdrop.addEventListener('click', closePlayer);
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePlayer(); });

// Delegação: clique em card abre player
document.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card) openPlayerFor(card);
});

// Botão "Entrar como Convidado" (em login.html) -> salva estado minimal e redireciona
(function guestHandler() {
    const guestBtn = document.querySelector('[data-guest]');
    if (guestBtn) {
        guestBtn.addEventListener('click', (ev) => {
            ev.preventDefault();
            localStorage.setItem('pf_user', JSON.stringify({ guest: true, name: 'Convidado' }));
            window.location.href = 'index.html';
        });
    }
})();

// Form contato: evitamos envio real (exemplo)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Mensagem enviada! Obrigado pelo contato.');
        contactForm.reset();
    });
}
