(async function moveKlarna_onlyWhenLastUnitsFlag(){
  const KL_SEL    = '.rdc-product-klarna-placement';
  const BTN_SEL   = '#fixedDiv .buttons.clearfix';
  const AFTER_SEL = '.rdc-product-afterprice';

  const sleep = (ms)=>new Promise(r=>setTimeout(r,ms));
  async function waitForEl(sel, timeout=6000){
    const t0=Date.now();
    while (Date.now()-t0 < timeout){
      const el=document.querySelector(sel);
      if (el) return el;
      await sleep(120);
    }
    return null;
  }

  const norm = s => (s||'').toString()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/\s+/g,' ').trim().toLowerCase();

  const LAST_UNITS_VARIANTS = [
    'Últimas unidades', 'Ultimas unidades', '¡Últimas unidades!', 'Last units', 'LAST UNITS'
  ].map(norm);

  const NOVIDADE_VARIANTS = [
    'Novidade', 'Novidades', 'New', 'NEW', 'Novedad'
  ].map(norm);

  function getFlags(){
    return Array.from(document.querySelectorAll('.product-info .flags .flag'));
  }

  function hasLastUnitsFlag(){
    return getFlags().some(f => LAST_UNITS_VARIANTS.includes(norm(f.textContent)));
  }

  function hasNovidadeFlag(){
    return getFlags().some(f => NOVIDADE_VARIANTS.includes(norm(f.textContent)));
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

  // estilos do alerta (uma vez) — cores atualizadas (regra 7)
  if (!document.querySelector('style[data-lastunits-alert]')){
    const st=document.createElement('style');
    st.setAttribute('data-lastunits-alert','');
    st.textContent = `
      .lastunits-alert{
        display:flex; align-items:flex-start; gap:10px;
        border:2px solid #F2994A; border-radius:10px; padding:12px 14px;
        font-family: Arial, Helvetica, 'Segoe UI', sans-serif; margin:10px 0;
      }
      .lastunits-alert__icon{ width:18px; height:18px; flex:0 0 18px; fill:#F2994A; margin-top:2px; }
      .lastunits-alert__title{ display:block; font-weight:800; text-transform:uppercase; margin-bottom:4px; color:#854F0B; }
      .lastunits-alert__desc{ margin:0; font-size:13px; line-height:1.35; color:#854F0B; }
    `;
    document.head.appendChild(st);
  }

  const lang=(document.documentElement.lang||'pt').slice(0,2).toLowerCase();

  // Textos fixos, sem número exato de unidades (regra 4)
  function formatTitle(){
    if (lang === 'es') return '¡ÚLTIMAS UNIDADES!';
    if (lang === 'en') return 'LAST UNITS!';
    return 'ÚLTIMAS UNIDADES!';
  }

  function formatDesc(){
    if (lang === 'es') return 'Últimas unidades disponibles. Compra antes de que se agoten.';
    if (lang === 'en') return 'Last units available. Buy before it sells out.';
    return 'Últimas unidades disponíveis. Compra antes que esgote.';
  }

  function buildAlert(){
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
    title.textContent = formatTitle();
    const p=document.createElement('p');
    p.className='lastunits-alert__desc';
    p.textContent = formatDesc();
    wrap.append(title,p); box.append(svg,wrap);
    return {box,p,title};
  }

  await waitForEl('.flags', 3000);
  if (hasNovidadeFlag()) return;

  const flagPresent = await waitForLastUnitsFlag(6000);
  if (!flagPresent) return;

  if (hasNovidadeFlag()) return;

  const klarnaOrigin = document.querySelector(KL_SEL) || null;
  const afterpriceEl = klarnaOrigin ? null : (document.querySelector(AFTER_SEL) || await waitForEl(AFTER_SEL, 3000));
  const anchor = klarnaOrigin || afterpriceEl;
  if (!anchor) return;

  document.querySelectorAll('.lastunits-alert').forEach(n=>n.remove());

  const {box} = buildAlert();
  const parent = anchor.parentNode;
  if (parent){
    if (anchor.nextSibling) parent.insertBefore(box, anchor.nextSibling);
    else parent.appendChild(box);
  }

  if (klarnaOrigin){
    const buttons = document.querySelector(BTN_SEL);
    const isVisible = (el)=>{
      if (!el || !el.isConnected) return false;
      const r = el.getBoundingClientRect();
      const cs = window.getComputedStyle(el);
      return r.width>0 && r.height>0 && cs.visibility!=='hidden' && cs.display!=='none';
    };
    if (buttons && buttons.parentNode && isVisible(klarnaOrigin)){
      try{
        buttons.parentNode.insertBefore(klarnaOrigin, buttons);
        klarnaOrigin.style.paddingBottom='10px';
      }catch(e){}
    }
  }
})();
