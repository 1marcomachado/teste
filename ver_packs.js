document.addEventListener('DOMContentLoaded', function () {
  const script = document.currentScript;
  const shopLang = script?.getAttribute('data-shop-lang');
  const flagElement = document.querySelector('.rdc-packs-maingrid');
  if (!flagElement) return;

  // =======================
  // 1) MOVER AS DIVs
  // =======================
  const visual = document.querySelector('[ng-controller="visualPagerBlocksController"]');
  const product = document.querySelector('[ng-controller="productPacksGroupController"]');

  if (visual && product && product.parentNode) {
    // só move se ainda não estiver antes
    const alreadyBefore = visual.compareDocumentPosition(product) & Node.DOCUMENT_POSITION_FOLLOWING;
    if (!alreadyBefore) {
      product.parentNode.insertBefore(visual, product);
    }
  }

  // =======================
  // 2) RESTO DO SEU SCRIPT
  // =======================
  const elementoParaMover = document.querySelector('.rdc-product-beforebuttons');
  const elementoAlvo = document.querySelector('.wrapper-accordion-info');
  const klarnaOriginal = document.querySelector('.rdc-product-klarna-placement');
  const botaoAlvo = document.querySelector('#fixedDiv .buttons.clearfix');

  // helper para rolar com offset (header fixo, etc.)
  function scrollToWithOffset(el, offset) {
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - (offset || 0);
    window.scrollTo({ top, behavior: 'smooth' });
  }

  // mover bloco "beforebuttons" para antes do "wrapper-accordion-info"
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

  // clonar klarna e injetar imagem/botão
  if (klarnaOriginal && botaoAlvo && botaoAlvo.parentNode) {
    const klarnaClone = klarnaOriginal.cloneNode(true);
    klarnaClone.style.paddingBottom = '10px';
    botaoAlvo.parentNode.insertBefore(klarnaClone, botaoAlvo);

    const klarnaImgMap = { pt: 'misc35.jpg', es: 'misc35.jpg', en: 'misc35.jpg' };
    const langPrefix = (shopLang || '').substring(0, 2);
    const imageName = klarnaImgMap[langPrefix] || 'misc35.jpg';

    // botão vai no ORIGINAL
    klarnaOriginal.innerHTML = `<img src="https://www.bzronline.com/downloads/${imageName}" id="meuBotaoPacks" style="cursor:pointer;" alt="Ver packs" />`;
  }

  // ligar o clique do botão para ir ao "visual" (fallback: .rdc-packs-maingrid)
  const botao = document.getElementById('meuBotaoPacks');
  if (!botao) return;

  botao.addEventListener('click', function () {
    let destino = document.querySelector('[ng-controller="visualPagerBlocksController"]') 
               || document.querySelector('.rdc-packs-maingrid');
    if (!destino) return;

    const headerOffset = 100; // ajuste conforme o header fixo
    scrollToWithOffset(destino, headerOffset);
  });
});
