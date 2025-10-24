(function () {
  const DEBUG = false;
  const log = (...a)=>{ if (DEBUG) console.log('[MENU]', ...a); };

  // === Helpers ===
  // Extrai id de ?id=123, ..._123.html, ...-123.html (com/sem query)
  function getIdFromHref(rawHref) {
    if (!rawHref) return null;
    const href = String(rawHref);

    // 1) ?id=123
    const qpos = href.indexOf('?');
    if (qpos >= 0) {
      const qs = href.slice(qpos + 1);
      const params = new URLSearchParams(qs);
      for (const k of params.keys()) {
        if (k.toLowerCase() === 'id') {
          const v = params.get(k);
          if (v && /^\d+$/.test(v)) return v;
        }
      }
    }
    // 2) ..._123.html / ...-123.html / ..._123? / ...-123?
    const m = href.match(/[_-](\d+)(?:\.html|$|\?|\/)/i);
    return m ? m[1] : null;
  }

  // Aplica estilos base ao <li> alvo (sem mexer no hover global)
  function paintLi(li, bg, color) {
    if (!li || li.dataset.styled === "1") return;
    const a = li.querySelector('a');
    li.style.backgroundColor = bg;
    li.style.borderRadius = '4px';
    li.style.margin = '0 4px';
    if (a) {
      a.style.color = color;
      a.style.display = 'inline-block';
      a.style.padding = '5px 10px';
    }
    li.dataset.styled = '1';
    return { li, a };
  }

  // (Opcional) hover só para o alvo, via eventos — não altera CSS global
  function attachTargetHover(target, variant) {
    if (!target) return;
    const { li, a } = target;
    const hoverBg = (variant === 'green') ? '#2DB82B' : '#ECECEC';
    const hoverColor = (variant === 'green') ? '#000' : '#333';
    const baseBg = li.style.backgroundColor;
    const baseColor = a ? a.style.color : null;

    function over() {
      if (a) {
        a.style.backgroundColor = hoverBg;
        a.style.color = hoverColor;
        a.style.borderRadius = '4px';
        a.style.padding = '5px 10px';
      }
    }
    function out() {
      if (a) {
        a.style.backgroundColor = ''; // limpa para não brigar com CSS do site
        a.style.color = baseColor;
      }
      li.style.backgroundColor = baseBg;
    }

    li.addEventListener('mouseenter', over);
    li.addEventListener('mouseleave', out);
  }

  // ====== CONFIG ======
  const menusConfig = {
    "1871": { idLink: "2100", bg: "#38D430", color: "#000", variant: "green" }, // Desporto
    "435":  { idLink: "538",  bg: "#ECECEC", color: "#333", variant: "gray"  },
    "436":  { idLink: "475",  bg: "#ECECEC", color: "#333", variant: "gray"  },
    "437":  { idLink: "600",  bg: "#ECECEC", color: "#333", variant: "gray"  },
  };

  // ====== MOBILE ======
  const mobileConfig = {};
  for (const key in menusConfig) {
    const { idLink, bg, color, variant } = menusConfig[key];
    if (idLink) mobileConfig[idLink] = { bg, color, variant };
  }

  function styleMobileMenus(root = document) {
    const mobileMenus = root.querySelectorAll('#menu .wrapper-sub-mobile .sub-mobile:not(.sub)');
    mobileMenus.forEach((ul) => {
      Array.from(ul.children).forEach((li) => {
        if (li.tagName !== 'LI' || li.dataset.styled === "1") return;
        const a = li.querySelector('a[href]');
        const id = a ? getIdFromHref(a.getAttribute('href')) : null;
        if (id && mobileConfig[id]) {
          const { bg, color /*, variant*/ } = mobileConfig[id];
          paintLi(li, bg, color);
          // mobile: se quiseres hover especial, podes ativar attachTargetHover aqui também
        }
      });
    });
  }

  // Observer mobile (quando submenus são injectados/abertos)
  const mobileObserver = new MutationObserver((mutations) => {
    if (mutations.some(m => m.type === 'childList' &&
      [...m.addedNodes].some(n =>
        n.nodeType === 1 && (n.matches?.('#menu .wrapper-sub-mobile *') || n.closest?.('#menu .wrapper-sub-mobile'))
      ))) {
      styleMobileMenus(document);
    }
  });

  // ====== DESKTOP ======
  function styleDesktopMenus(root = document) {
    Object.entries(menusConfig).forEach(([menuId, cfg]) => {
      const container = root.querySelector(`[attr-id-hover="${menuId}"]`);
      if (!container) return;

      // 1º tenta no nível principal para evitar “chips” (ex.: Top Vendas)
      let liTarget = null;
      const topLis = container.querySelectorAll('.column-menu > ul > li');
      for (const li of topLis) {
        if (li.dataset.styled === "1") { liTarget = li; break; }
        const a = li.querySelector('a[href]');
        const id = a ? getIdFromHref(a.getAttribute('href') || a.href) : null;
        if (id === String(cfg.idLink)) { liTarget = li; break; }
      }

      // fallback: se a estrutura for diferente
      if (!liTarget) {
        const aList = container.querySelectorAll('a[href]');
        for (const a of aList) {
          const id = getIdFromHref(a.getAttribute('href') || a.href);
          if (id === String(cfg.idLink)) { liTarget = a.closest('li'); break; }
        }
      }

      if (liTarget) {
        const target = paintLi(liTarget, cfg.bg, cfg.color);
        // hover só no alvo, via JS, sem tocar no CSS global
        attachTargetHover(target, cfg.variant);
      }
    });
  }

  const desktopObserver = new MutationObserver((mutations) => {
    if (mutations.some(m => m.type === 'childList' &&
      [...m.addedNodes].some(n =>
        n.nodeType === 1 && (n.matches?.('[attr-id-hover] .column-menu, [attr-id-hover] .column-menu *') || n.closest?.('[attr-id-hover] .column-menu'))
      ))) {
      styleDesktopMenus(document);
    }
  });

  // Reaplica ao abrir o mega-menu
  function bindHoverReapply() {
    document.querySelectorAll('[attr-id-hover]').forEach(node => {
      node.addEventListener('mouseenter', () => styleDesktopMenus(node));
    });
  }

  // ====== INIT ======
  function init() {
    styleMobileMenus();
    styleDesktopMenus();

    mobileObserver.observe(document.body, { childList: true, subtree: true });
    desktopObserver.observe(document.body, { childList: true, subtree: true });
    bindHoverReapply();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
