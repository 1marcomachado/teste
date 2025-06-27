(function () {
  // 1. Injetar o estilo no <head>
  const style = document.createElement("style");
  style.textContent = `
    /* === DESKTOP: 2º item === */
    [attr-id-hover="1871"] .column-menu > ul.sub > li:nth-child(2) {
      background-color: #38D430 !important;
      border-radius: 4px;
      margin: 0 4px;
    }

    [attr-id-hover="1871"] .column-menu > ul.sub > li:nth-child(2) > a {
      color: #000 !important;
      display: inline-block;
      padding: 5px 10px;
      transition: none !important;
    }

    [attr-id-hover="1871"] .column-menu > ul.sub > li:nth-child(2) > a:hover {
      filter: brightness(0.85);
      transition: filter 0.2s ease-in-out;
    }

    /* === MOBILE: 4º ul, 3º li === */
    #menu .wrapper-sub-mobile .sub-mobile:not(.sub):nth-of-type(4) > li:nth-child(3) {
      background-color: #38D430 !important;
      border-radius: 4px;
      margin: 0 4px;
    }

    #menu .wrapper-sub-mobile .sub-mobile:not(.sub):nth-of-type(4) > li:nth-child(3) > a {
      color: #000 !important;
      display: inline-block;
      padding: 5px 10px;
      transition: none !important;
    }

    #menu .wrapper-sub-mobile .sub-mobile:not(.sub):nth-of-type(4) > li:nth-child(3) > a:hover {
      filter: brightness(0.85);
      transition: filter 0.2s ease-in-out;
    }
  `;
  document.head.appendChild(style);
})();
