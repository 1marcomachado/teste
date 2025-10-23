/* ==========================================================
   BLACK FRIDAY PILLS – versões 1, 2 e 3 integradas
   Ativa com:
     ?mostrar_blackfriday=1   → versão original (overlap)
     ?mostrar_blackfriday=2   → mobile-first
     ?mostrar_blackfriday=3   → moderna e animada
   ========================================================== */

(function(){
  const params = new URLSearchParams(window.location.search);
  const ver = params.get('mostrar_blackfriday');
  if (!ver) return;

  const CARD  = 'article.product';
  const PRICE = '.price, .product-price, .current-price span, .price .price, [itemprop="price"]';
  const now = new Date();
  const NOTE_TEXT =
    (now >= new Date('2025-10-28'))
      ? '🔥 -50% HOJE!'
      : '-50% a partir de 28/10';

  function t(el){ return (el && (el.textContent||'').trim()) || ''; }

  /* ========== COMMON RUNNER ========== */
  function runner({cssId, cssText, wrapCls, pillCls, priceCls, noteCls, pointerNoneWrap=false, mobileFirst=false}) {
    if (!document.getElementById(cssId)) {
      const s = document.createElement('style');
      s.id = cssId;
      s.textContent = cssText;
      document.head.appendChild(s);
    }

    function mount(card){
      if(card.querySelector('.'+wrapCls)) return;
      const btns = card.querySelector('.item-buttons'); if(!btns) return;
      const priceEl = card.querySelector(PRICE);
      const price = t(priceEl); if(!price) return;

      const wrap = document.createElement('div');
      wrap.className = wrapCls;
      if(pointerNoneWrap) wrap.style.pointerEvents = 'none';

      const p1 = document.createElement('div');
      p1.className = `${pillCls} ${priceCls}`;
      p1.textContent = price;
      wrap.appendChild(p1);

      if (NOTE_TEXT){
        const p2 = document.createElement('div');
        p2.className = `${pillCls} ${noteCls}`;
        p2.textContent = NOTE_TEXT;
        wrap.appendChild(p2);
      }

      if(mobileFirst)
        wrap.querySelectorAll('.'+pillCls).forEach(p => p.style.pointerEvents = 'auto');

      btns.parentNode.insertBefore(wrap, btns);
    }

    function run(root){ (root||document).querySelectorAll(CARD).forEach(mount); }
    run();
    const mo=new MutationObserver(()=>{ clearTimeout(run._t); run._t=setTimeout(()=>run(document.body),80); });
    mo.observe(document.body,{childList:true,subtree:true});
  }

  /* =======================================================
     V1 — Original (overlap lateral)
  ======================================================= */
  if (ver === '1') {
    runner({
      cssId: 'bd1-pills-inline-overlap-x',
      wrapCls: 'bd1-pills-inline',
      pillCls: 'bd1-pill',
      priceCls: 'bd1-pill--price',
      noteCls: 'bd1-pill--note',
      pointerNoneWrap: true,
      cssText: `
        :root{ --pill-h:26px; --overlap-y:20px; --overlap-x:10px; }
        .bd1-pills-inline{display:flex;align-items:center;margin-top:8px;
          margin-bottom:calc(var(--overlap-y)*-1);position:relative;z-index:3;pointer-events:none;}
        .bd1-pill{display:inline-flex;align-items:center;justify-content:center;height:var(--pill-h);
          padding:0 16px;border-radius:5px;font-size:14px;font-weight:700;}
        .bd1-pill--price{background:#8DFE4A;color:#111;font-weight:800;z-index:1;}
        .bd1-pill--note{background:#1F1F1F;color:#fff;margin-left:calc(var(--overlap-x)*-1);z-index:2;}
        @media(max-width:768px){:root{--pill-h:22px;--overlap-y:14px;--overlap-x:8px;}
          .bd1-pill{padding:0 12px;font-size:13px;}.bd1-pill--note{max-width:65vw;overflow:hidden;text-overflow:ellipsis;}}
        @media(max-width:430px){:root{--pill-h:28px;--overlap-y:12px;--overlap-x:6px;}
          .bd1-pill{padding:0 10px;font-size:12px;}.bd1-pill--note{max-width:60vw;}}
      `
    });
  }

  /* =======================================================
     V2 — Mobile-first, sem overlap
  ======================================================= */
  if (ver === '2') {
    runner({
      cssId: 'bd2-pills-mobile-first',
      wrapCls: 'bd2-pills',
      pillCls: 'bd2-pill',
      priceCls: 'bd2-pill--price',
      noteCls: 'bd2-pill--note',
      pointerNoneWrap: true,
      mobileFirst: true,
      cssText: `
        :root{--bd2-pill-h:28px;--bd2-gap:8px;--bd2-overlap-y:14px;}
        .bd2-pills{display:flex;align-items:center;flex-wrap:wrap;gap:var(--bd2-gap);
          margin-top:8px;margin-bottom:calc(var(--bd2-overlap-y)*-1);position:relative;z-index:3;pointer-events:none;}
        .bd2-pill{display:inline-flex;align-items:center;justify-content:center;min-height:var(--bd2-pill-h);
          padding:6px 14px;border-radius:8px;font-size:14px;font-weight:800;white-space:nowrap;}
        .bd2-pill--price{background:#8DFE4A;color:#111;box-shadow:0 1px 0 rgba(0,0,0,.06),0 2px 6px rgba(0,0,0,.06);}
        .bd2-pill--note{background:#111;color:#fff;overflow:hidden;text-overflow:ellipsis;max-width:min(70vw,420px);}
        @media(min-width:769px){.bd2-pill--note{margin-left:-8px;padding-left:22px;}}
        @media(max-width:768px){.bd2-pill{padding:6px 12px;font-size:14px;}.bd2-pill--note{max-width:72vw;}}
        @media(max-width:430px){.bd2-pill{padding:8px 12px;font-size:13px;}.bd2-pill--note{max-width:85vw;}}
      `
    });
  }

  /* =======================================================
     V3 — Moderna e animada
  ======================================================= */
  if (ver === '3') {
    runner({
      cssId: 'bd3-pills-modern',
      wrapCls: 'bd3-pills',
      pillCls: 'bd3-pill',
      priceCls: 'bd3-pill--price',
      noteCls: 'bd3-pill--note',
      cssText: `
        :root{--bd3-gap:8px;--bd3-overlap-y:12px;--bd3-green:#93FF3F;--bd3-dark:#121212;}
        .bd3-pills{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;
          gap:var(--bd3-gap);margin-top:8px;margin-bottom:calc(var(--bd3-overlap-y)*-1);
          position:relative;z-index:3;animation:bd3-fadein .4s ease-out both;}
        @keyframes bd3-fadein{from{opacity:0;transform:translateY(4px);}to{opacity:1;transform:none;}}
        .bd3-pill{display:inline-flex;align-items:center;justify-content:center;padding:6px 16px;
          border-radius:9999px;font-size:14px;font-weight:800;white-space:nowrap;
          box-shadow:0 1px 4px rgba(0,0,0,.08);transition:transform .2s ease;}
        .bd3-pill--price{background:var(--bd3-green);color:#111;}
        .bd3-pill--price:hover{transform:scale(1.05);}
        .bd3-pill--note{background:var(--bd3-dark);color:#fff;overflow:hidden;text-overflow:ellipsis;max-width:80vw;}
        @media(max-width:768px){.bd3-pill{padding:8px 14px;font-size:13.5px;margin-bottom: 5px;}.bd3-pill--note{max-width:85vw;}}
        @media(max-width:430px){.bd3-pills{flex-direction:column;gap:6px;}.bd3-pill{font-size:13px;;margin-bottom: 5px;}}
        @media(prefers-color-scheme:dark){.bd3-pill--price{background:#B6FF6B;color:#000;}}
      `
    });
  }
})();
