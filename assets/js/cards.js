import{loadRepository,esc,norm,evidenceHtml}from'./data-loader.js';

const d=await loadRepository();
let cat='all',stance='all',q='';

document.getElementById('title').textContent=d.meta.title;
document.getElementById('subtitle').textContent=d.meta.subtitle;
document.getElementById('notice').textContent=d.meta.data_notice||'';
const stanceColor=s=>d.taxonomy.stances[s]||'#64748b';

function filters(){
    document.getElementById('categories').innerHTML=`<button class="filter ${cat==='all'?'active':''}" data-cat="all"><span>Tous les acteurs</span><b>${d.actors.length}</b></button>`+Object.entries(d.taxonomy.categories).map(([k,v])=>`<button class="filter ${cat===k?'active':''}" data-cat="${k}"><span>${esc(v.label||k)}</span><b>${d.actors.filter(a=>a.categories.includes(k)).length}</b></button>`).join('');
    document.getElementById('stances').innerHTML=`<button class="filter ${stance==='all'?'active':''}" data-stance="all"><span>Toutes les positions</span><b>${d.actors.length}</b></button>`+Object.entries(d.taxonomy.stances).map(([k,color])=>`<button class="filter ${stance===k?'active':''}" data-stance="${k}"><span>${esc(k)}</span><b>${d.actors.filter(a=>a.position===k).length}</b></button>`).join('');
}

function render(){
    const list=d.actors.filter(a=>{
        const text=norm([a.name,a.role,a.relation].join(' '));
        return (cat==='all'||a.categories.includes(cat))&&(stance==='all'||a.position===stance)&&(!q||text.includes(q));
    });
    document.getElementById('count').textContent=`${list.length} acteurs affichés sur ${d.actors.length}`;
    document.getElementById('grid').innerHTML=list.map(a=>`<article class="card" data-id="${a.id}" style="--stance:${stanceColor(a.position)}"><h3>${esc(a.name)}</h3><div class="role">${esc(a.role)}</div><p class="position">${esc(a.relation||'Position non renseignée')}</p><div class="footer"><span class="badge">${esc(a.position)}</span><span>Certitude : ${esc(a.certainty||'Non qualifiée')}</span></div></article>`).join('');
}

function open(id){
    const a=d.actorById.get(id);
    const rel=d.relations.filter(r=>r.source_id===id||r.target_id===id);
    document.getElementById('detail').innerHTML=`<h2>${esc(a.name)}</h2><p class="role">${esc(a.role)}</p><h3>Position / Contexte</h3><p>${esc(a.relation||'Non renseignée')}</p><p><b>Certitude :</b> ${esc(a.certainty||'Non qualifiée')}</p><h3>Preuves et sources</h3>${evidenceHtml(d,a.evidenceIds)}<h3>Relations documentables</h3>${rel.length?rel.map(r=>{
        const other=d.actorById.get(r.source_id===id?r.target_id:r.source_id);
        return `<div class="relation"><button data-open="${other?.id}">${esc(other?.name||'Acteur inconnu')}</button><div><b>${esc(r.type)}</b></div><p>${esc(r.summary)}</p><small>Sujet : ${esc(r.subject)} · Dynamique : ${esc(r.evolution)}</small></div>`;
    }).join(''):'<p class="muted">Aucune relation qualifiée.</p>'}`;
    document.getElementById('dialog').showModal();
}

document.addEventListener('click',e=>{
    const c=e.target.closest('[data-cat]'),s=e.target.closest('[data-stance]'),card=e.target.closest('.card'),op=e.target.closest('[data-open]');
    if(c){cat=c.dataset.cat;filters();render();}
    if(s){stance=s.dataset.stance;filters();render();}
    if(card)open(card.dataset.id);
    if(op)open(op.dataset.open);
});

document.getElementById('search').addEventListener('input',e=>{q=norm(e.target.value);render();});
document.getElementById('reset').onclick=()=>{cat='all';stance='all';q='';document.getElementById('search').value='';filters();render();};
document.querySelector('.close').onclick=()=>document.getElementById('dialog').close();

filters();
render();
