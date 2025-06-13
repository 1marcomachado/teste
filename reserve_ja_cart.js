document.addEventListener('DOMContentLoaded', function () {
  const script = document.currentScript;
  const shopLang = script?.getAttribute('data-shop-lang')?.toLowerCase() || 'pt';

  // 📅 Mapeamento de datas por referência
  const datasPorReferencia = {};

  // Referências com envio previsto para 16 de junho
  [
    'JN9944', 'JD1408', 'JD1405', 'JN9946',
    'JN9940', 'JN9948', 'JN9947', 'JD1403'
  ].forEach(ref => {
    datasPorReferencia[ref] = '16 de junho';
  });

  // Referências com envio previsto para 20 de junho
  [
    'JP4013', 'JP4154', 'JN8884', 'JP3991',
    'JN8870', 'JN8887', 'JJ1931', 'JN8889'
  ].forEach(ref => {
    datasPorReferencia[ref] = '20 de junho';
  });

  // 🌍 Mensagens por idioma
  const mensagens = {
    pt: data => `O Envio DESTE ARTIGO ESTÁ previsto para ${data}. <span style="color: #35cf2d;">RESERVA-O AGORA ANTES QUE ESGOTE!</span>`,
    es: data => `El envío de este artículo está previsto para el ${data}. <span style="color: #35cf2d;">¡RESÉRVALO AHORA ANTES DE QUE SE AGOTE!</span>`,
    en: data => `Shipping for this item is expected by ${data}. <span style="color: #35cf2d;">BOOK IT NOW BEFORE IT SELLS OUT!</span>`
  };

  const langPrefix = shopLang.substring(0, 2);
  const getMensagem = mensagens[langPrefix] || mensagens['pt'];

  // 🔍 Seleciona todos os blocos de produto
  const blocosProduto = document.querySelectorAll('.rdc-shop-prd-primary-information');

  blocosProduto.forEach(bloco => {
    let referenciaLimpa = null;

    const referenciaEl = bloco.querySelector('.rdc-shop-prd-reference-value');
    if (referenciaEl) {
      const refText = referenciaEl.textContent.trim();
      referenciaLimpa = refText.replace(/^#/, '').split('|')[0].trim();
    }

    if (!referenciaLimpa) {
      const titulo = bloco.querySelector('.rdc-shop-prd-title');
      if (titulo) {
        const match = titulo.textContent.match(/#([A-Z0-9]+)(\||$)/i);
        if (match) referenciaLimpa = match[1].trim();
      }
    }

    if (referenciaLimpa && datasPorReferencia[referenciaLimpa]) {
      const dataEntrega = datasPorReferencia[referenciaLimpa];
      const mensagemFinal = getMensagem(dataEntrega);

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
