// Alternar colapso no desktop e abrir/fechar no mobile
const body = document.body;
const sidebar = document.querySelector('.sidebar');
const btnCollapse = document.querySelector('.btn-collapse');
const btnOpen = document.querySelector('.btn-open');

btnCollapse?.addEventListener('click', () => {
  body.classList.toggle('collapsed');
});

// Mobile: abrir/fechar menu
btnOpen?.addEventListener('click', () => {
  sidebar.classList.add('open');
});
document.addEventListener('click', (e) => {
  const clickInsideSidebar = sidebar.contains(e.target);
  const clickOpenBtn = btnOpen.contains(e.target);
  if (!clickInsideSidebar && !clickOpenBtn && sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
  }
});