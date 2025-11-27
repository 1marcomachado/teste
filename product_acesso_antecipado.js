(function () {
  const LOG_PREFIX = '[BD NL]';

  // =========================
  // 1) HELPERS
  // =========================

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
      ls.setItem('__bd_test', '1');
      ls.removeItem('__bd_test');
      return ls;
    } catch {
      return null;
    }
  }

  const LS = safeLS();

  function getLS(key) {
    if (!LS) return null;
    try {
      return LS.getItem(key);
    } catch {
      return null;
    }
  }

  function setLS(key, val) {
    if (!LS) return;
    try {
      LS.setItem(key, val);
    } catch {}
  }

  // Normalização texto
  const norm = s => (s || '')
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

  // flags para ativar tudo
  const acesso_antecpiado_variants = [
    'acesso antecipado -20%',
    'early access -20%',
    'acceso anticipado -20%'
  ].map(norm);

  function hasEarlyAccessFlag() {
    const flags = Array.from(document.querySelectorAll('.product-info .flags .flag'));
    return flags.some(f => acesso_antecpiado_variants.includes(norm(f.textContent)));
  }

  // Form AC context
  let bdFormContext = {
    errorEl: null,
    successEl: null,
    submitBtn: null,
    emailInput: null
  };

  // =========================
  // 2) CONTEXTO SCRIPT
  // =========================

  function getUserIdFromGA() {
    const dl = window.dataLayer || [];

    for (const item of dl) {
      if (!item || typeof item !== 'object') continue;

      const kind = item[0];
      const params = item[2];

      if (kind === 'config' && params && params.user_id) {
        return String(params.user_id);
      }

      if (item.user_id) return String(item.user_id);
      if (item.user_properties && item.user_properties.user_id)
        return String(item.user_properties.user_id);
    }
    return null;
  }

  const currentScript =
    document.currentScript || document.getElementById('bd-nl-script');

  const shopLang = currentScript?.getAttribute('data-shop-lang')?.toLowerCase() || 'pt';
  const lang = shopLang.slice(0, 2);
  const workerUrl = currentScript?.getAttribute('data-worker-url') || '';

  function getUserId() {
    let id = currentScript?.getAttribute('data-user-id') || '';
    if (!id || id === '{ID_UTILIZADOR}') {
      const fromGA = getUserIdFromGA();
      if (fromGA) id = fromGA;
    }
    return id || '';
  }

  // =========================
  // 3) TEXTOS
  // =========================
  const TEXTS = {
    pt: {
      panelTitle: 'Acede antecipadamente à Black Friday',
      panelSubtitle:
        'Subscreve a nossa newsletter e usufrui de 20% em tudo.',
      emailLabel: 'E-mail',
      emailPlaceholder: 'Introduza o seu e-mail',
      submit: 'Submeter',
      requiredError: 'Este campo é obrigatório.',
      emailError: 'Introduza um endereço de e-mail válido.',
      genericError: 'Lamentamos, mas o envio falhou. Tente novamente.',
      success: 'Obrigado! A sua subscrição foi registada com sucesso.'
    },
    es: {
      panelTitle: 'Accede anticipadamente al Black Friday',
      panelSubtitle:
        'Suscríbete a nuestra newsletter y disfruta de un 20% en todo.',
      emailLabel: 'Correo electrónico',
      emailPlaceholder: 'Introduce tu correo electrónico',
      submit: 'Enviar',
      requiredError: 'Este campo es obligatorio.',
      emailError: 'Introduce una dirección de correo válida.',
      genericError: 'Lo sentimos, el envío ha fallado. Inténtalo de nuevo.',
      success: '¡Gracias! Tu subscripción se ha registrado correctamente.'
    },
    en: {
      panelTitle: 'Get early access to Black Friday',
      panelSubtitle:
        'Subscribe to our newsletter and enjoy 20% off everything.',
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

  // =========================
  // 4) CSS + PAINEL
  // =========================

  function ensureStyles() {
    if (document.querySelector('style[data-bd-nl]')) return;

    const style = document.createElement('style');
    style.setAttribute('data-bd-nl', '');
style.textContent = `
  .bd-nl-overlay{
    position:fixed;inset:0;
    background:rgba(0,0,0,.45);
    opacity:0;visibility:hidden;
    transition:.25s;
    z-index:9998;
  }
  .bd-nl-overlay.is-open{
    opacity:1;visibility:visible;
  }

  /* DESKTOP PANEL – slide from right */
  .bd-nl-panel{
    position:fixed;top:0;right:0;
    width:100%;max-width:420px;height:100%;
    background:#fff;
    transform:translateX(100%);
    transition:transform .25s ease;
    z-index:9999;
    display:flex;flex-direction:column;
  }
  .bd-nl-panel.is-open{
    transform:translateX(0);
  }

  .bd-nl-header{
    padding:16px;border-bottom:1px solid #eee;
    position:relative;
  }
  .bd-nl-title{font-size:18px;font-weight:700;}
  .bd-nl-subtitle{font-size:14px;margin-top:4px;}

  .bd-nl-close{
    position:absolute;top:16px;right:16px;
    width:24px;height:24px;cursor:pointer;
    background:none;border:0;
  }
  .bd-nl-close:before,
  .bd-nl-close:after{
    content:'';position:absolute;left:50%;top:50%;
    width:18px;height:2px;background:#000;
    transform-origin:center;
  }
  .bd-nl-close:before{
    transform:translate(-50%, -50%) rotate(45deg);
  }
  .bd-nl-close:after{
    transform:translate(-50%, -50%) rotate(-45deg);
  }

  .bd-nl-body{padding:16px;overflow:auto;}

  /* MOBILE PANEL – bottom sheet */
  @media (max-width: 768px){
    .bd-nl-panel{
      top:auto;bottom:0;
      right:0;left:0;
      width:100%;max-width:none;
      height:55vh;
      border-radius:14px 14px 0 0;
      transform:translateY(100%);
    }
    .bd-nl-panel.is-open{
      transform:translateY(0);
    }
    .bd-nl-close{
      top:12px;
      right:12px;
    }
  }

  .bd-nl-form-input{width:100%;padding:8px;border:1px solid #aaa;border-radius:4px;}
  ._has_error{border-color:#d00!important;}
  .bd-nl-form-error{color:#c00;font-size:12px;margin-top:4px;}
  .bd-nl-form-success{color:#080;margin-top:8px;}
  .bd-nl-submit{
    margin-top:10px;
    width:100%;
    height:44px;
    background:#333;color:#fff;border:0;
    text-transform:uppercase;cursor:pointer;
  }
`;
    document.head.appendChild(style);
  }

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
      panel.innerHTML = `
        <div class="bd-nl-header">
          <div class="bd-nl-title">${L.panelTitle}</div>
          <div class="bd-nl-subtitle">${L.panelSubtitle}</div>
          <div class="bd-nl-close"></div>
        </div>
        <div class="bd-nl-body"><div id="bd-nl-form-slot"></div></div>
      `;
      document.body.appendChild(panel);

      overlay.addEventListener('click', closePanel);
      panel.querySelector('.bd-nl-close').addEventListener('click', closePanel);
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closePanel();
      });
    }

    return { overlay, panel };
  }

  function closePanel() {
    document.querySelector('.bd-nl-overlay')?.classList.remove('is-open');
    document.querySelector('.bd-nl-panel')?.classList.remove('is-open');
  }

  function openPanel() {
    const { overlay, panel } = ensurePanel();
    renderFormIntoSlot(panel.querySelector('#bd-nl-form-slot'));
    overlay.classList.add('is-open');
    panel.classList.add('is-open');
  }

  // tornar aberto global p/ Klarna
  window.bdNlOpenPanel = openPanel;

  // =========================
  // 5) FORM JSONP AC
  // =========================

  function renderFormIntoSlot(slot) {
    if (!slot || slot.dataset.bdRendered === '1') return;
    slot.dataset.bdRendered = '1';

    slot.innerHTML = `
      <form id="bd-nl-form" class="bd-nl-form" novalidate>
        <label>${L.emailLabel} *</label>
        <input id="bd-nl-email" type="email" class="bd-nl-form-input" placeholder="${L.emailPlaceholder}">
        <div id="bd-nl-error" class="bd-nl-form-error" style="display:none;"></div>
        <button id="bd-nl-submit" class="bd-nl-submit">${L.submit}</button>
        <div id="bd-nl-success" class="bd-nl-form-success" style="display:none;"></div>
      </form>
    `;

    const form = slot.querySelector('#bd-nl-form');
    const emailInput = slot.querySelector('#bd-nl-email');
    const errorEl = slot.querySelector('#bd-nl-error');
    const successEl = slot.querySelector('#bd-nl-success');
    const submitBtn = slot.querySelector('#bd-nl-submit');

    bdFormContext = { errorEl, successEl, submitBtn, emailInput };

    form.addEventListener('submit', e => {
      e.preventDefault();

      errorEl.style.display = 'none';
      successEl.style.display = 'none';
      emailInput.classList.remove('_has_error');

      const email = emailInput.value.trim();
      const re = /^[\+_a-z0-9-'&=]+(\.[\+_a-z0-9-']+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i;

      if (!email) {
        errorEl.textContent = L.requiredError;
        errorEl.style.display = 'block';
        emailInput.classList.add('_has_error');
        return;
      }
      if (!re.test(email)) {
        errorEl.textContent = L.emailError;
        errorEl.style.display = 'block';
        emailInput.classList.add('_has_error');
        return;
      }

      submitBtn.disabled = true;

      const params = new URLSearchParams({
        u: '6',
        f: '6',
        s: '',
        c: '0',
        m: '0',
        act: 'sub',
        v: '2',
        or: '3f05d62f-1319-4e2a-9330-253b98afd0ee',
        email,
        jsonp: 'true'
      });

      const script = document.createElement('script');
      script.src = 'https://bazardesportivo.activehosted.com/proc.php?' + params.toString();
      script.async = true;
      script.onerror = () => bdHandleAcError(L.genericError);
      document.head.appendChild(script);
    });
  }

  function bdHandleAcSuccess(emailFromAc) {
    const { errorEl, successEl, submitBtn, emailInput } = bdFormContext;

    const email = emailFromAc || emailInput?.value?.trim();
    const userId = getUserId();

    if (userId) setLS('bd_nl_subscribed_' + userId, '1');
    else if (email) setLS('bd_nl_subscribed_email_' + email.toLowerCase(), '1');

    if (errorEl) errorEl.style.display = 'none';
    successEl.textContent = L.success;
    successEl.style.display = 'block';
    submitBtn.disabled = false;

    setTimeout(closePanel, 2000);
  }

  function bdHandleAcError(msg) {
    const { errorEl, submitBtn, emailInput } = bdFormContext;

    errorEl.textContent = msg;
    errorEl.style.display = 'block';
    emailInput.classList.add('_has_error');
    submitBtn.disabled = false;
  }

  window._show_thank_you = function (_, __, ___, email) {
    bdHandleAcSuccess(email);
  };
  window._show_error = function (_, message) {
    bdHandleAcError(message || L.genericError);
  };

  // =========================
  // 6) WORKER AC
  // =========================

  async function checkUserExistsIfNeeded() {
    const userId = getUserId();
    if (!userId || !workerUrl) return { shouldShowCampaign: true };

    const subscribedKey = 'bd_nl_subscribed_' + userId;
    const existsKey = 'bd_nl_exists_' + userId;
    const checkedKey = 'bd_nl_checked_' + userId;

    if (getLS(subscribedKey) === '1') return { shouldShowCampaign: false };
    if (getLS(existsKey) === '1') return { shouldShowCampaign: false };
    if (getLS(checkedKey) === '1') return { shouldShowCampaign: true };

    try {
      const resp = await fetch(workerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_utilizador: userId })
      });
      const data = await resp.json();

      setLS(checkedKey, '1');

      if (data.exists) {
        setLS(existsKey, '1');
        return { shouldShowCampaign: false };
      }

      return { shouldShowCampaign: true };
    } catch {
      return { shouldShowCampaign: true };
    }
  }

  // =========================
  // 7) KLARNA + IMAGEM → abrir painel
  // =========================

  function enhanceKlarna({ withCampaign }) {
    // mover blocos
    const visual = document.querySelector('[ng-controller="visualPagerBlocksController"]');
    const product = document.querySelector('[ng-controller="productPacksGroupController"]');

    if (visual && product && product.parentNode) {
      const isAfter =
        visual.compareDocumentPosition(product) & Node.DOCUMENT_POSITION_FOLLOWING;
      if (!isAfter) product.parentNode.insertBefore(visual, product);
    }

    const elementoParaMover = document.querySelector('.rdc-product-beforebuttons');
    const elementoAlvo = document.querySelector('.wrapper-accordion-info');

    if (elementoParaMover && elementoAlvo && elementoAlvo.parentNode) {
      elementoAlvo.parentNode.insertBefore(elementoParaMover, elementoAlvo);
      elementoAlvo.style.padding = '0';
    }

    const klarnaOriginal = document.querySelector('.rdc-product-klarna-placement');
    const botaoAlvo = document.querySelector('#fixedDiv .buttons.clearfix');
    if (!klarnaOriginal || !botaoAlvo || !botaoAlvo.parentNode) return;

    const klarnaClone = klarnaOriginal.cloneNode(true);
    klarnaClone.style.paddingBottom = '10px';
    botaoAlvo.parentNode.insertBefore(klarnaClone, botaoAlvo);

    // só mostra banner/click se a campanha estiver ativa para este user
    if (!withCampaign) return;

    const imgMap = { pt: 'misc43.jpg', es: 'misc42.jpg', en: 'misc44.jpg?v=1' };
    const file = imgMap[lang] || imgMap.pt;

    klarnaOriginal.innerHTML =
      `<img src="https://www.bzronline.com/downloads/${file}" />`;

    klarnaOriginal.style.cursor = 'pointer';
    klarnaOriginal.setAttribute('role', 'button');
    klarnaOriginal.setAttribute('tabindex', '0');

    const handler = e => {
      if (e.type === 'click' ||
        (e.type === 'keydown' && ['Enter', ' '].includes(e.key))) {
        e.preventDefault();
        openPanel();
      }
    };

    klarnaOriginal.addEventListener('click', handler);
    klarnaOriginal.addEventListener('keydown', handler);
  }

  // =========================
  // 8) INIT
  // =========================

  async function init() {
    // só ativa se o produto tiver flag de acesso antecipado
    if (!hasEarlyAccessFlag()) return;

    const workerRes = await checkUserExistsIfNeeded();
    const withCampaign = workerRes.shouldShowCampaign !== false;

    // move klarna e, se aplicável, substitui pela imagem + click
    enhanceKlarna({ withCampaign });
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', init);
  else
    init();
})();
