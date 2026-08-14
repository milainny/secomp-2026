const schedule = {
  18: [
    ['08h00','Abertura e Coffee break','Encontro','Auditório José Berton','Marcelo'],
    ['08h30','Oficina I · Mineração de Repositórios de Software','Oficina','Laboratório de Informática','João Paulo'],
    ['13h30','Oficina II · Simulação de Sistemas Complexos (Python)','Oficina','Laboratório de Informática','Willyan H. P. Bertolino'],
    ['15h30','Atividade online','Online','Laboratório de Informática · online','A confirmar']
  ],
  19: [
    ['08h30','Feira Tecnológica','Mostra','Auditório José Berton','Lisandro R. Modesto'],
    ['10h30','Feira Tecnológica','Mostra','Auditório José Berton','Lisandro R. Modesto'],
    ['13h30','Oficina IV · Introdução à segurança cibernética','Oficina','Laboratório de Informática','Alisson UEM / Lailla'],
    ['13h30','Oficina IV · Python na criação de agentes de IA','Oficina','Laboratório de Informática','Evandro TCS / Lailla']
  ],
  20: [
    ['08h30','Hackathon · Preparação da ideia dos alunos','Hackathon','Laboratório de Informática','Pegasus · Brena · João S. · João D.'],
    ['10h30','Hackathon · Programação do projeto','Hackathon','Laboratório de Informática','Pegasus · Brena · João S. · João D.'],
    ['13h30','Oficina V · Do Front ao Back: Construindo um App','Oficina','Laboratório de Informática','Pegasus · Brena · João S. · João D.'],
    ['15h30','Oficina VI · Seguras na Rede','Oficina','Laboratório de Informática','Pegasus · Brena · Nathalia · Madu · Sara']
  ]
};
const list = document.querySelector('#event-list');
function render(day){list.innerHTML=schedule[day].map(([time,title,type,place,host])=>`<article class="event"><time class="event-time">${time}</time><div class="event-title">${title}</div><span class="tag">${type}</span><div><div class="event-place">${place}</div><div class="event-host">${host}</div></div></article>`).join('')}
document.querySelectorAll('.tab').forEach(tab=>tab.addEventListener('click',()=>{document.querySelector('.tab.active').classList.remove('active');document.querySelector('.tab[aria-selected="true"]').setAttribute('aria-selected','false');tab.classList.add('active');tab.setAttribute('aria-selected','true');render(tab.dataset.day)}));
render(18);
