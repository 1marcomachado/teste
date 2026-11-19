(function(){
'use strict';
if(!['bzronline-dev.redicom.work','www.bzronline.com'].includes(location.hostname) || (location.hostname==='www.bzronline.com' && new URLSearchParams(location.search).get('bf-cart-review')!=='1') || location.pathname!=='/checkout/v1/' || window.BazarClubCartDev)return;
window.BazarClubCartDev=true;
function start(){
if(!document.querySelector('.wrapper-shoppingbag-product-list'))return;
(function(){
  const rows=[
    ['No dia 26 de novembro vais ter acesso antecipado + 5€ extra acumuláveis com os descontos da Black Friday.','On 26 November you will get early access + an extra €5 that can be combined with Black Friday discounts.','El 26 de noviembre tendrás acceso anticipado + 5€ extra acumulables con los descuentos del Black Friday.'],
    ['Tens agora acesso antecipado + 5€ extra acumuláveis com os descontos da Black Friday.','You now have early access + an extra €5 that can be combined with Black Friday discounts.','Ya tienes acceso anticipado + 5€ extra acumulables con los descuentos del Black Friday.'],
    ['Tens agora 5€ extra acumuláveis com os descontos da Black Friday.','You now have an extra €5 that can be combined with Black Friday discounts.','Ya tienes 5€ extra acumulables con los descuentos del Black Friday.'],
    ['Estas vantagens serão aplicadas diretamente no teu carrinho.','These benefits will be applied directly to your basket.','Estas ventajas se aplicarán directamente en tu carrito.'],
    ['Estas vantagens já se encontram no teu carrinho.','These benefits are already in your basket.','Estas ventajas ya están en tu carrito.'],
    ['Dia extra · só hoje','Extra day · today only','Día extra · solo hoy'],
    ['+5€ extra para membros','An extra €5 for members','+5€ extra para miembros'],
    ['Adesão ao BAZARclub','Join BAZARclub','Únete a BAZARclub'],
    ['Adesão','Membership','Suscripción'],['Fechar','Close','Cerrar'],
    ['Ainda não sou membro',"I’m not a member yet",'Aún no soy miembro'],['Já sou membro',"I’m already a member",'Ya soy miembro'],
    ['Nome *','Name *','Nombre *'],['E-mail *','Email *','Correo electrónico *'],['Data de Nascimento','Date of birth','Fecha de nacimiento'],
    ['Pretendes subscrever a Newsletter de: *','Which newsletter would you like? *','¿Qué newsletter quieres recibir? *'],
    ['Homem','Men','Hombre'],['Mulher','Women','Mujer'],['Que tipo de comunicação preferes? *','What would you like to hear about? *','¿Qué tipo de comunicación prefieres? *'],
    ['Selecionar','Select','Seleccionar'],['Moda','Fashion','Moda'],['Desporto','Sport','Deporte'],['Ambos','Both','Ambos'],
    ['Quero receber a newsletter BAZARclub por email e aceito a','I would like to receive the BAZARclub newsletter by email and accept the','Quiero recibir la newsletter de BAZARclub por correo electrónico y acepto la'],
    ['Política de Privacidade','Privacy Policy','Política de Privacidad'],['Tornar-me membro','Become a member','Hacerme miembro'],
    ['* Campos obrigatórios','* Required fields','* Campos obligatorios'],['Condições da campanha','Campaign terms','Condiciones de la campaña'],
    ['JÁ ÉS MEMBRO?','ALREADY A MEMBER?','¿YA ERES MIEMBRO?'],
    ['Introduz o email com que já subscreveste a newsletter, para te reconhecermos e veres as tuas vantagens.','Enter the email you used to subscribe to the newsletter so we can recognise you and show you your benefits.','Introduce el correo con el que ya te suscribiste a la newsletter para que podamos reconocerte y mostrarte tus ventajas.'],
    ['Introduz o teu e-mail','Enter your email','Introduce tu correo electrónico'],['CONFIRMAR','CONFIRM','CONFIRMAR'],['Ainda não és membro?','Not a member yet?','¿Aún no eres miembro?'],['Adere aqui','Join here','Únete aquí'],
    ['Indica o email com que aderiste ao BAZARclub para verificarmos a tua subscrição.','Enter the email you used to join BAZARclub so we can check your subscription.','Introduce el correo electrónico con el que te uniste a BAZARclub para comprobar tu suscripción.'],
    ['Verificar adesão','Check membership','Comprobar suscripción'],['Continuar a comprar','Continue shopping','Seguir comprando'],['Usar outro email','Use another email','Usar otro correo electrónico'],
    ['BEM-VINDO DE VOLTA!','WELCOME BACK!','¡TE DAMOS LA BIENVENIDA DE NUEVO!'],['BEM-VINDO AO BAZARCLUB!','WELCOME TO BAZARCLUB!','¡TE DAMOS LA BIENVENIDA A BAZARCLUB!'],['FALTA CONFIRMAR A TUA ADESÃO','PLEASE CONFIRM YOUR SUBSCRIPTION','FALTA CONFIRMAR TU SUSCRIPCIÓN'],
    ['Já te reconhecemos como membro. ','We recognise you as a member. ','Ya te reconocemos como miembro. '],['A tua adesão está confirmada. ','Your membership is confirmed. ','Tu suscripción está confirmada. '],
    ['A 26 de novembro, tens acesso antecipado à Black Friday.','On 26 November, you get early access to Black Friday.','El 26 de noviembre tienes acceso anticipado al Black Friday.'],
    ['Hoje tens acesso antecipado à Black Friday.','You have early access to Black Friday today.','Hoy tienes acceso anticipado al Black Friday.'],
    ['O vale de 5€ extra é válido até 30 de novembro em compras a partir de 119,90 €.','The extra €5 voucher is valid through 30 November on orders of €119.90 or more.','El vale de 5€ extra es válido hasta el 30 de noviembre en compras a partir de 119,90 €.'],
    ['Vamos reconhecer a tua adesão neste dispositivo.','We’ll remember your membership on this device.','Recordaremos tu suscripción en este dispositivo.'],
    ['Pré-visualização. Os formulários simulam a adesão e a verificação.','Preview. The forms simulate sign-up and membership verification.','Vista previa. Los formularios simulan la suscripción y la verificación.'],
    ['ADESÃO SIMULADA','SIGN-UP SIMULATED','SUSCRIPCIÓN SIMULADA'],
    ['VERIFICAÇÃO SIMULADA','VERIFICATION SIMULATED','VERIFICACIÓN SIMULADA'],
    ['Teste concluído. Nenhum dado foi enviado.','Test complete. No data was sent.','Prueba completada. No se ha enviado ningún dato.'],
    ['Recebemos o teu pedido. Se receberes um email de confirmação, segue as instruções para concluir a adesão. As vantagens ficam disponíveis quando a subscrição estiver ativa.','We’ve received your request. If you receive a confirmation email, follow its instructions to complete your subscription. Benefits become available once your subscription is active.','Hemos recibido tu solicitud. Si recibes un correo de confirmación, sigue las instrucciones para completar tu suscripción. Las ventajas estarán disponibles cuando la suscripción esté activa.'],
    ['Demonstração — nenhum dado será enviado.','Demo — no data will be sent.','Demostración — no se enviará ningún dato.'],
    ['Preenche o nome e um email válido.','Enter your name and a valid email address.','Introduce tu nombre y un correo electrónico válido.'],
    ['Seleciona as preferências e aceita o consentimento.','Select your preferences and give your consent.','Selecciona tus preferencias y acepta el consentimiento.'],['Revê a data de nascimento.','Check your date of birth.','Revisa la fecha de nacimiento.'],
    ['A verificar a tua adesão…','Checking your membership…','Comprobando tu suscripción…'],['A confirmar a tua adesão…','Confirming your membership…','Confirmando tu suscripción…'],['A enviar a tua adesão…','Sending your subscription…','Enviando tu suscripción…'],
    ['Não foi possível verificar a adesão. Tenta novamente.','We couldn’t check your membership. Please try again.','No hemos podido comprobar tu suscripción. Inténtalo de nuevo.'],
    ['Não encontrámos uma subscrição ativa com este email. Podes aderir no separador “Ainda não sou membro”.','We couldn’t find an active subscription for this email. You can join under “I’m not a member yet”.','No encontramos una suscripción activa con este correo. Puedes unirte en la pestaña “Aún no soy miembro”.'],
    ['Não foi possível concluir a adesão. Revê os dados e tenta novamente.','We couldn’t complete your subscription. Check your details and try again.','No hemos podido completar tu suscripción. Revisa los datos e inténtalo de nuevo.'],
    ['O pedido foi enviado, mas ainda não conseguimos verificar a adesão. Verifica o teu email e usa “Já sou membro” para tentar novamente.','Your request was sent, but we couldn’t verify your membership yet. Check your email and try again under “I’m already a member”.','Tu solicitud se ha enviado, pero aún no hemos podido verificar tu suscripción. Revisa tu correo y vuelve a intentarlo en “Ya soy miembro”.'],
    ['Não recebemos confirmação do envio. Verifica o teu email antes de tentares novamente.','We haven’t received confirmation. Check your email before trying again.','No hemos recibido confirmación del envío. Revisa tu correo antes de volver a intentarlo.'],
    ['Não foi possível confirmar o envio. Verifica a ligação e o teu email antes de tentares novamente.','We couldn’t confirm the submission. Check your connection and email before trying again.','No hemos podido confirmar el envío. Comprueba la conexión y tu correo antes de volver a intentarlo.'],
    ['Preenche este campo.','Please fill in this field.','Completa este campo.'],['Introduz um email válido.','Enter a valid email address.','Introduce un correo electrónico válido.'],
    ['A 26 DE NOVEMBRO','ON 26 NOVEMBER','EL 26 DE NOVIEMBRE'],['ACESSO','EARLY','ACCESO'],['ANTECIPADO','ACCESS','ANTICIPADO'],
    ['27 A 29 DE NOVEMBRO','27–29 NOVEMBER','DEL 27 AL 29 DE NOVIEMBRE'],['30 DE NOVEMBRO','30 NOVEMBER','30 DE NOVIEMBRE'],
    ['Torna-te membro e aproveita 5€ extra acumuláveis com os descontos da Black Friday.','Become a member and get an extra €5 you can combine with Black Friday discounts.','Hazte miembro y consigue 5€ extra acumulables con los descuentos del Black Friday.'],
    ['Torna-te membro para receber as novidades e ofertas do BAZARclub.','Become a member to receive BAZARclub news and offers.','Hazte miembro para recibir las novedades y ofertas de BAZARclub.'],
    ['Torna-te membro e garante, na Black Friday, acesso antecipado + 5€ extra acumuláveis com os descontos.','Join now for early access + an extra €5 that can be combined with Black Friday discounts.','Hazte miembro y consigue acceso anticipado + 5€ extra acumulables con los descuentos del Black Friday.'],
    ['5€ EXTRA','EXTRA €5','5€ EXTRA'],
    ['*5€ extra em compras a partir de 119,90 €.','*Extra €5 on purchases of €119.90 or more.','*5€ extra en compras a partir de 119,90 €.'],
    ['BAZARclub. A 26 de novembro: acesso antecipado +5€ extra acumuláveis com os descontos da Black Friday. 5€ extra em compras a partir de 119,90 €.','BAZARclub. On 26 November: early access + an extra €5 that can be combined with Black Friday discounts. Extra €5 on purchases of €119.90 or more.','BAZARclub. El 26 de noviembre: acceso anticipado +5€ extra acumulables con los descuentos del Black Friday. 5€ extra en compras a partir de 119,90 €.'],
    ['Informações: envios, trocas e pagamentos','Shipping, returns and payment information','Información: envíos, cambios y pagos'],
    ['Envio grátis acima de 69,90€ para Portugal Continental. Entrega em 1 a 3 dias úteis.','Free shipping over €69.90 to mainland Portugal. Delivery in 1–3 working days.','Envío gratis a partir de 69,90€ a Portugal continental. Entrega en 1–3 días laborables.'],
    ['Envio grátis para as ilhas em compras superiores a 69,90€.','Free shipping to the islands on orders over €69.90.','Envío gratis a las islas en compras superiores a 69,90€.'],
    ['Envio grátis acima de 69,90€ para Espanha. Entrega em 1 a 4 dias úteis.','Free shipping over €69.90 to Spain. Delivery in 1–4 working days.','Envío gratis a partir de 69,90€ a España. Entrega en 1–4 días laborables.'],
    ['Consulta as condições de envio para o teu destino.','Check the shipping terms for your destination.','Consulta las condiciones de envío para tu destino.'],
    ['BLACK FRIDAY AQUECIMENTO · Os membros BAZARclub compram mais cedo esta Black Friday','BLACK FRIDAY WARM-UP · BAZARclub members shop earlier this Black Friday','CALENTAMIENTO BLACK FRIDAY · Los miembros BAZARclub compran antes este Black Friday'],
    ['ENVIO GRÁTIS ACIMA DE 69,90€ · ENTREGA EM 1 A 3 DIAS ÚTEIS','FREE SHIPPING OVER €69.90 · DELIVERY IN 1–3 WORKING DAYS','ENVÍO GRATIS A PARTIR DE 69,90€ · ENTREGA EN 1–3 DÍAS LABORABLES'],
    ['TROCAS BLACK FRIDAY ALARGADAS ATÉ 4 DE JANEIRO. VER CONDIÇÕES*','BLACK FRIDAY EXCHANGES EXTENDED UNTIL 4 JANUARY. SEE TERMS*','CAMBIOS BLACK FRIDAY AMPLIADOS HASTA EL 4 DE ENERO. VER CONDICIONES*'],['LEVANTAMENTO GRATUITO EM LOJA','FREE IN-STORE COLLECTION','RECOGIDA GRATIS EN TIENDA'],['PAGAMENTOS EM PRESTAÇÕES COM','PAY IN INSTALMENTS WITH','PAGO A PLAZOS CON'],['PAGAMENTOS SEGUROS:','SECURE PAYMENTS:','PAGOS SEGUROS:']
  ];
  function language(value){const code=String(value||'').toLowerCase().split(/[-_]/)[0];return code==='gb'?'en':['pt','en','es'].includes(code)?code:'pt';}
  function create(lang){const index={pt:0,en:1,es:2}[language(lang)];const map=new Map(rows.map(r=>[r[0],r[index]]));return text=>map.get(text)??text;}
  function localize(root,tr){
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let node;
    while(node=walker.nextNode()){const raw=node.nodeValue,trimmed=raw.trim();if(trimmed)node.nodeValue=raw.replace(trimmed,tr(trimmed));}
    for(const el of [root,...root.querySelectorAll('[aria-label],[alt],[placeholder]')])for(const attr of ['aria-label','alt','placeholder'])if(el.hasAttribute(attr))el.setAttribute(attr,tr(el.getAttribute(attr)));
  }
  const api={language,create,localize,rows};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  if(typeof window!=='undefined')window.BazarClubI18n=api;
})();

const lang=window.BazarClubI18n.language(new URLSearchParams(location.search).get('bf-lang') || document.documentElement.lang || 'pt');
const base="https://cdn.jsdelivr.net/gh/1marcomachado/teste@b0e97a39956099dccc97abf9f30434eb797ccd28/";
window.BazarClubFormConfig={preview:true,userId:'',language:lang,announcement:false,autoPopup:false,replaceNewsletterLink:false,campaignArtBase:base+'campaign-art-2026/',campaignImage:base+'bazarclub-'+lang+'-desktop.png',campaignImageMobile:base+'bazarclub-'+lang+'-mobile.png',campaignImageSide:base+'bazarclub-'+lang+'-side.png',termsUrl:'https://www.bzronline.com/pt/ajuda-e-condicoes/campanhas_663.html'};
const style=document.createElement('style');style.textContent=".bc-dialog{border:0;padding:0;width:min(760px,calc(100% - 32px));max-width:none;max-height:calc(100dvh - 32px);color:#333;background:#fff;box-shadow:0 15px 70px #0005;font:13px/1.45 'Metrocity-Regular',Arial,sans-serif;overflow:auto}\n.bc-dialog::backdrop{background:#0005}.bc-dialog *{box-sizing:border-box}.bc-dialog [hidden]{display:none!important}.bc-dialog button,.bc-dialog input,.bc-dialog select{font:inherit}.bc-dialog button,.bc-dialog a{touch-action:manipulation}.bc-dialog :focus-visible{outline:2px solid #2672b5;outline-offset:3px}\n.bc-layout{display:grid;grid-template-columns:38.5% 61.5%;min-height:590px}.bc-close{padding:0;line-height:1;position:absolute;top:0;right:0;width:36px;height:36px;border:0;background:#000;color:white;font-size:25px!important;z-index:2;cursor:pointer}\n.bc-campaign{position:relative;overflow:hidden;padding:44px 26px 65px;background:repeating-linear-gradient(117deg,#171717 0,#171717 2px,#202020 3px,#171717 4px);color:white}.bc-brand{font:900 38px/1 'Oswald-Regular','Arial Narrow',Impact,sans-serif;letter-spacing:-1.5px}.bc-brand span{color:#65e300;font-style:italic;font-size:33px}.bc-date{display:table;background:#f3433c;color:white;margin:24px 0 12px;padding:3px 6px;font:bold 12px/1.4 'Oswald-Regular',Impact,sans-serif}.bc-campaign h2{font:900 italic 30px/.98 'Oswald-Regular',Impact,sans-serif;margin:0 0 12px}.bc-discount{font:900 italic 43px/.98 'Oswald-Regular',Impact,sans-serif;letter-spacing:-1px}.bc-extra{font:bold 21px/1.6 'Oswald-Regular',Impact,sans-serif;margin-top:16px;color:#bbb}.bc-extra strong{display:inline-block;background:#f3433c;color:#fff;padding:0 8px;font-style:italic}.bc-rule{width:40px;border-top:1px solid #f3433c;margin:22px 0}.bc-campaign p{font-size:13px;line-height:1.5;margin:0 0 12px}.bc-campaign small{color:#ccc;font-size:10px}.bc-tape{position:absolute;bottom:16px;left:-12px;width:120%;background:#f3433c;color:#111;transform:rotate(-5deg);white-space:nowrap;font:bold 14px/1.7 'Oswald-Regular',Impact,sans-serif}.bc-campaign:has(.bc-campaign-image){padding:0;background:#181818}.bc-campaign-image{display:block;width:100%;height:100%;object-fit:cover}\n.bc-content{padding:34px 24px 26px}.bc-tabs{display:flex;border-bottom:1px solid #ddd;margin:0 0 16px}.bc-tabs button{flex:1;border:0;border-bottom:2px solid transparent;background:#fff;padding:12px 3px;color:#737373;cursor:pointer;font-weight:bold;font-size:10px;letter-spacing:.5px;text-transform:uppercase}.bc-tabs [aria-selected=true]{border-color:#333;color:#171717}.bc-form>label{display:block;margin-bottom:12px;font-size:11px}.bc-form input:not([type=radio]):not([type=checkbox]),.bc-form select{display:block;width:100%;height:38px;border:1px solid #d4d4d4;border-radius:0;background:#fff;color:#222;margin-top:4px;padding:7px 10px;box-shadow:none}.bc-form fieldset{padding:0;border:0;margin:0 0 10px}.bc-form legend{font-size:11px;margin-bottom:4px;padding:0}.bc-radios{display:flex;gap:20px}.bc-radios label{flex:1;display:flex;align-items:center;gap:6px;font-size:12px;min-height:26px}.bc-form input[type=radio],.bc-form input[type=checkbox]{appearance:auto;accent-color:#333;width:15px;height:15px;flex-shrink:0;margin:0;position:static;opacity:1}.bc-form .bc-consent{display:flex;align-items:flex-start;gap:9px;margin:17px 0;font-size:11px}.bc-consent input{margin-top:2px!important}.bc-dialog a{color:inherit;text-decoration:underline}.bc-primary{display:block;text-align:center;width:100%;border:0;background:#333;color:#fff!important;padding:14px 10px;min-height:44px;cursor:pointer;text-transform:uppercase;font-size:11px!important;font-weight:bold!important;letter-spacing:.7px;text-decoration:none!important}.bc-primary:disabled{opacity:.6;cursor:wait}.bc-foot{display:flex;justify-content:space-between;gap:10px;font-size:9px;margin-top:8px;color:#666}.bc-foot small{font-size:inherit}.bc-status{font-size:12px;color:#a12621;margin:16px 0 0;overflow-wrap:anywhere}.bc-status:empty{display:none}.bc-status[data-ok=true]{color:#23602f}#bc-member h2{font-size:21px;margin-top:30px}#bc-member p{margin:18px 0 24px}\n.bc-side{margin:0 0 0 auto;width:min(420px,100%);height:100dvh;max-height:100dvh}.bc-side .bc-layout{display:block;min-height:100%}.bc-side .bc-campaign{padding:30px 25px 52px}.bc-side .bc-campaign h2{font-size:25px}.bc-side .bc-discount{font-size:34px}.bc-side .bc-date{margin-top:14px}.bc-side .bc-content{padding:18px 24px 28px}.bc-side .bc-campaign-image{height:auto}\n@media(max-width:600px){.bc-dialog{width:calc(100% - 20px);max-height:calc(100dvh - 20px)}.bc-layout{display:block;min-height:0}.bc-campaign{padding:24px 24px 45px}.bc-brand{font-size:32px}.bc-date{margin:14px 0 8px}.bc-campaign h2{font-size:24px}.bc-discount{font-size:34px}.bc-campaign p{max-width:35ch}.bc-content{padding:16px 20px 25px}.bc-form input:not([type=radio]):not([type=checkbox]),.bc-form select{font-size:16px;height:44px}.bc-tabs button{min-height:44px}.bc-side{width:100%;max-height:100dvh}.bc-campaign-image{height:auto}}\n\r\n/* Proporções do HTML da Rita e artes originais da Cláudia. */\n.bc-dialog{width:min(780px,calc(100% - 32px));font-family:Montserrat,'Metrocity-Regular',Arial,sans-serif}\n.bc-dialog::backdrop{background:rgba(255,255,255,.75)}\n.bc-layout{grid-template-columns:300px minmax(0,1fr);min-height:640px}\n.bc-content{padding:26px 24px 22px;min-width:0}\n.bc-campaign.bc-artwork{padding:0;background:#0b0b0b}\n.bc-artwork picture{display:block;width:100%}\n.bc-artwork .bc-campaign-image{display:block;width:100%;height:auto;object-fit:contain}\n.bc-form input:not([type=radio]):not([type=checkbox]),.bc-form select{height:40px}\n.bc-tabs button{font-size:11px}\n.bc-side{width:min(420px,100%)}\n.bc-side .bc-layout{display:block;min-height:100%}\n@media(min-width:601px) and (max-width:800px){.bc-layout{grid-template-columns:38.46% minmax(0,1fr);min-height:0}.bc-content{padding:26px 18px 22px}.bc-tabs button{font-size:10px}}\n@media(max-width:600px){.bc-dialog{width:calc(100% - 20px)}.bc-layout{display:block;min-height:0}.bc-content{padding:16px 20px 25px}.bc-side{width:100%}.bc-form input:not([type=radio]):not([type=checkbox]),.bc-form select{height:44px}}\r\n\n/* A altura não depende do separador nem das mensagens de confirmação. */\n.bc-dialog:not(.bc-side){height:min(640px,calc(100dvh - 32px));overflow:hidden}\n.bc-dialog:not(.bc-side) .bc-layout{height:100%;min-height:0;grid-template-rows:minmax(0,1fr)}\n.bc-dialog:not(.bc-side) .bc-content{height:100%;min-height:0;overflow-y:auto;scrollbar-gutter:stable}\n.bc-dialog:not(.bc-side) .bc-campaign{height:100%;min-height:0}\n.bc-dialog:not(.bc-side) .bc-artwork picture{height:100%}\n.bc-dialog:not(.bc-side) .bc-campaign-image{height:100%;object-fit:cover}\n@media(max-width:600px){\n  .bc-dialog:not(.bc-side){height:min(840px,calc(100dvh - 20px))}\n  .bc-dialog:not(.bc-side) .bc-layout{display:grid;grid-template-columns:minmax(0,1fr);grid-template-rows:auto minmax(0,1fr)}\n  .bc-dialog:not(.bc-side) .bc-campaign{height:auto}\n  .bc-dialog:not(.bc-side) .bc-artwork picture{height:auto}\n  .bc-dialog:not(.bc-side) .bc-campaign-image{height:auto;aspect-ratio:4/3;object-fit:contain}\n}\n\n.bc-announcement{box-sizing:border-box;width:100%;height:36px;display:flex;align-items:center;overflow:hidden;background:#0b0b0b;color:#fff;font:700 11px/1.5 Montserrat,'Metrocity-Regular',Arial,sans-serif;letter-spacing:.4px}\n.bc-announcement-track{display:flex;width:max-content;flex-shrink:0;animation:bc-ticker 45s linear infinite}\n@media(min-width:801px) and (hover:hover) and (pointer:fine){.bc-announcement:hover .bc-announcement-track{animation-play-state:paused}}\n.bc-announcement:has(button:focus-visible) .bc-announcement-track{animation-play-state:paused}\n.bc-announcement button{box-sizing:border-box;display:inline-flex;align-items:center;gap:8px;margin:0;padding:0;border:0;border-radius:0;background:transparent;color:#ef4036;font:inherit;letter-spacing:inherit;white-space:nowrap;cursor:pointer}\n.bc-announcement svg{flex-shrink:0}\n.bc-product-info-preview>.flags{display:none}\n.bc-product-flags{display:flex;flex-direction:column;align-items:flex-start;gap:4px;margin:0 0 10px}\n.bc-product-flags span,.bc-product-benefits span{display:inline-flex;align-items:center;min-height:16px;box-sizing:border-box;background:#ef4036;color:#fff;padding:2px 6px;border-radius:4px;font:800 10px/1.2 Montserrat,Arial,sans-serif;letter-spacing:.3px;text-transform:uppercase}\n.bc-product-flags span+span,.bc-product-benefits .bc-product-extra{background:#0b0b0b;color:#ef4036}\n.bc-product-preview{box-sizing:border-box;display:flex;flex-direction:column;gap:10px;margin:12px 0 4px;padding:14px 16px;border:1px solid #ddd;border-radius:4px;background:#fff;color:#333;font:12px/1.4 Montserrat,Arial,sans-serif}\n.bc-product-preview-heading,.bc-product-benefits{display:flex;align-items:center;flex-wrap:wrap;gap:8px}\n.bc-product-preview-heading{gap:10px}\n.bc-product-preview-heading img{display:block;flex:none;width:auto;height:15px}\n.bc-product-preview-heading strong{font-size:10px;letter-spacing:1px;color:#6b6b6b;text-transform:uppercase}\n.bc-product-benefits strong{font-weight:600}\n.bc-product-preview small{font-size:10px;color:#666}\n.bc-product-preview a{align-self:flex-start;color:#333;font-weight:700;text-decoration:none}\n.bc-product-preview a:hover,.bc-product-preview a:focus-visible{text-decoration:underline;text-underline-offset:2px}\n.bc-product-preview-date{display:block;margin:0 0 8px;color:#555;font:10px/1.4 Montserrat,Arial,sans-serif}\n.bc-announcement button:focus-visible{outline:2px solid #fff;outline-offset:-3px}\n@keyframes bc-ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}\n.bc-dialog{position:fixed;inset:0;margin:auto}.bc-dialog.bc-side{margin:0 0 0 auto}\nhtml.bc-modal-open,html.bc-modal-open body{overflow:hidden;overscroll-behavior:none}html.bc-modal-open{scrollbar-gutter:stable}\n.bc-dialog,.bc-content{overscroll-behavior:contain}\n.bc-side .bc-close{position:sticky;top:0;display:block;margin-left:auto;margin-bottom:-36px}\n.bc-demo-notice{margin:0 16px 8px 0;font-size:10px;color:#666}\n.bc-campaign-bar{background:#efefef;color:#0b0b0b;border-top:1px solid #e0e0e0;font:700 13px/1.45 Montserrat,Arial,sans-serif}.bc-campaign-bar[hidden]{display:none!important}.bc-campaign-bar-link{box-sizing:border-box;display:flex;align-items:center;justify-content:center;gap:12px;min-height:48px;padding:8px 40px;color:inherit!important;text-decoration:none!important}.bc-campaign-badge{display:inline-flex;align-items:center;flex-shrink:0;background:#0b0b0b;color:#fff;border-radius:4px;padding:3px 8px}.bc-campaign-badge img{display:block;height:12px;width:auto}.bc-campaign-cta{text-decoration:underline;text-underline-offset:3px}.bc-campaign-arrow{font-size:26px;line-height:1}.bc-campaign-bar-link:focus-visible{outline:2px solid #2672b5;outline-offset:-3px}.bc-campaign-demo{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:10px;padding:8px 16px;background:white;color:#555;font:11px/1.5 Montserrat,Arial,sans-serif;border-bottom:1px solid #ddd}.bc-campaign-demo small{flex-basis:100%;text-align:center}.bc-campaign-demo select,.bc-campaign-demo input{font:inherit;padding:5px;border:1px solid #ccc;background:#fff;color:#333;border-radius:0}\n@media(max-width:800px){.bc-campaign-bar-link{gap:8px;padding:10px 16px;flex-wrap:wrap;font-size:11px;text-align:center}.bc-campaign-message{flex-basis:calc(100% - 120px)}.bc-campaign-arrow{font-size:20px}.bc-campaign-badge{max-width:110px}}\n.bc-dialog:not(.bc-side) .bc-layout{grid-template-columns:calc(min(640px,100dvh - 32px)*.46875) minmax(0,1fr)}\n.bc-dialog:not(.bc-side) .bc-campaign-image{object-fit:contain}\n.bc-tabs button{font-size:12px}.bc-form>label{margin-bottom:14px}.bc-primary{font-size:12px!important;letter-spacing:1px}\n#bc-member h2,.bc-result h2{font:800 26px/1.1 'Barlow Condensed',Impact,sans-serif;margin:4px 0 14px}#bc-member>p{margin:0 0 24px}.bc-result h2:focus{outline:none}.bc-result-note{display:flex;gap:10px;padding:14px;background:#f5f5f5;margin:0 0 20px;font-size:12px;color:#555}.bc-result-note p{margin:0}.bc-result-note>span{flex-shrink:0}.bc-other{display:block;border:0;background:none;color:#666;text-decoration:underline;margin:12px auto;font-size:11px}\n.bc-side .bc-content{min-height:560px}\n@media(max-width:800px){.bc-dialog:not(.bc-side){width:calc(100% - 20px);height:min(840px,calc(100dvh - 20px))}.bc-dialog:not(.bc-side) .bc-layout{grid-template-columns:minmax(0,1fr);grid-template-rows:auto minmax(0,1fr)}.bc-dialog:not(.bc-side) .bc-campaign{height:auto}.bc-dialog:not(.bc-side) .bc-artwork picture{height:auto}.bc-dialog:not(.bc-side) .bc-campaign-image{height:auto;aspect-ratio:4/3}.bc-content{padding:20px}.bc-form input:not([type=radio]):not([type=checkbox]),.bc-form select{font-size:16px;height:44px}.bc-tabs button{min-height:44px;font-size:10px}}\n@media(prefers-reduced-motion:reduce){.bc-announcement{overflow-x:auto}.bc-announcement-track{animation:none}.bc-announcement-track>[aria-hidden=true]{display:none!important}}\n/* Telemóvel · Homepage da Rita: cartão completo com deslocação única. */\n.bc-campaign-message-group{min-width:0}\n@keyframes bc-popup-in{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:none}}\n@keyframes bc-side-in{from{transform:translateX(100%)}to{transform:none}}\n@keyframes bc-side-up{from{transform:translateY(100%)}to{transform:none}}\n@keyframes bc-side-close-in{from{background:#0b0b0b}to{background:transparent}}\n.bc-dialog[open]:not(.bc-side){animation:bc-popup-in .25s ease-out}\n.bc-dialog.bc-side[open]{animation:bc-side-in .3s ease-out}\n@media(max-width:800px){\n  /* Só o conteúdo desliza. O botão de fecho fica disponível desde o primeiro frame. */\n  .bc-dialog.bc-side[open]{animation:none;background:transparent}\n  .bc-side[open] .bc-layout{animation:bc-side-up .3s ease-out;background:#fff}\n  .bc-side[open] .bc-close{animation:bc-side-close-in .3s step-end}\n  html.bc-modal-open{scrollbar-gutter:auto}\n  .bc-campaign-bar-link{flex-wrap:nowrap;gap:12px;padding:12px 16px;text-align:left;font-size:12.5px}\n  .bc-campaign-message-group{flex:1}\n  .bc-campaign-arrow{flex-shrink:0}\n  .bc-dialog:not(.bc-side){box-sizing:border-box;inset:50px 0 auto;width:calc(100% - 32px);height:min(742px,calc(100dvh - 100px));max-height:calc(100dvh - 100px);margin:0 auto;border:1px solid #e2e2e2;overflow-y:auto}\n  .bc-dialog:not(.bc-side) .bc-layout{display:block;height:auto;min-height:100%}\n  .bc-dialog:not(.bc-side) .bc-content{height:auto;min-height:0;overflow:visible;padding:16px 18px 18px;scrollbar-gutter:auto}\n  .bc-dialog:not(.bc-side) .bc-close{position:sticky;top:0;display:block;margin-left:auto;margin-bottom:-36px}\n  .bc-side .bc-content{padding:22px 20px 140px}\n}\n@media(prefers-reduced-motion:reduce){.bc-dialog[open],.bc-side[open] .bc-layout,.bc-side[open] .bc-close{animation:none}}\n#bc-member>p{font-size:13px;line-height:1.55;margin:0 0 22px}\n#bc-member>.bc-join-copy{font-size:11px;line-height:1.5;color:#6b6b6b;margin:18px 0 0}\n.bc-dialog .bc-join-link,.bc-dialog .bc-join-link:hover,.bc-dialog .bc-join-link:active{display:inline;padding:0;border:0;background:transparent!important;color:#333!important;font:inherit;font-weight:700;cursor:pointer;text-transform:none!important;text-decoration:underline;text-underline-offset:3px;box-shadow:none;transform:none}\n\n/* Medidas do formulário do protótipo da Rita. */\n.bc-dialog::backdrop{background:rgba(255,255,255,.7)}\n.bc-dialog,.bc-content{scrollbar-width:none}\n.bc-dialog::-webkit-scrollbar,.bc-content::-webkit-scrollbar{display:none}\n.bc-dialog:not(.bc-side) .bc-content{scrollbar-gutter:auto}\n.bc-tabs{margin-bottom:18px;border-color:#e2e2e2}\n.bc-tabs button{padding:10px 4px 9px;line-height:normal;letter-spacing:.4px;margin-bottom:-1px;font-weight:600;color:#8a8a8a}\n.bc-tabs [aria-selected=true]{font-weight:700;color:#333}\n.bc-dialog .bc-tabs button:hover{background:#fff}\n.bc-form{display:flex;flex-direction:column;gap:16px}\n.bc-form>label{display:flex;flex-direction:column;gap:6px;margin:0;line-height:normal}\n.bc-form input:not([type=radio]):not([type=checkbox]),.bc-form select{margin:0;padding:0 10px;height:40px;font-size:13px;border-color:#ccc}\n.bc-form>label:nth-child(3),.bc-form>label:has(select){margin-top:-6px}\n.bc-form fieldset{margin:0}\n.bc-form legend{line-height:normal;margin-bottom:10px}\n.bc-radios label{min-height:16px;line-height:normal;gap:8px}\n.bc-form input[type=radio],.bc-form input[type=checkbox]{width:16px;height:16px}\n.bc-form .bc-consent{flex-direction:row;align-items:center;gap:10px;margin:0;font-size:12px;line-height:1.4}\n.bc-consent input{margin-top:0!important}\n.bc-primary{height:44px;padding:0 10px;line-height:normal}\n.bc-dialog .bc-primary:hover{background:#333}\n.bc-foot{align-items:center;margin-top:-6px;font-size:10px;line-height:normal;color:#6b6b6b}\n#bc-member>p{margin-bottom:14px}\n.bc-member-form{gap:14px}\n.bc-member-form .bc-foot{margin-top:-4px}\n.bc-member-form input[type=email]{height:42px}\n#bc-member>.bc-join-copy{margin-top:14px}\n.bc-side .bc-content{padding:28px 40px 110px}\n.bc-side .bc-tabs{margin-bottom:22px}\n.bc-side .bc-tabs button{font-size:11px;letter-spacing:.1px}\n.bc-side .bc-close{top:16px;right:16px;width:46px;height:50px;margin-right:16px;margin-bottom:-50px;padding:8px;background:transparent;font-size:30px!important}\n.bc-side.bc-close-on-light .bc-close{background:#000}\n.bc-dialog .bc-close,.bc-dialog:not(.bc-side) .bc-close{display:flex;align-items:center;justify-content:center}\n.bc-close svg{display:block;pointer-events:none}\n.bc-side .bc-close svg{width:30px;height:30px;stroke-width:1.2}\n@media(min-width:801px){\n  .bc-dialog:not(.bc-side){box-sizing:content-box;inset:clamp(16px,calc(100dvh - 656px),90px) 0 auto;margin:0 auto;border:1px solid #e2e2e2;box-shadow:0 16px 40px rgba(0,0,0,.18)}\n  .bc-dialog:not(.bc-side) .bc-close{width:34px;height:30px}\n}\n@media(max-width:800px){\n  .bc-dialog.bc-side{width:100%}\n  .bc-form input:not([type=radio]):not([type=checkbox]),.bc-form select{font-size:16px}\n  .bc-side .bc-content{padding:22px 20px 140px}\n  .bc-side .bc-close{top:10px;right:10px;width:44px;height:46px;margin-right:10px;margin-bottom:-46px}\n  .bc-side .bc-close svg{width:26px;height:26px}\n  .bc-dialog:not(.bc-side) .bc-close{width:34px;height:30px;margin-bottom:-30px}\n}\n\n.bc-dialog .bc-campaign h2{color:#fff!important}.bc-dialog .bc-extra{color:#fff}\r\n\n.bc-cart-invite,.bc-cart-progress{font-family:Montserrat,Arial,sans-serif;box-sizing:border-box;color:#333}\r\n.bc-cart-invite{display:flex;align-items:center;gap:12px;width:100%;margin:6px 0 30px;padding:12px 18px;background:#efefef;border:1px solid #e0e0e0;text-align:left;cursor:pointer;color:#0b0b0b;font-size:13px;font-weight:700;line-height:1.45}\r\n.bc-cart-invite .bc-cart-logo{flex:none;background:#0b0b0b;border-radius:4px;padding:3px 8px;display:inline-flex}\r\n.bc-cart-logo img{height:12px;display:block;width:auto}\r\n.bc-cart-invite>span:nth-child(2){flex:1;min-width:0}\r\n.bc-cart-invite u{text-underline-offset:3px}\r\n.bc-cart-invite:hover{background:#e5e5e5}\r\n.bc-cart-invite svg{flex:none}\r\n.bc-cart-progress{border:1px solid #ddd;border-radius:4px;padding:18px 20px;display:flex;flex-direction:column;gap:14px;margin:0 0 24px}\r\n.bc-cart-progress header{display:flex;gap:10px;align-items:center}\r\n.bc-cart-progress header img{height:14px;width:auto}\r\n.bc-cart-progress header span{font-size:10px;font-weight:800;letter-spacing:1px;color:#6b6b6b}\r\n.bc-cart-copy{font-size:13px;line-height:1.45;margin:0!important}\r\n.bc-cart-copy strong{font-weight:700}.bc-cart-missing{color:#ef4036}\r\n.bc-cart-meter{height:8px;background:#e6e6e6;border-radius:4px;overflow:hidden}\r\n.bc-cart-meter>span{display:block;height:100%;background:#2e9e4f;border-radius:4px;transition:width .2s}\r\n.bc-cart-values{display:flex;justify-content:space-between;font-size:11px;color:#6b6b6b}\r\n.bc-cart-test-note{font:11px/1.5 Montserrat,Arial,sans-serif;color:#666;margin:8px 0 16px}\r\n.bc-cart-progress[hidden],.bc-cart-progress [hidden],.bc-cart-invite[hidden]{display:none!important}\r\n@media(max-width:767px){.bc-cart-invite{gap:8px;padding:12px;margin-bottom:20px;font-size:11px;flex-wrap:nowrap}.bc-cart-invite>span:nth-child(2){flex-basis:0}.bc-cart-invite svg{width:20px}.bc-cart-progress{padding:16px 14px}.bc-cart-progress header{gap:8px}.bc-cart-progress header span{font-size:9px}.bc-cart-progress .bc-cart-copy{font-size:12px}}\r\n@media(prefers-reduced-motion:reduce){.bc-cart-meter>span{transition:none}}\r\n\r\n.bc-dialog .bc-campaign p{color:#fff}\r\n.bc-dialog .bc-demo-notice,.bc-dialog .bc-result .bc-other{display:none}\r\n.bc-dialog .bc-result-note strong,.bc-dialog .bc-result-note b{font-weight:700}\r\n.bc-cart-recommendations[hidden]{display:none!important}\r\n.bc-cart-recommendations{margin:24px 0;font-family:Montserrat,Arial,sans-serif;min-width:0}\r\n.bc-cart-recommendations>header{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:16px}\r\n.bc-cart-recommendations h2{font-size:13px;font-weight:700;margin:0}\r\n.bc-cart-recommendations header button{border:1px solid #ddd;background:white;border-radius:50%;width:36px;height:36px;font-size:22px;margin-left:6px}\r\n.bc-rec-track{display:flex;gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:10px}\r\n.bc-rec-card{display:flex;flex-direction:column;gap:6px;flex:0 0 calc((100% - 56px)/4.5);min-width:0;scroll-snap-align:start}\r\n.bc-rec-card img{width:100%;aspect-ratio:3/4;object-fit:cover;background:#f5f5f5}\r\n.bc-rec-card h3{font-size:11px;line-height:1.3;font-weight:700;margin:0}\r\n.bc-rec-price{font-size:11px;margin:0}.bc-rec-price del{color:#777;margin-right:5px}\r\n.bc-rec-card>a{display:flex;align-items:center;justify-content:center;background:#333;color:#fff;min-height:36px;font-size:10px;font-weight:700;text-decoration:none}\r\n.bc-rec-info{font-size:10px;color:#666;margin-top:8px}\r\n.bc-cart-recommendations header button{color:#333!important;line-height:1!important}\r\n.bc-cart-recommendations header>div[hidden]{display:none!important}\r\n.bc-rec-add{margin-top:auto;width:100%;height:32px;border:0;background:#333;color:#fff!important;font:700 11px Montserrat,Arial,sans-serif!important;letter-spacing:.5px;cursor:pointer}\r\n.bc-rec-add:disabled{opacity:.6;cursor:wait}.bc-rec-size{width:100%;min-height:36px;margin:4px 0 8px;font-size:12px}.bc-rec-size[hidden]{display:none!important}\r\n.bc-rec-status{font-size:11px!important;line-height:1.4!important;color:#555;margin:6px 0!important}.bc-rec-status:empty{display:none}\r\n\r\n.ec_shopping_bag .bc-rec-card h3{font-size:11px!important;line-height:1.3!important;font-weight:700!important}\r\n@media(max-width:767px){.bc-rec-track{gap:8px}.bc-rec-card{flex-basis:calc((100% - 16px)/2.5);min-width:0}.bc-cart-recommendations header button{width:36px;height:36px}.bc-cart-recommendations h2{max-width:210px}.bc-rec-card>a{min-height:44px}}\r\n\r\n.bc-rec-track{scrollbar-width:none;scroll-snap-type:x proximity;overscroll-behavior-x:contain}.bc-rec-track::-webkit-scrollbar{display:none}\r\n.ec_shopping_bag .bc-cart-invite{text-transform:none!important}\r\n";document.head.appendChild(style);
(function () {
  'use strict';
  function campaignArtPhase(date, preview) {
    return date==='2026-11-25' ? '25' : date==='2026-11-26' ? '' : ['2026-11-27','2026-11-28','2026-11-29'].includes(date) ? '27-29' : date==='2026-11-30' ? '30' : '';
  }
  function payload(values, context = {}) {
    if (!values.fullname.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) throw new Error('Preenche o nome e um email válido.');
    if (!['Homem', 'Mulher'].includes(values.gender) || !['Moda', 'Desporto', 'Ambos'].includes(values.preference) || !values.consent) throw new Error('Seleciona as preferências e aceita o consentimento.');
    if (values.dob && (!/^\d{4}-\d{2}-\d{2}$/.test(values.dob) || !Number.isFinite(Date.parse(values.dob)) || new Date(values.dob).toISOString().slice(0, 10) !== values.dob || values.dob > new Date().toLocaleDateString('sv-SE'))) throw new Error('Revê a data de nascimento.');
    const p = new URLSearchParams({u:'4', f:'4', s:'', c:'0', m:'0', act:'sub', v:'2', fullname:values.fullname.trim(), email:values.email.trim(), 'field[13]':values.gender, 'field[6]':values.preference, jsonp:'true'});
    if (values.dob) p.set('field[1]', values.dob);
    if (context.country) p.set('field[11]', context.country);
    if (context.language) p.set('field[12]', context.language);
    const query = new URLSearchParams(context.search || '');
    for (const k of ['utm_source','utm_medium','utm_campaign','utm_term','utm_content']) if (query.get(k)) p.set(k, query.get(k));
    return p;
  }
  function clearValidity(target, fields) {
    if(typeof target.setCustomValidity!=='function')return;
    target.setCustomValidity('');
    if(target.type==='radio')for(const field of fields)if(field!==target && field.type==='radio' && field.name===target.name)field.setCustomValidity('');
  }
  function headerHeight(header) {
    const rect=header.getBoundingClientRect();
    let bottom=rect.bottom;
    for(const menu of header.querySelectorAll('nav.menu > ul > li > .submenu')) {
      const box=menu.getBoundingClientRect();
      if(box.width && box.height)bottom=Math.max(bottom,box.bottom);
    }
    return bottom-rect.top;
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = {payload,clearValidity,headerHeight,campaignArtPhase};
  if (typeof document === 'undefined' || window.BazarClubForm) return;
  const config = {workerUrl:'https://bzrac.peboys.workers.dev/membership/check',...(window.BazarClubFormConfig || {}), preview:true, userId:''};
  if (document.currentScript?.dataset.userId) config.userId=document.currentScript.dataset.userId;
  const i18n=window.BazarClubI18n;
  const lang=i18n?.language(config.language || document.currentScript?.dataset.shopLang || location.pathname.split('/')[1] || document.documentElement.lang) || 'pt';
  const tr=i18n?.create(lang) || (text=>text);
  function campaignDate() {
    const date=new URLSearchParams(location.search).get('bf-date');
    if(config.preview && /^2026-11-(0[1-9]|[12][0-9]|30)$/.test(date || ''))return date;
    return new Date().toLocaleDateString('sv-SE',{timeZone:'Europe/Lisbon'});
  }
  function campaignBenefit(date) {
    if(date<'2026-11-26')return tr('A 26 de novembro, tens acesso antecipado à Black Friday.');
    if(date==='2026-11-26')return tr('Hoje tens acesso antecipado à Black Friday.');
    return '';
  }
  const assetBase = new URL('assets/', document.currentScript?.src || location.href);
  const fonts=document.createElement('link'); fonts.rel='stylesheet'; fonts.href='https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@800&family=Montserrat:wght@400;500;600;700&display=swap';
  const fontsReady=new Promise(resolve=>{
    const timeout=setTimeout(resolve,3000);
    const done=()=>{clearTimeout(timeout);resolve();};
    fonts.onload=()=>Promise.all([document.fonts.load('400 13px Montserrat'),document.fonts.load('600 12px Montserrat'),document.fonts.load('700 12px Montserrat')]).catch(()=>{}).finally(done);
    fonts.onerror=done;
  });
  document.head.appendChild(fonts);
  let dialog, campaignText, opener, busy = false, pending = null, recognized = false, selectTab, artworkReady=Promise.resolve(), openRequest=0;
  const storageKey='bazarclub-recognition-2026';
  const userId=String(config.userId || '').trim();
  const validUserId=userId && !/[{}]/.test(userId);
  function clearRecognition() { recognized=false; if(!config.preview)try { localStorage.removeItem(storageKey); } catch {} }
  function savedRecognition() {
    try {
      const data=JSON.parse(localStorage.getItem(storageKey));
      if (data?.expiresAt>Date.now() && typeof data.token==='string' && (!validUserId || data.userId===userId)) return data;
      clearRecognition();
    } catch { clearRecognition(); }
    return null;
  }
  async function checkMembership(identity) {
    const response=await fetch(config.workerUrl,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(identity),signal:AbortSignal.timeout(15000),credentials:'omit',cache:'no-store'});
    if (!response.ok) throw new Error('Não foi possível verificar a adesão. Tenta novamente.');
    const data=await response.json();
    if (typeof data.subscribed!=='boolean') throw new Error('Resposta de verificação inválida.');
    recognized=data.subscribed;
    if (recognized && typeof data.token==='string' && data.expiresAt>Date.now()) {
      try { localStorage.setItem(storageKey,JSON.stringify({token:data.token,expiresAt:data.expiresAt,userId:validUserId ? userId : ''})); } catch {}
    } else clearRecognition();
    window.dispatchEvent(new CustomEvent('bazarclub:membership',{detail:{subscribed:recognized}}));
    return data;
  }
  function showResult(kind) {
    const result=dialog.querySelector('.bc-result');
    const member=kind==='member', active=kind!=='pending';
    dialog.querySelector('.bc-tabs').hidden=true;
    dialog.querySelector('#bc-new').hidden=true;
    dialog.querySelector('#bc-member').hidden=true;
    result.hidden=false;
    result.querySelector('h2').textContent=tr(member ? 'BEM-VINDO DE VOLTA!' : active ? 'BEM-VINDO AO BAZARCLUB!' : 'FALTA CONFIRMAR A TUA ADESÃO');
    const date=campaignDate();
    const copy=result.querySelector('.bc-result-copy');
    if(active){
      const lead=document.createElement('b');lead.textContent=tr('Já te reconhecemos como membro. ');
      const benefit=date<'2026-11-26' ? 'No dia 26 de novembro vais ter acesso antecipado + 5€ extra acumuláveis com os descontos da Black Friday.' : date==='2026-11-26' ? 'Tens agora acesso antecipado + 5€ extra acumuláveis com os descontos da Black Friday.' : 'Tens agora 5€ extra acumuláveis com os descontos da Black Friday.';
      const end=document.createElement(date<'2026-11-26'?'span':'b');
      end.textContent=tr(date<'2026-11-26'?'Estas vantagens serão aplicadas diretamente no teu carrinho.':'Estas vantagens já se encontram no teu carrinho.');
      if(date>='2026-11-26')end.style.color='#EF4036';
      copy.replaceChildren(lead,document.createTextNode(tr(benefit)+' '),end);
    }else copy.textContent=tr('Recebemos o teu pedido. Se receberes um email de confirmação, segue as instruções para concluir a adesão. As vantagens ficam disponíveis quando a subscrição estiver ativa.');
    status('');
    result.querySelector('h2').focus();
  }
  const previous = {success:window._show_thank_you, error:window._show_error};
  function finish(ok, message) {
    if (!pending) return;
    const email=pending.email;
    clearTimeout(pending.timer); pending.script.remove(); pending = null;
    busy = false;
    dialog.querySelector('[type="submit"]').disabled = false;
    dialog.querySelector('form').removeAttribute('aria-busy');
    status(message, ok);
    if (ok) {
      status('A confirmar a tua adesão…');
      busy=true;
      // O formulário AC já inicia a sequência; a consulta apenas confirma a adesão.
      checkMembership({email}).then(data=>{
        dialog.querySelector('.bc-form').reset();
        showResult(data.subscribed ? 'new' : 'pending');
      }).catch(()=>status('O pedido foi enviado, mas ainda não conseguimos verificar a adesão. Verifica o teu email e usa “Já sou membro” para tentar novamente.')).finally(()=>{busy=false;});
    }
  }
  window._show_thank_you = function (id, ...args) {
    if (String(id) === '4' && pending) finish(true, 'Obrigado! A ActiveCampaign confirmou a submissão. Se receberes um email de confirmação, segue as instruções para concluir a adesão.');
    else if (typeof previous.success === 'function') previous.success.call(this, id, ...args);
  };
  window._show_error = function (id, ...args) {
    if (String(id) === '4' && pending) finish(false, 'Não foi possível concluir a adesão. Revê os dados e tenta novamente.');
    else if (typeof previous.error === 'function') previous.error.call(this, id, ...args);
  };
  function status(message, ok = false) {
    const el = dialog.querySelector('.bc-status');
    el.textContent = tr(message); el.dataset.ok = String(ok);
  }
  function mount() {
    if (dialog) return;
    dialog = document.createElement('dialog');
    dialog.className = 'bc-dialog'; dialog.setAttribute('aria-label', 'Adesão ao BAZARclub');
    dialog.innerHTML = `
      <button class="bc-close" type="button" aria-label="Fechar"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg></button>
      <div class="bc-layout">
        <aside class="bc-campaign">
          <div class="bc-brand">BAZAR<span>club</span></div>
          <div class="bc-date"></div>
          <h2>ACESSO<br>ANTECIPADO</h2>
          <div class="bc-extra">+ <strong>5€ EXTRA</strong></div>
          <div class="bc-rule"></div>
          <p>Torna-te membro e garante, na Black Friday, acesso antecipado + 5€ extra acumuláveis com os descontos.</p>
          <small class="bc-conditions"></small>
          <div class="bc-tape" aria-hidden="true">BLACK FRIDAY　 BLACK FRIDAY　 BLACK FRIDAY</div>
        </aside>
        <section class="bc-content">
          <div class="bc-tabs" role="tablist" aria-label="Adesão">
            <button id="bc-tab-new" role="tab" aria-selected="true" aria-controls="bc-new" type="button">Ainda não sou membro</button>
            <button id="bc-tab-member" role="tab" aria-selected="false" aria-controls="bc-member" tabindex="-1" type="button">Já sou membro</button>
          </div>
          <div id="bc-new" role="tabpanel" aria-labelledby="bc-tab-new">
            <form class="bc-form">
              <label>Nome *<input name="fullname" autocomplete="name" required maxlength="200"></label>
              <label>E-mail *<input name="email" type="email" autocomplete="email" required maxlength="254"></label>
              <label>Data de Nascimento<input name="dob" type="date" autocomplete="bday"></label>
              <fieldset><legend>Pretendes subscrever a Newsletter de: *</legend><div class="bc-radios">
                <label><input type="radio" name="gender" value="Homem" required> Homem</label>
                <label><input type="radio" name="gender" value="Mulher" required> Mulher</label>
              </div></fieldset>
              <label>Que tipo de comunicação preferes? *<select name="preference" required><option value="">Selecionar</option><option value="Moda">Moda</option><option value="Desporto">Desporto</option><option value="Ambos">Ambos</option></select></label>
              <label class="bc-consent"><input type="checkbox" name="consent" required><span>Quero receber a newsletter BAZARclub por email e aceito a <a href="https://www.bzronline.com/pt/ajuda-e-condicoes/politica-de-privacidade_666.html" target="_blank" rel="noopener">Política de Privacidade</a>.*</span></label>
              <button type="submit" class="bc-primary">Tornar-me membro</button>
              <div class="bc-foot"><small>* Campos obrigatórios</small><a class="bc-terms-link" href="https://www.bzronline.com/pt/ajuda-e-condicoes/campanhas_663.html" target="_blank" rel="noopener">Condições da campanha</a></div>
            </form>
          </div>
          <div id="bc-member" role="tabpanel" aria-labelledby="bc-tab-member" hidden>
            <p>Introduz o email com que já subscreveste a newsletter, para te reconhecermos e veres as tuas vantagens.</p>
            <form class="bc-member-form bc-form">
              <label>E-mail *<input name="email" type="email" autocomplete="email" placeholder="Introduz o teu e-mail" required maxlength="254"></label>
              <button type="submit" class="bc-primary">CONFIRMAR</button>
              <div class="bc-foot"><small>* Campos obrigatórios</small><a class="bc-terms-link" href="https://www.bzronline.com/pt/ajuda-e-condicoes/campanhas_663.html" target="_blank" rel="noopener">Condições da campanha</a></div>
            </form>
            <p class="bc-join-copy">Ainda não és membro? <a href="#bc-new" class="bc-join-link">Adere aqui</a>.</p>
          </div>
          <div class="bc-result" hidden>
            <h2 tabindex="-1"></h2>
            <div class="bc-result-note"><span aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M3 7l9 6 9-6"></path></svg></span><p class="bc-result-copy"></p></div>
            <button type="button" class="bc-primary bc-continue">Continuar a comprar</button>
            <button type="button" class="bc-other">Usar outro email</button>
          </div>
          <p class="bc-status" role="status" aria-live="polite" aria-atomic="true"></p>
        </section>
      </div>`;
    document.body.appendChild(dialog);
    if(config.preview){const note=document.createElement('p');note.className='bc-demo-notice';note.textContent='Pré-visualização. Os formulários simulam a adesão e a verificação.';dialog.querySelector('.bc-content').prepend(note);}
    dialog.querySelector('.bc-date').textContent = config.campaignLabel || 'A 26 DE NOVEMBRO';
    dialog.querySelector('.bc-conditions').textContent = config.conditionsText || '*5€ extra em compras a partir de 119,90 €.';
    dialog.lang=lang;
    i18n?.localize(dialog,tr);
    campaignText=dialog.querySelector('.bc-campaign').cloneNode(true);
    if(config.privacyUrl)dialog.querySelector('.bc-consent a').href=config.privacyUrl;
    const nativePrivacy=document.querySelector('footer a[href*="_666.html"]');
    const nativeTerms=document.querySelector('footer a[href*="_663.html"]');
    if(!config.privacyUrl && nativePrivacy)dialog.querySelector('.bc-consent a').href=nativePrivacy.href;
    if(config.termsUrl || nativeTerms)dialog.querySelectorAll('.bc-terms-link').forEach(link=>{link.href=config.termsUrl || nativeTerms.href;});
    dialog.addEventListener('invalid',e=>{e.target.setCustomValidity(tr(e.target.type==='date' && !e.target.validity.valueMissing ? 'Revê a data de nascimento.' : e.target.validity.typeMismatch ? 'Introduz um email válido.' : 'Preenche este campo.'));},true);
    const clearFieldValidity=e=>clearValidity(e.target,dialog.querySelectorAll('input[type=radio]'));
    dialog.addEventListener('input',clearFieldValidity);
    dialog.addEventListener('change',clearFieldValidity);
    dialog.querySelector('[name="dob"]').max = new Date().toLocaleDateString('sv-SE');
    dialog.querySelector('.bc-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', e => {
      const r = dialog.getBoundingClientRect();
      if (e.target === dialog && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) dialog.close();
    });
    dialog.addEventListener('close', () => { openRequest++; document.documentElement.classList.remove('bc-modal-open'); window.dispatchEvent(new CustomEvent('bazarclub:closed')); if (opener && opener.isConnected) opener.focus(); });
    dialog.addEventListener('scroll',()=>dialog.classList.toggle('bc-close-on-light',dialog.classList.contains('bc-side') && dialog.scrollTop>dialog.querySelector('.bc-campaign').offsetHeight-60),{passive:true});
    const tabs = [...dialog.querySelectorAll('[role="tab"]')];
    selectTab=function(index) {
      dialog.querySelector('.bc-tabs').hidden=false;
      dialog.querySelector('.bc-result').hidden=true;
      tabs.forEach((tab, i) => {
        tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1;
        dialog.querySelector('#' + tab.getAttribute('aria-controls')).hidden = i !== index;
      });
      status('');
    };
    dialog.querySelector('.bc-continue').addEventListener('click',()=>dialog.close());
    dialog.querySelector('.bc-other').addEventListener('click',()=>{clearRecognition();selectTab(1);dialog.querySelector('.bc-member-form input').focus();});
    dialog.querySelector('.bc-join-link').addEventListener('click',e=>{e.preventDefault();selectTab(0);dialog.querySelector('.bc-form input').focus();});
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => selectTab(i));
      tab.addEventListener('keydown', e => {
        if (['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) {
          e.preventDefault(); const next = e.key === 'Home' ? 0 : e.key === 'End' ? 1 : 1-i;
          selectTab(next); tabs[next].focus();
        }
      });
    });
    dialog.querySelector('.bc-member-form').addEventListener('submit', async e => {
      e.preventDefault(); if (busy) return;
      const form=e.currentTarget; if (!form.reportValidity()) return;
      const button=form.querySelector('button'); button.disabled=true; busy=true; status('A verificar a tua adesão…');
      try {
        if (config.preview) { form.reset(); showResult('member'); return; }
        const data=await checkMembership({email:form.elements.email.value.trim(),requestWelcome:true});
        if (data.subscribed) { form.reset(); showResult('member'); }
        else status('Não encontrámos uma subscrição ativa com este email. Podes aderir no separador “Ainda não sou membro”.');
      } catch { status('Não foi possível verificar a adesão. Tenta novamente.'); }
      finally { button.disabled = false; busy=false; }
    });
    dialog.querySelector('form').addEventListener('submit', e => {
      e.preventDefault(); if (busy) return;
      const form = e.currentTarget;
      if (!form.reportValidity()) return;
      const values = Object.fromEntries(new FormData(form));
      values.consent = form.elements.consent.checked;
      const country = document.querySelector('#country option:checked');
      let params;
      try { params = payload(values, {country:country?.getAttribute('data-code') || country?.value, language:lang, search:location.search}); }
      catch (err) { status(err.message); return; }
      if (config.preview) { form.reset(); showResult('new'); return; }
      busy = true; form.querySelector('[type="submit"]').disabled = true; form.setAttribute('aria-busy','true'); status('A enviar a tua adesão…');
      const script = document.createElement('script');
      pending = {script,email:values.email.trim(), timer:setTimeout(() => finish(false, 'Não recebemos confirmação do envio. Verifica o teu email antes de tentares novamente.'), 20000)};
      script.onerror = () => finish(false, 'Não foi possível confirmar o envio. Verifica a ligação e o teu email antes de tentares novamente.');
      script.src = 'https://bazardesportivo.activehosted.com/proc.php?' + params;
      script.referrerPolicy = 'no-referrer';
      document.head.appendChild(script);
    });
  }
  function updateCampaign(mode) {
    const campaign = dialog.querySelector('.bc-campaign');
    const date=campaignDate();
    const artPhase=config.campaignArtBase ? campaignArtPhase(date,config.preview===true) : '';
    const phaseImage=variant=>new URL('bazarclub-'+artPhase+'-'+lang+'-'+variant+'.png',config.campaignArtBase).href;
    if(date>'2026-11-26' && !artPhase){
      if(campaign.classList.contains('bc-artwork')){
        campaign.replaceChildren(...campaignText.cloneNode(true).childNodes);
        campaign.classList.remove('bc-artwork');
        delete campaign.dataset.variant;
      }
      const extra=date<='2026-11-30';
      campaign.querySelector('.bc-date').textContent=tr(date==='2026-11-30' ? 'Dia extra · só hoje' : '27 A 29 DE NOVEMBRO');
      campaign.querySelector('.bc-date').hidden=date>'2026-11-30';
      campaign.querySelector('h2').textContent=tr('BLACK FRIDAY');
      campaign.querySelector('.bc-extra').hidden=!extra;
      campaign.querySelector('.bc-extra').textContent=tr('+5€ extra para membros');
      campaign.querySelector('.bc-conditions').hidden=!extra;
      campaign.querySelector('p').textContent=tr(extra ? 'Torna-te membro e aproveita 5€ extra acumuláveis com os descontos da Black Friday.' : 'Torna-te membro para receber as novidades e ofertas do BAZARclub.');
      return Promise.resolve();
    }
    const variant = mode === 'side' ? 'side' : 'desktop';
    const artKey=variant+':'+artPhase;
    if (campaign.dataset.variant === artKey) return artworkReady;
    campaign.dataset.variant = artKey;
    const picture = document.createElement('picture');
    const source = document.createElement('source');
    source.media = mode==='side' ? '(max-width: 0px)' : '(max-width: 800px)';
    source.srcset = artPhase ? phaseImage('mobile') : config.campaignImageMobile || config.campaignImage || new URL('bazarclub-'+lang+'-mobile.png', assetBase).href;
    const img = document.createElement('img');
    img.className = 'bc-campaign-image';
    img.alt = config.campaignImageAlt || tr('BAZARclub. A 26 de novembro: acesso antecipado +5€ extra acumuláveis com os descontos da Black Friday. 5€ extra em compras a partir de 119,90 €.');
    if(artPhase==='27-29' || artPhase==='30')img.alt=tr('BLACK FRIDAY')+'. '+tr('+5€ extra para membros')+'. '+tr('*5€ extra em compras a partir de 119,90 €.');
    img.width = variant === 'side' ? 840 : 600;
    img.height = variant === 'side' ? 900 : 1280;
    picture.append(source, img);
    const fallback=[...campaign.childNodes],hadArtwork=campaign.classList.contains('bc-artwork');
    // Inserir picture antes do src permite escolher a arte mobile antes de carregar.
    campaign.replaceChildren(picture);campaign.classList.add('bc-artwork');
    artworkReady=new Promise(resolve=>{
      let settled=false;
      const finish=ok=>{
        if(settled)return;settled=true;clearTimeout(timeout);img.onload=null;img.onerror=null;
        if(!ok && picture.parentNode===campaign){campaign.replaceChildren(...fallback);campaign.classList.toggle('bc-artwork',hadArtwork);delete campaign.dataset.variant;}
        if(ok && img.decode)img.decode().catch(()=>{}).then(resolve);else resolve();
      };
      const timeout=setTimeout(()=>finish(false),5000);
      img.onload=()=>finish(true);img.onerror=()=>finish(false);
      img.src = artPhase ? phaseImage(variant) : (variant === 'side' ? config.campaignImageSide : '') || config.campaignImage || new URL('bazarclub-'+lang+'-' + variant + '.png', assetBase).href;
    });
    return artworkReady;
  }
  window.BazarClubForm = {open(mode = 'popup') {
    const request=++openRequest;
    mount(); opener = document.activeElement;
    dialog.classList.toggle('bc-side', mode === 'side');
    const ready=updateCampaign(mode);
    if (!busy) { if (recognized) showResult('member'); else selectTab(0); }
    return Promise.all([ready,fontsReady]).then(()=>{
      if(request!==openRequest || dialog.open)return;
      dialog.scrollTop=0;dialog.querySelector('.bc-content').scrollTop=0;dialog.classList.remove('bc-close-on-light');
      document.documentElement.classList.add('bc-modal-open');dialog.showModal();
    });
  }, close() { openRequest++;if (dialog?.open) dialog.close(); }, isMember(){return recognized;}};
  if (!config.preview) {
    const saved=savedRecognition();
    const identity=validUserId ? {id_utilizador:userId} : saved ? {token:saved.token} : null;
    if (identity) checkMembership(identity).then(data=>{if(data.subscribed && dialog?.open && !busy)showResult('member');}).catch(()=>{});
  }
  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-bazarclub-open]');
    if (trigger) { e.preventDefault(); window.BazarClubForm.open(trigger.dataset.bazarclubOpen); }
    else if (config.replaceNewsletterLink && e.target.closest('a[href*="newsletter_7.html"]')) { e.preventDefault(); window.BazarClubForm.open('side'); }
  });
  const ANNOUNCEMENT_MARKUP = "<div class=\"bzr-tk\"><span style=\"display: inline-flex; align-items: center; gap: 40px; padding-right: 40px; white-space: nowrap\"><span style=\"display: inline-flex; align-items: center; gap: 8px\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#EF4036\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 12V4h8l10 10-8 8z\"></path><circle cx=\"7.5\" cy=\"8.5\" r=\"1.4\"></circle></svg><span style=\"color: #EF4036\">BLACK FRIDAY AQUECIMENTO · Os membros BAZARclub compram mais cedo esta Black Friday</span></span><span aria-hidden=\"true\" style=\"color: #6B6B6B\">•</span></span><span style=\"display: inline-flex; align-items: center; gap: 40px; padding-right: 40px; white-space: nowrap\"><span style=\"display: inline-flex; align-items: center; gap: 8px\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M2 6h12v10H2zM14 10h4l3 3v3h-7\"></path><circle cx=\"6\" cy=\"18\" r=\"1.8\"></circle><circle cx=\"17\" cy=\"18\" r=\"1.8\"></circle></svg>ENVIO GRÁTIS ACIMA DE 69,90€ · ENTREGA EM 1 A 3 DIAS ÚTEIS</span><span aria-hidden=\"true\" style=\"color: #6B6B6B\">•</span></span><span style=\"display: inline-flex; align-items: center; gap: 40px; padding-right: 40px; white-space: nowrap\"><span style=\"display: inline-flex; align-items: center; gap: 8px\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 9h11a5 5 0 0 1 0 10H8\"></path><path d=\"M8 5L4 9l4 4\"></path></svg>TROCAS BLACK FRIDAY ALARGADAS ATÉ 4 DE JANEIRO. VER CONDIÇÕES*</span><span aria-hidden=\"true\" style=\"color: #6B6B6B\">•</span></span><span style=\"display: inline-flex; align-items: center; gap: 40px; padding-right: 40px; white-space: nowrap\"><span style=\"display: inline-flex; align-items: center; gap: 8px\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 10v10h16V10\"></path><path d=\"M3 10l2-6h14l2 6z\"></path><path d=\"M10 20v-5h4v5\"></path></svg>LEVANTAMENTO GRATUITO EM LOJA</span><span aria-hidden=\"true\" style=\"color: #6B6B6B\">•</span></span><span style=\"display: inline-flex; align-items: center; gap: 40px; padding-right: 40px; white-space: nowrap\"><span style=\"display: inline-flex; align-items: center; gap: 8px\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"2.5\" y=\"5\" width=\"19\" height=\"14\" rx=\"2\"></rect><path d=\"M2.5 10h19M6 15h4\"></path></svg><span style=\"display: inline-flex; align-items: center; gap: 6px\">PAGAMENTOS EM PRESTAÇÕES COM<img src=\"./assets/4b14242983f2fd1d1be93f3ea553e672.png\" alt=\"Klarna\" style=\"height: 18px; display: block\"><span style=\"display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;height:18px;padding:0 6px;background:#00C2A3;border-radius:4px\"><img src=\"https://live.sequracdn.com/assets/images/logos/logo_white.svg\" alt=\"SeQura\" style=\"height:10px;width:auto;display:block\"></span></span></span><span aria-hidden=\"true\" style=\"color: #6B6B6B\">•</span></span><span style=\"display: inline-flex; align-items: center; gap: 40px; padding-right: 40px; white-space: nowrap\"><span style=\"display: inline-flex; align-items: center; gap: 8px\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"5\" y=\"11\" width=\"14\" height=\"10\" rx=\"2\"></rect><path d=\"M8 11V7a4 4 0 0 1 8 0v4\"></path></svg><span style=\"display: inline-flex; align-items: center; gap: 6px\">PAGAMENTOS SEGUROS:<span style=\"display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; height: 18px; background: #FFFFFF; border-radius: 4px; padding: 0 6px\"><img src=\"./assets/3d4b1fd25f95056265f009b9eb76bdcc.png\" alt=\"MB WAY\" style=\"height: 13px; display: block\"></span><span style=\"display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; height: 18px; background: #FFFFFF; border-radius: 4px; padding: 0 6px\"><img src=\"./assets/f2f7fb52b9cc797862f6ef2553ca9538.png\" alt=\"Multibanco\" style=\"height: 11px; display: block\"></span><span style=\"display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; height: 18px; background: #FFFFFF; border-radius: 4px; padding: 0 6px\"><img src=\"./assets/44b74a0c9f480d3bef17d84790eb9edf.png\" alt=\"Visa\" style=\"height: 8px; display: block\"></span><span style=\"display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; height: 18px; background: #FFFFFF; border-radius: 4px; padding: 0 6px\"><img src=\"./assets/27fd35683d78d84fcdfaf8210f4c3d90.png\" alt=\"PayPal\" style=\"height: 12px; display: block\"></span><span style=\"display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;height:18px;background:#fff;border-radius:4px;padding:0 6px\"><svg role=\"img\" aria-label=\"Mastercard\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"190 2 30 24\" width=\"17.5\" height=\"14\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M216.523 22.8653V22.9136H216.568C216.578 22.9136 216.586 22.9117 216.592 22.9079C216.599 22.9036 216.601 22.8974 216.601 22.8892C216.601 22.8811 216.599 22.8754 216.592 22.8711C216.586 22.8673 216.578 22.8653 216.568 22.8653H216.523ZM216.569 22.8314C216.592 22.8314 216.61 22.8367 216.623 22.8467C216.636 22.8573 216.642 22.8716 216.642 22.8893C216.642 22.9041 216.637 22.9165 216.627 22.9266C216.617 22.9361 216.602 22.9419 216.584 22.9443L216.643 23.0126H216.597L216.542 22.9447H216.524V23.0126H216.485V22.8314H216.569ZM216.557 23.0748C216.578 23.0748 216.598 23.0709 216.616 23.0628C216.634 23.0552 216.65 23.0441 216.664 23.0303C216.678 23.0165 216.688 23.0006 216.697 22.982C216.704 22.9634 216.708 22.9438 216.708 22.9228C216.708 22.9017 216.704 22.8821 216.697 22.8634C216.688 22.8448 216.678 22.829 216.664 22.8152C216.65 22.8013 216.634 22.7908 216.616 22.7827C216.598 22.775 216.578 22.7712 216.557 22.7712C216.536 22.7712 216.515 22.775 216.497 22.7827C216.478 22.7908 216.462 22.8013 216.448 22.8152C216.434 22.829 216.424 22.8448 216.416 22.8634C216.408 22.8821 216.404 22.9017 216.404 22.9228C216.404 22.9438 216.408 22.9634 216.416 22.982C216.424 23.0006 216.434 23.0165 216.448 23.0303C216.462 23.0441 216.478 23.0552 216.497 23.0628C216.515 23.0709 216.536 23.0748 216.557 23.0748V23.0748ZM216.557 22.7277C216.585 22.7277 216.611 22.7325 216.635 22.743C216.659 22.7531 216.68 22.7669 216.698 22.7846C216.716 22.8023 216.73 22.8233 216.741 22.8467C216.751 22.8706 216.756 22.896 216.756 22.9228C216.756 22.9495 216.751 22.9749 216.741 22.9983C216.73 23.0222 216.716 23.0428 216.698 23.0605C216.68 23.0781 216.659 23.092 216.635 23.1025C216.611 23.1131 216.585 23.1178 216.557 23.1178C216.529 23.1178 216.503 23.1131 216.478 23.1025C216.454 23.092 216.433 23.0781 216.415 23.0605C216.397 23.0428 216.383 23.0222 216.372 22.9983C216.362 22.9749 216.357 22.9495 216.357 22.9228C216.357 22.896 216.362 22.8706 216.372 22.8467C216.383 22.8233 216.397 22.8023 216.415 22.7846C216.433 22.7669 216.454 22.7531 216.478 22.743C216.503 22.7325 216.529 22.7277 216.557 22.7277V22.7277ZM198.186 22.0302C198.186 21.685 198.412 21.4015 198.783 21.4015C199.138 21.4015 199.376 21.6726 199.376 22.0302C199.376 22.3878 199.138 22.6589 198.783 22.6589C198.412 22.6589 198.186 22.3754 198.186 22.0302V22.0302ZM199.78 22.0302V21.0481H199.352V21.2868C199.216 21.1098 199.01 20.9989 198.73 20.9989C198.177 20.9989 197.745 21.4306 197.745 22.0302C197.745 22.6302 198.177 23.0614 198.73 23.0614C199.01 23.0614 199.216 22.9505 199.352 22.7741V23.0121H199.78V22.0302ZM214.249 22.0302C214.249 21.685 214.475 21.4015 214.846 21.4015C215.2 21.4015 215.439 21.6726 215.439 22.0302C215.439 22.3878 215.2 22.6589 214.846 22.6589C214.475 22.6589 214.249 22.3754 214.249 22.0302V22.0302ZM215.843 22.0301V20.2592H215.414V21.2867C215.279 21.1098 215.073 20.9988 214.793 20.9988C214.24 20.9988 213.808 21.4305 213.808 22.0301C213.808 22.6301 214.24 23.0613 214.793 23.0613C215.073 23.0613 215.279 22.9504 215.414 22.774V23.012H215.843V22.0301ZM205.094 21.3809C205.37 21.3809 205.547 21.5535 205.593 21.8576H204.571C204.616 21.5741 204.789 21.3809 205.094 21.3809V21.3809ZM205.103 20.9989C204.526 20.9989 204.122 21.4182 204.122 22.0302C204.122 22.6546 204.543 23.0614 205.132 23.0614C205.428 23.0614 205.7 22.9873 205.939 22.786L205.729 22.47C205.564 22.6015 205.354 22.6751 205.156 22.6751C204.88 22.6751 204.629 22.548 204.567 22.1946H206.03C206.034 22.1411 206.038 22.0875 206.038 22.0302C206.034 21.4182 205.655 20.9989 205.103 20.9989V20.9989ZM210.273 22.0302C210.273 21.685 210.5 21.4015 210.871 21.4015C211.225 21.4015 211.464 21.6726 211.464 22.0302C211.464 22.3878 211.225 22.6589 210.871 22.6589C210.5 22.6589 210.273 22.3754 210.273 22.0302V22.0302ZM211.867 22.0302V21.0481H211.439V21.2868C211.303 21.1098 211.097 20.9989 210.817 20.9989C210.265 20.9989 209.832 21.4306 209.832 22.0302C209.832 22.6302 210.265 23.0614 210.817 23.0614C211.097 23.0614 211.303 22.9505 211.439 22.7741V23.0121H211.867V22.0302ZM207.855 22.0302C207.855 22.6258 208.271 23.0614 208.905 23.0614C209.202 23.0614 209.4 22.9959 209.614 22.8271L209.408 22.482C209.247 22.5972 209.078 22.6589 208.893 22.6589C208.551 22.6546 208.3 22.4083 208.3 22.0302C208.3 21.6525 208.551 21.4058 208.893 21.4015C209.078 21.4015 209.247 21.4632 209.408 21.5784L209.614 21.2332C209.4 21.0649 209.202 20.9989 208.905 20.9989C208.271 20.9989 207.855 21.4345 207.855 22.0302V22.0302ZM213.375 20.9989C213.128 20.9989 212.968 21.1141 212.857 21.2868V21.0481H212.432V23.0121H212.86V21.9111C212.86 21.5865 213.001 21.4058 213.281 21.4058C213.367 21.4058 213.458 21.4182 213.549 21.455L213.68 21.0525C213.586 21.0157 213.462 20.9989 213.375 20.9989V20.9989ZM201.898 21.2045C201.692 21.0687 201.408 20.9989 201.094 20.9989C200.596 20.9989 200.275 21.2375 200.275 21.6276C200.275 21.9479 200.513 22.1454 200.954 22.2071L201.156 22.2358C201.391 22.2687 201.502 22.3299 201.502 22.4409C201.502 22.5929 201.346 22.6794 201.053 22.6794C200.757 22.6794 200.542 22.5848 200.398 22.4738L200.196 22.8066C200.431 22.9792 200.728 23.0614 201.049 23.0614C201.618 23.0614 201.947 22.7947 201.947 22.4208C201.947 22.0756 201.688 21.8949 201.259 21.8332L201.057 21.8041C200.872 21.7797 200.723 21.7428 200.723 21.6113C200.723 21.4675 200.863 21.3809 201.098 21.3809C201.35 21.3809 201.593 21.4756 201.712 21.5497L201.898 21.2045ZM207.422 20.9989C207.175 20.9989 207.014 21.1141 206.903 21.2868V21.0481H206.479V23.0121H206.907V21.9111C206.907 21.5865 207.047 21.4058 207.327 21.4058C207.414 21.4058 207.505 21.4182 207.595 21.455L207.727 21.0525C207.632 21.0157 207.509 20.9989 207.422 20.9989V20.9989ZM203.768 21.0481H203.067V20.4524H202.635V21.0481H202.235V21.4387H202.635V22.3342C202.635 22.7903 202.812 23.0614 203.319 23.0614C203.504 23.0614 203.718 23.004 203.854 22.9093L203.731 22.5436C203.603 22.6177 203.463 22.6546 203.352 22.6546C203.137 22.6546 203.067 22.523 203.067 22.326V21.4387H203.768V21.0481ZM197.365 23.0121V21.7796C197.365 21.3154 197.069 21.0032 196.591 20.9989C196.34 20.995 196.08 21.073 195.899 21.3483C195.763 21.1303 195.549 20.9989 195.248 20.9989C195.038 20.9989 194.832 21.0605 194.671 21.2905V21.0481H194.242V23.0121H194.675V21.9235C194.675 21.5821 194.865 21.4014 195.157 21.4014C195.441 21.4014 195.586 21.5865 195.586 21.9192V23.0121H196.018V21.9235C196.018 21.5821 196.216 21.4014 196.5 21.4014C196.793 21.4014 196.933 21.5865 196.933 21.9192V23.0121H197.365V23.0121Z\" fill=\"#0B0B09\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M201.755 17.7116H208.245V6.08154H201.755V17.7116Z\" fill=\"#E15D29\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M202.167 11.8966C202.167 9.53719 203.275 7.43599 205 6.08151C203.738 5.09089 202.147 4.5 200.416 4.5C196.32 4.5 193 7.81174 193 11.8966C193 15.9814 196.32 19.2931 200.416 19.2931C202.147 19.2931 203.738 18.7022 205 17.7116C203.275 16.3572 202.167 14.2559 202.167 11.8966\" fill=\"#D2232C\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M216.769 16.4796V16.1927H216.693L216.607 16.3902L216.521 16.1927H216.446V16.4796H216.498V16.263L216.579 16.4499H216.634L216.716 16.2625V16.4796H216.769ZM216.292 16.4796V16.2415H216.389V16.1932H216.143V16.2415H216.24V16.4796H216.292ZM217 11.8961C217 15.9814 213.68 19.2926 209.584 19.2926C207.853 19.2926 206.262 18.7017 205.001 17.7111C206.725 16.3572 207.833 14.2555 207.833 11.8961C207.833 9.53671 206.725 7.43551 205.001 6.08103C206.262 5.09091 207.853 4.50002 209.584 4.50002C213.68 4.50002 217 7.81126 217 11.8961V11.8961Z\" fill=\"#EC972D\"/></svg></span><span style=\"display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;height:18px;background:#fff;border-radius:4px;padding:0 6px\"><svg role=\"img\" aria-label=\"Apple Pay\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"331 9 25 11\" width=\"27.3\" height=\"12\"><path d=\"M336.873 11.2965C337.102 11.0072 337.258 10.6237 337.217 10.2268C336.837 10.2643 336.486 10.4457 336.236 10.7336C335.986 11.0214 335.857 11.3939 335.874 11.7742C336.252 11.8011 336.63 11.5724 336.873 11.3032V11.2965ZM337.217 11.8415C336.664 11.8078 336.191 12.151 335.935 12.151C335.665 12.151 335.26 11.8617 334.828 11.8684C334.261 11.8684 333.735 12.1913 333.445 12.7026C332.851 13.7253 333.29 15.2323 333.863 16.0666C334.147 16.4702 334.484 16.921 334.93 16.9076C335.348 16.8941 335.51 16.6384 336.023 16.6384C336.529 16.6384 336.677 16.9076 337.123 16.9008C337.588 16.8941 337.872 16.4904 338.155 16.08C338.472 15.6091 338.607 15.1583 338.614 15.1381C338.607 15.1247 337.723 14.7883 337.717 13.7791C337.71 12.9314 338.412 12.5344 338.439 12.5008C338.299 12.3054 338.116 12.1443 337.904 12.0301C337.693 11.9158 337.458 11.8513 337.217 11.8415ZM342.015 10.6977C342.285 10.6833 342.556 10.7256 342.809 10.8217C343.061 10.9179 343.291 11.0658 343.483 11.256C343.675 11.4462 343.825 11.6744 343.923 11.9259C344.022 12.1773 344.066 12.4465 344.053 12.7161C344.053 13.9271 343.196 14.7546 341.988 14.7546H340.659V16.8537H339.7V10.6977H342.015ZM340.665 13.9473H341.759C342.595 13.9473 343.068 13.5033 343.068 12.7228C343.068 11.9491 342.595 11.5051 341.765 11.5051H340.659V13.9473H340.665ZM344.303 15.5822C344.303 14.795 344.91 14.3106 345.976 14.2501L347.211 14.1828V13.8329C347.211 13.3351 346.874 13.039 346.307 13.039C345.767 13.039 345.43 13.2947 345.355 13.6916H344.478C344.532 12.8843 345.22 12.2855 346.341 12.2855C347.434 12.2855 348.129 12.8641 348.129 13.7656V16.8605H347.245V16.1204H347.218C347.076 16.3689 346.869 16.5749 346.62 16.7169C346.371 16.8589 346.088 16.9317 345.801 16.9277C344.924 16.9277 344.303 16.3895 344.303 15.5822ZM347.204 15.1785V14.8219L346.098 14.8892C345.544 14.9296 345.234 15.1718 345.234 15.5553C345.234 15.9455 345.558 16.2011 346.057 16.2011C346.705 16.2011 347.204 15.7571 347.204 15.1785ZM348.966 18.5088V17.762C349.033 17.7822 349.188 17.7822 349.263 17.7822C349.694 17.7822 349.924 17.6005 350.066 17.1363L350.147 16.8672L348.52 12.3663H349.519L350.666 16.0195H350.68L351.82 12.3663H352.792L351.105 17.0892C350.72 18.1791 350.275 18.529 349.344 18.529C349.217 18.5289 349.091 18.5222 348.966 18.5088Z\" fill=\"black\"/></svg></span><span style=\"display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;height:18px;background:#fff;border-radius:4px;padding:0 6px\"><svg role=\"img\" aria-label=\"Google Pay\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"286 9.5 22 10\" width=\"26.4\" height=\"12\"><path d=\"M296.311 14.6744V17.1952H295.545V10.9702H297.576C298.091 10.9702 298.529 11.1494 298.888 11.5077C299.255 11.8661 299.439 12.3036 299.439 12.8202C299.439 13.3494 299.255 13.7869 298.888 14.1411C298.533 14.4952 298.095 14.6702 297.576 14.6702H296.311V14.6744ZM296.311 11.7369V13.9077H297.592C297.895 13.9077 298.15 13.7994 298.35 13.5869C298.553 13.3744 298.657 13.1161 298.657 12.8244C298.657 12.5369 298.553 12.2827 298.35 12.0702C298.15 11.8494 297.899 11.7411 297.592 11.7411H296.311V11.7369Z\" fill=\"#3C4043\"/><path d=\"M301.443 12.7954C302.009 12.7954 302.456 12.9537 302.783 13.2704C303.11 13.587 303.274 14.0204 303.274 14.5704V17.1954H302.544V16.6037H302.512C302.197 17.0912 301.774 17.3329 301.247 17.3329C300.796 17.3329 300.421 17.1954 300.118 16.9162C299.815 16.637 299.663 16.2912 299.663 15.8745C299.663 15.4329 299.823 15.0829 300.142 14.8245C300.461 14.562 300.888 14.4329 301.419 14.4329C301.874 14.4329 302.249 14.5204 302.54 14.6954V14.512C302.54 14.2329 302.436 13.9995 302.225 13.8037C302.013 13.6079 301.766 13.512 301.483 13.512C301.056 13.512 300.717 13.6995 300.469 14.0787L299.795 13.637C300.166 13.0745 300.717 12.7954 301.443 12.7954ZM300.453 15.887C300.453 16.0954 300.537 16.2704 300.709 16.4079C300.876 16.5454 301.076 16.6162 301.303 16.6162C301.626 16.6162 301.913 16.4912 302.165 16.2412C302.416 15.9912 302.544 15.6995 302.544 15.362C302.304 15.1662 301.973 15.0662 301.546 15.0662C301.235 15.0662 300.976 15.1454 300.769 15.2995C300.557 15.462 300.453 15.6579 300.453 15.887Z\" fill=\"#3C4043\"/><path d=\"M307.438 12.9322L304.885 19.0655H304.095L305.044 16.9197L303.361 12.9322H304.194L305.407 15.9905H305.423L306.604 12.9322H307.438Z\" fill=\"#3C4043\"/><path d=\"M293.263 14.1663C293.263 13.9054 293.241 13.6559 293.199 13.4159H289.989V14.7909L291.838 14.7913C291.763 15.2488 291.522 15.6388 291.152 15.8988V16.7909H292.252C292.895 16.1696 293.263 15.2513 293.263 14.1663Z\" fill=\"#4285F4\"/><path d=\"M291.145 15.8992C290.839 16.115 290.444 16.2413 289.983 16.2413C289.091 16.2413 288.335 15.6138 288.064 14.768H286.928V15.688C287.491 16.8538 288.647 17.6538 289.983 17.6538C290.906 17.6538 291.681 17.3367 292.246 16.7909L291.145 15.8992Z\" fill=\"#34A853\"/><path d=\"M287.962 14.085C287.962 13.8475 288 13.618 288.069 13.4021V12.4821H286.934C286.701 12.9642 286.57 13.5084 286.57 14.085C286.57 14.6617 286.702 15.2059 286.934 15.688L288.069 14.768C288 14.5521 287.962 14.3225 287.962 14.085Z\" fill=\"#FABB05\"/><path d=\"M289.983 11.9297C290.486 11.9297 290.938 12.1109 291.294 12.4651L292.269 11.4472C291.677 10.8709 290.905 10.5172 289.983 10.5172C288.647 10.5172 287.491 11.3172 286.928 12.483L288.064 13.403C288.335 12.5572 289.091 11.9297 289.983 11.9297Z\" fill=\"#E94235\"/></svg></span></span></span><span aria-hidden=\"true\" style=\"color: #6B6B6B\">•</span></span><span style=\"display: inline-flex; align-items: center; gap: 40px; padding-right: 40px; white-space: nowrap\"><span style=\"display: inline-flex; align-items: center; gap: 8px\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#EF4036\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 12V4h8l10 10-8 8z\"></path><circle cx=\"7.5\" cy=\"8.5\" r=\"1.4\"></circle></svg><span style=\"color: #EF4036\">BLACK FRIDAY AQUECIMENTO · Os membros BAZARclub compram mais cedo esta Black Friday</span></span><span aria-hidden=\"true\" style=\"color: #6B6B6B\">•</span></span><span style=\"display: inline-flex; align-items: center; gap: 40px; padding-right: 40px; white-space: nowrap\"><span style=\"display: inline-flex; align-items: center; gap: 8px\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M2 6h12v10H2zM14 10h4l3 3v3h-7\"></path><circle cx=\"6\" cy=\"18\" r=\"1.8\"></circle><circle cx=\"17\" cy=\"18\" r=\"1.8\"></circle></svg>ENVIO GRÁTIS ACIMA DE 69,90€ · ENTREGA EM 1 A 3 DIAS ÚTEIS</span><span aria-hidden=\"true\" style=\"color: #6B6B6B\">•</span></span><span style=\"display: inline-flex; align-items: center; gap: 40px; padding-right: 40px; white-space: nowrap\"><span style=\"display: inline-flex; align-items: center; gap: 8px\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 9h11a5 5 0 0 1 0 10H8\"></path><path d=\"M8 5L4 9l4 4\"></path></svg>TROCAS BLACK FRIDAY ALARGADAS ATÉ 4 DE JANEIRO. VER CONDIÇÕES*</span><span aria-hidden=\"true\" style=\"color: #6B6B6B\">•</span></span><span style=\"display: inline-flex; align-items: center; gap: 40px; padding-right: 40px; white-space: nowrap\"><span style=\"display: inline-flex; align-items: center; gap: 8px\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 10v10h16V10\"></path><path d=\"M3 10l2-6h14l2 6z\"></path><path d=\"M10 20v-5h4v5\"></path></svg>LEVANTAMENTO GRATUITO EM LOJA</span><span aria-hidden=\"true\" style=\"color: #6B6B6B\">•</span></span><span style=\"display: inline-flex; align-items: center; gap: 40px; padding-right: 40px; white-space: nowrap\"><span style=\"display: inline-flex; align-items: center; gap: 8px\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"2.5\" y=\"5\" width=\"19\" height=\"14\" rx=\"2\"></rect><path d=\"M2.5 10h19M6 15h4\"></path></svg><span style=\"display: inline-flex; align-items: center; gap: 6px\">PAGAMENTOS EM PRESTAÇÕES COM<img src=\"./assets/4b14242983f2fd1d1be93f3ea553e672.png\" alt=\"Klarna\" style=\"height: 18px; display: block\"><span style=\"display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;height:18px;padding:0 6px;background:#00C2A3;border-radius:4px\"><img src=\"https://live.sequracdn.com/assets/images/logos/logo_white.svg\" alt=\"SeQura\" style=\"height:10px;width:auto;display:block\"></span></span></span><span aria-hidden=\"true\" style=\"color: #6B6B6B\">•</span></span><span style=\"display: inline-flex; align-items: center; gap: 40px; padding-right: 40px; white-space: nowrap\"><span style=\"display: inline-flex; align-items: center; gap: 8px\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"5\" y=\"11\" width=\"14\" height=\"10\" rx=\"2\"></rect><path d=\"M8 11V7a4 4 0 0 1 8 0v4\"></path></svg><span style=\"display: inline-flex; align-items: center; gap: 6px\">PAGAMENTOS SEGUROS:<span style=\"display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; height: 18px; background: #FFFFFF; border-radius: 4px; padding: 0 6px\"><img src=\"./assets/3d4b1fd25f95056265f009b9eb76bdcc.png\" alt=\"MB WAY\" style=\"height: 13px; display: block\"></span><span style=\"display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; height: 18px; background: #FFFFFF; border-radius: 4px; padding: 0 6px\"><img src=\"./assets/f2f7fb52b9cc797862f6ef2553ca9538.png\" alt=\"Multibanco\" style=\"height: 11px; display: block\"></span><span style=\"display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; height: 18px; background: #FFFFFF; border-radius: 4px; padding: 0 6px\"><img src=\"./assets/44b74a0c9f480d3bef17d84790eb9edf.png\" alt=\"Visa\" style=\"height: 8px; display: block\"></span><span style=\"display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; height: 18px; background: #FFFFFF; border-radius: 4px; padding: 0 6px\"><img src=\"./assets/27fd35683d78d84fcdfaf8210f4c3d90.png\" alt=\"PayPal\" style=\"height: 12px; display: block\"></span><span style=\"display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;height:18px;background:#fff;border-radius:4px;padding:0 6px\"><svg role=\"img\" aria-label=\"Mastercard\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"190 2 30 24\" width=\"17.5\" height=\"14\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M216.523 22.8653V22.9136H216.568C216.578 22.9136 216.586 22.9117 216.592 22.9079C216.599 22.9036 216.601 22.8974 216.601 22.8892C216.601 22.8811 216.599 22.8754 216.592 22.8711C216.586 22.8673 216.578 22.8653 216.568 22.8653H216.523ZM216.569 22.8314C216.592 22.8314 216.61 22.8367 216.623 22.8467C216.636 22.8573 216.642 22.8716 216.642 22.8893C216.642 22.9041 216.637 22.9165 216.627 22.9266C216.617 22.9361 216.602 22.9419 216.584 22.9443L216.643 23.0126H216.597L216.542 22.9447H216.524V23.0126H216.485V22.8314H216.569ZM216.557 23.0748C216.578 23.0748 216.598 23.0709 216.616 23.0628C216.634 23.0552 216.65 23.0441 216.664 23.0303C216.678 23.0165 216.688 23.0006 216.697 22.982C216.704 22.9634 216.708 22.9438 216.708 22.9228C216.708 22.9017 216.704 22.8821 216.697 22.8634C216.688 22.8448 216.678 22.829 216.664 22.8152C216.65 22.8013 216.634 22.7908 216.616 22.7827C216.598 22.775 216.578 22.7712 216.557 22.7712C216.536 22.7712 216.515 22.775 216.497 22.7827C216.478 22.7908 216.462 22.8013 216.448 22.8152C216.434 22.829 216.424 22.8448 216.416 22.8634C216.408 22.8821 216.404 22.9017 216.404 22.9228C216.404 22.9438 216.408 22.9634 216.416 22.982C216.424 23.0006 216.434 23.0165 216.448 23.0303C216.462 23.0441 216.478 23.0552 216.497 23.0628C216.515 23.0709 216.536 23.0748 216.557 23.0748V23.0748ZM216.557 22.7277C216.585 22.7277 216.611 22.7325 216.635 22.743C216.659 22.7531 216.68 22.7669 216.698 22.7846C216.716 22.8023 216.73 22.8233 216.741 22.8467C216.751 22.8706 216.756 22.896 216.756 22.9228C216.756 22.9495 216.751 22.9749 216.741 22.9983C216.73 23.0222 216.716 23.0428 216.698 23.0605C216.68 23.0781 216.659 23.092 216.635 23.1025C216.611 23.1131 216.585 23.1178 216.557 23.1178C216.529 23.1178 216.503 23.1131 216.478 23.1025C216.454 23.092 216.433 23.0781 216.415 23.0605C216.397 23.0428 216.383 23.0222 216.372 22.9983C216.362 22.9749 216.357 22.9495 216.357 22.9228C216.357 22.896 216.362 22.8706 216.372 22.8467C216.383 22.8233 216.397 22.8023 216.415 22.7846C216.433 22.7669 216.454 22.7531 216.478 22.743C216.503 22.7325 216.529 22.7277 216.557 22.7277V22.7277ZM198.186 22.0302C198.186 21.685 198.412 21.4015 198.783 21.4015C199.138 21.4015 199.376 21.6726 199.376 22.0302C199.376 22.3878 199.138 22.6589 198.783 22.6589C198.412 22.6589 198.186 22.3754 198.186 22.0302V22.0302ZM199.78 22.0302V21.0481H199.352V21.2868C199.216 21.1098 199.01 20.9989 198.73 20.9989C198.177 20.9989 197.745 21.4306 197.745 22.0302C197.745 22.6302 198.177 23.0614 198.73 23.0614C199.01 23.0614 199.216 22.9505 199.352 22.7741V23.0121H199.78V22.0302ZM214.249 22.0302C214.249 21.685 214.475 21.4015 214.846 21.4015C215.2 21.4015 215.439 21.6726 215.439 22.0302C215.439 22.3878 215.2 22.6589 214.846 22.6589C214.475 22.6589 214.249 22.3754 214.249 22.0302V22.0302ZM215.843 22.0301V20.2592H215.414V21.2867C215.279 21.1098 215.073 20.9988 214.793 20.9988C214.24 20.9988 213.808 21.4305 213.808 22.0301C213.808 22.6301 214.24 23.0613 214.793 23.0613C215.073 23.0613 215.279 22.9504 215.414 22.774V23.012H215.843V22.0301ZM205.094 21.3809C205.37 21.3809 205.547 21.5535 205.593 21.8576H204.571C204.616 21.5741 204.789 21.3809 205.094 21.3809V21.3809ZM205.103 20.9989C204.526 20.9989 204.122 21.4182 204.122 22.0302C204.122 22.6546 204.543 23.0614 205.132 23.0614C205.428 23.0614 205.7 22.9873 205.939 22.786L205.729 22.47C205.564 22.6015 205.354 22.6751 205.156 22.6751C204.88 22.6751 204.629 22.548 204.567 22.1946H206.03C206.034 22.1411 206.038 22.0875 206.038 22.0302C206.034 21.4182 205.655 20.9989 205.103 20.9989V20.9989ZM210.273 22.0302C210.273 21.685 210.5 21.4015 210.871 21.4015C211.225 21.4015 211.464 21.6726 211.464 22.0302C211.464 22.3878 211.225 22.6589 210.871 22.6589C210.5 22.6589 210.273 22.3754 210.273 22.0302V22.0302ZM211.867 22.0302V21.0481H211.439V21.2868C211.303 21.1098 211.097 20.9989 210.817 20.9989C210.265 20.9989 209.832 21.4306 209.832 22.0302C209.832 22.6302 210.265 23.0614 210.817 23.0614C211.097 23.0614 211.303 22.9505 211.439 22.7741V23.0121H211.867V22.0302ZM207.855 22.0302C207.855 22.6258 208.271 23.0614 208.905 23.0614C209.202 23.0614 209.4 22.9959 209.614 22.8271L209.408 22.482C209.247 22.5972 209.078 22.6589 208.893 22.6589C208.551 22.6546 208.3 22.4083 208.3 22.0302C208.3 21.6525 208.551 21.4058 208.893 21.4015C209.078 21.4015 209.247 21.4632 209.408 21.5784L209.614 21.2332C209.4 21.0649 209.202 20.9989 208.905 20.9989C208.271 20.9989 207.855 21.4345 207.855 22.0302V22.0302ZM213.375 20.9989C213.128 20.9989 212.968 21.1141 212.857 21.2868V21.0481H212.432V23.0121H212.86V21.9111C212.86 21.5865 213.001 21.4058 213.281 21.4058C213.367 21.4058 213.458 21.4182 213.549 21.455L213.68 21.0525C213.586 21.0157 213.462 20.9989 213.375 20.9989V20.9989ZM201.898 21.2045C201.692 21.0687 201.408 20.9989 201.094 20.9989C200.596 20.9989 200.275 21.2375 200.275 21.6276C200.275 21.9479 200.513 22.1454 200.954 22.2071L201.156 22.2358C201.391 22.2687 201.502 22.3299 201.502 22.4409C201.502 22.5929 201.346 22.6794 201.053 22.6794C200.757 22.6794 200.542 22.5848 200.398 22.4738L200.196 22.8066C200.431 22.9792 200.728 23.0614 201.049 23.0614C201.618 23.0614 201.947 22.7947 201.947 22.4208C201.947 22.0756 201.688 21.8949 201.259 21.8332L201.057 21.8041C200.872 21.7797 200.723 21.7428 200.723 21.6113C200.723 21.4675 200.863 21.3809 201.098 21.3809C201.35 21.3809 201.593 21.4756 201.712 21.5497L201.898 21.2045ZM207.422 20.9989C207.175 20.9989 207.014 21.1141 206.903 21.2868V21.0481H206.479V23.0121H206.907V21.9111C206.907 21.5865 207.047 21.4058 207.327 21.4058C207.414 21.4058 207.505 21.4182 207.595 21.455L207.727 21.0525C207.632 21.0157 207.509 20.9989 207.422 20.9989V20.9989ZM203.768 21.0481H203.067V20.4524H202.635V21.0481H202.235V21.4387H202.635V22.3342C202.635 22.7903 202.812 23.0614 203.319 23.0614C203.504 23.0614 203.718 23.004 203.854 22.9093L203.731 22.5436C203.603 22.6177 203.463 22.6546 203.352 22.6546C203.137 22.6546 203.067 22.523 203.067 22.326V21.4387H203.768V21.0481ZM197.365 23.0121V21.7796C197.365 21.3154 197.069 21.0032 196.591 20.9989C196.34 20.995 196.08 21.073 195.899 21.3483C195.763 21.1303 195.549 20.9989 195.248 20.9989C195.038 20.9989 194.832 21.0605 194.671 21.2905V21.0481H194.242V23.0121H194.675V21.9235C194.675 21.5821 194.865 21.4014 195.157 21.4014C195.441 21.4014 195.586 21.5865 195.586 21.9192V23.0121H196.018V21.9235C196.018 21.5821 196.216 21.4014 196.5 21.4014C196.793 21.4014 196.933 21.5865 196.933 21.9192V23.0121H197.365V23.0121Z\" fill=\"#0B0B09\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M201.755 17.7116H208.245V6.08154H201.755V17.7116Z\" fill=\"#E15D29\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M202.167 11.8966C202.167 9.53719 203.275 7.43599 205 6.08151C203.738 5.09089 202.147 4.5 200.416 4.5C196.32 4.5 193 7.81174 193 11.8966C193 15.9814 196.32 19.2931 200.416 19.2931C202.147 19.2931 203.738 18.7022 205 17.7116C203.275 16.3572 202.167 14.2559 202.167 11.8966\" fill=\"#D2232C\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M216.769 16.4796V16.1927H216.693L216.607 16.3902L216.521 16.1927H216.446V16.4796H216.498V16.263L216.579 16.4499H216.634L216.716 16.2625V16.4796H216.769ZM216.292 16.4796V16.2415H216.389V16.1932H216.143V16.2415H216.24V16.4796H216.292ZM217 11.8961C217 15.9814 213.68 19.2926 209.584 19.2926C207.853 19.2926 206.262 18.7017 205.001 17.7111C206.725 16.3572 207.833 14.2555 207.833 11.8961C207.833 9.53671 206.725 7.43551 205.001 6.08103C206.262 5.09091 207.853 4.50002 209.584 4.50002C213.68 4.50002 217 7.81126 217 11.8961V11.8961Z\" fill=\"#EC972D\"/></svg></span><span style=\"display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;height:18px;background:#fff;border-radius:4px;padding:0 6px\"><svg role=\"img\" aria-label=\"Apple Pay\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"331 9 25 11\" width=\"27.3\" height=\"12\"><path d=\"M336.873 11.2965C337.102 11.0072 337.258 10.6237 337.217 10.2268C336.837 10.2643 336.486 10.4457 336.236 10.7336C335.986 11.0214 335.857 11.3939 335.874 11.7742C336.252 11.8011 336.63 11.5724 336.873 11.3032V11.2965ZM337.217 11.8415C336.664 11.8078 336.191 12.151 335.935 12.151C335.665 12.151 335.26 11.8617 334.828 11.8684C334.261 11.8684 333.735 12.1913 333.445 12.7026C332.851 13.7253 333.29 15.2323 333.863 16.0666C334.147 16.4702 334.484 16.921 334.93 16.9076C335.348 16.8941 335.51 16.6384 336.023 16.6384C336.529 16.6384 336.677 16.9076 337.123 16.9008C337.588 16.8941 337.872 16.4904 338.155 16.08C338.472 15.6091 338.607 15.1583 338.614 15.1381C338.607 15.1247 337.723 14.7883 337.717 13.7791C337.71 12.9314 338.412 12.5344 338.439 12.5008C338.299 12.3054 338.116 12.1443 337.904 12.0301C337.693 11.9158 337.458 11.8513 337.217 11.8415ZM342.015 10.6977C342.285 10.6833 342.556 10.7256 342.809 10.8217C343.061 10.9179 343.291 11.0658 343.483 11.256C343.675 11.4462 343.825 11.6744 343.923 11.9259C344.022 12.1773 344.066 12.4465 344.053 12.7161C344.053 13.9271 343.196 14.7546 341.988 14.7546H340.659V16.8537H339.7V10.6977H342.015ZM340.665 13.9473H341.759C342.595 13.9473 343.068 13.5033 343.068 12.7228C343.068 11.9491 342.595 11.5051 341.765 11.5051H340.659V13.9473H340.665ZM344.303 15.5822C344.303 14.795 344.91 14.3106 345.976 14.2501L347.211 14.1828V13.8329C347.211 13.3351 346.874 13.039 346.307 13.039C345.767 13.039 345.43 13.2947 345.355 13.6916H344.478C344.532 12.8843 345.22 12.2855 346.341 12.2855C347.434 12.2855 348.129 12.8641 348.129 13.7656V16.8605H347.245V16.1204H347.218C347.076 16.3689 346.869 16.5749 346.62 16.7169C346.371 16.8589 346.088 16.9317 345.801 16.9277C344.924 16.9277 344.303 16.3895 344.303 15.5822ZM347.204 15.1785V14.8219L346.098 14.8892C345.544 14.9296 345.234 15.1718 345.234 15.5553C345.234 15.9455 345.558 16.2011 346.057 16.2011C346.705 16.2011 347.204 15.7571 347.204 15.1785ZM348.966 18.5088V17.762C349.033 17.7822 349.188 17.7822 349.263 17.7822C349.694 17.7822 349.924 17.6005 350.066 17.1363L350.147 16.8672L348.52 12.3663H349.519L350.666 16.0195H350.68L351.82 12.3663H352.792L351.105 17.0892C350.72 18.1791 350.275 18.529 349.344 18.529C349.217 18.5289 349.091 18.5222 348.966 18.5088Z\" fill=\"black\"/></svg></span><span style=\"display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;height:18px;background:#fff;border-radius:4px;padding:0 6px\"><svg role=\"img\" aria-label=\"Google Pay\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"286 9.5 22 10\" width=\"26.4\" height=\"12\"><path d=\"M296.311 14.6744V17.1952H295.545V10.9702H297.576C298.091 10.9702 298.529 11.1494 298.888 11.5077C299.255 11.8661 299.439 12.3036 299.439 12.8202C299.439 13.3494 299.255 13.7869 298.888 14.1411C298.533 14.4952 298.095 14.6702 297.576 14.6702H296.311V14.6744ZM296.311 11.7369V13.9077H297.592C297.895 13.9077 298.15 13.7994 298.35 13.5869C298.553 13.3744 298.657 13.1161 298.657 12.8244C298.657 12.5369 298.553 12.2827 298.35 12.0702C298.15 11.8494 297.899 11.7411 297.592 11.7411H296.311V11.7369Z\" fill=\"#3C4043\"/><path d=\"M301.443 12.7954C302.009 12.7954 302.456 12.9537 302.783 13.2704C303.11 13.587 303.274 14.0204 303.274 14.5704V17.1954H302.544V16.6037H302.512C302.197 17.0912 301.774 17.3329 301.247 17.3329C300.796 17.3329 300.421 17.1954 300.118 16.9162C299.815 16.637 299.663 16.2912 299.663 15.8745C299.663 15.4329 299.823 15.0829 300.142 14.8245C300.461 14.562 300.888 14.4329 301.419 14.4329C301.874 14.4329 302.249 14.5204 302.54 14.6954V14.512C302.54 14.2329 302.436 13.9995 302.225 13.8037C302.013 13.6079 301.766 13.512 301.483 13.512C301.056 13.512 300.717 13.6995 300.469 14.0787L299.795 13.637C300.166 13.0745 300.717 12.7954 301.443 12.7954ZM300.453 15.887C300.453 16.0954 300.537 16.2704 300.709 16.4079C300.876 16.5454 301.076 16.6162 301.303 16.6162C301.626 16.6162 301.913 16.4912 302.165 16.2412C302.416 15.9912 302.544 15.6995 302.544 15.362C302.304 15.1662 301.973 15.0662 301.546 15.0662C301.235 15.0662 300.976 15.1454 300.769 15.2995C300.557 15.462 300.453 15.6579 300.453 15.887Z\" fill=\"#3C4043\"/><path d=\"M307.438 12.9322L304.885 19.0655H304.095L305.044 16.9197L303.361 12.9322H304.194L305.407 15.9905H305.423L306.604 12.9322H307.438Z\" fill=\"#3C4043\"/><path d=\"M293.263 14.1663C293.263 13.9054 293.241 13.6559 293.199 13.4159H289.989V14.7909L291.838 14.7913C291.763 15.2488 291.522 15.6388 291.152 15.8988V16.7909H292.252C292.895 16.1696 293.263 15.2513 293.263 14.1663Z\" fill=\"#4285F4\"/><path d=\"M291.145 15.8992C290.839 16.115 290.444 16.2413 289.983 16.2413C289.091 16.2413 288.335 15.6138 288.064 14.768H286.928V15.688C287.491 16.8538 288.647 17.6538 289.983 17.6538C290.906 17.6538 291.681 17.3367 292.246 16.7909L291.145 15.8992Z\" fill=\"#34A853\"/><path d=\"M287.962 14.085C287.962 13.8475 288 13.618 288.069 13.4021V12.4821H286.934C286.701 12.9642 286.57 13.5084 286.57 14.085C286.57 14.6617 286.702 15.2059 286.934 15.688L288.069 14.768C288 14.5521 287.962 14.3225 287.962 14.085Z\" fill=\"#FABB05\"/><path d=\"M289.983 11.9297C290.486 11.9297 290.938 12.1109 291.294 12.4651L292.269 11.4472C291.677 10.8709 290.905 10.5172 289.983 10.5172C288.647 10.5172 287.491 11.3172 286.928 12.483L288.064 13.403C288.335 12.5572 289.091 11.9297 289.983 11.9297Z\" fill=\"#E94235\"/></svg></span></span></span><span aria-hidden=\"true\" style=\"color: #6B6B6B\">•</span></span></div>";
  function mountAnnouncement() {
    if (!config.announcement || document.querySelector('[data-bazarclub-announcement]')) return;
    const nativeBar=document.querySelector('#inline-notification-bar');
    // A Redicom já filtra estes textos pelo destino; não inferir ilhas pelo idioma.
    const shippingText=nativeBar ? [...nativeBar.querySelectorAll('.bar-wrapper')].map(el=>el.textContent.trim()).find(text=>/^(envio gr[áa]tis|env[ií]o gratis|free shipping)/i.test(text)) : null;
    const bar = document.createElement('div');
    bar.className = 'bc-announcement';
    bar.setAttribute('data-bazarclub-announcement', '');
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Informações: envios, trocas e pagamentos');
    bar.innerHTML = ANNOUNCEMENT_MARKUP;
    i18n?.localize(bar,tr);
    bar.querySelectorAll('img').forEach(img => {
      if(!img.getAttribute('src').startsWith('./assets/'))return;
      const name=img.getAttribute('src').split('/').pop();
      img.src = config.assetData?.[name] || new URL(name, assetBase).href;
    });
    const track = bar.firstElementChild;
    track.className = 'bc-announcement-track';
    const terms=document.querySelector('footer a[href*="_663.html"]');
    [2,8].forEach(index=>{
      const original=track.children[index].firstElementChild;
      const link=document.createElement('a');
      link.href=config.termsUrl || terms?.href || 'https://www.bzronline.com/pt/ajuda-e-condicoes/campanhas_663.html';
      link.style.cssText='display:inline-flex;align-items:center;gap:8px;color:inherit;text-decoration:none';
      link.innerHTML=original.innerHTML;
      if(index>=6)link.tabIndex=-1;
      original.replaceWith(link);
    });
    if(config.useNativeShipping) {
      const shipping=tr(shippingText || 'Consulta as condições de envio para o teu destino.');
      [1,7].forEach(index=>{track.children[index].firstElementChild.lastChild.textContent=shipping.toUpperCase();});
    }
    [...track.children].forEach((item, index) => {
      if (index >= 6) item.setAttribute('aria-hidden', 'true');
      if (index % 6 !== 0) return;
      const original = item.firstElementChild;
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('data-bazarclub-open', 'side');
      button.setAttribute('aria-haspopup', 'dialog');
      if (index >= 6) button.tabIndex = -1;
      button.innerHTML = original.innerHTML;
      if (config.announcementText) button.lastElementChild.textContent = config.announcementText;
      original.replaceWith(button);
    });
    // O seletor permite integrar a mensagem na barra existente da loja.
    const target = config.announcementTarget ? document.querySelector(config.announcementTarget) : document.body;
    if (target) {
      if(config.announcementReplace) target.replaceChildren(bar); else target.prepend(bar);
      if(target.id==='header') {
        if(config.hideNativeAnnouncement && nativeBar)nativeBar.classList.add('bc-native-notification-hidden');
        const main=document.querySelector('#main');
        if(main) {
          // O submenu absoluto da Redicom fica fora da altura do cabeçalho.
          const alignMain=()=>{
            const margin=Math.max(0,headerHeight(target)-(parseFloat(getComputedStyle(main).paddingTop)||0))+'px';
            if(main.style.getPropertyValue('margin-top')!==margin || main.style.getPropertyPriority('margin-top')!=='important')main.style.setProperty('margin-top',margin,'important');
          };
          let alignmentFrame=0;
          const scheduleAlignment=()=>{
            if(alignmentFrame)return;
            alignmentFrame=requestAnimationFrame(()=>{alignmentFrame=0;alignMain();});
          };
          alignMain();
          const headerObserver=new ResizeObserver(scheduleAlignment);
          headerObserver.observe(target);
          headerObserver.observe(main,{box:'border-box'});
          target.querySelectorAll('nav.menu > ul > li > .submenu').forEach(menu=>headerObserver.observe(menu));
          // A Redicom pode alterar classes, margens e padding depois de montar a barra.
          const layoutObserver=new MutationObserver(scheduleAlignment);
          layoutObserver.observe(main,{attributes:true,attributeFilter:['class','style']});
          layoutObserver.observe(document.body,{attributes:true,attributeFilter:['class','style']});
          layoutObserver.observe(target,{attributes:true,attributeFilter:['class','style'],childList:true,subtree:true});
          window.addEventListener('load',scheduleAlignment,{once:true});
          window.addEventListener('pageshow',scheduleAlignment);
          window.addEventListener('resize',scheduleAlignment,{passive:true});
        }
        document.documentElement.classList.add('bc-top-announcement');
      }
      window.dispatchEvent(new CustomEvent('bazarclub:announcement-ready'));
    }
    else console.warn('[BAZARclub] Local da barra não encontrado.');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountAnnouncement, {once:true});
  else mountAnnouncement();
  window.dispatchEvent(new CustomEvent('bazarclub:ready'));
})();

