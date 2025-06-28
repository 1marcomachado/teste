// === INJETAR ESTILOS ===
const style = document.createElement('style');
style.textContent = `
  .futebol-highlight > a {
    background-color: #38D430 !important;
    color: #000 !important;
    border-radius: 4px !important;
    padding: 5px 10px !important;
    display: inline-block !important;
    margin: 0 4px !important;
  }

  .futebol-highlight > a:hover,
  .futebol-highlight.sel > a {
    background-color: #2DB82B !important;
    color: #000 !important;
  }
`;
document.head.appendChild(style);

// === DESKTOP ===
const menuDesktop = document.querySelector('[attr-id-hover="1871"] .column-menu > ul');
if (menuDesktop) {
  const items = Array.from(menuDesktop.children);
  for (const li of items) {
    const a = li.querySelector('a');
    if (
      a &&
      a.textContent.trim().toLowerCase() === "futebol" &&
      !li.classList.contains("sub-sub")
    ) {
      li.classList.add("futebol-highlight");
      break;
    }
  }
}

// === MOBILE ===
const mobileMenus = document.querySelectorAll('#menu .wrapper-sub-mobile .sub-mobile:not(.sub)');
if (mobileMenus.length >= 4) {
  const targetUl = mobileMenus[3]; // 4º ul.sub-mobile
  const items = Array.from(targetUl.querySelectorAll(':scope > li'));

  for (const li of items) {
    const a = li.querySelector('a');
    if (a && a.textContent.trim().toLowerCase() === "futebol") {
      li.classList.add("futebol-highlight");
      break;
    }
  }
}
