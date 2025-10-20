(function(){
  const params = new URLSearchParams(location.search);
  if (params.get('mostrar_blackfriday') !== '1') return;

  // ====== CONFIG (CARRINHO) ======
  const PRICING_WRAP = '.rdc-shop-prd-pricing'; // inserir APÓS este bloco
  const PRICE_SEL = [
    '[itemprop="price"]',
    '.price-amount',
    '.current-price .price',
    '.product-price',
    '.price',
    '.rdc-price',
    '.rdc-shop-prd-price'
  ].join(',');

  const NOTE_TEXT = '-50% a partir de 28/10';

  // ====== CSS ======
  if(!document.getElementById('bd-cart-pills-style')){
    const s = document.createElement('style');
    s.id = 'bd-cart-pills-style';
    s.textContent = `
      :root{
        --cart-pill-h: 26px;   /* altura desktop */
        --cart-overlap-x: 10px;/* quanto a preta sobrepõe lateralmente a verde */
        --cart-overlap-y: 16px;/* quanto “entra” por cima do bloco seguinte */
      }

      .bd-cart-pills{
        display:flex; align-items:center;
        margin-top:8px;
        margin-bottom: calc(var(--cart-overlap-y) * -1);
        position:relative; z-index:3;
        pointer-events:none; /* não bloquear cliques do bloco seguinte */
        float: right;
      }

      .bd-cart-pill{
        display:inline-flex; align-items:center; justify-content:center;
        height:var(--cart-pill-h); line-height:var(--cart-pill-h);
        padding:0 16px; border-radius:5px;
        font-size:14px; font-weight:700; white-space:nowrap;
        font-variant-numeric: tabular-nums;
        position:relative;
      }
      .bd-cart-pill--price{ background:#8DFE4A; color:#111; font-weight:800; z-index:1; }
      .bd-cart-pill--note { background:#1F1F1F; color:#fff; margin-left: calc(var(--cart-overlap-x) * -1); z-index:2; }

      /* Compensar overlap no bloco imediatamente a seguir ao pricing */
      .bd-cart-pills + *{
        margin-top:0 !important;
        padding-top: var(--cart-overlap-y);
        position:relative; z-index:1;
      }

      /* ===== Mobile ===== */
      @media (max-width:768px){
        :root{ --cart-pill-h: 24px; --cart-overlap-x: 8px; --cart-overlap-y: 12px; }
        .bd-cart-pill{ padding:0 12px; font-size:13px; }
      }
      @media (max-width:430px){
        :root{ --cart-pill-h: 22px; --cart-overlap-x: 6px; --cart-overlap-y: 10px; }
        .bd-cart-pill{ padding:0 10px; font-size:12px; }
      }
    `;
    document.head.appendChild(s);
  }

  function txt(el){ return (el && (el.textContent||'').trim()) || ''; }

  function priceFrom(pricing){
    // tenta encontrar um nó “limpo” de preço dentro do bloco
    const p = pricing.querySelector(PRICE_SEL);
    const t = txt(p || pricing);
    return t;
  }

  function mount(pricing){
    if (pricing.dataset.bdPillsApplied === '1') return;

    const priceTxt = priceFrom(pricing);
    if (!priceTxt) return;

    const wrap = document.createElement('div');
    wrap.className = 'bd-cart-pills';

    const green = document.createElement('div');
    green.className = 'bd-cart-pill bd-cart-pill--price';
    green.textContent = priceTxt;
    wrap.appendChild(green);

    if (NOTE_TEXT){
      const black = document.createElement('div');
      black.className = 'bd-cart-pill bd-cart-pill--note';
      black.textContent = NOTE_TEXT;
      wrap.appendChild(black);
    }

    // Inserir IMEDIATAMENTE depois do .rdc-shop-prd-pricing
    if (pricing.nextSibling){
      pricing.parentNode.insertBefore(wrap, pricing.nextSibling);
    } else {
      pricing.parentNode.appendChild(wrap);
    }

    pricing.dataset.bdPillsApplied = '1';
  }

  function run(root){
    (root || document).querySelectorAll(PRICING_WRAP).forEach(mount);
  }

  run();

  // Observa mudanças no carrinho (mudanças de qty/atualizações AJAX)
  const mo = new MutationObserver(()=>{ clearTimeout(run._t); run._t = setTimeout(()=>run(document.body), 80); });
  mo.observe(document.body, { childList:true, subtree:true });
})();
