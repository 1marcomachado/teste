document.addEventListener("DOMContentLoaded", function () {
  // Injetar CSS para hover escurecido no item com classe futebol-li
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

  // === DESKTOP MENU ===
  const desktopMenu = document.querySelector('.submenu [attr-id-hover="1871"] .column-menu > ul');
  if (desktopMenu) {
    const items = desktopMenu.querySelectorAll(':scope > li');
    if (items.length >= 2) {
      const futebolDesktop = items[1]; // segundo li
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

  // === MOBILE MENU ===
  const mobileMenus = document.querySelectorAll('ul.sub-mobile');
  if (mobileMenus.length >= 4) {
    const targetMobileUl = mobileMenus[3]; // 4º ul.sub-mobile
    const items = targetMobileUl.querySelectorAll(':scope > li');
    if (items.length >= 3) {
      const futebolMobile = items[2]; // primeiro li dentro do 4º ul
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