(function () {
  'use strict';
  const modes={'#abrir-bf-lateral':'side','#abrir-bf-popup':'popup'};
  const shownKey='bazarclub-last-shown-2026', recognitionKey='bazarclub-recognition-2026';
  const start=Date.parse('2026-11-01T00:00:00Z'), end=Date.parse('2026-12-01T00:00:00Z');
  const interval=3*24*60*60*1000;
  function due(now,lastShown){return now>=start && now<end && (!lastShown || now-lastShown>=interval);}
  function install(w) {
    if(w.BazarClubBehaviourInstalled)return;
    w.BazarClubBehaviourInstalled=true;
    let api, timer, manual=false, eligible=true;
    const config=w.BazarClubFormConfig || {};
    const test=config.autoPopupTest===true;
    const frequencyKey=test ? 'bazarclub-demo-last-shown-2026' : shownKey;
    // Uma identidade em verificação só permite convite após resposta explícita de não membro.
    if(!config.preview && config.userId && !/[{}]/.test(String(config.userId)))eligible=false;
    try {if(!config.preview && JSON.parse(w.localStorage.getItem(recognitionKey))?.expiresAt>w.Date.now())eligible=false;} catch {}
    function remember(){try{w.localStorage.setItem(frequencyKey,String(w.Date.now()));return true;}catch{return false;}}
    function schedule(){
      w.clearTimeout(timer);
      if(!api || manual || !eligible || (config.preview && !test) || config.autoPopup===false)return;
      let last;try{last=Number(w.localStorage.getItem(frequencyKey));}catch{return;}
      if(!test && !due(w.Date.now(),last))return;
      timer=w.setTimeout(()=>{
        if(w.document.visibilityState==='hidden'){schedule();return;}
        if(!manual && eligible && remember())api.open('popup');
      },5000);
    }
    w.addEventListener('bazarclub:membership',e=>{eligible=e.detail?.subscribed===false;schedule();});
    function hashOpen(){const mode=modes[w.location.hash];if(mode && api)api.open(mode);}
    function ready(){
      if(api || !w.BazarClubForm)return;
      api=w.BazarClubForm;
      const open=api.open.bind(api);
      api.open=function(mode){manual=true;w.clearTimeout(timer);remember();return open(mode);};
      hashOpen();schedule();
    }
    w.addEventListener('hashchange',hashOpen);
    w.addEventListener('bazarclub:closed',()=>{
      if(modes[w.location.hash])w.history.replaceState(w.history.state,'',w.location.pathname+w.location.search);
    });
    w.document.addEventListener('click',e=>{
      if(e.defaultPrevented || e.button!==0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey)return;
      const link=e.target.closest?.('a[href]');if(!link || link.hasAttribute('download') || (link.target && link.target!=='_self'))return;
      const url=new URL(link.href,w.location.href);
      if(url.origin===w.location.origin && url.pathname===w.location.pathname && url.search===w.location.search && modes[url.hash] && api){
        e.preventDefault();
        if(w.location.hash!==url.hash)w.history.pushState(null,'',url.hash);
        api.open(modes[url.hash]);
      }
    });
    w.addEventListener('bazarclub:ready',ready);
    ready();
  }
  if(typeof module!=='undefined' && module.exports)module.exports={due,install};
  if(typeof window!=='undefined')install(window);
})();

