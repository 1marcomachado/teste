document.addEventListener('DOMContentLoaded', function () {
  const script = document.currentScript;
  const shopLang = script?.getAttribute('data-shop-lang');

  const reservaKeywords = ['reserva', 'book', 'ahora', 'agora'];

  const flagElement = Array.from(document.querySelectorAll('.flag')).find(el => {
    const bgColor = el.style.backgroundColor.trim().toLowerCase();
    const text = el.textContent.trim().toLowerCase();
    return (
      (bgColor === '#38d430' || bgColor === 'rgb(56, 212, 48)') &&
      reservaKeywords.some(keyword => text.includes(keyword))
    );
  });

  if (flagElement) {

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

      const klarnaImgMap = {
        pt: 'misc29.jpg.svg',
        es: 'misc29.jpg.svg',
        en: 'misc29.jpg.svg',
      };

      const langPrefix = (shopLang || '').substring(0, 2);
      const imageName = klarnaImgMap[langPrefix] || 'misc29.jpg.svg';

      klarnaOriginal.innerHTML = `<img src="https://www.bzronline.com/downloads/${imageName}"/>`;
    }
  }
});
