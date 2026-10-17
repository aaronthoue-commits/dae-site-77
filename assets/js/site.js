(function(){
var P=[["index","Accueil"],["charte","Charte du DAE"],["ethique","Charte Éthique"],["organigramme","Organigramme"],["protocoles","Protocoles"],["groupes-interet","Groupes d’intérêt"],["planning","Planning"],["conditions","Termes & CGU"]],
pg=document.body.dataset.page,h=document.getElementById("h"),f=document.getElementById("f"),L="";
P.forEach(function(p){L+='<a href="'+p[0]+'.html"'+(p[0]==pg?' class="on"':"")+">"+p[1]+"</a>"});
h.innerHTML='<div class="w"><a class="br" href="index.html"><img src="assets/img/logo-dae.png" alt="Logo du DAE"><span><b>Fondation SCP — Site-77</b><small>Département des Affaires Externes</small></span></a><div class="st">Statut département : <b>Actif</b><br>Direction : <b>Aaron</b></div></div>';
h.insertAdjacentHTML("afterend",'<nav><div class="w">'+L+'<a class="cta'+(pg=="recrutement"?" on":"")+'" href="recrutement.html">Candidater</a></div></nav>');
f.innerHTML='<div class="w g"><div><img class="logo" src="assets/img/logo-dae.png" alt=""><h4>Département des Affaires Externes</h4><p>Fondation SCP — Site-77<br>Direction du DAE : Aaron</p><a class="btn" href="recrutement.html">Candidater au DAE</a></div><div><h4>Navigation</h4>'+L.replace(/ class="on"/,"")+'</div><div><h4>Documents</h4><a href="assets/docs/DAE_Site77_Document_de_reference.pdf" download>Document de référence (PDF)</a><a href="assets/docs/Charte_Ethique_Site-77.pdf" download>Charte Éthique (PDF)</a></div></div><p class="w cp">Site conçu par L-Project Studio · © Site-77 · Fondation SCP — contenu de fiction (RP)</p>';
var b=document.querySelectorAll("[data-f]");
b.forEach(function(x){x.onclick=function(){b.forEach(function(y){y.classList.toggle("on",y===x)});document.querySelectorAll("[data-s]").forEach(function(c){c.hidden=x.dataset.f!="all"&&c.dataset.s!=x.dataset.f})}});
var t=document.querySelector('[data-d="'+new Date().getDay()+'"]');if(t)t.classList.add("today");
})();