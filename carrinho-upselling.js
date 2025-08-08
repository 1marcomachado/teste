window.addEventListener("load", () => {
(async () => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('mostrar_carrossel') !== '1') return;

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
    .upselling-carousel .carousel-title { font-size: 16px; font-weight: 600; margin: 0; color: #000; }
    .upselling-carousel .upselling-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
    @media (min-width: 768px){ .upselling-carousel .upselling-grid { grid-template-columns: repeat(4, 1fr); } }
    .upselling-carousel .product .image img { width: 100%; height: auto; display: block; }
    .upselling-carousel .product .desc { margin-top: 12px; }
    .upselling-carousel .wrapper-top { padding: 0 10px 10px; border-bottom: 1px solid #e6e6e6; }
    .upselling-carousel .brand { float: left; font-size: 12px; color: #000; font-family: 'Metrocity-Medium', Arial, Helvetica, 'Segoe UI', sans-serif; }
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

    /* Área da imagem com overlay interno */
    .upselling-carousel .image { position: relative; overflow: hidden; }
    .upselling-carousel .size-popup-button {
      position: absolute; bottom: 8px; left: 8px; background-color: #bcbcbc; color: #fff;
      font-size: 12px; padding: 3px 6px; cursor: pointer; z-index: 10;
    }

    /* ===== DESKTOP: overlay DENTRO da imagem, ANCORA EM BAIXO e cresce para CIMA ===== */
    @media (min-width: 768px) {
      .upselling-carousel .sizes-list {
        display: none;
        position: absolute;
        bottom: 0;            /* cola ao fundo da imagem */
        left: 0;
        right: 0;
        background: rgba(255,255,255);
        z-index: 999;
        padding: 10px 12px;
        box-sizing: border-box;
        flex-direction: column-reverse;   /* ordem invertida: começa em baixo */
        align-items: flex-start;
        gap: 10px;
        max-height: 75%;      /* altura máxima relativa à imagem */
        overflow-y: auto;     /* scroll interno para cima */
        border: 1px solid #000;
        scrollbar-width: thin;
      }
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

    /* ===== MOBILE: bottom sheet (metade do ecrã) ===== */
    @media (max-width: 767.98px) {
      .upselling-carousel .sizes-list { display: none !important; } /* não usamos o overlay na imagem */
      .upselling-size-backdrop {
        position: fixed; inset: 0; background: rgba(0,0,0,.35); z-index: 9998; display: none;
      }
      .upselling-size-modal {
        position: fixed; z-index: 9999; display: none;
        left: 0; right: 0; bottom: 0; top: auto;
        width: 100vw; max-height: 50vh; background: #fff; border: 1px solid #000;
        box-shadow: 0 -10px 30px rgba(0,0,0,.2);
      }
      .upselling-size-modal-header {
        padding: 12px 16px; font-weight: 600; border-bottom: 1px solid #eee;
        display: flex; justify-content: space-between; align-items: center;
      }
      .upselling-size-modal-close { cursor: pointer; font-size: 20px; line-height: 1; }
      .upselling-size-modal-body { padding: 12px 16px 16px; max-height: calc(50vh - 52px); overflow-y: auto; }
      .upselling-size-modal-body .size-option {
        padding: 10px 14px; font-size: 15px; cursor: pointer; transition: background .2s ease; border-radius: 6px;
      }
      .upselling-size-modal-body .size-option:hover { background: #f5f5f5; }
      .upselling-size-modal-body .out-of-stock { opacity: .5; text-decoration: line-through; pointer-events: none; }
    }

    /* ===== TOAST (topo, fundo preto, sem emoji) ===== */
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
    .upselling-toast.success { background: #111; color: #fff; }
    .upselling-toast.error   { background: #111; color: #fff; }
  `;
  document.head.appendChild(style);

  // ===== MOBILE MODAL (criado sempre; só aparece em mobile) =====
  const modalBackdrop = document.createElement('div');
  modalBackdrop.className = 'upselling-size-backdrop';
  const modal = document.createElement('div');
  modal.className = 'upselling-size-modal';
  modal.innerHTML = `
    <div class="upselling-size-modal-header">
      <span>Seleciona o tamanho</span>
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
    modal.querySelector('.upselling-size-modal-header span').textContent = 'Seleciona o tamanho';
    modalBackdrop.style.display = 'block';
    modal.style.display = 'block';
    body.scrollTop = 0;
  }
  function closeSizeModal(){ modal.style.display = 'none'; modalBackdrop.style.display = 'none'; }
  modalBackdrop.addEventListener('click', closeSizeModal);
  modal.querySelector('.upselling-size-modal-close').addEventListener('click', closeSizeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSizeModal(); });

  // ===== TOAST =====
  const toast = document.createElement('div');
  toast.className = 'upselling-toast';
  document.body.appendChild(toast);
  function showToast(msg, type='success', ms=2200){
    toast.className = `upselling-toast ${type}`;
    toast.textContent = msg;         // sem emoji
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
  title.textContent = 'Talvez te interesse';
  header.appendChild(title);
  wrapper.appendChild(header);

  const grid = document.createElement('div');
  grid.className = 'upselling-grid';

  sugestoes.forEach(s => {
    const item = document.createElement('div');
    item.className = 'grid-item';
    const sizesList = Array.isArray(s.variantes) && s.variantes.length
      ? `<div class="sizes-list">${s.variantes.map(v => `
        <div class="${v.availability !== 'in stock' ? 'out-of-stock' : ''}" data-id="${v.id}">${v.size}</div>`).join('')}</div>`
      : '';

    item.innerHTML = `
      <article class="product">
        <div class="image">
          <a href="/item_${s.id}.html">
            <figure style="margin:0">
              <img src="${s.image}" alt="${s.title}" title="${s.title}" loading="lazy">
            </figure>
          </a>
          <div class="size-popup-button">+</div>
          ${sizesList}
        </div>
        <div class="desc">
          <a href="/item_${s.id}.html">
            <div class="wrapper-top clearfix">
              <p class="brand">${s.brand || ''}</p>
              <p class="available-colors">${s.cores || ''}</p>
            </div>
            <div class="wrapper-bottom">
              <p class="name">${s.title}</p>
              <div class="price clearfix">
                <p class="current">${(s.price || '').replace('.', ',')} €</p>
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

  // ===== CLICKS =====
  // Desktop: abrir overlay dentro da imagem (ancorado em baixo) e fechar ao clicar fora
  document.addEventListener('click', function (e) {
    if (window.innerWidth < 768) return; // só desktop
    document.querySelectorAll('.upselling-carousel .sizes-list').forEach(p => p.style.display = 'none');

    if (e.target.classList.contains('size-popup-button')) {
      const sizes = e.target.parentElement.querySelector('.sizes-list');
      if (sizes) {
        sizes.style.display = 'flex';
        // como a lista é column-reverse, rola para o fundo para começar em baixo
        sizes.scrollTop = sizes.scrollHeight;
      }
      e.stopPropagation();
    }
    if (e.target.closest('.sizes-list')) e.stopPropagation();
  });

  // Mobile: abrir modal half-screen
  document.addEventListener('click', function (e) {
    if (window.innerWidth >= 768) return; // só mobile
    const btn = e.target.closest('.size-popup-button');
    if (!btn) return;

    const product = btn.closest('article.product');
    if (!product) return;

    const sizesListEl = product.querySelector('.sizes-list');
    let variantes = [];
    if (sizesListEl) {
      variantes = Array.from(sizesListEl.querySelectorAll('div')).map(div => ({
        id: div.getAttribute('data-id'),
        size: div.textContent.trim(),
        availability: div.classList.contains('out-of-stock') ? 'out' : 'in stock'
      }));
    }
    const prodTitle = product.querySelector('.name')?.textContent.trim() || '';
    openSizeModal(prodTitle, variantes);
  });

  // Adicionar ao carrinho (desktop overlay e mobile modal)
  document.addEventListener('click', function (e) {
    const desktopOpt = (window.innerWidth >= 768)
      ? e.target.closest('.sizes-list div:not(.out-of-stock)')
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
          showToast('Adicionado ao carrinho', 'success');
          setTimeout(() => window.location.reload(), 900);
        } else {
          if (window.innerWidth < 768) closeSizeModal();
          showToast('Erro ao adicionar ao carrinho', 'error', 2800);
        }
      })
      .catch(() => {
        if (window.innerWidth < 768) closeSizeModal();
        showToast('Erro ao adicionar ao carrinho', 'error', 2800);
      });
  });
})();
});
