document.addEventListener('DOMContentLoaded', function () {
  const script = document.currentScript;
  const shopLang = script?.getAttribute('data-shop-lang');
  const flagElement = document.querySelector('.rdc-packs-maingrid');

  if (!flagElement) return;

  const elementoParaMover = document.querySelector('.rdc-product-beforebuttons');
  const elementoAlvo = document.querySelector('.wrapper-accordion-info');
  const klarnaOriginal = document.querySelector('.rdc-product-klarna-placement');
  const botaoAlvo = document.querySelector('#fixedDiv .buttons.clearfix');

  // mover bloco
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

    // ⚠️ O botão fica no ORIGINAL (não no clone)
    klarnaOriginal.innerHTML = `<img src="https://www.bzronline.com/downloads/${imageName}" id="meuBotaoPacks" style="cursor:pointer;" />`;
  }

  // ligar o clique AO VIVO (depois de injetar o HTML)
  const botao = document.getElementById('meuBotaoPacks');
  if (!botao) return;

  botao.addEventListener('click', function () {
    const destino = document.querySelector('.rdc-packs-maingrid');
    if (!destino) return;

    const headerOffset = 250; // ajusta conforme a altura do header fixo
    const elementTop = destino.getBoundingClientRect().top + window.pageYOffset;
    const offsetTop = elementTop - headerOffset;

    // ✅ usar scrollTo para compensar o offset
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  });
});
