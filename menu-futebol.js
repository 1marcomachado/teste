document.addEventListener("DOMContentLoaded", function () {
  // Função para injetar estilo CSS no <head>
  const estiloHover = `
    .futebol-li > a:hover,
    .futebol-li.sel > a {
      background-color: #2DB82B !important;
      color: #000 !important;
      border-radius: 4px;
      padding: 5px 10px;
    }
  `;
  const styleTag = document.createElement("style");
  styleTag.textContent = estiloHover;
  document.head.appendChild(styleTag);

  // ESTILO PARA O SEGUNDO ITEM DO MENU DESKTOP
  const desktopMenu = document.querySelector('.submenu .column-menu > ul');
  if (desktopMenu) {
    const desktopItems = desktopMenu.querySelectorAll(':scope > li');
    if (desktopItems.length >= 2) {
      const futebolDesktop = desktopItems[1]; // segundo item
      futebolDesktop.classList.add('futebol-li');
      const link = futebolDesktop.querySelector('a');

      futebolDesktop.style.backgroundColor = "#38D430";
      futebolDesktop.style.borderRadius = "4px";
      futebolDesktop.style.margin = "0 4px";

      if (link) {
        link.style.color = "#000";
        link.style.display = "inline-block";
        link.style.padding = "5px 10px";
      }
    }
  }

  // ESTILO PARA O TERCEIRO ITEM DO MENU MOBILE
  const mobileMenu = document.querySelector('.sub-mobile.active');
  if (mobileMenu) {
    const mobileItems = mobileMenu.querySelectorAll(':scope > li');
    if (mobileItems.length >= 3) {
      const futebolMobile = mobileItems[2]; // terceiro item
      const link = futebolMobile.querySelector('a');

      futebolMobile.style.backgroundColor = "#38D430";
      futebolMobile.style.borderRadius = "4px";
      futebolMobile.style.margin = "0 4px";

      if (link) {
        link.style.color = "#000";
        link.style.display = "inline-block";
        link.style.padding = "5px 10px";
      }
    }
  }
});
