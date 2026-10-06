export async function loadRepository(base="../../"){
  const paths={
    meta:"data/meta.json",
    actors:"data/actors.json",
    evidence:"data/evidence.json",
    relations:"data/relations.json",
    sources:"data/sources.json",
    taxonomy:"config/taxonomy.json"
  };
  const entries=await Promise.all(Object.entries(paths).map(async([k,p])=>[k,await fetch(base+p).then(r=>{if(!r.ok)throw new Error(p);return r.json()})]));
  const d=Object.fromEntries(entries);
  d.actorById=new Map(d.actors.map(x=>[x.id,x]));
  d.evidenceById=new Map(d.evidence.map(x=>[x.id,x]));
  d.sourceById=new Map(d.sources.map(x=>[x.id,x]));
  return d;
}

export const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
export const norm=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

export function actorClaim(d,id){
  const a = d.actorById.get(id);
  if(!a) return null;
  return {
    value: a.position,
    summary: a.relation,
    certainty: a.certainty,
    evidence_ids: a.evidenceIds || []
  };
}

export function evidenceHtml(d,ids=[]){
  if(!ids||!ids.length)return '<p class="muted">Aucune preuve structurée.</p>';
  return ids.map(id=>{
    const e=d.evidenceById.get(id);
    if(!e)return '';
    const srcs=(e.sourceIds||[]).map(sid=>d.sourceById.get(sid)).filter(Boolean);
    const textHtml = `<b>${esc(e.claim)}</b>` + (e.verbatim ? `<br><small><i>"${esc(e.verbatim)}"</i></small>` : '');
    const srcHtml = srcs.length ? srcs.map(src=>src.url?`<a target="_blank" rel="noopener" href="${esc(src.url)}">${esc(src.publisher||src.title)}</a>`:esc(src.publisher||src.title)).join(' · ') : 'Source à qualifier';
    return `<article class="proof"><div>${textHtml}</div><small>${srcHtml}</small></article>`;
  }).join('');
}
