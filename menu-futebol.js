(function () {
  "use strict";

  const safeUrl = (href) => {
    try { return new URL(href, document.baseURI); } catch { return null; }
  };

  // Extrai id de ?id=123, /..._123(.html|?|/|fim) e /...-123(...)
  function getIdFromHref(rawHref) {
    if (!rawHref) return null;
    const s = String(rawHref).trim();
    if (/^(mailto:|tel:|javascript:|#)/i.test(s)) return null;
    const u = safeUrl(s);
    if (!u) return null;

    // ?id=123 (case-insensitive)
    for (const [k, v] of u.searchParams.entries()) {
      if (k.toLowerCase() === "id" && /^\d+$/.test(v)) return v;
    }
    const path = u.pathname + (u.search || "") + (u.hash || "");
    const m = path.match(/(?:[_-](\d+)|(\d+)[_-])(?:\.html|$|\?|\/)/i);
    return m ? (m[1] || m[2]) : null;
  }

  const hexToRgb = (hex) => {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || "");
    return m ? { r: parseInt(m[1],16), g: parseInt(m[2],16), b: parseInt(m[3],16) } : null;
  };
  const rgbToHex = (r,g,b) => {
    const toHex = (v) => Math.max(0, Math.min(255, v|0)).toString(16).padStart(2,"0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };
  const rgbToHsl = (r,g,b) => {
    r/=255; g/=255; b/=255;
    const max=Math.max(r,g,b), min=Math.min(r,g,b);
    let h,s,l=(max+min)/2;
    if (max===min) { h=s=0; }
    else {
      const d=max-min;
      s = l>0.5 ? d/(2-max-min) : d/(max+min);
      switch(max){
        case r: h=(g-b)/d + (g<b?6:0); break;
        case g: h=(b-r)/d + 2; break;
        default: h=(r-g)/d + 4;
      }
      h/=6;
    }
    return {h,s,l};
  };
  const hslToRgb = (h,s,l) => {
    const hue2rgb = (p,q,t) => {
      if (t<0) t+=1; if (t>1) t-=1;
      if (t<1/6) return p+(q-p)*6*t;
      if (t<1/2) return q;
      if (t<2/3) return p+(q-p)*(2/3 - t)*6;
      return p;
    };
    let r,g,b;
    if (s===0){ r=g=b=l; }
    else{
      const q = l<0.5 ? l*(1+s) : l + s - l*s;
      const p = 2*l - q;
      r = hue2rgb(p,q,h+1/3);
      g = hue2rgb(p,q,h);
      b = hue2rgb(p,q,h-1/3);
    }
    return { r: Math.round(r*255), g: Math.round(g*255), b: Math.round(b*255) };
  };
  // Escurece em HSL
  const darken = (hex, percent = 12) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    const {h,s,l} = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const p = Math.max(0, Math.min(100, percent))/100;
    const {r,g,b} = hslToRgb(h, s, Math.max(0, l*(1-p)));
    return rgbToHex(r,g,b);
  };
  // Escolhe preto/branco para contraste
  const idealTextOn = (hex) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return "#000";
    const [r,g,b] = [rgb.r, rgb.g, rgb.b].map(v => v/255);
    const L = 0.2126*r + 0.7152*g + 0.0722*b;
    return L > 0.6 ? "#000" : "#fff";
  };

  // ===== Estilo do <li> alvo =====
  function paintLi(li, bg, color) {
    if (!li) return null;

    if (li.dataset.styled === "1") {
      const a2 = li.querySelector("a");
      return {
        li,
        a: a2,
        bg: li.style.backgroundColor || bg,
        color: (a2 && a2.style.color) || color
      };
    }
    const a = li.querySelector("a");
    const textColor = color || idealTextOn(bg);

    li.style.backgroundColor = bg;
    li.style.borderRadius = "4px";
    li.style.margin = "0 4px";

    if (a) {
      a.style.color = textColor;
      a.style.display = "inline-block";
      a.style.padding = "5px 10px";
      a.style.borderRadius = "4px";
    }
    li.dataset.styled = "1";
    return { li, a, bg, color: textColor };
  }

  // Hover só no alvo via JS
  function attachTargetHover(target) {
    if (!target) return;
    const { li, a, bg, color } = target;
    if (!li || li.dataset.hoverBound === "1") return;

    const hoverBg = darken(bg, 12);

    function over() {
      li.style.backgroundColor = hoverBg;
      if (a) {
        a.style.backgroundColor = hoverBg;
        a.style.color = color;
        a.style.borderRadius = "4px";
        a.style.padding = "5px 10px";
      }
    }
    function out() {
      li.style.backgroundColor = bg;
      if (a) {
        a.style.backgroundColor = "";
        a.style.color = color;
      }
    }

    li.addEventListener("mouseenter", over, { passive: true });
    li.addEventListener("mouseleave", out, { passive: true });
    li.dataset.hoverBound = "1";
  }

  // ====== CONFIG ======
  const menusConfig = {
    "1871": {
      links: [
        { id: "2100", bg: "#38D430", color: "#000" },    
        { id: "3171", bg: "#ffa43e", color: "#232222" },  
        { id: "2962", bg: "#f61616", color: "#232222" },
        { id: "2025", bg: "#0B6623", color: "#FFFFFF" } 
      ]
    },
    "435": {
      links: [
        { id: "475",  bg: "#ECECEC", color: "#333" },    
        { id: "3172", bg: "#ffa43e", color: "#232222" },
        { id: "1087", bg: "#f61616", color: "#232222" },
        { id: "1112", bg: "#0B6623", color: "#FFFFFF" } 
      ]
    },
    "436": {
      links: [
        { id: "538",  bg: "#ECECEC", color: "#333" },
        { id: "3172", bg: "#ffa43e", color: "#232222" },
        { id: "1087", bg: "#f61616", color: "#232222" },
        { id: "1112", bg: "#0B6623", color: "#FFFFFF" } 
      ]
    },
    "437": {
      links: [
        { id: "600",  bg: "#ECECEC", color: "#333" },
        { id: "3172", bg: "#ffa43e", color: "#232222" },
        { id: "1087", bg: "#f61616", color: "#232222" },
        { id: "1112", bg: "#0B6623", color: "#FFFFFF" } 
      ]
    }
  };

  // ====== MOBILE ======
  const mobileConfig = {};
  for (const key in menusConfig) {
    const { links = [] } = menusConfig[key];
    for (const { id, bg, color } of links) {
      mobileConfig[String(id)] = { bg, color };
    }
  }

  function styleMobileMenus(root = document) {
    const mobileMenus = root.querySelectorAll("#menu .wrapper-sub-mobile .sub-mobile:not(.sub)");
    mobileMenus.forEach((ul) => {
      Array.from(ul.children).forEach((li) => {
        if (li.tagName !== "LI") return;
        const a = li.querySelector("a[href]");
        const id = a ? getIdFromHref(a.getAttribute("href")) : null;
        if (id && mobileConfig[id]) {
          const { bg, color } = mobileConfig[id];
          const t = paintLi(li, bg, color);
          attachTargetHover(t);
        }
      });
    });
  }

  // ====== DESKTOP ======
  function findDesktopLiById(container, idLink){
    const topLis = container.querySelectorAll(".column-menu > ul > li");
    for (const li of topLis) {
      const a = li.querySelector("a[href]");
      const id = a ? getIdFromHref(a.getAttribute("href") || a.href) : null;
      if (id === String(idLink)) return li;
    }
    const aList = container.querySelectorAll("a[href]");
    for (const a of aList) {
      const id = getIdFromHref(a.getAttribute("href") || a.href);
      if (id === String(idLink)) return a.closest("li");
    }
    return null;
  }

  function styleDesktopMenus(root = document) {
    Object.entries(menusConfig).forEach(([menuId, cfg]) => {
      const container = root.querySelector(`[attr-id-hover="${menuId}"]`);
      if (!container) return;

      const alreadyStyled = new Set(
        Array.from(container.querySelectorAll('.column-menu > ul > li[data-styled="1"]'))
      );

      for (const { id, bg, color } of (cfg.links || [])) {
        const li = findDesktopLiById(container, id);
        if (!li || alreadyStyled.has(li)) continue;
        const t = paintLi(li, bg, color);
        attachTargetHover(t);
      }
    });
  }

  let rafMobile = 0, rafDesktop = 0;

  const mobileObserver = new MutationObserver((mutations) => {
    const touched = mutations.some(m => m.type === "childList" &&
      [...m.addedNodes].some(n =>
        n.nodeType === 1 && (n.matches?.("#menu .wrapper-sub-mobile *") || n.closest?.("#menu .wrapper-sub-mobile"))
      ));
    if (touched) {
      cancelAnimationFrame(rafMobile);
      rafMobile = requestAnimationFrame(() => styleMobileMenus(document));
    }
  });

  const desktopObserver = new MutationObserver((mutations) => {
    const touched = mutations.some(m => m.type === "childList" &&
      [...m.addedNodes].some(n =>
        n.nodeType === 1 && (n.matches?.('[attr-id-hover] .column-menu, [attr-id-hover] .column-menu *') || n.closest?.('[attr-id-hover] .column-menu'))
      ));
    if (touched) {
      cancelAnimationFrame(rafDesktop);
      rafDesktop = requestAnimationFrame(() => styleDesktopMenus(document));
    }
  });

  function bindHoverReapply() {
    document.querySelectorAll("[attr-id-hover]").forEach(node => {
      node.addEventListener("mouseenter", () => {
        cancelAnimationFrame(rafDesktop);
        rafDesktop = requestAnimationFrame(() => styleDesktopMenus(node));
      }, { passive: true });
    });
  }

  function init() {
    styleMobileMenus();
    styleDesktopMenus();
    mobileObserver.observe(document.body, { childList: true, subtree: true });
    desktopObserver.observe(document.body, { childList: true, subtree: true });
    bindHoverReapply();
  }

  function destroy() {
    mobileObserver.disconnect();
    desktopObserver.disconnect();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true, passive: true });
  } else {
    init();
  }

  window.__menuStylerDestroy__ = destroy;
})();
