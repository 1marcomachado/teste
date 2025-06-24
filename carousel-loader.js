window.addEventListener("load", () => {
  // Encontrar o script pela URL ou outro atributo
  const scripts = document.querySelectorAll('script[src*="carousel-loader"]');
  const currentScript = scripts[scripts.length - 1]; // assume que é o último com esse nome

  if (!currentScript) return;

  const blockIds = (currentScript.getAttribute("data-blocks") || "")
    .split(",")
    .map(id => `#${id.trim()}`);
  const hideId = "#" + (currentScript.getAttribute("data-hide") || "").trim();

  const blocks = blockIds.map(sel => document.querySelector(sel));
  document.querySelector(hideId)?.style.setProperty("display", "none");

  const unique = new Set(), slides = [];

  blocks.forEach(b => b?.querySelectorAll(".mainTable>.dis_row>.dis_cell.banner-type-8")
    .forEach(cell => {
      const src = cell.querySelector("img.primary_image")?.src;
      if (src && !unique.has(src)) {
        unique.add(src);
        slides.push(cell.outerHTML);
      }
    })
  );

  if (slides.length && blocks[0]) {
    blocks[1]?.remove();
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

    new Swiper(swiper, {
      loop: false,
      slidesPerView: 1.25,
      spaceBetween: 10,
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
      breakpoints: {
        768: { slidesPerView: 4.25 },
        480: { slidesPerView: 1.25 }
      }
    });
  }
});
