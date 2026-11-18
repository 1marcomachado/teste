import fs from 'node:fs/promises';
import {csvRows,classify} from './feed-recommendations.mjs';
const url='https://www.bzronline.com/extend/chatgpt_ads/feed_165516b2a377377a48bce2580f20ef3b.csv';
let text,modified;
if(process.argv[2]){text=await fs.readFile(process.argv[2],'utf8');modified=process.argv[3];}
else {const r=await fetch(url,{signal:AbortSignal.timeout(60000)});if(!r.ok)throw Error('Feed HTTP '+r.status);text=await r.text();modified=r.headers.get('last-modified');}
if(!Number.isFinite(Date.parse(modified))||Date.now()-Date.parse(modified)>26*3600000)throw Error('Stale source');
const groups=new Set();
const rows=csvRows(text).filter(r=>{
  const group=r.item_id.split('|')[0];
  if(groups.has(group)||r.availability!=='in_stock'||r.is_ads_eligible!=='true'||!['care','socks','caps','bags','backpacks'].includes(classify(r.title).category))return false;
  groups.add(group);return true;
});
if(!rows.length)throw Error('Empty catalogue');
await fs.writeFile(new URL('./dev-catalogue.json',import.meta.url),JSON.stringify({modified,generatedAt:new Date().toISOString(),rows}));
console.log('Exported '+rows.length+' available dev product groups');

