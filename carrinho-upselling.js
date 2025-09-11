  const LANG = (document.body.getAttribute("data-shop-lang") || document.documentElement.lang || "pt").toLowerCase();
  const FALLBACK_LANG = "pt";

  /* Textos fixos */
  const I18N = {
    pt: { maybe:"Talvez te interesse", added:"Produto adicionado ao carrinho", size:"Seleciona o teu tamanho", seeCart:"VER CARRINHO", addToCart:"Adicionado ao carrinho", addToFav:"Adicionado aos favoritos", removeFromFav:"Removido dos favoritos", errorCart:"Erro ao adicionar ao carrinho", errorFav:"Erro ao atualizar favoritos", sizeLabel: "Tamanho", favAdd: "Adicionar aos favoritos", favRemove: "Remover dos favoritos" },
    es: { maybe:"Quizás te interese", added:"Producto añadido al carrito", size:"Selecciona tu talla", seeCart:"VER CARRITO", addToCart:"Añadido al carrito", addToFav:"Añadido a favoritos", removeFromFav:"Eliminado de favoritos", errorCart:"Error al añadir al carrito", errorFav:"Error al actualizar favoritos",  sizeLabel: "Tamanho", favAdd: "Añadir a favoritos", favRemove: "Quitar de favoritos" },
    en: { maybe:"You may also like", added:"Product added to cart", size:"Select your size", seeCart:"VIEW CART", addToCart:"Added to cart", addToFav:"Added to wishlist", removeFromFav:"Removed from wishlist", errorCart:"Error adding to cart", errorFav:"Error updating wishlist", sizeLabel: "Tamanho", favAdd: "Add to wishlist",
    favRemove: "Remove from wishlist" }
  };
  function t(key){ return (I18N[LANG] && I18N[LANG][key]) || (I18N[FALLBACK_LANG] && I18N[FALLBACK_LANG][key]) || key; }

  function pickLocalized(obj, baseKey) {
    if (!obj) return "";
    const val = obj[baseKey];
    if (val && typeof val === "object") {
      return val[LANG] || val[FALLBACK_LANG] || Object.values(val).find(Boolean) || "";
    }
    const flat = obj[`${baseKey}_${LANG}`] || obj[`${baseKey}_${LANG.toUpperCase()}`];
    if (flat) return flat;
    if (typeof val === "string") return val; // já é string (ex.: só PT)
    const fallbackFlat = obj[`${baseKey}_${FALLBACK_LANG}`] || obj[`${baseKey}_${FALLBACK_LANG.toUpperCase()}`];
    return fallbackFlat || "";
  }
  function formatPriceEUR(val){
  if (val == null || val === '') return '';
  const n = typeof val === 'number' ? val : parseFloat(String(val).replace(',', '.'));
  if (isNaN(n)) return '';
  return n.toFixed(2).replace('.', ',') + ' €';
}

function getPriceInfoSimple(p){
  const cur = p.sale_price ?? null;          // preço novo
  const orig = p.price;                       // preço antigo
  const toNum = v => typeof v === 'number' ? v : parseFloat(String(v).replace(',', '.'));

  const nCur  = cur != null ? toNum(cur)  : null;
  const nOrig = orig != null ? toNum(orig) : null;

  // Só mostra “antigo + novo” se o sale_price existir e for mesmo menor
  if (nCur != null && nOrig != null && nCur < nOrig){
    return {
      originalText: formatPriceEUR(nOrig),
      currentText:  formatPriceEUR(nCur)
    };
  }

  // Caso contrário, só o preço normal
  return {
    originalText: '',
    currentText: formatPriceEUR(nOrig)
  };
}

