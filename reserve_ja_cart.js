document.addEventListener('DOMContentLoaded', function () {
  const script = document.currentScript;
  const shopLang = script?.getAttribute('data-shop-lang')?.toLowerCase() || 'pt'; // fallback para 'pt'

  const referenciasDesejadas = new Set(['JM1220']);
  const blocosProduto = document.querySelectorAll('.rdc-shop-prd-primary-information');

  // Mensagens por idioma
  const mensagens = {
    pt: 'O Envio DESTE ARTIGO ESTÁ previsto para 20 de junho. <span style="color: #35cf2d;">RESERVA-O AGORA ANTES QUE ESGOTE!</span>',
    es: 'O Envio DESTE ARTIGO ESTÁ previsto para 20 de junho. <span style="color: #35cf2d;">RESERVA-O AGORA ANTES QUE ESGOTE!</span>',
    en: 'O Envio DESTE ARTIGO ESTÁ previsto para 20 de junho. <span style="color: #35cf2d;">RESERVA-O AGORA ANTES QUE ESGOTE!</span>'
  };

  const mensagemFinal = mensagens[shopLang.substring(0, 2)] || mensagens['pt'];

  blocosProduto.forEach(bloco => {
    const referenciaEl = bloco.querySelector('.rdc-shop-prd-reference-value');

    if (referenciaEl) {
      const referenciaCompleta = referenciaEl.textContent.trim();
      const referenciaLimpa = referenciaCompleta.replace(/^#/, '').split('|')[0].trim();

      if (referenciasDesejadas.has(referenciaLimpa)) {
        const row = bloco.querySelector('.row');

        if (row) {
          const novaColuna = document.createElement('div');
          novaColuna.className = 'column col-sm-12';
          Object.assign(novaColuna.style, {
            fontWeight: 'bold',
            margin: 'auto',
            marginBottom: '10px',
            textTransform: 'uppercase',
            color: 'black'
          });

          novaColuna.innerHTML = `<strong>${mensagemFinal}</strong>`;

          row.insertBefore(novaColuna, row.firstElementChild);
        }
      }
    }
  });
});
