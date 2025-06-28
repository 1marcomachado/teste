requestAnimationFrame(() => {
  // Injetar CSS imediatamente
  const css = `
    .futebol-li > a {
      background-color: #38D430 !important;
      color: #000 !important;
      border-radius: 4px !important;
      margin: 0 4px !important;
      padding: 5px 10px !important;
      display: inline-block !important;
    }
    .futebol-li:hover > a,
    .futebol-li.sel > a {
      background-color: #2DB82B !important;
    }
  `;
  const styleTag = document.createElement("style");
  styleTag.textContent = css;
  document.head.appendChild(styleTag);

  // DESKTOP
  const desktopMenu = document.querySelector('[attr-id-hover="1871"] .column-menu > ul');
  if (desktopMenu) {
    const items = Array.from(desktopMenu.querySelectorAll(':scope > li'))
      .filter(li => !li.classList.contains('sub-sub'));

    const futebolLi = items.find(li => {
      const a = li.querySelector('a');
      return a && a.textContent.trim().toLowerCase() === "futebol";
    });

    if (futebolLi) {
      futebolLi.classList.add('futebol-li');
    }
  }

  // MOBILE
  const mobileMenus = document.querySelectorAll('#menu .wrapper-sub-mobile .sub-mobile:not(.sub)');
  if (mobileMenus.length >= 4) {
    const targetMobileUl = mobileMenus[3];
    const items = Array.from(targetMobileUl.querySelectorAll(':scope > li'));

    const futebolLiMobile = items.find(li => {
      const a = li.querySelector('a');
      return a && a.textContent.trim().toLowerCase() === "futebol";
    });

    if (futebolLiMobile) {
      futebolLiMobile.style.backgroundColor = "#38D430";
      futebolLiMobile.style.borderRadius = "4px";
      futebolLiMobile.style.margin = "0 4px";

      const a = futebolLiMobile.querySelector('a');
      if (a) {
        a.style.color = "#000";
        a.style.display = "inline-block";
        a.style.padding = "5px 10px";
      }
    }
  }
});
