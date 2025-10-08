window.addEventListener("DOMContentLoaded",function(){
  const AC_U="4",AC_F="4",AC_ACTION="https://bazardesportivo.activehosted.com/proc.php";
  const MAP={fullname:"cms_field_30",email:"cms_field_31",genero:"cms_field_33",tipo:"cms_field_156",consent:"cms_field_42",dob:"cms_field_64"};
  const AC_DOB_FIELD_NAME=null;

  const form=document.getElementById("cms_frm1899545180")||document.querySelector("form.cms_frm");
  if(!form){console.warn("Formulário não encontrado");return;}

  const msgOk=form.querySelector(".form-message .success");
  const msgErrDefault=form.querySelector(".form-message .error-default");
  const submitBtn=form.querySelector('button[type="submit"], .submit');

  function val(name){
    const el=form.querySelector('[name="'+name+'"]');
    if(!el) return "";
    if(el.type==="radio"){
      const checked=form.querySelector('[name="'+name+'"]:checked');
      return checked?checked.value:"";
    }
    if(el.type==="checkbox") return el.checked?(el.value||"1"):"";
    return (el.value||"").trim();
  }
  function showSuccess(){
    if(msgOk){
      msgOk.style.display="";
      window.scrollTo({top:msgOk.getBoundingClientRect().top+window.scrollY-120,behavior:"smooth"});
    }
  }
  function showError(){
    if(msgErrDefault){
      msgErrDefault.style.display="";
      window.scrollTo({top:msgErrDefault.getBoundingClientRect().top+window.scrollY-120,behavior:"smooth"});
    }
  }
  function setLoading(state){
    if(!submitBtn) return;
    submitBtn.classList.toggle("loader",!!state);
    submitBtn.disabled=!!state;
  }

  // iframe oculto + form para AC
  const iframeName="ac_iframe_"+Math.random().toString(36).slice(2);
  const iframe=document.createElement("iframe");
  iframe.name=iframeName;
  iframe.style.display="none";
  document.body.appendChild(iframe);

  const acForm=document.createElement("form");
  acForm.action=AC_ACTION;
  acForm.method="POST";
  acForm.target=iframeName;
  acForm.style.display="none";

  const hiddenPairs={u:AC_U,f:AC_F,s:"",c:"0",m:"0",act:"sub",v:"2"};
  Object.entries(hiddenPairs).forEach(function(entry){
    const key=entry[0], valx=entry[1];
    const inp=document.createElement("input");
    inp.type="hidden"; inp.name=key; inp.value=valx;
    acForm.appendChild(inp);
  });

  form.addEventListener("submit",function(evt){
    const emailVal=val(MAP.email);
    const consentVal=val(MAP.consent);
    const generoVal=val(MAP.genero);
    const tipoVal=val(MAP.tipo);
    const emailRx=/^[+_a-z0-9-'&=]+(\.[+_a-z0-9-']+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i;

    if(!emailVal||!emailRx.test(emailVal)||!consentVal||!generoVal||!tipoVal||tipoVal==="0"){
      showError();
      // se quiseres bloquear logo aqui, descomenta a próxima linha:
      // return evt.preventDefault();
    }

    evt.preventDefault();
    setLoading(true);

    // limpar e repor hidden
    while(acForm.firstChild){ acForm.removeChild(acForm.firstChild); }
    Object.entries(hiddenPairs).forEach(function(entry){
      const key=entry[0], valx=entry[1];
      const inp=document.createElement("input");
      inp.type="hidden"; inp.name=key; inp.value=valx;
      acForm.appendChild(inp);
    });

    function hid(name,value){
      const inp=document.createElement("input");
      inp.type="hidden"; inp.name=name; inp.value=value;
      acForm.appendChild(inp);
    }

    // campos AC
    hid("fullname",val(MAP.fullname));
    hid("email",emailVal);
    hid("field[13]",generoVal);
    hid("field[6]",tipoVal);

    if(AC_DOB_FIELD_NAME){
      const dobRaw=val(MAP.dob);
      if(dobRaw) hid(AC_DOB_FIELD_NAME,dobRaw);
    }

    // UTMs
    const params=new URLSearchParams(location.search);
    ["utm_source","utm_medium","utm_campaign","utm_term","utm_content"].forEach(function(k){
      const v=params.get(k); if(v) hid(k,v);
    });

    if(!acForm.parentNode){ document.body.appendChild(acForm); }

    function onLoadOnce(){
      iframe.removeEventListener("load",onLoadOnce);
      setLoading(false);
      showSuccess();
      try{ form.reset(); }catch(_){}
    }
    iframe.addEventListener("load",onLoadOnce);
    acForm.submit();
  });

  console.log("Integração ActiveCampaign.");
});
