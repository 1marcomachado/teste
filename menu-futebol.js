(function () {
  function getIdFromHref(href) {
    if (!href) return null;
    const q = href.split("?")[1];
    if (q) {
      const p = new URLSearchParams(q);
      const qpId = p.get("id");
      if (qpId && /^\d+$/.test(qpId)) return qpId;
    }
    const m = href.match(/_(\d+)\.html(?:$|\?)/);
    if (m) return m[1];
    return null;
  }

  function styleLi(li, bgColor, textColor) {
    if (!li) return;
    const link = li.querySelector("a");
    li.style.backgroundColor = bgColor;
    li.style.borderRadius = "4px";
    li.style.margin = "0 4px";
    if (link) {
      link.style.color = textColor;
      link.style.display = "inline-block";
      link.style.padding = "5px 10px";
    }
    li.dataset.styled = "1";
  }

  // ====== A TUA CONFIG DESKTOP (usa os IDs reais!) ======
  const menusConfig = {
    "1871": { idLink: "2100", bg: "#38D430", color: "#000" },
    "435":  { idLink: "538",  bg: "#ECECEC", color: "#333" },
    "436":  { idLink: "475",  bg: "#ECECEC", color: "#333" },
    "437":  { idLink: "600", bg: "#ECECEC", color: "#333" },
  };

  // ====== MOBILE ======
  const mobileConfig = {};
  for (const key in menusConfig) {
    const { idLink, bg, color } = menusConfig[key];
    if (idLink) mobileConfig[idLink] = { bg, color };
  }

  function styleMobileMenus(root = document) {
    const mobileMenus = root.querySelectorAll('#menu .wrapper-sub-mobile .sub-mobile:not(.sub)');
    mobileMenus.forEach((ul) => {
      Array.from(ul.children).forEach((li) => {
        if (li.tagName !== 'LI' || li.dataset.styled === "1") return;
        const a = li.querySelector('a[href]');
        const id = a ? getIdFromHref(a.getAttribute('href')) : null;
        if (id && mobileConfig[id]) {
          const { bg, color } = mobileConfig[id];
          styleLi(li, bg, color);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => styleMobileMenus());
  } else {
    styleMobileMenus();
  }

  const observer = new MutationObserver((mutations) => {
    let shouldRestyle = false;
    for (const m of mutations) {
      if (m.type === 'childList') {
        if ([...m.addedNodes].some(n =>
          n.nodeType === 1 && n.matches && (n.matches('#menu .wrapper-sub-mobile *') || n.closest?.('#menu .wrapper-sub-mobile'))
        )) {
          shouldRestyle = true;
          break;
        }
      }
    }
    if (shouldRestyle) styleMobileMenus(document);
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
