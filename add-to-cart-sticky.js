(function () {
  const params = new URLSearchParams(window.location.search);
  const isMobile = window.innerWidth <= 768; // ajusta se quiseres incluir tablet
  if (params.get('mostrar_carrinho') !== '1' || !isMobile) return;

  const HIDE_CHAT_ALWAYS = true;

  const originalBtn = document.querySelector('#btt_addcart');
  if (!originalBtn) return;

  const footerBar = document.querySelector('.wrapper-footer-product');

  // 👉 Forçar footer a estar sempre escondido
  if (footerBar) {
    footerBar.style.setProperty('display', 'none', 'important');
    const styleFooter = document.createElement('style');
    styleFooter.textContent = `
      .wrapper-footer-product { display: none !important; }
    `;
    document.head.appendChild(styleFooter);
  }

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
    height: '55px',
    padding: '20px',
    borderColor: '#363636',
    background: '#363636',
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

  // 🔹 Agora ignora footer, só depende do botão original
  const updateVisibility = () => {
    const shouldShowFixed = !originalInView;

    fixedBtn.style.display = shouldShowFixed ? 'block' : 'none';

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

  const moBody = new MutationObserver(() => {
    const fresh = findChat();
    if (fresh) {
      chatWidget = fresh;
      if (HIDE_CHAT_ALWAYS) {
        fresh.classList.add('chat-hidden');
      }
    }
    // reforça o footer escondido
    if (footerBar) footerBar.style.setProperty('display', 'none', 'important');
  });
  moBody.observe(document.documentElement || document.body, {
    childList: true,
    subtree: true
  });

  window.addEventListener('scroll', updateVisibility, { passive: true });
  window.addEventListener('resize', updateVisibility);

  updateVisibility();
})();
