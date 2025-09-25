document.addEventListener('DOMContentLoaded', function () {
  const script = document.currentScript;
  const shopLang = script?.getAttribute('data-shop-lang')?.toLowerCase() || 'pt';
  const lang = shopLang.slice(0, 2);

  // =========================
  // HEADLINES POR IDIOMA
  // =========================
  const HEADLINE_BY_LANG = {
    pt: 'RESERVA AGORA! O ENVIO ESTÁ PREVISTO PARA 2 DE OUTUBRO.',
    es: '¡RESERVA AHORA! EL ENVÍO ESTÁ PREVISTO PARA EL 2 DE OCTUBRE.',
    en: 'PRE-ORDER NOW! SHIPPING IS PLANNED FOR OCTOBER 2.'
  };

  // =========================
  // REFERÊNCIAS COM PREORDER
  // =========================
  const REFERENCIAS_PREORDER = [
    '580456-014', 'DC8466-005', 'DD8959-100', 'DD1873-113', 'FD9876-101',
    'DV0788-001', 'FQ9065-100', 'CW2288-111', 'CT2302-100', '378341-009',
    '378341-128', '378341-402', 'AR3565-004', 'CK2630-004', 'CK2630-201',
    'DD9605-100', 'DV3337-023', 'HQ2053-700', 'HV4455-001', 'HV4456-001',
    'HV4528-002', 'HV8568-202', 'HV8568-203', 'IB4504-237', 'IB6388-100',
    'IB6651-002', 'IH4119-009', 'IM6001-475', 'IM6597-001', 'IO2077-030',
    'CT3839-100', 'HF6998-108', 'HF7310-013', 'HQ1911-300', 'HQ2157-004',
    'IH4491-101', 'IH7672-005', 'AR3566-002', 'AR3566-100', 'DC9486-115',
    'HJ5777-100', 'HQ1789-600', 'HQ7739-002', 'IB4417-104', 'IB4417-105',
    'IM5237-100', 'IM6024-121', 'IM6025-121', 'IM6026-121', 'IM6485-121',
    'CN0149-001'
  ];

  // =========================
  // FUNÇÃO PARA OBTER REF
  // =========================
  function getReferencia() {
    const referenciaEl = document.querySelector('.ref p.small');
    if (!referenciaEl) return null;
    const refText = referenciaEl.textContent.trim();
    return refText.replace(/^#/, '').split('|')[0].trim();
  }

  // =========================
  // FUNÇÃO PARA INJETAR BADGE
  // =========================
  function addPreorderBadge(opts = {}) {
    const {
      anchor = '.rdc-product-afterprice',
      headline = HEADLINE_BY_LANG[lang] || HEADLINE_BY_LANG.pt,
      variant = script?.getAttribute('data-variant') || 'full',
      bg = script?.getAttribute('data-badge-bg') || '#2BD94A',
      txt = script?.getAttribute('data-badge-txt') || '#000',
      border = script?.getAttribute('data-badge-border') || '2px solid #000',
      radius = parseInt(script?.getAttribute('data-badge-radius') || '8', 10)
    } = opts;

    const ref = document.querySelector(anchor);
    if (!ref) return;

    // remove instâncias antigas
    document.querySelectorAll('.preorder-badge').forEach(n => n.remove());

    // CSS só uma vez
    if (!document.querySelector('style[data-preorder-badge]')) {
      const style = document.createElement('style');
      style.setAttribute('data-preorder-badge', '');
      style.textContent = `
        .preorder-badge{
          box-sizing:border-box;
          display:inline-flex; align-items:center; gap:14px;
          background:${bg}; border:${border}; border-radius:${radius}px;
          font-family:'Oswald-Regular', Arial, Helvetica, 'Segoe UI', sans-serif;
          font-weight:800; text-transform:uppercase;
          color:${txt} !important; user-select:none;
        }
        .preorder-badge--compact{ padding:16px 18px; display:inline-flex; }
        .preorder-badge--full{ padding:18px 22px; display:flex; width:100%; }
        .preorder-badge__icon{
          width:32px; height:32px; flex:0 0 32px; display:block;
          color:${txt}; fill:currentColor;
          vertical-align:middle; shape-rendering:geometricPrecision;
        }
        .preorder-badge__text{ font-size:16px; color:${txt} !important; }
        @media (max-width:560px){
          .preorder-badge--compact{ white-space:normal; }
        }
      `;
      document.head.appendChild(style);
    }

    // cria badge
    const wrap = document.createElement('div');
    wrap.className = `preorder-badge preorder-badge--${variant}`;
    wrap.setAttribute('role','status');
    wrap.setAttribute('aria-live','polite');

    // ícone SVG
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns,'svg');
    svg.setAttribute('class','preorder-badge__icon');
    svg.setAttribute('viewBox','0 0 122.88 78.78');
    svg.setAttribute('aria-hidden','true');
    const path = document.createElementNS(ns,'path');
    path.setAttribute('d','M90.53,24.33,82,24.27V12.8a6.21,6.21,0,0,0-6.19-6.19H50.72a30.05,30.05,0,0,1,2,3.36H75.85a2.86,2.86,0,0,1,2,.83,2.83,2.83,0,0,1,.83,2V65.34H69.22a1.68,1.68,0,1,0,0,3.35H80.36A1.67,1.67,0,0,0,82,67V65.11h6.78c.77-17.46,25.84-19.87,28.4,0h5.5c1.42-17-7-23.65-19.77-25.14a45.78,45.78,0,0,0-4.66-11.38c-2.36-4.36-2.91-4.18-7.76-4.26Z');
    path.setAttribute('fill','currentColor');
    svg.appendChild(path);

    const text = document.createElement('span');
    text.className = 'preorder-badge__text';
    text.textContent = headline;

    wrap.append(svg, text);
    ref.insertAdjacentElement('afterend', wrap);
  }

  // =========================
  // FUNÇÃO PARA CLONAR KLARNA
  // =========================
  function cloneKlarna() {
    const klarnaOriginal = document.querySelector('.rdc-product-klarna-placement');
    const botaoAlvo = document.querySelector('#fixedDiv .buttons.clearfix');
    if (klarnaOriginal && botaoAlvo && botaoAlvo.parentNode) {
      const klarnaClone = klarnaOriginal.cloneNode(true);
      klarnaClone.style.paddingBottom = '10px';
      botaoAlvo.parentNode.insertBefore(klarnaClone, botaoAlvo);
    }
  }

  // =========================
  // EXECUTA SÓ SE REF = PREORDER
  // =========================
  const refAtual = getReferencia();
  if (refAtual && REFERENCIAS_PREORDER.includes(refAtual)) {
    addPreorderBadge();
    cloneKlarna();
  }
});
