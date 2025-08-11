(function () {
  // Esconde os menus alvo antes de aplicar estilo
  const idsParaEstilo = ["435", "436", "437"];
  idsParaEstilo.forEach(id => {
    const container = document.querySelector(`[attr-id-hover="${id}"] .column-menu > ul`);
    if (container) container.style.display = 'none';
  });

  requestAnimationFrame(() => {
    // === DESKTOP ===

    // Aplica estilo ao menu de desporto (1871) - já existente
    const menuDesporto = document.querySelector('[attr-id-hover="1871"] .column-menu > ul');
    if (menuDesporto) {
      const items = menuDesporto.querySelectorAll(':scope > li');
      if (items.length >= 2) {
        const futebol = items[2];
        const link = futebol.querySelector('a');

        futebol.classList.add('futebol-li');
        futebol.style.backgroundColor = "#38D430";
        futebol.style.borderRadius = "4px";
        futebol.style.margin = "0 4px";

        if (link) {
          link.style.color = "#000";
          link.style.display = "inline-block";
          link.style.padding = "5px 10px";
        }
      }
      menuDesporto.style.display = '';
    }

    // Aplica estilo aos menus 435, 436, 437
    const idsParaEstilo = ["435", "436", "437"];
    idsParaEstilo.forEach(id => {
      const ul = document.querySelector(`[attr-id-hover="${id}"] .column-menu > ul`);
      if (ul) {
        const items = ul.querySelectorAll(':scope > li');
        if (items.length >= 2) {
          const segundo = items[2];
          const link = segundo.querySelector('a');

          segundo.classList.add('outro-li');
          segundo.style.backgroundColor = "#ECECEC";
          segundo.style.borderRadius = "4px";
          segundo.style.margin = "0 4px";

          if (link) {
            link.style.color = "#333";
            link.style.display = "inline-block";
            link.style.padding = "5px 10px";
          }
        }
        ul.style.display = '';
      }
    });

    // Injeta os estilos de hover para ambas as classes
    const style = document.createElement("style");
    style.textContent = `
      [attr-id-hover="1871"] .futebol-li > a:hover,
      [attr-id-hover="1871"] .futebol-li.sel > a {
        background-color: #2DB82B !important;
        color: #000 !important;
        border-radius: 4px;
        padding: 5px 10px;
      }

      [attr-id-hover="435"] .outro-li > a:hover,
      [attr-id-hover="435"] .outro-li.sel > a,
      [attr-id-hover="436"] .outro-li > a:hover,
      [attr-id-hover="436"] .outro-li.sel > a,
      [attr-id-hover="437"] .outro-li > a:hover,
      [attr-id-hover="437"] .outro-li.sel > a {
        background-color: #ECECEC !important;
        color: #333 !important;
        border-radius: 4px;
        padding: 5px 10px;
      }
    `;
    document.head.appendChild(style);

    // === MOBILE ===
    const mobileMenus = document.querySelectorAll('#menu .wrapper-sub-mobile .sub-mobile:not(.sub)');
    mobileMenus.forEach((ul, index) => {
      const items = ul.querySelectorAll(':scope > li');
      if (items.length >= 3) {
        const secondItem = items[3];
        const link = secondItem.querySelector('a');

        // Ignora o índice 4 (desporto)
        if (index !== 4 && !secondItem.dataset.styled) {
          secondItem.style.backgroundColor = "#ECECEC";
          secondItem.style.borderRadius = "4px";
          secondItem.style.margin = "0 4px";

          if (link) {
            link.style.color = "#333";
            link.style.display = "inline-block";
            link.style.padding = "5px 10px";
          }
          secondItem.dataset.styled = "1";
        }

        // Aplica verde ao índice 4 (Desporto)
        if (index === 4 && !secondItem.dataset.styled) {
          secondItem.style.backgroundColor = "#38D430";
          secondItem.style.borderRadius = "4px";
          secondItem.style.margin = "0 4px";

          if (link) {
            link.style.color = "#000";
            link.style.display = "inline-block";
            link.style.padding = "5px 10px";
          }
          secondItem.dataset.styled = "1";
        }
      }
    });
  });
})();
