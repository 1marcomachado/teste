(function () {
  // ===== Detecção automática de idioma e país =====
  function detectLanguage() {
    const select = document.getElementById('lg');
  
    if (select) {
      const selected = select.options[select.selectedIndex];
      const lang = selected?.dataset?.name;
      if (lang) return lang;
    }
  
    const browserLang = navigator.language || navigator.userLanguage;
  
    if (browserLang.startsWith('pt')) return 'pt';
    if (browserLang.startsWith('es')) return 'es';
    return 'en';
  }

  function detectCountry() {
    const browserLang = navigator.language || navigator.userLanguage;
    const parts = browserLang.split('-');
    if (parts.length > 1) {
      return parts[1].toUpperCase();
    }
    const langMap = {
      'pt': 'PT',
      'es': 'ES',
      'en': 'US'
    };
    return langMap[parts[0]] || 'PT';
  }

  function getLanguageName(code) {
    const langNames = {
      'pt': 'pt',
      'es': 'es',
      'en': 'en'
    };
    return langNames[code] || 'Português';
  }

  // ===== Configuração =====
  const TEXTS = {
    pt: {
      panelTitle: 'Subscreve a nossa newsletter',
      panelSubtitle: '',
      nameLabel: 'Nome completo',
      namePlaceholder: 'Introduza o seu nome',
      emailLabel: 'E-mail',
      emailPlaceholder: 'Introduza o seu e-mail',
      birthdayLabel: 'Data de aniversário',
      genderLabel: 'Pretendes receber Newsletters de:',
      genderOptions: {
        woman: 'Mulher',
        man: 'Homem'
      },
      commTypeLabel: 'Que tipo de comunicação preferes?',
      commTypeOptions: {
        placeholder: 'Selecionar',
        fashion: 'Moda',
        sports: 'Desporto',
        both: 'Ambos'
      },
      submit: 'Submeter',
      requiredError: 'Este campo é obrigatório.',
      emailError: 'Introduza um endereço de e-mail válido.',
      dateError: 'Introduza uma data válida.',
      selectError: 'Por favor, escolha uma opção.',
      genericError: 'Lamentamos, mas o envio falhou. Tente novamente.',
      success: 'Obrigado! A sua subscrição foi registada com sucesso.'
    },
    es: {
      panelTitle: 'Suscríbete a nuestra newsletter',
      panelSubtitle: '',
      nameLabel: 'Nombre completo',
      namePlaceholder: 'Introduce tu nombre',
      emailLabel: 'Correo electrónico',
      emailPlaceholder: 'Introduce tu correo electrónico',
      birthdayLabel: 'Fecha de cumpleaños',
      genderLabel: 'Quieres recibir Newsletters de:',
      genderOptions: {
        woman: 'Mujer',
        man: 'Hombre'
      },
      commTypeLabel: '¿Qué tipo de comunicación prefieres?',
      commTypeOptions: {
        placeholder: 'Seleccionar',
        fashion: 'Moda',
        sports: 'Deporte',
        both: 'Ambos'
      },
      submit: 'Enviar',
      requiredError: 'Este campo es obligatorio.',
      emailError: 'Introduce una dirección de correo válida.',
      dateError: 'Introduce una fecha válida.',
      selectError: 'Por favor, elige una opción.',
      genericError: 'Lo sentimos, el envío ha fallado. Inténtalo de nuevo.',
      success: '¡Gracias! Tu suscripción se ha registrado correctamente.'
    },
    en: {
      panelTitle: 'Subscribe to our newsletter',
      panelSubtitle: '',
      nameLabel: 'Full name',
      namePlaceholder: 'Enter your name',
      emailLabel: 'Email',
      emailPlaceholder: 'Enter your email',
      birthdayLabel: 'Birthday',
      genderLabel: 'Would you like to receive Newsletters for:',
      genderOptions: {
        woman: 'Women',
        man: 'Men'
      },
      commTypeLabel: 'What type of communication do you prefer?',
      commTypeOptions: {
        placeholder: 'Select',
        fashion: 'Fashion',
        sports: 'Sports',
        both: 'Both'
      },
      submit: 'Submit',
      requiredError: 'This field is required.',
      emailError: 'Please enter a valid email address.',
      dateError: 'Please enter a valid date.',
      selectError: 'Please choose an option.',
      genericError: 'Sorry, something went wrong. Please try again.',
      success: 'Thank you! Your subscription has been registered successfully.'
    }
  };

  const lang = detectLanguage();
  const L = TEXTS[lang];

  const autoCountry = detectCountry();
  const autoLanguage = getLanguageName(lang);

  const GENDER_VALUES = {
    pt: { woman: 'Mulher', man: 'Homem' },
    es: { woman: 'Mujer', man: 'Hombre' },
    en: { woman: 'Women', man: 'Men' }
  };

  const COMM_VALUES = {
    pt: { fashion: 'Moda', sports: 'Desporto', both: 'Ambos' },
    es: { fashion: 'Moda', sports: 'Deporte', both: 'Ambos' },
    en: { fashion: 'Fashion', sports: 'Sports', both: 'Both' }
  };

  // ===== Estilos CSS =====
  function injectStyles() {
    if (document.querySelector('style[data-newsletter-modal]')) return;

    const style = document.createElement('style');
    style.setAttribute('data-newsletter-modal', '');
    style.textContent = `
      .nl-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        z-index: 9998;
      }
      .nl-overlay.is-open {
        opacity: 1;
        visibility: visible;
      }
      .nl-modal {
        position: relative;
        background: #fff;
        width: 90%;
        max-width: 500px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        transform: scale(0.9);
        transition: transform 0.3s ease;
        font-family: Arial, Helvetica, 'Segoe UI', sans-serif;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
      }
      .nl-overlay.is-open .nl-modal {
        transform: scale(1);
      }
      .nl-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: 24px 24px 16px;
        border-bottom: 1px solid #eee;
        flex-shrink: 0;
      }
      .nl-header-text {
        flex: 1;
        padding-right: 20px;
      }
      .nl-title {
        font-size: 20px;
        font-weight: 700;
        margin: 0;
        color: #333;
      }
      .nl-subtitle {
        font-size: 14px;
        margin-top: 6px;
        line-height: 1.5;
        color: #666;
      }
      .nl-close {
        background: none;
        border: 0;
        cursor: pointer;
        width: 28px;
        height: 28px;
        position: relative;
        flex-shrink: 0;
        padding: 0;
        border-radius: 4px;
        transition: background-color 0.2s ease;
      }
      .nl-close:hover {
        background-color: #f5f5f5;
      }
      .nl-close:before,
      .nl-close:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 18px;
        height: 2px;
        background: #666;
        transform-origin: center;
      }
      .nl-close:before {
        transform: translate(-50%, -50%) rotate(45deg);
      }
      .nl-close:after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
      .nl-body {
        padding: 24px 24px 80px;
        font-size: 14px;
        overflow-y: auto;
        overflow-x: hidden;
        flex: 1;
      }
      .nl-form-group {
        margin-bottom: 20px;
      }
      .nl-form-label {
        display: block;
        font-weight: 600;
        margin-bottom: 8px;
        color: #333;
      }
      .nl-form-input,
      .nl-form-select {
        width: 100%;
        padding: 12px;
        border: 1px solid #979797;
        border-radius: 4px;
        font-size: 14px;
        box-sizing: border-box;
        transition: border-color 0.2s ease;
        font-family: inherit;
        background-color: #fff;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        height: auto !important;
        min-height: 44px !important;
        max-height: none !important;
        line-height: 1.5 !important;
      }
      .nl-form-select {
        background-image: url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3e%3cpolyline points="6 9 12 15 18 9"%3e%3c/polyline%3e%3c/svg%3e');
        background-repeat: no-repeat;
        background-position: right 12px center;
        background-size: 20px;
        padding-right: 40px;
        cursor: pointer;
      }
      .nl-form-select option {
        padding: 10px;
        font-size: 14px;
        color: #333;
        background-color: #fff;
      }
      .nl-form-input:focus,
      .nl-form-select:focus {
        outline: none;
        border-color: #333;
      }
      .nl-form-input._has_error,
      .nl-form-select._has_error {
        border-color: #F37C7B;
      }
      .nl-form-radio-group {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
      }
      .nl-form-radio-item {
        display: flex;
        align-items: center;
      }
      .nl-form-radio-item input[type="radio"] {
        margin: 0 8px 0 0;
        width: 18px;
        height: 18px;
        cursor: pointer;
      }
      .nl-form-radio-item label {
        cursor: pointer;
        font-weight: normal;
        color: #333;
      }
      .nl-form-error {
        color: #CA0000;
        font-size: 12px;
        margin-top: 6px;
        display: block;
      }
      .nl-form-success {
        color: #008A00;
        font-size: 14px;
        margin-top: 16px;
        padding: 12px;
        background-color: #e8f5e9;
        border-radius: 4px;
      }
      .nl-submit {
        display: inline-block;
        text-align: center;
        text-decoration: none;
        font-family: 'Metrocity-Medium', Arial, Helvetica, 'Segoe UI', sans-serif;
        font-size: 12px;
        letter-spacing: 0.4px;
        text-transform: uppercase;
        border: 1px solid #333;
        background-color: #333;
        padding: 14px 32px;
        color: #FFF;
        cursor: pointer;
        transition: background-color 0.2s ease;
        border-radius: 4px;
        width: 100%;
      }
      .nl-submit:hover {
        background-color: #555;
      }
      .nl-submit:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      @media (max-width: 600px) {
        .nl-modal {
          width: 95%;
          max-height: 85vh;
        }
        .nl-header {
          padding: 20px 16px 12px;
        }
        .nl-body {
          padding: 20px 16px 60px;
        }
        .nl-title {
          font-size: 18px;
        }
        .nl-subtitle {
          font-size: 13px;
        }
        .nl-form-radio-group {
          flex-direction: column;
          gap: 12px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ===== Criar Modal =====
  function createModal() {
    injectStyles();

    const overlay = document.createElement('div');
    overlay.className = 'nl-overlay';
    overlay.setAttribute('id', 'nl-overlay');

    const modal = document.createElement('div');
    modal.className = 'nl-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', L.panelTitle);

    modal.innerHTML = `
      <div class="nl-header">
        <div class="nl-header-text">
          <h2 class="nl-title">${L.panelTitle}</h2>
          ${L.panelSubtitle ? `<p class="nl-subtitle">${L.panelSubtitle}</p>` : ''}
        </div>
        <button type="button" class="nl-close" aria-label="Fechar"></button>
      </div>
      <div class="nl-body">
        <form id="nl-form" novalidate>
          <div class="nl-form-group">
            <label class="nl-form-label" for="nl-fullname">${L.nameLabel} *</label>
            <input 
              type="text"
              id="nl-fullname"
              class="nl-form-input"
              placeholder="${L.namePlaceholder}"
              required>
            <div class="nl-form-error" id="nl-error-fullname" style="display:none;"></div>
          </div>

          <div class="nl-form-group">
            <label class="nl-form-label" for="nl-email">${L.emailLabel} *</label>
            <input 
              type="email"
              id="nl-email"
              class="nl-form-input"
              placeholder="${L.emailPlaceholder}"
              required>
            <div class="nl-form-error" id="nl-error-email" style="display:none;"></div>
          </div>

          <div class="nl-form-group">
            <label class="nl-form-label" for="nl-birthday">${L.birthdayLabel}</label>
            <input 
              type="date"
              id="nl-birthday"
              class="nl-form-input">
            <div class="nl-form-error" id="nl-error-birthday" style="display:none;"></div>
          </div>

          <div class="nl-form-group">
            <label class="nl-form-label">${L.genderLabel} *</label>
            <div class="nl-form-radio-group">
              <div class="nl-form-radio-item">
                <input type="radio" id="nl-gender-woman" name="nl-gender" value="woman" required>
                <label for="nl-gender-woman">${L.genderOptions.woman}</label>
              </div>
              <div class="nl-form-radio-item">
                <input type="radio" id="nl-gender-man" name="nl-gender" value="man" required>
                <label for="nl-gender-man">${L.genderOptions.man}</label>
              </div>
            </div>
            <div class="nl-form-error" id="nl-error-gender" style="display:none;"></div>
          </div>

          <div class="nl-form-group">
            <label class="nl-form-label" for="nl-commtype">${L.commTypeLabel} *</label>
            <select id="nl-commtype" class="nl-form-select" required>
              <option value="">${L.commTypeOptions.placeholder}</option>
              <option value="fashion">${L.commTypeOptions.fashion}</option>
              <option value="sports">${L.commTypeOptions.sports}</option>
              <option value="both">${L.commTypeOptions.both}</option>
            </select>
            <div class="nl-form-error" id="nl-error-commtype" style="display:none;"></div>
          </div>

          <input type="hidden" id="nl-country" value="${autoCountry}">
          <input type="hidden" id="nl-language" value="${autoLanguage}">
          <input type="hidden" id="nl-campanha" value="">

          <button type="submit" class="nl-submit" id="nl-submit">
            ${L.submit}
          </button>

          <div class="nl-form-success" id="nl-success" style="display:none;"></div>
        </form>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    setupModalEvents(overlay, modal);
    setupFormEvents();
  }

  // ===== Eventos da Modal =====
  function setupModalEvents(overlay, modal) {
    const closeBtn = modal.querySelector('.nl-close');

    function closeModal() {
      overlay.classList.remove('is-open');
    }

    closeBtn.addEventListener('click', closeModal);
    
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        closeModal();
      }
    });
    
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
        closeModal();
      }
    });
  }

  // ===== Criar iframe e form hidden para evitar CORS =====
  function createHiddenForm() {
    const iframeName = 'nl_iframe_' + Math.random().toString(36).slice(2);
    const iframe = document.createElement('iframe');
    iframe.name = iframeName;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const hiddenForm = document.createElement('form');
    hiddenForm.id = 'nl-hidden-form';
    hiddenForm.action = 'https://bazardesportivo.activehosted.com/proc.php';
    hiddenForm.method = 'POST';
    hiddenForm.target = iframeName;
    hiddenForm.style.display = 'none';
    document.body.appendChild(hiddenForm);

    return { iframe, hiddenForm };
  }

  // ===== Eventos do Formulário =====
  function setupFormEvents() {
    const form = document.getElementById('nl-form');
    const fullnameInput = document.getElementById('nl-fullname');
    const emailInput = document.getElementById('nl-email');
    const birthdayInput = document.getElementById('nl-birthday');
    const genderRadios = document.querySelectorAll('input[name="nl-gender"]');
    const commtypeSelect = document.getElementById('nl-commtype');
    const countryInput = document.getElementById('nl-country');
    const languageInput = document.getElementById('nl-language');
    const successEl = document.getElementById('nl-success');
    const submitBtn = document.getElementById('nl-submit');

    const { iframe, hiddenForm } = createHiddenForm();

    function clearError(fieldId) {
      const errorEl = document.getElementById('nl-error-' + fieldId);
      const inputEl = document.getElementById('nl-' + fieldId) || document.querySelector('[name="nl-' + fieldId + '"]');
      
      if (errorEl) {
        errorEl.style.display = 'none';
      }
      
      if (inputEl && inputEl.classList) {
        inputEl.classList.remove('_has_error');
      }
    }

    function showError(fieldId, message) {
      const errorEl = document.getElementById('nl-error-' + fieldId);
      const inputEl = document.getElementById('nl-' + fieldId) || document.querySelector('[name="nl-' + fieldId + '"]');
      
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
      }
      
      if (inputEl && inputEl.classList) {
        inputEl.classList.add('_has_error');
      }
    }

    function addHiddenInput(form, name, value) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    }

    fullnameInput.addEventListener('blur', function() {
      clearError('fullname');
      if (!this.value.trim()) {
        showError('fullname', L.requiredError);
      }
    });

    emailInput.addEventListener('blur', function() {
      clearError('email');
      const emailRegex = /^[\+_a-z0-9-'&=]+(\.[\+_a-z0-9-']+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i;
      if (!this.value.trim()) {
        showError('email', L.requiredError);
      } else if (!emailRegex.test(this.value.trim())) {
        showError('email', L.emailError);
      }
    });

    genderRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        clearError('gender');
      });
    });

    commtypeSelect.addEventListener('change', function() {
      clearError('commtype');
      if (!this.value) {
        showError('commtype', L.selectError);
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      ['fullname', 'email', 'birthday', 'gender', 'commtype'].forEach(clearError);
      successEl.style.display = 'none';

      let hasError = false;

      const fullname = fullnameInput.value.trim();
      if (!fullname) {
        showError('fullname', L.requiredError);
        hasError = true;
      }

      const email = emailInput.value.trim();
      const emailRegex = /^[\+_a-z0-9-'&=]+(\.[\+_a-z0-9-']+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i;
      if (!email) {
        showError('email', L.requiredError);
        hasError = true;
      } else if (!emailRegex.test(email)) {
        showError('email', L.emailError);
        hasError = true;
      }

      const genderChecked = Array.from(genderRadios).find(r => r.checked);
      if (!genderChecked) {
        showError('gender', L.selectError);
        hasError = true;
      }

      const commtype = commtypeSelect.value;
      if (!commtype) {
        showError('commtype', L.selectError);
        hasError = true;
      }

      if (hasError) {
        return;
      }

      submitBtn.disabled = true;

      hiddenForm.innerHTML = '';

      addHiddenInput(hiddenForm, 'u', '10');
      addHiddenInput(hiddenForm, 'f', '10');
      addHiddenInput(hiddenForm, 's', '');
      addHiddenInput(hiddenForm, 'c', '0');
      addHiddenInput(hiddenForm, 'm', '0');
      addHiddenInput(hiddenForm, 'act', 'sub');
      addHiddenInput(hiddenForm, 'v', '2');
      addHiddenInput(hiddenForm, 'or', '664b28e2-3077-44f1-bcc2-881db902ebd4');
      
      addHiddenInput(hiddenForm, 'fullname', fullname);
      addHiddenInput(hiddenForm, 'email', email);
      
      if (birthdayInput.value) {
        addHiddenInput(hiddenForm, 'field[1]', birthdayInput.value);
      }
      
      const genderValue = GENDER_VALUES[lang][genderChecked.value];
      addHiddenInput(hiddenForm, 'field[13]', genderValue);
      
      const commValue = COMM_VALUES[lang][commtype];
      addHiddenInput(hiddenForm, 'field[6]', commValue);
      
      addHiddenInput(hiddenForm, 'field[11]', countryInput.value);
      addHiddenInput(hiddenForm, 'field[12]', languageInput.value);

      // ===== Campanha =====
      const campanha = document.getElementById('nl-campanha').value;
      if (campanha) {
        addHiddenInput(hiddenForm, 'field[14]', campanha);
      }

      // ===== UTM parameters =====
      const urlParams = new URLSearchParams(window.location.search);
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
        const value = urlParams.get(param);
        if (value) {
          addHiddenInput(hiddenForm, param, value);
        }
      });

      const onLoad = function() {
        iframe.removeEventListener('load', onLoad);
        submitBtn.disabled = false;
        
        successEl.textContent = L.success;
        successEl.style.display = 'block';
        form.reset();

        setTimeout(() => {
          document.getElementById('nl-overlay').classList.remove('is-open');
        }, 2500);
      };

      iframe.addEventListener('load', onLoad);

      hiddenForm.submit();
    });
  }

  // ===== Abrir Modal =====
  function openModal(campanha) {
    const overlay = document.getElementById('nl-overlay');
    
    if (overlay) {
      // Preenche o campo hidden com a campanha extraída do href
      const campanhaInput = document.getElementById('nl-campanha');
      if (campanhaInput) campanhaInput.value = campanha || '';

      overlay.classList.add('is-open');
      
      setTimeout(() => {
        document.getElementById('nl-fullname')?.focus();
      }, 300);
    }
  }

  // ===== Inicialização =====
  function init() {
    createModal();

    // Event delegation: apanha <a href^="#abrir-formulario"> e <div url^="#abrir-formulario">
    document.addEventListener('click', function(e) {
      const trigger = e.target.closest(
        'a[href^="#abrir-formulario"], [url^="#abrir-formulario"]'
      );

      if (trigger) {
        e.preventDefault();

        // Extrai o sufixo da campanha: "#abrir-formulario-natal" → "natal"
        const raw = trigger.getAttribute('href') || trigger.getAttribute('url') || '';
        const campanha = raw.replace('#abrir-formulario', '').replace(/^-/, '').trim();

        openModal(campanha);
      }
    });

    console.log('Newsletter modal iniciada | Idioma:', lang, '| País:', autoCountry);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
