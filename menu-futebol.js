(function () {
  // Esconde o menu antes de aplicar o estilo
  const menuContainer = document.querySelector('[attr-id-hover="1871"] .column-menu > ul');
  if (menuContainer) menuContainer.style.display = 'none';

  // Espera o próximo frame para aplicar estilo
  requestAnimationFrame(() => {
    const desktopMenu = document.querySelector('[attr-id-hover="1871"] .column-menu > ul');
    if (desktopMenu) {
      const items = desktopMenu.querySelectorAll(':scope > li');
      if (items.length >= 2) {
        const futebol = items[1]; // segundo item
        const link = futebol.querySelector('a');

        // Adiciona classe para hover e active
        futebol.classList.add('futebol-li');

        // Estilo direto (igual ao visual acordado)
        futebol.style.backgroundColor = "#38D430";
        futebol.style.borderRadius = "4px";
        futebol.style.margin = "0 4px";

        if (link) {
          link.style.color = "#000";
          link.style.display = "inline-block";
          link.style.padding = "5px 10px";
        }

        // Injeta CSS do hover
        const style = document.createElement("style");
        style.textContent = `
          [attr-id-hover="1871"] .futebol-li > a:hover,
          [attr-id-hover="1871"] .futebol-li.sel > a {
            background-color: #2DB82B !important;
            color: #000 !important;
            border-radius: 4px;
            padding: 5px 10px;
          }
        `;
        document.head.appendChild(style);
      }

      // Exibe o menu após aplicar estilo
      desktopMenu.style.display = '';
    // === MOBILE ===
      const mobileMenus = document.querySelectorAll('#menu .wrapper-sub-mobile .sub-mobile:not(.sub)');
    if (mobileMenus.length >= 4) {
      const targetMobileUl = mobileMenus[3];
      const items = targetMobileUl.querySelectorAll(':scope > li');
      if (items.length >= 3) {
        const futebol = items[2];
        const link = futebol.querySelector('a');

        if (!futebol.dataset.styled) {
          futebol.style.backgroundColor = "#38D430";
          futebol.style.borderRadius = "4px";
          futebol.style.margin = "0 4px";
          if (link) {
            link.style.color = "#000";
            link.style.display = "inline-block";
            link.style.padding = "5px 10px";
          }
          futebol.dataset.styled = "1"; // Marcar como já estilizado
        }
      }
    }
    }
  });
})();
