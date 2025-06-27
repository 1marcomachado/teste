// Injetar CSS para hover e estado normal
const estiloHover = `
  .futebol-li > a {
    background-color: #38D430 !important;
    color: #000 !important;
    border-radius: 4px;
    padding: 5px 10px;
    display: inline-block;
    transition: none !important;
  }

  .futebol-li > a:hover,
  .futebol-li.sel > a {
    background-color: #2DB82B !important;
  }
`;
const styleTag = document.createElement("style");
styleTag.textContent = estiloHover;
document.head.appendChild(styleTag);

// === DESKTOP MENU ===
const desktopMenu = document.querySelector('[attr-id-hover="1871"] .column-menu > ul');
if (desktopMenu) {
  const items = desktopMenu.querySelectorAll(':scope > li');
  if (items.length >= 2) {
    const futebolDesktop = items[1];
    futebolDesktop.classList.add('futebol-li');
  }
}

// === MOBILE MENU ===
const mobileMenus = document.querySelectorAll('#menu .wrapper-sub-mobile .sub-mobile:not(.sub)');
if (mobileMenus.length >= 4) {
  const targetMobileUl = mobileMenus[3];
  const items = targetMobileUl.querySelectorAll(':scope > li');
  if (items.length >= 3) {
    const futebolMobile = items[2];
    const link = futebolMobile.querySelector('a');

    futebolMobile.style.backgroundColor = "#38D430";
    futebolMobile.style.borderRadius = "4px";
    futebolMobile.style.margin = "0 4px";

    if (link) {
      link.style.color = "#000";
      link.style.display = "inline-block";
      link.style.padding = "5px 10px";
      link.style.transition = "none";
    }
  }
}
