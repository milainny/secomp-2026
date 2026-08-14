const schedule = {
  18: [
    ['08h00', 'Abertura e Coffee break', 'Encontro', 'Auditório José Berton', 'Marcelo', null],
    ['08h30', 'Oficina I · Mineração de Repositórios de Software', 'Oficina', 'Laboratório de Informática', 'João Paulo', null],
    ['13h30', 'Oficina II · Simulação de Sistemas Complexos (Python)', 'Oficina', 'Laboratório de Informática', 'Willyan H. P. Bertolino', null],
    ['15h30', 'Oficina III · Robocode: Programe seu Próprio Agente Inteligente', 'Oficina', 'Laboratório de Informática · online', 'Felipe / UTFPR', null]
  ],
  19: [
    ['08h30', 'Feira Tecnológica', 'Mostra', 'Auditório José Berton', 'Lisandro R. Modesto', null],
    ['10h30', 'Feira Tecnológica', 'Mostra', 'Auditório José Berton', 'Lisandro R. Modesto', null],
    ['13h30', 'Oficina IV · Introdução à segurança cibernética', 'Oficina', 'Laboratório de Informática', 'Alisson UEM / Lailla', 'https://forms.gle/gk8NHoceSEC9arE17'],
    ['13h30', 'Oficina IV · Python na criação de agentes de IA', 'Oficina', 'Laboratório de Informática', 'Evandro TCS / Lailla', null]
  ],
  20: [
    ['08h30', 'Hackathon · Preparação da ideia dos alunos', 'Hackathon', 'Laboratório de Informática', 'Pegasus · Brena · João S. · João D.', null],
    ['10h30', 'Hackathon · Programação do projeto', 'Hackathon', 'Laboratório de Informática', 'Pegasus · Brena · João S. · João D.', null],
    ['13h30', 'Oficina V · Do Front ao Back: Construindo um App', 'Oficina', 'Laboratório de Informática', 'Pegasus · Brena · João S. · João D.', null],
    ['15h30', 'Oficina VI · Seguras na Rede', 'Oficina', 'Laboratório de Informática', 'Pegasus · Brena · Nathalia · Madu · Sara', null]
  ]
};

const list = document.querySelector('#event-list');
const workshopSelect = document.querySelector('#selected-workshop');
const formMessage = document.querySelector('#form-message');
const workshops = Object.values(schedule).flat().filter(([, , type]) => type === 'Oficina');

workshops.forEach(([, title]) => workshopSelect.add(new Option(title, title)));

function render(day) {
  list.innerHTML = schedule[day].map(([time, title, type, place, host, link]) => {
    const registration = type === 'Oficina'
      ? (link
        ? `<a class="register-button" href="${link}" target="_blank" rel="noopener">Inscrever-se →</a>`
        : `<button class="register-button" type="button" data-workshop="${title}">Inscrever-se →</button>`)
      : '';
    return `<article class="event"><time class="event-time">${time}</time><div class="event-title">${title}</div><span class="tag">${type}</span><div><div class="event-place">${place}</div><div class="event-host">${host}</div></div>${registration}</article>`;
  }).join('');
}

document.querySelectorAll('.tab').forEach(tab => tab.addEventListener('click', () => {
  document.querySelector('.tab.active').classList.remove('active');
  document.querySelector('.tab[aria-selected="true"]').setAttribute('aria-selected', 'false');
  tab.classList.add('active');
  tab.setAttribute('aria-selected', 'true');
  render(tab.dataset.day);
}));

list.addEventListener('click', event => {
  const button = event.target.closest('[data-workshop]');
  if (!button) return;
  workshopSelect.value = button.dataset.workshop;
  document.querySelector('#inscricoes').scrollIntoView({ behavior: 'smooth', block: 'center' });
  formMessage.textContent = 'Oficina selecionada. Continue para abrir o formulário de inscrição.';
});

document.querySelector('#registration-form').addEventListener('submit', event => {
  event.preventDefault();
  formMessage.textContent = workshopSelect.value ? 'O link do formulário desta oficina ainda precisa ser configurado pela organização.' : 'Selecione uma oficina para continuar.';
});

render(18);
