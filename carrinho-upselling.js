window.addEventListener("load", () => {
(async () => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('mostrar_carrossel') !== '1') return;

  const target = document.querySelector('.explore-gift-overlay');
  if (!target) return;

  // ====== STYLES ======
  const style = document.createElement('style');
  style.textContent = `
    .upselling-carousel {
      padding: 0 15px;
      margin: 0 auto;
    }
    @media (max-width: 768px) {
      .container.upselling-carousel {
        padding-left: 0px;
        padding-right: 0px;
      }
    }
    .upselling-carousel a:hover { text-decoration:none; }
    .upselling-carousel .carousel-header { margin-bottom: 12px; }
    .upselling-carousel .carousel-title {
      font-size: 16px; font-weight: 600; margin: 0; color: #000;
    }
    .upselling-carousel .upselling-grid {
      display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;
    }
    @media (min-width: 768px) {
      .upselling-carousel .upselling-grid { grid-template-columns: repeat(4, 1fr); }
    }
    .upselling-carousel .product .image img { width: 100%; height: auto; display: block; }
    .upselling-carousel .product .desc { margin-top: 12px; }
    .upselling-carousel .wrapper-top {
      padding: 0 10px 10px; border-bottom: 1px solid #e6e6e6;
    }
    .upselling-carousel .brand {
      float: left; font-size: 12px; color: #000;
      font-family: 'Metrocity-Medium', Arial, Helvetica, 'Segoe UI', sans-serif;
    }
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

    .upselling-carousel .size-popup-button {
      position: absolute; bottom: 8px; left: 8px; background-color: #bcbcbc;
      color: #fff; font-size: 12px; padding: 3px 6px; border-radius: 3px;
      cursor: pointer; z-index: 10;
    }
    .upselling-carousel .image { position: relative; overflow: hidden; }

    /* A lista original deixa de ser usada como popup sobre a imagem */
    .upselling-carousel .sizes-list { display: none !important; }

    /* -------- Modal global (desktop centrado) -------- */
    .upselling-size-backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,.35); z-index: 9998; display: none;
    }
    .upselling-size-modal {
      position: fixed; z-index: 9999; display: none;
      left: 50%; top: 50%; transform: translate(-50%, -50%);
      width: min(420px, 92vw); max-height: 70vh; background: #fff;
      border: 1px solid #000; border-radius: 10px; overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,.2);
    }
    .upselling-size-modal-header {
      padding: 12px 16px; font-weight: 600; border-bottom: 1px solid #eee;
      display: flex; justify-content: space-between; align-items: center;
    }
    .upselling-size-modal-close { cursor: pointer; font-size: 20px; line-height: 1; }
    .upselling-size-modal-body { padding: 12px 16px 16px; max-height: 60vh; overflow-y: auto; }
    .upselling-size-modal-body .size-option {
      padding: 10px 14px; font-size: 15px; cursor: pointer; transition: background .2s ease;
      border-radius: 6px;
    }
    .upselling-size-modal-body .size-option:hover { background: #f5f5f5; }
    .upselling-size-modal-body .out-of-stock {
      opacity: .5; text-decoration: line-through; pointer-events: none;
    }

    /* -------- Mobile: bottom-sheet ~50% do ecrã -------- */
    @media (max-width: 768px) {
      .upselling-size-modal {
        left: 0; right: 0; bottom: 0; top: auto; transform: none;
        width: 100vw; max-height: 50vh; border-radius: 12px 12px 0 0;
      }
      .upselling-size-modal-body { max-height: calc(50vh - 52px); }
    }
  `;
  document.head.appendChild(style);

  // ====== MODAL GLOBAL (uma vez) ======
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
    modal.querySelector('.upselling-size-modal-header span').textContent =
      title ? `Seleciona o tamanho — ${title}` : 'Seleciona o tamanho';

    modalBackdrop.style.display = 'block';
    modal.style.display = 'block';
    body.scrollTop = 0; // começa no topo
  }
  function closeSizeModal() {
    modal.style.display = 'none';
    modalBackdrop.style.display = 'none';
  }
  modalBackdrop.addEventListener('click', closeSizeModal);
  modal.querySelector('.upselling-size-modal-close').addEventListener('click', closeSizeModal);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSizeModal(); });

  // ====== BUSCAR REFS DA PÁGINA ======
  const refs = [...new Set(
    Array.from(document.querySelectorAll('.rdc-shop-prd-reference-value'))
      .map(el => {
        const match = el.textContent.match(/#?([A-Z0-9\-]+)(?=\|)?/i);
        return match ? match[1].trim() : null;
      })
      .filter(Boolean)
  )];
  if (!refs.length) return;

  // ====== FETCH JSON ======
  let data;
  try {
    const res = await fetch('https://raw.githubusercontent.com/1marcomachado/upselling-json/main/upselling_final.json');
    data = await res.json();
  } catch (e) {
    console.error('Erro ao carregar sugestões de upselling:', e);
    return;
  }
  if (!data || !Array.isArray(data.produtos)) return;

  // ====== CALCULAR SUGESTÕES ======
  const sugestoesSet = new Set();
  refs.forEach(ref => {
    const produto = data.produtos.find(p => p.mpn === ref || p.reference === ref);
    if (produto?.sugestoes) produto.sugestoes.forEach(s => sugestoesSet.add(s));
  });

  let sugestoes = data.produtos.filter(p => sugestoesSet.has(p.mpn));
  sugestoes = sugestoes.filter((v, i, a) => a.findIndex(t => t.mpn === v.mpn) === i);
  sugestoes = sugestoes.sort(() => Math.random() - 0.5).slice(0, 16);
  if (!sugestoes.length) return;

  // ====== RENDER CARROSSEL ======
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

    // Guardamos as variantes no DOM (ocultas) para ler quando abrir o modal
    const sizesList = Array.isArray(s.variantes) && s.variantes.length
      ? `<div class="sizes-list">${s.variantes.map(v => `
        <div class="${v.availability !== 'in stock' ? 'out-of-stock' : ''}" data-id="${v.id}">${v.size}</div>`).join('')}</div>`
      : '';

    item.innerHTML = `
      <article class="product" data-row="1">
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

  // ====== ABRIR MODAL AO CLICAR NO "+" ======
  document.addEventListener('click', function (e) {
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

  // ====== ADICIONAR AO CARRINHO A PARTIR DO MODAL ======
  document.addEventListener('click', function (e) {
    const opt = e.target.closest('.upselling-size-modal .size-option:not(.out-of-stock)');
    if (!opt) return;

    const productId = opt.getAttribute('data-id');
    if (!productId) return;

    fetch(`https://www.bzronline.com/api/api.php/addToBasket/5/0/${productId}/1/0`)
      .then(res => res.json())
      .then(json => {
        if (json?.status === "true") {
          closeSizeModal();
          window.location.reload();
        } else {
          closeSizeModal();
          alert("Erro ao adicionar ao carrinho");
        }
      })
      .catch(() => {
        closeSizeModal();
        alert("Erro ao adicionar ao carrinho");
      });
  });
})();
});
