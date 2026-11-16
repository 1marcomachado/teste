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
    script.src='https://cdn.jsdelivr.net/gh/1marcomachado/teste@b0e97a39956099dccc97abf9f30434eb797ccd28/bazarclub-2026.js';document.head.appendChild(script);
  }
  load();document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')load();});
})();

;(() => {
  if (new URLSearchParams(location.search).get('mostra_letra') !== 'sim') return;

  const id = 'bzr-preview-oswald-700';
  if (document.getElementById(id)) return;

  const fontUrl = 'https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap';
  if (!document.querySelector(`link[rel~="stylesheet"][href="${fontUrl}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = fontUrl;
    document.head.appendChild(link);
  }

  const style = document.createElement('style');
  style.id = id;
  style.textContent = `
    #main .contentTitles_title, #containerSite .contentTitles_title {
      font-family: Oswald, Arial, sans-serif !important;
      font-weight: 700 !important;
    }
  `;
  document.head.appendChild(style);
})();
