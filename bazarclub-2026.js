(function(){
const demo=['www.bzronline.com','bzronline.com'].includes(location.hostname)&&new URLSearchParams(location.search).get('bf-demo')==='1';
if(!demo && location.hostname!=='bzronline-dev.redicom.work')return;
if(window.BazarClubForm)return;
const root=new URL('.',document.currentScript.src);
(function(){
  const rows=[
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
    ['No dia 26 de novembro vais ter acesso antecipado + 5€ extra acumuláveis com os descontos da Black Friday. Vamos reconhecer a tua adesão neste dispositivo.','On 26 November, get early access + an extra €5 that can be combined with Black Friday discounts. We’ll remember your membership on this device.','El 26 de noviembre tendrás acceso anticipado + 5€ extra acumulables con los descuentos del Black Friday. Recordaremos tu suscripción en este dispositivo.'],
    ['Recebemos o teu pedido. Se receberes um email de confirmação, segue as instruções para concluir a adesão. As vantagens ficam disponíveis quando a subscrição estiver ativa.','We’ve received your request. If you receive a confirmation email, follow its instructions to complete your subscription. Benefits become available once your subscription is active.','Hemos recibido tu solicitud. Si recibes un correo de confirmación, sigue las instrucciones para completar tu suscripción. Las ventajas estarán disponibles cuando la suscripción esté activa.'],
    ['Demonstração — nenhum dado será enviado.','Demo — no data will be sent.','Demostración — no se enviará ningún dato.'],
    ['Preenche o nome e um email válido.','Enter your name and a valid email address.','Introduce tu nombre y un correo electrónico válido.'],
    ['Seleciona as preferências e aceita o consentimento.','Select your preferences and give your consent.','Selecciona tus preferencias y acepta el consentimiento.'],['Revê a data de nascimento.','Check your date of birth.','Revisa la fecha de nacimiento.'],
    ['A verificar a tua adesão…','Checking your membership…','Comprobando tu suscripción…'],['A confirmar a tua adesão…','Confirming your membership…','Confirmando tu suscripción…'],['A enviar a tua adesão…','Sending your subscription…','Enviando tu suscripción…'],
    ['A adesão estará disponível quando a campanha for ativada.','Sign-up will be available when the campaign launches.','La inscripción estará disponible cuando se active la campaña.'],
    ['A verificação estará disponível quando a campanha for ativada.','Membership verification will be available when the campaign launches.','La verificación estará disponible cuando se active la campaña.'],
    ['Não foi possível verificar a adesão. Tenta novamente.','We couldn’t check your membership. Please try again.','No hemos podido comprobar tu suscripción. Inténtalo de nuevo.'],
    ['Não encontrámos uma subscrição ativa com este email. Podes aderir no separador “Ainda não sou membro”.','We couldn’t find an active subscription for this email. You can join under “I’m not a member yet”.','No encontramos una suscripción activa con este correo. Puedes unirte en la pestaña “Aún no soy miembro”.'],
    ['Não foi possível concluir a adesão. Revê os dados e tenta novamente.','We couldn’t complete your subscription. Check your details and try again.','No hemos podido completar tu suscripción. Revisa los datos e inténtalo de nuevo.'],
    ['O pedido foi enviado, mas ainda não conseguimos verificar a adesão. Verifica o teu email e usa “Já sou membro” para tentar novamente.','Your request was sent, but we couldn’t verify your membership yet. Check your email and try again under “I’m already a member”.','Tu solicitud se ha enviado, pero aún no hemos podido verificar tu suscripción. Revisa tu correo y vuelve a intentarlo en “Ya soy miembro”.'],
    ['Não recebemos confirmação do envio. Verifica o teu email antes de tentares novamente.','We haven’t received confirmation. Check your email before trying again.','No hemos recibido confirmación del envío. Revisa tu correo antes de volver a intentarlo.'],
    ['Não foi possível confirmar o envio. Verifica a ligação e o teu email antes de tentares novamente.','We couldn’t confirm the submission. Check your connection and email before trying again.','No hemos podido confirmar el envío. Comprueba la conexión y tu correo antes de volver a intentarlo.'],
    ['Preenche este campo.','Please fill in this field.','Completa este campo.'],['Introduz um email válido.','Enter a valid email address.','Introduce un correo electrónico válido.'],
    ['A 26 DE NOVEMBRO','ON 26 NOVEMBER','EL 26 DE NOVIEMBRE'],['ACESSO','EARLY','ACCESO'],['ANTECIPADO','ACCESS','ANTICIPADO'],
    ['Torna-te membro e garante, na Black Friday, acesso antecipado + 5€ extra acumuláveis com os descontos.','Join now for early access + an extra €5 that can be combined with Black Friday discounts.','Hazte miembro y consigue acceso anticipado + 5€ extra acumulables con los descuentos del Black Friday.'],
    ['*5€ extra em compras a partir de 119,90 €.','*Extra €5 on purchases of €119.90 or more.','*5€ extra en compras a partir de 119,90 €.'],
    ['BAZARclub. A 26 de novembro: acesso antecipado +5€ extra acumuláveis com os descontos da Black Friday. 5€ extra em compras a partir de 119,90 €.','BAZARclub. On 26 November: early access + an extra €5 that can be combined with Black Friday discounts. Extra €5 on purchases of €119.90 or more.','BAZARclub. El 26 de noviembre: acceso anticipado +5€ extra acumulables con los descuentos del Black Friday. 5€ extra en compras a partir de 119,90 €.'],
    ['Informações: envios, trocas e pagamentos','Shipping, returns and payment information','Información: envíos, cambios y pagos'],
    ['Envio grátis acima de 69,90€ para Portugal Continental. Entrega em 1 a 3 dias úteis.','Free shipping over €69.90 to mainland Portugal. Delivery in 1–3 working days.','Envío gratis a partir de 69,90€ a Portugal continental. Entrega en 1–3 días laborables.'],
    ['Envio grátis para as ilhas em compras superiores a 69,90€.','Free shipping to the islands on orders over €69.90.','Envío gratis a las islas en compras superiores a 69,90€.'],
    ['Envio grátis acima de 69,90€ para Espanha. Entrega em 1 a 4 dias úteis.','Free shipping over €69.90 to Spain. Delivery in 1–4 working days.','Envío gratis a partir de 69,90€ a España. Entrega en 1–4 días laborables.'],
    ['Consulta as condições de envio para o teu destino.','Check the shipping terms for your destination.','Consulta las condiciones de envío para tu destino.'],
    ['BLACK FRIDAY AQUECIMENTO · OS MEMBROS BAZARCLUB COMPRAM A 26','BLACK FRIDAY WARM-UP · BAZARCLUB MEMBERS SHOP ON THE 26TH','CALENTAMIENTO BLACK FRIDAY · LOS MIEMBROS BAZARCLUB COMPRAN EL 26'],
    ['ENVIO GRÁTIS ACIMA DE 69,90€ · ENTREGA EM 1 A 3 DIAS ÚTEIS','FREE SHIPPING OVER €69.90 · DELIVERY IN 1–3 WORKING DAYS','ENVÍO GRATIS A PARTIR DE 69,90€ · ENTREGA EN 1–3 DÍAS LABORABLES'],
    ['TROCAS ALARGADAS ATÉ 4 DE JANEIRO','EXTENDED EXCHANGES UNTIL 4 JANUARY','CAMBIOS AMPLIADOS HASTA EL 4 DE ENERO'],['LEVANTAMENTO GRATUITO EM LOJA','FREE IN-STORE COLLECTION','RECOGIDA GRATIS EN TIENDA'],['PAGAMENTOS EM PRESTAÇÕES COM','PAY IN INSTALMENTS WITH','PAGO A PLAZOS CON'],['PAGAMENTOS SEGUROS:','SECURE PAYMENTS:','PAGOS SEGUROS:']
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

const lang=window.BazarClubI18n.language(new URLSearchParams(location.search).get('bf-lang') || location.pathname.split('/')[1] || document.documentElement.lang);
const image=variant=>new URL('bazarclub-'+lang+'-'+variant+'.png',root).href;
const style=document.createElement('style');style.textContent=".bc-dialog{border:0;padding:0;width:min(760px,calc(100% - 32px));max-width:none;max-height:calc(100dvh - 32px);color:#333;background:#fff;box-shadow:0 15px 70px #0005;font:13px/1.45 'Metrocity-Regular',Arial,sans-serif;overflow:auto}\n.bc-dialog::backdrop{background:#0005}.bc-dialog *{box-sizing:border-box}.bc-dialog [hidden]{display:none!important}.bc-dialog button,.bc-dialog input,.bc-dialog select{font:inherit}.bc-dialog button,.bc-dialog a{touch-action:manipulation}.bc-dialog :focus-visible{outline:2px solid #2672b5;outline-offset:3px}\n.bc-layout{display:grid;grid-template-columns:38.5% 61.5%;min-height:590px}.bc-close{padding:0;line-height:1;position:absolute;top:0;right:0;width:36px;height:36px;border:0;background:#000;color:white;font-size:25px!important;z-index:2;cursor:pointer}\n.bc-campaign{position:relative;overflow:hidden;padding:44px 26px 65px;background:repeating-linear-gradient(117deg,#171717 0,#171717 2px,#202020 3px,#171717 4px);color:white}.bc-brand{font:900 38px/1 'Oswald-Regular','Arial Narrow',Impact,sans-serif;letter-spacing:-1.5px}.bc-brand span{color:#65e300;font-style:italic;font-size:33px}.bc-date{display:table;background:#f3433c;color:white;margin:24px 0 12px;padding:3px 6px;font:bold 12px/1.4 'Oswald-Regular',Impact,sans-serif}.bc-campaign h2{font:900 italic 30px/.98 'Oswald-Regular',Impact,sans-serif;margin:0 0 12px}.bc-discount{font:900 italic 43px/.98 'Oswald-Regular',Impact,sans-serif;letter-spacing:-1px}.bc-extra{font:bold 21px/1.6 'Oswald-Regular',Impact,sans-serif;margin-top:16px;color:#bbb}.bc-extra strong{display:inline-block;background:#f3433c;color:#fff;padding:0 8px;font-style:italic}.bc-rule{width:40px;border-top:1px solid #f3433c;margin:22px 0}.bc-campaign p{font-size:13px;line-height:1.5;margin:0 0 12px}.bc-campaign small{color:#ccc;font-size:10px}.bc-tape{position:absolute;bottom:16px;left:-12px;width:120%;background:#f3433c;color:#111;transform:rotate(-5deg);white-space:nowrap;font:bold 14px/1.7 'Oswald-Regular',Impact,sans-serif}.bc-campaign:has(.bc-campaign-image){padding:0;background:#181818}.bc-campaign-image{display:block;width:100%;height:100%;object-fit:cover}\n.bc-content{padding:34px 24px 26px}.bc-tabs{display:flex;border-bottom:1px solid #ddd;margin:0 0 16px}.bc-tabs button{flex:1;border:0;border-bottom:2px solid transparent;background:#fff;padding:12px 3px;color:#737373;cursor:pointer;font-weight:bold;font-size:10px;letter-spacing:.5px;text-transform:uppercase}.bc-tabs [aria-selected=true]{border-color:#333;color:#171717}.bc-form>label{display:block;margin-bottom:12px;font-size:11px}.bc-form input:not([type=radio]):not([type=checkbox]),.bc-form select{display:block;width:100%;height:38px;border:1px solid #d4d4d4;border-radius:0;background:#fff;color:#222;margin-top:4px;padding:7px 10px;box-shadow:none}.bc-form fieldset{padding:0;border:0;margin:0 0 10px}.bc-form legend{font-size:11px;margin-bottom:4px;padding:0}.bc-radios{display:flex;gap:20px}.bc-radios label{flex:1;display:flex;align-items:center;gap:6px;font-size:12px;min-height:26px}.bc-form input[type=radio],.bc-form input[type=checkbox]{appearance:auto;accent-color:#333;width:15px;height:15px;flex-shrink:0;margin:0;position:static;opacity:1}.bc-form .bc-consent{display:flex;align-items:flex-start;gap:9px;margin:17px 0;font-size:11px}.bc-consent input{margin-top:2px!important}.bc-dialog a{color:inherit;text-decoration:underline}.bc-primary{display:block;text-align:center;width:100%;border:0;background:#333;color:#fff!important;padding:14px 10px;min-height:44px;cursor:pointer;text-transform:uppercase;font-size:11px!important;font-weight:bold!important;letter-spacing:.7px;text-decoration:none!important}.bc-primary:disabled{opacity:.6;cursor:wait}.bc-foot{display:flex;justify-content:space-between;gap:10px;font-size:9px;margin-top:8px;color:#666}.bc-foot small{font-size:inherit}.bc-status{font-size:12px;color:#a12621;margin:16px 0 0;overflow-wrap:anywhere}.bc-status:empty{display:none}.bc-status[data-ok=true]{color:#23602f}#bc-member h2{font-size:21px;margin-top:30px}#bc-member p{margin:18px 0 24px}\n.bc-side{margin:0 0 0 auto;width:min(420px,100%);height:100dvh;max-height:100dvh}.bc-side .bc-layout{display:block;min-height:100%}.bc-side .bc-campaign{padding:30px 25px 52px}.bc-side .bc-campaign h2{font-size:25px}.bc-side .bc-discount{font-size:34px}.bc-side .bc-date{margin-top:14px}.bc-side .bc-content{padding:18px 24px 28px}.bc-side .bc-campaign-image{height:auto}\n@media(max-width:600px){.bc-dialog{width:calc(100% - 20px);max-height:calc(100dvh - 20px)}.bc-layout{display:block;min-height:0}.bc-campaign{padding:24px 24px 45px}.bc-brand{font-size:32px}.bc-date{margin:14px 0 8px}.bc-campaign h2{font-size:24px}.bc-discount{font-size:34px}.bc-campaign p{max-width:35ch}.bc-content{padding:16px 20px 25px}.bc-form input:not([type=radio]):not([type=checkbox]),.bc-form select{font-size:16px;height:44px}.bc-tabs button{min-height:44px}.bc-side{width:100%;max-height:100dvh}.bc-campaign-image{height:auto}}\n\r\n/* Proporções do HTML da Rita e artes originais da Cláudia. */\n.bc-dialog{width:min(780px,calc(100% - 32px));font-family:Montserrat,'Metrocity-Regular',Arial,sans-serif}\n.bc-dialog::backdrop{background:rgba(255,255,255,.75)}\n.bc-layout{grid-template-columns:300px minmax(0,1fr);min-height:640px}\n.bc-content{padding:26px 24px 22px;min-width:0}\n.bc-campaign.bc-artwork{padding:0;background:#0b0b0b}\n.bc-artwork picture{display:block;width:100%}\n.bc-artwork .bc-campaign-image{display:block;width:100%;height:auto;object-fit:contain}\n.bc-form input:not([type=radio]):not([type=checkbox]),.bc-form select{height:40px}\n.bc-tabs button{font-size:11px}\n.bc-side{width:min(420px,100%)}\n.bc-side .bc-layout{display:block;min-height:100%}\n@media(min-width:601px) and (max-width:800px){.bc-layout{grid-template-columns:38.46% minmax(0,1fr);min-height:0}.bc-content{padding:26px 18px 22px}.bc-tabs button{font-size:10px}}\n@media(max-width:600px){.bc-dialog{width:calc(100% - 20px)}.bc-layout{display:block;min-height:0}.bc-content{padding:16px 20px 25px}.bc-side{width:100%}.bc-form input:not([type=radio]):not([type=checkbox]),.bc-form select{height:44px}}\r\n\n/* A altura não depende do separador nem das mensagens de confirmação. */\n.bc-dialog:not(.bc-side){height:min(640px,calc(100dvh - 32px));overflow:hidden}\n.bc-dialog:not(.bc-side) .bc-layout{height:100%;min-height:0;grid-template-rows:minmax(0,1fr)}\n.bc-dialog:not(.bc-side) .bc-content{height:100%;min-height:0;overflow-y:auto;scrollbar-gutter:stable}\n.bc-dialog:not(.bc-side) .bc-campaign{height:100%;min-height:0}\n.bc-dialog:not(.bc-side) .bc-artwork picture{height:100%}\n.bc-dialog:not(.bc-side) .bc-campaign-image{height:100%;object-fit:cover}\n@media(max-width:600px){\n  .bc-dialog:not(.bc-side){height:min(840px,calc(100dvh - 20px))}\n  .bc-dialog:not(.bc-side) .bc-layout{display:grid;grid-template-columns:minmax(0,1fr);grid-template-rows:auto minmax(0,1fr)}\n  .bc-dialog:not(.bc-side) .bc-campaign{height:auto}\n  .bc-dialog:not(.bc-side) .bc-artwork picture{height:auto}\n  .bc-dialog:not(.bc-side) .bc-campaign-image{height:auto;aspect-ratio:4/3;object-fit:contain}\n}\n\n.bc-announcement{box-sizing:border-box;width:100%;height:36px;display:flex;align-items:center;overflow:hidden;background:#0b0b0b;color:#fff;font:700 11px/1.5 Montserrat,'Metrocity-Regular',Arial,sans-serif;letter-spacing:.4px}\n.bc-announcement-track{display:flex;width:max-content;flex-shrink:0;animation:bc-ticker 45s linear infinite}\n.bc-announcement:hover .bc-announcement-track,.bc-announcement:focus-within .bc-announcement-track{animation-play-state:paused}\n.bc-announcement button{box-sizing:border-box;display:inline-flex;align-items:center;gap:8px;margin:0;padding:0;border:0;border-radius:0;background:transparent;color:#ef4036;font:inherit;letter-spacing:inherit;white-space:nowrap;cursor:pointer}\n.bc-announcement svg{flex-shrink:0}\n.bc-announcement button:focus-visible{outline:2px solid #fff;outline-offset:-3px}\n@keyframes bc-ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}\n.bc-dialog{position:fixed;inset:0;margin:auto}.bc-dialog.bc-side{margin:0 0 0 auto}\nhtml.bc-modal-open,html.bc-modal-open body{overflow:hidden;overscroll-behavior:none}html.bc-modal-open{scrollbar-gutter:stable}\n.bc-dialog,.bc-content{overscroll-behavior:contain}\n.bc-side .bc-close{position:sticky;top:0;display:block;margin-left:auto;margin-bottom:-36px}\n.bc-demo-notice{margin:0 16px 8px 0;font-size:10px;color:#666}\n.bc-campaign-bar{background:#efefef;color:#0b0b0b;border-top:1px solid #e0e0e0;font:700 13px/1.45 Montserrat,Arial,sans-serif}.bc-campaign-bar[hidden]{display:none!important}.bc-campaign-bar-link{box-sizing:border-box;display:flex;align-items:center;justify-content:center;gap:12px;min-height:48px;padding:8px 40px;color:inherit!important;text-decoration:none!important}.bc-campaign-badge{display:inline-flex;align-items:center;flex-shrink:0;background:#0b0b0b;color:#fff;border-radius:4px;padding:3px 8px}.bc-campaign-badge img{display:block;height:12px;width:auto}.bc-campaign-cta{text-decoration:underline;text-underline-offset:3px}.bc-campaign-arrow{font-size:26px;line-height:1}.bc-campaign-bar-link:focus-visible{outline:2px solid #2672b5;outline-offset:-3px}.bc-campaign-demo{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:10px;padding:8px 16px;background:white;color:#555;font:11px/1.5 Montserrat,Arial,sans-serif;border-bottom:1px solid #ddd}.bc-campaign-demo small{flex-basis:100%;text-align:center}.bc-campaign-demo select,.bc-campaign-demo input{font:inherit;padding:5px;border:1px solid #ccc;background:#fff;color:#333;border-radius:0}\n@media(max-width:800px){.bc-campaign-bar-link{gap:8px;padding:10px 16px;flex-wrap:wrap;font-size:11px;text-align:center}.bc-campaign-message{flex-basis:calc(100% - 120px)}.bc-campaign-arrow{font-size:20px}.bc-campaign-badge{max-width:110px}}\n.bc-dialog:not(.bc-side) .bc-layout{grid-template-columns:calc(min(640px,100dvh - 32px)*.46875) minmax(0,1fr)}\n.bc-dialog:not(.bc-side) .bc-campaign-image{object-fit:contain}\n.bc-tabs button{font-size:12px}.bc-form>label{margin-bottom:14px}.bc-primary{font-size:12px!important;letter-spacing:1px}\n#bc-member h2,.bc-result h2{font:800 26px/1.1 'Barlow Condensed',Impact,sans-serif;margin:4px 0 14px}#bc-member>p{margin:0 0 24px}.bc-result h2:focus{outline:none}.bc-result-note{display:flex;gap:10px;padding:14px;background:#f5f5f5;margin:0 0 20px;font-size:12px;color:#555}.bc-result-note p{margin:0}.bc-result-note>span{flex-shrink:0}.bc-other{display:block;border:0;background:none;color:#666;text-decoration:underline;margin:12px auto;font-size:11px}\n.bc-side .bc-content{min-height:560px}\n@media(max-width:800px){.bc-dialog:not(.bc-side){width:calc(100% - 20px);height:min(840px,calc(100dvh - 20px))}.bc-dialog:not(.bc-side) .bc-layout{grid-template-columns:minmax(0,1fr);grid-template-rows:auto minmax(0,1fr)}.bc-dialog:not(.bc-side) .bc-campaign{height:auto}.bc-dialog:not(.bc-side) .bc-artwork picture{height:auto}.bc-dialog:not(.bc-side) .bc-campaign-image{height:auto;aspect-ratio:4/3}.bc-content{padding:20px}.bc-form input:not([type=radio]):not([type=checkbox]),.bc-form select{font-size:16px;height:44px}.bc-tabs button{min-height:44px;font-size:10px}}\n@media(prefers-reduced-motion:reduce){.bc-announcement{overflow-x:auto}.bc-announcement-track{animation:none}.bc-announcement-track>[aria-hidden=true]{display:none!important}}\n/* Telemóvel · Homepage da Rita: cartão completo com deslocação única. */\n.bc-campaign-message-group{min-width:0}\n@keyframes bc-popup-in{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:none}}\n@keyframes bc-side-in{from{transform:translateX(100%)}to{transform:none}}\n@keyframes bc-side-up{from{transform:translateY(100%)}to{transform:none}}\n.bc-dialog[open]:not(.bc-side){animation:bc-popup-in .25s ease-out}\n.bc-dialog.bc-side[open]{animation:bc-side-in .3s ease-out}\n@media(max-width:800px){\n  .bc-dialog.bc-side[open]{animation-name:bc-side-up}\n  html.bc-modal-open{scrollbar-gutter:auto}\n  .bc-campaign-bar-link{flex-wrap:nowrap;gap:12px;padding:12px 16px;text-align:left;font-size:12.5px}\n  .bc-campaign-message-group{flex:1}\n  .bc-campaign-arrow{flex-shrink:0}\n  .bc-dialog:not(.bc-side){box-sizing:border-box;inset:50px 0 auto;width:calc(100% - 32px);height:min(742px,calc(100dvh - 100px));max-height:calc(100dvh - 100px);margin:0 auto;border:1px solid #e2e2e2;overflow-y:auto}\n  .bc-dialog:not(.bc-side) .bc-layout{display:block;height:auto;min-height:100%}\n  .bc-dialog:not(.bc-side) .bc-content{height:auto;min-height:0;overflow:visible;padding:16px 18px 18px;scrollbar-gutter:auto}\n  .bc-dialog:not(.bc-side) .bc-close{position:sticky;top:0;display:block;margin-left:auto;margin-bottom:-36px}\n  .bc-side .bc-content{padding:22px 20px 140px}\n}\n@media(prefers-reduced-motion:reduce){.bc-dialog[open]{animation:none}}\n#bc-member>p{font-size:13px;line-height:1.55;margin:0 0 22px}\n#bc-member>.bc-join-copy{font-size:11px;line-height:1.5;color:#6b6b6b;margin:18px 0 0}\n.bc-dialog .bc-join-link,.bc-dialog .bc-join-link:hover,.bc-dialog .bc-join-link:active{display:inline;padding:0;border:0;background:transparent!important;color:#333!important;font:inherit;font-weight:700;cursor:pointer;text-transform:none!important;text-decoration:underline;text-underline-offset:3px;box-shadow:none;transform:none}\n\n/* Medidas do formulário do protótipo da Rita. */\n.bc-dialog::backdrop{background:rgba(255,255,255,.7)}\n.bc-dialog,.bc-content{scrollbar-width:none}\n.bc-dialog::-webkit-scrollbar,.bc-content::-webkit-scrollbar{display:none}\n.bc-dialog:not(.bc-side) .bc-content{scrollbar-gutter:auto}\n.bc-tabs{margin-bottom:18px;border-color:#e2e2e2}\n.bc-tabs button{padding:10px 4px 9px;line-height:normal;letter-spacing:.4px;margin-bottom:-1px}\n.bc-dialog .bc-tabs button:hover{background:#fff}\n.bc-form{display:flex;flex-direction:column;gap:16px}\n.bc-form>label{display:flex;flex-direction:column;gap:6px;margin:0;line-height:normal}\n.bc-form input:not([type=radio]):not([type=checkbox]),.bc-form select{margin:0;padding:0 10px;height:40px;font-size:13px;border-color:#ccc}\n.bc-form>label:nth-child(3),.bc-form>label:has(select){margin-top:-6px}\n.bc-form fieldset{margin:0}\n.bc-form legend{line-height:normal;margin-bottom:10px}\n.bc-radios label{min-height:16px;line-height:normal;gap:8px}\n.bc-form input[type=radio],.bc-form input[type=checkbox]{width:16px;height:16px}\n.bc-form .bc-consent{flex-direction:row;align-items:center;gap:10px;margin:0;font-size:12px;line-height:1.4}\n.bc-consent input{margin-top:0!important}\n.bc-primary{height:44px;padding:0 10px;line-height:normal}\n.bc-dialog .bc-primary:hover{background:#333}\n.bc-foot{align-items:center;margin-top:-6px;font-size:10px;line-height:normal;color:#6b6b6b}\n#bc-member>p{margin-bottom:14px}\n.bc-member-form{gap:14px}\n.bc-member-form input[type=email]{height:42px}\n#bc-member>.bc-join-copy{margin-top:14px}\n.bc-side .bc-content{padding:28px 40px 110px}\n.bc-side .bc-tabs{margin-bottom:22px}\n.bc-side .bc-close{top:16px;right:16px;width:46px;height:50px;margin-right:16px;margin-bottom:-50px;padding:8px;background:transparent;font-size:30px!important}\n.bc-side.bc-close-on-light .bc-close{background:#000}\n@media(min-width:801px){\n  .bc-dialog:not(.bc-side){box-sizing:content-box;inset:clamp(16px,calc(100dvh - 656px),90px) 0 auto;margin:0 auto;border:1px solid #e2e2e2;box-shadow:0 16px 40px rgba(0,0,0,.18)}\n  .bc-dialog:not(.bc-side) .bc-close{width:34px;height:30px}\n}\n@media(max-width:800px){\n  .bc-dialog.bc-side{width:100%}\n  .bc-form input:not([type=radio]):not([type=checkbox]),.bc-form select{font-size:16px}\n  .bc-side .bc-content{padding:22px 20px 140px}\n  .bc-side .bc-close{top:10px;right:10px;width:44px;height:46px;margin-right:10px;margin-bottom:-46px}\n  .bc-dialog:not(.bc-side) .bc-close{width:34px;height:30px;margin-bottom:-30px}\n}\n#header>.bc-announcement{width:100%;height:36px;flex-shrink:0}.bc-native-notification-hidden{display:none!important}@media(max-width:800px){#header>.bc-announcement{height:32px;font-size:10px}}";document.head.appendChild(style);
window.BazarClubFormConfig={...(window.BazarClubFormConfig||{}),language:lang,announcement:true,announcementTarget:'#header',announcementReplace:false,hideNativeAnnouncement:true,useNativeShipping:true,replaceNewsletterLink:true,campaignBar:true,campaignBarTarget:'#main',campaignBarPlacement:'prepend',clubLogo:new URL('74f3863aba1807ce1bb718a3859357d6.png',root).href,campaignImage:image('desktop'),campaignImageMobile:image('mobile'),campaignImageSide:image('side'),assetData:Object.fromEntries(["27fd35683d78d84fcdfaf8210f4c3d90.png","3d4b1fd25f95056265f009b9eb76bdcc.png","44b74a0c9f480d3bef17d84790eb9edf.png","4b14242983f2fd1d1be93f3ea553e672.png","f2f7fb52b9cc797862f6ef2553ca9538.png"].map(n=>[n,new URL(n,root).href])),preview:demo,demoControls:false,...(demo?{reviewMode:true,autoPopupTest:true,userId:''}:{})};
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

(function () {
  'use strict';
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
  if (typeof module !== 'undefined' && module.exports) module.exports = {payload,clearValidity};
  if (typeof document === 'undefined' || window.BazarClubForm) return;
  const config = {workerUrl:'https://bzrac.peboys.workers.dev/membership/check',...(window.BazarClubFormConfig || {})};
  if (document.currentScript?.dataset.userId) config.userId=document.currentScript.dataset.userId;
  const i18n=window.BazarClubI18n;
  const lang=i18n?.language(config.language || document.currentScript?.dataset.shopLang || location.pathname.split('/')[1] || document.documentElement.lang) || 'pt';
  const tr=i18n?.create(lang) || (text=>text);
  const assetBase = new URL('assets/', document.currentScript?.src || location.href);
  const fonts=document.createElement('link'); fonts.rel='stylesheet'; fonts.href='https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@800&family=Montserrat:wght@400;500;600;700&display=swap';
  const fontsReady=new Promise(resolve=>{
    const timeout=setTimeout(resolve,3000);
    const done=()=>{clearTimeout(timeout);resolve();};
    fonts.onload=()=>Promise.all([document.fonts.load('400 13px Montserrat'),document.fonts.load('700 12px Montserrat')]).catch(()=>{}).finally(done);
    fonts.onerror=done;
  });
  document.head.appendChild(fonts);
  let dialog, opener, busy = false, pending = null, recognized = false, selectTab, artworkReady=Promise.resolve(), openRequest=0;
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
    result.querySelector('.bc-result-copy').textContent=active ? tr(member ? 'Já te reconhecemos como membro. ' : 'A tua adesão está confirmada. ')+tr('No dia 26 de novembro vais ter acesso antecipado + 5€ extra acumuláveis com os descontos da Black Friday. Vamos reconhecer a tua adesão neste dispositivo.') : tr('Recebemos o teu pedido. Se receberes um email de confirmação, segue as instruções para concluir a adesão. As vantagens ficam disponíveis quando a subscrição estiver ativa.');
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
      <button class="bc-close" type="button" aria-label="Fechar">×</button>
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
              <div class="bc-foot"><small>* Campos obrigatórios</small><a href="https://www.bzronline.com/pt/ajuda-e-condicoes/campanhas_663.html" target="_blank" rel="noopener">Condições da campanha</a></div>
            </form>
          </div>
          <div id="bc-member" role="tabpanel" aria-labelledby="bc-tab-member" hidden>
            <p>Introduz o email com que já subscreveste a newsletter, para te reconhecermos e veres as tuas vantagens.</p>
            <form class="bc-member-form bc-form">
              <label>E-mail *<input name="email" type="email" autocomplete="email" placeholder="Introduz o teu e-mail" required maxlength="254"></label>
              <button type="submit" class="bc-primary">CONFIRMAR</button>
            </form>
            <p class="bc-join-copy">Ainda não és membro? <a href="#bc-new" class="bc-join-link">Adere aqui</a>.</p>
          </div>
          <div class="bc-result" hidden>
            <h2 tabindex="-1"></h2>
            <div class="bc-result-note"><span aria-hidden="true">✉</span><p class="bc-result-copy"></p></div>
            <button type="button" class="bc-primary bc-continue">Continuar a comprar</button>
            <button type="button" class="bc-other">Usar outro email</button>
          </div>
          <p class="bc-status" role="status" aria-live="polite" aria-atomic="true"></p>
        </section>
      </div>`;
    document.body.appendChild(dialog);
    if(config.preview && !config.reviewMode){const note=document.createElement('p');note.className='bc-demo-notice';note.textContent='Demonstração — nenhum dado será enviado.';dialog.querySelector('.bc-content').prepend(note);}
    dialog.querySelector('.bc-date').textContent = config.campaignLabel || 'A 26 DE NOVEMBRO';
    dialog.querySelector('.bc-conditions').textContent = config.conditionsText || '*5€ extra em compras a partir de 119,90 €.';
    dialog.lang=lang;
    i18n?.localize(dialog,tr);
    if(config.privacyUrl)dialog.querySelector('.bc-consent a').href=config.privacyUrl;
    if(config.termsUrl)dialog.querySelector('.bc-foot a').href=config.termsUrl;
    const nativePrivacy=document.querySelector('footer a[href*="_666.html"]');
    const nativeTerms=document.querySelector('footer a[href*="_663.html"]');
    if(!config.privacyUrl && nativePrivacy)dialog.querySelector('.bc-consent a').href=nativePrivacy.href;
    if(!config.termsUrl && nativeTerms)dialog.querySelector('.bc-foot a').href=nativeTerms.href;
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
    dialog.addEventListener('close', () => { openRequest++; document.documentElement.classList.remove('bc-modal-open'); if (opener && opener.isConnected) opener.focus(); });
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
        if (config.preview) { if(config.reviewMode)status('A verificação estará disponível quando a campanha for ativada.');else showResult('member'); return; }
        const data=await checkMembership({email:form.elements.email.value.trim()});
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
      const language = document.querySelector('#lg option:checked');
      let params;
      try { params = payload(values, {country:country?.getAttribute('data-code') || country?.value, language:language?.getAttribute('data-name') || language?.value || country?.getAttribute('data-lg') || {pt:'Português',en:'English',es:'Español'}[lang], search:location.search}); }
      catch (err) { status(err.message); return; }
      if (config.preview) { if(config.reviewMode)status('A adesão estará disponível quando a campanha for ativada.');else {form.reset();showResult('new');} return; }
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
    const variant = mode === 'side' ? 'side' : 'desktop';
    if (campaign.dataset.variant === variant) return artworkReady;
    campaign.dataset.variant = variant;
    const picture = document.createElement('picture');
    const source = document.createElement('source');
    source.media = mode==='side' ? '(max-width: 0px)' : '(max-width: 800px)';
    source.srcset = config.campaignImageMobile || config.campaignImage || new URL('bazarclub-'+lang+'-mobile.png', assetBase).href;
    const img = document.createElement('img');
    img.className = 'bc-campaign-image';
    img.alt = config.campaignImageAlt || tr('BAZARclub. A 26 de novembro: acesso antecipado +5€ extra acumuláveis com os descontos da Black Friday. 5€ extra em compras a partir de 119,90 €.');
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
      img.src = (variant === 'side' ? config.campaignImageSide : '') || config.campaignImage || new URL('bazarclub-'+lang+'-' + variant + '.png', assetBase).href;
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
    else if (config.replaceNewsletterLink && e.target.closest('a[href*="newsletter_7.html"]')) { e.preventDefault(); window.BazarClubForm.open('popup'); }
  });
  const ANNOUNCEMENT_MARKUP = "<div class=\"bzr-tk\"><span style=\"display: inline-flex; align-items: center; gap: 40px; padding-right: 40px; white-space: nowrap\"><span style=\"display: inline-flex; align-items: center; gap: 8px\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#EF4036\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 12V4h8l10 10-8 8z\"></path><circle cx=\"7.5\" cy=\"8.5\" r=\"1.4\"></circle></svg><span style=\"color: #EF4036\">BLACK FRIDAY AQUECIMENTO · OS MEMBROS BAZARCLUB COMPRAM A 26</span></span><span aria-hidden=\"true\" style=\"color: #6B6B6B\">•</span></span><span style=\"display: inline-flex; align-items: center; gap: 40px; padding-right: 40px; white-space: nowrap\"><span style=\"display: inline-flex; align-items: center; gap: 8px\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M2 6h12v10H2zM14 10h4l3 3v3h-7\"></path><circle cx=\"6\" cy=\"18\" r=\"1.8\"></circle><circle cx=\"17\" cy=\"18\" r=\"1.8\"></circle></svg>ENVIO GRÁTIS ACIMA DE 69,90€ · ENTREGA EM 1 A 3 DIAS ÚTEIS</span><span aria-hidden=\"true\" style=\"color: #6B6B6B\">•</span></span><span style=\"display: inline-flex; align-items: center; gap: 40px; padding-right: 40px; white-space: nowrap\"><span style=\"display: inline-flex; align-items: center; gap: 8px\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 9h11a5 5 0 0 1 0 10H8\"></path><path d=\"M8 5L4 9l4 4\"></path></svg>TROCAS ALARGADAS ATÉ 4 DE JANEIRO</span><span aria-hidden=\"true\" style=\"color: #6B6B6B\">•</span></span><span style=\"display: inline-flex; align-items: center; gap: 40px; padding-right: 40px; white-space: nowrap\"><span style=\"display: inline-flex; align-items: center; gap: 8px\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 10v10h16V10\"></path><path d=\"M3 10l2-6h14l2 6z\"></path><path d=\"M10 20v-5h4v5\"></path></svg>LEVANTAMENTO GRATUITO EM LOJA</span><span aria-hidden=\"true\" style=\"color: #6B6B6B\">•</span></span><span style=\"display: inline-flex; align-items: center; gap: 40px; padding-right: 40px; white-space: nowrap\"><span style=\"display: inline-flex; align-items: center; gap: 8px\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"2.5\" y=\"5\" width=\"19\" height=\"14\" rx=\"2\"></rect><path d=\"M2.5 10h19M6 15h4\"></path></svg><span style=\"display: inline-flex; align-items: center; gap: 6px\">PAGAMENTOS EM PRESTAÇÕES COM<img src=\"./assets/4b14242983f2fd1d1be93f3ea553e672.png\" alt=\"Klarna\" style=\"height: 18px; display: block\"></span></span><span aria-hidden=\"true\" style=\"color: #6B6B6B\">•</span></span><span style=\"display: inline-flex; align-items: center; gap: 40px; padding-right: 40px; white-space: nowrap\"><span style=\"display: inline-flex; align-items: center; gap: 8px\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"5\" y=\"11\" width=\"14\" height=\"10\" rx=\"2\"></rect><path d=\"M8 11V7a4 4 0 0 1 8 0v4\"></path></svg><span style=\"display: inline-flex; align-items: center; gap: 6px\">PAGAMENTOS SEGUROS:<span style=\"display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; height: 18px; background: #FFFFFF; border-radius: 4px; padding: 0 6px\"><img src=\"./assets/3d4b1fd25f95056265f009b9eb76bdcc.png\" alt=\"MB WAY\" style=\"height: 13px; display: block\"></span><span style=\"display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; height: 18px; background: #FFFFFF; border-radius: 4px; padding: 0 6px\"><img src=\"./assets/f2f7fb52b9cc797862f6ef2553ca9538.png\" alt=\"Multibanco\" style=\"height: 11px; display: block\"></span><span style=\"display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; height: 18px; background: #FFFFFF; border-radius: 4px; padding: 0 6px\"><img src=\"./assets/44b74a0c9f480d3bef17d84790eb9edf.png\" alt=\"Visa\" style=\"height: 8px; display: block\"></span><span style=\"display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; height: 18px; background: #FFFFFF; border-radius: 4px; padding: 0 6px\"><img src=\"./assets/27fd35683d78d84fcdfaf8210f4c3d90.png\" alt=\"PayPal\" style=\"height: 12px; display: block\"></span><span>…</span></span></span><span aria-hidden=\"true\" style=\"color: #6B6B6B\">•</span></span><span style=\"display: inline-flex; align-items: center; gap: 40px; padding-right: 40px; white-space: nowrap\"><span style=\"display: inline-flex; align-items: center; gap: 8px\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#EF4036\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 12V4h8l10 10-8 8z\"></path><circle cx=\"7.5\" cy=\"8.5\" r=\"1.4\"></circle></svg><span style=\"color: #EF4036\">BLACK FRIDAY AQUECIMENTO · OS MEMBROS BAZARCLUB COMPRAM A 26</span></span><span aria-hidden=\"true\" style=\"color: #6B6B6B\">•</span></span><span style=\"display: inline-flex; align-items: center; gap: 40px; padding-right: 40px; white-space: nowrap\"><span style=\"display: inline-flex; align-items: center; gap: 8px\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M2 6h12v10H2zM14 10h4l3 3v3h-7\"></path><circle cx=\"6\" cy=\"18\" r=\"1.8\"></circle><circle cx=\"17\" cy=\"18\" r=\"1.8\"></circle></svg>ENVIO GRÁTIS ACIMA DE 69,90€ · ENTREGA EM 1 A 3 DIAS ÚTEIS</span><span aria-hidden=\"true\" style=\"color: #6B6B6B\">•</span></span><span style=\"display: inline-flex; align-items: center; gap: 40px; padding-right: 40px; white-space: nowrap\"><span style=\"display: inline-flex; align-items: center; gap: 8px\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 9h11a5 5 0 0 1 0 10H8\"></path><path d=\"M8 5L4 9l4 4\"></path></svg>TROCAS ALARGADAS ATÉ 4 DE JANEIRO</span><span aria-hidden=\"true\" style=\"color: #6B6B6B\">•</span></span><span style=\"display: inline-flex; align-items: center; gap: 40px; padding-right: 40px; white-space: nowrap\"><span style=\"display: inline-flex; align-items: center; gap: 8px\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 10v10h16V10\"></path><path d=\"M3 10l2-6h14l2 6z\"></path><path d=\"M10 20v-5h4v5\"></path></svg>LEVANTAMENTO GRATUITO EM LOJA</span><span aria-hidden=\"true\" style=\"color: #6B6B6B\">•</span></span><span style=\"display: inline-flex; align-items: center; gap: 40px; padding-right: 40px; white-space: nowrap\"><span style=\"display: inline-flex; align-items: center; gap: 8px\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"2.5\" y=\"5\" width=\"19\" height=\"14\" rx=\"2\"></rect><path d=\"M2.5 10h19M6 15h4\"></path></svg><span style=\"display: inline-flex; align-items: center; gap: 6px\">PAGAMENTOS EM PRESTAÇÕES COM<img src=\"./assets/4b14242983f2fd1d1be93f3ea553e672.png\" alt=\"Klarna\" style=\"height: 18px; display: block\"></span></span><span aria-hidden=\"true\" style=\"color: #6B6B6B\">•</span></span><span style=\"display: inline-flex; align-items: center; gap: 40px; padding-right: 40px; white-space: nowrap\"><span style=\"display: inline-flex; align-items: center; gap: 8px\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"5\" y=\"11\" width=\"14\" height=\"10\" rx=\"2\"></rect><path d=\"M8 11V7a4 4 0 0 1 8 0v4\"></path></svg><span style=\"display: inline-flex; align-items: center; gap: 6px\">PAGAMENTOS SEGUROS:<span style=\"display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; height: 18px; background: #FFFFFF; border-radius: 4px; padding: 0 6px\"><img src=\"./assets/3d4b1fd25f95056265f009b9eb76bdcc.png\" alt=\"MB WAY\" style=\"height: 13px; display: block\"></span><span style=\"display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; height: 18px; background: #FFFFFF; border-radius: 4px; padding: 0 6px\"><img src=\"./assets/f2f7fb52b9cc797862f6ef2553ca9538.png\" alt=\"Multibanco\" style=\"height: 11px; display: block\"></span><span style=\"display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; height: 18px; background: #FFFFFF; border-radius: 4px; padding: 0 6px\"><img src=\"./assets/44b74a0c9f480d3bef17d84790eb9edf.png\" alt=\"Visa\" style=\"height: 8px; display: block\"></span><span style=\"display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; height: 18px; background: #FFFFFF; border-radius: 4px; padding: 0 6px\"><img src=\"./assets/27fd35683d78d84fcdfaf8210f4c3d90.png\" alt=\"PayPal\" style=\"height: 12px; display: block\"></span><span>…</span></span></span><span aria-hidden=\"true\" style=\"color: #6B6B6B\">•</span></span></div>";
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
      const name=img.getAttribute('src').split('/').pop();
      img.src = config.assetData?.[name] || new URL(name, assetBase).href;
    });
    const track = bar.firstElementChild;
    track.className = 'bc-announcement-track';
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
          const alignMain=()=>main.style.setProperty('margin-top',Math.max(0,target.getBoundingClientRect().height-parseFloat(getComputedStyle(main).paddingTop))+'px','important');
          alignMain();
          new ResizeObserver(alignMain).observe(target);
        }
        document.documentElement.classList.add('bc-top-announcement');
      }
    }
    else console.warn('[BAZARclub] Local da barra não encontrado.');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountAnnouncement, {once:true});
  else mountAnnouncement();
  window.dispatchEvent(new CustomEvent('bazarclub:ready'));
})();

(function(){
  'use strict';
  const copy={
    pt:{label:'Campanha BAZARclub',join:'Torna-te membro aqui',member:'Vê as tuas vantagens',warmup:'acesso antecipado a 26 de novembro + 5€ extra acumuláveis.',eve:'acesso antecipado já amanhã + 5€ extra acumuláveis.',early:'acesso antecipado hoje + 5€ extra acumuláveis.',blackfriday:'Black Friday + 5€ extra acumuláveis com os descontos.',final:'Black Friday: aproveita os descontos + 5€ extra acumuláveis.',demo:'Demonstração · textos das fases propostos para revisão',phase:'Fase da campanha',language:'Idioma',date:'Data simulada',phases:['1 a 25 novembro','26 novembro','27 a 29 novembro','30 novembro']},
    en:{label:'BAZARclub campaign',join:'Become a member here',member:'See your benefits',warmup:'early access on 26 November + an extra €5 you can combine with discounts.',eve:'early access starts tomorrow + an extra €5 you can combine with discounts.',early:'early access today + an extra €5 you can combine with discounts.',blackfriday:'Black Friday + an extra €5 you can combine with discounts.',final:'Black Friday: enjoy the discounts + an extra €5.',demo:'Demo · proposed campaign messages for review',phase:'Campaign phase',language:'Language',date:'Simulated date',phases:['1–25 November','26 November','27–29 November','30 November']},
    es:{label:'Campaña BAZARclub',join:'Hazte miembro aquí',member:'Consulta tus ventajas',warmup:'acceso anticipado el 26 de noviembre + 5€ extra acumulables.',eve:'acceso anticipado mañana + 5€ extra acumulables.',early:'acceso anticipado hoy + 5€ extra acumulables.',blackfriday:'Black Friday + 5€ extra acumulables con los descuentos.',final:'Black Friday: disfruta de los descuentos + 5€ extra acumulables.',demo:'Demostración · textos de las fases propuestos para revisión',phase:'Fase de la campaña',language:'Idioma',date:'Fecha simulada',phases:['1–25 de noviembre','26 de noviembre','27–29 de noviembre','30 de noviembre']}
  };
  function lisbonDate(date=new Date()){
    const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Lisbon',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(date);
    const get=type=>parts.find(p=>p.type===type).value;return get('year')+'-'+get('month')+'-'+get('day');
  }
  function phase(date){
    if(!/^2026-11-\d{2}$/.test(date))return null;
    const day=Number(date.slice(-2));
    return day>=1 && day<=25 ? 'warmup' : day===26 ? 'early' : day>=27 && day<=29 ? 'blackfriday' : day===30 ? 'final' : null;
  }
  function message(date,lang='pt',member=false){const key=phase(date),t=copy[lang]||copy.pt;return key?{phase:key,text:t[date==='2026-11-25'?'eve':key],cta:member?t.member:t.join}:null;}
  function install(w){
    const d=w.document,config=w.BazarClubFormConfig||{};
    if(!config.campaignBar || d.querySelector('[data-bazarclub-campaign-bar]'))return;
    const tr=copy[config.language]||copy.pt;
    const demo=config.preview===true || config.reviewMode===true;
    const params=new URLSearchParams(w.location.search);
    let simulated=demo?(params.get('bf-date')||(config.reviewMode?'2026-11-01':'2026-11-25')):null,member=w.BazarClubForm?.isMember?.()===true;
    let target=config.campaignBarTarget?d.querySelector(config.campaignBarTarget):null;
    if(!target)return; // O local de inserção deve ser confirmado na loja; não adivinhar um menu.
    const bar=d.createElement('div');bar.className='bc-campaign-bar';bar.dataset.bazarclubCampaignBar='';bar.setAttribute('role','region');bar.setAttribute('aria-label',tr.label);
    const link=d.createElement('a');link.className='bc-campaign-bar-link';link.href='#abrir-bf-lateral';
    const badge=d.createElement('span');badge.className='bc-campaign-badge';
    if(config.clubLogo){const img=d.createElement('img');img.src=config.clubLogo;img.alt='BAZARclub';badge.appendChild(img);}else badge.textContent='BAZARclub';
    const text=d.createElement('span');text.className='bc-campaign-message';
    const cta=d.createElement('span');cta.className='bc-campaign-cta';
    const arrow=d.createElement('span');arrow.className='bc-campaign-arrow';arrow.textContent='⟶';arrow.setAttribute('aria-hidden','true');
    const messageGroup=d.createElement('span');messageGroup.className='bc-campaign-message-group';messageGroup.append(text,d.createTextNode(' '),cta);
    link.append(badge,messageGroup,arrow);bar.appendChild(link);
    if(config.campaignBarPlacement==='prepend')target.prepend(bar);else target.insertAdjacentElement('afterend',bar);
    function render(){
      const value=message(simulated||lisbonDate(new Date()),config.language,member);
      bar.hidden=!value;if(!value)return;
      bar.dataset.phase=value.phase;text.textContent=value.text;cta.textContent=value.cta;
      link.href=member && config.campaignUrl ? config.campaignUrl : '#abrir-bf-lateral';
    }
    w.addEventListener('bazarclub:membership',e=>{member=e.detail?.subscribed===true;render();});
    render();
    // Atualizar fases também quando a página fica aberta à meia-noite.
    w.setInterval(render,30000);d.addEventListener('visibilitychange',render);
    if(demo && config.demoControls!==false){
      const controls=d.createElement('div');controls.className='bc-campaign-demo';
      const note=d.createElement('small');note.textContent=tr.demo;controls.appendChild(note);
      const phaseLabel=d.createElement('label');phaseLabel.textContent=tr.phase+' ';
      const select=d.createElement('select');
      ['2026-11-25','2026-11-26','2026-11-27','2026-11-30'].forEach((value,index)=>{const option=d.createElement('option');option.value=value;option.textContent=tr.phases[index];select.appendChild(option);});
      select.value={warmup:'2026-11-25',early:'2026-11-26',blackfriday:'2026-11-27',final:'2026-11-30'}[phase(simulated)]||'2026-11-25';
      phaseLabel.appendChild(select);controls.appendChild(phaseLabel);
      const dateLabel=d.createElement('label');dateLabel.textContent=tr.date+' ';
      const input=d.createElement('input');input.type='date';input.min='2026-11-01';input.max='2026-11-30';input.value=simulated;dateLabel.appendChild(input);controls.appendChild(dateLabel);
      function simulate(value){if(!phase(value))return;simulated=value;input.value=value;select.value={warmup:'2026-11-25',early:'2026-11-26',blackfriday:'2026-11-27',final:'2026-11-30'}[phase(value)];render();}
      select.addEventListener('change',()=>simulate(select.value));input.addEventListener('change',()=>simulate(input.value));
      const languageLabel=d.createElement('label');languageLabel.textContent=tr.language+' ';
      const languageSelect=d.createElement('select');for(const [value,label]of [['pt','PT'],['en','EN'],['es','ES']]){const option=d.createElement('option');option.value=value;option.textContent=label;languageSelect.appendChild(option);}languageSelect.value=config.language||'pt';languageLabel.appendChild(languageSelect);controls.appendChild(languageLabel);
      languageSelect.addEventListener('change',()=>{const url=new URL(w.location.href);url.searchParams.set('bf-lang',languageSelect.value);url.searchParams.set('bf-date',simulated);if(['www.bzronline.com','bzronline.com'].includes(url.hostname)){url.searchParams.set('nocache','1');url.searchParams.set('redicom','1');url.searchParams.set('preview','1');}w.location.assign(url.href);});
      bar.insertAdjacentElement('afterend',controls);
    }
  }
  if(typeof module!=='undefined'&&module.exports)module.exports={lisbonDate,phase,message,copy};
  if(typeof window!=='undefined'){
    const ready=()=>install(window);
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
  }
})();

})();
