/* =========================================================
   Contáser Contabilidade · script do site
   Dados de contato ficam em config.js (carregado antes deste).
   ========================================================= */
(function(){
  "use strict";
  var C = window.CONTASER || {};
  /* Com respeitarMovimentoReduzido: true, quem desligou as animações no sistema vê o site parado. */
  var reduce = !!C.respeitarMovimentoReduzido && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce) document.documentElement.classList.add("reduce-motion");
  var $ = function(s,c){return (c||document).querySelector(s)};
  var $$ = function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
  function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}

  /* ---------- ícones (traço 1.5, grade 24) ---------- */
  var P = {
    calc:'<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M16 14v4M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01"/>',
    receipt:'<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 17.5v-11"/>',
    users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    building:'<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2M10 6h4M10 10h4M10 14h4M10 18h4"/>',
    file:'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8"/>',
    trend:'<path d="M22 7 13.5 15.5 8.5 10.5 2 17"/><path d="M16 7h6v6"/>',
    shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    scale:'<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1ZM2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1ZM7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
    msg:'<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M8.5 10.5c.5 2 2 3.5 4 4l1.2-1.2 2 .8v1.6c-4 .4-8-3.6-7.6-7.6h1.6l.8 2Z" stroke-width="1.2"/>',
    phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    pin:'<path d="M20 10c0 4.99-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 14.99 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    arrow:'<path d="M5 12h14M12 5l7 7-7 7"/>',
    arrowur:'<path d="M7 7h10v10M7 17 17 7"/>',
    check:'<path d="M20 6 9 17l-5-5"/>',
    cal:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    store:'<path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4M2 7h20v3a2 2 0 0 1-2 2 2.7 2.7 0 0 1-2-1 2.7 2.7 0 0 1-2 1 2.7 2.7 0 0 1-2-1 2.7 2.7 0 0 1-2 1 2.7 2.7 0 0 1-2-1 2.7 2.7 0 0 1-2 1 2.7 2.7 0 0 1-2-1 2.7 2.7 0 0 1-2 1 2 2 0 0 1-2-2Z"/>',
    brief:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    factory:'<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1M12 18h1M7 18h1"/>',
    sprout:'<path d="M7 20h10M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8zM14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>',
    user:'<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
    copy:'<rect x="8" y="8" width="14" height="14" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    refresh:'<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16M8 16H3v5"/>',
    book:'<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    award:'<circle cx="12" cy="8" r="6"/><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11"/>',
    home:'<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .71-1.53l7-6a2 2 0 0 1 2.58 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    folder:'<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
    swap:'<path d="m16 3 4 4-4 4M20 7H4M8 21l-4-4 4-4M4 17h16"/>',
    play:'<path d="M6 3 20 12 6 21Z"/>',
    pause:'<rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/>',
    lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    percent:'<path d="M19 5 5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>'
  };
  var MARK = '<path d="M85.2 18.71A48.26 45.88 0 1 0 92.26 72.08L80.21 65.68A34.76 32.53 0 1 1 74.96 27.44Z"/><path d="M42.48 11.4H53.08L47.68 87.4H37.08Z"/><path d="M6 43.6H31V56.7H6Z"/>';
  var sprite = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
    '<symbol id="mark" viewBox="0 0 100 100"><g fill="currentColor">' + MARK + '</g></symbol>' +
    Object.keys(P).map(function(k){return '<symbol id="i-'+k+'" viewBox="0 0 24 24"><g class="ic">'+P[k]+'</g></symbol>'}).join("") +
    '</defs></svg>';
  function injectSprite(){ if(!document.getElementById("mark")) document.body.insertAdjacentHTML("afterbegin", sprite); }

  /* ---------- toast ---------- */
  function toast(html){
    var box=$("#toasts"); if(!box){box=document.createElement("div");box.id="toasts";box.className="toasts";box.setAttribute("aria-live","polite");document.body.appendChild(box)}
    var t=document.createElement("div");t.className="toast";
    t.innerHTML='<span class="ti"><svg><use href="#i-check"/></svg></span><span>'+html+'</span>';
    box.appendChild(t);setTimeout(function(){t.classList.add("out");setTimeout(function(){t.remove()},400)},2800);
  }

  /* ---------- dados de contato ---------- */
  function waLink(text){ return "https://wa.me/"+C.whatsapp+"?text="+encodeURIComponent(text||C.mensagemWhatsapp); }
  function applyConfig(){
    $$("[data-wa]").forEach(function(a){
      if(C.whatsapp){ a.href=waLink(a.getAttribute("data-wa")||""); a.target="_blank"; a.rel="noopener"; }
      else { a.href = a.getAttribute("data-wa-fallback") || "contato.html#formulario"; }
    });
    $$(".wa-float").forEach(function(a){ a.hidden = !C.whatsapp; });
    ["email","horario","crc","whatsapp"].forEach(function(k){
      var v=C[k];
      $$('[data-cfg="'+k+'"]').forEach(function(el){
        var shown = k==="whatsapp" && v ? "+"+v.replace(/^(\d{2})(\d{2})(\d{4,5})(\d{4})$/,"$1 ($2) $3-$4") : v;
        if(el.tagName==="A"){ el.textContent=shown; el.href = k==="email" ? "mailto:"+v : (k==="whatsapp"? waLink() : el.href); }
        else el.textContent=shown;
      });
      $$('[data-cfg-wrap="'+k+'"]').forEach(function(el){ el.hidden=!v; });
    });
    ["areaCliente","webmail"].forEach(function(k){
      $$('[data-href="'+k+'"]').forEach(function(a){ if(C[k]){a.href=C[k];a.target="_blank";a.rel="noopener";a.hidden=false} else a.hidden=true; });
    });
  }

  /* ---------- menu ---------- */
  function initMenu(){
    var page=document.body.getAttribute("data-page");
    $$(".menu a").forEach(function(a){ if(a.getAttribute("data-p")===page) a.setAttribute("aria-current","page"); });
    var b=$(".burger"); if(!b) return;
    b.addEventListener("click",function(){ var o=document.documentElement.classList.toggle("nav-open"); b.setAttribute("aria-expanded",o); });
    $$(".menu a").forEach(function(a){a.addEventListener("click",function(){document.documentElement.classList.remove("nav-open");b.setAttribute("aria-expanded","false")})});
    document.addEventListener("keydown",function(e){ if(e.key==="Escape"){document.documentElement.classList.remove("nav-open");b.setAttribute("aria-expanded","false")} });
  }

  /* ---------- rolagem: progresso, linha do tempo, índice ---------- */
  function initScroll(){
    var prog=$(".progress"), tl=$(".tl"), tlLine=tl&&$(".tl-line i",tl), items=tl?$$(".tl-item",tl):[];
    var idx=$$(".svc-index a"), secs=idx.map(function(a){return document.querySelector(a.getAttribute("href"))});
    var ticking=false;
    function run(){
      ticking=false;
      var max=document.documentElement.scrollHeight-innerHeight; if(prog) prog.style.transform="scaleX("+(max>0?scrollY/max:0)+")";
      if(tl){ var r=tl.getBoundingClientRect(),mid=innerHeight*.62,p=Math.max(0,Math.min(1,(mid-r.top)/r.height)); tlLine.style.setProperty("--p",p);
        items.forEach(function(it){ it.classList.toggle("act", it.getBoundingClientRect().top+30<mid) }); }
      if(idx.length){ var cur=0; secs.forEach(function(s,i){ if(s && s.getBoundingClientRect().top<innerHeight*.4) cur=i }); idx.forEach(function(a,i){a.classList.toggle("on",i===cur)}); }
    }
    addEventListener("scroll",function(){ if(!ticking){ticking=true;requestAnimationFrame(run)} },{passive:true});
    addEventListener("resize",run); run();
  }

  /* ---------- entrada e contadores ---------- */
  function initReveal(){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){ if(e.isIntersecting){e.target.classList.remove("pending");e.target.classList.add("in");io.unobserve(e.target)} })},{threshold:.12,rootMargin:"0px 0px -6% 0px"});
    $$(".reveal").forEach(function(el){ if(!reduce && el.getBoundingClientRect().top>innerHeight){ el.classList.add("pending"); io.observe(el); } });
    var cio=new IntersectionObserver(function(es){es.forEach(function(e){ if(!e.isIntersecting) return; var el=e.target,to=+el.getAttribute("data-count"),t0=null;
      cio.unobserve(el); if(reduce) return;
      (function step(t){ if(!t0)t0=t; var p=Math.min((t-t0)/1600,1),v=Math.round(to*(p===1?1:1-Math.pow(2,-10*p))); el.textContent=v; if(p<1)requestAnimationFrame(step) })(performance.now()); })},{threshold:.6});
    $$("[data-count]").forEach(function(el){cio.observe(el)});
  }

  /* ---------- micro-interações ---------- */
  function initFx(){
    $$(".spot").forEach(function(el){el.addEventListener("pointermove",function(e){var r=el.getBoundingClientRect();el.style.setProperty("--mx",(e.clientX-r.left)+"px");el.style.setProperty("--my",(e.clientY-r.top)+"px")})});
    if(!reduce && matchMedia("(pointer:fine)").matches){
      $$("[data-magnetic]").forEach(function(el){
        el.addEventListener("pointermove",function(e){var r=el.getBoundingClientRect();el.style.transform="translate("+((e.clientX-r.left-r.width/2)*.25)+"px,"+((e.clientY-r.top-r.height/2)*.25)+"px)"});
        el.addEventListener("pointerleave",function(){el.style.transform=""});
      });
    }
    $$("[data-copy]").forEach(function(b){ b.addEventListener("click",function(){
      var txt=b.getAttribute("data-copy"); var ok=function(){toast("Copiado: <b>"+txt+"</b>")};
      try{ navigator.clipboard.writeText(txt).then(ok,function(){toast(txt)}) }catch(e){ toast(txt) }
    })});
    var v=$("[data-video]"),vt=$("[data-video-toggle]");
    if(v&&vt){
      if(reduce){v.removeAttribute("autoplay");v.pause()}
      var label=function(){vt.innerHTML=v.paused?'<svg><use href="#i-play"/></svg> Reproduzir':'<svg><use href="#i-pause"/></svg> Pausar'};
      vt.addEventListener("click",function(){ if(v.paused){delete v.dataset.userPaused;v.play()}else{v.dataset.userPaused="1";v.pause()} label() }); v.addEventListener("play",label); v.addEventListener("pause",label); label();
    }
  }

  /* ---------- abas ---------- */
  function initTabs(){
    $$("[data-tabs]").forEach(function(wrap){
      var ind=$(".ind",wrap),btns=$$("button",wrap);
      function place(b){ ind.style.width=b.offsetWidth+"px"; ind.style.transform="translateX("+b.offsetLeft+"px)"; }
      function sel(b){ btns.forEach(function(x){ var on=x===b; x.setAttribute("aria-selected",on); x.tabIndex=on?0:-1; var p=document.getElementById(x.getAttribute("aria-controls")); if(p)p.hidden=!on; }); place(b); }
      btns.forEach(function(b){ b.addEventListener("click",function(){sel(b)}) });
      wrap.addEventListener("keydown",function(e){ var i=btns.indexOf(document.activeElement); if(i<0)return; var n=null;
        if(e.key==="ArrowRight")n=btns[(i+1)%btns.length]; if(e.key==="ArrowLeft")n=btns[(i-1+btns.length)%btns.length]; if(n){e.preventDefault();n.focus();sel(n)} });
      var init=function(){ place(btns.filter(function(b){return b.getAttribute("aria-selected")==="true"})[0]||btns[0]) };
      init(); addEventListener("resize",init); if(document.fonts&&document.fonts.ready)document.fonts.ready.then(init);
    });
  }

  /* ---------- formulário de contato ---------- */
  function initForm(){
    var f=$("#form-contato"); if(!f) return;
    var ok=$("#form-ok"), btn=$("button[type=submit]",f), tel=$("#f-telefone");
    tel.addEventListener("input",function(){ var d=tel.value.replace(/\D/g,"").slice(0,11),o=d;
      if(d.length>2)o="("+d.slice(0,2)+") "+d.slice(2);
      if(d.length>6)o="("+d.slice(0,2)+") "+d.slice(2,d.length-4)+"-"+d.slice(-4);
      tel.value=o; });
    $$(".field input,.field textarea",f).forEach(function(i){ i.addEventListener("input",function(){ i.closest(".field").classList.remove("err") }) });
    $("#f-lgpd").addEventListener("change",function(){ $("#lgpd").classList.remove("err") });
    var pre=(location.hash.match(/assunto-([a-z-]+)/)||[])[1]; if(pre){ var r=$('input[value="'+pre+'"]',f); if(r) r.checked=true; var card=$("#formulario"); if(card) setTimeout(function(){card.scrollIntoView({block:"start"})},50); }
    f.addEventListener("submit",function(e){
      e.preventDefault(); var bad=false;
      $$("[data-req]",f).forEach(function(fl){ var v=$("input,textarea",fl).value.trim(); var fail=!v||(fl.hasAttribute("data-phone")&&v.replace(/\D/g,"").length<10); fl.classList.toggle("err",fail); if(fail)bad=true });
      if(!$("#f-lgpd").checked){ $("#lgpd").classList.add("err"); bad=true }
      if(bad){ var first=$(".err input,.err textarea",f)||$("#f-lgpd"); first.focus(); toast("Revise os campos destacados."); return }
      var assunto=$("input[name=assunto]:checked",f), assuntoTxt=assunto?assunto.nextElementSibling.textContent:"Contato";
      var txt="Olá, Contáser!\n\nNome: "+$("#f-nome").value.trim()+"\nEmpresa: "+($("#f-empresa").value.trim()||"-")+"\nTelefone: "+tel.value+"\nAssunto: "+assuntoTxt+"\n\n"+($("#f-mensagem").value.trim()||"");
      function done(title,text){ btn.classList.remove("loading"); $("#form-ok-title").textContent=title; $("#form-ok-text").textContent=text; f.hidden=true; ok.hidden=false; ok.focus(); }
      if(!C.formEndpoint && !C.whatsapp && !C.email){ toast("Formulário ainda não configurado. Ligue para "+C.telefone+"."); return; }
      btn.classList.add("loading");
      if(C.formEndpoint){
        var data={nome:$("#f-nome").value.trim(),empresa:$("#f-empresa").value.trim(),telefone:tel.value,assunto:assuntoTxt,mensagem:$("#f-mensagem").value.trim(),_subject:"Contato pelo site: "+assuntoTxt};
        fetch(C.formEndpoint,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(data)})
          .then(function(r){ if(!r.ok) throw 0; done("Mensagem enviada","Um contador vai responder em breve."); })
          .catch(function(){ btn.classList.remove("loading"); toast("Não foi possível enviar agora. Tente de novo ou ligue para "+C.telefone+"."); });
        return;
      }
      if(C.whatsapp){ window.open(waLink(txt),"_blank","noopener"); done("Mensagem pronta","Abrimos o WhatsApp com a sua mensagem. É só tocar em enviar."); }
      else { location.href="mailto:"+C.email+"?subject="+encodeURIComponent("Contato pelo site: "+assuntoTxt)+"&body="+encodeURIComponent(txt); done("Mensagem pronta","Abrimos o seu e-mail com a mensagem. É só enviar."); }
    });
    var again=$("#form-again"); if(again) again.addEventListener("click",function(){ f.reset(); f.hidden=false; ok.hidden=true; });
  }

  /* ---------- cookies ---------- */
  function initCookies(){
    var bar=$(".cookie"); if(!bar) return;
    if(store("contaser-cookies")) return;
    bar.hidden=false; document.documentElement.classList.add("has-cookie");
    $$("[data-cookie]",bar).forEach(function(b){ b.addEventListener("click",function(){ store("contaser-cookies",b.getAttribute("data-cookie")); bar.hidden=true; document.documentElement.classList.remove("has-cookie"); }) });
  }

  /* =========================================================
     ESFERAS DE VIDRO — a vinheta da marca em código
     mode "logo": esferas sobem e formam o monograma
     mode "ambient": esferas flutuando ao fundo
     ========================================================= */
  var SPRITE=null;
  function sphereSprite(){
    if(SPRITE) return SPRITE;
    var s=document.createElement("canvas");s.width=s.height=128;var c=s.getContext("2d");
    var g=c.createRadialGradient(46,40,4,64,64,64);
    g.addColorStop(0,"#FFEAD4");g.addColorStop(.22,"#FFA955");g.addColorStop(.55,"#F57C1F");g.addColorStop(.85,"#D35E0A");g.addColorStop(1,"#9E420A");
    c.fillStyle=g;c.beginPath();c.arc(64,64,62,0,Math.PI*2);c.fill();
    var cau=c.createRadialGradient(84,96,2,84,96,34);cau.addColorStop(0,"rgba(255,214,160,.75)");cau.addColorStop(1,"rgba(255,214,160,0)");
    c.fillStyle=cau;c.beginPath();c.arc(64,64,62,0,Math.PI*2);c.fill();
    var sp=c.createRadialGradient(44,36,0,44,36,18);sp.addColorStop(0,"rgba(255,255,255,.95)");sp.addColorStop(.4,"rgba(255,255,255,.45)");sp.addColorStop(1,"rgba(255,255,255,0)");
    c.fillStyle=sp;c.beginPath();c.ellipse(44,36,20,15,-.6,0,Math.PI*2);c.fill();
    c.strokeStyle="rgba(255,236,214,.35)";c.lineWidth=2;c.beginPath();c.arc(64,64,60,Math.PI*.9,Math.PI*1.5);c.stroke();
    return SPRITE=s;
  }
  function markPoints(n){
    var S=400,o=document.createElement("canvas");o.width=o.height=S;var c=o.getContext("2d");
    c.fillStyle="#000";c.scale(4,4);
    MARK.match(/d="[^"]+"/g).forEach(function(d){c.fill(new Path2D(d.slice(3,-1)))});
    var data=c.getImageData(0,0,S,S).data,pts=[],step=6;
    for(var y=0;y<S;y+=step)for(var x=(y/step%2)*step/2;x<S;x+=step){ if(data[(Math.round(y)*S+Math.round(x))*4+3]>128) pts.push([x+(Math.random()-.5)*2,y+(Math.random()-.5)*2]) }
    for(var i=pts.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=pts[i];pts[i]=pts[j];pts[j]=t}
    return pts.slice(0,n);
  }
  function Spheres(cv,mode){
    var ctx=cv.getContext("2d"),host=cv.parentElement,DPR=Math.min(devicePixelRatio||1,2),W=0,H=0,sprite=sphereSprite();
    var parts=[],floaters=[],dust=[],mouse={x:-999,y:-999,on:false},state="form",stateT=0,t0=performance.now(),running=false,floor={x:0,y:0,w:0};
    function draw(x,y,r,a){ctx.globalAlpha=a;ctx.drawImage(sprite,x-r,y-r,r*2,r*2)}
    function layout(){
      var r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=Math.round(W*DPR);cv.height=Math.round(H*DPR);ctx.setTransform(DPR,0,0,DPR,0,0);
      if(mode==="logo"){ var L=Math.min(W,H)*.6,ox=(W-L)/2,oy=(H-L)/2-H*.03,k=L/400;
        parts.forEach(function(p){p.tx=ox+p.sx*k;p.ty=oy+p.sy*k;p.r=p.rb*k*1.05}); floor={x:W/2,y:oy+L+H*.06,w:L*.55}; }
    }
    function init(){
      var r=cv.getBoundingClientRect();W=r.width;H=r.height;
      if(mode==="logo"){
        parts=markPoints(W<460?520:640).map(function(p,i){return{sx:p[0],sy:p[1],x:Math.random()*W,y:H+Math.random()*H*.6,vx:0,vy:0,rb:4.4+Math.random()*4.2,ph:Math.random()*6.28,dl:i*1.5,tx:0,ty:0,r:5}});
        parts.sort(function(a,b){return a.rb-b.rb});
      }
      var nf=mode==="logo"?16:14;
      for(var i=0;i<nf;i++)floaters.push({x:Math.random()*W,y:Math.random()*H,r:mode==="logo"?4+Math.random()*16:8+Math.random()*34,z:.3+Math.random()*.7,vx:(Math.random()-.5)*.25,vy:-.08-Math.random()*.25,ph:Math.random()*6.28});
      for(var j=0;j<(mode==="logo"?90:50);j++)dust.push({x:Math.random()*W,y:Math.random()*H,r:.5+Math.random()*1.6,ph:Math.random()*6.28,s:.2+Math.random()*.6,o:Math.random()<.6});
      layout();
    }
    function scatter(cx,cy){
      state="scatter";stateT=performance.now();
      parts.forEach(function(p){var dx=p.x-(cx==null?W/2:cx),dy=p.y-(cy==null?H/2:cy),d=Math.sqrt(dx*dx+dy*dy)||1,f=8+Math.random()*10;p.vx+=dx/d*f+(Math.random()-.5)*4;p.vy+=dy/d*f+(Math.random()-.5)*4-3});
    }
    function frame(now){
      if(!running) return;
      var t=(now-t0)/1000; ctx.clearRect(0,0,W,H);
      if(mode==="logo"){
        var fm=state==="form"?Math.min(1,Math.max(0,(t-1.4)/1.5)):.2,g=ctx.createRadialGradient(floor.x,floor.y,0,floor.x,floor.y,floor.w);
        g.addColorStop(0,"rgba(120,60,20,"+(.22*fm)+")");g.addColorStop(1,"rgba(120,60,20,0)");
        ctx.save();ctx.translate(floor.x,floor.y);ctx.scale(1,.14);ctx.translate(-floor.x,-floor.y);ctx.globalAlpha=1;ctx.fillStyle=g;ctx.beginPath();ctx.arc(floor.x,floor.y,floor.w,0,Math.PI*2);ctx.fill();ctx.restore();
      }
      dust.forEach(function(d){d.y-=d.s*.3;d.x+=Math.sin(t*.5+d.ph)*.15;if(d.y<-4){d.y=H+4;d.x=Math.random()*W}
        ctx.globalAlpha=.3+.3*Math.sin(t*1.5+d.ph);ctx.fillStyle=d.o?"#F5A05A":"#FFFFFF";ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill()});
      var px=mouse.on?(mouse.x/W-.5):0,py=mouse.on?(mouse.y/H-.5):0;
      floaters.forEach(function(f){ if(f.z<.6){ f.x+=f.vx;f.y+=f.vy;if(f.y<-60){f.y=H+60;f.x=Math.random()*W} draw(f.x+Math.sin(t*.6+f.ph)*6-px*20*f.z,f.y-py*20*f.z,f.r*f.z,mode==="logo"?.35*f.z+.1:.5*f.z+.15) } });
      if(mode==="logo"){
        if(state==="scatter"&&now-stateT>900){state="form";t0=now-1600}
        var R=Math.min(W,H)*.14;
        for(var i=0;i<parts.length;i++){ var p=parts[i],ax=0,ay=0;
          if(state==="form"){ if((now-t0)>(600+p.dl)){ ax=(p.tx+Math.sin(t*1.1+p.ph)*1.6-p.x)*.028; ay=(p.ty+Math.cos(t*.9+p.ph)*1.6-p.y)*.028 } else { ay=-.02 } } else ay=.05;
          if(mouse.on){var dx=p.x-mouse.x,dy=p.y-mouse.y,d2=dx*dx+dy*dy;if(d2<R*R){var d=Math.sqrt(d2)||1,f=(1-d/R)*2.2;ax+=dx/d*f;ay+=dy/d*f}}
          p.vx=(p.vx+ax)*.86;p.vy=(p.vy+ay)*.86;p.x+=p.vx;p.y+=p.vy; draw(p.x,p.y,p.r,1);
        }
      }
      floaters.forEach(function(f){ if(f.z>=.6){ f.x+=f.vx*1.3;f.y+=f.vy*1.3;if(f.y<-80){f.y=H+80;f.x=Math.random()*W} draw(f.x+Math.sin(t*.5+f.ph)*8-px*40*f.z,f.y-py*40*f.z,f.r*f.z*1.3,mode==="logo"?.55:.9) } });
      ctx.globalAlpha=1; requestAnimationFrame(frame);
    }
    function still(){ ctx.clearRect(0,0,W,H); if(mode==="logo") parts.forEach(function(p){draw(p.tx,p.ty,p.r,1)}); else floaters.forEach(function(f){draw(f.x,f.y,f.r*f.z,.7)}); ctx.globalAlpha=1; }
    init();
    new ResizeObserver(function(){ layout(); if(reduce) still() }).observe(host);
    if(reduce){ still(); } else {
      running=true; requestAnimationFrame(frame);
      new IntersectionObserver(function(es){ var vis=es[0].isIntersecting; if(vis&&!running){running=true;requestAnimationFrame(frame)} else if(!vis) running=false; }).observe(host);
    }
    var tgt=mode==="logo"?cv:host;
    tgt.addEventListener("pointermove",function(e){var r=cv.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top;mouse.on=true});
    tgt.addEventListener("pointerleave",function(){mouse.on=false});
    if(mode==="logo"){ cv.addEventListener("click",function(e){ if(reduce)return; var r=cv.getBoundingClientRect(); scatter(e.clientX-r.left,e.clientY-r.top) }); }
    return {scatter:scatter};
  }

  /* =========================================================
     FIOS DE LUZ (WebGL) — fundo do hero da página inicial
     Feixes laranja que nascem à esquerda, se abrem para a direita,
     desviam do mouse e formam anéis conforme a rolagem.
     ========================================================= */
  function Strands(cv, opts){
    opts=opts||{};
    var L=!!opts.light;
    var gl=cv.getContext("webgl",{antialias:false,alpha:true,premultipliedAlpha:true})||cv.getContext("experimental-webgl");
    if(!gl){ cv.hidden=true; return; }
    var mobile=Math.min(screen.width||9999, innerWidth||9999)<768, LINES=mobile?30:45, SCALE=mobile?.6:1;
    var vs="attribute vec2 position;void main(){gl_Position=vec4(position,0.0,1.0);}";
    var fs=[
      "precision highp float;",
      "uniform vec2 u_res;uniform float u_time;uniform vec2 u_mouse;uniform float u_intro;uniform float u_burst;uniform float u_scroll;uniform float u_gain;uniform float u_hover;uniform vec3 u_pulse;",
      "float rnd(float n){return fract(sin(n)*43758.5453123);}",
      "void main(){",
      " vec2 uv=gl_FragCoord.xy/u_res.xy;"+(opts.mirror?" uv.x=1.0-uv.x;":"")+" vec2 p=uv; vec2 center=vec2("+(opts.cx||0.62).toFixed(2)+",0.5);",
      " vec2 m=u_mouse/u_res.xy; m.y=1.0-m.y;"+(opts.mirror?" m.x=1.0-m.x;":""),
      " vec3 col=vec3(0.0);",
      " float g1=max(0.0,1.0-distance(p,vec2(-0.1,0.5))); col+=vec3(0.16,0.06,0.02)*pow(g1,2.0)*"+(L?"0.12":"0.55")+"*u_intro;",
      " float g2=max(0.0,1.0-distance(p,vec2(1.08,0.35))); col+=vec3(0.13,0.05,0.02)*pow(g2,2.0)*"+(L?"0.1":"0.4")+";",
      " float pn=fract(sin(dot(p+u_time*0.015,vec2(12.9898,78.233)))*43758.5453); col+="+(L?"vec3(0.9,0.4,0.08)*pow(pn,90.0)*0.35":"vec3(1.0,0.8,0.6)*pow(pn,90.0)*0.22")+"*u_intro;",
      " float asp=u_res.x/u_res.y; vec2 dm2=(uv-m)*vec2(asp,1.0); float md=length(dm2);",
      " col+=vec3(1.0,0.45,0.10)*smoothstep(0.35,0.0,md)*"+(L?"0.06":"0.16")+"*u_hover*u_intro;",
      " col+=vec3(1.0,0.75,0.45)*smoothstep(0.012,0.0,md)*0.35*u_hover;",
      " vec2 pc=u_pulse.xy/u_res.xy; pc.y=1.0-pc.y;"+(opts.mirror?" pc.x=1.0-pc.x;":"")+" float pr=length((uv-pc)*vec2(asp,1.0)); float pt=u_pulse.z;",
      " col+=vec3(1.0,0.6,0.25)*smoothstep(0.03,0.0,abs(pr-pt*0.9))*(1.0-pt)*0.55;",
      " col+=vec3(1.0,0.5,0.15)*smoothstep(0.05,0.0,abs(pr-pt*0.55))*(1.0-pt)*0.3;",
      " float rad=distance(p,center); col+=vec3(0.20,0.08,0.02)*smoothstep(0.55,0.0,rad)*0.45*u_burst;",
      " float r1=abs(rad-(0.08+u_burst*0.26)); float r2=abs(rad-(0.18+u_burst*0.32));",
      " col+=vec3(1.0,0.62,0.30)*(smoothstep(0.035,0.0,r1)+smoothstep(0.05,0.0,r2))*0.2*u_burst;",
      " p.y+=sin(p.x*2.0-u_time*0.4)*0.15*p.x; p.x+=cos(p.y*1.5+u_time*0.3)*0.05;",
      " p.y+=sin((p.x+u_scroll*0.65)*8.0)*0.015*u_burst;",
      " for(float i=0.0;i<"+LINES+".0;i++){",
      "  float s=i/"+LINES+".0; float sp=0.05+rnd(s)*0.1; float ph=s*6.2831;",
      "  float li=clamp((u_intro-rnd(s+5.0)*0.4)*1.6,0.0,1.0); li=li*li*(3.0-2.0*li);",
      "  float spread=pow(p.x,1.2)*0.7*li;",
      "  float w1=sin(p.x*(1.8+rnd(s)*1.2)-u_time*sp+ph); float w2=cos(p.x*2.5+u_time*sp*0.7-ph*1.1);",
      "  float ew=sin((p.x*10.0)-u_time*2.0+s*14.0)*0.08*u_burst*pow(p.x,1.4);",
      "  float y=0.5+(w1*0.5+w2*0.3)*spread+ew;",
      "  vec2 lp=vec2(p.x,y); float dm=distance(lp,m); float hi=smoothstep(0.45,0.0,dm)*u_hover;",
      "  y+=(m.y-y)*hi*0.6*li+sin(dm*12.0-u_time*3.0)*0.04*hi;",
      "  float pd=abs(distance(lp,pc)-pt*0.9); y+=sin(pd*30.0)*0.03*smoothstep(0.12,0.0,pd)*(1.0-pt);",
      "  float cp=smoothstep(0.38,0.0,distance(vec2(p.x,y),center)); y+=(y-center.y)*cp*0.45*u_burst;",
      "  float d=abs(p.y-y); float th=0.001+p.x*0.005+u_burst*0.002; float it=0.0007/(d+th);",
      "  float fade=smoothstep(1.02,0.15,p.x)*mix(0.35,1.0,smoothstep(0.02,0.4,p.x));",
      "  float lf=smoothstep(u_intro*1.5,(u_intro*1.5)-0.35,p.x);",
      (L
        ? "  vec3 c=mix(vec3(0.78,0.28,0.03),vec3(0.96,0.49,0.12),rnd(s+1.0)); c=mix(c,vec3(1.0,0.62,0.30),rnd(s+2.0)*0.35); c+=vec3(0.3,0.12,0.02)*cp*u_burst;"
        : "  vec3 c=mix(vec3(0.72,0.24,0.03),vec3(0.96,0.49,0.12),rnd(s+1.0)); c=mix(c,vec3(1.0,0.74,0.45),rnd(s+2.0)*0.45); c+=vec3(1.0,0.8,0.55)*cp*u_burst*0.6; c+=vec3(1.0,0.92,0.82)*smoothstep(0.015,0.0,d)*0.45;"),
      (L ? "  float stroke=smoothstep(th*1.6+0.0012,0.0,d); col+=c*(stroke*0.55+it*0.18)*fade*lf*li;"
         : "  col+=c*it*fade*lf*li;"),
      " }",
      " col*=u_gain;",
      (L
        ? " col=min(col,vec3(1.0)); float a=clamp(max(max(col.r,col.g),col.b)*1.15,0.0,1.0); gl_FragColor=vec4(col*(a/max(max(max(col.r,col.g),col.b),0.0001)),a);"
        : " gl_FragColor=vec4(col,1.0);"),
      "}"].join("\n");
    function sh(t,s){var o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);return o}
    var pr=gl.createProgram(); gl.attachShader(pr,sh(gl.VERTEX_SHADER,vs)); gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,fs)); gl.linkProgram(pr);
    if(!gl.getProgramParameter(pr,gl.LINK_STATUS)){ cv.hidden=true; return; }
    gl.useProgram(pr);
    var b=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,b); gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
    var pa=gl.getAttribLocation(pr,"position"); gl.enableVertexAttribArray(pa); gl.vertexAttribPointer(pa,2,gl.FLOAT,false,0,0);
    var U={}; ["u_res","u_time","u_mouse","u_intro","u_burst","u_scroll","u_gain","u_hover","u_pulse"].forEach(function(k){U[k]=gl.getUniformLocation(pr,k)});
    var host=opts.host||cv.parentElement, W=0,H=0, mx=0,my=0,tx=0,ty=0, intro=reduce?1:0, t0=performance.now(), running=false, visible=true, burst=0;
    function size(){ var r=cv.getBoundingClientRect(); W=Math.max(1,Math.round(r.width*SCALE)); H=Math.max(1,Math.round(r.height*SCALE)); cv.width=W; cv.height=H; gl.viewport(0,0,W,H); if(!mx){mx=tx=W*.55;my=ty=H*.5} }
    size(); new ResizeObserver(size).observe(cv);
    var hover=0, hoverT=0, pulse={x:0,y:0,t:1};
    function pointAt(x,y){ var r=cv.getBoundingClientRect(); var sx=r.width?W/r.width:1, sy=r.height?H/r.height:1; return {x:(x-r.left)*sx, y:(y-r.top)*sy, inside: y>=r.top && y<=r.bottom && x>=r.left && x<=r.right}; }
    function track(x,y){ var hb=host.getBoundingClientRect(); var p=pointAt(x,y); tx=p.x; ty=p.y; hoverT = (y>=hb.top && y<=hb.bottom) ? 1 : 0; }
    addEventListener("pointermove",function(e){ track(e.clientX,e.clientY) },{passive:true});
    addEventListener("touchmove",function(e){ var t=e.touches[0]; if(t) track(t.clientX,t.clientY) },{passive:true});
    document.documentElement.addEventListener("pointerleave",function(){ hoverT=0 });
    host.addEventListener("pointerdown",function(e){ if(e.target.closest("a,button,video,input,textarea,label")) return; var p=pointAt(e.clientX,e.clientY); pulse={x:p.x,y:p.y,t:0}; track(e.clientX,e.clientY); });
    function progress(){ var r=host.getBoundingClientRect(); return Math.max(0,Math.min(1,(opts.burstFrom==="center" ? (innerHeight-r.top)/(innerHeight+r.height) : -r.top/Math.max(1,r.height)))); }
    function draw(now){
      var t=(now-t0)/1000;
      if(!reduce){ var k=Math.min(1,t/3.5); intro=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2; }
      var pgr=progress(); var target=opts.burstFrom==="center" ? Math.max(0,Math.sin(pgr*Math.PI))*0.9 : pgr*0.9;
      burst+=(target-burst)*.08;
      mx+=(tx-mx)*.08; my+=(ty-my)*.08; hover+=(hoverT-hover)*.05; if(pulse.t<1) pulse.t=Math.min(1,pulse.t+.012);
      gl.uniform1f(U.u_hover,hover); gl.uniform3f(U.u_pulse,pulse.x,pulse.y,pulse.t);
      gl.uniform2f(U.u_res,W,H); gl.uniform1f(U.u_time,reduce?8:t); gl.uniform2f(U.u_mouse,mx,my);
      gl.uniform1f(U.u_intro,intro); gl.uniform1f(U.u_burst,burst); gl.uniform1f(U.u_scroll,pgr); gl.uniform1f(U.u_gain,opts.gain||1);
      gl.drawArrays(gl.TRIANGLES,0,6);
      if(opts.parallax && !reduce){ cv.style.transform="translateY("+(pgr*30).toFixed(2)+"%) scale("+(1+pgr*.18).toFixed(3)+")"; }
    }
    function loop(now){ if(!running) return; draw(now); requestAnimationFrame(loop); }
    if(reduce){ requestAnimationFrame(draw); addEventListener("resize",function(){requestAnimationFrame(draw)}); return; }
    running=true; requestAnimationFrame(loop);
    new IntersectionObserver(function(es){ visible=es[0].isIntersecting; if(visible&&!running){running=true;requestAnimationFrame(loop)} else if(!visible) running=false; }).observe(host);
    document.addEventListener("visibilitychange",function(){ if(document.hidden) running=false; else if(visible&&!running){running=true;requestAnimationFrame(loop)} });
  }

  /* ---------- cabeçalho escuro sobre o hero ---------- */
  function initDarkHeader(){
    var band=$(".hero-band"); if(!band || band.classList.contains("hero-light")) return;
    var root=document.documentElement;
    function upd(){ root.classList.toggle("on-dark", band.offsetParent!==null && band.getBoundingClientRect().bottom>72); }
    addEventListener("scroll",upd,{passive:true}); addEventListener("resize",upd); upd();
  }

  /* ---------- mapa estilizado (contato) ---------- */
  function drawMap(cv){
    var host=cv.parentElement,ctx=cv.getContext("2d");
    function paint(){
      var r=host.getBoundingClientRect(),W=r.width,H=r.height,D=Math.min(devicePixelRatio||1,2);cv.width=W*D;cv.height=H*D;ctx.setTransform(D,0,0,D,0,0);
      ctx.fillStyle="#141416";ctx.fillRect(0,0,W,H);
      var cx=W*.62,cy=H*.42;
      ctx.save();ctx.translate(cx,cy);ctx.rotate(-.35);
      ctx.strokeStyle="rgba(255,255,255,.06)";ctx.lineWidth=1;
      for(var i=-20;i<=20;i++){ctx.beginPath();ctx.moveTo(i*38,-900);ctx.lineTo(i*38,900);ctx.stroke();ctx.beginPath();ctx.moveTo(-900,i*30);ctx.lineTo(900,i*30);ctx.stroke()}
      ctx.strokeStyle="rgba(255,255,255,.14)";ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(-900,0);ctx.lineTo(900,0);ctx.stroke();
      ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-38,-900);ctx.lineTo(-38,900);ctx.stroke();
      ctx.restore();
      var g=ctx.createRadialGradient(cx,cy,0,cx,cy,140);g.addColorStop(0,"rgba(245,124,31,.45)");g.addColorStop(1,"rgba(245,124,31,0)");ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
      ctx.drawImage(sphereSprite(),cx-14,cy-14,28,28);
      ctx.fillStyle="rgba(255,255,255,.55)";ctx.font="500 11px Geist, system-ui, sans-serif";ctx.fillText("R. SICÍLIA, 88D",cx+22,cy+4);
    }
    paint(); new ResizeObserver(paint).observe(host);
  }

  /* ---------- início ---------- */
  function start(){
    var ano=new Date().getFullYear();
    $$("[data-year]").forEach(function(el){el.textContent=ano});
    $$("[data-anos]").forEach(function(el){el.textContent=ano-1978; if(el.hasAttribute("data-count")) el.setAttribute("data-count",ano-1978)});
    injectSprite(); applyConfig(); initMenu(); initScroll(); initReveal(); initFx(); initTabs(); initForm(); initCookies(); initDarkHeader();
    $$("canvas[data-strands]").forEach(function(c){
      var mode=c.getAttribute("data-strands");
      var band=c.closest(".hero-band");
      Strands(c, mode==="cta" ? {host:c.parentElement, burstFrom:"center", gain:.85, cx:.3, mirror:true} : {host:band, parallax:true, cx:.72, light:band.classList.contains("hero-light"), gain:1});
    });
    /* canvases só iniciam quando aparecem na tela (tamanho correto, menos processamento) */
    var pending=$$("#spheres, #map, canvas[data-ambient]");
    function boot(c){
      pending.splice(pending.indexOf(c),1);
      if(c.id==="spheres"){ var s=Spheres(c,"logo"); var sb=$("#scatter"); if(sb) sb.addEventListener("click",function(){ if(!reduce) s.scatter() }); }
      else if(c.id==="map") drawMap(c);
      else Spheres(c,"ambient");
    }
    /* vídeo do hero: se não puder tocar (erro ou movimento reduzido), entram as esferas */
    var hv=$("#hero-video"), hs=$("#stage"), ht=$("#hero-video-toggle");
    if(hv&&hs){
      var fallback=function(){ hs.classList.add("no-video"); if(ht) ht.hidden=true; check(); };
      if(reduce){ hv.removeAttribute("autoplay"); hv.pause(); }
      hv.addEventListener("error",fallback);
      var lab=function(){ if(ht) ht.innerHTML=hv.paused?'<svg><use href="#i-play"/></svg>Reproduzir':'<svg><use href="#i-pause"/></svg>Pausar' };
      hv.addEventListener("play",lab); hv.addEventListener("pause",lab); lab();
      if(ht) ht.addEventListener("click",function(){ if(hv.paused){ delete hv.dataset.userPaused; var p=hv.play(); if(p&&p.catch)p.catch(fallback) } else { hv.dataset.userPaused="1"; hv.pause(); } });
    }
    /* se o navegador segurar o autoplay, o vídeo começa no primeiro toque, clique ou rolagem */
    if(!reduce){
      var kick=function(){ $$("video[autoplay]").forEach(function(v){ if(v.paused && v.readyState>1 && !v.dataset.userPaused){ var p=v.play(); if(p&&p.catch)p.catch(function(){}) } }) };
      ["pointerdown","touchstart","scroll","keydown"].forEach(function(ev){ addEventListener(ev,kick,{passive:true,once:true}) });
      document.addEventListener("visibilitychange",function(){ if(document.visibilityState==="visible") kick() });
      setTimeout(kick,1200);
    }
    function check(){
      pending.slice().forEach(function(c){ if(c.id==="spheres" && !(hs&&hs.classList.contains("no-video"))) return; var r=c.getBoundingClientRect(); if(r.width>0 && r.bottom>-200 && r.top<innerHeight+200) boot(c); });
    }
    addEventListener("scroll",check,{passive:true}); addEventListener("resize",check); check();
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",start); else start();
})();
