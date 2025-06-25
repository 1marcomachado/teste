window.addEventListener("load", () => {
  // Buscar o script que contém carousel-loader.js
  const scripts = document.querySelectorAll('script[src*="carousel-loader.js"]');
  const script = scripts[scripts.length - 1]; // último na ordem do DOM
  if (!script) return;

  let configRaw = script.getAttribute("data-config") || "";
  configRaw = configRaw
    .replace(/<br\s*\/?>/gi, "")
    .replace(/[\r\n]/g, "")
    .trim();

  let configs;
  try {
    configs = JSON.parse(configRaw);
  } catch (e) {
    console.warn("JSON inválido no data-config:", e);
    return;
  }

  configs.forEach(config => {
    const blockIds = (config.blocks || []).map(id => `#${id}`);
    const hideId = "#" + config.hide;

    const blocks = blockIds.map(sel => document.querySelector(sel));
    document.querySelector(hideId)?.style.setProperty("display", "none");

    // Forçar carregamento de imagens lazy
    document.querySelectorAll(".rdc-lazy-placeholder").forEach(figure => {
      const img = figure.querySelector("img.rdc-vpd-lozad");
      const src = img?.getAttribute("data-src");
      if (src && img) {
        img.setAttribute("src", src);
        img.classList.remove("rdc-vpd-lozad");
        img.removeAttribute("data-src");
      }
      figure.classList.remove("rdc-lazy-placeholder");
    });

    const uniqueHTML = new Set(), slides = [];

    blocks.forEach(b => {
      if (!b) return;
      b.querySelectorAll(".banner-type-1, .banner-type-8").forEach(cell => {
        const cellHTML = cell.outerHTML.trim();
        if (!uniqueHTML.has(cellHTML)) {
          uniqueHTML.add(cellHTML);
          slides.push(cellHTML);
        }
      });
    });

    if (!slides.length || !blocks[0]) return;

    blocks.slice(1).forEach(b => b?.remove());

    const swiper = document.createElement("div");
    swiper.className = "swiper";
    swiper.innerHTML = `
      <div class="swiper-wrapper">
        ${slides.map(h => `<div class="swiper-slide">${h}</div>`).join("")}
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    `;
    blocks[0].replaceWith(swiper);

    if (typeof Swiper !== "undefined") {
      new Swiper(swiper, {
        loop: false,
        slidesPerView: 1.25,
        spaceBetween: 10,
        navigation: {
          nextEl: swiper.querySelector(".swiper-button-next"),
          prevEl: swiper.querySelector(".swiper-button-prev")
        },
        breakpoints: {
          768: { slidesPerView: 4.25 },
          480: { slidesPerView: 1.25 }
        }
      });
    }
  });
});
