(function(){
  if (window.__bzr_alerts_executed) return;
  window.__bzr_alerts_executed = true;

  // ===== CONFIG =====
  const WORKER = "https://bzrstats.peboys.workers.dev";
  const TRENDING_AUTO_CLOSE_MS  = 15000; // 0 = não fecha sozinho
  const LASTUNITS_AUTO_CLOSE_MS = 15000;
  const OFFSET_TOP_PCT = 45, OFFSET_TOP_PCT_MOBILE = 50;
  const ACCENT = '#BE9E62';              // cor do título "Últimas unidades"
  const TITLE_FONT = "'Metrocity-Bold', Arial, Helvetica, 'Segoe UI', sans-serif";
  const ORDER = ['purchase','cart','view'];

  const $ = (s, c = document) => c.querySelector(s);
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  async function waitForEl(sel, timeout = 10000){
    const t0 = Date.now();
    while (Date.now() - t0 < timeout){
      const el = $(sel);
      if (el) return el;
      await sleep(120);
    }
    return null;
  }

  // ===== IDIOMA =====
  const lx = (document.documentElement.lang || navigator.language || 'pt').toLowerCase();
  const L = lx.startsWith('pt') ? 'pt' : lx.startsWith('es') ? 'es' : 'en';
  const NF = new Intl.NumberFormat(L), f = n => NF.format(n);

  const T = {
    pt: { trend:'MUITO PROCURADO!', last:'ÚLTIMAS UNIDADES!', close:'Fechar',
      now:  n     => `${f(n)} ${n===1?'pessoa está':'pessoas estão'} a ver este artigo neste momento.`,
      buy:  (n,h) => `Este artigo foi comprado ${f(n)} ${n===1?'vez':'vezes'} nas últimas ${h}h.`,
      cart: (n,h) => `${f(n)} ${n===1?'pessoa adicionou':'pessoas adicionaram'} ao carrinho nas últimas ${h}h.`,
      lastTotal: n => `Só ${n===1?'resta':'restam'} <b>${f(n)} ${n===1?'unidade':'unidades'}</b>. Compra antes que esgote.`,
      lastNone:       'Restam poucas unidades. Compra antes que esgote.' },
    es: { trend:'¡MUY BUSCADO!', last:'¡ÚLTIMAS UNIDADES!', close:'Cerrar',
      now:  n     => `${f(n)} ${n===1?'persona está':'personas están'} viendo este artículo ahora mismo.`,
      buy:  (n,h) => `Este artículo se compró ${f(n)} ${n===1?'vez':'veces'} en las últimas ${h}h.`,
      cart: (n,h) => `${f(n)} ${n===1?'persona añadió':'personas añadieron'} al carrito en las últimas ${h}h.`,
      lastTotal: n => `Solo ${n===1?'queda':'quedan'} <b>${f(n)} ${n===1?'unidad':'unidades'}</b>. Compra antes de que se ${n===1?'agote':'agoten'}.`,
      lastNone:       'Quedan pocas unidades. Compra antes de que se agoten.' },
    en: { trend:'TRENDING!', last:'LAST UNITS!', close:'Close',
      now:  n     => `${f(n)} ${n===1?'person is':'people are'} viewing this item right now.`,
      buy:  (n,h) => `This item was purchased ${f(n)} ${n===1?'time':'times'} in the last ${h}h.`,
      cart: (n,h) => `${f(n)} ${n===1?'person added':'people added'} to cart in the last ${h}h.`,
      lastTotal: n => `Only <b>${f(n)} ${n===1?'unit':'units'}</b> left. Buy before it sells out.`,
      lastNone:       'Only a few units left. Buy before it sells out.' }
  }[L];

  // ===== ESTILOS =====
  if (!$('#bzr-alerts-style')){
    const st = document.createElement('style');
    st.id = 'bzr-alerts-style';
    st.textContent = `
      .bzr-stack{
        position:absolute; left:50%; top:${OFFSET_TOP_PCT}%;
        transform:translate(-50%,-${OFFSET_TOP_PCT}%);
        width:min(380px,90%); display:flex; flex-direction:column; gap:12px;
        z-index:10000; pointer-events:none; font-family:inherit;
      }
      .bzr-card{
        pointer-events:auto; background:rgba(255,255,255,.96); color:#111;
        border-radius:6px; box-shadow:0 4px 14px rgba(0,0,0,.18);
        padding:12px 16px 14px;
      }
      .bzr-head{display:flex; align-items:center; justify-content:space-between; gap:8px; margin-bottom:4px}
      .bzr-title{display:flex; align-items:center; gap:6px; font-size:16px !important; margin:0; line-height:1.2}
      .bzr-title, .bzr-title span{
        font-family:${TITLE_FONT} !important;
        font-weight:700 !important;
        font-synthesis:none;
      }
      .bzr-card--last .bzr-title{color:${ACCENT}}
      .bzr-text{font-size:13px; line-height:1.45; margin:0; color:#222}
      .bzr-text b{font-weight:700}
      .bzr-close{
        appearance:none !important; -webkit-appearance:none !important;
        border:0 !important; background:transparent !important; box-shadow:none !important;
        margin:0 -4px 0 auto !important; padding:0 !important;
        min-width:0 !important; min-height:0 !important;
        width:22px !important; height:22px !important; flex:0 0 22px;
        display:flex !important; align-items:center; justify-content:center;
        cursor:pointer; color:#444 !important; font-size:14px !important; line-height:1 !important;
        transition:color .2s;
      }
      .bzr-close:hover{color:#000 !important; background:transparent !important}
      @media(max-width:768px){
        .bzr-stack{ top:${OFFSET_TOP_PCT_MOBILE}%; transform:translate(-50%,-${OFFSET_TOP_PCT_MOBILE}%); width:90%; min-width:300px; }
      }
    `;
    document.head.appendChild(st);
  }

  // ===== ÂNCORA (imagem do produto) =====
  function findAnchor(){
    const col = $('.product-holder .column-images') || $('.column-images');
    if (col){
      let best = null, area = 0;
      col.querySelectorAll('img, figure, a.zoom, .slick-current, .slick-list, .productMask, .product-cover, .product-image').forEach(el => {
        const r = el.getBoundingClientRect(), a = Math.max(0,r.width) * Math.max(0,r.height);
        if (a > area && r.width > 300 && r.height > 250){ best = el; area = a; }
      });
      if (best) return best;
    }
    return $('#product-gallery, .product-media, .images-container, .product-cover, .product__media, .product-gallery') || document.body;
  }

  function getStack(){
    let stack = $('.bzr-stack');
    if (!stack){
      stack = document.createElement('div');
      stack.className = 'bzr-stack';
    }
    const anchor = findAnchor();
    if (getComputedStyle(anchor).position === 'static') anchor.style.position = 'relative';
    if (stack.parentElement !== anchor) anchor.appendChild(stack);
    return stack;
  }

  function removeCard(card){
    const stack = card.parentElement;
    card.remove();
    if (stack && !stack.children.length) stack.remove();
  }

  // kind: 'trend' (fica sempre em cima) | 'last' (fica sempre em baixo)
  function addCard(kind, titleHtml, textHtml, autoCloseMs){
    const stack = getStack();
    stack.querySelectorAll('.bzr-card--' + kind).forEach(n => n.remove());
    const card = document.createElement('div');
    card.className = 'bzr-card bzr-card--' + kind;
    card.innerHTML = `
      <div class="bzr-head">
        <div class="bzr-title">${titleHtml}</div>
        <button class="bzr-close" aria-label="${T.close}" title="${T.close}">✕</button>
      </div>
      <p class="bzr-text">${textHtml}</p>`;
    card.querySelector('.bzr-close').addEventListener('click', () => removeCard(card));
    if (kind === 'trend') stack.prepend(card); else stack.append(card);
    if (autoCloseMs > 0) setTimeout(() => removeCard(card), autoCloseMs);
    return card;
  }

  if (window.jQuery){
    window.jQuery('.product-holder .column-images .slider').on('afterChange', () => {
      if ($('.bzr-stack')) getStack();
    });
  }

  // ===== SKU =====
  function getSku(){
    if (window.JSVars?.product?.sku_group) return JSVars.product.sku_group;
    return ($('.ref .small')?.textContent || "").split("|")[0].trim();
  }

  // ===== MUITO PROCURADO =====
  function runTrending(sku){
    const isProbablyHuman =
      !navigator.webdriver &&
      document.visibilityState === 'visible' &&
      !('connection' in navigator && navigator.connection.saveData);

    if (isProbablyHuman){
      fetch(WORKER + "/increment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sku, type: "view" })
      }).catch(()=>{});
    }

    fetch(WORKER + "/get?sku=" + encodeURIComponent(sku), { cache: "no-store" })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => {
        const item = (d && (d[sku] || d)) || {};
        const v = Number(item.views) || 0;
        const p = Number(item.purchases) || 0;
        const c = Number(item.carts) || 0;
        const show = (count, text, hot) =>
          addCard('trend', `<span>${count >= hot ? '🔥' : '👀'}</span><span>${T.trend}</span>`, text, TRENDING_AUTO_CLOSE_MS);

        for (const k of ORDER){
          if (k === 'purchase' && p > 3)  { show(p, T.buy(p, 48), 10); return; }
          if (k === 'cart'     && c > 3)  { show(c, T.cart(c, 12), 10); return; }
          if (k === 'view'     && v > 10) { show(v, T.now(v), 40);     return; }
        }
      })
      .catch(()=>{});
  }

  // ===== ÚLTIMAS UNIDADES =====
  const norm = s => (s||'').toString().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim().toLowerCase();
  const LAST_UNITS_VARIANTS = ['Últimas unidades','Ultimas unidades','¡Últimas unidades!','Last units','LAST UNITS'].map(norm);
  const hasLastUnitsFlag = () =>
    [...document.querySelectorAll('.product-info .flags .flag')].some(el => LAST_UNITS_VARIANTS.includes(norm(el.textContent)));

  async function waitForLastUnitsFlag(timeout = 8000){
    const t0 = Date.now();
    await waitForEl('.flags', timeout);
    while (Date.now() - t0 < timeout){
      if (hasLastUnitsFlag()) return true;
      await sleep(120);
    }
    return false;
  }

  // soma o stock de todos os tamanhos
  function totalUnits(){
    let sum = 0;
    document.querySelectorAll('.sizes label[qtd]').forEach(l => {
      const q = parseInt(l.getAttribute('qtd'), 10);
      if (Number.isFinite(q) && q > 0) sum += q;
    });
    return sum;
  }

  function lastUnitsText(){
    const units = totalUnits();
    return units > 0 ? T.lastTotal(units) : T.lastNone;
  }

  async function runLastUnits(){
    if (!(await waitForLastUnitsFlag(8000))) return;

    const card = addCard('last', `<span>${T.last}</span>`, lastUnitsText(), LASTUNITS_AUTO_CLOSE_MS);
    const p = card.querySelector('.bzr-text');

    const sizesEl = $('.sizes');
    if (sizesEl){
      const refresh = () => { if (card.isConnected) p.innerHTML = lastUnitsText(); };
      new MutationObserver(refresh).observe(sizesEl, { childList: true, subtree: true, attributes: true, attributeFilter: ['qtd'] });
    }
  }

  // ===== INIT =====
  function init(){
    const sku = getSku();
    if (sku) runTrending(sku);
    else window.__bzr_alerts_executed = false;
    runLastUnits();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
