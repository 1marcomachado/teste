(function () {
  const params = new URLSearchParams(window.location.search);
  if (params.get('mostrar_carrossel') !== '1') return;

function waitForAngularInjector() {
  const appElement = document.querySelector('[ng-app]') || document.body;

  if (window.angular && angular.element(appElement).injector()) {
    const injector = angular.element(appElement).injector();

    injector.invoke(function ($rootScope) {
      function isTamanhoSelecionado() {
        return !!document.querySelector('.sizes label.sel');
      }

      function extractReferencia(fromElem) {
        const produtoElem = fromElem.closest('.produto');
        let refElem = produtoElem?.querySelector('.ref p.small') || document.querySelector('.ref p.small');
        return refElem ? refElem.textContent.trim() : null;
      }

      async function abrirPainelComCarrossel(referencia) {
        document.querySelector('.upselling-overlay')?.remove();

        const overlay = document.createElement('div');
        overlay.className = 'upselling-overlay';
        overlay.onclick = () => {
          overlay.remove();
          document.body.style.overflow = '';
        };

        const panel = document.createElement('div');
        panel.className = 'upselling-panel';
        panel.onclick = e => e.stopPropagation();

        const wrapper = document.createElement('div');
        wrapper.className = 'upselling-carousel';

        const header = document.createElement('div');
        header.className = 'carousel-header';

        const title = document.createElement('h3');
        title.className = 'carousel-title';
        title.textContent = 'Talvez te interesse';

        header.appendChild(title);
        wrapper.appendChild(header);

        const gridContainer = document.createElement('div');
        gridContainer.className = 'upselling-grid';

        wrapper.appendChild(gridContainer);
        panel.appendChild(wrapper);
        overlay.appendChild(panel);
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
          panel.classList.add('open');
        }, 10);

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

        const sugestoes = data.produtos.filter(p => produto.sugestoes.includes(p.id));
        if (!sugestoes.length) return;

        const addedNotice = document.createElement('div');
        addedNotice.className = 'added-product-notice';
        addedNotice.innerHTML = `
          <h3 class="added-title">Produto adicionado ao carrinho</h3>
          <article class="product added-product-horizontal grid-item" data-row="1">
            <div class="image">
              <img src="${produto.image}" alt="${produto.title}" title="${produto.title}" loading="lazy">
              <br><a href="/checkout/v1/?id=1" class="btn-cart">CARRINHO</a>
            </div>
            <div class="desc">
              <div class="wrapper-top clearfix">
                <p class="brand">${produto.brand || ''}</p>
              </div>
              <div class="wrapper-bottom">
                <p class="name">${produto.title}</p>
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

        sugestoes.forEach(s => {
          const slide = document.createElement('div');
          slide.className = 'grid-item';
          slide.innerHTML = `
            <article class="product" data-row="1">
              <div class="image">
                <a href="/item_${s.id}.html">
                  <figure style="margin:0">
                    <img src="${s.image}" alt="${s.title}" title="${s.title}" loading="lazy">
                  </figure>
                </a>
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
          gridContainer.appendChild(slide);
        });
      }

      $rootScope.$on('addCartFunc', async function (e, data) {
        const elem = data.$elem.currentTarget || data.$elem.target;
        if (!isTamanhoSelecionado()) return;
        const referencia = extractReferencia(elem);
        if (referencia) abrirPainelComCarrossel(referencia);
      });

      const style = document.createElement('style');
      style.textContent = `
        .upselling-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          z-index: 9998;
        }
        .upselling-panel {
          position: fixed;
          z-index: 9999;
          background: #fff;
          box-shadow: 0 0 20px rgba(0,0,0,0.2);
          transition: transform 0.4s ease, opacity 0.4s ease;
          overflow-y: auto;
          max-height: 100vh;
          padding: 24px;
          opacity: 0;
        }
        @media (min-width: 768px) {
          .upselling-panel {
            top: 0; right: 0;
            width: 480px;
            height: 100%;
            transform: translateX(100%);
          }
          .upselling-panel.open {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @media (max-width: 767px) {
          .upselling-panel {
            left: 0; right: 0; bottom: 0;
            height: auto;
            max-height: 80vh;
            transform: translateY(100%);
          }
          .upselling-panel.open {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .upselling-panel .carousel-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 12px;
        }
        .upselling-panel .upselling-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .upselling-panel .product .image img {
          width: 100%;
          height: auto;
        }
        .upselling-panel .product .brand {
          font-size: 12px;
          color: #000;
          margin-bottom: 4px;
        }
        .upselling-panel .product .name {
          font-size: 13px;
          font-weight: bold;
          margin: 6px 0 4px;
          line-height: 1.2em;
          min-height: 3.6em;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        .upselling-panel .product .price .current {
          font-size: 14px;
          color: #000;
          margin-top: 4px;
        }
        .upselling-panel .added-product-notice {
          margin-bottom: 24px;
        }
        .upselling-panel .added-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 12px;
        }
        .upselling-panel .added-product-horizontal {
          display: flex !important;
          flex-direction: row;
          gap: 16px;
          align-items: flex-start;
        }
        .upselling-panel .added-product-horizontal .image {
          flex-shrink: 0;
          max-width: 180px;
        }
        @media (max-width: 480px) {
          .upselling-panel .added-product-horizontal .image {
            max-width: 120px;
          }
        }
        .upselling-panel .added-product-horizontal .image img {
          width: 100%;
          height: auto;
          display: block;
        }
        .upselling-panel .added-product-horizontal .desc {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .upselling-panel .added-product-horizontal .brand {
          font-size: 12px;
          color: #000;
          margin-bottom: 4px;
        }
        .upselling-panel .added-product-horizontal .name {
          font-size: 13px;
          font-weight: bold;
          margin: 6px 0 4px;
          line-height: 1.2em;
          min-height: 3.6em;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        .upselling-panel .added-product-horizontal .product-size,
        .upselling-panel .added-product-horizontal .price .current {
          font-size: 13px;
          color: #000;
          margin: 2px 0;
        }
        .upselling-panel .separator {
          border: none;
          border-top: 1px solid #ccc;
          margin: 16px 0;
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
