(async function moveKlarna_onlyWhenLastUnitsFlag(){
  const KL_SEL  = '.rdc-product-klarna-placement';
  const BTN_SEL = '#fixedDiv .buttons.clearfix';

  const sleep = (ms)=>new Promise(r=>setTimeout(r,ms));
  async function waitForEl(sel, timeout=10000){
    const t0=Date.now();
    while (Date.now()-t0 < timeout){
      const el=document.querySelector(sel);
      if (el) return el;
      await sleep(120);
    }
    return null;
  }

  function totalUnits(){
    const labels = document.querySelectorAll('.sizes label[qtd]');
    let sum = 0;
    labels.forEach(l=>{
      const q = parseInt(l.getAttribute('qtd'),10);
      if (Number.isFinite(q) && q>0) sum += q;
    });
    return sum;
  }

  const norm = s => (s||'').toString()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/\s+/g,' ').trim().toLowerCase();

  // variantes aceites para a flag
  const LAST_UNITS_VARIANTS = [
    'Últimas unidades', 'Ultimas unidades', '¡Últimas unidades!', 'Last units', 'LAST UNITS'
  ].map(norm);

  function hasLastUnitsFlag(){
    const flags = Array.from(document.querySelectorAll('.product-info .flags .flag'));
    return flags.some(f => LAST_UNITS_VARIANTS.includes(norm(f.textContent)));
  }

  async function waitForLastUnitsFlag(timeout=8000){
    const t0 = Date.now();
    await waitForEl('.flags', timeout);
    while (Date.now()-t0 < timeout){
      if (hasLastUnitsFlag()) return true;
      await sleep(120);
    }
    return false;
  }

  if (!document.querySelector('style[data-lastunits-alert]')){
    const st=document.createElement('style');
    st.setAttribute('data-lastunits-alert','');
    st.textContent = `
      .lastunits-alert{
        display:flex; align-items:flex-start; gap:10px;
        border:2px solid #EB5A3C; color:#EB5A3C;
        border-radius:10px; padding:12px 14px; font-family: Arial, Helvetica, 'Segoe UI', sans-serif; margin:10px 0;
      }
      .lastunits-alert__icon{ width:18px; height:18px; flex:0 0 18px; fill:currentColor; margin-top:2px; }
      .lastunits-alert__title{ display:block; font-weight:800; text-transform:uppercase; margin-bottom:4px; }
      .lastunits-alert__desc{ margin:0; font-size:13px; line-height:1.35; color:#EB5A3C; }
    `;
    document.head.appendChild(st);
  }

  const lang=(document.documentElement.lang||'pt').slice(0,2).toLowerCase();
  const T = ({
    pt:{title:'ÚLTIMAS UNIDADES!', desc:'Este artigo tem apenas {x} unidades disponíveis, compra antes que esgote.'},
    es:{title:'¡ÚLTIMAS UNIDADES!', desc:'Este artículo tiene solo {x} unidades disponibles, compra antes de que se agoten.'},
    en:{title:'LAST UNITS!', desc:'This item has only {x} units available — buy before it sells out.'}
  })[lang] || ({
    title:'ÚLTIMAS UNIDADES!',
    desc:'Este artigo tem apenas {x} unidades disponíveis, compra antes que esgote.'
  });

  function buildAlert(units){
    const box=document.createElement('div');
    box.className='lastunits-alert';
    const ns='http://www.w3.org/2000/svg';
    const svg=document.createElementNS(ns,'svg');
    svg.setAttribute('class','lastunits-alert__icon');
    svg.setAttribute('viewBox','0 0 24 24');
    svg.innerHTML='<path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2z"/>';
    const wrap=document.createElement('div');
    const title=document.createElement('strong');
    title.className='lastunits-alert__title';
    title.textContent=T.title;
    const p=document.createElement('p');
    p.className='lastunits-alert__desc';
    p.textContent=T.desc.replace('{x}', units>0? String(units): 'x');
    wrap.append(title,p); box.append(svg,wrap);
    return {box,p};
  }

  const flagPresent = await waitForLastUnitsFlag(8000);
  if (!flagPresent){
    return;
  }

  const buttons = await waitForEl(BTN_SEL, 12000);
  const isActuallyVisible = (el)=>{
    if (!el || !el.isConnected) return false;
    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    return (
      rect.width > 0 && rect.height > 0 &&
      style.visibility !== 'hidden' &&
      style.display !== 'none'
    );
  };

  async function getKlarnaOrigin(){
    let list = Array.from(document.querySelectorAll(KL_SEL));
    if (!list.length){
      const waited = await waitForEl(KL_SEL, 12000);
      if (!waited) return null;
      list = Array.from(document.querySelectorAll(KL_SEL));
    }
    return list.find(isActuallyVisible) || list[0] || null;
  }

  const klarnaOrigin = await getKlarnaOrigin();
  if (!klarnaOrigin) return;

  const originParent = klarnaOrigin.parentNode;
  const originNext   = klarnaOrigin.nextSibling;

  document.querySelectorAll('.lastunits-alert').forEach(n=>n.remove());

  const units = totalUnits();
  const {box, p} = buildAlert(units);

  if (originParent){
    if (originNext) originParent.insertBefore(box, originNext);
    else originParent.appendChild(box);
  }

  function placeSingleKlarna(){
    const chosen = isActuallyVisible(klarnaOrigin) ? klarnaOrigin : klarnaOrigin; // fallback safe
    if (!chosen || !buttons || !buttons.parentNode) return false;

    if (buttons.previousElementSibling !== chosen && chosen.parentNode){
      try {
        buttons.parentNode.insertBefore(chosen, buttons);
      } catch(e){
        return false;
      }
    }

    // padding apenas estético; não afeta visibilidade
    chosen.style.paddingBottom='10px';
    return true;
  }
  placeSingleKlarna();

  // manter o número do alerta em sincronia com as variações de tamanho (opcional)
  const sizesEl = document.querySelector('.sizes');
  if (sizesEl){
    const refresh=()=>{
      const u = totalUnits();
      p.textContent = T.desc.replace('{x}', u>0? String(u): 'x');
    };
    sizesEl.addEventListener('change', refresh);
    new MutationObserver(refresh).observe(sizesEl,{childList:true,subtree:true,attributes:true,attributeFilter:['qtd']});
  }

  // se o Klarna aparecer dinamicamente mais tarde, tentar reposicionar (sem ocultar nada)
  if (!window.__KLARNA_FIX_OBS__){
    const obs=new MutationObserver((muts)=>{
      if (muts.some(m=>[...m.addedNodes].some(n=> n.nodeType===1 && (
        n.matches?.(KL_SEL) || n.querySelector?.(KL_SEL)
      )))){
        placeSingleKlarna();
      }
    });
    obs.observe(document.body,{childList:true,subtree:true});
    window.__KLARNA_FIX_OBS__ = obs;
  }
})();
