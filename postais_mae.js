(function () {
  if (window.__mmPostalMaeInit) return;
  window.__mmPostalMaeInit = true;

  // Deteção de idioma via lang do <html>
  function isPortugalShopLang() {
    const lang = document.documentElement.getAttribute('lang');
    // Fallback para o método anterior (data-shop-lang) se lang não estiver definido
    if (!lang) {
      const script = document.querySelector('script[data-shop-lang]');
      const shopLang = script?.getAttribute('data-shop-lang');
      return !shopLang || shopLang.toLowerCase() === 'pt';
    }
    return lang.toLowerCase().startsWith('pt');
  }

  if (!window.location.href.includes('checkout')) return;
  if (!isPortugalShopLang()) return;

  // 1) LISTA DE POSTAIS - DIA DA MÃE
  // O PRIMEIRO item da lista é o que aparece na preview do card
  const produtos = [
    {
      "id": "383072",
      "reference": "POSTAL-MAETUDO",
      "name": "Postal Mãe é Tudo",
      "frase": "Postal Mãe é Tudo que alude à importância da mãe na vida do filho e retrata como uma mãe consegue assumir diversos papéis nas mais variadas vertentes.",
      "price": "2,00",
      "image": "https://1565619539.rsc.cdn77.org/temp/1745941208_3c874fcc536fc1a534089e0508e86692.jpg",
      "url": "https://www.bzronline.com/pt/unissexo/acessorios/postal-mae-e-tudo_p383072.html"
    },
    {
      "id": "383073",
      "reference": "POSTAL-GOOGLE",
      "name": "Postal Mãe Sabe Mais",
      "frase": "Postal Mãe Sabe Mais com a inscrição \"O Google sabe tudo mas a minha Mãe sabe mais!\".",
      "price": "2,00",
      "image": "https://1565619539.rsc.cdn77.org/temp/1745914391_c02bf5e1045669a14b4f68b60e342573.jpg",
      "url": "https://www.bzronline.com/pt/unissexo/acessorios/postal-mae-sabe-mais_p383073.html"
    },
    {
      "id": "383074",
      "reference": "POSTAL-ONDEESTA",
      "name": "Postal Mãe Onde Está o Meu...",
      "frase": "Postal Mãe Onde Está o Meu... alusivo ao surpreendente dote de uma mãe conseguir encontrar e descobrir qualquer coisa que não encontremos no momento.",
      "price": "2,00",
      "image": "https://1565619539.rsc.cdn77.org/temp/1745938726_d9ba422d037891185dd2bae852cbe1f9.jpg",
      "url": "https://www.bzronline.com/pt/unissexo/acessorios/postal-mae-onde-esta-o-meu..._p383074.html"
    },
    {
      "id": "383075",
      "reference": "POSTAL-GALINHA",
      "name": "Postal Mãe Galinha",
      "frase": "Postal Mãe Galinha alusivo ao instinto protetor de uma mãe.",
      "price": "2,00",
      "image": "https://1565619539.rsc.cdn77.org/temp/1745915830_feaab62c93acf14df95746f5f710f47e.jpg",
      "url": "https://www.bzronline.com/pt/unissexo/acessorios/postal-mae-galinha_p383075.html"
    },
    {
      "id": "383076",
      "reference": "POSTAL-TRUNFO",
      "name": "Postal Mãe, És o Meu Maior Trunfo",
      "frase": "Postal Mãe, És o Meu Maior Trunfo com a carta Dama de Copas.",
      "price": "2,00",
      "image": "https://1565619539.rsc.cdn77.org/temp/1745939454_7474378374f37d2d819f07275e8d8cb5.jpg",
      "url": "https://www.bzronline.com/pt/unissexo/acessorios/postal-mae-es-o-meu-maior-trunfo_p383076.html"
    },
    {
      "id": "383077",
      "reference": "POSTAL-OMAE",
      "name": "Postal Ó Mãããeeeee!",
      "frase": "Postal Ó Mãããeeeee! em homenagem à paciência de todas as mães quando o filho a chama incessantemente por precisar de algo, por mais mínimo que seja.",
      "price": "2,00",
      "image": "https://1565619539.rsc.cdn77.org/temp/1745939748_d3b6502900d459a221ee12a858f61691.jpg",
      "url": "https://www.bzronline.com/pt/unissexo/acessorios/postal-o-maaaeeeee!_p383077.html"
    },
    {
      "id": "383078",
      "reference": "POSTAL-CRAQUE",
      "name": "Postal Mãe Craque",
      "frase": "Postal Mãe Craque com a inscrição \"Mãe: A craque que nunca falha uma assistência\".",
      "price": "2,00",
      "image": "https://1565619539.rsc.cdn77.org/temp/1745939917_39efb8feb6eae333b5b19abcdd862abb.jpg",
      "url": "https://www.bzronline.com/pt/unissexo/acessorios/postal-mae-craque_p383078.html"
    },
    {
      "id": "383079",
      "reference": "POSTAL-SOHA1",
      "name": "Postal Mãe Só Há 1",
      "frase": "Postal Mãe Só Há 1 alusivo à exclusividade e singularidade de uma mãe.",
      "price": "2,00",
      "image": "https://1565619539.rsc.cdn77.org/temp/1745940241_5d7102b692738f43f9f2f3818f015f62.jpg",
      "url": "https://www.bzronline.com/pt/unissexo/acessorios/postal-mae-so-ha-1_p383079.html"
    },
    {
      "id": "383080",
      "reference": "POSTAL-FA1",
      "name": "Postal Para a Minha Fã Nº 1",
      "frase": "Postal Para a Minha Fã Nº 1 para ofereceres àquela pessoa que te apoia incondicionalmente.",
      "price": "2,00",
      "image": "https://1565619539.rsc.cdn77.org/temp/1745940551_a293dd9244747a6de6ebb6cd8e109404.jpg",
      "url": "https://www.bzronline.com/pt/unissexo/acessorios/postal-para-a-minha-fa-n-1_p383080.html"
    },
    {
      "id": "385050",
      "reference": "POSTAL-CHICORACAO",
      "name": "Postal Chi-coração",
      "frase": "Postal Chi-coração ternurento para ocasiões especiais.",
      "price": "2,00",
      "image": "https://1565619539.rsc.cdn77.org/temp/1748359605_460d3e1a761986e7e74644dd85a7c1d6.jpg",
      "url": "https://www.bzronline.com/pt/unissexo/acessorios/postal-chi-coracao_p385050.html"
    }
  ];

  // 2) CSS do card
  if ($('#mm-sugestoes-mae-style').length === 0) {
    $('head').append(`
      <style id="mm-sugestoes-mae-style">
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
          <div class="mm-title">COMPLETA O PRESENTE DO<br>DIA DA MÃE</div>
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
              ${product.frase ? `<p class="product-item-variants variants">${product.frase}</p>` : ''}
              <p class="product-item-ref"><b>Ref:</b> ${product.reference} | Único</p>
              <p class="product-item-variants variants">
                <span></span>
                <span><b>Preço:</b> ${product.price} €</span>
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
