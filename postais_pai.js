(function () {
  if (window.__mmPostalInit) return;
  window.__mmPostalInit = true;

  function isPortugalShopLang() {
    const script = document.querySelector('script[data-shop-lang]');
    const shopLang = script?.getAttribute('data-shop-lang');
    return !shopLang || shopLang.toLowerCase() === 'pt';
  }

  if (!window.location.href.includes('checkout')) return;
  if (!isPortugalShopLang()) return;

  // 1) LISTA DE POSTAIS
  // O PRIMEIRO item da lista é o que aparece na preview do card
  const produtos = [
    {
      "id": "385048",
      "reference": "POSTAL-GENETICA",
      "name": "Postal Genética",
      "frase": "Além de exigente, gostas de coisas caras... A genética não falha!",
      "price": "2,00",
      "image": "https://1565619539.rsc.cdn77.org/temp/1748361760_2e1fa9c9c93ee156d7901bf57f468601.jpg",
      "url": "https://www.bzronline.com/pt/unissexo/acessorios/postal-genetica_p385048.html"
    },
    {
      "id": "385046",
      "reference": "POSTAL-ABRACO",
      "name": "Postal Abraço",
      "frase": "A prenda era só um abraço... Mas depois vi isto e achei a tua cara",
      "price": "2,00",
      "image": "https://1565619539.rsc.cdn77.org/temp/1748362458_52cc28a9b8f087a8bd76fe204b757efa.jpg",
      "url": "https://www.bzronline.com/pt/unissexo/acessorios/postal-abraco_p385046.html"
    },
    {
      "id": "385045",
      "reference": "POSTAL-FISH",
      "name": "Postal Fish",
      "frase": "Para a pessoa mais fish",
      "price": "2,00",
      "image": "https://1565619539.rsc.cdn77.org/temp/1748359181_04e04b255e08263a395bab81c54c6fde.jpg",
      "url": "https://www.bzronline.com/pt/unissexo/acessorios/postal-fish_p385045.html"
    },
    {
      "id": "385047",
      "reference": "POSTAL-IDADE",
      "name": "Postal Idade",
      "frase": "Estás como o vinho... Só melhoras com a idade!",
      "price": "2,00",
      "image": "https://1565619539.rsc.cdn77.org/temp/1748362107_67100c9dce7b6e411b19cd57de34104a.jpg",
      "url": "https://www.bzronline.com/pt/unissexo/acessorios/postal-idade_p385047.html"
    },
    {
      "id": "385050",
      "reference": "POSTAL-CHICORACAO",
      "name": "Postal Chi-coração",
      "frase": "",
      "price": "2,00",
      "image": "https://1565619539.rsc.cdn77.org/temp/1748359605_460d3e1a761986e7e74644dd85a7c1d6.jpg",
      "url": "https://www.bzronline.com/pt/unissexo/acessorios/postal-chi-coracao_p385050.html"
    }
  ];

  // 2) CSS do card
  if ($('#mm-sugestoes-style').length === 0) {
    $('head').append(`
      <style id="mm-sugestoes-style">
        #mm-sugestoes {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px;
          border: 1px solid #e6e6e6;
          border-radius: 18px;
          background: #fff;
          text-decoration: none;
          color: #111;
          margin: 14px 0 16px 0;
          text-align: left;
        }
        #mm-sugestoes .mm-left img{
          width: 86px; height: 86px; object-fit: cover; border: 1px solid #eee;
        }
        #mm-sugestoes .mm-mid{ display:flex; flex-direction:column; gap:6px; }
        #mm-sugestoes .mm-title{
          font-weight:800; text-transform:uppercase; letter-spacing:.3px;
          font-size:18px; line-height:1.15;
        }
        #mm-sugestoes .mm-sub{ font-size:16px; color:#333; line-height:1.2; }
        #mm-sugestoes .mm-btn{
          margin-left:auto; background:#111; color:#fff; border-radius:16px;
          padding:14px 18px; font-weight:800; text-transform:uppercase;
          font-size:14px; line-height:1.1; display:inline-flex; gap:8px; white-space:nowrap;
        }
        #mm-sugestoes .mm-btn .plus{ font-size:18px; font-weight:900; margin-top:-1px; }
        @media(max-width: 520px){
          #mm-sugestoes{ padding:14px; border-radius:14px; margin: 10px; width: 95%; }
          #mm-sugestoes .mm-left img{ width:100px; height:100px; }
          #mm-sugestoes .mm-title{ font-size:12px; }
          #mm-sugestoes .mm-sub{ font-size:8px; }
          #mm-sugestoes .mm-btn{ padding:12px 14px; border-radius:14px; font-size:12px; }
        }
        .rdc-hr-divider {border-top: none !important;}
      </style>
    `);
  }

  // 3) HTML do card
  function getCardHTML() {
    const previewImg = (produtos?.[0]?.image) || '';
    return `
      <a class="button" id="mm-sugestoes" href="#">
        <div class="mm-left"><img src="${previewImg}" alt="Postal"></div>
        <div class="mm-mid">
          <div class="mm-title">COMPLETA O PRESENTE DO<br>DIA DO PAI</div>
          <div class="mm-sub">Escolhe um postal por <strong>2€</strong></div>
        </div>
        <div class="mm-btn"><span class="plus">+</span> ADICIONAR<br/>POSTAL</div>
      </a>
    `;
  }

  function isMobile() {
    return window.matchMedia('(max-width: 768px)').matches;
  }

  function placeCard() {
    const $card = $('#mm-sugestoes');
    const $desktopTarget = $('.rdc-shop-cupons-area');
    const $mobileTarget  = $('.wrapper-shoppingbag-product-list');

    if ($card.length === 0) {
      if (isMobile()) {
        if ($mobileTarget.length) $mobileTarget.after(getCardHTML());
        else return false;
      } else {
        if ($desktopTarget.length) $desktopTarget.before(getCardHTML());
        else return false;
      }
      return true;
    }

    if (isMobile()) {
      if ($mobileTarget.length) {
        const nextIsCard = $mobileTarget.next('#mm-sugestoes').length > 0;
        if (!nextIsCard) $mobileTarget.after($card);
        return true;
      }
      return false;
    } else {
      if ($desktopTarget.length) {
        const prevIsCard = $desktopTarget.prev('#mm-sugestoes').length > 0;
        if (!prevIsCard) $desktopTarget.before($card);
        return true;
      }
      return false;
    }
  }

  (function retryPlace() {
    let tries = 0;
    const maxTries = 50;
    const t = setInterval(function() {
      tries++;
      const ok = placeCard();
      if (ok || tries >= maxTries) {
        clearInterval(t);
        if (!ok) console.warn('[BZR] Não foi possível inserir o card (targets não encontrados).');
      }
    }, 100);
  })();

  let lastMobileState = isMobile();
  window.addEventListener('resize', function() {
    const now = isMobile();
    if (now !== lastMobileState) {
      lastMobileState = now;
      setTimeout(placeCard, 150);
    }
  });

  $(document).on('click', '#mm-sugestoes', function(e) {
    e.preventDefault();

    let html = '';
    $.each(produtos, function(i, product) {
      html += `
        <div class="product-item">
          <div class="clearfix">
            <div class="product-item-image productMask">
              <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-item-desc desc">
              <p class="featuredH5 list-nav-title product-item-name name">${product.name}</p>
              ${product.frase ? `<p class="product-item-variants variants">"${product.frase}"</p>` : ''}
              <p class="product-item-ref">Ref: ${product.reference} | Único</p>
              <p class="product-item-variants variants">
                <span></span>
                <span>Preço: ${product.price} €</span>
              </p>
              <div class="meu-product-item-button">
                <a class="button" meu-id="${product.id}" style="width:100%;">Adicionar</a>
              </div>
            </div>
          </div>
        </div>`;
    });

    $(".rdc-wrapper-bar-header-title, .rdc-wrapper-popup-header-title").html("Escolhe um postal");
    $(".rdc-wrapper-bar-header-desc, .rdc-wrapper-popup-header-desc").html("Adiciona um toque especial por apenas 2€:");
    $("#oferta_id").remove();
    $(".explore-products").html(html);

    if (typeof open_product_right_barCatalog === 'function') open_product_right_barCatalog();
    else console.warn("[BZR] open_product_right_barCatalog() não encontrada.");
  });

  $(document).on('click', '.meu-product-item-button .button', function(e) {
    e.preventDefault();

    const productId = $(this).attr('meu-id');
    const url = `https://www.bzronline.com/api/api.php/addToBasket/816/0/${productId}/1/1`;

    $.ajax({
      url: url,
      type: 'GET',
      success: function(response) {
        console.log("[BZR] Postal adicionado:", response);
        location.reload();
      },
      error: function(err) {
        alert("Sem stock!");
        console.error("[BZR] Erro addToBasket:", err);
      }
    });
  });

  $("#explore-products-right-bar .mfp-close, .explore-products-overlay").on("click", function() {
    $(".rdc-wrapper-bar-header-title").html("Oferta promocional");
    $(".rdc-wrapper-bar-header-desc").html("Escolhe a oferta que pretendes receber:");
    $(".rdc-wrapper-popup-header-title").html("Oferta promocional");
    $(".rdc-wrapper-popup-header-desc").html("Escolhe a oferta que pretendes receber:");
  });
})();
