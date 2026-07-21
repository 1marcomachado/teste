const script = document.currentScript;
document.addEventListener('DOMContentLoaded', function () {
  // ==========================================
  // 1) VERIFICAÇÃO: Rodar APENAS para sapatilhas
  // ==========================================
  const isSapatilhas = /sapatilhas|zapatillas|sneakers/i.test(window.location.pathname);
  if (!isSapatilhas) {
    console.log("[Klarna Banner] Não é uma página de sapatilhas. Script encerrado.");
    return;
  }

  // ==========================================
  // 2) DETECTAR IDIOMA (Com múltiplos fallbacks)
  // ==========================================
  const htmlLang = document.documentElement.lang;
  const pathLang = window.location.pathname.split('/').find(p => ['pt', 'en', 'es'].includes(p.toLowerCase()));
  const scriptLang = script?.getAttribute('data-shop-lang');

  const langPrefix = (htmlLang || pathLang || scriptLang || 'pt').substring(0, 2).toLowerCase();

  // ==========================================
  // 3) COMPONENTES DA PÁGINA
  // ==========================================
  const elementoParaMover = document.querySelector('.rdc-product-beforebuttons');
  const elementoAlvo = document.querySelector('.wrapper-accordion-info');
  const klarnaOriginal = document.querySelector('.rdc-product-klarna-placement');
  const botaoAlvo = document.querySelector('#fixedDiv .buttons.clearfix');

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

  // clonar klarna e injetar imagem
  if (klarnaOriginal && botaoAlvo && botaoAlvo.parentNode) {
    const klarnaClone = klarnaOriginal.cloneNode(true);
    klarnaClone.style.paddingBottom = '10px';
    botaoAlvo.parentNode.insertBefore(klarnaClone, botaoAlvo);

    const klarnaImgMap = { pt: 'misc48.jpg', en: 'misc49.jpg', es: 'misc51.jpg' };
    
    // Textos descritivos dinâmicos para SEO / Acessibilidade
    const altMap = {
      pt: 'Na compra de umas sapatilhas recebe uma toalhita crep protect grátis',
      es: 'Con la compra de unas zapatillas recibe una toallita crep protect gratis',
      en: 'With the purchase of sneakers receive a free crep protect wipe'
    };

    const imageName = klarnaImgMap[langPrefix] || 'misc48.jpg';
    const altText = altMap[langPrefix] || altMap['pt'];

    // Substitui com o banner estático
    klarnaOriginal.innerHTML = `<img src="https://www.bzronline.com/downloads/${imageName}" id="ofertacrep" alt="${altText}" />`;
  }
});
