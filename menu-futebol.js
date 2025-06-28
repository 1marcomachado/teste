(function () {
  // Injetar estilos no head o mais cedo possível
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    [attr-id-hover="1871"] .column-menu > ul > li.futebol-li > a {
      background-color: #38D430 !important;
      color: #000 !important;
      border-radius: 4px !important;
      padding: 5px 10px !important;
      display: inline-block !important;
      margin: 0 4px !important;
    }

    [attr-id-hover="1871"] .column-menu > ul > li.futebol-li:hover > a,
    [attr-id-hover="1871"] .column-menu > ul > li.futebol-li.sel > a {
      background-color: #2DB82B !important;
    }

    #menu .wrapper-sub-mobile .sub-mobile:not(.sub):nth-of-type(4) > li:nth-child(3) > a {
      background-color: #38D430 !important;
      color: #000 !important;
      border-radius: 4px !important;
      padding: 5px 10px !important;
      display: inline-block !important;
      margin: 0 4px !important;
    }
  `;
  document.head.prepend(styleTag);

  // Marcar o segundo li no menu principal (sem sub-sub)
  const desktopUl = document.querySelector('[attr-id-hover="1871"] .column-menu > ul');
  if (desktopUl) {
    const li = desktopUl.querySelectorAll(':scope > li:not(.sub-sub)')[1]; // segundo item real
    if (li) {
      li.classList.add('futebol-li');
    }
  }
})();
