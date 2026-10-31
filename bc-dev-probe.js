(function () {
  'use strict';
  function init() {
    if (document.getElementById('bc-external-probe')) return;
    const button = document.createElement('button');
    button.id = 'bc-external-probe';
    button.type = 'button';
    button.textContent = 'BAZARclub · JS externo carregado';
    button.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:2147483000;background:#111;color:white;border:2px solid #ef4036;padding:14px 18px;font:14px Arial;cursor:pointer';
    const dialog = document.createElement('dialog');
    dialog.setAttribute('aria-label', 'Teste de integração BAZARclub');
    dialog.style.cssText = 'margin:0 0 0 auto;width:380px;max-width:100%;height:100dvh;max-height:100dvh;border:0;padding:28px;box-sizing:border-box;background:white;color:#222;font:16px/1.5 Arial';
    dialog.innerHTML = '<h2>JS externo carregado</h2><p>Este painel foi criado pelo ficheiro bc-dev-probe.js.</p><p>O teste não faz adesões, não consulta contactos e não guarda dados no navegador.</p><button type="button">Fechar</button>';
    const close = dialog.querySelector('button');
    close.style.cssText = 'padding:12px 20px;background:#333;color:white;border:0;cursor:pointer;font:inherit';
    close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => button.focus());
    button.addEventListener('click', () => dialog.showModal());
    document.body.append(button, dialog);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
