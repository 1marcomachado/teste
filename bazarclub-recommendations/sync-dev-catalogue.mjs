import fs from 'node:fs/promises';
import {csvRows,classify} from './feed-recommendations.mjs';
const url='https://www.bzronline.com/extend/chatgpt_ads/feed_165516b2a377377a48bce2580f20ef3b.csv';
let text,modified;
if(process.argv[2]){text=await fs.readFile(process.argv[2],'utf8');modified=process.argv[3];}
else {const r=await fetch(url,{signal:AbortSignal.timeout(60000)});if(!r.ok)throw Error('Feed HTTP '+r.status);text=await r.text();modified=r.headers.get('last-modified');}
if(!Number.isFinite(Date.parse(modified))||Date.now()-Date.parse(modified)>26*3600000)throw Error('Stale source');
const sourceRows=csvRows(text);
const fields=['item_id','title','availability','price','sale_price','image_url','url','brand','color'];
// Only fields already published in the shop's public feed; no stock counts or sales.
const grouped=new Map();
for(const row of sourceRows){
 const key=row.item_id.split('|')[0],old=grouped.get(key),variants=old?.variants||[];
 variants.push({sku:row.item_id,size:row.size||row.item_id.split('|')[1],availability:row.availability,price:row.price,sale_price:row.sale_price||''});
 if(!old||old.availability!=='in_stock'&&row.availability==='in_stock')grouped.set(key,{...Object.fromEntries(fields.map(k=>[k,row[k]||''])),variants});
}
if(grouped.size<1000)throw Error('Incomplete public source');
await fs.writeFile(new URL('./public-source.json',import.meta.url),JSON.stringify({modified,generatedAt:new Date().toISOString(),rows:[...grouped.values()]}));
const groups=new Set();
const rows=csvRows(text).filter(r=>{
  const group=r.item_id.split('|')[0];
  if(groups.has(group)||r.availability!=='in_stock'||r.is_ads_eligible!=='true'||!['care','socks','caps','bags','backpacks'].includes(classify(r.title).category))return false;
  groups.add(group);return true;
});
if(!rows.length)throw Error('Empty catalogue');
await fs.writeFile(new URL('./dev-catalogue.json',import.meta.url),JSON.stringify({modified,generatedAt:new Date().toISOString(),rows}));
console.log('Exported '+rows.length+' available dev product groups');

