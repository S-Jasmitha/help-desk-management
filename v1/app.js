const form=document.getElementById('ticketForm'), message=document.getElementById('message');
form.addEventListener('submit',e=>{e.preventDefault();const title=document.getElementById('title').value.trim(),description=document.getElementById('description').value.trim(),priority=document.getElementById('priority').value;
if(!title||!description){message.innerHTML='<div class="notice error">Please fill in all required fields.</div>';return}
const tickets=JSON.parse(localStorage.getItem('helpdesk-tickets-v1')||'[]');
const ticket={id:'TKT-'+String(Date.now()).slice(-6),title,description,priority,status:'Open',createdAt:new Date().toLocaleString()};
tickets.unshift(ticket);localStorage.setItem('helpdesk-tickets-v1',JSON.stringify(tickets));
message.innerHTML=`<div class="notice">✓ Ticket ${ticket.id} created successfully!</div>`;form.reset();});
