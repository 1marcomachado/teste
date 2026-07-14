(function () {
  if (window.__mmHavaianasPromoInit) return;
  window.__mmHavaianasPromoInit = true;

  // Deteção de idioma do site (PT, ES ou EN)
  function getShopLanguage() {
    const lang = document.documentElement.getAttribute('lang') || '';
    if (lang.toLowerCase().startsWith('es')) return 'es';
    if (lang.toLowerCase().startsWith('en')) return 'en';
    if (lang.toLowerCase().startsWith('pt')) return 'pt';
    
    const url = window.location.href;
    if (url.includes('/es/')) return 'es';
    if (url.includes('/en/')) return 'en';
    
    const script = document.querySelector('script[data-shop-lang]');
    const shopLang = script?.getAttribute('data-shop-lang') || '';
    if (shopLang.toLowerCase().startsWith('es')) return 'es';
    if (shopLang.toLowerCase().startsWith('en')) return 'en';
    
    return 'pt';
  }

  const lang = getShopLanguage();

  // Dicionário de Traduções para os 3 Idiomas
  const translations = {
    pt: {
      title: "RECEBE UMA BOLSA HAVAIANAS GRÁTIS",
      unlockedTitle: "OFERTA DESBLOQUEADA!",
      subtitle0: "Adiciona <strong>2 artigos Havaianas</strong> ao carrinho para desbloqueares esta oferta.",
      subtitle1: "Adiciona mais <strong>1 artigo Havaianas</strong> ao carrinho para desbloqueares esta oferta.",
      subtitleUnlocked: "Oferta desbloqueada! Tens direito à tua Bolsa Havaianas Grátis.",
      addBtn: "ADICIONAR"
    },
    es: {
      title: "LLÉVATE UNA BOLSA HAVAIANAS GRATIS",
      unlockedTitle: "¡OFERTA DESBLOQUEADA!",
      subtitle0: "Añade <strong>2 artículos de Havaianas</strong> al carrito para desbloquear esta oferta.",
      subtitle1: "Añade <strong>1 artículo más de Havaianas</strong> al carrito para desbloquear esta oferta.",
      subtitleUnlocked: "¡Oferta desbloqueada! Tienes derecho a tu Bolsa Havaianas Gratis.",
      addBtn: "AÑADIR"
    },
    en: {
      title: "GET A FREE HAVAIANAS BAG",
      unlockedTitle: "OFFER UNLOCKED!",
      subtitle0: "Add <strong>2 Havaianas items</strong> to the cart to unlock this offer.",
      subtitle1: "Add <strong>1 more Havaianas item</strong> to the cart to unlock this offer.",
      subtitleUnlocked: "Offer unlocked! You are eligible for your Free Havaianas Bag.",
      addBtn: "ADD"
    }
  };

  const t = translations[lang] || translations.pt;

  // Imagem da Bolsa da Campanha fornecida
  const bagImage = "https://1565619539.rsc.cdn77.org/images/block1_14362.jpg";

  // Catálogo completo de 174 produtos Havaianas embutido para carregamento instantâneo
  const rawProducts = [
  {
    "id": "409806",
    "name": "Saco de Praia Havaianas XL Print Frutado",
    "price": "23,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1781526517_02899e5d0693cae2153b1e99e9f51ae3.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/saco-de-praia-havaianas-xl-print-frutado_p409806.html",
    "directAdd": true
  },
  {
    "id": "409075",
    "name": "Chinelos de Plataforma Havaianas Over Puffed Up Castanhos Para Mulher",
    "price": "54,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779208226_845db29fd1cfdf6619f8605e9dbe2ae4.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-de-plataforma-havaianas-over-puffed-up-castanhos-para-mulher_p409075.html",
    "directAdd": false
  },
  {
    "id": "409569",
    "name": "Mala Pequena Havaianas Chain II Chrome Bege",
    "price": "23,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1782919708_cb70fe979fcef119e88d089ccfcfc0ba.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-chain-ii-chrome-bege_p409569.html",
    "directAdd": true
  },
  {
    "id": "409457",
    "name": "Mala Grande Havaianas Puff Beach Verde",
    "price": "54,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1780493957_a207f1a3ec940d59ae5d08a570af9f35.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/mala-grande-havaianas-puff-beach-verde_p409457.html",
    "directAdd": true
  },
  {
    "id": "212606",
    "name": "Mala Pequena Havaianas Mini Bag Logo Preta",
    "price": "17,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741785707_edb4976fb794d5b720a3090ce306a786.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-mini-bag-logo-preta_p212606.html",
    "directAdd": true
  },
  {
    "id": "181533",
    "name": "Necessaire Havaianas Beach Preto",
    "price": "23,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741784032_23f76976108b257db72f35f649ee742b.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/necessaire-havaianas-beach-preto_p181533.html",
    "directAdd": true
  },
  {
    "id": "348241",
    "name": "Bolsa a Tiracolo Havaianas Street Bag Glitter Bege",
    "price": "23,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1780399170_626bc3a5f7d9943171a54ddc9f9b89da.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/bolsa-a-tiracolo-havaianas-street-bag-glitter-bege_p348241.html",
    "directAdd": true
  },
  {
    "id": "409418",
    "name": "Necessaire Havaianas Beach Glitter Rosa",
    "price": "26,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1780497155_10e5bfe9ccf00d7021db61cc5dd89489.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/necessaire-havaianas-beach-glitter-rosa_p409418.html",
    "directAdd": true
  },
  {
    "id": "1407",
    "name": "Chinelos Havaianas Top Pretos",
    "price": "21,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779375980_3c947aea7cd109afc1f62047f677d348.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-top-pretos_p1407.html",
    "directAdd": false
  },
  {
    "id": "24993",
    "name": "Chinelos Havaianas Top Tiras Bronze",
    "price": "21,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779375698_e378e6b476ae70ad538d263974230c31.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-top-tiras-bronze_p24993.html",
    "directAdd": false
  },
  {
    "id": "239933",
    "name": "Mala Pequena Havaianas Mini Bag Plus Glitter Preta",
    "price": "21,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1780070386_7e2563bc9b01eb09e305ad1eaf83ed68.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-mini-bag-plus-glitter-preta_p239933.html",
    "directAdd": true
  },
  {
    "id": "212401",
    "name": "Chinelos Havaianas Top Mix Pretos e Brancos",
    "price": "24,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743430210_67bf7f8d4982e24d7e4e83ded0556f46.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-top-mix-pretos-e-brancos_p212401.html",
    "directAdd": false
  },
  {
    "id": "1411",
    "name": "Chinelos Havaianas Slim Pretos",
    "price": "29,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743180885_84130daa626715e88053c9ef63cb8a94.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-pretos_p1411.html",
    "directAdd": false
  },
  {
    "id": "409202",
    "name": "Chinelos Havaianas Top S�o Lu�s Brancos e Azuis",
    "price": "29,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779439607_dbe070a748a5eb8090cbc35b657607bb.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-top-sao-luis-brancos-e-azuis_p409202.html",
    "directAdd": false
  },
  {
    "id": "409302",
    "name": "Chinelos Havaianas Top Copacabana",
    "price": "29,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1780054300_6146b3d77895bc3731e0b6e8fb2ebc99.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-top-copacabana_p409302.html",
    "directAdd": false
  },
  {
    "id": "409278",
    "name": "Mala Pequena Havaianas Casual II Cinzenta e Prateada",
    "price": "37,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1780064084_0dae176804b81649c9f5e23c19801a4c.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-casual-ii-cinzenta-e-prateada_p409278.html",
    "directAdd": true
  },
  {
    "id": "409192",
    "name": "Chinelos Havaianas Top Marvel II Avengers Kids Brancos",
    "price": "21,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779444621_e932d949d063f10573722c295db22a61.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-top-marvel-ii-avengers-kids-brancos_p409192.html",
    "directAdd": false
  },
  {
    "id": "409217",
    "name": "Chinelos Havaianas Disney Cars Kids Vermelhos e Brancos",
    "price": "21,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779447207_981244ebed256e25fb8b0b7caad570f6.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-disney-cars-kids-vermelhos-e-brancos_p409217.html",
    "directAdd": false
  },
  {
    "id": "409186",
    "name": "Chinelos Havaianas Logo Metallic Bronze",
    "price": "24,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779377647_9bcb5c16d27e17ee8b46fdacf39c1db6.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-logo-metallic-bronze_p409186.html",
    "directAdd": false
  },
  {
    "id": "409183",
    "name": "Chinelos Havaianas Simpsons Azuis e Pretos",
    "price": "29,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779379267_e2da1471bd84e4d678e2cb18f48ad1e2.jpg",
    "url": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-simpsons-azuis-e-pretos_p409183.html",
    "directAdd": false
  },
  {
    "id": "409206",
    "name": "Chinelos Havaianas Top Bossa Bege",
    "price": "29,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779440470_4d734d84a5bf863276cc5ad5130fc06e.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-top-bossa-bege_p409206.html",
    "directAdd": false
  },
  {
    "id": "409199",
    "name": "Chinelos Havaianas Brasil Twist Azuis",
    "price": "35,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779452094_5288c219a3677099bc6d5d4b2c7beacf.jpg",
    "url": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-brasil-twist-azuis_p409199.html",
    "directAdd": false
  },
  {
    "id": "409213",
    "name": "Sand�lias Havaianas Flash Fusion Pretas e Bege",
    "price": "37,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779453067_916b99d6ecb8c0c603685481e5123ae5.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/sandalias-havaianas-flash-fusion-pretas-e-bege_p409213.html",
    "directAdd": false
  },
  {
    "id": "181278",
    "name": "Necessaire Havaianas Beach Metallic Dourado",
    "price": "27,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741783650_8cc0da6f24eb56eede09cc6ab6fba143.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/necessaire-havaianas-beach-metallic-dourado_p181278.html",
    "directAdd": true
  },
  {
    "id": "212441",
    "name": "Sand�lias Havaianas Luna Rosa",
    "price": "24,90 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1617105431_b50067870f53e5b00911d6113694f0ab.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/sandalias-havaianas-luna-rosa_p212441.html",
    "directAdd": false
  },
  {
    "id": "378527",
    "name": "Chinelos Havaianas Brasil Logo Bege",
    "price": "29,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1742548277_44e0294776348fb32130dfe604b8077b.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-brasil-logo-bege_p378527.html",
    "directAdd": false
  },
  {
    "id": "378347",
    "name": "Chinelos Havaianas Slim Tropical Laranja",
    "price": "33,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1781690428_2af292c1486b79d4efc6f8f75209ac96.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-tropical-laranja_p378347.html",
    "directAdd": false
  },
  {
    "id": "181427",
    "name": "Chinelos Havaianas Slim Flatform Pretos",
    "price": "33,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743182452_e911a53527c2f67ab517607591d2588b.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-flatform-pretos_p181427.html",
    "directAdd": false
  },
  {
    "id": "378313",
    "name": "Chinelos Havaianas Slim Point Rosa",
    "price": "33,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741688560_d78368b576c63462d3a2500cd6eec774.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-point-rosa_p378313.html",
    "directAdd": false
  },
  {
    "id": "409169",
    "name": "Chinelos Havaianas Slim Disney Lilo & Stitch Kids",
    "price": "21,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779374848_309d9180f8d6e95e9cb53ea641d8df29.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-slim-disney-lilo-e-stitch-kids_p409169.html",
    "directAdd": false
  },
  {
    "id": "409163",
    "name": "Chinelos Havaianas Aqua verdes",
    "price": "23,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779374194_ebe7e744d449f6d6119091ce214240cf.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-aqua-verdes_p409163.html",
    "directAdd": false
  },
  {
    "id": "180974",
    "name": "Sand�lias Havaianas Flash Urban Pretas",
    "price": "25,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1588869879_98539937d0ce08c0e8cab548de1ab017.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/sandalias-havaianas-flash-urban-pretas_p180974.html",
    "directAdd": false
  },
  {
    "id": "409166",
    "name": "Chinelos Havaianas Aqua Metallic Bordeaux",
    "price": "25,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779373965_2d5674b86d229a8edbbe668cb8548efe.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-aqua-metallic-bordeaux_p409166.html",
    "directAdd": false
  },
  {
    "id": "409155",
    "name": "Chinelos Havaianas Top Camu Verdes",
    "price": "27,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779375432_88162704fe081aa401fb639ba582c016.jpg",
    "url": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-top-camu-verdes_p409155.html",
    "directAdd": false
  },
  {
    "id": "409158",
    "name": "Chinelos Havaianas Slim Glitter II Kids Azuis e Bege",
    "price": "27,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779375143_1eb3858e35c842cccb297ae5dc70888f.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-glitter-ii-kids-azuis-e-bege_p409158.html",
    "directAdd": false
  },
  {
    "id": "181015",
    "name": "Chinelos Havaianas Brasil Logo Brancos",
    "price": "29,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1742579043_a366174eff985e1c28cec116fdd905df.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-brasil-logo-brancos_p181015.html",
    "directAdd": false
  },
  {
    "id": "409152",
    "name": "Chinelos Havaianas Slim Animals Print Leopardo Castanhos e Dourados",
    "price": "31,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779374570_c0fa481af397e09302d40e5ffcf97394.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-animals-print-leopardo-castanhos-e-dourados_p409152.html",
    "directAdd": false
  },
  {
    "id": "378351",
    "name": "Chinelos Havaianas Slim Flatform Bege",
    "price": "33,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743097907_49a6082781b0cf3fe0683f57d70237bd.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-flatform-bege_p378351.html",
    "directAdd": false
  },
  {
    "id": "378421",
    "name": "Necessaire Havaianas Beach Glitter Rosa",
    "price": "26,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741779599_f45dbbf250f3ac33bd0525ce6776217b.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/necessaire-havaianas-beach-glitter-rosa_p378421.html",
    "directAdd": true
  },
  {
    "id": "409008",
    "name": "Sand�lias Havaianas Baby Disney Classics II Azuis",
    "price": "20,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1778834003_c6779f8687a7a441a26b36dbb15057b1.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/sandalias-havaianas-baby-disney-classics-ii-azuis_p409008.html",
    "directAdd": false
  },
  {
    "id": "378534",
    "name": "Sand�lias Havaianas Baby A Porquinha Peppa Amarelas",
    "price": "20,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1742489611_020be5e8b631410b53a88baf54e3f3da.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/sandalias-havaianas-baby-a-porquinha-peppa-amarelas_p378534.html",
    "directAdd": false
  },
  {
    "id": "23744",
    "name": "Chinelos Havaianas Top Brancos",
    "price": "21,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743183854_3a84fc854731a1ea84640ce787a7d0f5.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-top-brancos_p23744.html",
    "directAdd": false
  },
  {
    "id": "408995",
    "name": "Chinelos Havaianas Slim Princess Kids Bege",
    "price": "21,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1778774128_e9f14207ec0d208f8536fb4e1a064c76.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-slim-princess-kids-bege_p408995.html",
    "directAdd": false
  },
  {
    "id": "378418",
    "name": "Necessaire Havaianas Beach Rosa",
    "price": "23,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741778873_c7adfe5a0dad01bbf322623c669bb711.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/necessaire-havaianas-beach-rosa_p378418.html",
    "directAdd": true
  },
  {
    "id": "378328",
    "name": "Chinelos Havaianas Aqua Metallic Bege",
    "price": "25,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743096507_a1a1bd2a00effbf10a2c706b02f29964.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-aqua-metallic-bege_p378328.html",
    "directAdd": false
  },
  {
    "id": "409005",
    "name": "Chinelos Havaianas Top Summer Vibes Bege",
    "price": "25,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1778832970_16182a9bd1bfe09230718f4851f4d7da.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-top-summer-vibes-bege_p409005.html",
    "directAdd": false
  },
  {
    "id": "348168",
    "name": "Chinelos Havaianas Slim Verdes",
    "price": "29,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1710409180_4447e7a5a19998e26a0400f41258c20d.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-verdes_p348168.html",
    "directAdd": false
  },
  {
    "id": "378531",
    "name": "Chinelos Havaianas Brasil Logo Rosa",
    "price": "29,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741857339_47544479f0a78d92027e824bf1442d1c.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-brasil-logo-rosa_p378531.html",
    "directAdd": false
  },
  {
    "id": "378289",
    "name": "Chinelos Havaianas Slim Animals Print Leopardo",
    "price": "31,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743096969_b7031a26069bbcb2587c995bc02867d3.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-animals-print-leopardo_p378289.html",
    "directAdd": false
  },
  {
    "id": "408976",
    "name": "Chinelos Havaianas Slim Tropical Amarelos",
    "price": "33,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1778770025_2813ec17f61cce4e9ddf179796e3f869.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-tropical-amarelos_p408976.html",
    "directAdd": false
  },
  {
    "id": "408989",
    "name": "Chinelos Havaianas Square Logo Metallic Pretos",
    "price": "33,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1778772754_8b67d77d78d14518e941cee8992b4847.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-square-logo-metallic-pretos_p408989.html",
    "directAdd": false
  },
  {
    "id": "408983",
    "name": "Chinelos Havaianas Slide Strap Verdes",
    "price": "44,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1778771274_41150e61fe8bd8b395153e94bd92cf9b.jpg",
    "url": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-slide-strap-verdes_p408983.html",
    "directAdd": false
  },
  {
    "id": "351097",
    "name": "Mala Pequena Havaianas Mini Bag Plus Cool Metallic Prateada",
    "price": "16,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741784957_d4cf74bd1b95d40b3481a61a68c932be.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-mini-bag-plus-cool-metallic-prateada_p351097.html",
    "directAdd": true
  },
  {
    "id": "378425",
    "name": "Mala Pequena Havaianas Mini Bag Logo Verde",
    "price": "16,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741781327_fbfcebfe42797b278d7f7a34d57a63a4.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-mini-bag-logo-verde_p378425.html",
    "directAdd": true
  },
  {
    "id": "239821",
    "name": "Porta-Moedas Havaianas Disney Classics",
    "price": "17,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1714651607_6bf16aac00a6db488e5486cc1de24038.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/porta-moedas-havaianas-disney-classics_p239821.html",
    "directAdd": false
  },
  {
    "id": "181532",
    "name": "Mala Pequena Havaianas Mini Bag Plus Cool Metallic Dourada",
    "price": "18,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741785396_a7afccd73b39532fc3a1ecec4b4ab98a.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-mini-bag-plus-cool-metallic-dourada_p181532.html",
    "directAdd": true
  },
  {
    "id": "378355",
    "name": "Sand�lias Havaianas Baby Disney Classics II Amarelas",
    "price": "20,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741696256_4803b018d1185c9fb7b03ef96a9cf2ba.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/sandalias-havaianas-baby-disney-classics-ii-amarelas_p378355.html",
    "directAdd": false
  },
  {
    "id": "312192",
    "name": "Mala Pequena Havaianas Charm Disney Classics",
    "price": "20,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1716202269_2c5c10af32d388292cd5046acdd6c34f.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-charm-disney-classics_p312192.html",
    "directAdd": true
  },
  {
    "id": "23759",
    "name": "Chinelos Havaianas Top Azuis",
    "price": "21,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1713437997_2481bf8823a0575f83f6f2b839d0e5b3.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-top-azuis_p23759.html",
    "directAdd": false
  },
  {
    "id": "212602",
    "name": "Bolsa a Tiracolo Havaianas Street Bag",
    "price": "21,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1715959345_451787011056f3c5971eb0ff3219b998.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/acessorios/bolsa-a-tiracolo-havaianas-street-bag_p212602.html",
    "directAdd": true
  },
  {
    "id": "378474",
    "name": "Mala Pequena Havaianas Mini Bag Plus Glitter Bordeaux",
    "price": "21,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741782487_7ada787aca9f3a398353742c01e45661.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-mini-bag-plus-glitter-bordeaux_p378474.html",
    "directAdd": true
  },
  {
    "id": "378361",
    "name": "Chinelos Havaianas Top Marvel II Kids Vermelhos",
    "price": "21,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741696833_283b54ed25c21a7d4f63fa2f9f93038e.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-top-marvel-ii-kids-vermelhos_p378361.html",
    "directAdd": false
  },
  {
    "id": "351071",
    "name": "Bolsa a Tiracolo Havaianas Street Bag Glitter Cinzenta",
    "price": "23,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1780398533_cb7e0a3c9c0b55fd26df1c36957e817d.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/bolsa-a-tiracolo-havaianas-street-bag-glitter-cinzenta_p351071.html",
    "directAdd": true
  },
  {
    "id": "385525",
    "name": "Chinelos Havaianas Top Logomania 2 Pretos e Vermelhos",
    "price": "24,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1749120744_19bb7933521ec91692e26dc3d1a4c585.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-top-logomania-2-pretos-e-vermelhos_p385525.html",
    "directAdd": false
  },
  {
    "id": "351096",
    "name": "Necessaire Havaianas Beach Metallic",
    "price": "26,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1716827956_df92dafadef0945d266fa30764d0acea.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/necessaire-havaianas-beach-metallic_p351096.html",
    "directAdd": true
  },
  {
    "id": "1413",
    "name": "Chinelos Havaianas Slim",
    "price": "27,00 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1551380305_f51dddee47ca8bd8979e2223d5030b65.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim_p1413.html",
    "directAdd": false
  },
  {
    "id": "378323",
    "name": "Chinelos Havaianas Top Surfer",
    "price": "27,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1747842224_1ba32d5761d4fb431cd22ab2856f5c56.jpg",
    "url": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-top-surfer_p378323.html",
    "directAdd": false
  },
  {
    "id": "239670",
    "name": "Chinelos Havaianas Slim Flatform",
    "price": "29,00 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1649955901_8b944d1c8e7b4e505e7ff65bb88bb8ad.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-flatform_p239670.html",
    "directAdd": false
  },
  {
    "id": "378319",
    "name": "Chinelos Havaianas Slim Laranja",
    "price": "29,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741689047_e25f3e84d8ed0e5ba373025a7fac02db.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-laranja_p378319.html",
    "directAdd": false
  },
  {
    "id": "310130",
    "name": "Chinelos Havaianas Brasil Logo Verdes",
    "price": "29,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743521347_88370ab0e4960b21f4c50ad1a901b734.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-brasil-logo-verdes_p310130.html",
    "directAdd": false
  },
  {
    "id": "348243",
    "name": "Bolsa a Tiracolo Havaianas Street Bag Glitter Preta",
    "price": "29,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1780398761_29f18a79a08dbfaec5cc76e7a056e6ae.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/bolsa-a-tiracolo-havaianas-street-bag-glitter-preta_p348243.html",
    "directAdd": true
  },
  {
    "id": "348122",
    "name": "Chinelos Havaianas Urban Basic Material Pretos",
    "price": "29,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1710350498_50f283d2fff354ce5fec6abaa5db9c11.jpg",
    "url": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-urban-basic-material-pretos_p348122.html",
    "directAdd": false
  },
  {
    "id": "1409",
    "name": "Chinelos Havaianas Slim Rosa",
    "price": "30,00 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1749140555_d1a182923c521c2fdef5273bd4512b95.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-rosa_p1409.html",
    "directAdd": false
  },
  {
    "id": "1438",
    "name": "Chinelos Havaianas Brasil Logo Azuis",
    "price": "30,00 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1742807573_c2fde81747bb04e7ea87f560edd291fa.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-brasil-logo-azuis_p1438.html",
    "directAdd": false
  },
  {
    "id": "181089",
    "name": "Sand�lias Havaianas Luna Pretas",
    "price": "30,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1588851398_a9013c07b8b7ee353164bb3a2cf3e526.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/sandalias-havaianas-luna-pretas_p181089.html",
    "directAdd": false
  },
  {
    "id": "378297",
    "name": "Chinelos Havaianas Slim Point Bege",
    "price": "33,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741687590_33ca608e51e539c568fc3ec8bcaac635.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-point-bege_p378297.html",
    "directAdd": false
  },
  {
    "id": "378340",
    "name": "Chinelos Havaianas Top Square Fusion Premium Bege",
    "price": "33,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743096795_a2092b93104184f61c67ae4d46ba2993.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-top-square-fusion-premium-bege_p378340.html",
    "directAdd": false
  },
  {
    "id": "348188",
    "name": "Chinelos Havaianas Slim Glitter II Dourados",
    "price": "35,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743183764_dc7909365d70a4c372e9f280f91fd82d.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-glitter-ii-dourados_p348188.html",
    "directAdd": false
  },
  {
    "id": "378419",
    "name": "Mala Pequena Havaianas Clutch Preta",
    "price": "35,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741777306_ad92dbceefbbca88f72c1834d268451c.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-clutch-preta_p378419.html",
    "directAdd": true
  },
  {
    "id": "378402",
    "name": "Bolsa a Tiracolo Havaianas Casual Preta",
    "price": "35,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741775162_89bc89d367108b876e38afb7ae55869d.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/bolsa-a-tiracolo-havaianas-casual-preta_p378402.html",
    "directAdd": false
  },
  {
    "id": "312203",
    "name": "Bolsa a Tiracolo Havaianas Diamong Bag",
    "price": "39,90 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1716293065_aa45c9bf8ada2dbc96aa65c7f119d87b.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/bolsa-a-tiracolo-havaianas-diamong-bag_p312203.html",
    "directAdd": true
  },
  {
    "id": "348115",
    "name": "Chinelos Havaianas Hype",
    "price": "27,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1710350742_e8cc918664b93e2205bade4a758446a8.jpg",
    "url": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-hype_p348115.html",
    "directAdd": false
  },
  {
    "id": "385472",
    "name": "Chinelos Havaianas The Simpsons",
    "price": "29,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1749124447_af0b187932624945ca7e5927bff34667.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-the-simpsons_p385472.html",
    "directAdd": false
  },
  {
    "id": "383344",
    "name": "Chinelos Havaianas Slim Flatform Loop Premium Bege",
    "price": "39,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1746010287_92eeb58a0d3f22d992dd4d06d5c5382d.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-flatform-loop-premium-bege_p383344.html",
    "directAdd": false
  },
  {
    "id": "378364",
    "name": "Chinelos Havaianas Slim Princess Kids Rosa",
    "price": "21,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1744645578_258315b4be97001642e452abd7ee2c64.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-slim-princess-kids-rosa_p378364.html",
    "directAdd": false
  },
  {
    "id": "112921",
    "name": "Chinelos Havaianas Slim Logo Metallic Pretos",
    "price": "31,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1680093023_140f8663c0515362bd7ce095e72afd1a.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-logo-metallic-pretos_p112921.html",
    "directAdd": false
  },
  {
    "id": "378503",
    "name": "Chinelos Havaianas Square Logo Metallic Bordeaux",
    "price": "33,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741792892_fe27b5e6c33ffbf5c717c10abd0b31e6.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-square-logo-metallic-bordeaux_p378503.html",
    "directAdd": false
  },
  {
    "id": "378293",
    "name": "Chinelos Havaianas Top Tropicalia Vibes Verdes",
    "price": "25,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743097144_e4419585cf6cdce5e1810be6d71fa339.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-top-tropicalia-vibes-verdes_p378293.html",
    "directAdd": false
  },
  {
    "id": "378309",
    "name": "Chinelos Havaianas Top Square Fusion Premium Pretos e Bege",
    "price": "33,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741688239_04cd7f1bb66efe39d11e9c66f73dee84.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-top-square-fusion-premium-pretos-e-bege_p378309.html",
    "directAdd": false
  },
  {
    "id": "312202",
    "name": "Mala Pequena Havaianas Mini Bag Print",
    "price": "20,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1680171100_69a4e0e97d479f3cebed6661e5d4ddc3.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-mini-bag-print_p312202.html",
    "directAdd": true
  },
  {
    "id": "1444",
    "name": "Chinelos Havaianas Brasil Logo Vermelhos",
    "price": "22,90 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743521960_5481d2419841db47a78dea1ba7aa9168.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-brasil-logo-vermelhos_p1444.html",
    "directAdd": false
  },
  {
    "id": "320362",
    "name": "Chinelos Havaianas Top",
    "price": "21,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1713778686_a355eb5225f00bed9386ea678696e35e.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-top_p320362.html",
    "directAdd": false
  },
  {
    "id": "348291",
    "name": "Chinelos Havaianas Top Tiras Senses",
    "price": "23,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1713283276_371cbca67a5095aa000bf14a72a41785.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-top-tiras-senses_p348291.html",
    "directAdd": false
  },
  {
    "id": "212380",
    "name": "Sand�lias Havaianas Flash Urban",
    "price": "25,00 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1617105075_1b17bc8b5e0ea6be79d7c817b96e8fe4.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/sandalias-havaianas-flash-urban_p212380.html",
    "directAdd": false
  },
  {
    "id": "348212",
    "name": "Chinelos Havaianas Top Nautical",
    "price": "26,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1710419280_a051cd9e66cf3f6b59cb71d30d58e4e1.jpg",
    "url": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-top-nautical_p348212.html",
    "directAdd": false
  },
  {
    "id": "348295",
    "name": "Chinelos Havaianas Disney Stylish",
    "price": "29,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1710417431_56284f21613e4eb14d34663437e7bfa1.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-disney-stylish_p348295.html",
    "directAdd": false
  },
  {
    "id": "314534",
    "name": "Sand�lias Havaianas Flash Urban Plus",
    "price": "29,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1713773733_bb0a5f047c16a84d8ac22bf91004136f.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/sandalias-havaianas-flash-urban-plus_p314534.html",
    "directAdd": false
  },
  {
    "id": "348156",
    "name": "Chinelos Havaianas Urban Basic Material",
    "price": "29,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1710352700_1614fdb8a05d85e75f9f6877659d3788.jpg",
    "url": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-urban-basic-material_p348156.html",
    "directAdd": false
  },
  {
    "id": "348313",
    "name": "Chinelos Havaianas Slim Tropical",
    "price": "33,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1713538815_b937d556e2bfd80ed5c19bd3c391bb07.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-tropical_p348313.html",
    "directAdd": false
  },
  {
    "id": "314073",
    "name": "Chinelos Havaianas You Malta",
    "price": "34,90 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1680685499_1c01d2fb45910ccb4cff8b7dd911067e.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-you-malta_p314073.html",
    "directAdd": false
  },
  {
    "id": "320450",
    "name": "Chinelos Havaianas You Milan",
    "price": "46,90 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1684228960_fd7924c80eb84eb4de51aeafcdd07685.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-you-milan_p320450.html",
    "directAdd": false
  },
  {
    "id": "1421",
    "name": "Chinelos Havaianas Slim",
    "price": "27,00 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1551380305_6bd0effac42de2b9d0963107237366e7.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim_p1421.html",
    "directAdd": false
  },
  {
    "id": "212747",
    "name": "Chinelos Havaianas You Trancoso Premium",
    "price": "41,90 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1617196844_e11f2664b7dadf37a9d81fee2f7f2b4b.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-you-trancoso-premium_p212747.html",
    "directAdd": false
  },
  {
    "id": "314539",
    "name": "Chinelos Havaianas Top Pride Allover",
    "price": "31,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1681133705_26446d7c604fb71ce413d5893f97b975.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-top-pride-allover_p314539.html",
    "directAdd": false
  },
  {
    "id": "239680",
    "name": "Sand�lias Havaianas Luna Premium II",
    "price": "35,00 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1649941697_36252b83fd5a451a7a19b10e402b4ed7.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/sandalias-havaianas-luna-premium-ii_p239680.html",
    "directAdd": false
  },
  {
    "id": "314285",
    "name": "Chinelos Havaianas Top Logomania Colors II",
    "price": "31,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1713778011_bbb5becd82b2adcb01887925bd214adb.jpg",
    "url": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-top-logomania-colors-ii_p314285.html",
    "directAdd": false
  },
  {
    "id": "239686",
    "name": "Sand�lias Havaianas Luna Premium II",
    "price": "35,00 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1649941700_a4624ca9e25be83923ae921d79322f6d.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/sandalias-havaianas-luna-premium-ii_p239686.html",
    "directAdd": false
  },
  {
    "id": "351583",
    "name": "Chinelos Havaianas Logomania Colors II",
    "price": "31,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1713773304_f52d4c0644988da5c5a7572bb68a6792.jpg",
    "url": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-logomania-colors-ii_p351583.html",
    "directAdd": false
  },
  {
    "id": "351518",
    "name": "Chinelos Havaianas Square Logo Metallic",
    "price": "33,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1713438265_db120ba9ae8905f88f1ddcd578fb60a3.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-square-logo-metallic_p351518.html",
    "directAdd": false
  },
  {
    "id": "351534",
    "name": "Chinelos Havaianas Square Glitter",
    "price": "35,90 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1713439499_ecd938fd12750b1ec9ee935eedeae842.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-square-glitter_p351534.html",
    "directAdd": false
  },
  {
    "id": "239701",
    "name": "Chinelos Havaianas Slide Classic Metallic",
    "price": "31,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1654707035_3af710dd4e449c084b3ba30225312aa2.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slide-classic-metallic_p239701.html",
    "directAdd": false
  },
  {
    "id": "312196",
    "name": "Chinelos Havaianas You Malta Metallic",
    "price": "41,90 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1680515041_d1669a3f704cf3402338cdee5a29de55.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-you-malta-metallic_p312196.html",
    "directAdd": false
  },
  {
    "id": "320994",
    "name": "Chinelos Havaianas You Milan",
    "price": "46,90 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1685550538_7648bc6f924a08d9282efaded0084e9b.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-you-milan_p320994.html",
    "directAdd": false
  },
  {
    "id": "181496",
    "name": "Sand�lias Havaianas Twist",
    "price": "28,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1680689468_fbc2ee57bb95c040ed5a8efced5b1371.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/sandalias-havaianas-twist_p181496.html",
    "directAdd": false
  },
  {
    "id": "112890",
    "name": "Chinelos Havaianas Brasil Logo Verdes",
    "price": "25,00 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1553790166_3feea41b6c896c397f3ceee415f87907.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-brasil-logo-verdes_p112890.html",
    "directAdd": false
  },
  {
    "id": "181031",
    "name": "Chinelos Havaianas Brasil Logo Kids",
    "price": "17,90 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743522050_5113c6709232c7955ec961c611cfc988.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-brasil-logo-kids_p181031.html",
    "directAdd": false
  },
  {
    "id": "181010",
    "name": "Chinelos Havaianas Slim Animals",
    "price": "19,90 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1588676511_0add5773cab2fcd9abab714737cb26a4.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-slim-animals_p181010.html",
    "directAdd": false
  },
  {
    "id": "1460",
    "name": "Chinelos Havaianas Brasil Mix",
    "price": "22,90 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1551380312_3ba6f1899e34aea01eadeb6d52ba6602.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-brasil-mix_p1460.html",
    "directAdd": false
  },
  {
    "id": "113076",
    "name": "Chinelos Havaianas Brasil Layers",
    "price": "23,90 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1553792122_91f83d3020ddeaca035e661af24a87c1.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-brasil-layers_p113076.html",
    "directAdd": false
  },
  {
    "id": "212850",
    "name": "Chinelos Havaianas Top Fortnite",
    "price": "27,00 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1617207410_ad2329c277df25efe8927c8a61a014f1.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-top-fortnite_p212850.html",
    "directAdd": false
  },
  {
    "id": "314560",
    "name": "Alpercatas Havaianas Origine IV",
    "price": "39,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1681131722_1a7e2c31647b400840a22e4bc8434b53.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/alpercatas-havaianas-origine-iv_p314560.html",
    "directAdd": false
  },
  {
    "id": "409079",
    "name": "Chinelos de Plataforma Havaianas Over Puffed Up Bege Para Mulher",
    "price": "54,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779207729_d14fe0989a212b5cb97424e2b724a80e.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-de-plataforma-havaianas-over-puffed-up-bege-para-mulher_p409079.html",
    "directAdd": false
  },
  {
    "id": "409570",
    "name": "Mala Pequena Havaianas Chain II Chrome Cinzenta e Prateada",
    "price": "23,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1782920910_25713fc51982b953ca9c78db98540122.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-chain-ii-chrome-cinzenta-e-prateada_p409570.html",
    "directAdd": true
  },
  {
    "id": "409461",
    "name": "Mala Grande Havaianas Puff Beach Bege",
    "price": "54,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1780494629_6ac705b41f2b1bb3f7c7957b1880d051.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/mala-grande-havaianas-puff-beach-bege_p409461.html",
    "directAdd": true
  },
  {
    "id": "409419",
    "name": "Bolsa a Tiracolo Havaianas Street Bag Glitter Rosa",
    "price": "23,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1780399545_63246f938c52876eb7f63c4b763d64df.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/bolsa-a-tiracolo-havaianas-street-bag-glitter-rosa_p409419.html",
    "directAdd": true
  },
  {
    "id": "251031",
    "name": "Necessaire Havaianas Beach Glitter Bege",
    "price": "27,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1716829168_4ce50a79922eee1e498847215dd52390.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/necessaire-havaianas-beach-glitter-bege_p251031.html",
    "directAdd": true
  },
  {
    "id": "385535",
    "name": "Chinelos Havaianas Top Tiras Rosa",
    "price": "21,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1749123275_cb7ea420544f7ef8e8e29f01cef5d7af.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-top-tiras-rosa_p385535.html",
    "directAdd": false
  },
  {
    "id": "239934",
    "name": "Mala Pequena Havaianas Mini Bag Plus Glitter Bege",
    "price": "21,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1716202659_bde7025e2175d3b771e805f0497df2aa.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-mini-bag-plus-glitter-bege_p239934.html",
    "directAdd": true
  },
  {
    "id": "1418",
    "name": "Chinelos Havaianas Slim Bege",
    "price": "29,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1713774198_6abb0379f32b9062f804a921e9f3d7c2.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-bege_p1418.html",
    "directAdd": false
  },
  {
    "id": "409279",
    "name": "Mala Pequena Havaianas Casual II Bege",
    "price": "37,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1780062890_438726635d8718abf4ea2db49e27b7ee.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-casual-ii-bege_p409279.html",
    "directAdd": true
  },
  {
    "id": "409189",
    "name": "Chinelos Havaianas Simpsons Brancos e Azuis",
    "price": "29,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779378270_ae902c8146065931af8acf4362d2368b.jpg",
    "url": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-simpsons-brancos-e-azuis_p409189.html",
    "directAdd": false
  },
  {
    "id": "409210",
    "name": "Chinelos Havaianas Brasil Twist Verdes",
    "price": "35,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779452789_8f2e2a990e1f2165aef6d76b6fd2c0a0.jpg",
    "url": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-brasil-twist-verdes_p409210.html",
    "directAdd": false
  },
  {
    "id": "23847",
    "name": "Sand�lias Havaianas Flash Urban Bronze",
    "price": "25,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743431084_47d2bd355728ac19c574bf7ce821c206.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/sandalias-havaianas-flash-urban-bronze_p23847.html",
    "directAdd": false
  },
  {
    "id": "409012",
    "name": "Sand�lias Havaianas Baby Disney Classics II Laranja",
    "price": "20,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1778834528_cc0a986025739c999f65ca96081a9921.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/sandalias-havaianas-baby-disney-classics-ii-laranja_p409012.html",
    "directAdd": false
  },
  {
    "id": "408999",
    "name": "Chinelos Havaianas Slim Princess Kids Rosa",
    "price": "21,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1778776638_92c2f5706f217d90b5ee750ce49ea685.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-slim-princess-kids-rosa_p408999.html",
    "directAdd": false
  },
  {
    "id": "408992",
    "name": "Chinelos Havaianas Square Logo Metallic Bege",
    "price": "33,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1778772908_a62d2d71960f9248c4a16c2fb1ed4ab2.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-square-logo-metallic-bege_p408992.html",
    "directAdd": false
  },
  {
    "id": "408986",
    "name": "Chinelos Havaianas Slide Strap Pretos",
    "price": "44,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1778771464_30f40f23a8ff862fda4cf4d24c52229c.jpg",
    "url": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-slide-strap-pretos_p408986.html",
    "directAdd": false
  },
  {
    "id": "378455",
    "name": "Mala Pequena Havaianas Mini Bag Logo Azul",
    "price": "16,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741782071_f9e7dd54dae24de372f78363fd623931.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-mini-bag-logo-azul_p378455.html",
    "directAdd": true
  },
  {
    "id": "312194",
    "name": "Porta-Moedas Havaianas Disney Classics",
    "price": "17,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1680174134_f4465310e8c25333e397b0d1df4e9810.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/porta-moedas-havaianas-disney-classics_p312194.html",
    "directAdd": false
  },
  {
    "id": "378358",
    "name": "Sand�lias Havaianas Baby Disney Classics II Rosa",
    "price": "20,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741695690_ac49982d4469900bb943f93e571ed615.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/sandalias-havaianas-baby-disney-classics-ii-rosa_p378358.html",
    "directAdd": false
  },
  {
    "id": "312190",
    "name": "Bolsa a Tiracolo Havaianas Street Bag",
    "price": "21,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1715959714_edad3f2169a79feae586ccc8f8fb9b9e.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/acessorios/bolsa-a-tiracolo-havaianas-street-bag_p312190.html",
    "directAdd": true
  },
  {
    "id": "378509",
    "name": "Chinelos Havaianas Top Marvel II Kids Pretos",
    "price": "21,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741801357_b5e08d1935988665fdd2f3804b86daa8.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-top-marvel-ii-kids-pretos_p378509.html",
    "directAdd": false
  },
  {
    "id": "378475",
    "name": "Bolsa a Tiracolo Havaianas Street Bag Glitter Bordeaux",
    "price": "23,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1780399048_2d538611a8083e1f20c14a2c060e39fc.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/bolsa-a-tiracolo-havaianas-street-bag-glitter-bordeaux_p378475.html",
    "directAdd": true
  },
  {
    "id": "385564",
    "name": "Chinelos Havaianas Top Logomania 2 Brancos e Pretos",
    "price": "24,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1749141777_5476cead99d33450529879cc89bdddbc.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-top-logomania-2-brancos-e-pretos_p385564.html",
    "directAdd": false
  },
  {
    "id": "378331",
    "name": "Chinelos Havaianas Top Surfer",
    "price": "27,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1747841777_5acf84cfb5961083d084beb438dac12d.jpg",
    "url": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-top-surfer_p378331.html",
    "directAdd": false
  },
  {
    "id": "351649",
    "name": "Chinelos Havaianas Brasil Logo Verdes",
    "price": "29,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743520805_4873e5ac759fa3c27091dfb4e83a55e3.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-brasil-logo-verdes_p351649.html",
    "directAdd": false
  },
  {
    "id": "378512",
    "name": "Chinelos Havaianas Urban Basic Material Azuis",
    "price": "29,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741800909_98a68dee321e091067f4e4432f313a41.jpg",
    "url": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-urban-basic-material-azuis_p378512.html",
    "directAdd": false
  },
  {
    "id": "1442",
    "name": "Chinelos Havaianas Brasil Logo Pretos",
    "price": "30,00 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1713437737_27f829ead9078b6c982610e19c0c5f35.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-brasil-logo-pretos_p1442.html",
    "directAdd": false
  },
  {
    "id": "1471",
    "name": "Sand�lias Havaianas Luna Bronze",
    "price": "31,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1742579551_595b2527a430dbe67e20a0f93a6148b0.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/sandalias-havaianas-luna-bronze_p1471.html",
    "directAdd": false
  },
  {
    "id": "378316",
    "name": "Chinelos Havaianas Slim Point Laranja",
    "price": "33,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743097389_4ff8f094d266d55622b51cba22f79f02.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-point-laranja_p378316.html",
    "directAdd": false
  },
  {
    "id": "378422",
    "name": "Mala Pequena Havaianas Clutch Laranja",
    "price": "35,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741778305_3048ba494979ebdbca86e4294eb3a57c.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-clutch-laranja_p378422.html",
    "directAdd": true
  },
  {
    "id": "378405",
    "name": "Bolsa a Tiracolo Havaianas Casual Rosa",
    "price": "35,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741775746_079d5be88a4c87a8dafabe41fd024b6b.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/bolsa-a-tiracolo-havaianas-casual-rosa_p378405.html",
    "directAdd": false
  },
  {
    "id": "314093",
    "name": "Bolsa a Tiracolo Havaianas Diamong Bag",
    "price": "39,90 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1716194763_7a5031c7c8e1c387e54e40aaa5bd881e.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/bolsa-a-tiracolo-havaianas-diamong-bag_p314093.html",
    "directAdd": true
  },
  {
    "id": "383364",
    "name": "Chinelos Havaianas Slim Flatform Loop Premium Pretos",
    "price": "39,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1746011234_1471d994ad412fe03a94213cc4a4e72b.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-flatform-loop-premium-pretos_p383364.html",
    "directAdd": false
  },
  {
    "id": "378506",
    "name": "Chinelos Havaianas Slim Princess Kids Roxos",
    "price": "21,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1744646121_acef18fc9e3427d6aeab241e321ac71d.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-slim-princess-kids-roxos_p378506.html",
    "directAdd": false
  },
  {
    "id": "378336",
    "name": "Chinelos Havaianas Top Tropicalia Vibes Salm�o",
    "price": "25,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741692783_9c774479184613fa40a154f0da22c9be.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-top-tropicalia-vibes-salmao_p378336.html",
    "directAdd": false
  },
  {
    "id": "318587",
    "name": "Mala Pequena Havaianas Mini Bag Print",
    "price": "20,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1681217409_a20b9058ddf8fdead2d08dbd6aeacaba.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-mini-bag-print_p318587.html",
    "directAdd": true
  },
  {
    "id": "348304",
    "name": "Chinelos Havaianas Top Nautical",
    "price": "26,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1710417892_5c4edc56aff03001db99c1942020eb0a.jpg",
    "url": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-top-nautical_p348304.html",
    "directAdd": false
  },
  {
    "id": "212751",
    "name": "Chinelos Havaianas You Trancoso Premium",
    "price": "41,90 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1617207386_7bac95602de047235c305fb37b9b5037.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-you-trancoso-premium_p212751.html",
    "directAdd": false
  },
  {
    "id": "351522",
    "name": "Chinelos Havaianas Square Logo Metallic",
    "price": "33,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1713438924_e701eeba283e337ae2527ac3c11aa527.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-square-logo-metallic_p351522.html",
    "directAdd": false
  },
  {
    "id": "320998",
    "name": "Chinelos Havaianas You Milan",
    "price": "46,90 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1685549195_4e9e6cdfec10711305bcea39b028d36f.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-you-milan_p320998.html",
    "directAdd": false
  },
  {
    "id": "409134",
    "name": "Chinelos de Plataforma Havaianas Over Puffed Up Verdes Para Mulher",
    "price": "54,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779208887_f2da4f4c338b2474314fd3bdb2e22af4.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-de-plataforma-havaianas-over-puffed-up-verdes-para-mulher_p409134.html",
    "directAdd": false
  },
  {
    "id": "239935",
    "name": "Necessaire Havaianas Beach Glitter Preto",
    "price": "27,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1716202891_0ea7afeefda55a1925cf8bfe116f0d6e.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/necessaire-havaianas-beach-glitter-preto_p239935.html",
    "directAdd": true
  },
  {
    "id": "409312",
    "name": "Mala Pequena Havaianas Mini Bag Plus Glitter Rosa",
    "price": "21,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1780070598_b711a01ce0486f76b14b91b3479ad149.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-mini-bag-plus-glitter-rosa_p409312.html",
    "directAdd": true
  },
  {
    "id": "1420",
    "name": "Chinelos Havaianas Slim Bronze",
    "price": "29,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743181757_4ed3aed52d28f9692596909cb68ea2c5.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-bronze_p1420.html",
    "directAdd": false
  },
  {
    "id": "409281",
    "name": "Mala Pequena Havaianas Casual II Preta",
    "price": "37,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1780062254_15c9d593a65bb5b7a6a0a75d81da3f7c.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-casual-ii-preta_p409281.html",
    "directAdd": true
  },
  {
    "id": "409238",
    "name": "Chinelos Havaianas Brasil Twist Pretos",
    "price": "35,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779452550_6a17485d7d1b1ddf932f7206a411c3c1.jpg",
    "url": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-brasil-twist-pretos_p409238.html",
    "directAdd": false
  },
  {
    "id": "409016",
    "name": "Sand�lias Havaianas Baby Disney Classics II Rosa",
    "price": "20,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1778834969_da8d550608d05ad5a158b8f204321ae4.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/sandalias-havaianas-baby-disney-classics-ii-rosa_p409016.html",
    "directAdd": false
  },
  {
    "id": "351070",
    "name": "Bolsa a Tiracolo Havaianas Street Bag",
    "price": "21,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1713198313_b23a6b1c367d7102e8c1295e0b93af67.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/acessorios/bolsa-a-tiracolo-havaianas-street-bag_p351070.html",
    "directAdd": true
  },
  {
    "id": "378461",
    "name": "Chinelos Havaianas Top Surfer",
    "price": "27,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1747841411_ab9ca710db7382fa1058696c99cc1fd5.jpg",
    "url": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-top-surfer_p378461.html",
    "directAdd": false
  },
  {
    "id": "112885",
    "name": "Chinelos Havaianas Brasil Logo Azuis",
    "price": "30,00 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1713285419_0e33ae3742735f04be724c8ba8a76e11.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-brasil-logo-azuis_p112885.html",
    "directAdd": false
  },
  {
    "id": "378490",
    "name": "Bolsa a Tiracolo Havaianas Casual Bege",
    "price": "35,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741799632_498c11d663c31ccff8df69d2ab5cfa82.jpg",
    "url": "https://www.bzronline.com/pt/feminino/acessorios/bolsa-a-tiracolo-havaianas-casual-bege_p378490.html",
    "directAdd": false
  },
  {
    "id": "132767",
    "name": "Chinelos Havaianas Slim Brancos",
    "price": "29,99 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1713283634_c419f3a119843afd3efdb14861bc8b70.jpg",
    "url": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-brancos_p132767.html",
    "directAdd": false
  },
  {
    "id": "320443",
    "name": "Chinelos Havaianas Brasil Logo Amarelos",
    "price": "30,00 €",
    "image": "https://1565619539.rsc.cdn77.org/temp/1749122674_9334d8fe4f23576ecfa2eb86aa2bcefc.jpg",
    "url": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-brasil-logo-amarelos_p320443.html",
    "directAdd": false
  }
];
  
  // Reescrever links dos produtos em tempo de execução para corresponder ao idioma atual
  const campaignProducts = rawProducts.map(p => {
    let rewrittenUrl = p.url;
    if (lang !== 'pt') {
      rewrittenUrl = rewrittenUrl.replace(/\/pt\//i, '/' + lang + '/');
    }
    return {
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.image,
      url: rewrittenUrl,
      directAdd: p.directAdd
    };
  });

  // CSS DO CARD (Checkout e Mini-Cart)
  if ($('#mm-promo-card-style').length === 0) {
    $('head').append(`
      <style id="mm-promo-card-style">
        /* --- ESTILOS DO CARD DO CHECKOUT --- */
        #mm-promo-card {
          width: 100%; border: 1px solid #e6e6e6; border-radius: 8px; background: #fff;
          padding: 24px; margin: 0 0 25px 0; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
          font-family: 'Roboto', 'RobotoCondensed', sans-serif; text-align: left; box-sizing: border-box;
        }
        #mm-promo-card .mm-promo-header { display: flex; align-items: center; gap: 20px; }
        #mm-promo-card .mm-promo-header.has-products { margin-bottom: 24px; }
        #mm-promo-card .mm-promo-icon-wrap {
          width: 80px; height: 80px; border: 1px solid #e6e6e6; border-radius: 6px;
          overflow: hidden; display: flex; align-items: center; justify-content: center;
          background: #fff; flex-shrink: 0;
        }
        #mm-promo-card .mm-promo-icon-wrap img { width: 100%; height: 100%; object-fit: cover; }
        #mm-promo-card .mm-promo-info { flex-grow: 1; }
        #mm-promo-card .mm-promo-title { font-size: 16px; font-weight: 800; text-transform: uppercase; color: #111; line-height: 1.25; letter-spacing: 0.2px; }
        #mm-promo-card .mm-promo-subtitle { font-size: 13px; color: #666; margin-top: 4px; line-height: 1.3; }
        #mm-promo-card .mm-progress-container { width: 100%; height: 6px; background: #f0f0f0; border-radius: 3px; margin-top: 12px; overflow: hidden; }
        #mm-promo-card .mm-progress-bar { height: 100%; background: linear-gradient(90deg, #4ebf4e, #66bb6a); border-radius: 3px; transition: width 0.6s ease-in-out; }
        
        #mm-promo-card .mm-products-grid { display: flex; gap: 16px; width: 100%; }
        #mm-promo-card .mm-product-card {
          flex: 1; display: flex; align-items: center; justify-content: space-between;
          border: 1px solid #e6e6e6; border-radius: 6px; padding: 12px; background: #fff;
          text-decoration: none; color: #111; box-sizing: border-box; min-width: 0;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        #mm-promo-card .mm-product-card:hover { border-color: #bbb; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        #mm-promo-card .mm-product-left { width: 54px; height: 54px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        #mm-promo-card .mm-product-left img { max-width: 100%; max-height: 100%; object-fit: contain; }
        #mm-promo-card .mm-product-mid { flex-grow: 1; padding: 0 12px; min-width: 0; }
        #mm-promo-card .mm-product-brand { font-size: 9px; text-transform: uppercase; color: #888; font-weight: 700; letter-spacing: 0.4px; margin-bottom: 2px; }
        #mm-promo-card .mm-product-name {
          font-size: 11px; font-weight: 500; color: #111; line-height: 1.3;
          height: 28px; overflow: hidden; text-overflow: ellipsis;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; margin-bottom: 2px;
        }
        #mm-promo-card .mm-product-price { font-size: 12px; font-weight: 700; color: #111; }
        #mm-promo-card .mm-product-right { flex-shrink: 0; }
        #mm-promo-card .mm-product-add-btn {
          background: #fff; border: 1px solid #cccccc; border-radius: 4px; padding: 8px 12px;
          font-size: 10px; font-weight: 700; text-transform: uppercase; color: #111;
          cursor: pointer; transition: all 0.2s; letter-spacing: 0.2px;
        }
        #mm-promo-card .mm-product-add-btn:hover { background: #111; color: #fff; border-color: #111; }
        #mm-promo-card .mm-dots { display: none; }
        
        @media(max-width: 768px){
          #mm-promo-card { margin: 10px auto; width: calc(100% - 20px); padding: 16px; }
          #mm-promo-card .mm-promo-header { gap: 12px; }
          #mm-promo-card .mm-promo-header.has-products { margin-bottom: 16px; }
          #mm-promo-card .mm-promo-icon-wrap { width: 64px; height: 64px; }
          #mm-promo-card .mm-promo-title { font-size: 14px; }
          #mm-promo-card .mm-promo-subtitle { font-size: 11px; }
          
          #mm-promo-card .mm-products-grid { display: flex; overflow: hidden; position: relative; width: 100%; gap: 0; }
          #mm-promo-card .mm-product-card { display: none; width: 100%; flex-shrink: 0; padding: 10px; border: 1px solid #e6e6e6; }
          #mm-promo-card .mm-product-card.active { display: flex; }
          #mm-promo-card .mm-dots { display: flex; justify-content: center; align-items: center; gap: 4px; margin-top: 14px; }
          #mm-promo-card .mm-dot { width: 16px; height: 16px; background: transparent; cursor: pointer; display: inline-block; padding: 4px; box-sizing: border-box; }
          #mm-promo-card .mm-dot::after { content: ''; display: block; width: 8px; height: 8px; border-radius: 50%; background: #e0e0e0; transition: background 0.2s; }
          #mm-promo-card .mm-dot.active::after { background: #111; }
        }

        /* --- ESTILOS DO CARD DO MINI-CART --- */
        #mm-minicart-promo-card {
          width: 100%; border: 1px solid #e6e6e6; border-radius: 8px; background: #fff;
          padding: 16px; margin: 15px 0 20px 0; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.01);
          font-family: 'Roboto', 'RobotoCondensed', sans-serif; text-align: left; box-sizing: border-box;
        }
        #mm-minicart-promo-card .mm-promo-header { display: flex; align-items: center; gap: 14px; }
        #mm-minicart-promo-card .mm-promo-header.has-products { margin-bottom: 16px; }
        #mm-minicart-promo-card .mm-promo-icon-wrap {
          width: 60px; height: 60px; border: 1px solid #e6e6e6; border-radius: 6px;
          overflow: hidden; display: flex; align-items: center; justify-content: center;
          background: #fff; flex-shrink: 0;
        }
        #mm-minicart-promo-card .mm-promo-icon-wrap img { width: 100%; height: 100%; object-fit: cover; }
        #mm-minicart-promo-card .mm-promo-info { flex-grow: 1; min-width: 0; }
        #mm-minicart-promo-card .mm-promo-title { font-size: 13px; font-weight: 800; text-transform: uppercase; color: #111; line-height: 1.2; letter-spacing: 0.1px; }
        #mm-minicart-promo-card .mm-promo-subtitle { font-size: 11px; color: #666; margin-top: 3px; line-height: 1.25; }
        #mm-minicart-promo-card .mm-progress-container { width: 100%; height: 6px; background: #f0f0f0; border-radius: 3px; margin-top: 8px; overflow: hidden; }
        #mm-minicart-promo-card .mm-progress-bar { height: 100%; background: linear-gradient(90deg, #4ebf4e, #66bb6a); border-radius: 3px; transition: width 0.6s ease-in-out; }
        
        #mm-minicart-promo-card .mm-products-grid { display: flex; overflow: hidden; position: relative; width: 100%; gap: 0; }
        #mm-minicart-promo-card .mm-product-card {
          display: none; width: 100%; flex-shrink: 0; align-items: center; justify-content: space-between;
          border: 1px solid #e6e6e6; border-radius: 6px; padding: 10px; background: #fff; box-sizing: border-box;
          text-decoration: none; color: #111;
        }
        #mm-minicart-promo-card .mm-product-card.active { display: flex; }
        #mm-minicart-promo-card .mm-product-left { width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        #mm-minicart-promo-card .mm-product-left img { max-width: 100%; max-height: 100%; object-fit: contain; }
        #mm-minicart-promo-card .mm-product-mid { flex-grow: 1; padding: 0 10px; min-width: 0; }
        #mm-minicart-promo-card .mm-product-brand { font-size: 9px; text-transform: uppercase; color: #888; font-weight: 700; margin-bottom: 2px; }
        #mm-minicart-promo-card .mm-product-name {
          font-size: 10px; font-weight: 500; color: #111; line-height: 1.25;
          height: 25px; overflow: hidden; text-overflow: ellipsis;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
        }
        #mm-minicart-promo-card .mm-product-price { font-size: 11px; font-weight: 700; color: #111; margin-top: 2px; }
        #mm-minicart-promo-card .mm-product-right { flex-shrink: 0; }
        #mm-minicart-promo-card .mm-product-add-btn {
          background: #fff; border: 1px solid #cccccc; border-radius: 4px; padding: 6px 10px;
          font-size: 9px; font-weight: 700; text-transform: uppercase; color: #111; cursor: pointer; transition: all 0.2s;
        }
        #mm-minicart-promo-card .mm-product-add-btn:hover { background: #111; color: #fff; border-color: #111; }
        
        #mm-minicart-promo-card .mm-dots { display: flex; justify-content: center; align-items: center; gap: 4px; margin-top: 10px; }
        #mm-minicart-promo-card .mm-dot {
          width: 16px; height: 16px; background: transparent; cursor: pointer; display: inline-block; padding: 4px; box-sizing: border-box;
        }
        #mm-minicart-promo-card .mm-dot::after {
          content: ''; display: block; width: 6px; height: 6px; border-radius: 50%; background: #e0e0e0; transition: background 0.2s;
        }
        #mm-minicart-promo-card .mm-dot.active::after { background: #111; }
      </style>
    `);
  }

  // Obter IDs dos produtos no carrinho
  function getCartProductIds() {
    const ids = [];
    if (window.dataLayer) {
      for (let i = 0; i < window.dataLayer.length; i++) {
        const entry = window.dataLayer[i];
        if (entry && entry.ecommerce) {
          const products = entry.ecommerce.products || entry.ecommerce.items || 
                           (entry.ecommerce.checkout && entry.ecommerce.checkout.products);
          if (Array.isArray(products)) {
            products.forEach(p => {
              let id = p.id || p.item_id || '';
              if (id) {
                id = id.split('|')[0].split('-')[0];
                ids.push(id.trim());
              }
            });
          }
        }
      }
    }
    
    $('#rdc-mini-cart .rdc-mini-cart-product').each(function() {
      const href = $(this).find('a').attr('href') || '';
      const match = href.match(/item_(\d+)\.html/) || href.match(/_p(\d+)\.html/);
      if (match) {
        ids.push(match[1]);
      }
    });

    $('.rdc-shop-prd').each(function() {
      const href = $(this).find('a').attr('href') || '';
      const match = href.match(/item_(\d+)\.html/) || href.match(/_p(\d+)\.html/);
      if (match) {
        ids.push(match[1]);
      }
    });

    return ids;
  }

  // Obter número total de Havaianas no carrinho
  function getHavaianasCount() {
    let count = 0;
    if (window.dataLayer) {
      let dlCount = 0;
      for (let i = 0; i < window.dataLayer.length; i++) {
        const entry = window.dataLayer[i];
        if (entry && entry.ecommerce) {
          const products = entry.ecommerce.products || entry.ecommerce.items || 
                           (entry.ecommerce.checkout && entry.ecommerce.checkout.products);
          if (Array.isArray(products)) {
            products.forEach(p => {
              const brand = p.brand || p.item_brand || '';
              const name = p.name || p.item_name || '';
              if (brand.toLowerCase() === 'havaianas' || name.toLowerCase().includes('havaianas')) {
                dlCount += parseInt(p.quantity || 1, 10);
              }
            });
          }
        }
      }
      if (dlCount > 0) return dlCount;
    }

    if ($('#rdc-mini-cart:visible').length > 0) {
      $('#rdc-mini-cart .rdc-mini-cart-product').each(function () {
        const title = $(this).find('.rdc-mini-cart-product-name_title').text();
        const brand = $(this).find('.rdc-mini-cart-product-brand').text();
        if (brand.toLowerCase().includes('havaianas') || title.toLowerCase().includes('havaianas')) {
          const qtdText = $(this).find('.rdc-mini-cart-product-name_qtd').text() || '1';
          const qty = parseInt(qtdText.replace('x', '').trim(), 10) || 1;
          count += qty;
        }
      });
      return count;
    }

    const $desktopRows = $('.rdc-shop-prd.hidden-xs');
    if ($desktopRows.length > 0) {
      $desktopRows.each(function () {
        const title = $(this).find('.rdc-shop-prd-title').text();
        if (title.toLowerCase().includes('havaianas')) {
          const qty = parseInt($(this).find('input.qtd').val(), 10) || 1;
          count += qty;
        }
      });
    } else {
      $('.rdc-shop-prd.hidden-sm.hidden-md.hidden-lg').each(function () {
        const title = $(this).find('.rdc-shop-prd-title').text();
        if (title.toLowerCase().includes('havaianas')) {
          const qty = parseInt($(this).find('.qnt-select').val(), 10) || 1;
          count += qty;
        }
      });
    }
    return count;
  }

  // RENDER CARD NO CHECKOUT
  function renderCheckoutCard(products) {
    $('#mm-promo-card').remove();
    const count = getHavaianasCount();
    let percentage = count === 0 ? 0 : (count === 1 ? 50 : 100);
    let isUnlocked = count >= 2;
    let subtitleText = count === 0 
      ? t.subtitle0
      : (count === 1 ? t.subtitle1 : t.subtitleUnlocked);

    let cardHtml = `
      <div id="mm-promo-card">
        <div class="mm-promo-header ${isUnlocked ? '' : 'has-products'}">
          <div class="mm-promo-icon-wrap"><img src="${bagImage}" alt="Bolsa Havaianas"></div>
          <div class="mm-promo-info">
            <div class="mm-promo-title">${isUnlocked ? t.unlockedTitle : t.title}</div>
            <div class="mm-promo-subtitle">${subtitleText}</div>
            <div class="mm-progress-container"><div class="mm-progress-bar" style="width: ${percentage}%;"></div></div>
          </div>
        </div>
    `;

    if (!isUnlocked) {
      cardHtml += `<div class="mm-products-grid">`;
      products.forEach((p, idx) => {
        const active = idx === 0 ? 'active' : '';
        cardHtml += `
          <div class="mm-product-card ${active}" data-index="${idx}">
            <div class="mm-product-left"><img src="${p.image}" alt="${p.name}"></div>
            <div class="mm-product-mid">
              <div class="mm-product-brand">Havaianas</div>
              <div class="mm-product-name" title="${p.name}">${p.name}</div>
              <div class="mm-product-price">${p.price}</div>
            </div>
            <div class="mm-product-right">
              <button class="mm-product-add-btn" data-id="${p.id}" data-url="${p.url}" data-direct="${p.directAdd}">${t.addBtn}</button>
            </div>
          </div>
        `;
      });
      cardHtml += `</div><div class="mm-dots"><div class="mm-dot active" data-index="0"></div><div class="mm-dot" data-index="1"></div><div class="mm-dot" data-index="2"></div></div>`;
    }
    cardHtml += `</div>`;

    const $list = $('.wrapper-shoppingbag-product-list');
    if ($list.length === 0) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      $list.after(cardHtml);
    } else {
      $list.prepend(cardHtml);
    }
  }

  // RENDER CARD NO MINI-CART
  let isInjectingMiniCart = false;
  function injectMiniCartPromo(products) {
    if (isInjectingMiniCart) return;

    const $productsList = $('#rdc-mini-cart .rdc-mini-cart-products');
    if ($productsList.length === 0) return;

    const count = getHavaianasCount();
    let percentage = count === 0 ? 0 : (count === 1 ? 50 : 100);
    let isUnlocked = count >= 2;
    let subtitleText = count === 0 
      ? t.subtitle0
      : (count === 1 ? t.subtitle1 : t.subtitleUnlocked);

    const $existing = $('#mm-minicart-promo-card');
    if ($existing.length > 0) {
      const $bar = $existing.find('.mm-progress-bar');
      if ($bar.length > 0) {
        const newWidth = percentage + '%';
        if ($bar.css('width') !== newWidth) {
          $bar.css('width', newWidth);
          $existing.find('.mm-promo-subtitle').html(subtitleText);
          $existing.find('.mm-promo-title').text(isUnlocked ? t.unlockedTitle : t.title);
          if (isUnlocked) {
            $existing.find('.mm-products-grid, .mm-dots').hide();
            $existing.find('.mm-promo-header').removeClass('has-products');
          } else {
            $existing.find('.mm-products-grid, .mm-dots').show();
            $existing.find('.mm-promo-header').addClass('has-products');
          }
        }
      }
      return;
    }

    isInjectingMiniCart = true;
    miniCartObserver.disconnect();

    let cardHtml = `
      <div id="mm-minicart-promo-card">
        <div class="mm-promo-header ${isUnlocked ? '' : 'has-products'}">
          <div class="mm-promo-icon-wrap"><img src="${bagImage}" alt="Bolsa Havaianas"></div>
          <div class="mm-promo-info">
            <div class="mm-promo-title">${isUnlocked ? t.unlockedTitle : t.title}</div>
            <div class="mm-promo-subtitle">${subtitleText}</div>
            <div class="mm-progress-container"><div class="mm-progress-bar" style="width: ${percentage}%;"></div></div>
          </div>
        </div>
    `;

    if (!isUnlocked && products.length > 0) {
      cardHtml += `<div class="mm-products-grid">`;
      products.forEach((p, idx) => {
        const active = idx === 0 ? 'active' : '';
        cardHtml += `
          <div class="mm-product-card ${active}" data-index="${idx}">
            <div class="mm-product-left"><img src="${p.image}" alt="${p.name}"></div>
            <div class="mm-product-mid">
              <div class="mm-product-brand">Havaianas</div>
              <div class="mm-product-name" title="${p.name}">${p.name}</div>
              <div class="mm-product-price">${p.price}</div>
            </div>
            <div class="mm-product-right">
              <button class="mm-product-add-btn" data-id="${p.id}" data-url="${p.url}" data-direct="${p.directAdd}">${t.addBtn}</button>
            </div>
          </div>
        `;
      });
      cardHtml += `</div><div class="mm-dots"><div class="mm-dot active" data-index="0"></div><div class="mm-dot" data-index="1"></div><div class="mm-dot" data-index="2"></div></div>`;
    }
    cardHtml += `</div>`;

    $productsList.after(cardHtml);

    const miniCartEl = document.getElementById('rdc-mini-cart');
    if (miniCartEl) {
      miniCartObserver.observe(miniCartEl, { childList: true, subtree: true });
    }
    isInjectingMiniCart = false;
  }

  // MutationObserver
  let shuffledProducts = [];
  const miniCartObserver = new MutationObserver(function () {
    if ($('#rdc-mini-cart:visible').length > 0) {
      injectMiniCartPromo(shuffledProducts);
    }
  });

  function initPromo() {
    if (sessionStorage.getItem('mm_reopen_cart') === 'true') {
      sessionStorage.removeItem('mm_reopen_cart');
      let tries = 0;
      const interval = setInterval(function () {
        tries++;
        const $btn = $('[href="#rdc-mini-cart"]');
        if ($btn.length > 0 || tries >= 50) {
          clearInterval(interval);
          $btn.trigger('click');
        }
      }, 100);
    }

    const cartProductIds = getCartProductIds();
    
    // FILTRAR PRODUTOS QUE JÁ ESTÃO NO CARRINHO
    let availableProducts = campaignProducts.filter(p => !cartProductIds.includes(p.id) && p.name && p.image);
    if (availableProducts.length === 0) {
      availableProducts = campaignProducts;
    }

    // Baralhar e selecionar 3
    shuffledProducts = availableProducts.sort(() => 0.5 - Math.random()).slice(0, 3);

    // Se for a página de Checkout, renderiza no cesto
    if (window.location.href.includes('checkout')) {
      renderCheckoutCard(shuffledProducts);
    }

    // Se o mini-cart existir no DOM, iniciar MutationObserver
    const miniCartEl = document.getElementById('rdc-mini-cart');
    if (miniCartEl) {
      miniCartObserver.observe(miniCartEl, { childList: true, subtree: true });
      if ($('#rdc-mini-cart:visible').length > 0) {
        injectMiniCartPromo(shuffledProducts);
      }
    }
  }

  (function retryInit() {
    let tries = 0; const maxTries = 50;
    const interval = setInterval(function () {
      tries++;
      const hasList = $('.wrapper-shoppingbag-product-list').length > 0 || $('#rdc-mini-cart').length > 0;
      if (hasList || tries >= maxTries) {
        clearInterval(interval);
        initPromo();
      }
    }, 100);
  })();

  // Controlos do carrossel (Dots)
  $(document).on('click', '.mm-dot', function (e) {
    e.preventDefault();
    e.stopPropagation();
    const idx = $(this).attr('data-index');
    const $card = $(this).closest('#mm-promo-card, #mm-minicart-promo-card');
    $card.find('.mm-product-card').removeClass('active');
    $card.find('.mm-product-card[data-index="' + idx + '"]').addClass('active');
    $card.find('.mm-dot').removeClass('active');
    $(this).addClass('active');
  });

  // Ação de clique em adicionar
  $(document).on('click', '.mm-product-add-btn', function (e) {
    e.preventDefault();
    const isDirect = $(this).attr('data-direct') === 'true';
    const productId = $(this).attr('data-id');
    const productUrl = $(this).attr('data-url');

    if (isDirect && productId) {
      const url = `https://www.bzronline.com/api/api.php/addToBasket/816/0/${productId}/1/1`;
      
      if (!window.location.href.includes('checkout')) {
        sessionStorage.setItem('mm_reopen_cart', 'true');
      }

      $.ajax({
        url: url, type: 'GET',
        success: function () { location.reload(); },
        error: function () { alert("Sem stock!"); }
      });
    } else if (productUrl) {
      window.location.href = productUrl;
    }
  });
})();
