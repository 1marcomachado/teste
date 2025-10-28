(function(){
  // Só ativa se ?mostrar_blackfriday=1
  const params = new URLSearchParams(location.search);
  if (params.get('mostrar_blackfriday') !== '1') return;

  // ====== CONFIG (CARRINHO) ======
  const PRICING_WRAP = '.rdc-shop-prd-pricing';
  const PRICE_SEL = [
    '[itemprop="price"]','.price-amount','.current-price .price',
    '.product-price','.price','.rdc-price','.rdc-shop-prd-price'
  ].join(',');
  const NOTE_TEXT = '-50% a partir de 28/10';

  // ====== REMOVER PADDING DO MAIN ======
  document.querySelector('#main')?.style.setProperty('padding-top','0','important');

  // ====== CSS ======
  if(!document.getElementById('bd-cart-pills-style')){
    const s = document.createElement('style');
    s.id = 'bd-cart-pills-style';
    s.textContent = `
      :root{ --cart-pill-h:26px; --cart-overlap-x:10px; --cart-overlap-y:16px; }

      .bd-cart-pills{
        display:flex; align-items:center;
        justify-content:flex-end;
        margin-top:8px;
        margin-bottom: calc(var(--cart-overlap-y) * -1);
        position:relative; z-index:3;
        pointer-events:none;
        float:right;
        width:100%;
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
      .bd-cart-pill--note { background:#1F1F1F; color:#fff;
        margin-left: calc(var(--cart-overlap-x) * -1); z-index:2; }

      .bd-cart-pills + *{
        margin-top:0 !important;
        padding-top: var(--cart-overlap-y);
        position:relative; z-index:1;
      }

      /* ===== Barra Verde (antes do #wp-header) ===== */
      .bf-trigger-wrap{
        width:100%; background:#8DFE4A; color:#111; font-weight:800;
      }
      .bf-trigger{
        display:flex; align-items:center; justify-content:center;
        gap:.65rem; padding:.75rem 1rem; cursor:pointer;
      }
      .bf-trigger:hover{ filter:brightness(0.95); }
      .bf-trigger__chev{
        border:solid #111; border-width:0 2px 2px 0;
        display:inline-block; padding:3px;
        transform:rotate(-45deg);
        width:8px; height:8px; margin-left:.25rem;
      }
      .bf-trigger.is-active{ cursor:default; opacity:.9; }

      /* ===== RESPONSIVE ===== */
      @media (max-width:768px){
        :root{ --cart-pill-h:24px; --cart-overlap-x:8px; --cart-overlap-y:12px; }
        .bd-cart-pill{ padding:0 12px; font-size:13px; }
      }

      /* ===== MOBILE: empilhar, alinhado à direita ===== */
      @media (max-width:430px){
        :root{ --cart-pill-h:22px; --cart-overlap-x:6px; --cart-overlap-y:10px; }
        .bd-cart-pill{ padding:0 10px; font-size:12px; }
        .bd-cart-pills{
          flex-direction: column;
          align-items: flex-end;  /* <-- preço à direita */
          margin-bottom:0;
          float:none;
        }
        .bd-cart-pill--note{ margin-left:0; }
        .bd-cart-pill + .bd-cart-pill{ margin-top:6px; }
        .bd-cart-pills + *{ padding-top:0 !important; }
      }
    `;
    document.head.appendChild(s);
  }

  // ====== Helpers / montagem das "pílulas" ======
  const txt = el => (el && (el.textContent||'').trim()) || '';
  const priceFrom = pricing => txt(pricing.querySelector(PRICE_SEL) || pricing);

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

    if (pricing.nextSibling){
      pricing.parentNode.insertBefore(wrap, pricing.nextSibling);
    } else {
      pricing.parentNode.appendChild(wrap);
    }
    pricing.dataset.bdPillsApplied = '1';
  }

  function run(root){ (root || document).querySelectorAll(PRICING_WRAP).forEach(mount); }

  // ====== Barra antes do #wp-header ======
  (function injectBar(){
    const header = document.getElementById('wp-header');
    if (!header || !header.parentNode) return;

    const bar = document.createElement('div');
    bar.className = 'bf-trigger-wrap';
    bar.innerHTML = `
      <div class="bf-trigger" role="button" aria-label="Ver carrinho com descontos aplicados">
        <span>VER CARRINHO COM DESCONTOS APLICADOS</span>
        <i class="bf-trigger__chev"></i>
      </div>
    `;
    header.parentNode.insertBefore(bar, header);

    const btn = bar.querySelector('.bf-trigger');
    let mo = null, ACTIVE = false;

    function activate(){
      if (ACTIVE) return;
      ACTIVE = true;
      run(document.body);
      btn.classList.add('is-active');

      // Observer só depois do clique (para atualizações AJAX)
      mo = new MutationObserver(()=>{
        clearTimeout(run._t);
        run._t = setTimeout(()=>run(document.body), 80);
      });
      mo.observe(document.body, { childList:true, subtree:true });
    }

    btn.addEventListener('click', activate, { once:true });
  })();
})();
