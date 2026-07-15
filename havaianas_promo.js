(function () {
  // Proteção contra múltiplas execuções
  if (window.__mmHavaianasPromoInit) return;
  window.__mmHavaianasPromoInit = true;

  console.log("[MM DIAGNOSTIC] Iniciando motor de diagnóstico leve. Sem injeção de HTML.");

  function extractProductIdFromUrl(url) {
    if (!url) return null;
    const match = url.match(/_p(\d+)/) || url.match(/item_(\d+)/) || url.match(/_p=(\d+)/) || url.match(/\/p(\d+)\.html/);
    if (match) return match[1];
    return null;
  }

  function getHavaianasCount() {
    let count = 0;
    const $activePopup = $('#rdc-mini-cart:visible, #recomendation-cart-right-bar:visible');
    console.log("[MM DIAGNOSTIC] Analisando popup ativo. Elementos encontrados:", $activePopup.length);
    
    if ($activePopup.length > 0) {
      const $products = $activePopup.find('.rdc-mini-cart-product');
      console.log("[MM DIAGNOSTIC] Número de produtos no DOM do popup:", $products.length);
      
      $products.each(function (idx) {
        let id = null;
        $(this).find('a').each(function() {
          const href = $(this).attr('href') || '';
          id = extractProductIdFromUrl(href);
          if (id) return false;
        });
        
        const title = $(this).find('.rdc-mini-cart-product-name_title').text();
        const brand = $(this).find('.rdc-mini-cart-product-brand').text();
        
        console.log(`[MM DIAGNOSTIC] Item #${idx + 1} -> ID Extraído: ${id} | Marca: "${brand}" | Título: "${title}"`);
        
        if (brand.toLowerCase().includes('havaianas') || title.toLowerCase().includes('havaianas')) {
          const qtdText = $(this).find('.rdc-mini-cart-product-name_qtd').text() || '1';
          const qty = parseInt(qtdText.replace('x', '').trim(), 10) || 1;
          count += qty;
        }
      });
    }
    return count;
  }

  // Polling de diagnóstico a cada 1000ms
  setInterval(function () {
    const $miniCart = $('#rdc-mini-cart');
    const $recCart = $('#recomendation-cart-right-bar');
    
    console.log(`[MM DIAGNOSTIC] Tick. Mini-cart visível: ${$miniCart.is(':visible')} | Rec-cart visível: ${$recCart.is(':visible')}`);
    
    if ($miniCart.is(':visible') || $recCart.is(':visible')) {
      try {
        const count = getHavaianasCount();
        console.log("[MM DIAGNOSTIC] Contagem final de Havaianas:", count);
      } catch (err) {
        console.error("[MM DIAGNOSTIC ERROR] Falha ao contar produtos:", err);
      }
    }
  }, 1000);
})();
