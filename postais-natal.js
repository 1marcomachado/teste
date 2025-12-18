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
  const produtos = [
    {"id":"399014","reference":"POSTAL-N-POSTAL","name":"Postal de Natal O Postal","frase":"Chega o natal e levas outra vez com o postal.","price":"2,00","image":"https://1565619539.rsc.cdn77.org/temp/1764859583_6b93822f6a186c7fcccb458b63d6ae57.jpg"},
    {"id":"399013","reference":"POSTAL-N-GATO","name":"Postal de Natal Gato","frase":"Se não gostares da prenda, pelo menos finge, ok?","price":"2,00","image":"https://1565619539.rsc.cdn77.org/temp/1764859512_a625059e9b48d7b17aef6fff0a0d49d7.jpg"},
    {"id":"399015","reference":"POSTAL-N-VINHO","name":"Postal de Natal Hold My Wine","frase":"HOHO Hold my wine","price":"2,00","image":"https://1565619539.rsc.cdn77.org/temp/1764859462_e514dd138247195efb8ac9d8cc450a35.jpg"},
    {"id":"399011","reference":"POSTAL-N-AVISO","name":"Postal de Natal Aviso","frase":"Aviso: Este presente pode causar inveja entre familiares","price":"2,00","image":"https://1565619539.rsc.cdn77.org/temp/1764859650_10447c2c15d7cbda8efea2cec3394fc2.jpg"},
    {"id":"399012","reference":"POSTAL-N-CAO","name":"Postal de Natal Cão","frase":"Mais um natal a fingir que foste bonzinho","price":"2,00","image":"https://1565619539.rsc.cdn77.org/temp/1764859327_66e99a2c76328a7e52ad1bedea2bff79.jpg"},
    {"id":"399009","reference":"POSTAL-N-PAINATAL","name":"Postal de Natal Pai Natal","frase":"Mais um natal a fingir que foste bonzinho","price":"2,00","image":"https://1565619539.rsc.cdn77.org/temp/1764859229_3a2a4949274425f25c1cd167bbee1f2f.jpg"},
    {"id":"399010","reference":"POSTAL-N-SI","name":"Postal de Natal Siiiii CR7","frase":"Feliz natal para Siiiiiiiiiiii","price":"2,00","image":"https://1565619539.rsc.cdn77.org/temp/1764859715_31ba4facfb820978e0d87cbfd8e1dd6d.jpg"}
  ];

  // 2) CSS
  if ($('#mm-sugestoes-style').length === 0) {
    $('head').append(`
      <style id="mm-sugestoes-style">
        #mm-sugestoes{width:100%;display:flex;align-items:center;gap:16px;padding:18px;border:1px solid #e6e6e6;border-radius:18px;background:#fff;margin:14px 0}
        #mm-sugestoes img{width:86px;height:86px;object-fit:cover;border:1px solid #eee}
        .mm-btn{margin-left:auto;background:#111;color:#fff;border-radius:16px;padding:14px 18px;font-weight:800}
        .mm-zoom-img{cursor:zoom-in}

        #mm-lightbox{position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.85);display:none;align-items:center;justify-content:center}
        #mm-lightbox img{max-width:90%;max-height:90%;border-radius:8px}
        .mm-lightbox-close{position:absolute;top:20px;right:26px;font-size:36px;color:#fff;cursor:pointer}
      </style>
    `);
  }

  // 3) LIGHTBOX HTML
  if (!$('#mm-lightbox').length) {
    $('body').append(`
      <div id="mm-lightbox">
        <span class="mm-lightbox-close">&times;</span>
        <img id="mm-lightbox-img" src="">
      </div>
    `);
  }

  // 4) CARD
  function getCardHTML() {
    return `
      <a id="mm-sugestoes" href="#">
        <img src="${produtos[0].image}">
        <div>
          <strong>DÁ UM TOQUE ESPECIAL AO TEU PRESENTE</strong><br>
          Postal de Natal por <b>2€</b>
        </div>
        <div class="mm-btn">+ ADICIONAR</div>
      </a>
    `;
  }

  $('.rdc-shop-cupons-area').before(getCardHTML());

  // 5) CLICK CARD
  $(document).on('click', '#mm-sugestoes', function(e) {
    e.preventDefault();

    let html = '';
    produtos.forEach(p => {
      html += `
        <div class="product-item">
          <img src="${p.image}" class="mm-zoom-img" data-large="${p.image}">
          <p><strong>${p.name}</strong></p>
          <p>"${p.frase}"</p>
          <a class="button add-postal" data-id="${p.id}">Adicionar</a>
        </div>
      `;
    });

    $('.explore-products').html(html);
    open_product_right_barCatalog?.();
  });

  // 6) LIGHTBOX OPEN
  $(document).on('click', '.mm-zoom-img', function(e) {
    e.stopPropagation();
    $('#mm-lightbox-img').attr('src', $(this).data('large'));
    $('#mm-lightbox').fadeIn(200);
  });

  // 7) LIGHTBOX CLOSE
  $(document).on('click', '.mm-lightbox-close, #mm-lightbox', function() {
    $('#mm-lightbox').fadeOut(200);
  });

  $(document).on('click', '#mm-lightbox img', function(e) {
    e.stopPropagation();
  });

  // 8) ADD TO CART
  $(document).on('click', '.add-postal', function(e) {
    e.preventDefault();
    const id = $(this).data('id');

    $.get(`https://www.bzronline.com/api/api.php/addToBasket/816/0/${id}/1/1`)
      .done(() => location.reload())
      .fail(() => alert('Sem stock'));
  });

})();
