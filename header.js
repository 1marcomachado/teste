(function() {
  'use strict';
  
  if (window.topInfoBarInitialized) return;

  const config = {
    pt: {
      links: [
        { text: 'PROCURAR UMA LOJA', url: 'https://www.bzronline.com/pt/lojas_653.html', class: 'store' },
        { text: 'ENVIOS', url: 'https://www.bzronline.com/pt/ajuda-e-condicoes/envios_665.html', class: 'shipping' },
        { text: 'TROCAS E DEVOLUÇÕES', url: 'https://www.bzronline.com/pt/ajuda-e-condicoes/trocas-e-devolucoes_2123.html', class: 'returns' },
        { text: 'TORNA-TE MEMBRO', url: 'https://www.bzronline.com/pt/bazarclub_3209.html', class: 'member' }
      ]
    },
    en: {
      links: [
        { text: 'FIND A STORE', url: 'https://www.bzronline.com/en/stores_653.html', class: 'store' },
        { text: 'SHIPPING', url: 'https://www.bzronline.com/en/help-and-conditions/shipping_665.html', class: 'shipping' },
        { text: 'RETURNS & EXCHANGES', url: 'https://www.bzronline.com/en/help-and-conditions/exchanges-and-returns_2123.html', class: 'returns' },
        { text: 'BECOME A MEMBER', url: 'https://www.bzronline.com/en/bazarclub_3209.html', class: 'member' }
      ]
    },
    es: {
      links: [
        { text: 'BUSCAR TIENDA', url: 'https://www.bzronline.com/es/tiendas_653.html', class: 'store' },
        { text: 'ENVÍOS', url: 'https://www.bzronline.com/es/ayuda-and-condiciones/envios_665.html', class: 'shipping' },
        { text: 'CAMBIOS Y DEVOLUCIONES', url: 'https://www.bzronline.com/es/ayuda-and-condiciones/cambios-y-devoluciones_2123.html', class: 'returns' },
        { text: 'HAZTE MIEMBRO', url: 'https://www.bzronline.com/es/bazarclub_3209.html', class: 'member' }
      ]
    }
  };

  function initTopInfoBar() {
    try {
      window.topInfoBarInitialized = true;

      document.querySelectorAll('.top-info-bar, .menu-mobile ul.menu-inst li.top-link, style[data-top-info-bar]').forEach(el => el.remove());

      const langMatch = window.location.pathname.match(/\/(pt|en|es)\//);
      const currentLang = langMatch ? langMatch[1] : 'pt';
      const links = config[currentLang]?.links || config.pt.links;

      // Modificar a variável CSS diretamente
      document.documentElement.style.setProperty('--notification-bar-height', '72px');

      const style = document.createElement('style');
      style.setAttribute('data-top-info-bar', 'true');
      style.textContent = `.top-info-bar{background-color:#ebebeb;padding:12px 76px 12px 40px;font-family:'Metrocity-Book',Arial,Helvetica,'Segoe UI',sans-serif;font-size:9px;letter-spacing:.2px;line-height:9px;color:#333;text-transform:uppercase;border-bottom:1px solid #ddd}.top-info-bar .container{text-align:right}.top-info-bar a{color:#333;text-decoration:none;padding:0 8px;font-weight:400}.top-info-bar a:hover{text-decoration:underline}.top-info-bar .separator{color:#666;padding:0 3px}.top-info-bar .btn-member{background-color:#000;color:#fff;padding:4px 12px;border-radius:3px;margin-left:8px}.top-info-bar .btn-member:hover{background-color:#333;text-decoration:none}@media (max-width:768px){.top-info-bar{display:none!important}}.menu-mobile ul.menu-inst li.top-link{list-style:none}.menu-mobile ul.menu-inst li.top-link a{display:block;color:#333;text-decoration:none;font-size:1em;text-transform:uppercase;font-weight:400}.menu-mobile ul.menu-inst li.top-link a:hover{background-color:#f9f9f9}.menu-mobile ul.menu-inst li.top-link.member a{display:inline-block;background-color:#000;color:#fff;margin:8px 12px 8px 45px;padding:8px;font-weight:600;border:none;border-radius:4px;letter-spacing:.3px}.menu-mobile ul.menu-inst li.top-link.member a:hover{background-color:#333}`;
      document.head.appendChild(style);

      const desktopLinksHTML = links.map((link, i) => 
        `<a href="${link.url}" class="${link.class === 'member' ? 'btn-member' : ''}">${link.text}</a>${i < links.length - 1 ? '<span class="separator">|</span>' : ''}`
      ).join('');
      
      const topBar = document.createElement('div');
      topBar.className = 'top-info-bar';
      topBar.innerHTML = `<div class="container">${desktopLinksHTML}</div>`;

      const header = document.querySelector('header');
      if (header) header.insertBefore(topBar, header.firstChild);

      const menuInst = document.querySelector('.menu-mobile ul.menu-inst');
      const langLi = menuInst?.querySelector('li.lang');
      
      if (langLi) {
        [...links].reverse().forEach(link => {
          const li = document.createElement('li');
          li.className = `top-link ${link.class}`;
          li.innerHTML = `<a href="${link.url}">${link.text}</a>`;
          langLi.insertAdjacentElement('afterend', li);
        });
      }
    } catch (error) {
      console.error('Top Info Bar error:', error);
    }
  }

  function tryInit(attempts = 0) {
    if (document.querySelector('header')) {
      initTopInfoBar();
    } else if (attempts < 50) {
      setTimeout(() => tryInit(attempts + 1), 100);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInit, { once: true });
  } else {
    tryInit();
  }
})();