(function(){
  const main=document.querySelector('.ec_shopping_bag');
  const productList=main.querySelector('.wrapper-shoppingbag-product-list');
  const header=main.querySelector('#wp-header');
  if(!header || !productList)return;
  const root='https://cdn.jsdelivr.net/gh/1marcomachado/teste@b0e97a39956099dccc97abf9f30434eb797ccd28/';
  const whiteLogo=root+'74f3863aba1807ce1bb718a3859357d6.png';
  const darkLogo=root+'83298af6331a206e81540b0912dd9510.png';
  const invite=document.createElement('button');
  invite.type='button';invite.className='bc-cart-invite';invite.dataset.bazarclubOpen='side';
  invite.innerHTML='<span class="bc-cart-logo"><img alt="BAZARclub" src="'+whiteLogo+'"></span><span></span><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M2 12h20M22 12l-5-5M22 12l-5 5"/></svg>';
  header.appendChild(invite);
  const wrapper=document.createElement('div');wrapper.className='container bc-cart-wrapper';
  wrapper.innerHTML='<section class="bc-cart-progress" aria-label="Vantagem BAZARclub"><header><img src="'+darkLogo+'" alt="BAZARclub"><span>5€ EXTRA PARA MEMBROS</span></header><p class="bc-cart-copy" aria-live="polite"></p><div class="bc-cart-meter" role="progressbar" aria-label="Valor para atingir os 119,90 euros" aria-valuemin="0" aria-valuemax="119.90"><span></span></div><div class="bc-cart-values"><span></span><span>119,90 €</span></div></section><p class="bc-cart-test-note">Teste no dev: os formulários mostram a confirmação sem enviar dados ou emails. O desconto não é aplicado nesta versão.</p>';
  wrapper.querySelector('.bc-cart-test-note').remove();
  productList.after(wrapper);
  const panel=wrapper.querySelector('section'),copy=panel.querySelector('.bc-cart-copy'),meter=panel.querySelector('.bc-cart-meter');
  const money=n=>(n/100).toLocaleString('pt-PT',{minimumFractionDigits:2,maximumFractionDigits:2})+' €';
  let last='',member=false;
  function update(){
    const rows=[...main.querySelectorAll('tr')];
    const row=rows.find(r=>/^(valor dos produtos|products value|valor de los productos)$/i.test(r.cells[0]?.textContent.trim()||''));
    const raw=row?.cells[1]?.textContent;
    const total=raw ? Math.round(Number(raw.replace(/[^\d,.-]/g,'').replace(/\./g,'').replace(',','.'))*100) : NaN;
    let date=new URLSearchParams(location.search).get('bf-date');
    if(!/^2026-11-(0[1-9]|[12]\d|30)$/.test(date||''))date=new Date().toLocaleDateString('sv-SE',{timeZone:'Europe/Lisbon'});
    const key=[total,date,member].join('|');if(key===last)return;last=key;
    const lead=date<'2026-11-26'?'acesso antecipado a 26 de novembro + 5€ extra acumuláveis. ':date==='2026-11-26'?'acesso antecipado hoje + 5€ extra acumuláveis. ':'5€ extra para membros, acumuláveis com os descontos da Black Friday. ';
    invite.children[1].innerHTML=lead+'<u>Torna-te membro aqui</u>';
    invite.hidden=member || date>'2026-11-30';
    panel.hidden=!Number.isFinite(total) || date<'2026-11-26' || date>'2026-11-30';
    if(panel.hidden)return;
    const missing=Math.max(0,11990-total);
    copy.innerHTML=missing ? '<strong>Estás quase!</strong> Faltam <strong class="bc-cart-missing">'+money(missing)+'</strong> para poderes usar os teus <strong>5€ extra</strong> (em compras a partir de 119,90 €).' : '<strong>Boa! Já chegaste aos 119,90 €.</strong> Os teus 5€ extra já podem ser descontados nesta compra.';
    meter.setAttribute('aria-valuenow',String(Math.min(total,11990)/100));
    meter.firstElementChild.style.width=Math.min(100,total/11990*100)+'%';
    panel.querySelector('.bc-cart-values span').textContent=money(total);
  }
  let scheduled=false;
  new MutationObserver(records=>{
    if(records.every(r=>wrapper.contains(r.target)||invite.contains(r.target)))return;
    if(!scheduled){scheduled=true;requestAnimationFrame(()=>{scheduled=false;update();});}
  }).observe(main,{childList:true,subtree:true,characterData:true});
  window.addEventListener('bazarclub:preview-result',()=>{member=true;update();});
  update();
})();

