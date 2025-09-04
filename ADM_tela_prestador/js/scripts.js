// Colapsar menu no desktop
const body = document.body;
const sidebar = document.querySelector('.sidebar');
const btnCollapse = document.querySelector('.btn-collapse');
const btnOpen = document.querySelector('.btn-open');

btnCollapse?.addEventListener('click', () => {
  body.classList.toggle('collapsed');
});

// Abrir/fechar menu no mobile (off-canvas)
btnOpen?.addEventListener('click', () => {
  sidebar.classList.add('open');
});

document.addEventListener('click', (e) => {
  const clickInsideSidebar = sidebar.contains(e.target);
  const clickedOpen = btnOpen && btnOpen.contains(e.target);
  if (!clickInsideSidebar && !clickedOpen && sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
  }
});

// Exemplo de ação do botão CEP (placeholder para futura integração)
document.querySelector('.input-group .btn')?.addEventListener('click', () => {
  const cepInput = document.getElementById('cep');
  const cep = cepInput && 'value' in cepInput ? cepInput.value.trim() : '';
  if (!cep) {
    alert('Informe um CEP para buscar.');
  } else {
    // Aqui você pode integrar com ViaCEP ou outro serviço.
    console.log('Buscar CEP:', cep);
  }
});