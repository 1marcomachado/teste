document.addEventListener('DOMContentLoaded', function () {
  const script = document.currentScript;
  const shopLang = script?.getAttribute('data-shop-lang')?.toLowerCase() || 'pt';

  // 📅 Mapeamento de datas por referência
  const datasPorReferencia = {};

  // Referências com envio previsto para 20 de junho
  [
    '580456-014', 'DC8466-005', 'DD8959-100', 'DD1873-113', 'FD9876-101', 'DV0788-001', 'FQ9065-100', 'CW2288-111', 'CT2302-100', '378341-009', '378341-128', '378341-402', 'AR3565-004', 'CK2630-004', 'CK2630-201', 'DD9605-100', 'DV3337-023', 'HQ2053-700', 'HV4455-001', 'HV4456-001', 'HV4528-002', 'HV8568-202', 'HV8568-203', 'IB4504-237', 'IB6388-100', 'IB6651-002', 'IH4119-009', 'IM6001-475', 'IM6597-001', 'IO2077-030', 'CT3839-100', 'HF6998-108', 'HF7310-013', 'HQ1911-300', 'HQ2157-004', 'IH4491-101', 'IH7672-005', 'AR3566-002', 'AR3566-100', 'DC9486-115', 'HJ5777-100', 'HQ1789-600', 'HQ7739-002', 'IB4417-104', 'IB4417-105', 'IM5237-100', 'IM6024-121', 'IM6025-121', 'IM6026-121', 'IM6485-121', 'CN0149-001'
  ].forEach(ref => {
    datasPorReferencia[ref] = '2 de outubro';
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
        padding: '10px',
        background: '#f1fff1'
      });
      novaColuna.style.setProperty('margin-bottom', '10px', 'important');

      bloco.insertBefore(novaColuna, bloco.firstElementChild);
    }
  });
});
