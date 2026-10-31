/* Principal: ativação exclusivamente por ?bf-demo=1. Dev: teste normal. */
(function(){
  const dev=location.hostname==='bzronline-dev.redicom.work';
  const demo=['www.bzronline.com','bzronline.com'].includes(location.hostname)&&new URLSearchParams(location.search).get('bf-demo')==='1';
  if(!dev&&!demo)return;
  if(document.querySelector('script[data-bazarclub-distribution]'))return;
  const script=document.createElement('script');
  script.dataset.bazarclubDistribution='2026';
  script.src='https://cdn.jsdelivr.net/gh/1marcomachado/teste@a25e0311b247c67f159312c6d16ef6c90c2a894a/bazarclub-2026.js';
  document.head.appendChild(script);
})();

