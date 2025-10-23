(function(){
  const params = new URLSearchParams(window.location.search);
  const ver = params.get('mostrar_blackfriday');

  if (ver !== '3') return;

  const CARD  = 'article.product';
  const PRICE = '.price, .product-price, .current-price span, .price .price, [itemprop="price"]';

  // Texto dinâmico: muda conforme data
  const now = new Date();
  const noteText = (now >= new Date('2025-10-28')) ? '🔥 -50% HOJE!' : '-50% a partir de 28/10';

  if(!document.getElementById('bd3-pills')){
    const s = document.createElement('style');
    s.id = 'bd3-pills';
    s.textContent = `
      :root{
        --bd3-pill-h: 30px;
        --bd3-gap: 8px;
        --bd3-overlap-y: 12px;
        --bd3-green: #93FF3F;
        --bd3-dark: #121212;
        --bd3-font: 14px;
      }

      .bd3-pills{
        display:flex; align-items:center; justify-content:center; flex-wrap:wrap;
        gap: var(--bd3-gap);
        margin-top:8px;
        margin-bottom: calc(var(--bd3-overlap-y) * -1);
        position:relative; z-index:3;
        animation: bd3-fadein .4s ease-out both;
      }

      @keyframes bd3-fadein{
        from{ opacity:0; transform:translateY(4px); }
        to{ opacity:1; transform:none; }
      }

      .bd3-pill{
        display:inline-flex; align-items:center; justify-content:center;
        padding:6px 16px;
        border-radius:9999px;
        font-size:var(--bd3-font);
        font-weight:800;
        white-space:nowrap;
        line-height:1;
        position:relative;
        box-shadow:0 1px 4px rgba(0,0,0,.08);
        transition: transform .2s ease, box-shadow .2s ease;
      }

      .bd3-pill--price{
        background:var(--bd3-green); color:#111;
      }
      .bd3-pill--price:hover{ transform:scale(1.05); }

      .bd3-pill--note{
        background:var(--bd3-dark); color:#fff;
        overflow:hidden; text-overflow:ellipsis;
        max-width:80vw;
      }

      .bd3-pills + .item-buttons{
        margin-top:0 !important;
        padding-top: var(--bd3-overlap-y);
        position:relative; z-index:1;
      }

      @media (max-width:768px){
        :root{ --bd3-pill-h: 34px; --bd3-gap: 8px; --bd3-font: 13.5px; }
        .bd3-pill{ padding:8px 14px; text-align:center; }
        .bd3-pill--note{ max-width:85vw; }
      }

      @media (max-width:430px){
        :root{ --bd3-pill-h: 36px; --bd3-font: 13px; }
        .bd3-pills{ flex-direction:column; gap:6px; }
        .bd3-pill{ width:auto; }
      }

      @media (prefers-color-scheme: dark){
        .bd3-pill--price{ background:#B6FF6B; color:#000; }
        .bd3-pill--note{ background:#1A1A1A; }
      }
    `;
    document.head.appendChild(s);
  }

  function mount(card){
    if(card.querySelector('.bd3-pills')) return;
    const btns = card.querySelector('.item-buttons'); if(!btns) return;

    const priceEl = card.querySelector(PRICE);
    const price   = (priceEl && priceEl.textContent.trim()) || ''; if(!price) return;

    const wrap = document.createElement('div');
    wrap.className = 'bd3-pills';

    const g = document.createElement('div');
    g.className = 'bd3-pill bd3-pill--price';
    g.textContent = price;
    g.setAttribute('aria-label', 'Preço atual ' + price);
    wrap.appendChild(g);

    const b = document.createElement('div');
    b.className = 'bd3-pill bd3-pill--note';
    b.textContent = noteText;
    b.setAttribute('aria-label', noteText);
    wrap.appendChild(b);

    btns.parentNode.insertBefore(wrap, btns);
  }

  function run(root){ (root||document).querySelectorAll(CARD).forEach(mount); }
  run();

  const mo=new MutationObserver(()=>{ clearTimeout(run._t); run._t=setTimeout(()=>run(document.body),80); });
  mo.observe(document.body,{childList:true,subtree:true});
})();