(function(){
  const main=document.querySelector('.ec_shopping_bag'),anchor=document.querySelector('.bc-cart-progress');
  if(!main||!anchor)return;
  const section=document.createElement('section');section.className='bc-cart-recommendations';section.hidden=true;
  section.innerHTML='<header><h2>Junta um destes artigos e chega lá</h2><div><button type="button" aria-label="Artigos anteriores">‹</button><button type="button" aria-label="Artigos seguintes">›</button></div></header><div class="bc-rec-track" tabindex="0" aria-label="Artigos recomendados"></div><p class="bc-rec-info">Preços e disponibilidade do catálogo principal. Confirma as condições na página do artigo no dev.</p>';
  section.querySelector('.bc-rec-info').remove();
  anchor.after(section);const track=section.querySelector('.bc-rec-track');
  section.querySelectorAll('button').forEach((button,index)=>button.onclick=()=>track.scrollBy({left:(index?1:-1)*track.clientWidth*.8,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
  const money=n=>(n/100).toLocaleString('pt-PT',{style:'currency',currency:'EUR'});
  let last='',controller,timer;
  async function refreshCart(){
    const response=await fetch(location.href,{credentials:'same-origin',cache:'no-store'});
    if(!response.ok)throw Error('cart_refresh_failed');
    const bytes=await response.arrayBuffer();
    const charset=(response.headers.get('Content-Type')||'').match(/charset=([^;\s]+)/i)?.[1]||'utf-8';
    const doc=new DOMParser().parseFromString(new TextDecoder(charset).decode(bytes),'text/html');
    const list=main.querySelector('.wrapper-shoppingbag-product-list'),fresh=doc.querySelector('.wrapper-shoppingbag-product-list');
    const desktop=main.querySelector('#shipping')?.closest('table'),mobile=main.querySelector('#shipping_mobile')?.closest('table');
    const freshDesktop=doc.querySelector('#shipping')?.closest('table'),freshMobile=doc.querySelector('#shipping_mobile')?.closest('table');
    if(!fresh?.querySelector('[id^="rdc-prd-dkt-"]')||!desktop||!mobile||!freshDesktop||!freshMobile)throw Error('cart_refresh_failed');
    // Preserve Redicom's directly bound quantity/gift handlers on the new rows.
    if(!window.jQuery)throw Error('cart_refresh_failed');
    for(const selector of ['input.qtd','select.qnt-select','.setGift']){
      const template=list.querySelector(selector);
      if(!template&&fresh.querySelector(selector))throw Error('cart_refresh_failed');
      for(const node of fresh.querySelectorAll(selector)){
        const clone=window.jQuery(template).clone(true)[0];
        for(const attr of [...clone.attributes])clone.removeAttribute(attr.name);
        for(const attr of node.attributes)clone.setAttribute(attr.name,attr.value);
        if(node.tagName==='INPUT')clone.value=node.value;else clone.innerHTML=node.innerHTML;
        node.replaceWith(clone);
      }
    }
    list.replaceChildren(...fresh.childNodes);
    desktop.replaceChildren(...freshDesktop.childNodes);mobile.replaceChildren(...freshMobile.childNodes);
    const count=main.querySelector('#rdc-header-total-products'),freshCount=doc.querySelector('#rdc-header-total-products');
    if(count&&freshCount)count.textContent=freshCount.textContent;
    window.dispatchEvent(new CustomEvent('bazarclub:cart-updated'));
  }
  async function update(){
    const products=[...main.querySelectorAll('[id^="rdc-prd-dkt-"]')];
    const skus=products.map(p=>p.querySelector('.rdc-shop-prd-reference-value')?.textContent.trim().replace(/^#/,''));
    const subtotalCents=Math.round(Number(anchor.querySelector('[role="progressbar"]')?.getAttribute('aria-valuenow'))*100);
    const key=JSON.stringify([skus,subtotalCents,anchor.hidden]);if(key===last)return;last=key;
    controller?.abort();section.hidden=true;track.replaceChildren();
    if(anchor.hidden||!Number.isSafeInteger(subtotalCents)||subtotalCents>=11990||!products.length||skus.some(s=>!s))return;
    controller=new AbortController();
    const title=products[0].querySelector('.rdc-shop-prd-title')?.textContent.trim()||'';
    try{
      const response=await fetch('https://bzrac.peboys.workers.dev/recommendations/dev',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({skus,title,subtotalCents}),signal:controller.signal,credentials:'omit'});
      if(!response.ok)throw Error('Catalogue unavailable');const data=await response.json();
      if(last!==key||!Array.isArray(data.products))return;
      for(const p of data.products.slice(0,12)){
        const url=new URL(p.url),img=new URL(p.image);
        if(url.origin!==location.origin||img.protocol!=='https:'||!Number.isSafeInteger(p.priceCents)||p.priceCents<=0)continue;
        const card=document.createElement('article');card.className='bc-rec-card';
        const picture=document.createElement('img');picture.src=img.href;picture.alt=p.name;picture.loading='lazy';
        const name=document.createElement('h3');name.textContent=p.name;
        const price=document.createElement('p');price.className='bc-rec-price';
        if(p.originalPriceCents>p.priceCents){const old=document.createElement('del');old.textContent=money(p.originalPriceCents);price.append(old,' ');}
        const current=document.createElement('strong');current.textContent=money(p.priceCents);price.append(current);
        const link=document.createElement('button');link.type='button';link.className='bc-rec-add';link.textContent='ADICIONAR';link.setAttribute('aria-label','Adicionar '+p.name);
        const status=document.createElement('p');status.className='bc-rec-status';status.setAttribute('role','status');
        let variants,select,busy=false,added=false;
        link.onclick=async()=>{
          if(busy||added)return;busy=true;link.disabled=true;status.textContent='';
          try{
            if(!variants){
              const page=await fetch(url.href,{credentials:'same-origin'});if(!page.ok){if(page.status===404)card.remove();throw Error('Este artigo já não está disponível.');}
              const bytes=await page.arrayBuffer();
              const probe=new TextDecoder().decode(bytes);
              const charset=(page.headers.get('Content-Type')||'').match(/charset=([^;\s]+)/i)?.[1]||probe.match(/charset=["']?([^\s"'>;]+)/i)?.[1]||'utf-8';
              const doc=new DOMParser().parseFromString(new TextDecoder(charset).decode(bytes),'text/html');
              variants=[...doc.querySelectorAll('label[sku_pod][qtd][value]')].filter(e=>Number(e.getAttribute('qtd'))>0&&/^\d+$/.test(e.getAttribute('value'))&&e.getAttribute('sku_pod').split('|')[0]===p.group).map(e=>({id:e.getAttribute('value'),size:e.textContent.trim(),sku:e.getAttribute('sku_pod')}));
              if(!variants.length)throw Error('Este artigo já não está disponível.');
              const unique=new Map(variants.map(v=>[v.id,v]));variants=[...unique.values()];
              select=document.createElement('select');select.className='bc-rec-size';select.setAttribute('aria-label','Tamanho de '+p.name);
              const placeholder=new Option('Seleciona o tamanho','');select.add(placeholder);
              variants.forEach(v=>select.add(new Option(v.size,v.id)));card.insertBefore(select,link);
              if(variants.length===1&&/unic|únic|one size/i.test(variants[0].size)){select.value=variants[0].id;select.hidden=true;}
              else {status.textContent='Seleciona o tamanho para adicionar.';select.focus();return;}
            }
            const selected=variants.find(v=>v.id===select.value);if(!selected){status.textContent='Seleciona o tamanho para adicionar.';select.focus();return;}
            const response=await fetch('/api/api.php/addToBasket/5/0/'+selected.id+'/1/0',{credentials:'same-origin',cache:'no-store'});
            if(!response.ok)throw Error('Não foi possível adicionar. Tenta novamente.');
            const data=await response.json();
            if(String(data.response?.product_id_add)!==selected.id)throw Error('Não foi possível confirmar a adição. Atualiza o carrinho antes de voltar a tentar.');
            added=true;status.textContent='Artigo adicionado.';
            try{await refreshCart();}catch{status.textContent='Artigo adicionado. Atualiza a página para veres o carrinho atualizado.';}
          }catch(e){status.textContent=/^(Este artigo|Não foi possível)/.test(e.message)?e.message:'Não foi possível adicionar este artigo. Tenta novamente.';}
          finally{busy=false;link.disabled=added;}
        };
        card.append(picture,name,price,link,status);track.append(card);
      }
      section.hidden=!track.children.length;
      section.querySelector('header>div').hidden=track.children.length<2;
    }catch(e){if(e.name!=='AbortError')console.warn('BAZARclub: recomendações temporariamente indisponíveis.');}
  }
  new MutationObserver(records=>{if(records.every(r=>section.contains(r.target)))return;clearTimeout(timer);timer=setTimeout(update,150);}).observe(main,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['hidden','aria-valuenow']});
  update();
})();

}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