window.addEventListener("load", () => {  
(async () => {
  if (!window.location.pathname.includes("/checkout/")) return;

  const target = document.querySelector('.explore-gift-overlay');
  if (!target) return;

  // ===== CSS =====
  const style = document.createElement('style');

  style.textContent = `
    .upselling-carousel { padding: 0 15px; margin: 0 auto; }
    @media (max-width: 768px) {
      .container.upselling-carousel { padding-left: 0; padding-right: 0; }
    }
    .upselling-carousel a:hover { text-decoration:none; }
    .upselling-carousel .carousel-header { margin-bottom: 12px; }
    .upselling-carousel .carousel-title { font-size: 16px; font-weight: 600; margin: 0; color: #000; text-align:left; }
    .upselling-carousel .upselling-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
    @media (min-width: 768px){ .upselling-carousel .upselling-grid { grid-template-columns: repeat(4, 1fr); } }
    .upselling-carousel .product .image img { width: 100%; height: auto; display: block; }
    .upselling-carousel .product .desc { margin-top: 12px; }
    .upselling-carousel .wrapper-top { padding: 0 10px 10px; border-bottom: 1px solid #e6e6e6; }
    .upselling-carousel .brand { float: left; font-size: 12px; color: #000; font-family: 'Metrocity-Medium', Arial, Helvetica, 'Segoe UI', sans-serif; width: 98px; line-height: 12px;}
    .upselling-carousel .available-colors { float: right; font-size: 11px; color: #555; }
    .upselling-carousel .wrapper-bottom { padding: 14px 10px 0; text-align: left; }
    .upselling-carousel .name {
      font-size: 13px; font-weight: bold; margin: 6px 0 4px; line-height: 1.2em;
      min-height: 3.6em; overflow: hidden; text-overflow: ellipsis;
      display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;
      color: #333; font-family: 'Metrocity-Book', Arial, Helvetica, 'Segoe UI', sans-serif;
    }
    .upselling-carousel article.product:hover .desc .name { text-decoration: underline; }
    .upselling-carousel .price .current {
      font-size: 14px; color: #000; margin-top: 4px; text-align: left;
      font-family: 'Metrocity-Medium', Arial, Helvetica, 'Segoe UI', sans-serif; font-weight: normal;
    }
    .upselling-carousel .price .old {
      font-size: 14px; color: #000; margin-right: 17px; text-decoration: line-through; margin-top: 4px; text-align: left;
      font-family: 'Metrocity-Medium', Arial, Helvetica, 'Segoe UI', sans-serif; font-weight: normal;
    }

    /* Área da imagem com overlay interno */
    .upselling-carousel .image { position: relative; overflow: hidden; }
    .upselling-carousel .size-popup-button {
      position: absolute; bottom: 8px; left: 8px; background-color: #bcbcbc; color: #fff;
      font-size: 12px; padding: 3px 6px; cursor: pointer; z-index: 10;
    }
    .upselling-carousel .size-popup-button::before { 
      content: "";
      position: absolute;
      top: -20px;
      left: -20px;
      right: -20px;
      bottom: -20px;
    }

    /* ===== DESKTOP: lista de tamanhos (abre de cima para baixo) ===== */
    @media (min-width: 768px) {
      .upselling-carousel .sizes-list {
        display: none;
        position: absolute;
        bottom: 0;
        left: 0; right: 0;
        background: #fff;
        z-index: 999;
        border: 0.5px solid #000;
        padding: 0;
        box-sizing: border-box;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        max-height: 75%;
        overflow-y: auto; /* scroll só quando necessário */
        scrollbar-width: thin;
        scrollbar-color: #999 transparent;
        text-align: center;
      }
      .upselling-carousel .sizes-list::-webkit-scrollbar { width: 6px; }
      .upselling-carousel .sizes-list::-webkit-scrollbar-track { background: transparent; }
      .upselling-carousel .sizes-list::-webkit-scrollbar-thumb { background-color: #999; border-radius: 3px; }
    }

    .upselling-carousel .sizes-list-header {
      font-size: 13px;
      font-weight: 400;
      color: #000;
      padding: 6px 12px;
      border-bottom: 1px solid #ddd;
      width: 100%;
      box-sizing: border-box;
      background: #fff;
      pointer-events: none;
      cursor: default;
      position: sticky; /* fica sempre visível */
      top: 0;
      z-index: 1;
    }

    .upselling-carousel .sizes-list div {
      padding: 8px 12px;
      font-size: 14px;
      cursor: pointer;
      transition: background .2s ease;
      min-width: 100%;
    }
    .upselling-carousel .sizes-list div:hover { background-color: #f5f5f5; }
    .upselling-carousel .sizes-list .out-of-stock {
      opacity: .5; text-decoration: line-through; pointer-events: none;
      background: #eee; border-color: #ddd;
    }

    /* ===== MOBILE ===== */
    @media (max-width: 767.98px) {
      .upselling-carousel .sizes-list { display: none !important; }
      .upselling-size-backdrop {
        position: fixed; inset: 0; background: rgba(0,0,0,.35); z-index: 9998; display: none;
      }
      .upselling-size-modal {
        position: fixed; z-index: 9999; display: none;
        left: 0; right: 0; bottom: 0;
        width: 100vw; max-height: 50vh; background: #fff; border: 1px solid #000;
        box-shadow: 0 -10px 30px rgba(0,0,0,.2);
      }
      .upselling-size-modal-header {
        position: relative;
        padding: 12px 16px;
        font-weight: 600;
        border-bottom: 1px solid #eee;
        text-align: center;
      }
      .upselling-size-modal-close {
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        font-size: 20px;
        line-height: 1;
      }
      .upselling-size-modal-body {
        padding: 12px 16px 16px;
        max-height: calc(50vh - 52px);
        overflow-y: auto;
      }
      .upselling-size-modal-body .size-option {
        padding: 10px 14px; font-size: 15px; cursor: pointer; transition: background .2s ease; border-radius: 6px; text-align: center;
      }
      .upselling-size-modal-body .size-option:hover { background: #f5f5f5; }
      .upselling-size-modal-body .out-of-stock { opacity: .5; text-decoration: line-through; pointer-events: none; }
    }

    /* ===== TOAST ===== */
    .upselling-toast {
      position: fixed;
      z-index: 10000;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: none;
      padding: 10px 16px;
      font-size: 14px;
      text-align: center;
      border-radius: 6px;
      background: #111;
      color: #fff;
      border: none;
      box-shadow: 0 6px 18px rgba(0,0,0,.2);
    }
    .upselling-toast.success { background: #111; }
    .upselling-toast.error   { background: red; }

    /* ========================== ⭐ FAVORITOS (sprite vertical) ========================== */
    .upselling-panel .available-colors {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .fav-btn{
      width: 26px;
      height: 26px;
      margin-left: 4px;
      border: none;
      background: url('https://1250447178.rsc.cdn77.org/sysimages/icon-wishlist-product.png') no-repeat 0 0;
      background-size: 26px 52px;   /* 2 frames verticais (26x26 cada) */
      cursor: pointer;
      padding: 0px;
      background-color: unset !important;
      border-color: unset !important;
    }
    .fav-btn:hover{
      background-color: unset !important;
      border-color: unset !important;
    }
    .fav-btn.active{
      background-position: 0 -26px; /* mostra o frame de baixo (ativo) */
    }`;
  document.head.appendChild(style);

  // ===== MOBILE MODAL =====
  const modalBackdrop = document.createElement('div');
  modalBackdrop.className = 'upselling-size-backdrop';
  const modal = document.createElement('div');
  modal.className = 'upselling-size-modal';
  modal.innerHTML = `
    <div class="upselling-size-modal-header">
      <span>${t("size")}</span>
      <span class="upselling-size-modal-close" aria-label="Fechar">&times;</span>
    </div>
    <div class="upselling-size-modal-body"></div>
  `;
  document.body.appendChild(modalBackdrop);
  document.body.appendChild(modal);

  function openSizeModal(title, variantes) {
    const body = modal.querySelector('.upselling-size-modal-body');
    body.innerHTML = (variantes || []).map(v => `
      <div class="size-option ${v.availability !== 'in stock' ? 'out-of-stock' : ''}" data-id="${v.id}">
        ${v.size}
      </div>
    `).join('');
    modalBackdrop.style.display = 'block';
    modal.style.display = 'block';
    body.scrollTop = 0;
  }
  function closeSizeModal(){ modal.style.display = 'none'; modalBackdrop.style.display = 'none'; }
  modalBackdrop.addEventListener('click', closeSizeModal);
  modal.querySelector('.upselling-size-modal-close').addEventListener('click', closeSizeModal);

  // ===== TOAST =====
  const toast = document.createElement('div');
  toast.className = 'upselling-toast';
  document.body.appendChild(toast);
  function showToast(msg, type='success', ms=2200){
    toast.className = `upselling-toast ${type}`;
    toast.textContent = msg;
    toast.style.display = 'block';
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => { toast.style.display = 'none'; }, ms);
  }

  // ===== REFS =====
  const refs = [...new Set(
    Array.from(document.querySelectorAll('.rdc-shop-prd-reference-value'))
      .map(el => { const m = el.textContent.match(/#?([A-Z0-9\-]+)(?=\|)?/i); return m ? m[1].trim() : null; })
      .filter(Boolean)
  )];
  if (!refs.length) return;

  // ===== FETCH JSON =====
  let data;
  try {
    const res = await fetch('https://raw.githubusercontent.com/1marcomachado/upselling-json/main/upselling_final.json');
    data = await res.json();
  } catch (e) { console.error('Erro ao carregar sugestões de upselling:', e); return; }
  if (!data || !Array.isArray(data.produtos)) return;

  // ===== SUGESTÕES =====
  const sugestoesSet = new Set();
  refs.forEach(ref => {
    const produto = data.produtos.find(p => p.mpn === ref || p.reference === ref);
    if (produto?.sugestoes) produto.sugestoes.forEach(s => sugestoesSet.add(s));
  });

  let sugestoes = data.produtos.filter(p => sugestoesSet.has(p.mpn));
  sugestoes = sugestoes.filter((v, i, a) => a.findIndex(t => t.mpn === v.mpn) === i);
  sugestoes = sugestoes.sort(() => Math.random() - 0.5).slice(0, 16);
  if (!sugestoes.length) return;

  // ===== RENDER =====
  const wrapper = document.createElement('div');
  wrapper.className = 'upselling-carousel container';
  const header = document.createElement('div');
  header.className = 'carousel-header';
  const title = document.createElement('h3');
  title.className = 'carousel-title';
  title.textContent = t('maybe');
  header.appendChild(title);
  wrapper.appendChild(header);

  const grid = document.createElement('div');
  grid.className = 'upselling-grid';

  sugestoes.forEach(s => {
    const item = document.createElement('div');
    item.className = 'grid-item';
    const sizesList = Array.isArray(s.variantes) && s.variantes.length
      ? `<div class="sizes-list">
           <div class="sizes-list-header">${t("size")}</div>
           ${s.variantes.map(v => `
             <div class="${v.availability !== 'in stock' ? 'out-of-stock' : ''}" data-id="${v.id}">${v.size}</div>
           `).join('')}
         </div>`
      : '';
    const sTitle = pickLocalized(s, "title") || "";  
    const pInfoAdded = getPriceInfo(s);
    item.innerHTML = `
      <article class="product">
        <div class="image">
          <a href="/item_${s.id}.html">
            <figure style="margin:0">
              <img src="${s.image}" alt="${sTitle}" title="${sTitle}" loading="lazy">
            </figure>
          </a>
          <div class="size-popup-button">+</div>
          ${sizesList}
        </div>
        <div class="desc">
          <a href="/item_${s.id}.html">
            <div class="wrapper-top clearfix">
              <p class="brand">${s.brand || ''}</p>
              <p class="available-colors">${s.cores || ''}
              <button class="fav-btn" type="button" data-id="${s.id}"></button></p>
            </div>
            <div class="wrapper-bottom">
              <p class="name">${sTitle}</p>
                <div class="price clearfix">
                  ${pInfoAdded.originalText ? `<p class="old">${pInfoAdded.originalText}</p>` : ``}
                  <p class="current">${pInfoAdded.currentText}</p>
                </div>
            </div>
          </a>
        </div>
      </article>
    `;
    grid.appendChild(item);
  });

  wrapper.appendChild(grid);

  const isMobile = window.innerWidth < 768;
  const mobileTarget = document.querySelector('#rdc-shop-order-resume-mobile');
  if (isMobile && mobileTarget) {
    mobileTarget.parentNode.insertBefore(wrapper, mobileTarget.nextSibling);
  } else {
    target.parentNode.insertBefore(wrapper, target.nextSibling);
  }

  // ===== CLICK HANDLERS =====
  // Desktop: abre no topo (título sempre visível)
  document.addEventListener('click', function (e) {
    if (window.innerWidth < 768) return;

    // fecha outros
    document.querySelectorAll('.upselling-carousel .sizes-list').forEach(p => p.style.display = 'none');

    if (e.target.classList.contains('size-popup-button')) {
      const sizes = e.target.parentElement.querySelector('.sizes-list');
      if (sizes) {
        sizes.style.display = 'flex';
        sizes.scrollTop = 0; // começa sempre no topo (header visível)
      }
      e.stopPropagation();
    }
    if (e.target.closest('.sizes-list')) e.stopPropagation();
  });

  // Mobile: abre modal half-screen
  document.addEventListener('click', function (e) {
    if (window.innerWidth >= 768) return;
    const trigger = e.target.closest('.size-popup-button, .image, .image a');
    if (!trigger) return;

    const linkDentroDaImagem = e.target.closest('.image a');
    if (linkDentroDaImagem) { e.preventDefault(); e.stopPropagation(); }

    const product = trigger.closest('article.product');
    if (!product) return;

    const sizesListEl = product.querySelector('.sizes-list');
    let variantes = [];
    if (sizesListEl) {
      variantes = Array.from(sizesListEl.querySelectorAll('div[data-id]')).map(div => ({
        id: div.getAttribute('data-id'),
        size: div.textContent.trim(),
        availability: div.classList.contains('out-of-stock') ? 'out' : 'in stock'
      }));
    }
    openSizeModal('', variantes);
  }, { passive: false });

  // Adicionar ao carrinho (desktop e mobile)
  document.addEventListener('click', function (e) {
    const desktopOpt = (window.innerWidth >= 768)
      ? e.target.closest('.sizes-list div[data-id]:not(.out-of-stock)')
      : null;
    const mobileOpt = (window.innerWidth < 768)
      ? e.target.closest('.upselling-size-modal .size-option:not(.out-of-stock)')
      : null;
    const opt = desktopOpt || mobileOpt;
    if (!opt) return;

    const productId = opt.getAttribute('data-id');
    if (!productId) return;

    fetch(`https://www.bzronline.com/api/api.php/addToBasket/5/0/${productId}/1/0`)
      .then(res => res.json())
      .then(json => {
        const ok = (json?.status === true || json?.status === "true");
        if (ok) {
          if (window.innerWidth < 768) closeSizeModal();
          showToast(t("addToCart"), 'success');
          setTimeout(() => window.location.reload(), 900);
        } else {
          if (window.innerWidth < 768) closeSizeModal();
          showToast(t("errorCart"), 'error', 2800);
        }
      })
      .catch(() => {
        if (window.innerWidth < 768) closeSizeModal();
        showToast(t("errorCart"), 'error', 2800);
      });
  });
  /* ========================== ⭐ FAVORITOS ========================== */
  document.addEventListener('click', async function (e) {
    const btn = e.target.closest('.fav-btn');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    const id = btn.getAttribute('data-id');
    const willAdd = !btn.classList.contains('active');

    // UI otimista
    btn.classList.toggle('active', willAdd);
    btn.setAttribute('aria-pressed', willAdd ? 'true' : 'false');
    btn.setAttribute('aria-label', willAdd ? t('favRemove') : t('favAdd'));
    btn.setAttribute('title', willAdd ? t('favRemove') : t('favAdd'));

    const WISHLIST_ADD    = id => `https://www.bzronline.com/api/api.php/addToWishList/${id}`;
    const WISHLIST_REMOVE = id => `https://www.bzronline.com/api/api.php/removeFromWishlist/${id}`;

    try {
      const url = willAdd ? WISHLIST_ADD(id) : WISHLIST_REMOVE(id);
      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Accept': 'application/json,*/*;q=0.9' }
      });

      let ok = res.ok;
      try {
        const data = await res.clone().json();
        if (typeof data?.status !== 'undefined') {
          ok = (data.status === true || data.status === 'true');
        }
      } catch { /* pode não ser JSON */ }

      if (!ok) throw new Error('Wishlist request failed');

      showToast(willAdd ? t("addToFav") : t("removeFromFav"), 'success');
    } catch (err) {
      // reverte UI se falhar
      const reverted = !willAdd;
      btn.classList.toggle('active', reverted);
      btn.setAttribute('aria-pressed', reverted ? 'true' : 'false');
      btn.setAttribute('aria-label', reverted ? t('favRemove') : t('favAdd'));
      btn.setAttribute('title', reverted ? t('favRemove') : t('favAdd'));
      showToast(t("errorFav"), 'error', 2600);
    }
  });
})();
});
