(function () {
  const params = new URLSearchParams(window.location.search);
  const isMobile = window.innerWidth <= 768; // ajusta se quiseres incluir tablet
  if (params.get('mostrar_carrinho') !== '1' || !isMobile) return;

  // 👉 Se true, o chat fica SEMPRE escondido enquanto este modo estiver ativo
  const HIDE_CHAT_ALWAYS = true;

  const originalBtn = document.querySelector('#btt_addcart');
  if (!originalBtn) return;

  const footerBar = document.querySelector('.wrapper-footer-product');

  // Seletores possíveis do chat (alguns widgets mudam a classe/estrutura)
  const chatSelectors = [
    '.online_chat.online_chat_mini_button',
    '.online_chat',
    '[class*="chat"][class*="mini"]'
  ];

  // Util: encontrar o chat atual
  const findChat = () => {
    for (const sel of chatSelectors) {
      const el = document.querySelector(sel);
      if (el) return el;
    }
    return null;
  };

  // CSS utilitário
  const style = document.createElement('style');
  style.textContent = `
    .chat-hidden { display: none !important; }
    .force-hide-footer { display: none !important; }
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
    height: '55px',
    padding: '20px',
    borderColor: '#363636',
    background: '#363636',
    display: 'block' // sempre visível
  });
  document.body.appendChild(fixedBtn);

  // 🔹 Esconde a barra original SEMPRE
  if (footerBar) {
    footerBar.classList.add('force-hide-footer');
    // se algum script remover o estilo, voltamos a aplicar
    new MutationObserver(() => footerBar.classList.add('force-hide-footer'))
      .observe(footerBar, { attributes: true, attributeFilter: ['class', 'style'] });
  }

  // 🔹 Chat sempre escondido (se definido)
  let chatWidget = findChat();
  const applyHideChat = (el) => el && el.classList.add('chat-hidden');
  if (HIDE_CHAT_ALWAYS) applyHideChat(chatWidget);

  // Observa o DOM para reaparição/troca do chat
  const moBody = new MutationObserver(() => {
    const fresh = findChat();
    if (fresh && fresh !== chatWidget) {
      chatWidget = fresh;
      if (HIDE_CHAT_ALWAYS) applyHideChat(fresh);
    }
  });
  moBody.observe(document.documentElement || document.body, { childList: true, subtree: true });

  // Clicar no fixo → dispara o original
  fixedBtn.addEventListener('click', (e) => {
    e.preventDefault();
    originalBtn.click();
  });
})();
