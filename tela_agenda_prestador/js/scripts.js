// Inicializa calendário Flatpickr e carrega compromissos
document.addEventListener('DOMContentLoaded', () => {
  // Locale PT
  if (window.flatpickr && window.flatpickr.l10ns && window.flatpickr.l10ns.pt) {
    // ok
  }

  const calendarEl = document.getElementById('calendar');
  const appointmentsContainer = document.getElementById('appointments');
  const titleEl = document.querySelector('.agenda-title');
  const countEl = document.getElementById('appointment-count');

  // Função para formatar data em pt-BR
  const fmtLong = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day:'2-digit', month:'long', year:'numeric' });
  const fmtISO = (date) => date.toISOString().slice(0,10); // YYYY-MM-DD

  // Mock local (fallback se fetch falhar)
  const mock = {
    '2025-10-10': [
      { id: 1, name: 'João Silva',  service: 'Corte de Cabelo Simples', time: '09:00' },
      { id: 2, name: 'Pedro Oliveira', service: 'Barba',                 time: '11:30' },
      { id: 3, name: 'Carlos Mendes', service: 'Corte Degradê',          time: '14:00' },
      { id: 4, name: 'Lucas Ferreira', service: 'Corte + Barba',         time: '16:30' }
    ]
  };

  // Busca dados (ex.: /data/appointments.json)
  async function fetchAppointments(dateISO){
    try{
      const res = await fetch(`/data/appointments.json?date=${dateISO}`, {cache:'no-store'});
      if(res.ok){
        const all = await res.json();
        return all[dateISO] || [];
      }
    }catch(e){
      // console.warn('Usando mock:', e);
    }
    return mock[dateISO] || [];
  }

  // Renderiza agendamentos
  function renderAppointments(date, list){
    const long = fmtLong.format(date);
    titleEl.textContent = long.charAt(0).toUpperCase() + long.slice(1);
    countEl.textContent = `${list.length} agendamento${list.length===1?'':'s'}`;

    if(list.length === 0){
      appointmentsContainer.innerHTML = `
        <div class="appointment">
          <div class="app-left">
            <strong class="app-name">Sem agendamentos</strong>
            <span class="app-service">Escolha outra data.</span>
          </div>
        </div>
      `;
      return;
    }

    appointmentsContainer.innerHTML = list.map(a => `
      <div class="appointment" data-id="${a.id}">
        <div class="app-left">
          <strong class="app-name">${a.name}</strong>
          <span class="app-service">${a.service}</span>
        </div>
        <div class="app-right">
          <span class="app-time">${a.time}</span>
          <div class="actions">
            <button class="btn btn-primary btn-update" type="button">Atualizar</button>
            <button class="btn btn-danger btn-cancel"  type="button">Cancelar</button>
          </div>
        </div>
      </div>
    `).join('');

    // listeners por item
    appointmentsContainer.querySelectorAll('.btn-update').forEach(btn => {
      btn.addEventListener('click', (ev) => {
        const row = ev.currentTarget.closest('.appointment');
        const id = row?.dataset.id;
        alert(`Atualizar agendamento #${id}`);
        // Aqui você abriria um modal ou tela de edição
      });
    });

    appointmentsContainer.querySelectorAll('.btn-cancel').forEach(btn => {
      btn.addEventListener('click', (ev) => {
        const row = ev.currentTarget.closest('.appointment');
        const id = row?.dataset.id;
        const ok = confirm(`Deseja cancelar o agendamento #${id}?`);
        if(ok){
          // Exemplo simples: remove visualmente
          row?.remove();
          // Aqui você chamaria sua API para cancelar efetivamente
        }
      });
    });
  }

  // Inicializa flatpickr
  const fp = flatpickr(calendarEl, {
    inline: true,
    dateFormat: "Y-m-d",
    locale: flatpickr.l10ns.pt,
    defaultDate: new Date(),
    onChange: async (selectedDates) => {
      if(!selectedDates?.length) return;
      const date = selectedDates[0];
      const iso = fmtISO(date);
      const data = await fetchAppointments(iso);
      renderAppointments(date, data);
    },
    onReady: async (selectedDates) => {
      // carregamento inicial
      const date = selectedDates?.[0] || new Date();
      const iso = fmtISO(date);
      const data = await fetchAppointments(iso);
      renderAppointments(date, data);
    }
  });
});
