/* BAZARclub: teste exclusivo no domínio Redicom de desenvolvimento. */
(function(){
  if(location.hostname!=='bzronline-dev.redicom.work')return;
  const style=document.createElement('style');
  style.textContent='.bc-dialog{position:fixed;inset:0;margin:auto}.bc-dialog.bc-side{margin:0 0 0 auto}';
  document.head.appendChild(style);
  const script=document.createElement('script');
  script.src='https://cdn.jsdelivr.net/gh/1marcomachado/teste@7d62909dab4139fbce34c76870ad345df1e9bcfc/bazarclub-dev.js';
  script.defer=true;
  document.head.appendChild(script);
})();
