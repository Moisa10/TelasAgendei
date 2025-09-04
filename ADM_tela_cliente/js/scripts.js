// Colapsar menu no desktop
const body = document.body;
const sidebar = document.querySelector('.sidebar');
const btnCollapse = document.querySelector('.btn-collapse');
const btnOpen = document.querySelector('.btn-open');

btnCollapse?.addEventListener('click', () => {
  body.classList.toggle('collapsed');
});

// Menu off-canvas no mobile
btnOpen?.addEventListener('click', () => {
  sidebar.classList.add('open');
});

document.addEventListener('click', (e) => {
  const clickInsideSidebar = sidebar.contains(e.target);
  const clickedOpen = btnOpen.contains(e.target);
  if (!clickInsideSidebar && !clickedOpen && sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
  }
});

// Exemplo de ação do botão CEP (substitua por busca real)
document.querySelector('.input-group .btn')?.addEventListener('click', () => {
  const cep = (document.getElementById('cep') as HTMLInputElement)?.value || '';
  if (!cep) alert('Informe um CEP para buscar.');
});