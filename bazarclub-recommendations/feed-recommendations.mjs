// Dev-only catalogue recommendations. No membership or email operations.
const FEED='https://www.bzronline.com/extend/chatgpt_ads/feed_165516b2a377377a48bce2580f20ef3b.csv';
const DEV='https://bzronline-dev.redicom.work';
let feedCache, feedPending;
export function csvRows(text){
  const rows=[];let row=[],cell='',quoted=false;
  for(let i=0;i<text.length;i++){
    const c=text[i];
    if(c==='"'){if(quoted&&text[i+1]==='"'){cell+='"';i++;}else quoted=!quoted;}
    else if(c===','&&!quoted){row.push(cell);cell='';}
    else if(c==='\n'&&!quoted){row.push(cell.replace(/\r$/,''));rows.push(row);row=[];cell='';}
    else cell+=c;
  }
  if(quoted)throw Error('invalid_csv');
  if(cell||row.length){row.push(cell.replace(/\r$/,''));rows.push(row);}
  const keys=rows.shift().map(k=>k.replace(/^\uFEFF/,''));
  for(const k of ['item_id','title','price','availability','url','image_url'])if(!keys.includes(k))throw Error('invalid_csv');
  return rows.filter(r=>r.length===keys.length).map(r=>Object.fromEntries(keys.map((k,i)=>[k,r[i]])));
}
export function euro(s){const m=/^(\d+)\.(\d{2}) EUR$/.exec(s||'');return m?Number(m[1])*100+Number(m[2]):null;}
export function classify(s){
  const n=s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const category=/limpeza|crep protect|protetor de calcado/.test(n)?'care':/^meias\b/.test(n)?'socks':/^bone\b/.test(n)?'caps':/^mochila\b/.test(n)?'backpacks':/^bolsa\b/.test(n)?'bags':/sapatilh|chuteir|sandali|bota|chinelo|pantufa/.test(n)?'footwear':'other';
  // shortcut: the feed has no age/gender taxonomy; ambiguous wearable items are excluded.
  const age=/bebe|baby|crib/.test(n)?'baby':/crianca|junior|\bjun\b|\bjr\b|kids|\bchild/.test(n)?'child':/homem|mulher|unissexo|unisex/.test(n)?'adult':'unknown';
  const audience=/mulher/.test(n)?'women':/homem/.test(n)?'men':/unissexo|unisex/.test(n)?'unisex':'unknown';
  return {category,age,audience};
}
export function chooseFeed(rows,body,devMap){
  const missing=11990-body.subtotalCents;
  if(missing<=0)return [];
  const primary=classify(body.title);const present=new Set(body.skus.map(s=>s.split('|')[0]));
  const byGroup=new Map();
  for(const r of rows){
    const group=r.item_id.split('|')[0],devId=devMap[group];
    if(!devId||present.has(group)||r.availability!=='in_stock'||r.is_ads_eligible!=='true')continue;
    const c=classify(r.title);
    if(!['care','socks','caps','bags','backpacks'].includes(c.category)||c.category===primary.category)continue;
    if(c.category!=='care' && !(c.age===primary.age&&c.age!=='unknown'&&(c.audience==='unisex'||c.audience===primary.audience)&&c.audience!=='unknown'))continue;
    const regular=euro(r.price),price=r.sale_price?euro(r.sale_price):regular;
    if(!price||!regular||price>regular)continue;
    let image;try{image=new URL(r.image_url);if(image.protocol!=='https:')continue;}catch{continue;}
    if(!byGroup.has(group))byGroup.set(group,{group,name:r.title,image:image.href,priceCents:price,originalPriceCents:regular,category:c.category,url:DEV+'/pt/item_'+devId+'.html'});
  }
  let pool=[...byGroup.values()];let selected=pool.filter(p=>p.priceCents>=missing&&p.priceCents<=missing+2500);
  if(!selected.length)selected=pool.filter(p=>p.priceCents>=missing&&p.priceCents<=missing+5000);
  if(!selected.length)selected=pool;
  selected.sort((a,b)=>Math.abs(a.priceCents-missing)-Math.abs(b.priceCents-missing)||a.group.localeCompare(b.group));
  const counts={};return selected.filter(p=>(counts[p.category]=(counts[p.category]||0)+1)<=6).slice(0,12);
}
async function loadFeed(){
  if(feedCache&&Date.now()-feedCache.checked<300000)return feedCache;
  if(feedPending)return feedPending;
  feedPending=(async()=>{
    const response=await fetch('https://raw.githubusercontent.com/1marcomachado/teste/main/bazarclub-recommendations/dev-catalogue.json',{signal:AbortSignal.timeout(10000)});
    if(!response.ok)throw Error('feed_unavailable');
    if(Number(response.headers.get('content-length'))>25000000)throw Error('feed_too_large');
    const text=await response.text();if(text.length>25000000)throw Error('feed_too_large');
    const data=JSON.parse(text),modified=data.modified;
    if(!Number.isFinite(Date.parse(modified))||Date.now()-Date.parse(modified)>26*3600000||!Number.isFinite(Date.parse(data.generatedAt))||Date.now()-Date.parse(data.generatedAt)>3*3600000||!Array.isArray(data.rows)||data.rows.length>5000)throw Error('feed_stale');
    feedCache={rows:data.rows,checked:Date.now(),modified};return feedCache;
  })();
  try{return await feedPending;}finally{feedPending=null;}
}
export async function feedRecommendations(request,devMap){
  const headers={'Content-Type':'application/json','Cache-Control':'no-store','Vary':'Origin'};
  const reply=(data,status=200)=>new Response(JSON.stringify(data),{status,headers});
  if(request.headers.get('Origin')!==DEV)return reply({error:'origin_not_allowed'},403);
  Object.assign(headers,{'Access-Control-Allow-Origin':DEV,'Access-Control-Allow-Methods':'POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type'});
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers});
  if(request.method!=='POST')return reply({error:'method_not_allowed'},405);
  try{
    const raw=await request.text();if(raw.length>8192)return reply({error:'invalid_cart'},400);
    const body=JSON.parse(raw);
    if(!Number.isSafeInteger(body.subtotalCents)||body.subtotalCents<0||body.subtotalCents>10000000||typeof body.title!=='string'||body.title.length>300||!Array.isArray(body.skus)||body.skus.length>100||body.skus.some(s=>typeof s!=='string'||s.length>160))return reply({error:'invalid_cart'},400);
    if(body.subtotalCents>=11990)return reply({products:[]});
    const data=await loadFeed();
    return reply({products:chooseFeed(data.rows,body,devMap),sourceUpdatedAt:data.modified,ranking:'price-and-title',testOnly:true});
  }catch{return reply({error:'recommendations_unavailable'},503);}
}
