window.addEventListener("load", () => {
  console.log("[carousel-loader] Início do script");

  const scripts = document.querySelectorAll('script[src*="carousel-loader.js"]');
  const script = scripts[scripts.length - 1];
  if (!script) {
    console.warn("[carousel-loader] Script não encontrado.");
    return;
  }

  let configRaw = script.getAttribute("data-config") || "";
  configRaw = configRaw
    .replace(/<br\s*\/?>/gi, "")
    .replace(/[\r\n]/g, "")
    .trim();

  let configs;
  try {
    configs = JSON.parse(configRaw);
    console.log("[carousel-loader] Config carregado:", configs);
  } catch (e) {
    console.warn("[carousel-loader] JSON inválido:", e);
    return;
  }

  configs.forEach((config, index) => {
    console.log(`[carousel-loader] Iniciando carrossel #${index + 1}`);

    const blockIds = (config.blocks || []).map(id => `#${id}`);
    const blocks = blockIds.map(sel => document.querySelector(sel));

    if (config.hide) {
      const hideId = "#" + config.hide;
      document.querySelector(hideId)?.style.setProperty("display", "none");
      console.log(`[carousel-loader] Ocultado bloco ${hideId}`);
    }

    // Forçar carregamento de imagens lazy
    document.querySelectorAll(".rdc-lazy-placeholder").forEach(figure => {
      const img = figure.querySelector("img.rdc-vpd-lozad");
      const src = img?.getAttribute("data-src");
      if (src && img) {
        img.setAttribute("src", src);
        img.classList.remove("rdc-vpd-lozad");
        img.removeAttribute("data-src");
        console.log("[carousel-loader] Forçou lazy load em imagem:", src);
      }
      figure.classList.remove("rdc-lazy-placeholder");
    });

    const uniqueSrc = new Set(), slides = [];

    blocks.forEach(b => {
      if (!b) return;
      b.querySelectorAll(".banner-type-8").forEach(cell => {
        const img = cell.querySelector("img.primary_image");
        const src = img?.getAttribute("src") || img?.getAttribute("data-src") || img?.getAttribute("data-original");

        if (src && !uniqueSrc.has(src)) {
          uniqueSrc.add(src);
          slides.push(cell.outerHTML.trim());
        }
      });
    });

    console.log(`[carousel-loader] ${slides.length} slide(s) únicos encontrados.`);

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

    const defaultSlides = config.slidesPerView || {
      default: 1.25,
      768: 4.25,
      480: 1.25,
      0: 1.1
    };

    if (typeof Swiper !== "undefined") {
      new Swiper(swiper, {
        loop: false,
        spaceBetween: 10,
        slidesPerView: defaultSlides.default || 1.25,
        navigation: {
          nextEl: swiper.querySelector(".swiper-button-next"),
          prevEl: swiper.querySelector(".swiper-button-prev")
        },
        breakpoints: {
          0:   { slidesPerView: defaultSlides[0]   || defaultSlides.default },
          480: { slidesPerView: defaultSlides[480] || defaultSlides.default },
          768: { slidesPerView: defaultSlides[768] || defaultSlides.default }
        }
      });
      console.log(`[carousel-loader] Swiper #${index + 1} inicializado com ${slides.length} slide(s).`);
    } else {
      console.warn("[carousel-loader] Swiper não está disponível.");
    }
  });
});
