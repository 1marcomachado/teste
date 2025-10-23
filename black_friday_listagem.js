(function(){
  const params = new URLSearchParams(window.location.search);
    if (params.get('mostrar_blackfriday') === '1') {
    const CARD  = 'article.product';
    const PRICE = '.price, .product-price, .current-price span, .price .price, [itemprop="price"]';
    const NOTE_TEXT = '-50% a partir de 28/10';

    // ==== CSS: overlap horizontal ====
    if(!document.getElementById('bd-pills-inline-overlap-x')){
      const s=document.createElement('style'); s.id='bd-pills-inline-overlap-x';
      s.textContent = `
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

        /* sobreposição lateral: a preta avança por cima da verde */
        .bd-pill--note{
          background:#1F1F1F; color:#fff;
          margin-left: calc(var(--overlap-x) * -1);
          z-index:2;
        }

        /* encostar aos botões e compensar o overlap vertical */
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
      `;
      document.head.appendChild(s);
    }

    // ==== JS: insere antes da .item-buttons ====
    function t(el){ return (el && (el.textContent||'').trim()) || ''; }

    function mount(card){
      if(card.querySelector('.bd-pills-inline')) return;
      const btns = card.querySelector('.item-buttons'); if(!btns) return;

      const priceEl = card.querySelector(PRICE);
      const price   = t(priceEl); if(!price) return;

      const wrap = document.createElement('div');
      wrap.className = 'bd-pills-inline';

      const g = document.createElement('div');
      g.className = 'bd-pill bd-pill--price';
      g.textContent = price;
      wrap.appendChild(g);

      if (NOTE_TEXT){
        const b = document.createElement('div');
        b.className = 'bd-pill bd-pill--note';
        b.textContent = NOTE_TEXT;
        wrap.appendChild(b);
      }

      btns.parentNode.insertBefore(wrap, btns);
    }

    function run(root){ (root||document).querySelectorAll(CARD).forEach(mount); }
    run();

    const mo=new MutationObserver(()=>{ clearTimeout(run._t); run._t=setTimeout(()=>run(document.body),80); });
    mo.observe(document.body,{childList:true,subtree:true});
  }
})();
