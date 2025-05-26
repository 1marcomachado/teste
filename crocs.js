 const script = document.currentScript;
 const shopLang = script.getAttribute('data-shop-lang');
 document.addEventListener('DOMContentLoaded', function () {
  const brandElement = document.querySelector('.brand h2');

    if (brandElement && brandElement.textContent.trim().toLowerCase() === 'crocs') {
    const elementoParaMover = document.querySelector('.rdc-product-beforebuttons');
    const elementoAlvo = document.querySelector('.wrapper-accordion-info');
    const klarnaOriginal = document.querySelector('.rdc-product-klarna-placement');
    const botaoAlvo = document.querySelector('#fixedDiv .buttons.clearfix');

    if (elementoParaMover && elementoAlvo && elementoAlvo.parentNode) {
      elementoAlvo.parentNode.insertBefore(elementoParaMover, elementoAlvo);
      elementoAlvo.style.padding = '0';
      elementoParaMover.style.paddingTop = '10px';
      elementoParaMover.style.paddingBottom = '10px';
      elementoParaMover.style.paddingLeft = '0';
      elementoParaMover.style.paddingRight = '0';
    }

    if (klarnaOriginal && botaoAlvo && botaoAlvo.parentNode) {
      const klarnaClone = klarnaOriginal.cloneNode(true);
      klarnaClone.style.paddingBottom = '10px';
      botaoAlvo.parentNode.insertBefore(klarnaClone, botaoAlvo);
      if (typeof shopLang !== 'undefined' && shopLang.startsWith('pt')) {
        const klarnaOriginal = document.querySelector('.rdc-product-klarna-placement');

        if (klarnaOriginal) {
          klarnaOriginal.innerHTML = `<img src="https://www.bzronline.com/downloads/misc15.jpg.svg"/>`;
        }
      }else if (typeof shopLang !== 'undefined' && shopLang.startsWith('es')) {
        const klarnaOriginal = document.querySelector('.rdc-product-klarna-placement');

        if (klarnaOriginal) {
          klarnaOriginal.innerHTML = `<img src="https://www.bzronline.com/downloads/misc14.jpg.svg"/>`;
        }
      }else if (typeof shopLang !== 'undefined' && shopLang.startsWith('en')) {
        const klarnaOriginal = document.querySelector('.rdc-product-klarna-placement');

        if (klarnaOriginal) {
          klarnaOriginal.innerHTML = `<img src="https://www.bzronline.com/downloads/misc16.jpg.svg"/>`;
        }
      }else{
        const klarnaOriginal = document.querySelector('.rdc-product-klarna-placement');

        if (klarnaOriginal) {
          klarnaOriginal.innerHTML = `<img src="https://www.bzronline.com/downloads/misc15.jpg.svg"/>`;
        }
      }
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const brandElement = document.querySelector('.brand h2');

  if (brandElement && brandElement.textContent.trim().toLowerCase() === 'crocs') {
    // A marca é Crocs
    console.log('Marca validada: Crocs');

    // Podes executar aqui qualquer lógica adicional, por exemplo:
    // mudar imagem, mostrar texto, etc.
  }
});

