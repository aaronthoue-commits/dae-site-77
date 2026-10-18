(function(){
var P=[["index","Accueil"],["charte","Charte du DAE"],["ethique","Charte Éthique"],["organigramme","Organigramme"],["tenues","Tenues"],["protocoles","Protocoles"],["groupes-interet","Groupes d’intérêt"],["planning","Planning"],["glossaire","Glossaire"]],
pg=document.body.dataset.page,h=document.getElementById("h"),f=document.getElementById("f"),L="";
P.forEach(function(p){L+='<a href="'+p[0]+'.html"'+(p[0]==pg?' class="on"':"")+">"+p[1]+"</a>"});
h.innerHTML='<div class="w"><a class="br" href="index.html"><img src="assets/img/logo-dae.png" alt="Logo du DAE"><span><b>Fondation SCP — Site-77</b><small>Département des Affaires Externes</small></span></a><div class="st">Statut département : <b>Actif</b><br>Direction : <b>Aaron</b></div></div>';
h.insertAdjacentHTML("afterend",'<nav><div class="w">'+L+'<a class="cta'+(pg=="recrutement"?" on":"")+'" href="recrutement.html">Candidater</a></div></nav>');
f.innerHTML='<div class="w g"><div><img class="logo" src="assets/img/logo-dae.png" alt=""><h4>Département des Affaires Externes</h4><p>Fondation SCP — Site-77<br>Direction du DAE : Aaron</p><a class="btn" href="recrutement.html">Candidater au DAE</a></div><div><h4>Navigation</h4>'+L.replace(/ class="on"/,"")+'</div><div><h4>Légal</h4><a href="conditions.html">Termes &amp; CGU</a><a href="mentions-legales.html">Mentions légales</a><h4 style="margin-top:14px">Documents</h4><a href="assets/docs/DAE_Site77_Document_de_reference.pdf" download>Document de référence (PDF)</a><a href="assets/docs/Charte_Ethique_Site-77.pdf" download>Charte Éthique (PDF)</a></div></div><p class="w cp">Site conçu par L-Project Studio · © Site-77 · Fondation SCP — contenu de fiction (RP)</p>';
var b=document.querySelectorAll("[data-f]");
b.forEach(function(x){x.onclick=function(){b.forEach(function(y){y.classList.toggle("on",y===x)});document.querySelectorAll("[data-s]").forEach(function(c){c.hidden=x.dataset.f!="all"&&c.dataset.s!=x.dataset.f})}});
var t=document.querySelector('[data-d="'+new Date().getDay()+'"]');if(t)t.classList.add("today");

var de=document.documentElement,tp=document.createElement("div"),nv=document.querySelector("nav"),calm=matchMedia("(prefers-reduced-motion:reduce)").matches;
tp.id="top";h.parentNode.insertBefore(tp,h);tp.appendChild(h);tp.appendChild(nv);
function hh(){tp.style.top=-h.offsetHeight+"px"}hh();addEventListener("resize",hh);addEventListener("load",hh);
var pb=document.createElement("div");pb.id="pb";document.body.appendChild(pb);
var up=document.createElement("button");up.id="up";up.textContent="↑";up.setAttribute("aria-label","Haut de page");up.onclick=function(){scrollTo({top:0,behavior:"smooth"})};document.body.appendChild(up);
var tb=document.createElement("button");tb.id="th";
var TH=["light","dark","diplo"],TN={light:"Archive",dark:"Nocturne",diplo:"Diplomatique"},TI={light:"☀",dark:"☾",diplo:"✦"};
function cur(){return de.dataset.theme||"light"}
function ic(){var c=cur();tb.innerHTML="<i>"+TI[c]+"</i><span>"+TN[c]+"</span>";tb.title="Thème "+TN[c]+" — cliquer pour changer";tb.setAttribute("aria-label",tb.title)}ic();
tb.onclick=function(){var n=TH[(TH.indexOf(cur())+1)%3],r=tb.getBoundingClientRect();
function ap(){if(n=="light")delete de.dataset.theme;else de.dataset.theme=n;try{localStorage.dae_theme=n}catch(e){}ic()}
if(document.startViewTransition&&!calm){de.style.setProperty("--tx",(r.left+r.width/2)+"px");de.style.setProperty("--ty",(r.top+r.height/2)+"px");document.startViewTransition(ap)}
else{de.classList.add("tt");ap();setTimeout(function(){de.classList.remove("tt")},650)}};
var st0=h.querySelector(".st"),hr=document.createElement("div");hr.className="hr";st0.parentNode.insertBefore(hr,st0);hr.appendChild(st0);hr.appendChild(tb);
var hero=document.querySelector(".hero img"),tk=false;
function sc(){var y=scrollY,m=de.scrollHeight-innerHeight;pb.style.transform="scaleX("+(m>0?y/m:0)+")";up.classList.toggle("on",y>600);if(hero&&!calm&&y<1000)hero.style.setProperty("--py",(y*.18)+"px")}
addEventListener("scroll",function(){if(!tk){tk=true;requestAnimationFrame(function(){sc();tk=false})}},{passive:true});sc();
function cnt(n){if(calm)return;var t=+n.dataset.n,s=performance.now();(function f(w){var p=Math.min((w-s)/1400,1);n.textContent=Math.round(t*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(s)}
function split(e){var t=e.textContent.trim();e.setAttribute("aria-label",t);e.classList.add("sp");e.innerHTML=t.replace(/&/g,"&amp;").replace(/</g,"&lt;").split(/\s+/).map(function(w,i){return'<span class="wd" aria-hidden="true"><span style="--i:'+i+'">'+w+"</span></span>"}).join(" ")}
if(!calm)document.querySelectorAll("main h1,main h2,.hc h1").forEach(split);
var hc=document.querySelectorAll(".hc h1");setTimeout(function(){hc.forEach(function(e){e.classList.add("in")})},350);
var rv=document.querySelectorAll("main p:not(.eyebrow):not(.nv),main li:not([data-n]),main .card,main details,main table,main blockquote,main form,main .g,.stat,.pil>div,.nxw,.tree div,.tabs,.now");
rv.forEach(function(e){e.classList.add("rv");var i=Array.prototype.indexOf.call(e.parentNode.children,e);e.style.setProperty("--d",Math.min(i,6)*.08+"s")});
var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target);var n=x.target.querySelector("[data-n]");if(n)cnt(n)}})},{threshold:.1,rootMargin:"0px 0px -6% 0px"});
document.querySelectorAll(".rv,.sp").forEach(function(e){if(!e.closest(".hc"))io.observe(e)});
document.addEventListener("pointermove",function(e){var c=e.target.closest&&e.target.closest(".card");if(c){var r=c.getBoundingClientRect();c.style.setProperty("--mx",(e.clientX-r.left)+"px");c.style.setProperty("--my",(e.clientY-r.top)+"px")}},{passive:true});
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a");if(!a||calm||e.metaKey||e.ctrlKey||e.shiftKey||e.button||a.target||a.hasAttribute("download"))return;var u=new URL(a.href,location);if(u.origin!=location.origin||u.pathname==location.pathname||!/(\.html|\/)$/.test(u.pathname))return;e.preventDefault();document.body.classList.add("out");setTimeout(function(){location.href=u.href},260)});
addEventListener("pageshow",function(e){if(e.persisted)document.body.classList.remove("out")});

function sweep(){document.querySelectorAll(".rv:not(.in),.sp:not(.in)").forEach(function(e){var r=e.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0)e.classList.add("in")})}
var sw;addEventListener("scroll",function(){clearTimeout(sw);sw=setTimeout(sweep,350)},{passive:true});setTimeout(sweep,1500);
})();