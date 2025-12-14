function isPortugalShopLang() {
  const script = document.querySelector('script[data-shop-lang]');
  const shopLang = script?.getAttribute('data-shop-lang');

  // Mostrar se for PT ou se não estiver definido
  return !shopLang || shopLang.toLowerCase() === 'pt';
}

// 1) LISTA DE POSTAIS
const produtos = [
  {"id":"399014","reference":"POSTAL-N-POSTAL","name":"Postal de Natal O Postal","price":"2,00","image":"https://1565619539.rsc.cdn77.org/temp/1764859583_6b93822f6a186c7fcccb458b63d6ae57.jpg","url":"https://www.bzronline.com/pt/unissexo/acessorios/postal-de-natal-o-postal_p399014.html"},
  {"id":"399013","reference":"POSTAL-N-GATO","name":"Postal de Natal Gato","price":"2,00","image":"https://1565619539.rsc.cdn77.org/temp/1764859512_a625059e9b48d7b17aef6fff0a0d49d7.jpg","url":"https://www.bzronline.com/pt/unissexo/acessorios/postal-de-natal-gato_p399013.html"},
  {"id":"399015","reference":"POSTAL-N-VINHO","name":"Postal de Natal Hold My Wine","price":"2,00","image":"https://1565619539.rsc.cdn77.org/temp/1764859462_e514dd138247195efb8ac9d8cc450a35.jpg","url":"https://www.bzronline.com/pt/unissexo/acessorios/postal-de-natal-hold-my-wine_p399015.html"},
  {"id":"399011","reference":"POSTAL-N-AVISO","name":"Postal de Natal Aviso","price":"2,00","image":"https://1565619539.rsc.cdn77.org/temp/1764859650_10447c2c15d7cbda8efea2cec3394fc2.jpg","url":"https://www.bzronline.com/pt/unissexo/acessorios/postal-de-natal-aviso_p399011.html"},
  {"id":"399012","reference":"POSTAL-N-CAO","name":"Postal de Natal Cão","price":"2,00","image":"https://1565619539.rsc.cdn77.org/temp/1764859327_66e99a2c76328a7e52ad1bedea2bff79.jpg","url":"https://www.bzronline.com/pt/unissexo/acessorios/postal-de-natal-cao_p399012.html"},
  {"id":"399009","reference":"POSTAL-N-PAINATAL","name":"Postal de Natal Pai Natal","price":"2,00","image":"https://1565619539.rsc.cdn77.org/temp/1764859229_3a2a4949274425f25c1cd167bbee1f2f.jpg","url":"https://www.bzronline.com/pt/unissexo/acessorios/postal-de-natal-pai-natal_p399009.html"},
  {"id":"399010","reference":"POSTAL-N-SI","name":"Postal de Natal Siiiii CR7","price":"2,00","image":"https://1565619539.rsc.cdn77.org/temp/1764859715_31ba4facfb820978e0d87cbfd8e1dd6d.jpg","url":"https://www.bzronline.com/pt/unissexo/acessorios/postal-de-natal-siiiii-cr7_p399010.html"}
];

// 2) CSS do card (mantém igual)
if ($('#mm-sugestoes-style').length === 0 && isPortugalShopLang()) {
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
        font-size:14px; line-height:1.1; display:inline-flex;
        align-items:center; gap:8px; white-space:nowrap; text-align:center;
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
      <div class="mm-left"><img src="${previewImg}" alt="Postal de Natal"></div>
      <div class="mm-mid">
        <div class="mm-title">DÁ UM TOQUE ESPECIAL AO TEU PRESENTE DE NATAL.</div>
        <div class="mm-sub">Escolhe um postal de Natal por <strong>2€</strong></div>
      </div>
      <div class="mm-btn"><span class="plus">+</span> ADICIONAR<br/>POSTAL</div>
    </a>
  `;
}

// 4) Detectar mobile (como combinámos)
function isMobile() {
  return window.matchMedia('(max-width: 768px)').matches;
}

// 5) Inserir no local certo (e mover se já existir)
function placeCard() {
  const $card = $('#mm-sugestoes');

  // target desktop e mobile
  const $desktopTarget = $('.rdc-shop-cupons-area');
  const $mobileTarget  = $('.wrapper-shoppingbag-product-list');

  // se não existe ainda, criar
  if ($card.length === 0) {
    // Só cria quando houver pelo menos um alvo disponível
    if (isMobile()) {
      if ($mobileTarget.length) $mobileTarget.after(getCardHTML());
      else return false;
    } else {
      if ($desktopTarget.length) $desktopTarget.before(getCardHTML());
      else return false;
    }
    return true;
  }

  // se existe, garantir que está na posição correta
  if (isMobile()) {
    if ($mobileTarget.length) {
      // se não estiver logo a seguir ao bloco de produtos, move
      const nextIsCard = $mobileTarget.next('#mm-sugestoes').length > 0;
      if (!nextIsCard) $mobileTarget.after($card);
      return true;
    }
    return false;
  } else {
    if ($desktopTarget.length) {
      // se não estiver logo antes da área de cupões, move
      const prevIsCard = $desktopTarget.prev('#mm-sugestoes').length > 0;
      if (!prevIsCard) $desktopTarget.before($card);
      return true;
    }
    return false;
  }
}

// 6) Retry até 5s (porque mobile/desktop podem carregar o DOM em tempos diferentes)
(function retryPlace() {
  let tries = 0;
  const maxTries = 50; // 5s
  const t = setInterval(function() {
    tries++;
    const ok = placeCard();
    if (ok || tries >= maxTries) {
      clearInterval(t);
      if (!ok) console.warn('[BZR] Não foi possível inserir o card (targets não encontrados).');
    }
  }, 100);
})();

// 7) Reposicionar quando muda de viewport/orientação
let lastMobileState = isMobile();
window.addEventListener('resize', function() {
  const now = isMobile();
  if (now !== lastMobileState) {
    lastMobileState = now;
    // esperar um bocadinho para o DOM estabilizar e depois mover
    setTimeout(placeCard, 150);
  }
});

// 8) CLICK no card -> abre right bar
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

  $(".rdc-wrapper-bar-header-title, .rdc-wrapper-popup-header-title").html("Escolhe um postal de Natal");
  $(".rdc-wrapper-bar-header-desc, .rdc-wrapper-popup-header-desc").html("Adiciona um toque especial por apenas 2€:");
  $("#oferta_id").remove();
  $(".explore-products").html(html);

  if (typeof open_product_right_barCatalog === 'function') open_product_right_barCatalog();
  else console.warn("[BZR] open_product_right_barCatalog() não encontrada.");
});

// 9) Ação do botão "Adicionar"
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

// 10) Reset ao fechar overlay
$("#explore-products-right-bar .mfp-close, .explore-products-overlay").on("click", function() {
  $(".rdc-wrapper-bar-header-title").html("Oferta promocional");
  $(".rdc-wrapper-bar-header-desc").html("Escolhe a oferta que pretendes receber:");
  $(".rdc-wrapper-popup-header-title").html("Oferta promocional");
  $(".rdc-wrapper-popup-header-desc").html("Escolhe a oferta que pretendes receber:");
});
