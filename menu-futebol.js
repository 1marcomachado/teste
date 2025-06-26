  document.addEventListener("DOMContentLoaded", function () {
    const aplicarEstiloFutebol = (selector) => {
      const links = document.querySelectorAll(selector);

      links.forEach(link => {
        const texto = link.textContent.trim().toLowerCase();
        if (texto === "futebol") {
          const item = link.parentElement;

          item.style.backgroundColor = "#38D430";
          item.style.borderRadius = "4px";
          item.style.margin = "0 4px";

          link.style.color = "#000";
          link.style.display = "inline-block";
          link.style.padding = "5px 10px";
        }
      });
    };

    aplicarEstiloFutebol('.submenu li a');
    aplicarEstiloFutebol('.sub-mobile li a');

  });
