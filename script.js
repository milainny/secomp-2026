const schedule = {
  18: [
    ['08h00', 'Abertura e Coffee break', 'Encontro', 'Auditório José Berton', 'Todos', null],
    ['08h30', 'Mineração de Repositórios de Software', 'Oficina', 'Laboratório de Informática', 'João Paulo', 'https://forms.gle/4xeQgNcDz14ppZp19'],
    ['13h30', 'Simulação de Sistemas Complexos (Python)', 'Oficina', 'Laboratório de Informática', 'Willyan H. P. Bertolino', 'https://forms.gle/VhqGKeNAoTAzAGFeA'],
    ['15h30', 'Robocode: Programe seu Próprio Agente Inteligente', 'Oficina', 'Laboratório de Informática', 'Felipe / UTFPR', 'https://forms.gle/W1xrmYctHQPPDYcq9']
  ],
  19: [
    ['08h30', 'Feira Tecnológica', 'Mostra', 'Auditório José Berton', 'Todos', null],
    ['13h30', 'Introdução à segurança cibernética', 'Oficina', 'Laboratório de Informática', 'Alisson UEM', 'https://forms.gle/N4G5LwxERvjm5ZMc7'],
    ['13h30', 'Python na criação de agentes de IA', 'Oficina', 'Laboratório de Informática', 'Evandro TCS', 'https://forms.gle/u42r4oUmWj867dPv8']
  ],
  20: [
    ['08h30', 'Hackathon · Preparação da ideia dos alunos', 'Hackathon', 'Laboratório de Informática', 'Pegasus', 'https://forms.gle/j5iRfxVexBN5NimFA'],
    ['13h30', 'Do Front ao Back: Construindo um App', 'Oficina', 'Laboratório de Informática', 'Pegasus', 'https://forms.gle/vmC7p484hJxxFQAr5'],
    ['15h30', 'Seguras na Rede', 'Oficina', 'Laboratório de Informática', 'Pegasus', 'https://forms.gle/VxoEdBi3rQq8uotLA']
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
