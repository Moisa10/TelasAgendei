// Toggle do menu mobile
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');

toggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

// Ano no rodapé
document.getElementById('year').textContent = String(new Date().getFullYear());
document.getElementById('year')?.replaceChildren(String(new Date().getFullYear()));

// Fechar menu ao clicar em link (mobile)
nav?.addEventListener('click', (e) => {
  const target = e.target;
  if (target instanceof HTMLAnchorElement && nav.classList.contains('open')) {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  }
});