(function(){
  const params = new URLSearchParams(window.location.search);
  const ver = params.get('mostrar_blackfriday');

  // ---------- helpers comuns ----------
  const CARD  = 'article.product';
  const PRICE = '.price, .product-price, .current-price span, .price .price, [itemprop="price"]';
  const NOTE_TEXT = '-50% a partir de 28/10';

  function t(el){ return (el && (el.textContent||'').trim()) || ''; }

  // fábrica que injeta CSS e devolve o "mount" p/ cada versão
  function makeVersion(opts){
    const {
      cssId,           // id único do <style>
      clsWrap,         // classe do wrap
      clsPill,         // base da pílula
      clsPrice,        // pílula de preço
      clsNote,         // pílula de nota
      cssText,         // CSS da versão
      pointerNoneWrap, // se o wrap deve ter pointer-events:none
      mobileFirst      // se a versão é mais mobile-friendly
    } = opts;

    if(!document.getElementById(cssId)){
      const s = document.createElement('style');
      s.id = cssId;
      s.textContent = cssText;
      document.head.appendChild(s);
    }

    function mount(card){
      if(card.querySelector('.'+clsWrap)) return;
      const btns = card.querySelector('.item-buttons'); if(!btns) return;

      const priceEl = card.querySelector(PRICE);
      const price   = t(priceEl); if(!price) return;

      const wrap = document.createElement('div');
      wrap.className = clsWrap;
      if(pointerNoneWrap) wrap.style.pointerEvents = 'none';

      const g = document.createElement('div');
      g.className = clsPill+' '+clsPrice;
      g.textContent = price;
      wrap.appendChild(g);

      if (NOTE_TEXT){
        const b = document.createElement('div');
        b.className = clsPill+' '+clsNote;
        b.textContent = NOTE_TEXT;
        wrap.appendChild(b);
      }

      // em versões mobile-first, mantenho os botões clicáveis:
      // só o wrap tem pointer-none; as pílulas ganham pointer-events:auto
      if(mobileFirst){
        wrap.querySelectorAll('.'+clsPill).forEach(p => p.style.pointerEvents = 'auto');
      }

      btns.parentNode.insertBefore(wrap, btns);
    }

    function run(root){ (root||document).querySelectorAll(CARD).forEach(mount); }
    run();

    const mo = new MutationObserver(()=>{
      clearTimeout(run._t);
      run._t = setTimeout(()=>run(document.body),80);
    });
    mo.observe(document.body,{childList:true,subtree:true});
  }

  // ============ V1 (igual à sua) -> ?mostrar_blackfriday=1 ============
  if (ver === '1') {
    makeVersion({
      cssId: 'bd-pills-inline-overlap-x',
      clsWrap: 'bd-pills-inline',
      clsPill: 'bd-pill',
      clsPrice: 'bd-pill--price',
      clsNote: 'bd-pill--note',
      pointerNoneWrap: true,
      mobileFirst: false,
      cssText: `
        :root{
          --pill-h: 26px;        /* altura das pílulas (desktop) */
          --overlap-y: 20px;     /* quanto entram sobre os botões (vertical) */
          --overlap-x: 10px;     /* quanto a preta sobrepõe a verde (horizontal) */
        }

        .bd-pills-inline{
          display:flex; align-items:center;
          margin-top:8px;
          margin-bottom: calc(var(--overlap-y) * -1); /* “por cima” dos botões */
          position:relative; z-index:3; pointer-events:none;
        }

        .bd-pill{
          display:inline-flex; align-items:center; justify-content:center;
          height:var(--pill-h); line-height:var(--pill-h);
          padding:0 16px; border-radius:5px;
          font-size:14px; font-weight:700; white-space:nowrap;
          font-variant-numeric: tabular-nums;
          position:relative;
        }

        .bd-pill--price{
          background:#8DFE4A; color:#111; font-weight:800;
          z-index:1;
        }

        .bd-pill--note{
          background:#1F1F1F; color:#fff;
          margin-left: calc(var(--overlap-x) * -1);
          z-index:2;
        }

        .bd-pills-inline + .item-buttons{
          margin-top:0 !important;
          padding-top: var(--overlap-y);
          position:relative; z-index:1;
        }

        /* === Mobile === */
        @media (max-width:768px){
          :root{ --pill-h: 22px; --overlap-y: 14px; --overlap-x: 8px; }
          .bd-pill{ padding:0 12px; font-size:13px; }
          .bd-pills-inline { margin-bottom: unset; }
          .bd-pill--note{ max-width:65vw; overflow:hidden; text-overflow:ellipsis; }
        }
        @media (max-width:430px){
          :root{ --pill-h: 28px; --overlap-y: 12px; --overlap-x: 6px; }
          .bd-pill{ padding:0 10px; font-size:12px; }
          .bd-pills-inline { margin-bottom: unset; }
          .bd-pill--note{ max-width:60vw; }
        }
      `
    });
  }

  // ============ V2 (melhor mobile) -> ?mostrar_blackfriday=2 ============
  if (ver === '2') {
    makeVersion({
      cssId: 'bd2-pills-mobile-first',
      clsWrap: 'bd2-pills',
      clsPill: 'bd2-pill',
      clsPrice: 'bd2-pill--price',
      clsNote: 'bd2-pill--note',
      pointerNoneWrap: true,
      mobileFirst: true,
      cssText: `
        :root{
          --bd2-pill-h: 28px;     /* base mobile-friendly */
          --bd2-gap: 8px;         /* espaçamento entre pílulas */
          --bd2-overlap-y: 14px;  /* compensação vertical sobre botões */
        }

        /* wrapper com wrap e gap (não força sobreposição em telas pequenas) */
        .bd2-pills{
          display:flex; align-items:center; flex-wrap:wrap; gap: var(--bd2-gap);
          margin-top:8px;
          margin-bottom: calc(var(--bd2-overlap-y) * -1);
          position:relative; z-index:3; pointer-events:none;
        }

        .bd2-pill{
          display:inline-flex; align-items:center; justify-content:center;
          min-height:var(--bd2-pill-h); line-height:1;
          padding:6px 14px; border-radius:8px;
          font-size:14px; font-weight:800; white-space:nowrap;
          font-variant-numeric: tabular-nums;
          position:relative;
          /* melhora o recorte quando é longo e quebra de linha */
          max-width: 100%;
        }

        .bd2-pill--price{
          background:#8DFE4A; color:#111;
          box-shadow: 0 1px 0 rgba(0,0,0,.06), 0 2px 6px rgba(0,0,0,.06);
        }

        .bd2-pill--note{
          background:#111; color:#fff;
          /* permite truncar em uma linha quando não couber */
          overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
          max-width:min(70vw, 420px);
        }

        /* encostar aos botões e compensar o overlap vertical */
        .bd2-pills + .item-buttons{
          margin-top:0 !important;
          padding-top: var(--bd2-overlap-y);
          position:relative; z-index:1;
        }

        /* ====== Desktop: mantém “sabor” da V1 com leve sobreposição lateral ====== */
        @media (min-width: 769px){
          :root{ --bd2-pill-h: 26px; --bd2-gap: 10px; --bd2-overlap-y: 16px; }
          .bd2-pill{ padding:0 16px; font-size:14px; border-radius:6px; }
          .bd2-pills{
            flex-wrap:nowrap;
          }
          /* simula leve overlap, mas sem quebrar o touch */
          .bd2-pill--note{ margin-left:-8px; padding-left:22px; }
        }

        /* ====== Mobile médio ====== */
        @media (max-width: 768px){
          :root{ --bd2-pill-h: 32px; --bd2-gap: 8px; --bd2-overlap-y: 14px; }
          .bd2-pill{ padding:6px 12px; font-size:14px; }
          /* pílulas podem ir para 2 linhas sem se atropelar */
          .bd2-pill--note{ max-width: 72vw; }
        }

        /* ====== Mobile pequeno ====== */
        @media (max-width: 430px){
          :root{ --bd2-pill-h: 34px; --bd2-gap: 6px; --bd2-overlap-y: 12px; }
          .bd2-pill{ padding:8px 12px; font-size:13px; border-radius:7px; }
          /* empilha verticalmente se faltar espaço horizontal */
          .bd2-pills{ gap:6px; }
          .bd2-pill--note{ max-width: 85vw; }
        }

        /* acessibilidade mínima de contraste em temas claros/escuros */
        @media (prefers-color-scheme: dark){
          .bd2-pill--price{ box-shadow:none; }
        }
      `
    });
  }
})();
