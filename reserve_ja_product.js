document.addEventListener('DOMContentLoaded', function () {
  const script = document.currentScript;
  const shopLang = script?.getAttribute('data-shop-lang')?.toLowerCase() || 'pt';
  const langPrefix = shopLang.substring(0, 2);

  // Mapa fixo: referência -> idioma -> imagem
  const imagemPorReferenciaELang = {
    // 16 de junho
    JN9944: { pt: 'misc30.jpg.svg', es: 'misc31.jpg.svg', en: 'misc32.jpg.svg' },
    JD1408: { pt: 'misc30.jpg.svg', es: 'misc31.jpg.svg', en: 'misc32.jpg.svg' },
    JD1405: { pt: 'misc30.jpg.svg', es: 'misc31.jpg.svg', en: 'misc32.jpg.svg' },
    JN9946: { pt: 'misc30.jpg.svg', es: 'misc31.jpg.svg', en: 'misc32.jpg.svg' },
    JN9940: { pt: 'misc30.jpg.svg', es: 'misc31.jpg.svg', en: 'misc32.jpg.svg' },
    JN9948: { pt: 'misc30.jpg.svg', es: 'misc31.jpg.svg', en: 'misc32.jpg.svg' },
    JN9947: { pt: 'misc30.jpg.svg', es: 'misc31.jpg.svg', en: 'misc32.jpg.svg' },
    JD1403: { pt: 'misc30.jpg.svg', es: 'misc31.jpg.svg', en: 'misc32.jpg.svg' },

    // 20 de junho
    JP4013: { pt: 'misc29.jpg.svg', es: 'misc33.jpg.svg', en: 'misc34.jpg.svg' },
    JP4154: { pt: 'misc29.jpg.svg', es: 'misc33.jpg.svg', en: 'misc34.jpg.svg' },
    JN8884: { pt: 'misc29.jpg.svg', es: 'misc33.jpg.svg', en: 'misc34.jpg.svg' },
    JP3991: { pt: 'misc29.jpg.svg', es: 'misc33.jpg.svg', en: 'misc34.jpg.svg' },
    JN8870: { pt: 'misc29.jpg.svg', es: 'misc33.jpg.svg', en: 'misc34.jpg.svg' },
    JN8887: { pt: 'misc29.jpg.svg', es: 'misc33.jpg.svg', en: 'misc34.jpg.svg' },
    JJ1931: { pt: 'misc29.jpg.svg', es: 'misc33.jpg.svg', en: 'misc34.jpg.svg' },
    JN8889: { pt: 'misc29.jpg.svg', es: 'misc33.jpg.svg', en: 'misc34.jpg.svg' }
  };

  // Obter a referência do produto
  let referenciaLimpa = null;
  const referenciaEl = document.querySelector('.ref p.small');
  if (referenciaEl) {
    const refText = referenciaEl.textContent.trim();
    referenciaLimpa = refText.replace(/^#/, '').split('|')[0].trim();
  }

  // Só continua se existir imagem mapeada para a referência e idioma
  if (referenciaLimpa && imagemPorReferenciaELang[referenciaLimpa]?.[langPrefix]) {
    const imagem = imagemPorReferenciaELang[referenciaLimpa][langPrefix];

    const elementoParaMover = document.querySelector('.rdc-product-beforebuttons');
    const elementoAlvo = document.querySelector('.wrapper-accordion-info');
    const klarnaOriginal = document.querySelector('.rdc-product-klarna-placement');
    const botaoAlvo = document.querySelector('#fixedDiv .buttons.clearfix');

    // Move o bloco
    if (elementoParaMover && elementoAlvo && elementoAlvo.parentNode) {
      elementoAlvo.parentNode.insertBefore(elementoParaMover, elementoAlvo);
      elementoAlvo.style.padding = '0';
      Object.assign(elementoParaMover.style, {
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingLeft: '0',
        paddingRight: '0'
      });
    }

    // Clona Klarna e troca imagem
    if (klarnaOriginal && botaoAlvo && botaoAlvo.parentNode) {
      const klarnaClone = klarnaOriginal.cloneNode(true);
      klarnaClone.style.paddingBottom = '10px';
      botaoAlvo.parentNode.insertBefore(klarnaClone, botaoAlvo);

      klarnaOriginal.innerHTML = `<img src="https://www.bzronline.com/downloads/${imagem}">`;
    }
  }
});
