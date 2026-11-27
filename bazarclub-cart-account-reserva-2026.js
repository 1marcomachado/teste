(function(){
  'use strict';
  function accountId(w,d){
    const valid=v=>/^\d{1,30}$/.test(String(v||''))?String(v):'';
    // This is recognition, not a server-verifiable proof of identity.
    // Read Redicom's own config without executing it or requiring analytics consent.
    let found=false,id='';
    for(const script of Array.from(d.scripts||[])){
      if(script.src)continue;
      const text=script.textContent||'';
      if(!text.includes('user_id'))continue;
      const configs=text.matchAll(/gtag\(\s*['"]config['"]\s*,\s*['"][^'"]+['"]\s*,\s*\{([^}]{0,3000})/g);
      for(const config of configs){
        const match=config[1].match(/(?:['"]user_id['"]|\buser_id)\s*:\s*(?:['"]([^'"]*)['"]|(null|\d+))/);
        if(match){found=true;id=valid(match[1]??match[2]);}
      }
    }
    if(found)return id;
    for(const layer of [w.dataLayer,w.rccGtagLayer]){
      if(!Array.isArray(layer))continue;
      for(const entry of layer){
        if(entry?.[0]!=='config'||!entry[2]||!Object.prototype.hasOwnProperty.call(entry[2],'user_id'))continue;
        found=true;id=valid(entry[2].user_id);
      }
    }
    return found?id:valid(w.BazarClubFormConfig?.userId);
  }
  if(typeof module==='object'&&module.exports)module.exports={accountId};
  if(typeof window==='undefined'||typeof document==='undefined')return;
  if(!['www.bzronline.com','bzronline-dev.redicom.work'].includes(location.hostname)||location.pathname!=='/checkout/v1/'||window.__bcAccountLoader)return;
  window.__bcAccountLoader=true;
  function start(){
    const preview=new URLSearchParams(location.search).get('bf-cart-review')==='1';
    const id=preview?'':accountId(window,document);
    window.BazarClubFormConfig={...(window.BazarClubFormConfig||{}),userId:id};
    const script=document.createElement('script');script.defer=true;
    script.src=preview?'https://cdn.jsdelivr.net/gh/1marcomachado/teste@f940180e920425e0a0f6bdffa89742723cb432fd/bazarclub-cart-dev-2026.js':'https://cdn.jsdelivr.net/gh/1marcomachado/teste@96746f3d7c63e779da17ef21846ef94d09043b56/bazarclub-cart-reserva-27-30.js';
    document.head.appendChild(script);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
