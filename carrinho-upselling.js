window.addEventListener("load", () => {
(async () => {

  const params = new URLSearchParams(window.location.search);
  if (params.get('mostrar_carrossel') !== '1') return;

  const target = document.querySelector('.explore-gift-overlay');
  if (!target) return;

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
    .upselling-carousel a:hover {
      text-decoration:none;
    }

    .upselling-carousel .carousel-header {
      margin-bottom: 12px;
    }
    .upselling-carousel .carousel-title {
      font-size: 16px;
      font-weight: 600;
      margin: 0;
      color: #000;
    }
    .upselling-carousel .upselling-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
    @media (min-width: 768px) {
      .upselling-carousel .upselling-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }
    .upselling-carousel .product .image img {
      width: 100%;
      height: auto;
      display: block;
    }
    .upselling-carousel .product .desc {
      margin-top: 12px;
    }
    .upselling-carousel .wrapper-top {
      padding: 0 10px 10px;
      border-bottom: 1px solid #e6e6e6;
    }
    .upselling-carousel .brand {
      float: left;
      font-size: 12px;
      color: #000;
      font-family: 'Metrocity-Medium', Arial, Helvetica, 'Segoe UI', sans-serif;
    }
    .upselling-carousel .available-colors {
      float: right;
      font-size: 11px;
      color: #555;
    }
    .upselling-carousel .wrapper-bottom {
      padding: 14px 10px 0;
      text-align: left;
    }
    .upselling-carousel .name {
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
      color: #333;
      font-family: 'Metrocity-Book', Arial, Helvetica, 'Segoe UI', sans-serif;
    }
    .upselling-carousel article.product:hover .desc .name {
        text-decoration: underline;
    }
    .upselling-carousel .price .current {
      font-size: 14px;
      color: #000;
      margin-top: 4px;
      text-align: left;
      font-family: 'Metrocity-Medium', Arial, Helvetica, 'Segoe UI', sans-serif;
      font-weight: normal;
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

  let sugestoes = data.produtos.filter(p => sugestoesSet.has(p.id));
  sugestoes = sugestoes.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
  sugestoes = sugestoes.sort(() => Math.random() - 0.5).slice(0, 16);

  if (!sugestoes.length) return;

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
    mobileTarget.parentNode.insertBefore(wrapper, mobileTarget.nextSibling);
  } else {
    target.parentNode.insertBefore(wrapper, target.nextSibling);
  }
})();
});
