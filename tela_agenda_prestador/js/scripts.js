document.addEventListener('DOMContentLoaded', function() {
    const datesContainer = document.getElementById('dates');
    const daysInMonth = 31; // Exemplo para Maio
    const appointmentsData = {
        19: [
            { name: 'João Silva', service: 'Corte de Cabelo Simples', time: '09:00' },
            { name: 'Pedro Oliveira', service: 'Barba', time: '11:30' },
            { name: 'Carlos Mendes', service: 'Corte Degradê', time: '14:00' },
            { name: 'Lucas Ferreira', service: 'Corte + Barba', time: '16:30' }
        ]
    };

    for (let i = 1; i <= daysInMonth; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.add('date');

        button.addEventListener('click', function() {
            document.querySelector('.date.selected')?.classList.remove('selected');
            button.classList.add('selected');
            updateAgendaDetails(i);
        });

        datesContainer.appendChild(button);
    }

    function updateAgendaDetails(day) {
        const appointments = appointmentsData[day] || [];
        document.getElementById('selected-date').textContent = `Selecionado: ${day} de Maio`;
        document.getElementById('appointment-count').textContent = `${appointments.length} agendamentos`;

        const appointmentsContainer = document.getElementById('appointments');
        appointmentsContainer.innerHTML = appointments.map(a => `
            <div class="appointment">
                <div>
                    <strong>${a.name}</strong><br>
                    ${a.service}
                </div>
                <time>${a.time}</time>
            </div>
        `).join('');
    }
});