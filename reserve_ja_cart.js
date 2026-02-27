document.addEventListener('DOMContentLoaded', function () {
  const script = document.currentScript;
  const shopLang = script?.getAttribute('data-shop-lang')?.toLowerCase() || 'pt';

  const referenciasDesejadas = new Set(['U2000-4JQ']); // inclui mobile

  const mensagens = {
    pt: 'O envio deste artigo está previsto para 11 de março. <span style="color: #35cf2d;">RESERVA-O AGORA ANTES QUE ESGOTE!</span>',
    es: 'El envío de este artículo está previsto para el 11 de marzo. <span style="color: #35cf2d;">¡RESÉRVALO AHORA ANTES DE QUE SE AGOTE!</span>',
    en: 'Shipping for this item is expected by March 11. <span style="color: #35cf2d;">PRE-ORDER IT NOW BEFORE IT SELLS OUT!</span>'
  };

  const langPrefix = shopLang.substring(0, 2);
  const mensagemFinal = mensagens[langPrefix] || mensagens['pt'];

  const blocosProduto = document.querySelectorAll('.rdc-shop-prd-primary-information');

  blocosProduto.forEach(bloco => {
    let referenciaLimpa = null;

    const referenciaEl = bloco.querySelector('.rdc-shop-prd-reference-value');
    if (referenciaEl) {
      const referenciaCompleta = referenciaEl.textContent.trim();
      referenciaLimpa = referenciaCompleta.replace(/^#/, '').split('|')[0].trim();
    }

    if (!referenciaLimpa) {
      const titulo = bloco.querySelector('.rdc-shop-prd-title');
      if (titulo) {
        const match = titulo.textContent.match(/#([A-Z0-9]+)(\||$)/i);
        if (match) {
          referenciaLimpa = match[1].trim();
        }
      }
    }

    if (referenciaLimpa && referenciasDesejadas.has(referenciaLimpa)) {
      const avisoJaExiste = bloco.querySelector('.aviso-envio-especial');
      if (avisoJaExiste) return;

      const novaColuna = document.createElement('div');
      novaColuna.className = 'column col-sm-12 aviso-envio-especial';
      novaColuna.innerHTML = `<strong>${mensagemFinal}</strong>`;

      Object.assign(novaColuna.style, {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: 'black',
        padding: '10px'
      });
      novaColuna.style.setProperty('margin-bottom', '10px', 'important');
      
      bloco.insertBefore(novaColuna, bloco.firstElementChild);
    }
  });
});
