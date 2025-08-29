(function () {
  const params = new URLSearchParams(window.location.search);
  const isMobile = window.innerWidth <= 768; // ajusta se quiseres incluir tablet
  if (!isMobile) return;

  const HIDE_CHAT_ALWAYS = true;

  const originalBtn = document.querySelector('#btt_addcart');
  if (!originalBtn) return;

  const footerBar = document.querySelector('.wrapper-footer-product');

  // 👉 Guardar métricas do footer ANTES de o esconder (para sabermos onde ele estaria)
  let footerMetrics = null;
  if (footerBar) {
    const rect = footerBar.getBoundingClientRect();
    const docTop = rect.top + window.scrollY;
    const height = footerBar.offsetHeight || rect.height || 0;
    footerMetrics = {
      top: docTop,
      height,
      bottom: docTop + height
    };
  }

  // 👉 Forçar footer a estar sempre escondido
  if (footerBar) {
    footerBar.style.setProperty('display', 'none', 'important');
    const styleFooter = document.createElement('style');
    styleFooter.textContent = `
      .wrapper-footer-product { display: none !important; }
    `;
    document.head.appendChild(styleFooter);
  }

  // ——— chat helpers ———
  const chatSelectors = [
    '.online_chat.online_chat_mini_button',
    '.online_chat',
    '[class*="chat"][class*="mini"]'
  ];
  const findChat = () => {
    for (const sel of chatSelectors) {
      const el = document.querySelector(sel);
      if (el) return el;
    }
    return null;
  };
  let chatWidget = findChat();

  const style = document.createElement('style');
  style.textContent = `.chat-hidden { display: none !important; }`;
  document.head.appendChild(style);

  // ——— botão fixo ———
  const fixedBtn = originalBtn.cloneNode(true);
  fixedBtn.id = 'btt_addcart_fixed';
  Object.assign(fixedBtn.style, {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    zIndex: '9999',
    margin: '0',
    borderRadius: '0',
    display: 'none',
    height: '60px',
    padding: '20px',
    borderColor: '#363636',
    background: '#363636',
    // começa SEM borda; será ligada só perto do footer
    border: 'none'
  });
  document.body.appendChild(fixedBtn);

  fixedBtn.addEventListener('click', (e) => {
    e.preventDefault();
    originalBtn.click();
  });

  let originalInView = false;

  const isActuallyVisible = (el) => {
    if (!el) return false;
    const cs = getComputedStyle(el);
    return cs.display !== 'none' && cs.visibility !== 'hidden' && cs.opacity !== '0';
  };

  // 🔹 Lógica principal de visibilidade e borda
  const updateVisibility = () => {
    const shouldShowFixed = !originalInView;
    fixedBtn.style.display = shouldShowFixed ? 'block' : 'none';

    // ✅ Borda só quando estivermos na zona do footer (mesmo oculto)
    // Considera-se "na zona do footer" quando o fundo do viewport passa o topo original do footer
    if (footerMetrics) {
      const viewportBottom = window.scrollY + window.innerHeight;
      const nearFooter = viewportBottom >= (footerMetrics.top - 1); // -1 de tolerância
      fixedBtn.style.border = nearFooter ? '1px solid #fff' : 'none';
    } else {
      // se não existir footer, nunca mostrar borda
      fixedBtn.style.border = 'none';
    }

    // Chat
    chatWidget = chatWidget || findChat();
    if (chatWidget) {
      if (HIDE_CHAT_ALWAYS || shouldShowFixed) {
        chatWidget.classList.add('chat-hidden');
      } else {
        chatWidget.classList.remove('chat-hidden');
      }
    }
  };

  const ioBtn = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.target === originalBtn) originalInView = e.isIntersecting;
      }
      updateVisibility();
    },
    { threshold: 0.1 }
  );
  ioBtn.observe(originalBtn);

  // Se o DOM mudar (ex.: chat injeta novamente), garantir estados
  const moBody = new MutationObserver(() => {
    const fresh = findChat();
    if (fresh) {
      chatWidget = fresh;
      if (HIDE_CHAT_ALWAYS) {
        fresh.classList.add('chat-hidden');
      }
    }
    // manter footer escondido
    if (footerBar) footerBar.style.setProperty('display', 'none', 'important');
  });
  moBody.observe(document.documentElement || document.body, {
    childList: true,
    subtree: true
  });

  // Recalcular métricas do footer se a janela for redimensionada (pouco provável no mobile, mas fica robusto)
  const recalcFooterMetrics = () => {
    if (!footerBar) return;
    // Temporariamente mostra só para medir? melhor não, mantemos a primeira medição.
    // Caso queiras recalcular com precisão, poderias remover o display:none, medir e voltar a esconder.
    // Aqui apenas ajustamos pelo scroll se necessário (não precisa).
  };

  window.addEventListener('scroll', updateVisibility, { passive: true });
  window.addEventListener('resize', () => { recalcFooterMetrics(); updateVisibility(); });

  updateVisibility();
})();
