(function(){
  const params = new URLSearchParams(location.search);
  if (params.get('mostrar_blackfriday') !== '1') return;

  const PRICE_BOX   = '.price'; // container onde está o <p>
  const PRICE_VALUE = '.price [itemprop="price"], .price p, .current-price [itemprop="price"], .product-price';
  const NOTE_TEXT   = '-50% a partir de 28/10';

  // === CSS ===
  if (!document.getElementById('bd-pdp-pills-style')){
    const s = document.createElement('style');
    s.id = 'bd-pdp-pills-style';
    s.textContent = `
      :root{
        --pdp-pill-h: 26px;
        --pdp-overlap-x: 10px;
      }

      .bd-pdp-pills{
        display:inline-flex;            /* mantém tudo na mesma linha */
        align-items:center;             /* alinha verticalmente ao texto */
        vertical-align:baseline;        /* alinhado com o <p> existente */
        margin-left:8px;                /* pequeno espaço depois do preço */
        gap:0;                          /* as pílulas vão-se sobrepor */
        pointer-events:none;
      }

      .bd-pdp-pill{
        display:inline-flex; align-items:center; justify-content:center;
        height:var(--pdp-pill-h); line-height:var(--pdp-pill-h);
        padding:0 14px; border-radius:5px;
        font-size:14px; font-weight:700; white-space:nowrap;
        position:relative;
      }

      .bd-pdp-pill--price{
        background:#8DFE4A; color:#111; font-weight:800;
        z-index:1;
      }

      .bd-pdp-pill--note{
        background:#1F1F1F; color:#fff;
        margin-left: calc(var(--pdp-overlap-x) * -1);
        z-index:2;
      }

      @media (max-width:768px){
        :root{ --pdp-pill-h: 24px; --pdp-overlap-x: 8px; }
        .bd-pdp-pill{ padding:0 12px; font-size:13px; }
      }

      @media (max-width:430px){
        :root{ --pdp-pill-h: 22px; --pdp-overlap-x: 6px; }
        .bd-pdp-pill{ padding:0 10px; font-size:12px; }
      }
    `;
    document.head.appendChild(s);
  }

  function text(el){ return (el && (el.textContent||'').trim()) || ''; }

  function mountPDP(){
    document.querySelectorAll(PRICE_BOX).forEach(box=>{
      if (box.querySelector('.bd-pdp-pills')) return;

      const priceEl = box.querySelector(PRICE_VALUE);
      const priceTxt = text(priceEl);
      if(!priceTxt) return;

      const pills = document.createElement('span');
      pills.className = 'bd-pdp-pills';

      const green = document.createElement('span');
      green.className = 'bd-pdp-pill bd-pdp-pill--price';
      green.textContent = priceTxt;
      pills.appendChild(green);

      if (NOTE_TEXT){
        const black = document.createElement('span');
        black.className = 'bd-pdp-pill bd-pdp-pill--note';
        black.textContent = NOTE_TEXT;
        pills.appendChild(black);
      }

      // Inserir logo após o <p> ou o nó do preço original
      if (priceEl && priceEl.nextSibling) {
        priceEl.parentNode.insertBefore(pills, priceEl.nextSibling);
      } else {
        box.appendChild(pills);
      }
    });
  }

  mountPDP();
  const mo = new MutationObserver(()=>{ clearTimeout(mountPDP._t); mountPDP._t=setTimeout(mountPDP,60); });
  mo.observe(document.body,{childList:true,subtree:true});
})();
