// Colapsar menu (desktop) e abrir/fechar (mobile)
const body = document.body;
const sidebar = document.querySelector('.sidebar');
const btnCollapse = document.querySelector('.btn-collapse');
const btnOpen = document.querySelector('.btn-open');

btnCollapse?.addEventListener('click', () => body.classList.toggle('collapsed'));
btnOpen?.addEventListener('click', () => sidebar.classList.add('open'));
document.addEventListener('click', (e) => {
  const inside = sidebar.contains(e.target);
  const openBtn = btnOpen?.contains(e.target);
  if (!inside && !openBtn && sidebar.classList.contains('open')) sidebar.classList.remove('open');
});

// Switch "Ativo" -> muda texto/ cor
const ativo = document.getElementById('ativo');
const statusLabel = document.getElementById('status-label');
ativo?.addEventListener('change', () => {
  statusLabel.textContent = ativo.checked ? 'Ativo' : 'Inativo';
  statusLabel.style.color = ativo.checked ? '#16a34a' : '#6b7280';
});

// Botão "+Nova" categoria -> adiciona opção rapidamente
const btnNovaCat = document.getElementById('btn-nova-cat');
const selectCat = document.getElementById('categoria');
btnNovaCat?.addEventListener('click', () => {
  const nome = prompt('Nova categoria:');
  if (nome && nome.trim()) {
    const opt = document.createElement('option');
    opt.value = nome.trim();
    opt.textContent = nome.trim();
    selectCat.appendChild(opt);
    selectCat.value = opt.value;
  }
});

// Máscara simples de preço (R$ 1.234,56)
const preco = document.getElementById('preco');
preco?.addEventListener('input', () => {
  const digits = preco.value.replace(/\D/g, '');
  if (!digits) { preco.value = ''; return; }
  const cents = digits.padStart(3,'0');
  const inteiro = cents.slice(0, -2);
  const dec = cents.slice(-2);
  const inteiroBR = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  preco.value = `${inteiroBR},${dec}`;
});

// Submit exemplo
document.getElementById('service-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Serviço salvo com sucesso!');
});