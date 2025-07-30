// == UPSALE NO CHECKOUT - VERSÃO COM LAYOUT IGUAL AO POPUP ==

window.addEventListener("load", () => {
(async () => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('mostrar_carrossel') !== '1') return;

  const target = document.querySelector('.explore-gift-overlay');
  if (!target) return;

  const style = document.createElement('style');
  style.textContent = `
    .upselling-carousel {
      padding-right: 15px;
      padding-left: 15px;
      margin-right: auto;
      margin-left: auto;
    }
    .upselling-carousel .carousel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .upselling-carousel .carousel-title {
      font-size: 16px;
      font-weight: 600;
      margin: 0;
      color: #333;
      text-transform: uppercase;
    }
    .upselling-carousel .upselling-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }
    .upselling-carousel article.product .image img {
      width: 100%;
      height: auto;
    }
    .upselling-carousel article.product .brand {
      font-size: 12px;
      color: #000;
      margin-bottom: 4px;
    }
    .upselling-carousel article.product .name {
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
    .upselling-carousel article.product .price .current {
      font-size: 14px;
      color: #000;
      margin-top: 4px;
    }
  `;
  document.head.appendChild(style);

  const refs = [...new Set(
    Array.from(document.querySelectorAll('.rdc-shop-prd-reference-value'))
      .map(el => {
        const match = el.textContent.match(/#?([A-Z0-9\-]+)(?=\|)?/i);
        return match ? match[1].trim() : null;
      })
      .filter(Boolean)
  )];
  if (!refs.length) return;

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

  const shuffle = arr => arr.sort(() => Math.random() - 0.5);
  const sugestoes = shuffle(data.produtos.filter(p => sugestoesSet.has(p.id))).slice(0, 16);
  if (!sugestoes.length) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'upselling-carousel container';

  const header = document.createElement('div');
  header.className = 'carousel-header';

  const title = document.createElement('h3');
  title.className = 'carousel-title';
  title.textContent = 'FREQUENTEMENTE COMPRADOS EM CONJUNTO';

  header.appendChild(title);
  wrapper.appendChild(header);

  const grid = document.createElement('div');
  grid.className = 'upselling-grid';

  sugestoes.forEach(s => {
    const item = document.createElement('div');
    item.className = 'grid-item';
    item.innerHTML = `
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
    grid.appendChild(item);
  });

  wrapper.appendChild(grid);

  const isMobile = window.innerWidth < 768;
  const mobileTarget = document.querySelector('#rdc-shop-order-resume-mobile');

  if (isMobile && mobileTarget) {
    wrapper.classList.add('container');
    mobileTarget.parentNode.insertBefore(wrapper, mobileTarget.nextSibling);
  } else {
    target.parentNode.insertBefore(wrapper, target.nextSibling);
  }
})();
});
