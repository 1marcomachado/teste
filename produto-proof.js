(function(){
  // ====== CONTAR SEMPRE ======
  const WORKER = "https://bzrstats.peboys.workers.dev";
  const urlParams = new URLSearchParams(location.search);
  const SHOW_BADGE = urlParams.has('mostrar_up'); // só mostra se ?mostrar_up
  const $ = (s,c=document)=>c.querySelector(s);

  // SKU da PDP
  const rawSku = $('meta[itemprop="sku"]')?.content || "";
  const sku = (rawSku.split("|")[0]||"").trim();
  if (!sku) return;

  // Conta view SEMPRE (mesmo sem mostrar badge)  <<< ALTERADO
  fetch(WORKER + "/increment", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ sku, type: "view" })
  }).catch(()=>{});

  if (!SHOW_BADGE) return; // não renderiza badge se não tiver ?mostrar_up

  // ====== CONFIG VISUAL ======
  const AUTO_CLOSE_MS = 8000;          // 0 = não fechar
  const OFFSET_TOP_PCT = 22;           // desktop: altura da badge (% da imagem)
  const OFFSET_TOP_PCT_MOBILE = 50;    // mobile: centro vertical
  const ORDER = ['view','purchase','cart'];

  // ====== I18N (PT/EN/ES) ======
  function lang(){
    const x=(document.documentElement.lang||navigator.language||'en').toLowerCase();
    if (x.startsWith('pt')) return 'pt';
    if (x.startsWith('es')) return 'es';
    return 'en';
  }
  const L=lang(), NF=new Intl.NumberFormat(L);
  const T={
    pt:{h:'MUITO PROCURADO!',c:'Fechar',
      now:(n,f)=>`${f(n)} ${n===1?'pessoa está':'pessoas estão'} a ver este artigo neste momento.`,
      buy:(n,h,f)=>`Este artigo foi comprado ${f(n)} ${n===1?'vez':'vezes'} nas últimas ${h}h.`,
      cart:(n,h,f)=>`${f(n)} ${n===1?'pessoa adicionou':'pessoas adicionaram'} ao carrinho nas últimas ${h}h.`},
    en:{h:'TRENDING!',c:'Close',
      now:(n,f)=>`${f(n)} ${n===1?'person is':'people are'} viewing this item right now.`,
      buy:(n,h,f)=>`This item was purchased ${f(n)} ${n===1?'time':'times'} in the last ${h}h.`,
      cart:(n,h,f)=>`${f(n)} ${n===1?'person added':'people added'} to cart in the last ${h}h.`},
    es:{h:'¡MUY BUSCADO!',c:'Cerrar',
      now:(n,f)=>`${f(n)} ${n===1?'persona está':'personas están'} viendo este artículo ahora mismo.`,
      buy:(n,h,f)=>`Este artículo se compró ${f(n)} ${n===1?'vez':'veces'} en las últimas ${h}h.`,
      cart:(n,h,f)=>`${f(n)} ${n===1?'persona añadió':'personas añadieron'} al carrito en las últimas ${h}h.`}
  }[L];

  // ====== ENCONTRAR ÂNCORA (imagem grande) ======
  function findAnchor(){
    const col = $('.product-holder .column-images') || $('.column-images');
    if (col){
      const nodes = col.querySelectorAll('img, figure, a.zoom, .slick-current, .slick-list, .productMask, .product-cover, .product-image');
      let best=null, area=0;
      nodes.forEach(el=>{
        const r=el.getBoundingClientRect(), a=Math.max(0,r.width)*Math.max(0,r.height);
        if (a>area && r.width>300 && r.height>250){ best=el; area=a; }
      });
      if (best) return best;
    }
    return $('#product-gallery, .product-media, .images-container, .product-cover, .product__media, .product-gallery') || document.body;
  }
  let anchor = findAnchor();
  if (getComputedStyle(anchor).position==='static') anchor.style.position='relative';

  // ====== CSS ======
  if (!$('#sp-style')){
    const st=document.createElement('style'); st.id='sp-style';
    st.textContent = `
      .sp-badge{
        position:absolute; left:50%; top:${OFFSET_TOP_PCT}%;
        transform:translate(-50%,-${OFFSET_TOP_PCT}%);
        background:rgba(255,255,255,0.92); color:#111; border:none; border-radius:8px;
        box-shadow:0 4px 12px rgba(0,0,0,.25);
        padding:12px 16px; font-family:inherit; max-width:min(360px,90%); min-width:min(360px,90%); z-index:10000;
      }
      .sp-header{display:flex; align-items:center; justify-content:space-between; margin-bottom:4px}
      .sp-title-wrap{display:flex; align-items:center; gap:8px}
      .sp-emoji{font-size:18px; line-height:1}
      .sp-title{font-weight:800 !important; font-size:16px !important; margin:0}
      .sp-text{font-size:13px; line-height:1.4; margin:0}
      .sp-close{
        appearance:none; border:0; background:transparent; cursor:pointer;
        color:#444; transition:color .2s ease;
        font-size:14px; line-height:1; width:22px; height:22px; display:flex; align-items:center; justify-content:center;
      }
      .sp-close:hover{ color:#000; }
      @media(max-width:768px){
        .sp-badge{ left:50%; top:${OFFSET_TOP_PCT_MOBILE}%; transform:translate(-50%,-${OFFSET_TOP_PCT_MOBILE}%); max-width:90%; min-width: 310px; }
      }
    `;
    document.head.appendChild(st);
  }

  // ====== EMOJI DINÂMICO ======
  function pickEmoji(kind,count){
    if(kind==='purchase') return count>=10?'🔥':count>=3?'👀':'👀';
    if(kind==='cart')     return count>=10?'🔥':count>=3?'👀':'👀';
    return count>=40?'🔥':count>=15?'👀':'👀'; // views
  }

  function render(kind,count,hours){
    document.querySelectorAll('.sp-badge').forEach(n=>n.remove());
    const badge=document.createElement('div'); badge.className='sp-badge';
    const emoji=pickEmoji(kind,count);
    const text = kind==='purchase' ? T.buy(count,hours,NF.format)
               : kind==='cart'     ? T.cart(count,hours,NF.format)
               : T.now(count,NF.format);
    badge.innerHTML = `
      <div class="sp-header">
        <div class="sp-title-wrap">
          <div class="sp-emoji">${emoji}</div>
          <div class="sp-title"><strong>${T.h}</strong></div>
        </div>
        <button class="sp-close" aria-label="${T.c}" title="${T.c}">✕</button>
      </div>
      <p class="sp-text">${text}</p>
    `;
    badge.querySelector('.sp-close').addEventListener('click', ()=>badge.remove());
    anchor.appendChild(badge);
    if (AUTO_CLOSE_MS>0) setTimeout(()=>badge.remove(), AUTO_CLOSE_MS);
  }

  const slider = $('.product-holder .column-images .slick-slider') || $('.column-images .slick-slider');
  if (slider){
    slider.addEventListener('afterChange', ()=>{
      anchor = findAnchor();
      if (getComputedStyle(anchor).position==='static') anchor.style.position='relative';
      const b=document.querySelector('.sp-badge'); if(b && b.parentElement!==anchor){ anchor.appendChild(b); }
    });
  }

  // ====== BUSCAR STATS E MOSTRAR  <<< ALTERADO
  const rnd=(a,b)=>Math.floor(a+Math.random()*(b-a+1));
  fetch(WORKER + "/get?sku=" + encodeURIComponent(sku), { cache:"no-store" })
    .then(r=>r.ok?r.json():Promise.reject())
    .then(d=>{
      const v=+d.views||0, p=+d.purchases||0 c=+d.carts||0;; // d.carts existe se quiseres usar
      for (const k of ORDER){
        if (k==='purchase' && p>0){ render('purchase', p, 48); return; }
        if (k === 'cart' && c > 0) { render('cart', c, 12); return; }
        if (k==='view' && v>0){ render('view', v, 6); return; }
      }
      render('view', rnd(18,55), 6); // fallback demo
    })
    .catch(()=>render('view', rnd(18,55), 6));
})();
