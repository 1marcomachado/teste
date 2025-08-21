(function () {
  const params = new URLSearchParams(window.location.search);
  const isMobile = window.innerWidth <= 768; // 👈 só até 768px
  if (params.get('mostrar_carrinho') !== '1' || !isMobile) return;

  const originalBtn = document.querySelector('#btt_addcart');
  if (!originalBtn) return;

  const footerBar = document.querySelector('.wrapper-footer-product');
  const chatWidget = document.querySelector('.online_chat.online_chat_mini_button');

  // 🔹 CSS extra para esconder o chat com prioridade
  const style = document.createElement('style');
  style.textContent = `
    .chat-hidden { display: none !important; }
  `;
  document.head.appendChild(style);

  // 🔹 Criar botão fixo (clone do original)
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
  });
  document.body.appendChild(fixedBtn);

  // Clicar no fixo → dispara o original
  fixedBtn.addEventListener('click', (e) => {
    e.preventDefault();
    originalBtn.click();
  });

  // Helpers
  let originalInView = false;
  let footerInView = false;

  const isActuallyVisible = (el) => {
    if (!el) return false;
    const cs = getComputedStyle(el);
    return cs.display !== 'none' && cs.visibility !== 'hidden' && cs.opacity !== '0';
  };

  // 🔹 Controla visibilidade do botão fixo + chat
  const updateVisibility = () => {
    const footerActive =
      !!footerBar &&
      (footerBar.classList.contains('visible') || footerInView) &&
      isActuallyVisible(footerBar);

    const shouldShowFixed = !originalInView && !footerActive;

    // Mostrar/esconder botão fixo
    fixedBtn.style.display = shouldShowFixed ? 'block' : 'none';

    // Regras do chat
    if (chatWidget) {
      if (shouldShowFixed || footerActive) {
        chatWidget.classList.add('chat-hidden');
      } else {
        chatWidget.classList.remove('chat-hidden');
      }
    }
  };

  // Observa botão original no viewport
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

  // Observa footerBar
  if (footerBar) {
    const ioFooter = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === footerBar) footerInView = e.isIntersecting;
        }
        updateVisibility();
      },
      { threshold: 0.01 }
    );
    ioFooter.observe(footerBar);

    const moFooter = new MutationObserver(updateVisibility);
    moFooter.observe(footerBar, { attributes: true, attributeFilter: ['class', 'style'] });
  }

  window.addEventListener('scroll', updateVisibility, { passive: true });
  window.addEventListener('resize', updateVisibility);

  // Primeira avaliação
  updateVisibility();
})();
