(function () {
  const params = new URLSearchParams(window.location.search);
  if (params.get('mostrar_carrossel') !== '1') return;
  const LANG = (document.body.getAttribute("data-shop-lang") || document.documentElement.lang || "pt").toLowerCase();
  const FALLBACK_LANG = "pt";

  /* Textos fixos */
  const I18N = {
    pt: { maybe:"Talvez te interesse", added:"Produto adicionado ao carrinho", size:"Seleciona o teu tamanho", seeCart:"VER CARRINHO", addToCart:"Adicionado ao carrinho", addToFav:"Adicionado aos favoritos", removeFromFav:"Removido dos favoritos", errorCart:"Erro ao adicionar ao carrinho", errorFav:"Erro ao atualizar favoritos", favAdd: "Adicionar aos favoritos", favRemove: "Remover dos favoritos" },
    es: { maybe:"Quizás te interese", added:"Producto añadido al carrito", size:"Selecciona tu talla", seeCart:"VER CARRITO", addToCart:"Añadido al carrito", addToFav:"Añadido a favoritos", removeFromFav:"Eliminado de favoritos", errorCart:"Error al añadir al carrito", errorFav:"Error al actualizar favoritos", favAdd: "Añadir a favoritos", favRemove: "Quitar de favoritos" },
    en: { maybe:"You may also like", added:"Product added to cart", size:"Select your size", seeCart:"VIEW CART", addToCart:"Added to cart", addToFav:"Added to wishlist", removeFromFav:"Removed from wishlist", errorCart:"Error adding to cart", errorFav:"Error updating wishlist", favAdd: "Add to wishlist",
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

  /* Locale & preço (EUR por defeito) */
  const LANG_TO_LOCALE = { pt: "pt-PT", es: "es-ES", en: "en-GB" };
  function formatPrice(input, currency="EUR"){
    const n = Number(String(input).replace(",", "."));
    if (Number.isNaN(n)) return String(input || "");
    return new Intl.NumberFormat(LANG_TO_LOCALE[LANG] || LANG_TO_LOCALE.pt, { style:"currency", currency, minimumFractionDigits:2 }).format(n).replace(/\u00A0/g, " ");
  }

  function waitForAngularInjector() {
    const appElement = document.querySelector('[ng-app]') || document.body;

    if (window.angular && angular.element(appElement).injector()) {
      const injector = angular.element(appElement).injector();

      injector.invoke(function ($rootScope) {
        /* ========================== TOAST (topo do ecrã) ========================== */
        const toast = document.createElement('div');
        toast.className = 'upselling-toast';
        document.body.appendChild(toast);

        function showToast(msg, type = 'success', ms = 2200) {
          toast.className = `upselling-toast ${type === 'error' ? 'error' : 'success'}`;
          toast.textContent = msg;
          toast.style.display = 'block';
          clearTimeout(showToast._t);
          showToast._t = setTimeout(() => { toast.style.display = 'none'; }, ms);
        }

        /* ========================== HELPERS ========================== */
        function isTamanhoSelecionadoProdutoBase() {
          return !!document.querySelector('.sizes label.sel');
        }
        function extractReferencia(fromElem) {
          const produtoElem = fromElem.closest('.produto');
          let refElem = produtoElem?.querySelector('.ref p.small') || document.querySelector('.ref p.small');
          return refElem ? refElem.textContent.trim() : null;
        }

        /* ========================== ⭐ WISHLIST API (sem localStorage) ========================== */
        const WISHLIST_ADD    = id => `https://www.bzronline.com/api/api.php/addToWishList/${id}`;
        const WISHLIST_REMOVE = id => `https://www.bzronline.com/api/api.php/removeFromWishlist/${id}`;

        /* ========================== ABRIR PAINEL ========================== */
        async function abrirPainelComCarrossel(referencia) {
          // Remove overlay anterior se existir
          document.querySelector('.upselling-overlay')?.remove();

          // Overlay + Painel
          const overlay = document.createElement('div');
          overlay.className = 'upselling-overlay';
          overlay.onclick = () => {
            overlay.remove();
            document.body.style.overflow = '';
          };

          const panel = document.createElement('div');
          panel.className = 'upselling-panel';
          panel.onclick = e => e.stopPropagation();

          // Botão FECHAR
          const closeBtn = document.createElement('button');
          closeBtn.className = 'upselling-panel-close';
          closeBtn.setAttribute('aria-label', 'Fechar');
          closeBtn.innerHTML = '&times;';
          closeBtn.addEventListener('click', () => {
            overlay.remove();
            document.body.style.overflow = '';
          });
          panel.appendChild(closeBtn);

          // Estrutura do painel
          const wrapper = document.createElement('div');
          wrapper.className = 'upselling-carousel';

          const header = document.createElement('div');
          header.className = 'carousel-header';
          const title = document.createElement('h3');
          title.className = 'carousel-title';
          title.textContent = t("maybe");
          header.appendChild(title);
          wrapper.appendChild(header);

          const gridContainer = document.createElement('div');
          gridContainer.className = 'upselling-grid';
          wrapper.appendChild(gridContainer);

          panel.appendChild(wrapper);
          overlay.appendChild(panel);
          document.body.appendChild(overlay);
          document.body.style.overflow = 'hidden';

          setTimeout(() => { panel.classList.add('open'); }, 10);

          // Carregar JSON
          let data;
          try {
            const res = await fetch('https://raw.githubusercontent.com/1marcomachado/upselling-json/main/upselling_final.json');
            data = await res.json();
          } catch (e) {
            console.error("Erro ao carregar upselling:", e);
            return;
          }

          const produto = data.produtos.find(p => p.mpn === referencia || p.reference === referencia);
          if (!produto?.sugestoes?.length) return;

          const sugestoes = data.produtos.filter(p => produto.sugestoes.includes(p.mpn));
          if (!sugestoes.length) return;

          // Produto adicionado (topo do painel)
          const produtoTitle = pickLocalized(produto, "title") || "";
          const addedNotice = document.createElement('div');
          addedNotice.className = 'added-product-notice';
          addedNotice.innerHTML = `
            <h3 class="added-title">${t("added")}</h3>
            <article class="product added-product-horizontal grid-item" data-row="1">
              <div class="image">
                <img src="${produto.image}" alt="${produtoTitle}" title="${produtoTitle}" loading="lazy">
                <br><a href="/checkout/v1/?id=1" class="btn-cart">${t("seeCart")}</a>
              </div>
              <div class="desc">
                <div class="wrapper-top clearfix">
                  <p class="brand">${produto.brand || ''}</p>
                </div>
                <div class="wrapper-bottom">
                  <p class="name">${produtoTitle}</p>
                  <p class="product-size">Tamanho: ${document.querySelector('.sizes label.sel')?.textContent.trim() || '-'}</p>
                  <div class="price clearfix">
                    <p class="current">${(produto.price || '').replace('.', ',')} €</p>
                  </div>
                </div>
              </div>
            </article>
            <hr class="separator">
          `;
          panel.insertBefore(addedNotice, wrapper);

          // Render das sugestões (com botão + e listas de tamanhos) + FAVORITOS no .available-colors
          sugestoes.forEach(s => {
            const slide = document.createElement('div');
            slide.className = 'grid-item';

            const sizesList = Array.isArray(s.variantes) && s.variantes.length
              ? `
                <div class="sizes-list" style="display:none;">
                  <div class="sizes-list-header">${t("size")}</div>
                  ${s.variantes.map(v => `
                    <div class="size-option ${v.availability !== 'in stock' ? 'out-of-stock' : ''}" data-id="${v.id}">
                      ${v.size}
                    </div>
                  `).join('')}
                </div>
              `
              : '';
            const sTitle = pickLocalized(s, "title") || "";          
            slide.innerHTML = `
              <article class="product" data-row="1" data-pid="${s.id}">
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
                      <p class="available-colors">
                        ${s.cores || ''}
                        <button class="fav-btn" type="button" data-id="${s.id}"></button>
                      </p>
                    </div>
                    <div class="wrapper-bottom">
                      <p class="name">${sTitle}</p>
                      <div class="price clearfix">
                        <p class="current">${(s.price || '').replace('.', ',')} €</p>
                      </div>
                    </div>
                  </a>
                </div>
              </article>
            `;
            gridContainer.appendChild(slide);
          });

          /* ============ MOBILE MODAL para tamanhos (half-screen) ============ */
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

          function openSizeModalFromProductCard(productCard) {
            const sizes = productCard.querySelectorAll('.sizes-list .size-option');
            const body = modal.querySelector('.upselling-size-modal-body');
            body.innerHTML = Array.from(sizes).map(opt => `
              <div class="size-option-modal ${opt.classList.contains('out-of-stock') ? 'out-of-stock' : ''}"
                   data-id="${opt.getAttribute('data-id')}">
                ${opt.textContent.trim()}
              </div>
            `).join('');
            modalBackdrop.classList.add('show');
            modal.classList.add('show');
            body.scrollTop = 0;
          }
          function closeSizeModal(){ modalBackdrop.classList.remove('show'); modal.classList.remove('show'); }
          modalBackdrop.addEventListener('click', closeSizeModal);
          modal.querySelector('.upselling-size-modal-close').addEventListener('click', closeSizeModal);
          document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSizeModal(); });

          /* ========================== EVENTOS NO PAINEL ========================== */

          // Fechar outros dropdowns desktop
          function closeAllDesktopLists(ctx) {
            ctx.querySelectorAll('.sizes-list').forEach(p => {
              if (getComputedStyle(p).display !== 'none') p.style.display = 'none';
            });
          }

          // Botão "+" → abrir lista de tamanhos (desktop) ou modal (mobile)
          panel.addEventListener('click', function (e) {
            const plus = e.target.closest('.size-popup-button');
            if (!plus) return;

            const product = plus.closest('article.product');
            const list = product.querySelector('.sizes-list');

            if (window.innerWidth < 768) {
              if (list) openSizeModalFromProductCard(product);
              e.stopPropagation();
              e.preventDefault();
              return;
            }

            if (list) {
              closeAllDesktopLists(panel);
              list.style.display = (list.style.display === 'none' || !list.style.display) ? 'block' : 'none';
              if (list.style.display === 'block') {
                if (list.scrollHeight > list.clientHeight) {
                  list.scrollTop = list.scrollHeight;
                } else {
                  list.scrollTop = 0;
                }
              }
            }
            e.stopPropagation();
            e.preventDefault();
          });

          // Seleção (desktop): ADD TO BASKET
          panel.addEventListener('click', function (e) {
            const desktopOpt = (window.innerWidth >= 768)
              ? e.target.closest('.sizes-list .size-option:not(.out-of-stock)')
              : null;

            if (desktopOpt) {
              const variantId = desktopOpt.getAttribute('data-id');
              const list = desktopOpt.closest('.sizes-list');
              if (!variantId) return;

              fetch(`https://www.bzronline.com/api/api.php/addToBasket/5/0/${variantId}/1/0`)
                .then(r => r.json())
                .then(json => {
                  const ok = (json?.status === true || json?.status === "true");
                  if (ok) {
                    showToast(t("addToCart"), 'success');
                    if (list) list.style.display = 'none';
                  } else {
                    showToast(t("errorCart"), 'error', 2600);
                  }
                })
                .catch(() => showToast(t("errorCart"), 'error', 2600));
            }
          });

          // Seleção (mobile): ADD TO BASKET
          modal.addEventListener('click', function (e) {
            const opt = e.target.closest('.size-option-modal:not(.out-of-stock)');
            if (!opt) return;

            const variantId = opt.getAttribute('data-id');
            if (!variantId) return;

            fetch(`https://www.bzronline.com/api/api.php/addToBasket/5/0/${variantId}/1/0`)
              .then(r => r.json())
              .then(json => {
                const ok = (json?.status === true || json?.status === "true");
                if (ok) {
                  showToast(t("addToCart"), 'success');
                  closeSizeModal();
                } else {
                  showToast(t("errorCart"), 'error', 2600);
                }
              })
              .catch(() => showToast(t("errorCart"), 'error', 2600));
          });

          /* ========================== ⭐ FAVORITOS (eventos, sem localStorage) ========================== */
          panel.addEventListener('click', async function (e) {
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
        }

        /* ========================== HOOK ANGULAR ========================== */
        $rootScope.$on('addCartFunc', async function (e, data) {
          const elem = data.$elem?.currentTarget || data.$elem?.target || null;
          if (!elem) return;
          if (!isTamanhoSelecionadoProdutoBase()) return;
          const referencia = extractReferencia(elem);
          if (referencia) abrirPainelComCarrossel(referencia);
        });

        /* ========================== CSS ========================== */
        const style = document.createElement('style');
        style.textContent = `
          /* Overlay e painel */
          .upselling-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.4);
            z-index: 9998;
          }
          .upselling-panel {
            position: fixed;
            z-index: 9999;
            background: #fff;
            transition: transform 0.4s ease, opacity 0.4s ease;
            overflow-y: auto;
            max-height: 100vh;
            padding: 24px;
            opacity: 0;
          }
          @media (min-width: 768px) {
            .upselling-panel { top: 0; right: 0; width: 510px; height: 100%; transform: translateX(100%); }
            .upselling-panel.open { transform: translateX(0); opacity: 1; }
          }
          @media (max-width: 767px) {
            .upselling-panel { left: 0; right: 0; bottom: 0; max-height: 80vh; transform: translateY(100%); }
            .upselling-panel.open { transform: translateY(0); opacity: 1; }
          }

          /* Botão fechar */
          .upselling-panel-close{
            position: absolute;
            top: 10px;
            right: 10px;
            width: 36px; height: 36px;
            border: none; background: transparent; color: #000;
            font-size: 26px; line-height: 1; cursor: pointer; padding: 0px; margin: 10px 0px;
          }
          .upselling-panel-close:hover, .upselling-panel-close:focus { color: #000; border-color: unset; background-color: unset; }

          /* Toast */
          .upselling-toast {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10000;
            padding: 10px 16px;
            border-radius: 6px;
            font-size: 14px;
            display: none;
            background: #111;
            color: #fff;
            box-shadow: 0 6px 18px rgba(0,0,0,.2);
          }
          .upselling-toast.error { background: red; }

          /* Grid */
          .upselling-carousel .carousel-header { margin-bottom: 12px; }
          .upselling-carousel .carousel-title { font-size: 16px; font-weight: 600; margin: 0; color: #000; }
          .upselling-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
          .upselling-panel .product .image img { width: 100%; height: auto; display: block; }
          .upselling-panel .wrapper-top {display: flex;  justify-content: space-between; align-items: center;}
          .upselling-panel .product .brand { font-size: 12px; color: #000; margin: 0; width: 100% !important; }
          .upselling-panel .product .name {
            font-size: 13px; font-weight: bold; margin: 6px 0 4px; line-height: 1.2em;
            min-height: 3.6em; overflow: hidden; text-overflow: ellipsis;
            display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; padding-bottom: 0px !important; padding-right: 0px !important;
          }
          .upselling-panel .product .price .current { font-size: 14px; color: #000; margin-top: 4px; }

          /* Produto adicionado */
          .added-product-notice { margin-bottom: 24px; }
          .added-title { font-size: 16px; font-weight: 600; margin-bottom: 12px; }
          .added-product-horizontal { display: flex !important; gap: 16px; align-items: flex-start; }
          .added-product-horizontal .image { flex-shrink: 0; max-width: 180px; }
          @media (max-width: 480px) { .added-product-horizontal .image { max-width: 144px; } }
          .added-product-horizontal .image img { width: 100%; height: auto; display: block; }
          .added-product-horizontal .name {
            font-size: 13px; font-weight: bold; margin: 6px 0 4px; line-height: 1.2em;
            min-height: 3.6em; overflow: hidden; text-overflow: ellipsis;
            display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;
          }
          .added-product-horizontal .product-size,
          .added-product-horizontal .price .current { font-size: 13px; color: #000; margin: 2px 0; }
          .separator { border: none; border-top: 1px solid #ccc; margin: 16px 0; }

          /* Botão + e lista tamanhos */
          .size-popup-button {
            position: absolute;
            bottom: 8px; left: 8px;
            background-color: #bcbcbc; color: #fff;
            font-size: 12px; padding: 3px 6px; cursor: pointer; z-index: 10; line-height: 12px;
          }
          .size-popup-button::before { 
            content: "";
            position: absolute;
            top: -20px;
            left: -20px;
            right: -20px;
            bottom: -20px;
          }
          .upselling-panel .image { position: relative; overflow: hidden; }

          @media (min-width: 768px) {
            .sizes-list {
              position: absolute;
              bottom: 0; left: 0; right: 0;
              display: none;
              background: #fff;
              border: 1px solid #000;
              z-index: 999;
              max-height: min(60vh, 420px);
              overflow-y: auto;
              box-sizing: border-box;
              text-align: center;
              scrollbar-width: thin;
              scrollbar-color: #999 transparent;
            }
            .sizes-list::-webkit-scrollbar { width: 6px; }
            .sizes-list::-webkit-scrollbar-track { background: transparent; }
            .sizes-list::-webkit-scrollbar-thumb { background-color: #999; border-radius: 3px; }
          }
          .sizes-list-header {
            font-size: 13px;
            font-weight: 400;
            color: #000;
            padding: 6px 12px;
            border-bottom: 1px solid #ddd;
            background: #fff;
            width: 100%;
            box-sizing: border-box;
          }
          .sizes-list .size-option {
            padding: 8px 12px;
            font-size: 14px;
            cursor: pointer;
          }
          .sizes-list .size-option:hover { background: #f5f5f5; }
          .sizes-list .out-of-stock {
            opacity: .5; text-decoration: line-through; pointer-events: none; background: #eee;
          }

          /* MOBILE: modal half-screen */
          @media (max-width: 767.98px) {
            .upselling-size-backdrop {
              position: fixed; inset: 0; background: rgba(0,0,0,.35); z-index: 10000;
              opacity: 0; pointer-events: none; transition: opacity .25s ease;
            }
            .upselling-size-backdrop.show { opacity: 1; pointer-events: auto; }

            .upselling-size-modal {
              position: fixed; z-index: 10001; left: 0; right: 0; bottom: -60vh;
              width: 100vw; max-height: 50vh; background: #fff; border: 1px solid #000;
              box-shadow: 0 -10px 30px rgba(0,0,0,.2);
              opacity: 0; transition: bottom .28s ease, opacity .28s ease;
            }
            .upselling-size-modal.show { bottom: 0; opacity: 1; }

            .upselling-size-modal-header {
              display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
              padding: 12px 8px; font-weight: 600; border-bottom: 1px solid #eee;
            }
            .upselling-size-modal-header > span:first-child { grid-column: 2; justify-self: center; }
            .upselling-size-modal-close {
              grid-column: 3; justify-self: end; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
              cursor: pointer; font-size: 20px; line-height: 1;
            }
            .upselling-size-modal-body { padding: 12px 16px 16px; max-height: calc(50vh - 52px); overflow-y: auto; }
            .size-option-modal {
              padding: 10px 14px; font-size: 15px; cursor: pointer; border-radius: 6px; text-align: center;
            }
            .size-option-modal:hover { background: #f5f5f5; }
            .size-option-modal.out-of-stock { opacity: .5; text-decoration: line-through; pointer-events: none; }
            .upselling-panel .btn-cart { padding: 14px; }
          }

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
          }
        `;
        document.head.appendChild(style);

      });
    } else {
      setTimeout(waitForAngularInjector, 100);
    }
  }

  waitForAngularInjector();
})();
