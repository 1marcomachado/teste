document.addEventListener("DOMContentLoaded", function () {
  const aplicarEstilo = (li) => {
    const link = li.querySelector('a');
    if (!link) return;

    // Estilos principais
    li.style.backgroundColor = "#38D430";
    li.style.borderRadius = "4px";
    li.style.margin = "0 4px";

    link.style.color = "#000";
    link.style.display = "inline-block";
    link.style.padding = "5px 10px";

    // Hover / Touch escurecido
    li.addEventListener("mouseenter", () => {
      li.style.backgroundColor = "#2DB82B";
    });
    li.addEventListener("mouseleave", () => {
      li.style.backgroundColor = "#38D430";
    });
    li.addEventListener("touchstart", () => {
      li.style.backgroundColor = "#2DB82B";
    });
    li.addEventListener("touchend", () => {
      li.style.backgroundColor = "#38D430";
    });
  };

  // ➤ Desktop: segundo <li> do menu com .submenu
  const submenu = document.querySelector('.submenu .column-menu > ul');
  if (submenu) {
    const desktopLis = submenu.querySelectorAll(':scope > li');
    if (desktopLis.length >= 2) {
      aplicarEstilo(desktopLis[1]); // segundo li (índice 1)
    }
  }

  // ➤ Mobile: terceiro <li> do .sub-mobile
  const ulMobile = document.querySelector('ul.sub-mobile.active');
  if (ulMobile) {
    const mobileLis = ulMobile.querySelectorAll(':scope > li');
    if (mobileLis.length >= 3) {
      aplicarEstilo(mobileLis[2]); // terceiro li (índice 2)
    }
  }
});
