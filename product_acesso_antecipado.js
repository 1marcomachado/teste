document.addEventListener('DOMContentLoaded', function () {

  const norm = s => (s || '')
    .toString()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

  const acesso_antecpiado_variants = [
    'acesso antecipado -20%',
    'early access -20%',
    'acceso anticipado -20%'
  ].map(norm);

  function hasLastUnitsFlag() {
    const flags = Array.from(document.querySelectorAll('.product-info .flags .flag'));
    return flags.some(f => acesso_antecpiado_variants.includes(norm(f.textContent)));
  }

  const script = document.currentScript;
  const shopLang = script?.getAttribute('data-shop-lang');
  if (!hasLastUnitsFlag()) return;

  // ============================================================
  // 1) MOVER AS DIVs
  // ============================================================
  const visual = document.querySelector('[ng-controller="visualPagerBlocksController"]');
  const product = document.querySelector('[ng-controller="productPacksGroupController"]');

  if (visual && product && product.parentNode) {
    const alreadyBefore = visual.compareDocumentPosition(product) & Node.DOCUMENT_POSITION_FOLLOWING;
    if (!alreadyBefore) {
      product.parentNode.insertBefore(visual, product);
    }
  }

  // ============================================================
  // 2) RESTO DO TEU SCRIPT
  // ============================================================
  const elementoParaMover = document.querySelector('.rdc-product-beforebuttons');
  const elementoAlvo = document.querySelector('.wrapper-accordion-info');
  const klarnaOriginal = document.querySelector('.rdc-product-klarna-placement');
  const botaoAlvo = document.querySelector('#fixedDiv .buttons.clearfix');

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

  if (klarnaOriginal && botaoAlvo && botaoAlvo.parentNode) {
    const klarnaClone = klarnaOriginal.cloneNode(true);
    klarnaClone.style.paddingBottom = '10px';
    botaoAlvo.parentNode.insertBefore(klarnaClone, botaoAlvo);

    const klarnaImgMap = { pt: 'misc43.jpg', es: 'misc42.jpg', en: 'misc44.jpg?v=1' };
    const langPrefix = (shopLang || '').substring(0, 2);
    const imageName = klarnaImgMap[langPrefix] || 'misc36.jpg';

    klarnaOriginal.innerHTML = `
      <img src="https://www.bzronline.com/downloads/${imageName}" />
    `;
  }

});
