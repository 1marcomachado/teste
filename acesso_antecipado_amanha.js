(function () {
  // ===== Helpers =====
  function waitForEl(selector, { timeout = 7000 } = {}) {
    return new Promise(resolve => {
      const now = document.querySelector(selector);
      if (now) return resolve(now);
      const obs = new MutationObserver(() => {
        const el = document.querySelector(selector);
        if (el) {
          obs.disconnect();
          resolve(el);
        }
      });
      obs.observe(document.documentElement, { childList: true, subtree: true });
      setTimeout(() => {
        obs.disconnect();
        resolve(null);
      }, timeout);
    });
  }

  function safeLS() {
    try {
      const ls = window.localStorage;
      ls.setItem('__test', '1');
      ls.removeItem('__test');
      return ls;
    } catch (e) {
      return null;
    }
  }

  const LS = safeLS();

  function getLS(key) {
    if (!LS) return null;
    try {
      return LS.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function setLS(key, val) {
    if (!LS) return;
    try {
      LS.setItem(key, val);
    } catch (e) {}
  }

  // ===== Config & contexto do script =====
  const currentScript =
    document.currentScript || document.getElementById('bd-nl-script');

  const shopLang =
    currentScript?.getAttribute('data-shop-lang')?.toLowerCase() || 'pt';
  const lang = shopLang.slice(0, 2);
  const workerUrl = currentScript?.getAttribute('data-worker-url') || '';
  const userId = currentScript?.getAttribute('data-user-id') || '';

  // Textos
  const TEXTS = {
    pt: {
      badge:
        'SUBSCREVE A NOSSA NEWSLETTER E USUFRUI DE 15% EM TUDO! APENAS DIAS 22/11 E 23/11.',
      panelTitle: 'Subscreve a nossa newsletter',
      panelSubtitle:
        'e usufrui de 15% em tudo! Apenas dias 22/11 e 23/11.'
    },
    es: {
      badge:
        '¡SUSCRÍBETE A NUESTRA NEWSLETTER Y DISFRUTA DE UN 15% EN TODO! SOLO LOS DÍAS 22/11 Y 23/11.',
      panelTitle: 'Suscríbete a nuestra newsletter',
      panelSubtitle:
        'y disfruta de un 15% en todo. Solo los días 22/11 y 23/11.'
    },
    en: {
      badge:
        'SUBSCRIBE TO OUR NEWSLETTER AND ENJOY 15% OFF EVERYTHING! ONLY ON 22/11 AND 23/11.',
      panelTitle: 'Subscribe to our newsletter',
      panelSubtitle:
        'and enjoy 15% off everything. Only on 22/11 and 23/11.'
    }
  };

  const L = TEXTS[lang] || TEXTS.pt;

  // Referências elegíveis para mostrar a campanha
  const REFERENCIAS_PREORDER = ['IH4119-006']; // podes adicionar mais

  function getReferencia() {
    const el = document.querySelector('.ref p.small');
    if (!el) return null;
    return el.textContent.trim().replace(/^#/, '').split('|')[0].trim();
  }

  // ===== CSS injetado (badge + painel) =====
  function ensureStyles() {
    if (document.querySelector('style[data-bd-nl]')) return;

    const style = document.createElement('style');
    style.setAttribute('data-bd-nl', '');
    style.textContent = `
      .preorder-badge{
        box-sizing:border-box;
        display:inline-flex; align-items:center; justify-content:center; gap:14px;
        background:#E30613; border:0; border-radius:0;
        font-family:'Oswald-Regular', Arial, Helvetica, 'Segoe UI', sans-serif;
        font-weight:800; text-transform:uppercase;
        color:#FFFFFF !important; user-select:none;
        cursor:pointer;
      }
      .preorder-badge--compact{ padding:12px 16px; display:inline-flex; }
      .preorder-badge--full{ padding:12px 16px; display:flex; width:100%; }
      .preorder-badge__text{
        font-size:13px; line-height:1.3; color:#FFFFFF !important; text-align:center;
      }
      @media (max-width:560px){
        .preorder-badge--full .preorder-badge__text{ font-size:12px; }
      }

      .bd-nl-overlay{
        position:fixed; inset:0;
        background:rgba(0,0,0,.45);
        opacity:0; visibility:hidden;
        transition:opacity .25s ease, visibility .25s ease;
        z-index:9998;
      }
      .bd-nl-overlay.is-open{
        opacity:1; visibility:visible;
      }
      .bd-nl-panel{
        position:fixed; top:0; right:0;
        width:100%; max-width:420px; height:100%;
        background:#fff;
        box-shadow:0 0 30px rgba(0,0,0,.3);
        transform:translateX(100%);
        transition:transform .25s ease;
        z-index:9999;
        display:flex; flex-direction:column;
        font-family:Arial, Helvetica, 'Segoe UI', sans-serif;
      }
      .bd-nl-panel.is-open{
        transform:translateX(0);
      }
      .bd-nl-header{
        display:flex; align-items:center; justify-content:space-between;
        padding:16px 20px 8px;
        border-bottom:1px solid #eee;
      }
      .bd-nl-header-text{
        max-width:calc(100% - 40px);
      }
      .bd-nl-title{
        font-size:18px; font-weight:700;
      }
      .bd-nl-subtitle{
        font-size:14px; margin-top:4px; line-height:1.4;
      }
      .bd-nl-close{
        background:none; border:0; cursor:pointer;
        width:24px; height:24px; position:relative;
      }
      .bd-nl-close:before,
      .bd-nl-close:after{
        content:''; position:absolute; top:50%; left:50%;
        width:18px; height:2px; background:#000;
        transform-origin:center;
      }
      .bd-nl-close:before{ transform:translate(-50%, -50%) rotate(45deg); }
      .bd-nl-close:after{ transform:translate(-50%, -50%) rotate(-45deg); }

      .bd-nl-body{
        padding:12px 16px 16px;
        font-size:14px;
        overflow-y:auto;
      }

      @media (max-width:768px){
        .bd-nl-panel{
          top:auto;
          bottom:0;
          left:0;
          right:0;
          max-width:100%;
          height:50vh;
          border-radius:12px 12px 0 0;
          transform:translateY(100%);
        }
        .bd-nl-panel.is-open{
          transform:translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ===== Overlay + painel =====
  function ensurePanel() {
    ensureStyles();

    let overlay = document.querySelector('.bd-nl-overlay');
    let panel = document.querySelector('.bd-nl-panel');

    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'bd-nl-overlay';
      document.body.appendChild(overlay);
    }

    if (!panel) {
      panel = document.createElement('aside');
      panel.className = 'bd-nl-panel';
      panel.setAttribute('role', 'dialog');
      panel.setAttribute('aria-modal', 'true');
      panel.setAttribute('aria-label', L.panelTitle);

      panel.innerHTML = `
        <div class="bd-nl-header">
          <div class="bd-nl-header-text">
            <div class="bd-nl-title">${L.panelTitle}</div>
            <div class="bd-nl-subtitle">${L.panelSubtitle}</div>
          </div>
          <button type="button" class="bd-nl-close" aria-label="Fechar"></button>
        </div>
        <div class="bd-nl-body">
          <div id="bd-nl-form-slot"></div>
        </div>
      `;
      document.body.appendChild(panel);

      const closeBtn = panel.querySelector('.bd-nl-close');
      closeBtn.addEventListener('click', closePanel);
      overlay.addEventListener('click', closePanel);
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closePanel();
      });
    }

    return { overlay, panel };
  }

  function openPanel() {
    const { overlay, panel } = ensurePanel();
    const slot = panel.querySelector('#bd-nl-form-slot');

    // mover formulário AC para dentro do painel
    const acForm = document.getElementById('_form_6_');
    if (!acForm) {
      console.warn(
        '[BD NL] Formulário ActiveCampaign (#_form_6_) não encontrado na página.'
      );
    } else {
      if (acForm.parentElement !== slot) {
        slot.innerHTML = '';
        slot.appendChild(acForm);
      }
      acForm.style.display = 'block';
    }

    overlay.classList.add('is-open');
    panel.classList.add('is-open');
  }

  function closePanel() {
    const overlay = document.querySelector('.bd-nl-overlay');
    const panel = document.querySelector('.bd-nl-panel');
    if (overlay) overlay.classList.remove('is-open');
    if (panel) panel.classList.remove('is-open');
  }

  // ===== BADGE =====
  async function addBadge() {
    const anchorSelector = '.rdc-product-afterprice';
    const ref =
      document.querySelector(anchorSelector) || (await waitForEl(anchorSelector));
    if (!ref) return;

    document.querySelectorAll('.preorder-badge').forEach(n => n.remove());

    const wrap = document.createElement('div');
    wrap.className = 'preorder-badge preorder-badge--full';
    wrap.setAttribute('role', 'button');
    wrap.setAttribute('tabindex', '0');
    wrap.setAttribute('aria-live', 'polite');
    wrap.setAttribute('aria-label', L.badge);

    const text = document.createElement('span');
    text.className = 'preorder-badge__text';
    text.textContent = L.badge;

    wrap.append(text);
    ref.insertAdjacentElement('afterend', wrap);

    wrap.addEventListener('click', openPanel);
    wrap.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openPanel();
      }
    });
  }

  // ===== Integração ActiveCampaign: marcar subscrito no localStorage =====
  (function hookActiveCampaignThankYou() {
    const original = window._show_thank_you;

    window._show_thank_you = function (id, message, trackcmp_url, email) {
      if (typeof original === 'function') {
        original(id, message, trackcmp_url, email);
      }

      try {
        if (userId) {
          setLS('bd_nl_subscribed_' + userId, '1');
        } else if (email) {
          setLS('bd_nl_subscribed_email_' + String(email).toLowerCase(), '1');
        } else {
          setLS('bd_nl_subscribed_generic', '1');
        }
      } catch (e) {}

      closePanel();
    };
  })();

  // ===== Worker: verificar se já existe contacto pelo id_utilizador =====
  async function checkUserExistsIfNeeded() {
    if (!userId || !workerUrl) {
      // não temos id ou worker -> não conseguimos validar, mostra badge normal
      return { shouldShowBadge: true };
    }

    const subscribedKey = 'bd_nl_subscribed_' + userId;
    const existsKey = 'bd_nl_exists_' + userId;
    const checkedKey = 'bd_nl_checked_' + userId;

    // Se já sabemos que subscreveu, nem mostra badge
    if (getLS(subscribedKey) === '1') {
      return { shouldShowBadge: false };
    }

    // Se já sabemos que existe (resultado anterior do worker), também não mostramos
    if (getLS(existsKey) === '1') {
      return { shouldShowBadge: false };
    }

    // Se já marcámos que verificámos e decidimos mostrar badge, não voltamos a chamar worker
    if (getLS(checkedKey) === '1' && getLS(existsKey) !== '1') {
      return { shouldShowBadge: true };
    }

    // Chamar worker pela primeira vez
    try {
      const resp = await fetch(workerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_utilizador: userId })
      });
      const data = await resp.json();
      // data: { exists: boolean, contactId?, fieldValueId?, value? }

      setLS(checkedKey, '1');

      if (data && data.exists) {
        setLS(existsKey, '1');
        return { shouldShowBadge: false, exists: true, contactId: data.contactId };
      } else {
        return { shouldShowBadge: true, exists: false };
      }
    } catch (e) {
      console.warn('[BD NL] Erro ao chamar worker AC:', e);
      // fallback: não bloquear a campanha só porque a AC falhou
      return { shouldShowBadge: true, error: true };
    }
  }

  // ===== Klarna (igual ao teu, opcional) =====
  async function placeKlarna({ mode = 'move' } = {}) {
    const targetSel = '#fixedDiv .buttons.clearfix';
    const target =
      document.querySelector(targetSel) || (await waitForEl(targetSel));
    if (!target || !target.parentNode) return;

    const allKlarna = Array.from(
      document.querySelectorAll('.rdc-product-klarna-placement')
    );
    if (!allKlarna.length) return;

    document
      .querySelectorAll('.rdc-klarna-injected')
      .forEach(n => n.remove());
    document
      .querySelectorAll('#rdc-productrange-expeditioninfo')
      .forEach(n => n.remove());

    const original = allKlarna[0];
    if (mode === 'clone') {
      const clone = original.cloneNode(true);
      clone.classList.add('rdc-klarna-injected');
      clone.style.paddingBottom = '10px';
      target.parentNode.insertBefore(clone, target);
    } else {
      original.classList.add('rdc-klarna-injected');
      original.style.paddingBottom = '10px';
      target.parentNode.insertBefore(original, target);
      allKlarna.forEach(el => {
        if (el !== original) el.remove();
      });
    }
  }

  // ===== Init =====
  async function init() {
    // -------- GATE ACESSO_AMANHA --------
    const params = new URLSearchParams(window.location.search);
    const acessoAmanha = params.get('acesso_amanha');
    if (acessoAmanha !== '1') {
      // sem o parâmetro, não faz NADA (Opção B)
      return;
    }
    // -----------------------------------

    const refAtual = getReferencia();
    if (!refAtual || !REFERENCIAS_PREORDER.includes(refAtual)) {
      return;
    }

    const workerResult = await checkUserExistsIfNeeded();

    if (workerResult.shouldShowBadge) {
      await addBadge();
    }

    // Klarna se for necessário
    await placeKlarna({ mode: 'move' });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
