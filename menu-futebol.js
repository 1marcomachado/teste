(function () {
  const style = document.createElement("style");
  style.textContent = `
    [attr-id-hover="1871"] .column-menu > ul > li.futebol-li {
      visibility: hidden;
    }
  `;
  document.head.appendChild(style);

  requestAnimationFrame(() => {
    const menu = document.querySelector('[attr-id-hover="1871"] .column-menu > ul');
    if (menu) {
      const items = menu.querySelectorAll(':scope > li');
      if (items.length >= 2) {
        const futebolItem = items[1];
        const link = futebolItem.querySelector('a');

        futebolItem.classList.add('futebol-li');
        futebolItem.style.backgroundColor = "#38D430";
        futebolItem.style.borderRadius = "4px";
        futebolItem.style.margin = "0 4px";
        futebolItem.style.visibility = "visible"; // Mostrar só depois de aplicar tudo

        if (link) {
          link.style.color = "#000";
          link.style.display = "inline-block";
          link.style.padding = "5px 10px";
        }

        // Hover / active visual
        const hoverStyle = document.createElement("style");
        hoverStyle.textContent = `
          [attr-id-hover="1871"] .column-menu > ul > li.futebol-li:hover > a,
          [attr-id-hover="1871"] .column-menu > ul > li.futebol-li.sel > a {
            background-color: #2DB82B !important;
          }
        `;
        document.head.appendChild(hoverStyle);
      }
    }
  });
})();
