/* Principal: ativação exclusivamente por ?bf-demo=1. Dev: teste normal. */
(function(){
  const dev=location.hostname==='bzronline-dev.redicom.work';
  const demo=['www.bzronline.com','bzronline.com'].includes(location.hostname)&&new URLSearchParams(location.search).get('bf-demo')==='1';
  if(!dev&&!demo)return;
  if(document.querySelector('script[data-bazarclub-distribution]'))return;
  const script=document.createElement('script');
  script.dataset.bazarclubDistribution='2026';
  script.src='https://cdn.jsdelivr.net/gh/1marcomachado/teste@3c762a8f135483787879b5d94dc1ee454987cb03/bazarclub-2026.js';
  document.head.appendChild(script);
})();

