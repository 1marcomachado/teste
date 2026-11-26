(function(){
  'use strict';
  if(window.__bzrBlackFridayMenu2026)return;
  window.__bzrBlackFridayMenu2026=true;
  const selector='header li.sub-sub > a, #menu .wrapper-sub-mobile .sub-mobile:not(.sub) > li > a';
  function mark(){
    document.querySelectorAll(selector).forEach(a=>{
      if(a.textContent.trim().replace(/\s+/g,' ').toLowerCase()==='black friday')a.classList.add('bzr-black-friday-menu');
    });
  }
  function start(){
    const style=document.createElement('style');style.id='bzr-black-friday-menu-style';
    style.textContent=`
header li.sub-sub > a.bzr-black-friday-menu,
#menu .wrapper-sub-mobile a.bzr-black-friday-menu{background:#ef4036!important;color:#fff!important;border-radius:3px!important;text-decoration:none!important;box-shadow:none!important}
header li.sub-sub > a.bzr-black-friday-menu{padding:5px 10px!important}
header li.sub-sub:hover > a.bzr-black-friday-menu,
header li.sub-sub > a.bzr-black-friday-menu:hover,
#menu .wrapper-sub-mobile a.bzr-black-friday-menu:hover{background:#d9352c!important;color:#fff!important}
a.bzr-black-friday-menu:focus-visible{outline:2px solid #fff!important;outline-offset:2px!important}
`;
    document.head.appendChild(style);mark();
    let queued=false;
    new MutationObserver(records=>{
      if(queued||!records.some(r=>r.addedNodes.length))return;
      queued=true;requestAnimationFrame(()=>{queued=false;mark();});
    }).observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
