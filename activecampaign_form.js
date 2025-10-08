window.addEventListener("DOMContentLoaded",function(){
  const AC_U="4", AC_F="4", AC_ACTION="https://bazardesportivo.activehosted.com/proc.php";
  const MAP={ fullname:"cms_field_30", email:"cms_field_31", genero:"cms_field_33", tipo:"cms_field_156", consent:"cms_field_42", dob:"cms_field_64" };
  const AC_DOB_FIELD_NAME=null;

  const form = document.getElementById("cms_frm1899545180")
            || document.getElementById("cms_frm2022765208")
            || document.querySelector("form.cms_frm");
  if(!form){ console.warn("Formulário não encontrado"); return; }

  function fval(name){
    const el=form.querySelector(`[name="${name}"]`);
    if(!el) return "";
    if(el.type==="radio"){
      const chk=form.querySelector(`[name="${name}"]:checked`);
      return chk?chk.value:"";
    }
    if(el.type==="checkbox") return el.checked?(el.value||"1"):"";
    return (el.value||"").trim();
  }
  const emailRx=/^[+_a-z0-9-'&=]+(\.[+_a-z0-9-']+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i;

  // Cria (uma vez) o iframe e o form oculto que falam com o AC
  const iframeName="ac_iframe_"+Math.random().toString(36).slice(2);
  const iframe=document.createElement("iframe");
  iframe.name=iframeName; iframe.style.display="none"; document.body.appendChild(iframe);

  const acForm=document.createElement("form");
  acForm.action=AC_ACTION; acForm.method="POST"; acForm.target=iframeName; acForm.style.display="none";
  document.body.appendChild(acForm);

  const hiddenBase={ u:AC_U, f:AC_F, s:"", c:"0", m:"0", act:"sub", v:"2" };

  function resetACForm(){
    acForm.innerHTML="";
    Object.entries(hiddenBase).forEach(([k,v])=>{
      const inp=document.createElement("input");
      inp.type="hidden"; inp.name=k; inp.value=v; acForm.appendChild(inp);
    });
  }
  function hid(name,value){
    const inp=document.createElement("input");
    inp.type="hidden"; inp.name=name; inp.value=value; acForm.appendChild(inp);
  }

  function sendToActiveCampaign(){
    const email=fval(MAP.email), consent=fval(MAP.consent), genero=fval(MAP.genero), tipo=fval(MAP.tipo);
    if(!email || !emailRx.test(email) || !consent || !genero || !tipo || tipo==="0"){ return; }

    resetACForm();

    // campos AC
    hid("fullname", fval(MAP.fullname));
    hid("email", email);
    // field[13] — “Pretendes receber newsletters de:”
    hid("field[13]", genero);
    // field[6] — “Que tipo de comunicação preferes?”
    hid("field[6]", tipo);

    if(AC_DOB_FIELD_NAME){
      const rawDob=fval(MAP.dob);
      if(rawDob) hid(AC_DOB_FIELD_NAME, rawDob);
    }

    // UTMs
    const params=new URLSearchParams(location.search);
    ["utm_source","utm_medium","utm_campaign","utm_term","utm_content"].forEach(k=>{
      const v=params.get(k); if(v) hid(k, v);
    });

    iframe.addEventListener("load", function onLoadOnce(){
      iframe.removeEventListener("load", onLoadOnce);
      console.log("ActiveCampaign: submissão concluída (iframe).");
    });
    acForm.submit();
  }

  form.addEventListener("submit", function(){ try{ sendToActiveCampaign(); }catch(err){ console.warn("AC error:", err); } }, true);
});
