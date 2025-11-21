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

  // ===== Contexto do formulário para JSONP =====
  let bdFormContext = {
    errorEl: null,
    successEl: null,
    submitBtn: null,
    emailInput: null
  };

  // Estes helpers vão ser chamados pela AC via JSONP (_show_thank_you / _show_error)
  function bdHandleAcSuccess(emailFromAc) {
    const { errorEl, successEl, submitBtn, emailInput } = bdFormContext;
    if (!successEl || !submitBtn) return;

    const email =
      emailFromAc ||
      (emailInput && emailInput.value ? emailInput.value.trim() : '');

    // marcar subscrito
    const userId = getUserId();
    try {
      if (userId) {
        setLS('bd_nl_subscribed_' + userId, '1');
      } else if (email) {
        setLS('bd_nl_subscribed_email_' + email.toLowerCase(), '1');
      }
    } catch (e) {}

    if (errorEl) {
      errorEl.style.display = 'none';
    }
    successEl.textContent = L.success;
    successEl.style.display = 'block';

    // remover badge com fade
    const badge = document.querySelector('.preorder-badge');
    if (badge) {
      badge.style.transition = 'opacity 0.4s ease';
      badge.style.opacity = '0';
      setTimeout(() => badge.remove(), 400);
    }

    // reativar botão
    submitBtn.disabled = false;

    // fechar painel passado 2.5s
    setTimeout(() => {
      closePanel();
    }, 2500);
  }

  function bdHandleAcError(message) {
    const { errorEl, successEl, submitBtn, emailInput } = bdFormContext;
    if (!errorEl || !submitBtn) return;

    if (successEl) {
      successEl.style.display = 'none';
    }
    errorEl.textContent = message || L.genericError;
    errorEl.style.display = 'block';

    if (emailInput) {
      emailInput.classList.add('_has_error');
    }

    submitBtn.disabled = false;
  }

  // ActiveCampaign JSONP callbacks
  window._show_thank_you = function (id, message, trackcmp_url, email) {
    bdHandleAcSuccess(email);
  };

  window._show_error = function (id, message, html) {
    bdHandleAcError(message || L.genericError);
  };

  // ===== GA: obter user_id do dataLayer (Arguments / arrays / objetos) =====
  function getUserIdFromGA() {
    const dl = window.dataLayer || [];

    for (const item of dl) {
      if (!item || typeof item !== 'object') continue;

      // Trata Arrays e 'Arguments' da mesma forma:
      const kind = item[0]; // 'config', 'event', etc.
      const params = item[2]; // onde está o user_id no config

      // Caso 1: gtag('config', 'G-3RMG5XN702', { user_id: '...' })
      if (kind === 'config' && params && params.user_id) {
        return String(params.user_id);
      }

      // Caso 2: objeto simples com user_id (fallback geral)
      if (item.user_id) {
        return String(item.user_id);
      }
      if (item.user_properties && item.user_properties.user_id) {
        return String(item.user_properties.user_id);
      }
    }

    return null;
  }

  // ===== Config & contexto do script =====
  const currentScript =
    document.currentScript || document.getElementById('bd-nl-script');

  const shopLang =
    currentScript?.getAttribute('data-shop-lang')?.toLowerCase() || 'pt';
  const lang = shopLang.slice(0, 2);
  const workerUrl = currentScript?.getAttribute('data-worker-url') || '';

  function getUserId() {
    // 1) tentar vir do data-user-id
    let id = currentScript?.getAttribute('data-user-id') || '';

    // se vier vazio ou placeholder Redicom, tenta GA
    if (!id || id === '{ID_UTILIZADOR}') {
      const fromGA = getUserIdFromGA();
      if (fromGA) id = fromGA;
    }

    return id || '';
  }

  // Textos
  const TEXTS = {
    pt: {
      badge:
        'SUBSCREVE A NOSSA NEWSLETTER E USUFRUI DE 15% EM TUDO! APENAS DIAS 22/11 E 23/11.',
      panelTitle: 'Subscreve a nossa newsletter',
      panelSubtitle:
        'e usufrui de 15% em tudo! Apenas dias 22/11 e 23/11.',
      emailLabel: 'E-mail',
      emailPlaceholder: 'Introduza o seu e-mail',
      submit: 'Submeter',
      requiredError: 'Este campo é obrigatório.',
      emailError: 'Introduza um endereço de e-mail válido.',
      genericError: 'Lamentamos, mas o envio falhou. Tente novamente.',
      success: 'Obrigado! A sua subscrição foi registada com sucesso.'
    },
    es: {
      badge:
        '¡SUSCRÍBETE A NUESTRA NEWSLETTER Y DISFRUTA DE UN 15% EN TODO! SOLO LOS DÍAS 22/11 Y 23/11.',
      panelTitle: 'Suscríbete a nuestra newsletter',
      panelSubtitle:
        'y disfruta de un 15% en todo. Solo los días 22/11 y 23/11.',
      emailLabel: 'Correo electrónico',
      emailPlaceholder: 'Introduce tu correo electrónico',
      submit: 'Enviar',
      requiredError: 'Este campo es obligatorio.',
      emailError: 'Introduce una dirección de correo válida.',
      genericError: 'Lo sentimos, el envío ha fallado. Inténtalo de nuevo.',
      success: '¡Gracias! Tu suscripción se ha registrado correctamente.'
    },
    en: {
      badge:
        'SUBSCRIBE TO OUR NEWSLETTER AND ENJOY 15% OFF EVERYTHING! ONLY ON 22/11 AND 23/11.',
      panelTitle: 'Subscribe to our newsletter',
      panelSubtitle:
        'and enjoy 15% off everything. Only on 22/11 and 23/11.',
      emailLabel: 'Email',
      emailPlaceholder: 'Enter your email',
      submit: 'Submit',
      requiredError: 'This field is required.',
      emailError: 'Please enter a valid email address.',
      genericError: 'Sorry, something went wrong. Please try again.',
      success: 'Thank you! Your subscription has been registered successfully.'
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

  // ===== CSS injetado (badge + painel + form) =====
  function ensureStyles() {
    if (document.querySelector('style[data-bd-nl]')) return;

    const style = document.createElement('style');
    style.setAttribute('data-bd-nl', '');
    style.textContent = `
      .preorder-badge{
        box-sizing:border-box;
        display:inline-flex; align-items:center; justify-content:center; gap:14px;
        background:#E30613 !important;
        border:0 !important;
        border-radius:0 !important;
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

      .bd-nl-form{
        margin-top:8px;
      }
      .bd-nl-form-group{
        margin-bottom:12px;
      }
      .bd-nl-form-label{
        display:block;
        font-weight:600;
        margin-bottom:4px;
      }
      .bd-nl-form-input{
        width:100%;
        padding:8px 10px;
        border:1px solid #979797;
        border-radius:4px;
        font-size:14px;
        box-sizing:border-box;
      }
      .bd-nl-form-input._has_error{
        border-color:#F37C7B;
      }
      .bd-nl-form-error{
        color:#CA0000;
        font-size:12px;
        margin-top:4px;
      }
      .bd-nl-form-success{
        color:#008A00;
        font-size:14px;
        margin-top:8px;
      }
      .bd-nl-submit{
        display: inline-block;
        line-height: normal;
        text-align: center;
        text-decoration: none !important;
        font-family: 'Metrocity-Medium', Arial, Helvetica, 'Segoe UI', sans-serif;
        font-weight: normal;
        font-size: 12px;
        letter-spacing: 0.4px;
        text-transform: uppercase;
        border: 1px solid #333;
        background-color: #333;
        padding: 14px 26px;
        color: #FFF;
        height: 44px;
      }
      .bd-nl-submit:disabled{
        opacity:0.6;
        cursor:not-allowed;
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

  function renderFormIntoSlot(slot) {
    if (!slot || slot.dataset.bdRendered === '1') return;
    slot.dataset.bdRendered = '1';

    slot.innerHTML = `
      <form id="bd-nl-form" class="bd-nl-form" novalidate>
        <div class="bd-nl-form-group">
          <label class="bd-nl-form-label">${L.emailLabel} *</label>
          <input type="email"
                id="bd-nl-email"
                class="bd-nl-form-input"
                placeholder="${L.emailPlaceholder}">
          <div class="bd-nl-form-error" id="bd-nl-error" style="display:none;"></div>
        </div>

        <button type="submit" class="bd-nl-submit" id="bd-nl-submit">
          ${L.submit}
        </button>

        <div class="bd-nl-form-success" id="bd-nl-success" style="display:none;"></div>
      </form>
    `;

    const form = slot.querySelector('#bd-nl-form');
    const emailInput = slot.querySelector('#bd-nl-email');
    const errorEl = slot.querySelector('#bd-nl-error');
    const successEl = slot.querySelector('#bd-nl-success');
    const submitBtn = slot.querySelector('#bd-nl-submit');

    // guardar contexto global para o JSONP da AC
    bdFormContext.errorEl = errorEl;
    bdFormContext.successEl = successEl;
    bdFormContext.submitBtn = submitBtn;
    bdFormContext.emailInput = emailInput;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // reset erros
      errorEl.style.display = 'none';
      successEl.style.display = 'none';
      emailInput.classList.remove('_has_error');

      const email = emailInput.value.trim();

      // validações
      if (!email) {
        errorEl.textContent = L.requiredError;
        errorEl.style.display = 'block';
        emailInput.classList.add('_has_error');
        return;
      }
      const re = /^[\+_a-z0-9-'&=]+(\.[\+_a-z0-9-']+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i;
      if (!re.test(email)) {
        errorEl.textContent = L.emailError;
        errorEl.style.display = 'block';
        emailInput.classList.add('_has_error');
        return;
      }

      submitBtn.disabled = true;

      // construir query para ActiveCampaign (igual ao form 6)
      const params = new URLSearchParams();
      params.set('u', '6');
      params.set('f', '6');
      params.set('s', '');
      params.set('c', '0');
      params.set('m', '0');
      params.set('act', 'sub');
      params.set('v', '2');
      params.set('or', '3f05d62f-1319-4e2a-9330-253b98afd0ee');
      params.set('email', email);
      params.set('jsonp', 'true');

      // JSONP: inject script para contornar CORS
      const script = document.createElement('script');
      script.src =
        'https://bazardesportivo.activehosted.com/proc.php?' +
        params.toString();
      script.async = true;
      script.onerror = function () {
        bdHandleAcError(L.genericError);
      };
      document.head.appendChild(script);
    });
  }

  function openPanel() {
    const { overlay, panel } = ensurePanel();
    const slot = panel.querySelector('#bd-nl-form-slot');

    renderFormIntoSlot(slot);

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
    // garantir CSS antes de criar o badge (para evitar ficar com estilos do tema)
    ensureStyles();

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
    // força mesmo o vermelho e branco
    wrap.style.background = '#E30613';
    wrap.style.color = '#FFFFFF';

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

  // ===== Worker: verificar se já existe contacto pelo id_utilizador =====
  async function checkUserExistsIfNeeded() {
    const userId = getUserId();

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
