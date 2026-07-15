(function () {
  // Proteção contra múltiplas execuções do script
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

  // Dicionário de Traduções com Unicode escapes para evitar problemas de UTF-8 / ISO
  const translations = {
    pt: {
      title: "RECEBE UMA BOLSA HAVAIANAS GR\u00c1TIS",
      unlockedTitle: "OFERTA DESBLOQUEADA!",
      subtitle0: "Adiciona <strong>2 artigos Havaianas</strong> ao carrinho para desbloqueares esta oferta.",
      subtitle1: "Adiciona mais <strong>1 artigo Havaianas</strong> ao carrinho para desbloqueares esta oferta.",
      subtitleUnlocked: "Oferta desbloqueada! Tens direito \u00e0 tua Bolsa Havaianas Gr\u00e1tis.",
      addBtn: "ADICIONAR"
    },
    es: {
      title: "LL\u00c9VATE UNA BOLSA HAVAIANAS GRATIS",
      unlockedTitle: "\u00a1OFERTA DESBLOQUEADA!",
      subtitle0: "A\u00f1ade <strong>2 art\u00edculos de Havaianas</strong> al carrito para desbloquear esta oferta.",
      subtitle1: "A\u00f1ade <strong>1 art\u00edculo m\u00e1s de Havaianas</strong> al carrito para desbloquear esta oferta.",
      subtitleUnlocked: "\u00a1Oferta desbloqueada! Tienes direito a tu Bolsa Havaianas Gratis.",
      addBtn: "A\u00d1ADIR"
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

  // Imagem da Bolsa da Campanha
  const bagImage = "https://1565619539.rsc.cdn77.org/images/block1_14362.jpg";

  // Catálogo completo de 174 produtos Havaianas com nomes e urls nos 3 idiomas
  const rawProducts = [
  {
    "id": "1407",
    "price": "21,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779375980_3c947aea7cd109afc1f62047f677d348.jpg",
    "names": {
      "pt": "Chinelos Havaianas Top Pretos",
      "es": "Chanclas Havaianas Top Negras",
      "en": "Havaianas Top Black Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-top-pretos_p1407.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-top-negras_p1407.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-top-black-flip-flops_p1407.html"
    },
    "directAdd": false
  },
  {
    "id": "1409",
    "price": "30,00 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1749140555_d1a182923c521c2fdef5273bd4512b95.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim Rosa",
      "es": "Chanclas Havaianas Slim Rosa",
      "en": "Havaianas Slim Pink Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-rosa_p1409.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-slim-rosa_p1409.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-slim-pink-flip-flops_p1409.html"
    },
    "directAdd": false
  },
  {
    "id": "1411",
    "price": "29,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743180885_84130daa626715e88053c9ef63cb8a94.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim Pretos",
      "es": "Chanclas Havaianas Slim Negras",
      "en": "Havaianas Slim Black Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-pretos_p1411.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-slim-negras_p1411.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-slim-black-flip-flops_p1411.html"
    },
    "directAdd": false
  },
  {
    "id": "1413",
    "price": "27,00 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1551380305_f51dddee47ca8bd8979e2223d5030b65.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim",
      "es": "Chanclas Havaianas Slim",
      "en": "Havaianas Slim Flip-Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim_p1413.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-slim_p1413.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-slim-flip-flops_p1413.html"
    },
    "directAdd": false
  },
  {
    "id": "1418",
    "price": "29,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1713774198_6abb0379f32b9062f804a921e9f3d7c2.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim Bege",
      "es": "Chanclas Havaianas Slim Beige",
      "en": "Havaianas Slim Beige Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-bege_p1418.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-slim-beige_p1418.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-slim-beige-flip-flops_p1418.html"
    },
    "directAdd": false
  },
  {
    "id": "1420",
    "price": "29,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743181757_4ed3aed52d28f9692596909cb68ea2c5.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim Bronze",
      "es": "Chanclas Havaianas Slim Bronce",
      "en": "Havaianas Slim Bronze Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-bronze_p1420.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-slim-bronce_p1420.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-slim-bronze-flip-flops_p1420.html"
    },
    "directAdd": false
  },
  {
    "id": "1421",
    "price": "27,00 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1551380305_6bd0effac42de2b9d0963107237366e7.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim",
      "es": "Chanclas Havaianas Slim",
      "en": "Havaianas Slim Flip-Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim_p1421.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-slim_p1421.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-slim-flip-flops_p1421.html"
    },
    "directAdd": false
  },
  {
    "id": "1438",
    "price": "30,00 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1742807573_c2fde81747bb04e7ea87f560edd291fa.jpg",
    "names": {
      "pt": "Chinelos Havaianas Brasil Logo Azuis",
      "es": "Chanclas Havaianas Brasil Logo Azules",
      "en": "Havaianas Brasil Logo Blue Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-brasil-logo-azuis_p1438.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-brasil-logo-azules_p1438.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-brasil-logo-blue-flip-flops_p1438.html"
    },
    "directAdd": false
  },
  {
    "id": "1442",
    "price": "30,00 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1713437737_27f829ead9078b6c982610e19c0c5f35.jpg",
    "names": {
      "pt": "Chinelos Havaianas Brasil Logo Pretos",
      "es": "Chanclas Havaianas Brasil Logo Negras",
      "en": "Havaianas Brasil Logo Black Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-brasil-logo-pretos_p1442.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-brasil-logo-negras_p1442.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-brasil-logo-black-flip-flops_p1442.html"
    },
    "directAdd": false
  },
  {
    "id": "1444",
    "price": "22,90 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743521960_5481d2419841db47a78dea1ba7aa9168.jpg",
    "names": {
      "pt": "Chinelos Havaianas Brasil Logo Vermelhos",
      "es": "Chanclas Havaianas Brasil Logo Rojas",
      "en": "Havaianas Brasil Logo Red Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-brasil-logo-vermelhos_p1444.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-brasil-logo-rojas_p1444.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-brasil-logo-red-flip-flops_p1444.html"
    },
    "directAdd": false
  },
  {
    "id": "1460",
    "price": "22,90 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1551380312_3ba6f1899e34aea01eadeb6d52ba6602.jpg",
    "names": {
      "pt": "Chinelos Havaianas Brasil Mix",
      "es": "Chanclas Havaianas Brasil Mix",
      "en": "Havaianas Brasil Mix Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-brasil-mix_p1460.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-brasil-mix_p1460.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-brasil-mix-flip-flops_p1460.html"
    },
    "directAdd": false
  },
  {
    "id": "1471",
    "price": "31,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1742579551_595b2527a430dbe67e20a0f93a6148b0.jpg",
    "names": {
      "pt": "Sand\u00e1lias Havaianas Luna Bronze",
      "es": "Sandalias Havaianas Luna Bronce",
      "en": "Havaianas Luna Bronze Sandals"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/sandalias-havaianas-luna-bronze_p1471.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/sandalias-havaianas-luna-bronce_p1471.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-luna-bronze-sandals_p1471.html"
    },
    "directAdd": false
  },
  {
    "id": "23744",
    "price": "21,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743183854_3a84fc854731a1ea84640ce787a7d0f5.jpg",
    "names": {
      "pt": "Chinelos Havaianas Top Brancos",
      "es": "Chanclas Havaianas Top Blancas",
      "en": "Havaianas Top White Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-top-brancos_p23744.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-top-blancas_p23744.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-top-white-flip-flops_p23744.html"
    },
    "directAdd": false
  },
  {
    "id": "23759",
    "price": "21,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1713437997_2481bf8823a0575f83f6f2b839d0e5b3.jpg",
    "names": {
      "pt": "Chinelos Havaianas Top Azuis",
      "es": "Chanclas Havaianas Top Azules",
      "en": "Havaianas Top Blue Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-top-azuis_p23759.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-top-azules_p23759.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-top-blue-flip-flops_p23759.html"
    },
    "directAdd": false
  },
  {
    "id": "23847",
    "price": "25,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743431084_47d2bd355728ac19c574bf7ce821c206.jpg",
    "names": {
      "pt": "Sand\u00e1lias Havaianas Flash Urban Bronze",
      "es": "Sandalias Havaianas Flash Urban Bronce",
      "en": "Havaianas Flash Urban Bronze Sandals"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/sandalias-havaianas-flash-urban-bronze_p23847.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/sandalias-havaianas-flash-urban-bronce_p23847.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-flash-urban-bronze-sandals_p23847.html"
    },
    "directAdd": false
  },
  {
    "id": "24993",
    "price": "21,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779375698_e378e6b476ae70ad538d263974230c31.jpg",
    "names": {
      "pt": "Chinelos Havaianas Top Tiras Bronze",
      "es": "Chanclas Havaianas Top Tiras Bronce",
      "en": "Havaianas Top Tiras Bronze Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-top-tiras-bronze_p24993.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-top-tiras-bronce_p24993.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-top-tiras-bronze-flip-flops_p24993.html"
    },
    "directAdd": false
  },
  {
    "id": "112885",
    "price": "30,00 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1713285419_0e33ae3742735f04be724c8ba8a76e11.jpg",
    "names": {
      "pt": "Chinelos Havaianas Brasil Logo Azuis",
      "es": "Chanclas Havaianas Brasil Logo Azules",
      "en": "Havaianas Brasil Logo Blue Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-brasil-logo-azuis_p112885.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-brasil-logo-azules_p112885.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-brasil-logo-blue-flip-flops_p112885.html"
    },
    "directAdd": false
  },
  {
    "id": "112890",
    "price": "25,00 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1553790166_3feea41b6c896c397f3ceee415f87907.jpg",
    "names": {
      "pt": "Chinelos Havaianas Brasil Logo Verdes",
      "es": "Chanclas Havaianas Brasil Logo Verdes",
      "en": "Havaianas Brasil Logo Green Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-brasil-logo-verdes_p112890.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-brasil-logo-verdes_p112890.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-brasil-logo-green-flip-flops_p112890.html"
    },
    "directAdd": false
  },
  {
    "id": "112921",
    "price": "31,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1680093023_140f8663c0515362bd7ce095e72afd1a.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim Logo Metallic Pretos",
      "es": "Chanclas Havaianas Slim Logo Metallic Negras",
      "en": "Havaianas Slim Logo Metallic Black Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-logo-metallic-pretos_p112921.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-slim-logo-metallic-negras_p112921.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-slim-logo-metallic-black-flip-flops_p112921.html"
    },
    "directAdd": false
  },
  {
    "id": "113076",
    "price": "23,90 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1553792122_91f83d3020ddeaca035e661af24a87c1.jpg",
    "names": {
      "pt": "Chinelos Havaianas Brasil Layers",
      "es": "Chanclas Havaianas Brasil Layers",
      "en": "Havaianas Brasil Layers Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-brasil-layers_p113076.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-brasil-layers_p113076.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-brasil-layers-flip-flops_p113076.html"
    },
    "directAdd": false
  },
  {
    "id": "132767",
    "price": "29,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1713283634_c419f3a119843afd3efdb14861bc8b70.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim Brancos",
      "es": "Chanclas Havaianas Slim Blancas",
      "en": "Havaianas Slim White Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-brancos_p132767.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-slim-blancas_p132767.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-slim-white-flip-flops_p132767.html"
    },
    "directAdd": false
  },
  {
    "id": "180974",
    "price": "25,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1588869879_98539937d0ce08c0e8cab548de1ab017.jpg",
    "names": {
      "pt": "Sand\u00e1lias Havaianas Flash Urban Pretas",
      "es": "Sandalias Havaianas Flash Urban Negras",
      "en": "Havaianas Flash Urban Black Sandals"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/sandalias-havaianas-flash-urban-pretas_p180974.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/sandalias-havaianas-flash-urban-negras_p180974.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-flash-urban-black-sandals_p180974.html"
    },
    "directAdd": false
  },
  {
    "id": "181010",
    "price": "19,90 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1588676511_0add5773cab2fcd9abab714737cb26a4.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim Animals",
      "es": "Chanclas Havaianas Slim Animals",
      "en": "Havaianas Slim Animals Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-slim-animals_p181010.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-slim-animals_p181010.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-slim-animals-flip-flops_p181010.html"
    },
    "directAdd": false
  },
  {
    "id": "181015",
    "price": "29,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1742579043_a366174eff985e1c28cec116fdd905df.jpg",
    "names": {
      "pt": "Chinelos Havaianas Brasil Logo Brancos",
      "es": "Chanclas Havaianas Brasil Logo Blancas",
      "en": "Havaianas Brasil Logo White Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-brasil-logo-brancos_p181015.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-brasil-logo-blancas_p181015.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-brasil-logo-white-flip-flops_p181015.html"
    },
    "directAdd": false
  },
  {
    "id": "181031",
    "price": "17,90 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743522050_5113c6709232c7955ec961c611cfc988.jpg",
    "names": {
      "pt": "Chinelos Havaianas Brasil Logo Kids",
      "es": "Chanclas Havaianas Brasil Logo Kids",
      "en": "Havaianas Brasil Logo Kids Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-brasil-logo-kids_p181031.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-brasil-logo-kids_p181031.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-brasil-logo-kids-flip-flops_p181031.html"
    },
    "directAdd": false
  },
  {
    "id": "181089",
    "price": "30,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1588851398_a9013c07b8b7ee353164bb3a2cf3e526.jpg",
    "names": {
      "pt": "Sand\u00e1lias Havaianas Luna Pretas",
      "es": "Sandalias Havaianas Luna Negras",
      "en": "Havaianas Luna Black Sandals"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/sandalias-havaianas-luna-pretas_p181089.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/sandalias-havaianas-luna-negras_p181089.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-luna-black-sandals_p181089.html"
    },
    "directAdd": false
  },
  {
    "id": "181278",
    "price": "27,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741783650_8cc0da6f24eb56eede09cc6ab6fba143.jpg",
    "names": {
      "pt": "Necessaire Havaianas Beach Metallic Dourado",
      "es": "Necessaire Havaianas Beach Metallic Dorado",
      "en": "Havaianas Beach Metallic Golden Necessaire"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/necessaire-havaianas-beach-metallic-dourado_p181278.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/necessaire-havaianas-beach-metallic-dorado_p181278.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-beach-metallic-golden-necessaire_p181278.html"
    },
    "directAdd": true
  },
  {
    "id": "181427",
    "price": "33,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743182452_e911a53527c2f67ab517607591d2588b.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim Flatform Pretos",
      "es": "Chanclas Havaianas Slim Flatform Negras",
      "en": "Havaianas Slim Flatform Black Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-flatform-pretos_p181427.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-slim-flatform-negras_p181427.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-slim-flatform-black-flip-flops_p181427.html"
    },
    "directAdd": false
  },
  {
    "id": "181496",
    "price": "28,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1680689468_fbc2ee57bb95c040ed5a8efced5b1371.jpg",
    "names": {
      "pt": "Sand\u00e1lias Havaianas Twist",
      "es": "Sandalias Havaianas Twist",
      "en": "Havaianas Twist Sandals"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/sandalias-havaianas-twist_p181496.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/sandalias-havaianas-twist_p181496.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-twist-sandals_p181496.html"
    },
    "directAdd": false
  },
  {
    "id": "181532",
    "price": "18,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741785396_a7afccd73b39532fc3a1ecec4b4ab98a.jpg",
    "names": {
      "pt": "Mala Pequena Havaianas Mini Bag Plus Cool Metallic Dourada",
      "es": "Bolso Havaianas Mini Bag Plus Cool Metallic Dorado",
      "en": "Havaianas Mini Bag Plus Cool Metallic Golden Purse"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-mini-bag-plus-cool-metallic-dourada_p181532.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bolso-havaianas-mini-bag-plus-cool-metallic-dorado_p181532.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-mini-bag-plus-cool-metallic-golden-purse_p181532.html"
    },
    "directAdd": true
  },
  {
    "id": "181533",
    "price": "23,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741784032_23f76976108b257db72f35f649ee742b.jpg",
    "names": {
      "pt": "Necessaire Havaianas Beach Preto",
      "es": "Necessaire Havaianas Beach Negro",
      "en": "Havaianas Beach Black Necessaire"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/necessaire-havaianas-beach-preto_p181533.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/necessaire-havaianas-beach-negro_p181533.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-beach-black-necessaire_p181533.html"
    },
    "directAdd": true
  },
  {
    "id": "212380",
    "price": "25,00 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1617105075_1b17bc8b5e0ea6be79d7c817b96e8fe4.jpg",
    "names": {
      "pt": "Sand\u00e1lias Havaianas Flash Urban",
      "es": "Sandalias Havaianas Flash Urban",
      "en": "Havaianas Flash Urban Sandals"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/sandalias-havaianas-flash-urban_p212380.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/sandalias-havaianas-flash-urban_p212380.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-flash-urban-sandals_p212380.html"
    },
    "directAdd": false
  },
  {
    "id": "212401",
    "price": "24,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743430210_67bf7f8d4982e24d7e4e83ded0556f46.jpg",
    "names": {
      "pt": "Chinelos Havaianas Top Mix Pretos e Brancos",
      "es": "Chanclas Havaianas Top Mix Negras y Blancas",
      "en": "Havaianas Top Mix Black and White Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-top-mix-pretos-e-brancos_p212401.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-top-mix-negras-y-blancas_p212401.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-top-mix-black-and-white-flip-flops_p212401.html"
    },
    "directAdd": false
  },
  {
    "id": "212441",
    "price": "24,90 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1617105431_b50067870f53e5b00911d6113694f0ab.jpg",
    "names": {
      "pt": "Sand\u00e1lias Havaianas Luna Rosa",
      "es": "Sandalias Havaianas Luna Rosa",
      "en": "Havaianas Luna Pink Sandals"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/sandalias-havaianas-luna-rosa_p212441.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/sandalias-havaianas-luna-rosa_p212441.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-luna-pink-sandals_p212441.html"
    },
    "directAdd": false
  },
  {
    "id": "212602",
    "price": "21,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1715959345_451787011056f3c5971eb0ff3219b998.jpg",
    "names": {
      "pt": "Bolsa a Tiracolo Havaianas Street Bag",
      "es": "Bandolera Havaianas Street Bag",
      "en": "Havaianas Street Crossbody Bag"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/acessorios/bolsa-a-tiracolo-havaianas-street-bag_p212602.html",
      "es": "https://www.bzronline.com/es/unisex/accesorios/bandolera-havaianas-street-bag_p212602.html",
      "en": "https://www.bzronline.com/en/unisex/accessories/havaianas-street-crossbody-bag_p212602.html"
    },
    "directAdd": true
  },
  {
    "id": "212606",
    "price": "17,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741785707_edb4976fb794d5b720a3090ce306a786.jpg",
    "names": {
      "pt": "Mala Pequena Havaianas Mini Bag Logo Preta",
      "es": "Bolso Havaianas Mini Bag Logo Negro",
      "en": "Havaianas Mini Bag Logo Black Purse"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-mini-bag-logo-preta_p212606.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bolso-havaianas-mini-bag-logo-negro_p212606.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-mini-bag-logo-black-purse_p212606.html"
    },
    "directAdd": true
  },
  {
    "id": "212747",
    "price": "41,90 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1617196844_e11f2664b7dadf37a9d81fee2f7f2b4b.jpg",
    "names": {
      "pt": "Chinelos Havaianas You Trancoso Premium",
      "es": "Chanclas Havaianas You Trancoso Premium",
      "en": "Havaianas You Trancoso Premium Slides"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-you-trancoso-premium_p212747.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-you-trancoso-premium_p212747.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-you-trancoso-premium-slides_p212747.html"
    },
    "directAdd": false
  },
  {
    "id": "212751",
    "price": "41,90 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1617207386_7bac95602de047235c305fb37b9b5037.jpg",
    "names": {
      "pt": "Chinelos Havaianas You Trancoso Premium",
      "es": "Chanclas Havaianas You Trancoso Premium",
      "en": "Havaianas You Trancoso Premium Slides"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-you-trancoso-premium_p212751.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-you-trancoso-premium_p212751.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-you-trancoso-premium-slides_p212751.html"
    },
    "directAdd": false
  },
  {
    "id": "212850",
    "price": "27,00 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1617207410_ad2329c277df25efe8927c8a61a014f1.jpg",
    "names": {
      "pt": "Chinelos Havaianas Top Fortnite",
      "es": "Chanclas Havaianas Top Fortnite",
      "en": "Havaianas Top Fortnite Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-top-fortnite_p212850.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-top-fortnite_p212850.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-top-fortnite-flip-flops_p212850.html"
    },
    "directAdd": false
  },
  {
    "id": "239670",
    "price": "29,00 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1649955901_8b944d1c8e7b4e505e7ff65bb88bb8ad.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim Flatform",
      "es": "Chanclas Havaianas Slim Flatform",
      "en": "Havaianas Slim Flatform Flip-Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-flatform_p239670.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-slim-flatform_p239670.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-slim-flatform-flip-flops_p239670.html"
    },
    "directAdd": false
  },
  {
    "id": "239680",
    "price": "35,00 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1649941697_36252b83fd5a451a7a19b10e402b4ed7.jpg",
    "names": {
      "pt": "Sand\u00e1lias Havaianas Luna Premium II",
      "es": "Sandalias Havaianas Luna Premium II",
      "en": "Havaianas Luna Premium II Sandals"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/sandalias-havaianas-luna-premium-ii_p239680.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/sandalias-havaianas-luna-premium-ii_p239680.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-luna-premium-ii-sandals_p239680.html"
    },
    "directAdd": false
  },
  {
    "id": "239686",
    "price": "35,00 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1649941700_a4624ca9e25be83923ae921d79322f6d.jpg",
    "names": {
      "pt": "Sand\u00e1lias Havaianas Luna Premium II",
      "es": "Sandalias Havaianas Luna Premium II",
      "en": "Havaianas Luna Premium II Sandals"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/sandalias-havaianas-luna-premium-ii_p239686.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/sandalias-havaianas-luna-premium-ii_p239686.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-luna-premium-ii-sandals_p239686.html"
    },
    "directAdd": false
  },
  {
    "id": "239701",
    "price": "31,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1654707035_3af710dd4e449c084b3ba30225312aa2.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slide Classic Metallic",
      "es": "Chanclas Havaianas Slide Classic Metallic",
      "en": "Havaianas Slide Classic Metallic Slides"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slide-classic-metallic_p239701.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-slide-classic-metallic_p239701.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-slide-classic-metallic-slides_p239701.html"
    },
    "directAdd": false
  },
  {
    "id": "239821",
    "price": "17,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1714651607_6bf16aac00a6db488e5486cc1de24038.jpg",
    "names": {
      "pt": "Porta-Moedas Havaianas Disney Classics",
      "es": "Monedero Havaianas Disney Classics",
      "en": "Havaianas Disney Classics Coin Purse"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/porta-moedas-havaianas-disney-classics_p239821.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/monedero-havaianas-disney-classics_p239821.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-disney-classics-coin-purse_p239821.html"
    },
    "directAdd": false
  },
  {
    "id": "239933",
    "price": "21,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1780070386_7e2563bc9b01eb09e305ad1eaf83ed68.jpg",
    "names": {
      "pt": "Mala Pequena Havaianas Mini Bag Plus Glitter Preta",
      "es": "Bolso Havaianas Mini Bag Plus Glitter Negro",
      "en": "Havaianas Mini Bag Plus Glitter Black Purse"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-mini-bag-plus-glitter-preta_p239933.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bolso-havaianas-mini-bag-plus-glitter-negro_p239933.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-mini-bag-plus-glitter-black-purse_p239933.html"
    },
    "directAdd": true
  },
  {
    "id": "239934",
    "price": "21,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1716202659_bde7025e2175d3b771e805f0497df2aa.jpg",
    "names": {
      "pt": "Mala Pequena Havaianas Mini Bag Plus Glitter Bege",
      "es": "Bolso Havaianas Mini Bag Plus Glitter Beige",
      "en": "Havaianas Mini Bag Plus Glitter Beige Purse"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-mini-bag-plus-glitter-bege_p239934.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bolso-havaianas-mini-bag-plus-glitter-beige_p239934.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-mini-bag-plus-glitter-beige-purse_p239934.html"
    },
    "directAdd": true
  },
  {
    "id": "239935",
    "price": "27,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1716202891_0ea7afeefda55a1925cf8bfe116f0d6e.jpg",
    "names": {
      "pt": "Necessaire Havaianas Beach Glitter Preto",
      "es": "Necessaire Havaianas Beach Glitter Negro",
      "en": "Havaianas Beach Glitter Black Necessaire"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/necessaire-havaianas-beach-glitter-preto_p239935.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/necessaire-havaianas-beach-glitter-negro_p239935.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-beach-glitter-black-necessaire_p239935.html"
    },
    "directAdd": true
  },
  {
    "id": "251031",
    "price": "27,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1716829168_4ce50a79922eee1e498847215dd52390.jpg",
    "names": {
      "pt": "Necessaire Havaianas Beach Glitter Bege",
      "es": "Necessaire Havaianas Beach Glitter Beige",
      "en": "Havaianas Beach Glitter Beige Necessaire"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/necessaire-havaianas-beach-glitter-bege_p251031.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/necessaire-havaianas-beach-glitter-beige_p251031.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-beach-glitter-beige-necessaire_p251031.html"
    },
    "directAdd": true
  },
  {
    "id": "310130",
    "price": "29,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743521347_88370ab0e4960b21f4c50ad1a901b734.jpg",
    "names": {
      "pt": "Chinelos Havaianas Brasil Logo Verdes",
      "es": "Chanclas Havaianas Brasil Logo Verdes",
      "en": "Havaianas Brasil Logo Green Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-brasil-logo-verdes_p310130.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-brasil-logo-verdes_p310130.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-brasil-logo-green-flip-flops_p310130.html"
    },
    "directAdd": false
  },
  {
    "id": "312190",
    "price": "21,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1715959714_edad3f2169a79feae586ccc8f8fb9b9e.jpg",
    "names": {
      "pt": "Bolsa a Tiracolo Havaianas Street Bag",
      "es": "Bandolera Havaianas Street Bag",
      "en": "Havaianas Street Crossbody Bag"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/acessorios/bolsa-a-tiracolo-havaianas-street-bag_p312190.html",
      "es": "https://www.bzronline.com/es/unisex/accesorios/bandolera-havaianas-street-bag_p312190.html",
      "en": "https://www.bzronline.com/en/unisex/accessories/havaianas-street-crossbody-bag_p312190.html"
    },
    "directAdd": true
  },
  {
    "id": "312192",
    "price": "20,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1716202269_2c5c10af32d388292cd5046acdd6c34f.jpg",
    "names": {
      "pt": "Mala Pequena Havaianas Charm Disney Classics",
      "es": "Bolso Havaianas Charm Disney Classics",
      "en": "Havaianas Charm Disney Classics Purse"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-charm-disney-classics_p312192.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bolso-havaianas-charm-disney-classics_p312192.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-charm-disney-classics-purse_p312192.html"
    },
    "directAdd": true
  },
  {
    "id": "312194",
    "price": "17,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1680174134_f4465310e8c25333e397b0d1df4e9810.jpg",
    "names": {
      "pt": "Porta-Moedas Havaianas Disney Classics",
      "es": "Monedero Havaianas Disney Classics",
      "en": "Havaianas Disney Classics Coin Purse"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/porta-moedas-havaianas-disney-classics_p312194.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/monedero-havaianas-disney-classics_p312194.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-disney-classics-coin-purse_p312194.html"
    },
    "directAdd": false
  },
  {
    "id": "312196",
    "price": "41,90 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1680515041_d1669a3f704cf3402338cdee5a29de55.jpg",
    "names": {
      "pt": "Chinelos Havaianas You Malta Metallic",
      "es": "Chanclas Havaianas You Malta Metallic",
      "en": "Havaianas You Malta Metallic Slides"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-you-malta-metallic_p312196.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-you-malta-metallic_p312196.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-you-malta-metallic-slides_p312196.html"
    },
    "directAdd": false
  },
  {
    "id": "312202",
    "price": "20,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1680171100_69a4e0e97d479f3cebed6661e5d4ddc3.jpg",
    "names": {
      "pt": "Mala Pequena Havaianas Mini Bag Print",
      "es": "Bolso Havaianas Mini Bag Print",
      "en": "Havaianas Mini Bag Print Purse"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-mini-bag-print_p312202.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bolso-havaianas-mini-bag-print_p312202.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-mini-bag-print-purse_p312202.html"
    },
    "directAdd": true
  },
  {
    "id": "312203",
    "price": "39,90 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1716293065_aa45c9bf8ada2dbc96aa65c7f119d87b.jpg",
    "names": {
      "pt": "Bolsa a Tiracolo Havaianas Diamong Bag",
      "es": "Bandolera Havaianas Diamong Bag",
      "en": "Havaianas Diamong Crossbody Bag"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/bolsa-a-tiracolo-havaianas-diamong-bag_p312203.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bandolera-havaianas-diamong-bag_p312203.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-diamong-crossbody-bag_p312203.html"
    },
    "directAdd": true
  },
  {
    "id": "314073",
    "price": "34,90 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1680685499_1c01d2fb45910ccb4cff8b7dd911067e.jpg",
    "names": {
      "pt": "Chinelos Havaianas You Malta",
      "es": "Chanclas Havaianas You Malta",
      "en": "Havaianas You Malta Slides"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-you-malta_p314073.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-you-malta_p314073.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-you-malta-slides_p314073.html"
    },
    "directAdd": false
  },
  {
    "id": "314093",
    "price": "39,90 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1716194763_7a5031c7c8e1c387e54e40aaa5bd881e.jpg",
    "names": {
      "pt": "Bolsa a Tiracolo Havaianas Diamong Bag",
      "es": "Bandolera Havaianas Diamong Bag",
      "en": "Havaianas Diamong Crossbody Bag"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/bolsa-a-tiracolo-havaianas-diamong-bag_p314093.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bandolera-havaianas-diamong-bag_p314093.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-diamong-crossbody-bag_p314093.html"
    },
    "directAdd": true
  },
  {
    "id": "314285",
    "price": "31,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1713778011_bbb5becd82b2adcb01887925bd214adb.jpg",
    "names": {
      "pt": "Chinelos Havaianas Top Logomania Colors II",
      "es": "Chanclas Havaianas Top Logomania Colors II",
      "en": "Havaianas Top Logomania Colors II Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-top-logomania-colors-ii_p314285.html",
      "es": "https://www.bzronline.com/es/masculino/calzado/chanclas-havaianas-top-logomania-colors-ii_p314285.html",
      "en": "https://www.bzronline.com/en/male/shoes/havaianas-top-logomania-colors-ii-flip-flops_p314285.html"
    },
    "directAdd": false
  },
  {
    "id": "314534",
    "price": "29,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1713773733_bb0a5f047c16a84d8ac22bf91004136f.jpg",
    "names": {
      "pt": "Sand\u00e1lias Havaianas Flash Urban Plus",
      "es": "Sandalias Havaianas Flash Urban Plus",
      "en": "Havaianas Flash Urban Plus Sandals"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/sandalias-havaianas-flash-urban-plus_p314534.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/sandalias-havaianas-flash-urban-plus_p314534.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-flash-urban-plus-sandals_p314534.html"
    },
    "directAdd": false
  },
  {
    "id": "314539",
    "price": "31,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1681133705_26446d7c604fb71ce413d5893f97b975.jpg",
    "names": {
      "pt": "Chinelos Havaianas Top Pride Allover",
      "es": "Chanclas Havaianas Top Pride Allover",
      "en": "Havaianas Top Pride Allover Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-top-pride-allover_p314539.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-top-pride-allover_p314539.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-top-pride-allover-flip-flops_p314539.html"
    },
    "directAdd": false
  },
  {
    "id": "314560",
    "price": "39,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1681131722_1a7e2c31647b400840a22e4bc8434b53.jpg",
    "names": {
      "pt": "Alpercatas Havaianas Origine IV",
      "es": "Alpargatas Havaianas Origine IV",
      "en": "Havaianas Origine IV Espadrilles"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/alpercatas-havaianas-origine-iv_p314560.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/alpargatas-havaianas-origine-iv_p314560.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-origine-iv-espadrilles_p314560.html"
    },
    "directAdd": false
  },
  {
    "id": "318587",
    "price": "20,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1681217409_a20b9058ddf8fdead2d08dbd6aeacaba.jpg",
    "names": {
      "pt": "Mala Pequena Havaianas Mini Bag Print",
      "es": "Bolso Havaianas Mini Bag Print",
      "en": "Havaianas Mini Bag Print Purse"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-mini-bag-print_p318587.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bolso-havaianas-mini-bag-print_p318587.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-mini-bag-print-purse_p318587.html"
    },
    "directAdd": true
  },
  {
    "id": "320362",
    "price": "21,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1713778686_a355eb5225f00bed9386ea678696e35e.jpg",
    "names": {
      "pt": "Chinelos Havaianas Top",
      "es": "Chanclas Havaianas Top",
      "en": "Havaianas Top Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-top_p320362.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-top_p320362.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-top-flip-flops_p320362.html"
    },
    "directAdd": false
  },
  {
    "id": "320443",
    "price": "30,00 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1749122674_9334d8fe4f23576ecfa2eb86aa2bcefc.jpg",
    "names": {
      "pt": "Chinelos Havaianas Brasil Logo Amarelos",
      "es": "Chanclas Havaianas Brasil Logo Amarillas",
      "en": "Havaianas Brasil Logo Yellow Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-brasil-logo-amarelos_p320443.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-brasil-logo-amarillas_p320443.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-brasil-logo-yellow-flip-flops_p320443.html"
    },
    "directAdd": false
  },
  {
    "id": "320450",
    "price": "46,90 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1684228960_fd7924c80eb84eb4de51aeafcdd07685.jpg",
    "names": {
      "pt": "Chinelos Havaianas You Milan",
      "es": "Chanclas Havaianas You Milan",
      "en": "Havaianas You Milan Slides"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-you-milan_p320450.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-you-milan_p320450.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-you-milan-slides_p320450.html"
    },
    "directAdd": false
  },
  {
    "id": "320994",
    "price": "46,90 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1685550538_7648bc6f924a08d9282efaded0084e9b.jpg",
    "names": {
      "pt": "Chinelos Havaianas You Milan",
      "es": "Chanclas Havaianas You Milan",
      "en": "Havaianas You Milan Slides"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-you-milan_p320994.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-you-milan_p320994.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-you-milan-slides_p320994.html"
    },
    "directAdd": false
  },
  {
    "id": "320998",
    "price": "46,90 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1685549195_4e9e6cdfec10711305bcea39b028d36f.jpg",
    "names": {
      "pt": "Chinelos Havaianas You Milan",
      "es": "Chanclas Havaianas You Milan",
      "en": "Havaianas You Milan Slides"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-you-milan_p320998.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-you-milan_p320998.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-you-milan-slides_p320998.html"
    },
    "directAdd": false
  },
  {
    "id": "348115",
    "price": "27,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1710350742_e8cc918664b93e2205bade4a758446a8.jpg",
    "names": {
      "pt": "Chinelos Havaianas Hype",
      "es": "Chanclas Havaianas Hype",
      "en": "Havaianas Hype Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-hype_p348115.html",
      "es": "https://www.bzronline.com/es/masculino/calzado/chanclas-havaianas-hype_p348115.html",
      "en": "https://www.bzronline.com/en/male/shoes/havaianas-hype-flip-flops_p348115.html"
    },
    "directAdd": false
  },
  {
    "id": "348122",
    "price": "29,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1710350498_50f283d2fff354ce5fec6abaa5db9c11.jpg",
    "names": {
      "pt": "Chinelos Havaianas Urban Basic Material Pretos",
      "es": "Chanclas Havaianas Urban Basic Material Negras",
      "en": "Havaianas Urban Basic Material Black Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-urban-basic-material-pretos_p348122.html",
      "es": "https://www.bzronline.com/es/masculino/calzado/chanclas-havaianas-urban-basic-material-negras_p348122.html",
      "en": "https://www.bzronline.com/en/male/shoes/havaianas-urban-basic-material-black-flip-flops_p348122.html"
    },
    "directAdd": false
  },
  {
    "id": "348156",
    "price": "29,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1710352700_1614fdb8a05d85e75f9f6877659d3788.jpg",
    "names": {
      "pt": "Chinelos Havaianas Urban Basic Material",
      "es": "Chanclas Havaianas Urban Basic Material",
      "en": "Havaianas Urban Basic Material Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-urban-basic-material_p348156.html",
      "es": "https://www.bzronline.com/es/masculino/calzado/chanclas-havaianas-urban-basic-material_p348156.html",
      "en": "https://www.bzronline.com/en/male/shoes/havaianas-urban-basic-material-flip-flops_p348156.html"
    },
    "directAdd": false
  },
  {
    "id": "348168",
    "price": "29,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1710409180_4447e7a5a19998e26a0400f41258c20d.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim Verdes",
      "es": "Chanclas Havaianas Slim Verdes",
      "en": "Havaianas Slim Green Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-verdes_p348168.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-slim-verdes_p348168.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-slim-green-flip-flops_p348168.html"
    },
    "directAdd": false
  },
  {
    "id": "348188",
    "price": "35,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743183764_dc7909365d70a4c372e9f280f91fd82d.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim Glitter II Dourados",
      "es": "Chanclas Havaianas Slim Glitter II Doradas",
      "en": "Havaianas Slim Glitter II Golden Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-glitter-ii-dourados_p348188.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-slim-glitter-ii-doradas_p348188.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-slim-glitter-ii-golden-flip-flops_p348188.html"
    },
    "directAdd": false
  },
  {
    "id": "348212",
    "price": "26,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1710419280_a051cd9e66cf3f6b59cb71d30d58e4e1.jpg",
    "names": {
      "pt": "Chinelos Havaianas Top Nautical",
      "es": "Chanclas Havaianas Top Nautical",
      "en": "Havaianas Top Nautical Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-top-nautical_p348212.html",
      "es": "https://www.bzronline.com/es/masculino/calzado/chanclas-havaianas-top-nautical_p348212.html",
      "en": "https://www.bzronline.com/en/male/shoes/havaianas-top-nautical-flip-flops_p348212.html"
    },
    "directAdd": false
  },
  {
    "id": "348241",
    "price": "23,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1780399170_626bc3a5f7d9943171a54ddc9f9b89da.jpg",
    "names": {
      "pt": "Bolsa a Tiracolo Havaianas Street Bag Glitter Bege",
      "es": "Bandolera Havaianas Street Bag Glitter Beige",
      "en": "Havaianas Street Bag Glitter Beige Crossbody Bag"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/bolsa-a-tiracolo-havaianas-street-bag-glitter-bege_p348241.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bandolera-havaianas-street-bag-glitter-beige_p348241.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-street-bag-glitter-beige-crossbody-bag_p348241.html"
    },
    "directAdd": true
  },
  {
    "id": "348243",
    "price": "29,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1780398761_29f18a79a08dbfaec5cc76e7a056e6ae.jpg",
    "names": {
      "pt": "Bolsa a Tiracolo Havaianas Street Bag Glitter Preta",
      "es": "Bandolera Havaianas Street Bag Glitter Negra",
      "en": "Havaianas Street Bag Glitter Black Crossbody Bag"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/bolsa-a-tiracolo-havaianas-street-bag-glitter-preta_p348243.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bandolera-havaianas-street-bag-glitter-negra_p348243.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-street-bag-glitter-black-crossbody-bag_p348243.html"
    },
    "directAdd": true
  },
  {
    "id": "348291",
    "price": "23,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1713283276_371cbca67a5095aa000bf14a72a41785.jpg",
    "names": {
      "pt": "Chinelos Havaianas Top Tiras Senses",
      "es": "Chanclas Havaianas Top Tiras Senses",
      "en": "Havaianas Top Tiras Senses Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-top-tiras-senses_p348291.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-top-tiras-senses_p348291.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-top-tiras-senses-flip-flops_p348291.html"
    },
    "directAdd": false
  },
  {
    "id": "348295",
    "price": "29,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1710417431_56284f21613e4eb14d34663437e7bfa1.jpg",
    "names": {
      "pt": "Chinelos Havaianas Disney Stylish",
      "es": "Chanclas Havaianas Disney Stylish",
      "en": "Havaianas Disney Stylish Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-disney-stylish_p348295.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-disney-stylish_p348295.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-disney-stylish-flip-flops_p348295.html"
    },
    "directAdd": false
  },
  {
    "id": "348304",
    "price": "26,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1710417892_5c4edc56aff03001db99c1942020eb0a.jpg",
    "names": {
      "pt": "Chinelos Havaianas Top Nautical",
      "es": "Chanclas Havaianas Top Nautical",
      "en": "Havaianas Top Nautical Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-top-nautical_p348304.html",
      "es": "https://www.bzronline.com/es/masculino/calzado/chanclas-havaianas-top-nautical_p348304.html",
      "en": "https://www.bzronline.com/en/male/shoes/havaianas-top-nautical-flip-flops_p348304.html"
    },
    "directAdd": false
  },
  {
    "id": "348313",
    "price": "33,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1713538815_b937d556e2bfd80ed5c19bd3c391bb07.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim Tropical",
      "es": "Chanclas Havaianas Slim Tropical",
      "en": "Havaianas Slim Tropical Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-tropical_p348313.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-slim-tropical_p348313.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-slim-tropical-flip-flops_p348313.html"
    },
    "directAdd": false
  },
  {
    "id": "351070",
    "price": "21,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1713198313_b23a6b1c367d7102e8c1295e0b93af67.jpg",
    "names": {
      "pt": "Bolsa a Tiracolo Havaianas Street Bag",
      "es": "Bandolera Havaianas Street Bag",
      "en": "Havaianas Street Crossbody Bag"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/acessorios/bolsa-a-tiracolo-havaianas-street-bag_p351070.html",
      "es": "https://www.bzronline.com/es/unisex/accesorios/bandolera-havaianas-street-bag_p351070.html",
      "en": "https://www.bzronline.com/en/unisex/accessories/havaianas-street-crossbody-bag_p351070.html"
    },
    "directAdd": true
  },
  {
    "id": "351071",
    "price": "23,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1780398533_cb7e0a3c9c0b55fd26df1c36957e817d.jpg",
    "names": {
      "pt": "Bolsa a Tiracolo Havaianas Street Bag Glitter Cinzenta",
      "es": "Bandolera Havaianas Street Bag Glitter Gris",
      "en": "Havaianas Street Bag Glitter Grey Crossbody Bag"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/bolsa-a-tiracolo-havaianas-street-bag-glitter-cinzenta_p351071.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bandolera-havaianas-street-bag-glitter-gris_p351071.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-street-bag-glitter-grey-crossbody-bag_p351071.html"
    },
    "directAdd": true
  },
  {
    "id": "351096",
    "price": "26,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1716827956_df92dafadef0945d266fa30764d0acea.jpg",
    "names": {
      "pt": "Necessaire Havaianas Beach Metallic",
      "es": "Necessaire Havaianas Beach Metallic",
      "en": "Havaianas Beach Metallic Necessaire"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/necessaire-havaianas-beach-metallic_p351096.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/necessaire-havaianas-beach-metallic_p351096.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-beach-metallic-necessaire_p351096.html"
    },
    "directAdd": true
  },
  {
    "id": "351097",
    "price": "16,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741784957_d4cf74bd1b95d40b3481a61a68c932be.jpg",
    "names": {
      "pt": "Mala Pequena Havaianas Mini Bag Plus Cool Metallic Prateada",
      "es": "Bolso Havaianas Mini Bag Plus Cool Metallic Plateado",
      "en": "Havaianas Mini Bag Plus Cool Metallic Silver Purse"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-mini-bag-plus-cool-metallic-prateada_p351097.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bolso-havaianas-mini-bag-plus-cool-metallic-plateado_p351097.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-mini-bag-plus-cool-metallic-silver-purse_p351097.html"
    },
    "directAdd": true
  },
  {
    "id": "351518",
    "price": "33,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1713438265_db120ba9ae8905f88f1ddcd578fb60a3.jpg",
    "names": {
      "pt": "Chinelos Havaianas Square Logo Metallic",
      "es": "Chanclas Havaianas Square Logo Metallic",
      "en": "Havaianas Square Logo Metallic Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-square-logo-metallic_p351518.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-square-logo-metallic_p351518.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-square-logo-metallic-flip-flops_p351518.html"
    },
    "directAdd": false
  },
  {
    "id": "351522",
    "price": "33,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1713438924_e701eeba283e337ae2527ac3c11aa527.jpg",
    "names": {
      "pt": "Chinelos Havaianas Square Logo Metallic",
      "es": "Chanclas Havaianas Square Logo Metallic",
      "en": "Havaianas Square Logo Metallic Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-square-logo-metallic_p351522.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-square-logo-metallic_p351522.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-square-logo-metallic-flip-flops_p351522.html"
    },
    "directAdd": false
  },
  {
    "id": "351534",
    "price": "35,90 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1713439499_ecd938fd12750b1ec9ee935eedeae842.jpg",
    "names": {
      "pt": "Chinelos Havaianas Square Glitter",
      "es": "Chanclas Havaianas Square Glitter",
      "en": "Havaianas Square Glitter Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-square-glitter_p351534.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-square-glitter_p351534.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-square-glitter-flip-flops_p351534.html"
    },
    "directAdd": false
  },
  {
    "id": "351583",
    "price": "31,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1713773304_f52d4c0644988da5c5a7572bb68a6792.jpg",
    "names": {
      "pt": "Chinelos Havaianas Logomania Colors II",
      "es": "Chanclas Havaianas Top Logomania Colors II",
      "en": "Havaianas Top Logomania Colors II Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-logomania-colors-ii_p351583.html",
      "es": "https://www.bzronline.com/es/masculino/calzado/chanclas-havaianas-top-logomania-colors-ii_p351583.html",
      "en": "https://www.bzronline.com/en/male/shoes/havaianas-top-logomania-colors-ii-flip-flops_p351583.html"
    },
    "directAdd": false
  },
  {
    "id": "351649",
    "price": "29,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743520805_4873e5ac759fa3c27091dfb4e83a55e3.jpg",
    "names": {
      "pt": "Chinelos Havaianas Brasil Logo Verdes",
      "es": "Chanclas Havaianas Brasil Logo Verdes",
      "en": "Havaianas Brasil Logo Green Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-brasil-logo-verdes_p351649.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-brasil-logo-verdes_p351649.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-brasil-logo-green-flip-flops_p351649.html"
    },
    "directAdd": false
  },
  {
    "id": "378289",
    "price": "31,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743096969_b7031a26069bbcb2587c995bc02867d3.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim Animals Print Leopardo",
      "es": "Chanclas Havaianas Slim Animals Estampado de Leopardo",
      "en": "Havaianas Slim Animals Leopard Print Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-animals-print-leopardo_p378289.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-slim-animals-estampado-de-leopardo_p378289.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-slim-animals-leopard-print-flip-flops_p378289.html"
    },
    "directAdd": false
  },
  {
    "id": "378293",
    "price": "25,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743097144_e4419585cf6cdce5e1810be6d71fa339.jpg",
    "names": {
      "pt": "Chinelos Havaianas Top Tropicalia Vibes Verdes",
      "es": "Chanclas Havaianas Top Tropicalia Vibes Verdes",
      "en": "Havaianas Top Tropicalia Vibes Green Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-top-tropicalia-vibes-verdes_p378293.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-top-tropicalia-vibes-verdes_p378293.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-top-tropicalia-vibes-green-flip-flops_p378293.html"
    },
    "directAdd": false
  },
  {
    "id": "378297",
    "price": "33,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741687590_33ca608e51e539c568fc3ec8bcaac635.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim Point Bege",
      "es": "Chanclas Havaianas Slim Point Beige",
      "en": "Havaianas Slim Point Beige Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-point-bege_p378297.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-slim-point-beige_p378297.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-slim-point-beige-flip-flops_p378297.html"
    },
    "directAdd": false
  },
  {
    "id": "378309",
    "price": "33,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741688239_04cd7f1bb66efe39d11e9c66f73dee84.jpg",
    "names": {
      "pt": "Chinelos Havaianas Top Square Fusion Premium Pretos e Bege",
      "es": "Chanclas Havaianas Top Square Fusion Premium Negras y Beige",
      "en": "Havaianas Top Square Fusion Premium Black and Beige Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-top-square-fusion-premium-pretos-e-bege_p378309.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-top-square-fusion-premium-negras-y-beige_p378309.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-top-square-fusion-premium-black-and-beige-flip-flops_p378309.html"
    },
    "directAdd": false
  },
  {
    "id": "378313",
    "price": "33,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741688560_d78368b576c63462d3a2500cd6eec774.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim Point Rosa",
      "es": "Chanclas Havaianas Slim Point Rosa",
      "en": "Havaianas Slim Point Pink Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-point-rosa_p378313.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-slim-point-rosa_p378313.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-slim-point-pink-flip-flops_p378313.html"
    },
    "directAdd": false
  },
  {
    "id": "378316",
    "price": "33,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743097389_4ff8f094d266d55622b51cba22f79f02.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim Point Laranja",
      "es": "Chanclas Havaianas Slim Point Naranja",
      "en": "Havaianas Slim Point Orange Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-point-laranja_p378316.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-slim-point-naranja_p378316.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-slim-point-orange-flip-flops_p378316.html"
    },
    "directAdd": false
  },
  {
    "id": "378319",
    "price": "29,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741689047_e25f3e84d8ed0e5ba373025a7fac02db.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim Laranja",
      "es": "Chanclas Havaianas Slim Naranja",
      "en": "Havaianas Slim Orange Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-laranja_p378319.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-slim-naranja_p378319.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-slim-orange-flip-flops_p378319.html"
    },
    "directAdd": false
  },
  {
    "id": "378323",
    "price": "27,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1747842224_1ba32d5761d4fb431cd22ab2856f5c56.jpg",
    "names": {
      "pt": "Chinelos Havaianas Top Surfer",
      "es": "Chanclas Havaianas Top Surfer",
      "en": "Havaianas Top Surfer Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-top-surfer_p378323.html",
      "es": "https://www.bzronline.com/es/masculino/calzado/chanclas-havaianas-top-surfer_p378323.html",
      "en": "https://www.bzronline.com/en/male/shoes/havaianas-top-surfer-flip-flops_p378323.html"
    },
    "directAdd": false
  },
  {
    "id": "378328",
    "price": "25,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743096507_a1a1bd2a00effbf10a2c706b02f29964.jpg",
    "names": {
      "pt": "Chinelos Havaianas Aqua Metallic Bege",
      "es": "Chanclas Havaianas Aqua Metallic Beige",
      "en": "Havaianas Aqua Metallic Beige Slides"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-aqua-metallic-bege_p378328.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-aqua-metallic-beige_p378328.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-aqua-metallic-beige-slides_p378328.html"
    },
    "directAdd": false
  },
  {
    "id": "378331",
    "price": "27,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1747841777_5acf84cfb5961083d084beb438dac12d.jpg",
    "names": {
      "pt": "Chinelos Havaianas Top Surfer",
      "es": "Chanclas Havaianas Top Surfer",
      "en": "Havaianas Top Surfer Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-top-surfer_p378331.html",
      "es": "https://www.bzronline.com/es/masculino/calzado/chanclas-havaianas-top-surfer_p378331.html",
      "en": "https://www.bzronline.com/en/male/shoes/havaianas-top-surfer-flip-flops_p378331.html"
    },
    "directAdd": false
  },
  {
    "id": "378336",
    "price": "25,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741692783_9c774479184613fa40a154f0da22c9be.jpg",
    "names": {
      "pt": "Chinelos Havaianas Top Tropicalia Vibes Salm\u00e3o",
      "es": "Chanclas Havaianas Top Tropicalia Vibes Salm\ufffdn",
      "en": "Havaianas Top Tropicalia Vibes Salmon Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-top-tropicalia-vibes-salmao_p378336.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-top-tropicalia-vibes-salmon_p378336.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-top-tropicalia-vibes-salmon-flip-flops_p378336.html"
    },
    "directAdd": false
  },
  {
    "id": "378340",
    "price": "33,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743096795_a2092b93104184f61c67ae4d46ba2993.jpg",
    "names": {
      "pt": "Chinelos Havaianas Top Square Fusion Premium Bege",
      "es": "Chanclas Havaianas Top Square Fusion Premium Beige",
      "en": "Havaianas Top Square Fusion Premium Beige Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-top-square-fusion-premium-bege_p378340.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-top-square-fusion-premium-beige_p378340.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-top-square-fusion-premium-beige-flip-flops_p378340.html"
    },
    "directAdd": false
  },
  {
    "id": "378347",
    "price": "33,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1781690428_2af292c1486b79d4efc6f8f75209ac96.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim Tropical Laranja",
      "es": "Chanclas Havaianas Slim Tropical Naranja",
      "en": "Havaianas Slim Tropical Orange Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-tropical-laranja_p378347.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-slim-tropical-naranja_p378347.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-slim-tropical-orange-flip-flops_p378347.html"
    },
    "directAdd": false
  },
  {
    "id": "378351",
    "price": "33,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1743097907_49a6082781b0cf3fe0683f57d70237bd.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim Flatform Bege",
      "es": "Chanclas Havaianas Slim Flatform Beige",
      "en": "Havaianas Slim Flatform Beige Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-flatform-bege_p378351.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-slim-flatform-beige_p378351.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-slim-flatform-beige-flip-flops_p378351.html"
    },
    "directAdd": false
  },
  {
    "id": "378355",
    "price": "20,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741696256_4803b018d1185c9fb7b03ef96a9cf2ba.jpg",
    "names": {
      "pt": "Sand\u00e1lias Havaianas Baby Disney Classics II Amarelas",
      "es": "Sandalias Havaianas Baby Disney Classics II Amarillas",
      "en": "Havaianas Baby Disney Classics II Yellow Sandals"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/sandalias-havaianas-baby-disney-classics-ii-amarelas_p378355.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/sandalias-havaianas-baby-disney-classics-ii-amarillas_p378355.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-baby-disney-classics-ii-yellow-sandals_p378355.html"
    },
    "directAdd": false
  },
  {
    "id": "378358",
    "price": "20,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741695690_ac49982d4469900bb943f93e571ed615.jpg",
    "names": {
      "pt": "Sand\u00e1lias Havaianas Baby Disney Classics II Rosa",
      "es": "Sandalias Havaianas Baby Disney Classics II Rosa",
      "en": "Havaianas Baby Disney Classics II Pink Sandals"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/sandalias-havaianas-baby-disney-classics-ii-rosa_p378358.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/sandalias-havaianas-baby-disney-classics-ii-rosa_p378358.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-baby-disney-classics-ii-pink-sandals_p378358.html"
    },
    "directAdd": false
  },
  {
    "id": "378361",
    "price": "21,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741696833_283b54ed25c21a7d4f63fa2f9f93038e.jpg",
    "names": {
      "pt": "Chinelos Havaianas Top Marvel II Kids Vermelhos",
      "es": "Chanclas Havaianas Top Marvel II Kids Rojas",
      "en": "Havaianas Top Marvel II Kids Red Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-top-marvel-ii-kids-vermelhos_p378361.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-top-marvel-ii-kids-rojas_p378361.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-top-marvel-ii-kids-red-flip-flops_p378361.html"
    },
    "directAdd": false
  },
  {
    "id": "378364",
    "price": "21,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1744645578_258315b4be97001642e452abd7ee2c64.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim Princess Kids Rosa",
      "es": "Chanclas Havaianas Slim Princess Kids Rosa",
      "en": "Havaianas Slim Princess Kids Pink Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-slim-princess-kids-rosa_p378364.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-slim-princess-kids-rosa_p378364.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-slim-princess-kids-pink-flip-flops_p378364.html"
    },
    "directAdd": false
  },
  {
    "id": "378402",
    "price": "35,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741775162_89bc89d367108b876e38afb7ae55869d.jpg",
    "names": {
      "pt": "Bolsa a Tiracolo Havaianas Casual Preta",
      "es": "Bandolera Havaianas Casual Negra",
      "en": "Havaianas Casual Black Crossbody Bag"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/bolsa-a-tiracolo-havaianas-casual-preta_p378402.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bandolera-havaianas-casual-negra_p378402.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-casual-black-crossbody-bag_p378402.html"
    },
    "directAdd": true
  },
  {
    "id": "378405",
    "price": "35,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741775746_079d5be88a4c87a8dafabe41fd024b6b.jpg",
    "names": {
      "pt": "Bolsa a Tiracolo Havaianas Casual Rosa",
      "es": "Bandolera Havaianas Casual Rosa",
      "en": "Havaianas Casual Pink Crossbody Bag"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/bolsa-a-tiracolo-havaianas-casual-rosa_p378405.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bandolera-havaianas-casual-rosa_p378405.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-casual-pink-crossbody-bag_p378405.html"
    },
    "directAdd": true
  },
  {
    "id": "378418",
    "price": "23,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741778873_c7adfe5a0dad01bbf322623c669bb711.jpg",
    "names": {
      "pt": "Necessaire Havaianas Beach Rosa",
      "es": "Necessaire Havaianas Beach Rosa",
      "en": "Havaianas Beach Pink Necessaire"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/necessaire-havaianas-beach-rosa_p378418.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/necessaire-havaianas-beach-rosa_p378418.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-beach-pink-necessaire_p378418.html"
    },
    "directAdd": true
  },
  {
    "id": "378419",
    "price": "35,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741777306_ad92dbceefbbca88f72c1834d268451c.jpg",
    "names": {
      "pt": "Mala Pequena Havaianas Clutch Preta",
      "es": "Bolso Havaianas Clutch Negro",
      "en": "Havaianas Clutch Black Purse"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-clutch-preta_p378419.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bolso-havaianas-clutch-negro_p378419.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-clutch-black-purse_p378419.html"
    },
    "directAdd": true
  },
  {
    "id": "378421",
    "price": "26,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741779599_f45dbbf250f3ac33bd0525ce6776217b.jpg",
    "names": {
      "pt": "Necessaire Havaianas Beach Glitter Rosa",
      "es": "Necessaire Havaianas Beach Glitter Rosa",
      "en": "Havaianas Beach Glitter Pink Necessaire"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/necessaire-havaianas-beach-glitter-rosa_p378421.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/necessaire-havaianas-beach-glitter-rosa_p378421.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-beach-glitter-pink-necessaire_p378421.html"
    },
    "directAdd": true
  },
  {
    "id": "378422",
    "price": "35,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741778305_3048ba494979ebdbca86e4294eb3a57c.jpg",
    "names": {
      "pt": "Mala Pequena Havaianas Clutch Laranja",
      "es": "Bolso Havaianas Clutch Naranja",
      "en": "Havaianas Clutch Orange Purse"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-clutch-laranja_p378422.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bolso-havaianas-clutch-naranja_p378422.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-clutch-orange-purse_p378422.html"
    },
    "directAdd": true
  },
  {
    "id": "378425",
    "price": "16,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741781327_fbfcebfe42797b278d7f7a34d57a63a4.jpg",
    "names": {
      "pt": "Mala Pequena Havaianas Mini Bag Logo Verde",
      "es": "Bolso Havaianas Mini Bag Logo Verde",
      "en": "Havaianas Mini Bag Logo Green Purse"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-mini-bag-logo-verde_p378425.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bolso-havaianas-mini-bag-logo-verde_p378425.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-mini-bag-logo-green-purse_p378425.html"
    },
    "directAdd": true
  },
  {
    "id": "378455",
    "price": "16,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741782071_f9e7dd54dae24de372f78363fd623931.jpg",
    "names": {
      "pt": "Mala Pequena Havaianas Mini Bag Logo Azul",
      "es": "Bolso Havaianas Mini Bag Logo Azul",
      "en": "Havaianas Mini Bag Logo Blue Purse"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-mini-bag-logo-azul_p378455.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bolso-havaianas-mini-bag-logo-azul_p378455.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-mini-bag-logo-blue-purse_p378455.html"
    },
    "directAdd": true
  },
  {
    "id": "378461",
    "price": "27,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1747841411_ab9ca710db7382fa1058696c99cc1fd5.jpg",
    "names": {
      "pt": "Chinelos Havaianas Top Surfer",
      "es": "Chanclas Havaianas Top Surfer",
      "en": "Havaianas Top Surfer Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-top-surfer_p378461.html",
      "es": "https://www.bzronline.com/es/masculino/calzado/chanclas-havaianas-top-surfer_p378461.html",
      "en": "https://www.bzronline.com/en/male/shoes/havaianas-top-surfer-flip-flops_p378461.html"
    },
    "directAdd": false
  },
  {
    "id": "378474",
    "price": "21,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741782487_7ada787aca9f3a398353742c01e45661.jpg",
    "names": {
      "pt": "Mala Pequena Havaianas Mini Bag Plus Glitter Bordeaux",
      "es": "Bolso Havaianas Mini Bag Plus Glitter Burdeos",
      "en": "Havaianas Mini Bag Plus Glitter Burgundy Purse"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-mini-bag-plus-glitter-bordeaux_p378474.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bolso-havaianas-mini-bag-plus-glitter-burdeos_p378474.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-mini-bag-plus-glitter-burgundy-purse_p378474.html"
    },
    "directAdd": true
  },
  {
    "id": "378475",
    "price": "23,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1780399048_2d538611a8083e1f20c14a2c060e39fc.jpg",
    "names": {
      "pt": "Bolsa a Tiracolo Havaianas Street Bag Glitter Bordeaux",
      "es": "Bandolera Havaianas Street Bag Glitter Burdeos",
      "en": "Havaianas Street Bag Glitter Burgundy Crossbody Bag"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/bolsa-a-tiracolo-havaianas-street-bag-glitter-bordeaux_p378475.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bandolera-havaianas-street-bag-glitter-burdeos_p378475.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-street-bag-glitter-burgundy-crossbody-bag_p378475.html"
    },
    "directAdd": true
  },
  {
    "id": "378490",
    "price": "35,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741799632_498c11d663c31ccff8df69d2ab5cfa82.jpg",
    "names": {
      "pt": "Bolsa a Tiracolo Havaianas Casual Bege",
      "es": "Bandolera Havaianas Casual Beige",
      "en": "Havaianas Casual Beige Crossbody Bag"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/bolsa-a-tiracolo-havaianas-casual-bege_p378490.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bandolera-havaianas-casual-beige_p378490.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-casual-beige-crossbody-bag_p378490.html"
    },
    "directAdd": true
  },
  {
    "id": "378503",
    "price": "33,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741792892_fe27b5e6c33ffbf5c717c10abd0b31e6.jpg",
    "names": {
      "pt": "Chinelos Havaianas Square Logo Metallic Bordeaux",
      "es": "Chanclas Havaianas Square Logo Metallic Burdeos",
      "en": "Havaianas Square Logo Metallic Burgundy Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-square-logo-metallic-bordeaux_p378503.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-square-logo-metallic-burdeos_p378503.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-square-logo-metallic-burgundy-flip-flops_p378503.html"
    },
    "directAdd": false
  },
  {
    "id": "378506",
    "price": "21,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1744646121_acef18fc9e3427d6aeab241e321ac71d.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim Princess Kids Roxos",
      "es": "Chanclas Havaianas Slim Princess Kids Moradas",
      "en": "Havaianas Slim Princess Kids Purple Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-slim-princess-kids-roxos_p378506.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-slim-princess-kids-moradas_p378506.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-slim-princess-kids-purple-flip-flops_p378506.html"
    },
    "directAdd": false
  },
  {
    "id": "378509",
    "price": "21,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741801357_b5e08d1935988665fdd2f3804b86daa8.jpg",
    "names": {
      "pt": "Chinelos Havaianas Top Marvel II Kids Pretos",
      "es": "Chanclas Havaianas Top Marvel II Kids Negras",
      "en": "Havaianas Top Marvel II Kids Black Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-top-marvel-ii-kids-pretos_p378509.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-top-marvel-ii-kids-negras_p378509.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-top-marvel-ii-kids-black-flip-flops_p378509.html"
    },
    "directAdd": false
  },
  {
    "id": "378512",
    "price": "29,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741800909_98a68dee321e091067f4e4432f313a41.jpg",
    "names": {
      "pt": "Chinelos Havaianas Urban Basic Material Azuis",
      "es": "Chanclas Havaianas Urban Basic Material Azules",
      "en": "Havaianas Urban Basic Material Blue Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-urban-basic-material-azuis_p378512.html",
      "es": "https://www.bzronline.com/es/masculino/calzado/chanclas-havaianas-urban-basic-material-azules_p378512.html",
      "en": "https://www.bzronline.com/en/male/shoes/havaianas-urban-basic-material-blue-flip-flops_p378512.html"
    },
    "directAdd": false
  },
  {
    "id": "378527",
    "price": "29,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1742548277_44e0294776348fb32130dfe604b8077b.jpg",
    "names": {
      "pt": "Chinelos Havaianas Brasil Logo Bege",
      "es": "Chanclas Havaianas Brasil Logo Beige",
      "en": "Havaianas Brasil Logo Beige Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-brasil-logo-bege_p378527.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-brasil-logo-beige_p378527.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-brasil-logo-beige-flip-flops_p378527.html"
    },
    "directAdd": false
  },
  {
    "id": "378531",
    "price": "29,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1741857339_47544479f0a78d92027e824bf1442d1c.jpg",
    "names": {
      "pt": "Chinelos Havaianas Brasil Logo Rosa",
      "es": "Chanclas Havaianas Brasil Logo Rosa",
      "en": "Havaianas Brasil Logo Pink Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-brasil-logo-rosa_p378531.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-brasil-logo-rosa_p378531.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-brasil-logo-pink-flip-flops_p378531.html"
    },
    "directAdd": false
  },
  {
    "id": "378534",
    "price": "20,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1742489611_020be5e8b631410b53a88baf54e3f3da.jpg",
    "names": {
      "pt": "Sand\u00e1lias Havaianas Baby A Porquinha Peppa Amarelas",
      "es": "Sandalias Havaianas Baby Peppa Pig Amarillas",
      "en": "Havaianas Baby Peppa Pig Yellow Sandals"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/sandalias-havaianas-baby-a-porquinha-peppa-amarelas_p378534.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/sandalias-havaianas-baby-peppa-pig-amarillas_p378534.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-baby-peppa-pig-yellow-sandals_p378534.html"
    },
    "directAdd": false
  },
  {
    "id": "383344",
    "price": "39,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1746010287_92eeb58a0d3f22d992dd4d06d5c5382d.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim Flatform Loop Premium Bege",
      "es": "Chanclas Havaianas Slim Flatform Loop Premium Beige",
      "en": "Havaianas Slim Flatform Loop Premium Beige Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-flatform-loop-premium-bege_p383344.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-slim-flatform-loop-premium-beige_p383344.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-slim-flatform-loop-premium-beige-flip-flops_p383344.html"
    },
    "directAdd": false
  },
  {
    "id": "383364",
    "price": "39,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1746011234_1471d994ad412fe03a94213cc4a4e72b.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim Flatform Loop Premium Pretos",
      "es": "Chanclas Havaianas Slim Flatform Loop Premium Negras",
      "en": "Havaianas Slim Flatform Loop Premium Black Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-flatform-loop-premium-pretos_p383364.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-slim-flatform-loop-premium-negras_p383364.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-slim-flatform-loop-premium-black-flip-flops_p383364.html"
    },
    "directAdd": false
  },
  {
    "id": "385472",
    "price": "29,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1749124447_af0b187932624945ca7e5927bff34667.jpg",
    "names": {
      "pt": "Chinelos Havaianas The Simpsons",
      "es": "Chanclas Havaianas The Simpsons",
      "en": "Havaianas The Simpsons Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-the-simpsons_p385472.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-the-simpsons_p385472.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-the-simpsons-flip-flops_p385472.html"
    },
    "directAdd": false
  },
  {
    "id": "385525",
    "price": "24,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1749120744_19bb7933521ec91692e26dc3d1a4c585.jpg",
    "names": {
      "pt": "Chinelos Havaianas Top Logomania 2 Pretos e Vermelhos",
      "es": "Chanclas Havaianas Top Logomania 2 Negras y Rojas",
      "en": "Havaianas Top Logomania 2 Black and Red Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-top-logomania-2-pretos-e-vermelhos_p385525.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-top-logomania-2-negras-y-rojas_p385525.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-top-logomania-2-black-and-red-flip-flops_p385525.html"
    },
    "directAdd": false
  },
  {
    "id": "385535",
    "price": "21,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1749123275_cb7ea420544f7ef8e8e29f01cef5d7af.jpg",
    "names": {
      "pt": "Chinelos Havaianas Top Tiras Rosa",
      "es": "Chanclas Havaianas Top Tiras Rosa",
      "en": "Havaianas Top Tiras Pink Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-top-tiras-rosa_p385535.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-top-tiras-rosa_p385535.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-top-tiras-pink-flip-flops_p385535.html"
    },
    "directAdd": false
  },
  {
    "id": "385564",
    "price": "24,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1749141777_5476cead99d33450529879cc89bdddbc.jpg",
    "names": {
      "pt": "Chinelos Havaianas Top Logomania 2 Brancos e Pretos",
      "es": "Chanclas Havaianas Top Logomania 2 Blancas y Negras",
      "en": "Havaianas Top Logomania 2 White and Black Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-top-logomania-2-brancos-e-pretos_p385564.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-top-logomania-2-blancas-y-negras_p385564.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-top-logomania-2-white-and-black-flip-flops_p385564.html"
    },
    "directAdd": false
  },
  {
    "id": "408976",
    "price": "33,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1778770025_2813ec17f61cce4e9ddf179796e3f869.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim Tropical Amarelos",
      "es": "Chanclas Havaianas Slim Tropical Amarillas",
      "en": "Havaianas Slim Tropical Yellow Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-tropical-amarelos_p408976.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-slim-tropical-amarillas_p408976.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-slim-tropical-yellow-flip-flops_p408976.html"
    },
    "directAdd": false
  },
  {
    "id": "408983",
    "price": "44,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1778771274_41150e61fe8bd8b395153e94bd92cf9b.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slide Strap Verdes",
      "es": "Chanclas Havaianas Slide Strap Verdes",
      "en": "Havaianas Slide Strap Green Slides"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-slide-strap-verdes_p408983.html",
      "es": "https://www.bzronline.com/es/masculino/calzado/chanclas-havaianas-slide-strap-verdes_p408983.html",
      "en": "https://www.bzronline.com/en/male/shoes/havaianas-slide-strap-green-slides_p408983.html"
    },
    "directAdd": false
  },
  {
    "id": "408986",
    "price": "44,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1778771464_30f40f23a8ff862fda4cf4d24c52229c.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slide Strap Pretos",
      "es": "Chanclas Havaianas Slide Strap Negras",
      "en": "Havaianas Slide Strap Black Slides"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-slide-strap-pretos_p408986.html",
      "es": "https://www.bzronline.com/es/masculino/calzado/chanclas-havaianas-slide-strap-negras_p408986.html",
      "en": "https://www.bzronline.com/en/male/shoes/havaianas-slide-strap-black-slides_p408986.html"
    },
    "directAdd": false
  },
  {
    "id": "408989",
    "price": "33,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1778772754_8b67d77d78d14518e941cee8992b4847.jpg",
    "names": {
      "pt": "Chinelos Havaianas Square Logo Metallic Pretos",
      "es": "Chanclas Havaianas Square Logo Metallic Negras",
      "en": "Havaianas Square Logo Metallic Black Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-square-logo-metallic-pretos_p408989.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-square-logo-metallic-negras_p408989.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-square-logo-metallic-black-flip-flops_p408989.html"
    },
    "directAdd": false
  },
  {
    "id": "408992",
    "price": "33,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1778772908_a62d2d71960f9248c4a16c2fb1ed4ab2.jpg",
    "names": {
      "pt": "Chinelos Havaianas Square Logo Metallic Bege",
      "es": "Chanclas Havaianas Square Logo Metallic Beige",
      "en": "Havaianas Square Logo Metallic Beige Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-square-logo-metallic-bege_p408992.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-square-logo-metallic-beige_p408992.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-square-logo-metallic-beige-flip-flops_p408992.html"
    },
    "directAdd": false
  },
  {
    "id": "408995",
    "price": "21,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1778774128_e9f14207ec0d208f8536fb4e1a064c76.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim Princess Kids Bege",
      "es": "Chanclas Havaianas Slim Princess Kids Beige",
      "en": "Havaianas Slim Princess Kids Beige Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-slim-princess-kids-bege_p408995.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-slim-princess-kids-beige_p408995.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-slim-princess-kids-beige-flip-flops_p408995.html"
    },
    "directAdd": false
  },
  {
    "id": "408999",
    "price": "21,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1778776638_92c2f5706f217d90b5ee750ce49ea685.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim Princess Kids Rosa",
      "es": "Chanclas Havaianas Slim Princess Kids Rosa",
      "en": "Havaianas Slim Princess Kids Pink Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-slim-princess-kids-rosa_p408999.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-slim-princess-kids-rosa_p408999.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-slim-princess-kids-pink-flip-flops_p408999.html"
    },
    "directAdd": false
  },
  {
    "id": "409005",
    "price": "25,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1778832970_16182a9bd1bfe09230718f4851f4d7da.jpg",
    "names": {
      "pt": "Chinelos Havaianas Top Summer Vibes Bege",
      "es": "Chanclas Havaianas Top Summer Vibes Beige",
      "en": "Havaianas Top Summer Vibes Beige Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-top-summer-vibes-bege_p409005.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-top-summer-vibes-beige_p409005.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-top-summer-vibes-beige-flip-flops_p409005.html"
    },
    "directAdd": false
  },
  {
    "id": "409008",
    "price": "20,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1778834003_c6779f8687a7a441a26b36dbb15057b1.jpg",
    "names": {
      "pt": "Sand\u00e1lias Havaianas Baby Disney Classics II Azuis",
      "es": "Sandalias Havaianas Baby Disney Classics II Azules",
      "en": "Havaianas Baby Disney Classics II Blue Sandals"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/sandalias-havaianas-baby-disney-classics-ii-azuis_p409008.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/sandalias-havaianas-baby-disney-classics-ii-azules_p409008.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-baby-disney-classics-ii-blue-sandals_p409008.html"
    },
    "directAdd": false
  },
  {
    "id": "409012",
    "price": "20,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1778834528_cc0a986025739c999f65ca96081a9921.jpg",
    "names": {
      "pt": "Sand\u00e1lias Havaianas Baby Disney Classics II Laranja",
      "es": "Sandalias Havaianas Baby Disney Classics II Naranja",
      "en": "Havaianas Baby Disney Classics II Orange Sandals"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/sandalias-havaianas-baby-disney-classics-ii-laranja_p409012.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/sandalias-havaianas-baby-disney-classics-ii-naranja_p409012.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-baby-disney-classics-ii-orange-sandals_p409012.html"
    },
    "directAdd": false
  },
  {
    "id": "409016",
    "price": "20,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1778834969_da8d550608d05ad5a158b8f204321ae4.jpg",
    "names": {
      "pt": "Sand\u00e1lias Havaianas Baby Disney Classics II Rosa",
      "es": "Sandalias Havaianas Baby Disney Classics II Rosa",
      "en": "Havaianas Baby Disney Classics II Pink Sandals"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/sandalias-havaianas-baby-disney-classics-ii-rosa_p409016.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/sandalias-havaianas-baby-disney-classics-ii-rosa_p409016.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-baby-disney-classics-ii-pink-sandals_p409016.html"
    },
    "directAdd": false
  },
  {
    "id": "409075",
    "price": "54,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779208226_845db29fd1cfdf6619f8605e9dbe2ae4.jpg",
    "names": {
      "pt": "Chinelos de Plataforma Havaianas Over Puffed Up Castanhos Para Mulher",
      "es": "Chanclas Havaianas Over Puffed Up Con Plataforma Marrones Para Mujer",
      "en": "Havaianas Over Puffed Up Brown Platform Flip Flops For Women"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-de-plataforma-havaianas-over-puffed-up-castanhos-para-mulher_p409075.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-over-puffed-up-con-plataforma-marrones-para-mujer_p409075.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-over-puffed-up-brown-platform-flip-flops-for-women_p409075.html"
    },
    "directAdd": false
  },
  {
    "id": "409079",
    "price": "54,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779207729_d14fe0989a212b5cb97424e2b724a80e.jpg",
    "names": {
      "pt": "Chinelos de Plataforma Havaianas Over Puffed Up Bege Para Mulher",
      "es": "Chanclas Havaianas Over Puffed Up Con Plataforma Beige Para Mujer",
      "en": "Havaianas Over Puffed Up Beige Platform Flip Flops For Women"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-de-plataforma-havaianas-over-puffed-up-bege-para-mulher_p409079.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-over-puffed-up-con-plataforma-beige-para-mujer_p409079.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-over-puffed-up-beige-platform-flip-flops-for-women_p409079.html"
    },
    "directAdd": false
  },
  {
    "id": "409134",
    "price": "54,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779208887_f2da4f4c338b2474314fd3bdb2e22af4.jpg",
    "names": {
      "pt": "Chinelos de Plataforma Havaianas Over Puffed Up Verdes Para Mulher",
      "es": "Chanclas Havaianas Over Puffed Up Con Plataforma Verdes Para Mujer",
      "en": "Havaianas Over Puffed Up Green Platform Flip Flops For Women"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-de-plataforma-havaianas-over-puffed-up-verdes-para-mulher_p409134.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-over-puffed-up-con-plataforma-verdes-para-mujer_p409134.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-over-puffed-up-green-platform-flip-flops-for-women_p409134.html"
    },
    "directAdd": false
  },
  {
    "id": "409152",
    "price": "31,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779374570_c0fa481af397e09302d40e5ffcf97394.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim Animals Print Leopardo Castanhos e Dourados",
      "es": "Chanclas Havaianas Slim Animals Print Leopardo marrones y dorados",
      "en": "Havaianas Slim Animals Print Leopard Brown and Gold Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-animals-print-leopardo-castanhos-e-dourados_p409152.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-slim-animals-print-leopardo-marrones-y-dorados_p409152.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-slim-animals-print-leopard-brown-and-gold-flip-flops_p409152.html"
    },
    "directAdd": false
  },
  {
    "id": "409155",
    "price": "27,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779375432_88162704fe081aa401fb639ba582c016.jpg",
    "names": {
      "pt": "Chinelos Havaianas Top Camu Verdes",
      "es": "Chanclas Havaianas Top Camu Verdes",
      "en": "Havaianas Top Camu Green Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-top-camu-verdes_p409155.html",
      "es": "https://www.bzronline.com/es/masculino/calzado/chanclas-havaianas-top-camu-verdes_p409155.html",
      "en": "https://www.bzronline.com/en/male/shoes/havaianas-top-camu-green-flip-flops_p409155.html"
    },
    "directAdd": false
  },
  {
    "id": "409158",
    "price": "27,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779375143_1eb3858e35c842cccb297ae5dc70888f.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim Glitter II Kids Azuis e Bege",
      "es": "Chanclas Havaianas Slim Glitter II Kids azul y beige",
      "en": "Havaianas Slim Glitter II Kids Blue and Beige Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-slim-glitter-ii-kids-azuis-e-bege_p409158.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-slim-glitter-ii-kids-azul-y-beige_p409158.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-slim-glitter-ii-kids-blue-and-beige-flip-flops_p409158.html"
    },
    "directAdd": false
  },
  {
    "id": "409163",
    "price": "23,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779374194_ebe7e744d449f6d6119091ce214240cf.jpg",
    "names": {
      "pt": "Chinelos Havaianas Aqua verdes",
      "es": "Chanclas Havaianas Aqua Verdes",
      "en": "Havaianas Aqua Green Slides"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-aqua-verdes_p409163.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-aqua-verdes_p409163.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-aqua-green-slides_p409163.html"
    },
    "directAdd": false
  },
  {
    "id": "409166",
    "price": "25,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779373965_2d5674b86d229a8edbbe668cb8548efe.jpg",
    "names": {
      "pt": "Chinelos Havaianas Aqua Metallic Bordeaux",
      "es": "Chanclas Havaianas Aqua Metallic Burdeos",
      "en": "Havaianas Aqua Metallic Burgundy Slides"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-aqua-metallic-bordeaux_p409166.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-aqua-metallic-burdeos_p409166.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-aqua-metallic-burgundy-slides_p409166.html"
    },
    "directAdd": false
  },
  {
    "id": "409169",
    "price": "21,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779374848_309d9180f8d6e95e9cb53ea641d8df29.jpg",
    "names": {
      "pt": "Chinelos Havaianas Slim Disney Lilo & Stitch Kids",
      "es": "Chanclas Havaianas Slim Disney Lilo & Stitch Kids",
      "en": "Havaianas Slim Disney Lilo & Stitch Kids Flip-Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-slim-disney-lilo-e-stitch-kids_p409169.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-slim-disney-lilo-and-stitch-kids_p409169.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-slim-disney-lilo-and-stitch-kids-flip-flops_p409169.html"
    },
    "directAdd": false
  },
  {
    "id": "409183",
    "price": "29,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779379267_e2da1471bd84e4d678e2cb18f48ad1e2.jpg",
    "names": {
      "pt": "Chinelos Havaianas Simpsons Azuis e Pretos",
      "es": "Chanclas Havaianas Simpsons Azules y Negras",
      "en": "Havaianas Simpsons Blue and Black Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-simpsons-azuis-e-pretos_p409183.html",
      "es": "https://www.bzronline.com/es/masculino/calzado/chanclas-havaianas-simpsons-azules-y-negras_p409183.html",
      "en": "https://www.bzronline.com/en/male/shoes/havaianas-simpsons-blue-and-black-flip-flops_p409183.html"
    },
    "directAdd": false
  },
  {
    "id": "409186",
    "price": "24,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779377647_9bcb5c16d27e17ee8b46fdacf39c1db6.jpg",
    "names": {
      "pt": "Chinelos Havaianas Logo Metallic Bronze",
      "es": "Chanclas Havaianas Logo Metallic Bronce",
      "en": "Havaianas Logo Metallic Bronze Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-logo-metallic-bronze_p409186.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-logo-metallic-bronce_p409186.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-logo-metallic-bronze-flip-flops_p409186.html"
    },
    "directAdd": false
  },
  {
    "id": "409189",
    "price": "29,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779378270_ae902c8146065931af8acf4362d2368b.jpg",
    "names": {
      "pt": "Chinelos Havaianas Simpsons Brancos e Azuis",
      "es": "Chanclas Havaianas Simpsons Blancas y Azules",
      "en": "Havaianas Simpsons White and Blue Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-simpsons-brancos-e-azuis_p409189.html",
      "es": "https://www.bzronline.com/es/masculino/calzado/chanclas-havaianas-simpsons-blancas-y-azules_p409189.html",
      "en": "https://www.bzronline.com/en/male/shoes/havaianas-simpsons-white-and-blue-flip-flops_p409189.html"
    },
    "directAdd": false
  },
  {
    "id": "409192",
    "price": "21,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779444621_e932d949d063f10573722c295db22a61.jpg",
    "names": {
      "pt": "Chinelos Havaianas Top Marvel II Avengers Kids Brancos",
      "es": "Chanclas Havaianas Top Marvel II Avengers Kids Blancas",
      "en": "Havaianas Top Marvel II Avengers Kids White Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-top-marvel-ii-avengers-kids-brancos_p409192.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-top-marvel-ii-avengers-kids-blancas_p409192.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-top-marvel-ii-avengers-kids-white-flip-flops_p409192.html"
    },
    "directAdd": false
  },
  {
    "id": "409199",
    "price": "35,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779452094_5288c219a3677099bc6d5d4b2c7beacf.jpg",
    "names": {
      "pt": "Chinelos Havaianas Brasil Twist Azuis",
      "es": "Chanclas Havaianas Brasil Twist Azules",
      "en": "Havaianas Brasil Twist Blue Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-brasil-twist-azuis_p409199.html",
      "es": "https://www.bzronline.com/es/masculino/calzado/chanclas-havaianas-brasil-twist-azules_p409199.html",
      "en": "https://www.bzronline.com/en/male/shoes/havaianas-brasil-twist-blue-flip-flops_p409199.html"
    },
    "directAdd": false
  },
  {
    "id": "409202",
    "price": "29,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779439607_dbe070a748a5eb8090cbc35b657607bb.jpg",
    "names": {
      "pt": "Chinelos Havaianas Top S\u00e3o Lu\u00eds Brancos e Azuis",
      "es": "Chanclas Havaianas Top S\u00e3o Lu\u00eds Blancas y Azules",
      "en": "Havaianas Top S\u00e3o Lu\u00eds White and Blue Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-top-sao-luis-brancos-e-azuis_p409202.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-top-sao-luis-blancas-y-azules_p409202.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-top-sao-luis-white-and-blue-flip-flops_p409202.html"
    },
    "directAdd": false
  },
  {
    "id": "409206",
    "price": "29,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779440470_4d734d84a5bf863276cc5ad5130fc06e.jpg",
    "names": {
      "pt": "Chinelos Havaianas Top Bossa Bege",
      "es": "Chanclas Havaianas Top Bossa Beige",
      "en": "Havaianas Top Bossa Beige Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-top-bossa-bege_p409206.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-top-bossa-beige_p409206.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-top-bossa-beige-flip-flops_p409206.html"
    },
    "directAdd": false
  },
  {
    "id": "409210",
    "price": "35,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779452789_8f2e2a990e1f2165aef6d76b6fd2c0a0.jpg",
    "names": {
      "pt": "Chinelos Havaianas Brasil Twist Verdes",
      "es": "Chanclas Havaianas Brasil Twist Verdes",
      "en": "Havaianas Brasil Twist Green Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-brasil-twist-verdes_p409210.html",
      "es": "https://www.bzronline.com/es/masculino/calzado/chanclas-havaianas-brasil-twist-verdes_p409210.html",
      "en": "https://www.bzronline.com/en/male/shoes/havaianas-brasil-twist-green-flip-flops_p409210.html"
    },
    "directAdd": false
  },
  {
    "id": "409213",
    "price": "37,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779453067_916b99d6ecb8c0c603685481e5123ae5.jpg",
    "names": {
      "pt": "Sand\u00e1lias Havaianas Flash Fusion Pretas e Bege",
      "es": "Sandalias Havaianas Flash Fusion Negras y Beige",
      "en": "Havaianas Flash Fusion Black and Beige Sandals"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/sandalias-havaianas-flash-fusion-pretas-e-bege_p409213.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/sandalias-havaianas-flash-fusion-negras-y-beige_p409213.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-flash-fusion-black-and-beige-sandals_p409213.html"
    },
    "directAdd": false
  },
  {
    "id": "409217",
    "price": "21,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779447207_981244ebed256e25fb8b0b7caad570f6.jpg",
    "names": {
      "pt": "Chinelos Havaianas Disney Cars Kids Vermelhos e Brancos",
      "es": "Chanclas Havaianas Disney Cars Kids Rojas y Blancas",
      "en": "Havaianas Disney Cars Kids Red and White Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/unissexo/calcado/chinelos-havaianas-disney-cars-kids-vermelhos-e-brancos_p409217.html",
      "es": "https://www.bzronline.com/es/unisex/calzado/chanclas-havaianas-disney-cars-kids-rojas-y-blancas_p409217.html",
      "en": "https://www.bzronline.com/en/unisex/shoes/havaianas-disney-cars-kids-red-and-white-flip-flops_p409217.html"
    },
    "directAdd": false
  },
  {
    "id": "409238",
    "price": "35,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1779452550_6a17485d7d1b1ddf932f7206a411c3c1.jpg",
    "names": {
      "pt": "Chinelos Havaianas Brasil Twist Pretos",
      "es": "Chanclas Havaianas Brasil Twist Negras",
      "en": "Havaianas Brasil Twist Black Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/masculino/calcado/chinelos-havaianas-brasil-twist-pretos_p409238.html",
      "es": "https://www.bzronline.com/es/masculino/calzado/chanclas-havaianas-brasil-twist-negras_p409238.html",
      "en": "https://www.bzronline.com/en/male/shoes/havaianas-brasil-twist-black-flip-flops_p409238.html"
    },
    "directAdd": false
  },
  {
    "id": "409278",
    "price": "37,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1780064084_0dae176804b81649c9f5e23c19801a4c.jpg",
    "names": {
      "pt": "Mala Pequena Havaianas Casual II Cinzenta e Prateada",
      "es": "Bolso Havaianas Casual II Gris y Plateado",
      "en": "Havaianas Casual II Grey and Silver Purse"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-casual-ii-cinzenta-e-prateada_p409278.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bolso-havaianas-casual-ii-gris-y-plateado_p409278.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-casual-ii-grey-and-silver-purse_p409278.html"
    },
    "directAdd": true
  },
  {
    "id": "409279",
    "price": "37,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1780062890_438726635d8718abf4ea2db49e27b7ee.jpg",
    "names": {
      "pt": "Mala Pequena Havaianas Casual II Bege",
      "es": "Bolso Havaianas Casual II Beige",
      "en": "Havaianas Casual II Beige Purse"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-casual-ii-bege_p409279.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bolso-havaianas-casual-ii-beige_p409279.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-casual-ii-beige-purse_p409279.html"
    },
    "directAdd": true
  },
  {
    "id": "409281",
    "price": "37,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1780062254_15c9d593a65bb5b7a6a0a75d81da3f7c.jpg",
    "names": {
      "pt": "Mala Pequena Havaianas Casual II Preta",
      "es": "Bolso Havaianas Casual II Negro",
      "en": "Havaianas Casual II Black Purse"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-casual-ii-preta_p409281.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bolso-havaianas-casual-ii-negro_p409281.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-casual-ii-black-purse_p409281.html"
    },
    "directAdd": true
  },
  {
    "id": "409302",
    "price": "29,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1780054300_6146b3d77895bc3731e0b6e8fb2ebc99.jpg",
    "names": {
      "pt": "Chinelos Havaianas Top Copacabana",
      "es": "Chanclas Havaianas Top Copacabana",
      "en": "Havaianas Top Copacabana Flip Flops"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/calcado/chinelos-havaianas-top-copacabana_p409302.html",
      "es": "https://www.bzronline.com/es/femenino/calzado/chanclas-havaianas-top-copacabana_p409302.html",
      "en": "https://www.bzronline.com/en/female/shoes/havaianas-top-copacabana-flip-flops_p409302.html"
    },
    "directAdd": false
  },
  {
    "id": "409312",
    "price": "21,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1780070598_b711a01ce0486f76b14b91b3479ad149.jpg",
    "names": {
      "pt": "Mala Pequena Havaianas Mini Bag Plus Glitter Rosa",
      "es": "Bolso Havaianas Mini Bag Plus Glitter Rosa",
      "en": "Havaianas Mini Bag Plus Glitter Pink Purse"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-mini-bag-plus-glitter-rosa_p409312.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bolso-havaianas-mini-bag-plus-glitter-rosa_p409312.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-mini-bag-plus-glitter-pink-purse_p409312.html"
    },
    "directAdd": true
  },
  {
    "id": "409418",
    "price": "26,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1780497155_10e5bfe9ccf00d7021db61cc5dd89489.jpg",
    "names": {
      "pt": "Necessaire Havaianas Beach Glitter Rosa",
      "es": "Necessaire Havaianas Beach Glitter Rosa",
      "en": "Havaianas Beach Glitter Pink Necessaire"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/necessaire-havaianas-beach-glitter-rosa_p409418.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/necessaire-havaianas-beach-glitter-rosa_p409418.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-beach-glitter-pink-necessaire_p409418.html"
    },
    "directAdd": true
  },
  {
    "id": "409419",
    "price": "23,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1780399545_63246f938c52876eb7f63c4b763d64df.jpg",
    "names": {
      "pt": "Bolsa a Tiracolo Havaianas Street Bag Glitter Rosa",
      "es": "Bandolera Havaianas Street Bag Glitter Rosa",
      "en": "Havaianas Street Bag Glitter Pink Crossbody Bag"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/bolsa-a-tiracolo-havaianas-street-bag-glitter-rosa_p409419.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bandolera-havaianas-street-bag-glitter-rosa_p409419.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-street-bag-glitter-pink-crossbody-bag_p409419.html"
    },
    "directAdd": true
  },
  {
    "id": "409457",
    "price": "54,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1780493957_a207f1a3ec940d59ae5d08a570af9f35.jpg",
    "names": {
      "pt": "Mala Grande Havaianas Puff Beach Verde",
      "es": "Bolso Tote Havaianas Puff Beach Verde",
      "en": "Havaianas Puff Beach Green Tote"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/mala-grande-havaianas-puff-beach-verde_p409457.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bolso-tote-havaianas-puff-beach-verde_p409457.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-puff-beach-green-tote_p409457.html"
    },
    "directAdd": true
  },
  {
    "id": "409461",
    "price": "54,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1780494629_6ac705b41f2b1bb3f7c7957b1880d051.jpg",
    "names": {
      "pt": "Mala Grande Havaianas Puff Beach Bege",
      "es": "Bolso Tote Havaianas Puff Beach Beige",
      "en": "Havaianas Puff Beach Beige Tote"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/mala-grande-havaianas-puff-beach-bege_p409461.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bolso-tote-havaianas-puff-beach-beige_p409461.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-puff-beach-beige-tote_p409461.html"
    },
    "directAdd": true
  },
  {
    "id": "409569",
    "price": "23,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1782919708_cb70fe979fcef119e88d089ccfcfc0ba.jpg",
    "names": {
      "pt": "Mala Pequena Havaianas Chain II Chrome Bege",
      "es": "Bolso Havaianas Chain II Chrome Beige",
      "en": "Havaianas Chain II Chrome Beige Purse"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-chain-ii-chrome-bege_p409569.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bolso-havaianas-chain-ii-chrome-beige_p409569.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-chain-ii-chrome-beige-purse_p409569.html"
    },
    "directAdd": true
  },
  {
    "id": "409570",
    "price": "23,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1782920910_25713fc51982b953ca9c78db98540122.jpg",
    "names": {
      "pt": "Mala Pequena Havaianas Chain II Chrome Cinzenta e Prateada",
      "es": "Bolso Havaianas Chain II Chrome Gris y Plateado",
      "en": "Havaianas Chain II Chrome Grey and Silver Purse"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/mala-pequena-havaianas-chain-ii-chrome-cinzenta-e-prateada_p409570.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bolso-havaianas-chain-ii-chrome-gris-y-plateado_p409570.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-chain-ii-chrome-grey-and-silver-purse_p409570.html"
    },
    "directAdd": true
  },
  {
    "id": "409806",
    "price": "23,99 \u20ac",
    "image": "https://1565619539.rsc.cdn77.org/temp/1781526517_02899e5d0693cae2153b1e99e9f51ae3.jpg",
    "names": {
      "pt": "Saco de Praia Havaianas XL Print Frutado",
      "es": "Bolso de Playa Havaianas XL Print Fruta",
      "en": "Havaianas XL Print Fruit Beach Bag"
    },
    "urls": {
      "pt": "https://www.bzronline.com/pt/feminino/acessorios/saco-de-praia-havaianas-xl-print-frutado_p409806.html",
      "es": "https://www.bzronline.com/es/femenino/accesorios/bolso-de-playa-havaianas-xl-print-fruta_p409806.html",
      "en": "https://www.bzronline.com/en/female/accessories/havaianas-xl-print-fruit-beach-bag_p409806.html"
    },
    "directAdd": true
  }
];
  
  // Mapear dinamicamente os produtos para o idioma atual em tempo de execução
  const campaignProducts = rawProducts.map(p => {
    return {
      id: p.id,
      name: p.names[lang] || p.names.pt,
      price: p.price,
      image: p.image,
      url: p.urls[lang] || p.urls.pt,
      directAdd: p.directAdd
    };
  });

  // CSS DO CARD (Checkout, Mini-cart e Recomendação) super polido e responsivo
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
          
          #mm-promo-card .mm-products-grid {
            display: flex; gap: 0; overflow-x: auto;
            scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;
            scrollbar-width: none; width: 100%; box-sizing: border-box;
          }
          #mm-promo-card .mm-products-grid::-webkit-scrollbar { display: none; }
          #mm-promo-card .mm-product-card {
            display: flex; width: 100%; flex: 0 0 100%;
            scroll-snap-align: start; padding: 10px; border: 1px solid #e6e6e6;
            box-sizing: border-box; margin: 0;
          }
          #mm-promo-card .mm-dots { display: flex; justify-content: center; align-items: center; gap: 4px; margin-top: 14px; }
          #mm-promo-card .mm-dot { width: 16px; height: 16px; background: transparent; cursor: pointer; display: inline-block; padding: 4px; box-sizing: border-box; }
          #mm-promo-card .mm-dot::after { content: ''; display: block; width: 8px; height: 8px; border-radius: 50%; background: #e0e0e0; transition: background 0.2s; }
          #mm-promo-card .mm-dot.active::after { background: #111; }
        }

        /* --- ESTILOS DO CARD DO MINI-CART E RECOMENDAÇÃO --- */
        #mm-minicart-promo-card, #mm-reccart-promo-card {
          width: 100%; border: 1px solid #e6e6e6; border-radius: 8px; background: #fff;
          padding: 16px; margin: 15px 0 20px 0; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.01);
          font-family: 'Roboto', 'RobotoCondensed', sans-serif; text-align: left; box-sizing: border-box;
        }
        #mm-minicart-promo-card .mm-promo-header, #mm-reccart-promo-card .mm-promo-header { display: flex; align-items: center; gap: 14px; }
        #mm-minicart-promo-card .mm-promo-header.has-products, #mm-reccart-promo-card .mm-promo-header.has-products { margin-bottom: 16px; }
        #mm-minicart-promo-card .mm-promo-icon-wrap, #mm-reccart-promo-card .mm-promo-icon-wrap {
          width: 60px; height: 60px; border: 1px solid #e6e6e6; border-radius: 6px;
          overflow: hidden; display: flex; align-items: center; justify-content: center;
          background: #fff; flex-shrink: 0;
        }
        #mm-minicart-promo-card .mm-promo-icon-wrap img, #mm-reccart-promo-card .mm-promo-icon-wrap img { width: 100%; height: 100%; object-fit: cover; }
        #mm-minicart-promo-card .mm-promo-info, #mm-reccart-promo-card .mm-promo-info { flex-grow: 1; min-width: 0; }
        #mm-minicart-promo-card .mm-promo-title, #mm-reccart-promo-card .mm-promo-title { font-size: 13px; font-weight: 800; text-transform: uppercase; color: #111; line-height: 1.2; letter-spacing: 0.1px; }
        #mm-minicart-promo-card .mm-promo-subtitle, #mm-reccart-promo-card .mm-promo-subtitle { font-size: 11px; color: #666; margin-top: 3px; line-height: 1.25; }
        #mm-minicart-promo-card .mm-progress-container, #mm-reccart-promo-card .mm-progress-container { width: 100%; height: 6px; background: #f0f0f0; border-radius: 3px; margin-top: 8px; overflow: hidden; }
        #mm-minicart-promo-card .mm-progress-bar, #mm-reccart-promo-card .mm-progress-bar { height: 100%; background: linear-gradient(90deg, #4ebf4e, #66bb6a); border-radius: 3px; transition: width 0.6s ease-in-out; }
        
        #mm-minicart-promo-card .mm-products-grid, #mm-reccart-promo-card .mm-products-grid {
          display: flex; gap: 0; overflow-x: auto;
          scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;
          scrollbar-width: none; width: 100%; box-sizing: border-box;
        }
        #mm-minicart-promo-card .mm-products-grid::-webkit-scrollbar, #mm-reccart-promo-card .mm-products-grid::-webkit-scrollbar { display: none; }
        #mm-minicart-promo-card .mm-product-card, #mm-reccart-promo-card .mm-product-card {
          display: flex; width: 100%; flex: 0 0 100%; scroll-snap-align: start;
          align-items: center; justify-content: space-between;
          border: 1px solid #e6e6e6; border-radius: 6px; padding: 10px; background: #fff; box-sizing: border-box;
          text-decoration: none; color: #111; margin: 0;
        }
        
        #mm-minicart-promo-card .mm-product-left, #mm-reccart-promo-card .mm-product-left { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        #mm-minicart-promo-card .mm-product-left img, #mm-reccart-promo-card .mm-product-left img { max-width: 100%; max-height: 100%; object-fit: contain; }
        #mm-minicart-promo-card .mm-product-mid, #mm-reccart-promo-card .mm-product-mid { flex-grow: 1; padding: 0 8px; min-width: 0; }
        #mm-minicart-promo-card .mm-product-brand, #mm-reccart-promo-card .mm-product-brand { font-size: 8px; text-transform: uppercase; color: #888; font-weight: 700; margin-bottom: 1px; }
        #mm-minicart-promo-card .mm-product-name, #mm-reccart-promo-card .mm-product-name {
          font-size: 10px; font-weight: 500; color: #111; line-height: 1.2;
          height: 24px; overflow: hidden; text-overflow: ellipsis;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
        }
        #mm-minicart-promo-card .mm-product-price, #mm-reccart-promo-card .mm-product-price { font-size: 10px; font-weight: 700; color: #111; margin-top: 1px; }
        #mm-minicart-promo-card .mm-product-right, #mm-reccart-promo-card .mm-product-right { flex-shrink: 0; }
        #mm-minicart-promo-card .mm-product-add-btn, #mm-reccart-promo-card .mm-product-add-btn {
          background: #fff; border: 1px solid #cccccc; border-radius: 4px; padding: 6px 8px;
          font-size: 8px; font-weight: 700; text-transform: uppercase; color: #111; cursor: pointer; transition: all 0.2s;
        }
        #mm-minicart-promo-card .mm-product-add-btn:hover, #mm-reccart-promo-card .mm-product-add-btn:hover { background: #111; color: #fff; border-color: #111; }
        
        #mm-minicart-promo-card .mm-dots, #mm-reccart-promo-card .mm-dots { display: flex; justify-content: center; align-items: center; gap: 4px; margin-top: 10px; }
        #mm-minicart-promo-card .mm-dot, #mm-reccart-promo-card .mm-dot {
          width: 12px; height: 12px; background: transparent; cursor: pointer; display: inline-block; padding: 2px; box-sizing: border-box;
        }
        #mm-minicart-promo-card .mm-dot::after, #mm-reccart-promo-card .mm-dot::after {
          content: ''; display: block; width: 6px; height: 6px; border-radius: 50%; background: #e0e0e0; transition: background 0.2s;
        }
        #mm-minicart-promo-card .mm-dot.active::after, #mm-reccart-promo-card .mm-dot.active::after { background: #111; }
      </style>
    `);
  }

  // Extrator super robusto de IDs a partir de caminhos e parâmetros URL do BZR
  function extractProductIdFromUrl(url) {
    if (!url) return null;
    const match = url.match(/_p(\d+)/) || url.match(/item_(\d+)/) || url.match(/_p=(\d+)/) || url.match(/\/p(\d+)\.html/);
    if (match) return match[1];
    
    const fallbackMatch = url.match(/_(\d+)\.html/) || url.match(/(\d+)\.html/);
    if (fallbackMatch) return fallbackMatch[1];
    
    return null;
  }

  // Obter IDs únicos de todos os produtos que estão no carrinho (DOM-based)
  function getCartProductIds() {
    const ids = [];
    
    // Ler de ambos os popups analisando todos os links
    $('#rdc-mini-cart .rdc-mini-cart-product, #recomendation-cart-right-bar .rdc-mini-cart-product').each(function() {
      $(this).find('a').each(function() {
        const href = $(this).attr('href') || '';
        const id = extractProductIdFromUrl(href);
        if (id && !ids.includes(id)) {
          ids.push(id);
        }
      });
    });

    // Ler do Checkout DOM
    $('.rdc-shop-prd').each(function() {
      $(this).find('a').each(function() {
        const href = $(this).attr('href') || '';
        const id = extractProductIdFromUrl(href);
        if (id && !ids.includes(id)) {
          ids.push(id);
        }
      });
    });

    return ids;
  }

  // Obter contagem de Havaianas sem contar em duplicado os produtos repetidos nas divs de transição ("Adicionado" vs "Carrinho")
  function getHavaianasCount() {
    const productsMap = {}; // ID -> Qtd Max

    // Se for a página de Checkout:
    if (window.location.href.includes('checkout')) {
      let count = 0;
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

    // Nos popups (Mini-cart e Recomendações):
    const $activePopup = $('#rdc-mini-cart:visible, #recomendation-cart-right-bar:visible');
    const $target = $activePopup.length > 0 ? $activePopup : $('body');
    
    $target.find('.rdc-mini-cart-product').each(function () {
      let id = null;
      $(this).find('a').each(function() {
        const href = $(this).attr('href') || '';
        id = extractProductIdFromUrl(href);
        if (id) return false; // Parar o loop interno
      });
      
      if (!id) return;

      const title = $(this).find('.rdc-mini-cart-product-name_title').text();
      const brand = $(this).find('.rdc-mini-cart-product-brand').text();
      
      if (brand.toLowerCase().includes('havaianas') || title.toLowerCase().includes('havaianas')) {
        const qtdText = $(this).find('.rdc-mini-cart-product-name_qtd').text() || '1';
        const qty = parseInt(qtdText.replace('x', '').trim(), 10) || 1;
        
        // Mantém a maior quantidade encontrada no popup para o mesmo produto (evita a duplicação do "Adicionado recentemente")
        if (!productsMap[id] || qty > productsMap[id]) {
          productsMap[id] = qty;
        }
      }
    });

    let total = 0;
    for (const id in productsMap) {
      total += productsMap[id];
    }
    return total;
  }

  // Obter sugestões atualizadas filtrando artigos que já estão no carrinho
  function getUpdatedSuggestions() {
    const cartProductIds = getCartProductIds();
    let availableProducts = campaignProducts.filter(p => !cartProductIds.includes(p.id) && p.name && p.image);
    if (availableProducts.length === 0) {
      availableProducts = campaignProducts;
    }
    return availableProducts.sort(() => 0.5 - Math.random()).slice(0, 3);
  }

  let shuffledProducts = [];

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
      cardHtml += `<div class="mm-products-grid" onscroll="var i=Math.round(this.scrollLeft/this.clientWidth); var dots=this.nextElementSibling.children; for(var j=0;j<dots.length;j++){dots[j].className=(j===i)?'mm-dot active':'mm-dot';}">`;
      products.forEach((p, idx) => {
        cardHtml += `
          <div class="mm-product-card" data-index="${idx}">
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

  // ATUALIZA PROGRESSO EM QUALQUER POPUP E ATUALIZA SUGESTÕES SE UM PRODUTO SUGERIDO FOR ADICIONADO
  function updatePromoCardProgress($existing) {
    // DESLIGA O OBSERVADOR DURANTE A ESCRITA NO DOM (Evita loops infinitos)
    localObserver.disconnect();

    const count = getHavaianasCount();
    let percentage = count === 0 ? 0 : (count === 1 ? 50 : 100);
    let isUnlocked = count >= 2;
    let subtitleText = count === 0 
      ? t.subtitle0
      : (count === 1 ? t.subtitle1 : t.subtitleUnlocked);

    // Se um dos produtos atualmente sugeridos foi adicionado, re-filtra e atualiza a view do card
    const cartProductIds = getCartProductIds();
    const hasSuggestedInCart = shuffledProducts.some(p => cartProductIds.includes(p.id));
    if (hasSuggestedInCart && !isUnlocked) {
      shuffledProducts = getUpdatedSuggestions();
      $existing.remove(); // Remove o card do DOM
      reattachLocalObservers();
      return;
    }

    const $bar = $existing.find('.mm-progress-bar');
    if ($bar.length > 0) {
      const newWidth = percentage + '%';
      if ($bar.css('width') !== newWidth) {
        $bar.css('width', newWidth);
      }
      
      const $sub = $existing.find('.mm-promo-subtitle');
      if ($sub.html() !== subtitleText) {
        $sub.html(subtitleText);
      }
      
      const titleText = isUnlocked ? t.unlockedTitle : t.title;
      const $title = $existing.find('.mm-promo-title');
      if ($title.text() !== titleText) {
        $title.text(titleText);
      }

      if (isUnlocked) {
        $existing.find('.mm-products-grid, .mm-dots').hide();
        $existing.find('.mm-promo-header').removeClass('has-products');
      } else {
        $existing.find('.mm-products-grid, .mm-dots').show();
        $existing.find('.mm-promo-header').addClass('has-products');
      }
    }

    reattachLocalObservers();
  }

  // RENDER CARD NO MINI-CART OU RECOMENDAÇÃO
  let isInjecting = false;
  function injectPromoCard($popup, cardId) {
    if (isInjecting) return;

    const $productsList = $popup.find('.rdc-mini-cart-product');
    if ($productsList.length === 0) return;

    // Se já existe, atualiza progresso e regressa
    const $existing = $popup.find(cardId);
    if ($existing.length > 0) {
      updatePromoCardProgress($existing);
      return;
    }

    isInjecting = true;
    localObserver.disconnect(); // DESLIGA DURANTE A INJEÇÃO NO DOM (Evita loops)

    const count = getHavaianasCount();
    let percentage = count === 0 ? 0 : (count === 1 ? 50 : 100);
    let isUnlocked = count >= 2;
    let subtitleText = count === 0 
      ? t.subtitle0
      : (count === 1 ? t.subtitle1 : t.subtitleUnlocked);

    let cardHtml = `
      <div id="${cardId.replace('#', '')}">
        <div class="mm-promo-header dots ${isUnlocked ? '' : 'has-products'}">
          <div class="mm-promo-icon-wrap"><img src="${bagImage}" alt="Bolsa Havaianas"></div>
          <div class="mm-promo-info">
            <div class="mm-promo-title">${isUnlocked ? t.unlockedTitle : t.title}</div>
            <div class="mm-promo-subtitle">${subtitleText}</div>
            <div class="mm-progress-container"><div class="mm-progress-bar" style="width: ${percentage}%;"></div></div>
          </div>
        </div>
    `;

    if (!isUnlocked && shuffledProducts.length > 0) {
      cardHtml += `<div class="mm-products-grid" onscroll="var i=Math.round(this.scrollLeft/this.clientWidth); var dots=this.nextElementSibling.children; for(var j=0;j<dots.length;j++){dots[j].className=(j===i)?'mm-dot active':'mm-dot';}">`;
      shuffledProducts.forEach((p, idx) => {
        cardHtml += `
          <div class="mm-product-card" data-index="${idx}">
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

    // Injeta FORA do container de ng-repeat para evitar conflitos de compilação com o Angular
    const $productsContainer = $popup.find('.rdc-mini-cart-products');
    if ($productsContainer.length > 0) {
      $productsContainer.after(cardHtml);
    } else {
      const $lastProduct = $productsList.last();
      if ($lastProduct.length > 0) {
        $lastProduct.after(cardHtml);
      }
    }

    reattachLocalObservers();
    isInjecting = false;
  }

  // MutationObserver Local super restrito: escuta apenas alterações de adição/remoção direta de filhos nos wrappers do popup (subtree: false)
  // Isto elimina 100% de qualquer hipótese de loops infinitos causados por loaders animados, spinners, ou alterações de estilo
  const localObserver = new MutationObserver(function () {
    const $miniCart = $('#rdc-mini-cart');
    if ($miniCart.length > 0 && $miniCart.is(':visible')) {
      injectPromoCard($miniCart, '#mm-minicart-promo-card');
    }

    const $recCart = $('#recomendation-cart-right-bar');
    if ($recCart.length > 0 && $recCart.is(':visible')) {
      injectPromoCard($recCart, '#mm-reccart-promo-card');
    }
  });

  let miniCartObserved = false;
  let recCartObserved = false;

  // MutationObserver de apoio apenas para a raiz do body (subtree: false) para detetar a montagem inicial dos popups no DOM
  const bodyObserver = new MutationObserver(function () {
    const miniCartEl = document.getElementById('rdc-mini-cart');
    const recCartEl = document.getElementById('recomendation-cart-right-bar');

    if (miniCartEl && !miniCartObserved) {
      const miniCartBody = miniCartEl.querySelector('.rdc-wrapper-popup-body');
      if (miniCartBody) {
        localObserver.observe(miniCartBody, { childList: true, subtree: false });
        miniCartObserved = true;
      }
    }
    if (recCartEl && !recCartObserved) {
      const recCartBody = recCartEl.querySelector('.rdc-wrapper-popup-body');
      if (recCartBody) {
        localObserver.observe(recCartBody, { childList: true, subtree: false });
        recCartObserved = true;
      }
    }

    // Se ambos os bodies já estão sob escuta direta, desliga permanentemente o bodyObserver
    if (miniCartObserved && recCartObserved) {
      bodyObserver.disconnect();
    }
  });

  function reattachLocalObservers() {
    localObserver.disconnect();
    
    // Anexar observadores focados exclusivamente nos corpos dos popups com subtree: false (apenas adições e remoções de nós diretos)
    $('.rdc-wrapper-popup-body').each(function() {
      localObserver.observe(this, { childList: true, subtree: false });
    });
  }

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

    shuffledProducts = getUpdatedSuggestions();

    // Se for a página de Checkout, renderiza no checkout
    if (window.location.href.includes('checkout')) {
      renderCheckoutCard(shuffledProducts);
    }

    // Ligar observadores locais se os popups já existirem
    const miniCartEl = document.getElementById('rdc-mini-cart');
    const recCartEl = document.getElementById('recomendation-cart-right-bar');

    if (miniCartEl) {
      const miniCartBody = miniCartEl.querySelector('.rdc-wrapper-popup-body');
      if (miniCartBody) {
        localObserver.observe(miniCartBody, { childList: true, subtree: false });
        miniCartObserved = true;
      }
    }
    if (recCartEl) {
      const recCartBody = recCartEl.querySelector('.rdc-wrapper-popup-body');
      if (recCartBody) {
        localObserver.observe(recCartBody, { childList: true, subtree: false });
        recCartObserved = true;
      }
    }

    // Se algum dos elementos não existir, ativa o bodyObserver na raiz (sem subtree para evitar loops)
    if (!miniCartObserved || !recCartObserved) {
      bodyObserver.observe(document.body, { childList: true, subtree: false });
    }
    
    // Injeção imediata caso os elementos já estejam abertos
    const $miniCart = $('#rdc-mini-cart');
    if ($miniCart.length > 0 && $miniCart.is(':visible')) {
      injectPromoCard($miniCart, '#mm-minicart-promo-card');
    }
    const $recCart = $('#recomendation-cart-right-bar');
    if ($recCart.length > 0 && $recCart.is(':visible')) {
      injectPromoCard($recCart, '#mm-reccart-promo-card');
    }
  }

  (function retryInit() {
    let tries = 0; const maxTries = 50;
    const interval = setInterval(function () {
      tries++;
      const hasList = $('.wrapper-shoppingbag-product-list').length > 0 || $('#rdc-mini-cart').length > 0 || $('#recomendation-cart-right-bar').length > 0;
      if (hasList || tries >= maxTries) {
        clearInterval(interval);
        initPromo();
      }
    }, 100);
  })();

  // Controlos do carrossel (Dots) via Scroll Suave do CSS Snap
  $(document).on('click', '.mm-dot', function (e) {
    e.preventDefault();
    e.stopPropagation();
    const idx = parseInt($(this).attr('data-index'), 10);
    const $card = $(this).closest('#mm-promo-card, #mm-minicart-promo-card, #mm-reccart-promo-card');
    const grid = $card.find('.mm-products-grid')[0];
    if (grid) {
      grid.scrollTo({
        left: idx * grid.clientWidth,
        behavior: 'smooth'
      });
    }
    $card.find('.mm-dot').removeClass('active');
    $(this).addClass('active');
  });

  // Ação de clique em adicionar
  $(document).on('click', '.mm-product-add-btn', function (e) {
    e.preventDefault();
    const isDirect = $(this).attr('data-direct') === 'true';
    const productId = $(this).attr('data-id');

    if (isDirect && productId) {
      const pageId = typeof JSVars !== 'undefined' && JSVars.product && JSVars.product.id ? JSVars.product.id : '5';
      const pageCount = typeof JSVars !== 'undefined' && JSVars.product && JSVars.product.pageCount ? JSVars.product.pageCount : '1';
      const url = `/api/api.php/addToBasket/${pageId}/0/${productId}/1/${pageCount}`;
      
      if (!window.location.href.includes('checkout')) {
        sessionStorage.setItem('mm_reopen_cart', 'true');
      }

      $.ajax({
        url: url, type: 'GET',
        success: function () { location.reload(); },
        error: function () { alert("Sem stock!"); }
      });
    } else {
      const productUrl = $(this).attr('data-url');
      if (productUrl) {
        window.location.href = productUrl;
      }
    }
  });
})();
