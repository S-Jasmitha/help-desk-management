const demo=[
{id:'TKT-1001',title:'Login not working',description:'Unable to log in to the portal since morning.',priority:'High',status:'Open',createdAt:'27/10/2026, 09:30'},
{id:'TKT-1002',title:'Page not loading',description:'Dashboard page takes too long to load.',priority:'Medium',status:'Open',createdAt:'27/10/2026, 10:15'},
{id:'TKT-1003',title:'Request new feature',description:'Please add a dark mode option.',priority:'Low',status:'Open',createdAt:'27/10/2026, 11:00'}
];
let tickets=JSON.parse(localStorage.getItem('helpdesk-tickets-v3')||'null');if(!tickets){tickets=demo;localStorage.setItem('helpdesk-tickets-v3',JSON.stringify(tickets))}
function save(){localStorage.setItem('helpdesk-tickets-v3',JSON.stringify(tickets))}
function closeTicket(id){const t=tickets.find(x=>x.id===id);if(!t||t.status==='Resolved')return;t.status='Resolved';save();document.getElementById('message').innerHTML=`<div class="notice">✓ Ticket ${escapeHtml(id)} has been resolved successfully!</div>`;render()}
function render(){document.getElementById('summary').innerHTML=`<p style="color:#64748b">Total: <b>${tickets.length}</b> &nbsp; Open: <b>${tickets.filter(t=>t.status!=='Resolved').length}</b> &nbsp; Resolved: <b>${tickets.filter(t=>t.status==='Resolved').length}</b></p>`;
if(!tickets.length){document.getElementById('ticketTable').innerHTML='<div class="empty">No tickets found yet.</div>';return}
document.getElementById('ticketTable').innerHTML=`<table><thead><tr><th>Ticket ID</th><th>Issue</th><th>Priority</th><th>Status</th><th>Action</th></tr></thead><tbody>${tickets.map(t=>`<tr><td>${escapeHtml(t.id)}</td><td><b>${escapeHtml(t.title)}</b><br><small>${escapeHtml(t.description)}</small></td><td><span class="pill ${t.priority.toLowerCase()}">${t.priority}</span></td><td><span class="pill ${t.status==='Resolved'?'resolved':'open'}">${t.status}</span></td><td>${t.status==='Resolved'?'<button disabled>✓ Resolved</button>':`<button onclick="closeTicket('${escapeHtml(t.id)}')">Close Ticket</button>`}</td></tr>`).join('')}</tbody></table>`}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}render();
