/* Prévia em página única: cada página do site vira uma seção, navegada pelo menu. */
(function(){
  var routes=["inicio","sobre","servicos","para-quem-atendemos","conteudos","contato","privacidade","termos"];
  var menuKey={"inicio":"inicio","sobre":"sobre","servicos":"servicos","para-quem-atendemos":"para-quem","conteudos":"conteudos","contato":"contato"};
  function current(){ var h=(location.hash||"").slice(1); return routes.indexOf(h)>=0?h:"inicio"; }
  function show(r, anchor){
    document.querySelectorAll("[data-route]").forEach(function(s){ s.hidden = s.getAttribute("data-route")!==r; });
    document.body.setAttribute("data-page", menuKey[r]||r);
    document.querySelectorAll(".menu a").forEach(function(a){ if(a.getAttribute("data-p")===(menuKey[r]||r)) a.setAttribute("aria-current","page"); else a.removeAttribute("aria-current"); });
    document.documentElement.classList.remove("nav-open");
    var el = anchor && document.getElementById(anchor);
    if(el){ setTimeout(function(){ el.scrollIntoView({block:"start"}) },60); } else window.scrollTo(0,0);
    setTimeout(function(){ window.dispatchEvent(new Event("resize")); window.dispatchEvent(new Event("scroll")); },30);
  }
  document.addEventListener("click",function(e){
    var a=e.target.closest("a[href]"); if(!a) return;
    var m=a.getAttribute("href").match(/^([\w-]+)\.html(?:#([\w-]+))?$/); if(!m) return;
    var r=m[1]==="index"?"inicio":m[1]; if(routes.indexOf(r)<0) return;
    e.preventDefault();
    var anchor=m[2]||null;
    if(anchor && /^assunto-/.test(anchor)){ var v=anchor.replace("assunto-",""), inp=document.querySelector('input[name=assunto][value="'+v+'"]'); if(inp) inp.checked=true; anchor="formulario"; }
    if(location.hash.slice(1)!==r){ history.pushState(null,"","#"+r); }
    show(r, anchor);
  }, true);
  window.addEventListener("popstate",function(){ show(current()); });
  window.addEventListener("hashchange",function(){ show(current()); });
  show(current());

  /* vídeo: carrega o arquivo publicado e toca a partir da memória */
  var cache={};
  document.querySelectorAll("video[data-src]").forEach(function(v){
    var src=v.getAttribute("data-src");
    (cache[src]=cache[src]||fetch(src).then(function(r){ if(!r.ok) throw 0; return r.blob(); }).then(function(b){ return URL.createObjectURL(new Blob([b],{type:"video/mp4"})); }))
    .then(function(url){
      v.muted=true; v.defaultMuted=true; v.setAttribute("muted","");
      v.addEventListener("canplay",function(){ var p=v.play(); if(p&&p.catch) p.catch(function(){}); },{once:true});
      v.src=url; v.load();
    })
    .catch(function(){ var st=v.closest(".stage"); if(st){ st.classList.add("no-video"); window.dispatchEvent(new Event("resize")); } });
  });
})();
