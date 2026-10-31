/* Arranque automático: 1 de novembro de 2026, 00:00 Portugal. */
(function(root){
  'use strict';
  const start=Date.parse('2026-11-01T00:00:00Z'),end=Date.parse('2026-12-01T00:00:00Z');
  function activation(host,search,now=Date.now()){
    const main=['www.bzronline.com','bzronline.com'].includes(host),dev=host==='bzronline-dev.redicom.work';
    const params=new URLSearchParams(search),review=main && params.get('bf-demo')==='1';
    const live=main && now>=start && now<end;
    // Teste real autorizado antes do arranque; o link normal da Rita continua sem envios.
    const liveTest=review && now<start && params.get('bf-live-test')==='1';
    return {allowed:dev||review||live,live,review,preview:review&&!liveTest,liveTest,nextActivation:main&&now<start?start:null,start,end};
  }
  if(typeof module!=='undefined' && module.exports)module.exports={activation};
  if(root)root.BazarClubActivation=activation;
})(typeof window!=='undefined'?window:null);

(function(){
  let timer;
  function load(){
    clearTimeout(timer);
    const state=window.BazarClubActivation(location.hostname,location.search);
    if(document.querySelector('script[data-bazarclub-distribution]'))return;
    if(!state.allowed){
      if(state.nextActivation)timer=setTimeout(load,Math.min(Math.max(0,state.nextActivation-Date.now()),2147483647));
      return;
    }
    const script=document.createElement('script');script.dataset.bazarclubDistribution='2026';
    script.src='https://cdn.jsdelivr.net/gh/1marcomachado/teste@14b5e5ab2b3ebe3ea3a0355af143135e25dfe91d/bazarclub-2026.js';document.head.appendChild(script);
  }
  load();document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')load();});
})();
