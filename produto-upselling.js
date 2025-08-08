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

          const title = document.createElement('h2');
          title.className = 'carousel-title';
          title.textContent = 'FREQUENTEMENTE COMPRADOS EM CONJUNTO';

          header.appendChild(title);
          wrapper.appendChild(header);

          const gridContainer = document.createElement('div');
          gridContainer.className = 'upselling-grid';

          wrapper.appendChild(gridContainer);
          panel.appendChild(wrapper);
          overlay.appendChild(panel);
          document.body.appendChild(overlay);
          document.body.style.overflow = 'hidden';

          const isMobile = window.innerWidth < 768;

          if (isMobile && !window.Swiper) {
            await new Promise((resolve, reject) => {
              const link = document.createElement('link');
              link.rel = 'stylesheet';
              link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
              document.head.appendChild(link);

              const script = document.createElement('script');
              script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
              script.onload = resolve;
              script.onerror = reject;
              document.head.appendChild(script);
            });
          }

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

          sugestoes.forEach(s => {
            const slide = document.createElement('div');
            slide.className = isMobile ? 'swiper-slide' : 'grid-item';
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

          if (isMobile) {
            gridContainer.classList.add('swiper');
            const swiperWrapper = document.createElement('div');
            swiperWrapper.className = 'swiper-wrapper';
            swiperWrapper.innerHTML = gridContainer.innerHTML;
            gridContainer.innerHTML = '';
            gridContainer.appendChild(swiperWrapper);

            new Swiper(gridContainer, {
              slidesPerView: 1.2,
              spaceBetween: 16,
              autoHeight: true,
              breakpoints: {
                480: { slidesPerView: 1.5 },
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 }
              }
            });
          }
        }

        $rootScope.$on('addCartFunc', async function (e, data) {
          const elem = data.$elem.currentTarget || data.$elem.target;

          if (!isTamanhoSelecionado()) {
            return;
          }

          const referencia = extractReferencia(elem);
          if (referencia) {
            abrirPainelComCarrossel(referencia);
          }
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
            transition: transform 0.3s ease-in-out;
            overflow-y: auto;
            max-height: 100vh;
            padding: 24px;
          }
          @media (min-width: 768px) {
            .upselling-panel {
              top: 0; right: 0;
              width: 480px;
              transform: translateX(0);
              height: 100%;
            }
          }
          @media (max-width: 767px) {
            .upselling-panel {
              left: 0; right: 0; bottom: 0;
              height: auto;
              max-height: 80vh;
              transform: translateY(0);
              padding: 20px 20px 30px;
            }
          }
          .upselling-carousel .carousel-title {
            font-size: 20px;
            font-weight: 800;
            margin-bottom: 20px;
          }
          .upselling-grid.swiper { overflow: hidden; }
          .grid-item, .swiper-slide {
            box-sizing: border-box;
            padding: 10px;
          }
          @media (min-width: 768px) {
            .upselling-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 16px;
            }
          }
          .product .image img {
            width: 100%;
            height: auto;
          }
          .product .brand {
            font-size: 12px;
            color: #000;
            margin-bottom: 4px;
          }
          .product .name {
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
            padding-right: 0px !important;
          }
          .product .price .current {
            font-size: 14px;
            color: #000;
            margin-top: 4px;
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
