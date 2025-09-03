(function () {
  const params = new URLSearchParams(window.location.search);
  const isMobile = window.innerWidth <= 768;
  if (!isMobile) return;

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
    zIndex: '9997',
    margin: '0',
    borderRadius: '0',
    display: 'none',
    height: '60px',
    padding: '20px',
    borderColor: 'transparent',   // começa sem borda
    background: '#363636',
    borderTop: '1px solid transparent',
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

  // 👇 Observer para o botão original
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

  // 👇 Observer para o footer
  const footer = document.querySelector('#footer');
  if (footer) {
    const ioFooter = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            fixedBtn.style.borderColor = '#fff'; // borda aparece
          } else {
            fixedBtn.style.borderColor = 'transparent'; // borda some
          }
        }
      },
      { threshold: 0.1 }
    );
    ioFooter.observe(footer);
  }

  const moBody = new MutationObserver(() => {
    const fresh = findChat();
    if (fresh) {
      chatWidget = fresh;
      if (HIDE_CHAT_ALWAYS) {
        fresh.classList.add('chat-hidden');
      }
    }
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
