window.addEventListener("load", () => {
(async () => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('mostrar_carrossel') !== '1') return;

  const target = document.querySelector('.rdc-shop-cupons-area');
  if (!target) return;

  // Carregar Swiper CSS
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
  document.head.appendChild(css);

  // Carregar Swiper JS
  await new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  // Ajustar colunas se necessário
  const sp = document.querySelector('#sp-7456');
  if (sp) {
    const row = sp.closest('.row');
    if (row) {
      const cols = row.querySelectorAll('.col-sm-6');
      if (cols.length === 2) {
        cols[0].classList.replace('col-sm-6', 'col-sm-7');
        cols[1].classList.replace('col-sm-6', 'col-sm-5');
      }
    }
  }

  // CSS customizado
  const style = document.createElement('style');
  style.textContent = `
    .upselling-carousel {
      margin: 0 0;
    }
    .upselling-carousel .carousel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .upselling-carousel .carousel-title {
      font-size: 24px;
      font-weight: 900;
      text-transform: uppercase;
      margin: 0;
      color: #333;
    }
    .upselling-carousel .arrow-group {
      display: flex;
      gap: 8px;
    }
    .upselling-carousel .arrow {
      background: #eee;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      color: #333;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      cursor: pointer;
      transition: background 0.3s, color 0.3s;
    }
    .upselling-carousel .arrow:hover {
      background: #666;
      color: #fff;
    }
    .swiper {
      padding-top: 8px;
    }
    .swiper-slide {
      height: auto;
      display: flex;
      flex-direction: column;
    }
    .upselling-carousel article.product {
      width: 100%;
    }
    .upselling-carousel article.product .image img {
      width: 100%;
      display: block;
    }
    .upselling-carousel article.product .desc {
      margin: 13px auto 26px;
    }
    .upselling-carousel .wrapper-top {
      padding: 0 10px 10px;
      border-bottom: 1px solid #e6e6e6;
    }
    .upselling-carousel .brand {
      float: left;
      font-family: 'Metrocity-Medium', Arial, sans-serif;
      font-size: 12px;
      color: #000;
    }
    .upselling-carousel .available-colors {
      float: right;
      font-size: 11px;
      color: #555;
    }
    .upselling-carousel .wrapper-bottom {
      padding: 14px 10px 0;
      text-align: left;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 100px;
    }
    .upselling-carousel .name {
      font-size: 13px;
      line-height: 18px;
      color: #000;
      margin-bottom: unset;
      flex-grow: 0;
    }
    .upselling-carousel .price .current {
      margin-top: 8px;
      text-align: left;
      font-family: 'Metrocity-Medium', Arial, Helvetica, 'Segoe UI', sans-serif;
      font-weight: normal;
      color: black;
    }
    .arrow.swiper-button-prev-custom,
    .arrow.swiper-button-next-custom {
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  // Obter Referências do carrinho
  const refs = [...new Set(
    Array.from(document.querySelectorAll('.rdc-shop-prd-reference-value'))
      .map(el => {
        const match = el.textContent.match(/#?([A-Z0-9\-]+)(?=\|)?/i);
        return match ? match[1].trim() : null;
      })
      .filter(Boolean)
  )];
  if (!refs.length) return;

  // Buscar sugestões
  let data;
  try {
    const res = await fetch('https://raw.githubusercontent.com/1marcomachado/upselling-json/main/upselling_final.json');
    data = await res.json();
  } catch (e) {
    console.error('Erro ao carregar sugestões de upselling:', e);
    return;
  }

  if (!data || !Array.isArray(data.produtos)) return;

  const sugestoesSet = new Set();
  refs.forEach(ref => {
    const produto = data.produtos.find(p => p.mpn === ref || p.reference === ref);
    if (produto?.sugestoes) {
      produto.sugestoes.forEach(s => sugestoesSet.add(s));
    }
  });

  const sugestoes = data.produtos.filter(p => sugestoesSet.has(p.id));
  if (!sugestoes.length) return;

  // Construir carrossel
  const wrapper = document.createElement('div');
  wrapper.className = 'upselling-carousel';

  const header = document.createElement('div');
  header.className = 'carousel-header';

  const title = document.createElement('h2');
  title.className = 'carousel-title';
  title.textContent = 'FREQUENTEMENTE COMPRADOS EM CONJUNTO';

  const arrows = document.createElement('div');
  arrows.className = 'arrow-group';

  const btnPrev = document.createElement('div');
  btnPrev.className = 'arrow swiper-button-prev-custom';
  btnPrev.innerHTML = '&#10094;';
  btnPrev.setAttribute('aria-label', 'Anterior');

  const btnNext = document.createElement('div');
  btnNext.className = 'arrow swiper-button-next-custom';
  btnNext.innerHTML = '&#10095;';
  btnNext.setAttribute('aria-label', 'Próximo');

  arrows.appendChild(btnPrev);
  arrows.appendChild(btnNext);
  header.appendChild(title);
  header.appendChild(arrows);
  wrapper.appendChild(header);

  const swiperContainer = document.createElement('div');
  swiperContainer.className = 'swiper';

  const swiperWrapper = document.createElement('div');
  swiperWrapper.className = 'swiper-wrapper';

  sugestoes.forEach(s => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
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
    swiperWrapper.appendChild(slide);
  });

  swiperContainer.appendChild(swiperWrapper);
  wrapper.appendChild(swiperContainer);

  // Inserção condicional: mobile ou desktop
  const isMobile = window.innerWidth < 768;
  const mobileTarget = document.querySelector('.wrapper-shoppingbag-product-list.container');

  if (isMobile && mobileTarget) {
    wrapper.classList.add('container'); // Adiciona a classe container apenas em mobile
    mobileTarget.parentNode.insertBefore(wrapper, mobileTarget.nextSibling);
  } else {
    target.parentNode.insertBefore(wrapper, target.nextSibling);
  }

  // Inicializar Swiper
  new Swiper('.upselling-carousel .swiper', {
    slidesPerView: 3.5,
    spaceBetween: 24,
    navigation: {
      nextEl: '.upselling-carousel .swiper-button-next-custom',
      prevEl: '.upselling-carousel .swiper-button-prev-custom'
    },
    breakpoints: {
      1024: { slidesPerView: 3.5 },
      768: { slidesPerView: 2.5 },
      0: { slidesPerView: 2.5 }
    }
  });
})();
});
