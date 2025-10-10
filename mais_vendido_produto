(function(){
  const LABEL_CLASS = 'tag-mais-vendido';
  const LABEL_STYLES = 'color:#d32f2f;font-weight:700;font-size:16px;';

  function addLabelOnProductPage() {
    const container = document.querySelector('.product-info');
    if (!container) return;

    const flags = container.querySelector('.flags');
    if (!flags) return;

    if (!container.querySelector('.' + LABEL_CLASS)) {
      const label = document.createElement('div');
      label.className = LABEL_CLASS;
      label.textContent = 'O mais vendido';
      label.setAttribute('style', LABEL_STYLES);

      flags.insertAdjacentElement('afterend', label);
    }
  }

  // Só executa se a URL tiver mais_vendidos=1
  const params = new URLSearchParams(window.location.search);
  if (params.get('mais_vendidos') === '1') {
    addLabelOnProductPage();
  }

  // expõe função se quiser correr manualmente
  window.addMaisVendidoProductPage = addLabelOnProductPage;
})();
