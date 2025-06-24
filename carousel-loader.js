window.addEventListener("load", () => {
  const scripts = document.querySelectorAll('script[src*="carousel-loader.js"]');
  const currentScript = scripts[scripts.length - 1];
  if (!currentScript) return;

  const blockIds = (currentScript.getAttribute("data-blocks") || "")
    .split(",").map(id => `#${id.trim()}`);
  const hideId = "#" + (currentScript.getAttribute("data-hide") || "").trim();

  const blocks = blockIds.map(sel => document.querySelector(sel));
  document.querySelector(hideId)?.style.setProperty("display", "none");

  // Forçar carregamento de imagens lozad/lazy
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

  const unique = new Set(), slides = [];

  blocks.forEach(b => {
    if (!b) return;
    b.querySelectorAll(".banner-type-8").forEach(cell => {
      const img = cell.querySelector("img.primary_image");
      const src = img?.getAttribute("src") ||
                  img?.getAttribute("data-src") ||
                  img?.getAttribute("data-original");
      const cellHTML = cell.outerHTML;
      if (!unique.has(cellHTML)) {
        unique.add(cellHTML);
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
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      breakpoints: {
        768: { slidesPerView: 4.25 },
        480: { slidesPerView: 1.25 }
      }
    });
  } else {
    console.warn("Swiper não está carregado.");
  }
});
