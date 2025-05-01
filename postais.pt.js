
(function () {
  const t = {
    titulo: "Escolhe um postal",
    subtitulo: "Este dia da mãe oferece um complemento especial:",
    botao: "Adicionar",
    mensagemPopup: "Oferta promocional",
    mensagemDesc: "Escolhe a oferta que pretendes receber:",
    semStock: "Sem stock!",
    preco: "Preço",
    botaoSugestao: "Surpreende a tua mãe",
    tamanho: "Único"
  };

  const produtos = [
    {
      "id": "383078",
      "name": "Postal Mãe Craque",
      "price": "2,00",
      "image": "https://1565619539.rsc.cdn77.org/temp/1745939917_39efb8feb6eae333b5b19abcdd862abb.jpg",
      "url": "https://www.bzronline.com/pt/unissexo/acessorios/postal-mae-craque_p383078.html?id=36&cat=0&pc=1"
    },
    {
      "id": "383072",
      "name": "Postal Mãe é Tudo",
      "price": "2,00",
      "image": "https://1565619539.rsc.cdn77.org/temp/1745941208_3c874fcc536fc1a534089e0508e86692.jpg",
      "url": "https://www.bzronline.com/pt/unissexo/acessorios/postal-mae-e-tudo_p383072.html?id=36&cat=0&pc=1"
    },
    {
      "id": "383076",
      "name": "Postal Mãe, És o Meu Maior Trunfo",
      "price": "2,00",
      "image": "https://1565619539.rsc.cdn77.org/temp/1745939454_7474378374f37d2d819f07275e8d8cb5.jpg",
      "url": "https://www.bzronline.com/pt/unissexo/acessorios/postal-mae-es-o-meu-maior-trunfo_p383076.html?id=36&cat=0&pc=1"
    },
    {
      "id": "383075",
      "name": "Postal Mãe Galinha",
      "price": "2,00",
      "image": "https://1565619539.rsc.cdn77.org/temp/1745915830_feaab62c93acf14df95746f5f710f47e.jpg",
      "url": "https://www.bzronline.com/pt/unissexo/acessorios/postal-mae-galinha_p383075.html?id=36&cat=0&pc=1"
    },
    {
      "id": "383074",
      "name": "Postal Mãe Onde Está o Meu...",
      "price": "2,00",
      "image": "https://1565619539.rsc.cdn77.org/temp/1745938726_d9ba422d037891185dd2bae852cbe1f9.jpg",
      "url": "https://www.bzronline.com/pt/unissexo/acessorios/postal-mae-onde-esta-o-meu..._p383074.html?id=36&cat=0&pc=1"
    },
    {
      "id": "383073",
      "name": "Postal Mãe Sabe Mais",
      "price": "2,00",
      "image": "https://1565619539.rsc.cdn77.org/temp/1745914391_c02bf5e1045669a14b4f68b60e342573.jpg",
      "url": "https://www.bzronline.com/pt/unissexo/acessorios/postal-mae-sabe-mais_p383073.html?id=36&cat=0&pc=1"
    },
    {
      "id": "383079",
      "name": "Postal Mãe Só Há 1",
      "price": "2,00",
      "image": "https://1565619539.rsc.cdn77.org/temp/1745940241_5d7102b692738f43f9f2f3818f015f62.jpg",
      "url": "https://www.bzronline.com/pt/unissexo/acessorios/postal-mae-so-ha-1_p383079.html?id=36&cat=0&pc=1"
    },
    {
      "id": "383077",
      "name": "Postal Ó Mãããeeeee!",
      "price": "2,00",
      "image": "https://1565619539.rsc.cdn77.org/temp/1745939748_d3b6502900d459a221ee12a858f61691.jpg",
      "url": "https://www.bzronline.com/pt/unissexo/acessorios/postal-o-maaaeeeee!_p383077.html?id=36&cat=0&pc=1"
    },
    {
      "id": "383080",
      "name": "Postal Para a Minha Fã Nº 1",
      "price": "2,00",
      "image": "https://1565619539.rsc.cdn77.org/temp/1745940551_a293dd9244747a6de6ebb6cd8e109404.jpg",
      "url": "https://www.bzronline.com/pt/unissexo/acessorios/postal-para-a-minha-fa-n-1_p383080.html?id=36&cat=0&pc=1"
    }
  ];
  

  if ($('#mm-sugestoes').length === 0) {
    $(".wrapper-shoppingbag-product-list").append(`
      <a class="button" id="mm-sugestoes" style="width: 100%;font-size: 16px;padding-top: 12px;padding-bottom: 12px;vertical-align: middle;background: none;color: black;display: flex;align-items: center;border-radius: 5px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-gift"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M3 8m0 1a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1z"></path><path d="M12 8l0 13"></path><path d="M19 12v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-7"></path><path d="M7.5 8a2.5 2.5 0 0 1 0 -5a4.8 8 0 0 1 4.5 5a4.8 8 0 0 1 4.5 -5a2.5 2.5 0 0 1 0 5"></path></svg>
        <span style="margin-left: 10px;">${t.botaoSugestao}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-caret-down" style="margin-left: auto;"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M18 9c.852 0 1.297 .986 .783 1.623l-.076 .084l-6 6a1 1 0 0 1 -1.32 .083l-.094 -.083l-6 -6l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057v-.118l.005 -.058l.009 -.06l.01 -.052l.032 -.108l.027 -.067l.07 -.132l.065 -.09l.073 -.081l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01l.057 -.004l12.059 -.002z"></path></svg>
      </a>`);
  }

  $("#explore-products-right-bar .mfp-close, .explore-products-overlay").on("click", function(ev){
    $(".rdc-wrapper-bar-header-title").html(t.mensagemPopup);
    $(".rdc-wrapper-bar-header-desc").html(t.mensagemDesc);
    $(".rdc-wrapper-popup-header-title").html(t.mensagemPopup);
    $(".rdc-wrapper-popup-header-desc").html(t.mensagemDesc);
  });

  $(document).on('click', '#mm-sugestoes', function(e) {
    e.preventDefault();
    let html = '';
    $.each(produtos, function(i, product) {
      html += `
        <div class="product-item">
          <div class="clearfix">
            <div class="product-item-image productMask" onclick="location.href='${product.url}'">
              <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-item-desc desc">
              <p class="featuredH5 list-nav-title product-item-name name" onclick="location.href='${product.url}'">${product.name}</p>
              <p class="product-item-ref">Ref: ${product.id}|${t.tamanho}</p>
              <p class="product-item-variants variants">
                <span></span>
                <span>${t.preco}: ${product.price} €</span>
              </p>
              <div class="meu-product-item-button">
                <a class="button" meu-id="${product.id}" style="width:100%;">${t.botao}</a>
              </div>
            </div>
          </div>
        </div>`;
    });

    $(".rdc-wrapper-bar-header-title").html(t.titulo);
    $(".rdc-wrapper-bar-header-desc").html(t.subtitulo);
    $(".rdc-wrapper-popup-header-title").html(t.titulo);
    $(".rdc-wrapper-popup-header-desc").html(t.subtitulo);
    $("#oferta_id").remove();
    $(".explore-products").html(html);
    open_product_right_barCatalog();
  });

  $(document).on('click', '.meu-product-item-button .button', function(e) {
    e.preventDefault();
    const productId = $(this).attr('meu-id');
    const url = `https://www.bzronline.com/api/api.php/addToBasket/816/0/${productId}/1/1`;

    $.ajax({
      url: url,
      type: 'GET',
      success: function(response) {
        location.reload();
        console.log(response);
      },
      error: function(err) {
        alert(t.semStock);
        console.error(err);
      }
    });
  });
})();
