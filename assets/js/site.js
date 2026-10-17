(function(){
var P=[["index","Accueil"],["charte","Charte du DAE"],["ethique","Charte Éthique"],["organigramme","Organigramme"],["protocoles","Protocoles"],["groupes-interet","Groupes d’intérêt"],["planning","Planning"],["faq","FAQ"],["conditions","Termes & CGU"]],
pg=document.body.dataset.page,h=document.getElementById("h"),f=document.getElementById("f"),L="";
P.forEach(function(p){L+='<a href="'+p[0]+'.html"'+(p[0]==pg?' class="on"':"")+">"+p[1]+"</a>"});
h.innerHTML='<div class="w"><a class="br" href="index.html"><img src="assets/img/logo-dae.png" alt="Logo du DAE"><span><b>Fondation SCP — Site-77</b><small>Département des Affaires Externes</small></span></a><div class="st">Statut département : <b>Actif</b><br>Direction : <b>Aaron</b></div></div>';
h.insertAdjacentHTML("afterend",'<nav><div class="w">'+L+'<a class="cta'+(pg=="recrutement"?" on":"")+'" href="recrutement.html">Candidater</a></div></nav>');
f.innerHTML='<div class="w g"><div><img class="logo" src="assets/img/logo-dae.png" alt=""><h4>Département des Affaires Externes</h4><p>Fondation SCP — Site-77<br>Direction du DAE : Aaron</p><a class="btn" href="recrutement.html">Candidater au DAE</a></div><div><h4>Navigation</h4>'+L.replace(/ class="on"/,"")+'</div><div><h4>Légal</h4><a href="conditions.html">Termes &amp; CGU</a><a href="mentions-legales.html">Mentions légales</a><h4 style="margin-top:14px">Documents</h4><a href="assets/docs/DAE_Site77_Document_de_reference.pdf" download>Document de référence (PDF)</a><a href="assets/docs/Charte_Ethique_Site-77.pdf" download>Charte Éthique (PDF)</a></div></div><p class="w cp">Site conçu par L-Project Studio · © Site-77 · Fondation SCP — contenu de fiction (RP)</p>';
var b=document.querySelectorAll("[data-f]");
b.forEach(function(x){x.onclick=function(){b.forEach(function(y){y.classList.toggle("on",y===x)});document.querySelectorAll("[data-s]").forEach(function(c){c.hidden=x.dataset.f!="all"&&c.dataset.s!=x.dataset.f})}});
var t=document.querySelector('[data-d="'+new Date().getDay()+'"]');if(t)t.classList.add("today");

var de=document.documentElement,tp=document.createElement("div"),nv=document.querySelector("nav");
tp.id="top";h.parentNode.insertBefore(tp,h);tp.appendChild(h);tp.appendChild(nv);
var pb=document.createElement("div");pb.id="pb";document.body.appendChild(pb);
var up=document.createElement("button");up.id="up";up.textContent="↑";up.setAttribute("aria-label","Haut de page");up.onclick=function(){scrollTo({top:0,behavior:"smooth"})};document.body.appendChild(up);
var tb=document.createElement("button");tb.id="th";tb.textContent="◐";tb.setAttribute("aria-label","Changer de thème");
tb.onclick=function(){var v=de.dataset.theme=="dark"?"light":"dark";de.dataset.theme=v;try{localStorage.dae_theme=v}catch(e){}};h.querySelector(".st").appendChild(tb);
function sc(){var y=scrollY,m=de.scrollHeight-innerHeight;pb.style.width=(m>0?y/m*100:0)+"%";document.body.classList.toggle("sm",y>70);up.classList.toggle("on",y>600)}
addEventListener("scroll",sc,{passive:true});sc();
var calm=matchMedia("(prefers-reduced-motion:reduce)").matches;
function cnt(n){if(calm)return;var t=+n.dataset.n,s=performance.now();(function f(w){var p=Math.min((w-s)/1300,1);n.textContent=Math.round(t*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(s)}
var rv=document.querySelectorAll("main h2,main .lead,main .card,main details,main table,main .dy,main blockquote,main form,main dt,.stat,.tree div");
rv.forEach(function(e,i){e.classList.add("rv");e.style.setProperty("--d",(i%5)*.09+"s")});
var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target);var n=x.target.querySelector("[data-n]");if(n)cnt(n)}})},{threshold:.1});
rv.forEach(function(e){io.observe(e)});
})();