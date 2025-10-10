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

  // estilos do alerta (uma vez)
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

  function formatTitle(count){
    const one = count === 1;
    if (lang === 'pt') return one ? 'ÚLTIMA UNIDADE!' : 'ÚLTIMAS UNIDADES!';
    if (lang === 'es') return one ? '¡ÚLTIMA UNIDAD!' : '¡ÚLTIMAS UNIDADES!';
    if (lang === 'en') return one ? 'LAST UNIT!' : 'LAST UNITS!';
    return one ? 'ÚLTIMA UNIDADE!' : 'ÚLTIMAS UNIDADES!';
  }

  function formatDesc(count){
    const num = count > 0 ? String(Math.min(count, 30)) : '';
    const one = count === 1;
    if (lang === 'pt'){
      return `Este artigo tem apenas ${num} ${one ? 'unidade' : 'unidades'} ${one ? 'disponível' : 'disponíveis'}, compra antes que esgote.`;
    } else if (lang === 'es'){
      return `Este artículo tiene solo ${num} ${one ? 'unidad' : 'unidades'} disponible${one ? '' : 's'}, compra antes de que ${one ? 'se agote' : 'se agoten'}.`;
    } else if (lang === 'en'){
      return `This item has only ${num} ${one ? 'unit' : 'units'} available — buy before it sells out.`;
    } else {
      return `Este artigo tem apenas ${num} ${one ? 'unidade' : 'unidades'} ${one ? 'disponível' : 'disponíveis'}, compra antes que esgote.`;
    }
  }

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
    title.textContent = formatTitle(units);
    const p=document.createElement('p');
    p.className='lastunits-alert__desc';
    p.textContent = formatDesc(units);
    wrap.append(title,p); box.append(svg,wrap);
    return {box,p,title};
  }

  // 1) Só mostramos se existir a flag
  const flagPresent = await waitForLastUnitsFlag(6000);
  if (!flagPresent) return;

  // 2) Tenta Klarna só uma vez, sem esperar
  const klarnaOrigin = document.querySelector(KL_SEL) || null;
  const afterpriceEl = klarnaOrigin ? null : (document.querySelector(AFTER_SEL) || await waitForEl(AFTER_SEL, 3000));
  const anchor = klarnaOrigin || afterpriceEl;
  if (!anchor) return;

  // remove alertas antigos
  document.querySelectorAll('.lastunits-alert').forEach(n=>n.remove());

  // 3) Cria e insere o alerta imediatamente DEPOIS do anchor definido
  const units = totalUnits();
  const {box, p} = buildAlert(units);
  const parent = anchor.parentNode;
  if (parent){
    if (anchor.nextSibling) parent.insertBefore(box, anchor.nextSibling);
    else parent.appendChild(box);
  }

  // 4) Se houver Klarna já presente, move-a antes dos botões (sem observer)
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

  // 5) Atualiza a contagem ao mexer nos tamanhos
  const sizesEl = document.querySelector('.sizes');
  if (sizesEl){
    const refresh=()=>{ p.textContent = formatDesc(totalUnits()); };
    sizesEl.addEventListener('change', refresh);
    new MutationObserver(refresh).observe(sizesEl,{childList:true,subtree:true,attributes:true,attributeFilter:['qtd']});
  }
})();
