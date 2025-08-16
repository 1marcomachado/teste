(function(){
  const params = new URLSearchParams(window.location.search);
  if (params.get('mostrar_carrossel') !== '1') return;

  var CART_WRAP = '#header .cart';   // wrapper do ícone do carrinho
  var CART_LINK = '#itemsCart';      // link/ícone do carrinho
  var DROPDOWN  = '.items-dropdown'; // dropdown do mini-carrinho

  var css =
    CART_WRAP + ' ' + DROPDOWN + '{' +
      'display:none!important;visibility:hidden!important;opacity:0!important;' +
      'pointer-events:none!important;transition:opacity .18s ease;' +
    '}' +

    /* abre só em hover (desktop) ou estado .hovering (mobile) */
    CART_WRAP + ':hover ' + DROPDOWN + ',' +
    CART_WRAP + '.hovering ' + DROPDOWN + '{' +
      'display:block!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important;' +
    '}' +

    /* neutraliza classes que scripts possam adicionar */
    CART_WRAP + ' ' + DROPDOWN + '.open,' +
    CART_WRAP + ' ' + DROPDOWN + '.active,' +
    CART_WRAP + ' ' + DROPDOWN + '.visible{' +
      'display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important;' +
    '}' +

    /* ESCONDE .mobile-cart-notice apenas em mobile */
    '@media (hover: none){ .mobile-cart-notice{' +
      'display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important;' +
    '} }';

  var styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  styleEl.appendChild(document.createTextNode(css));
  document.documentElement.appendChild(styleEl);

  function onReady(fn){ 
    if(document.readyState!=='loading') fn(); 
    else document.addEventListener('DOMContentLoaded', fn); 
  }

  onReady(function(){
    var cart = document.querySelector(CART_WRAP);
    var link = document.querySelector(CART_LINK);
    if (!cart || !link) return;

    var isTouch = ('ontouchstart' in window) || 
                  (navigator.maxTouchPoints > 0) || 
                  window.matchMedia('(hover: none)').matches;
    if (!isTouch) return;

    var armed = false;
    var armTimeout = null;

    link.addEventListener('click', function(e){
      if (!armed) {
        e.preventDefault();
        cart.classList.add('hovering');
        armed = true;
        clearTimeout(armTimeout);
        armTimeout = setTimeout(function(){
          armed = false;
          cart.classList.remove('hovering');
        }, 1500);
      } else {
        cart.classList.remove('hovering');
        armed = false; // deixa navegar
      }
    }, true);

    // tocar fora fecha
    document.addEventListener('click', function(ev){
      if (!cart.contains(ev.target)) {
        cart.classList.remove('hovering');
        armed = false;
      }
    }, true);

    // tecla ESC fecha
    document.addEventListener('keydown', function(ev){
      if (ev.key === 'Escape') {
        cart.classList.remove('hovering');
        armed = false;
      }
    });
  });
})();
