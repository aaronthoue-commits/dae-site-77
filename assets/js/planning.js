(function(){
var T={
ent:["Entretien de recrutement",2,"Échange individuel avec un candidat dont le dossier a été retenu.","Évaluer le sérieux, la maîtrise des documents du DAE et l’aptitude à tenir un rôle diplomatique.","Candidats retenus, Administrateur, Direction","Avoir relu la Charte du DAE, la Charte Éthique et le document de référence."],
ren:["Rencontre diplomatique",2,"Mise en situation d’un échange avec un groupe d’intérêt ou un interlocuteur extérieur.","Conduire l’échange dans le cadre d’un mandat, sans concession ni engagement non autorisé.","Diplomates, Agents de Liaison en appui, Administrateur","Objet, mandat, informations communicables et limites fixés avant l’échange."],
neg:["Négociations et accords",2,"Séance de discussion formelle avec un GI et de rédaction des engagements pris.","Faire avancer un accord en consignant chaque engagement, daté et attribué.","Diplomates mandatés, sous le contrôle de l’Administrateur","Validation préalable de l’Administrateur et mandat clairement délimité."],
fpr:["Formation — protocoles",3,"Rappel des procédures : chaîne hiérarchique, communications, sorties et missions.","Appliquer les protocoles sans erreur de circuit ni de niveau d’autorité.","Tout le personnel, en priorité les nouveaux membres","Relire la section 4 du document de référence."],
fra:["Formation — rapports",3,"Atelier de rédaction : séparer les faits, les appréciations et les hypothèses.","Produire un compte rendu daté, attribué et classé selon sa confidentialité.","Diplomates et Agents de Liaison","Apporter un compte rendu récent comme support."],
fcr:["Formation — crise diplomatique",3,"Étude de l’ordre des priorités lors de la dégradation d’une relation avec un GI.","Savoir signaler, vérifier, limiter les communications et rendre compte.","Diplomates, Administrateur","Connaître les six temps de la section 4.9."],
fco:["Formation — confidentialité",3,"Les trois états de l’information, les niveaux d’accès et le besoin d’en connaître.","Distinguer ce qui est consigné, communicable ou non communicable.","Tout le personnel du DAE","Relire la section 4.10 et la Charte Éthique (article 7)."],
bil:["Bilan hebdomadaire — préparation",2,"Rassemblement des comptes rendus et incidents de la semaine.","Consolider les rapports sans modifier les documents d’origine.","Administrateur, Diplomates référents","Avoir remis ses comptes rendus."],
pre:["Préparation de la réunion de direction",3,"Mise au point de l’ordre du jour avant la réunion générale.","Arriver avec des points clairs, hiérarchisés et documentés.","Encadrement du DAE","Liste des sujets à trancher par la Direction."],
ras:["Rassemblement du personnel",1,"Appel et annonces rapides avant la réunion générale.","Vérifier les présences et installer la séance.","Tout le personnel du DAE","Être connecté et prêt quelques minutes avant."],
reu:["Réunion générale DAE",1,"Point hebdomadaire de l’ensemble du Département avec la Direction.","Décisions, annonces, bilan de la semaine et orientations à venir.","Tout le personnel du DAE (présence obligatoire)","Avoir rendu ses comptes rendus et préparé ses questions."]};
var D=[
[["14:00","15:00","ent"],["15:00","16:30","ren"],["18:00","19:30","pre"],["19:30","20:00","ras"],["20:00","21:15","reu"]],
[["21:30","22:30","ent"]],
[["18:00","19:00","fpr"],["19:00","20:30","ren"]],
[["14:00","15:00","ent"],["18:30","19:30","fra"],["19:30","21:00","ren"]],
[["18:00","19:00","neg"],["19:00","20:00","ent"]],
[["18:30","20:00","ren"],["20:00","21:00","fcr"],["22:00","23:00","bil"]],
[["14:00","15:00","ent"],["15:00","16:30","ren"],["18:00","19:00","fco"]]];
var S=["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"],N=["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],W={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6},
tabs=document.getElementById("tabs"),ol=document.getElementById("tl"),pn=document.getElementById("pn"),ax=document.getElementById("ax"),nx=document.getElementById("nx"),clk=document.getElementById("clk"),A0=780,A1=1440,CC=276.5,now,sel;
function mn(s){var a=s.split(":");return +a[0]*60+ +a[1]}
function fm(m){var h=Math.floor(m/60),r=m%60;return h?h+" h"+(r?" "+(r<10?"0":"")+r:""):r+" min"}
function hm(m){var h=Math.floor(m/60),r=m%60;return(h<10?"0":"")+h+":"+(r<10?"0":"")+r}
function sh(m){return m>=1440?"J+"+Math.floor(m/1440):m>=60?Math.floor(m/60)+"h"+("0"+m%60).slice(-2):m+" min"}
function paris(){var p={};new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/Paris",weekday:"short",hour:"2-digit",minute:"2-digit",hour12:false}).formatToParts(new Date()).forEach(function(x){p[x.type]=x.value});return{d:W[p.weekday],m:(+p.hour%24)*60+ +p.minute}}
function det(k){var t=T[k];return"<p>"+t[2]+"</p><dl><dt>Objectif</dt><dd>"+t[3]+"</dd><dt>Public</dt><dd>"+t[4]+"</dd><dt>À prévoir</dt><dd>"+t[5]+"</dd></dl>"}
function nextA(){for(var o=0;o<8;o++){var d=(now.d+o)%7,L=D[d];for(var i=0;i<L.length;i++){var s=mn(L[i][0]);if(o>0||s>now.m)return{a:L[i],o:o,d:d,s:s,dt:o*1440+s-now.m}}}}
function curA(){var c=null;D[now.d].forEach(function(a){if(now.m>=mn(a[0])&&now.m<mn(a[1]))c=a});return c}
function when(x){return(x.o==0?"aujourd’hui":x.o==1?"demain":N[x.d])+" à "+x.a[0]+" · dans "+(x.dt>=1440?Math.floor(x.dt/1440)+" j "+fm(x.dt%1440):fm(x.dt))}
function fillNx(){now=paris();var c=curA(),x=nextA();if(c)nx.innerHTML="<small>En ce moment</small><b>"+T[c[2]][0]+"</b><span>"+c[0]+" – "+c[1]+" · se termine dans "+fm(mn(c[1])-now.m)+'</span><a href="planning.html">Voir le planning →</a>';else if(x)nx.innerHTML="<small>Prochaine activité</small><b>"+T[x.a[2]][0]+"</b><span>"+when(x)+'</span><a href="planning.html">Voir le planning →</a>'}
if(nx){fillNx();setInterval(fillNx,30000)}
if(!tabs)return;
function ring(p,t){return'<div class="rg"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44"/><circle class="v" cx="50" cy="50" r="44" style="stroke-dashoffset:'+(CC*(1-p)).toFixed(1)+'"/></svg><span>'+t+"</span></div>"}
function tab(d){sel=d;pn.dataset.k="";
ol.innerHTML=D[d].map(function(a,i){var t=T[a[2]];return'<li class="it p'+t[1]+'" style="--i:'+i+'" data-a="'+mn(a[0])+"-"+mn(a[1])+'"><button type="button" aria-expanded="false"><span class="t">'+a[0]+" – "+a[1]+'</span><span class="n">'+t[0]+'</span><span class="s"></span></button><div class="dt"><div><div class="in2">'+det(a[2])+"</div></div></div></li>"}).join("");
ax.innerHTML=D[d].map(function(a){var s=mn(a[0]),e=mn(a[1]),t=T[a[2]];return'<i class="p'+t[1]+'" style="left:'+((s-A0)/(A1-A0)*100)+"%;width:"+((e-s)/(A1-A0)*100)+'%" title="'+t[0]+" · "+a[0]+"–"+a[1]+'"></i>'}).join("")+[14,16,18,20,22].map(function(h){return'<u style="left:'+((h*60-A0)/(A1-A0)*100)+'%">'+h+"h</u>"}).join("")+'<b class="mk" hidden></b>';
[].forEach.call(tabs.children,function(b){b.classList.toggle("on",+b.dataset.d==d)});tick()}
function tick(){now=paris();if(clk)clk.textContent=hm(now.m);var cur=curA(),x=nextA(),td=sel==now.d;
[].forEach.call(ol.children,function(li){var r=li.dataset.a.split("-"),s=+r[0],e=+r[1],live=td&&now.m>=s&&now.m<e;li.classList.toggle("live",live);li.querySelector(".s").textContent=!td?"":live?"En cours":now.m>=e?"Terminé":(x&&x.o==0&&x.s==s?"À suivre":"")});
var mk=ax.querySelector(".mk");if(mk){var l=(now.m-A0)/(A1-A0)*100;mk.hidden=!(td&&l>=0&&l<=100);mk.style.left=l+"%"}
if(!td){pn.hidden=true;pn.dataset.k="";return}pn.hidden=false;
if(cur){var s=mn(cur[0]),e=mn(cur[1]),p=(now.m-s)/(e-s),k="c"+cur[0];
if(pn.dataset.k!=k){pn.dataset.k=k;pn.innerHTML='<div class="pr">'+ring(p,Math.round(p*100)+"%")+"<div><small>En ce moment</small><h3>"+T[cur[2]][0]+'</h3><p class="note" id="pt"></p></div></div><div class="in2" style="border:0;padding:0;background:none">'+det(cur[2])+"</div>"}
else{pn.querySelector(".v").style.strokeDashoffset=(CC*(1-p)).toFixed(1);pn.querySelector(".rg span").textContent=Math.round(p*100)+"%"}
document.getElementById("pt").textContent=cur[0]+" – "+cur[1]+" · se termine dans "+fm(e-now.m)}
else if(x){var k2="n"+x.d+x.a[0],p2=Math.max(0,1-x.dt/1440);
if(pn.dataset.k!=k2){pn.dataset.k=k2;pn.innerHTML='<div class="pr">'+ring(p2,sh(x.dt))+"<div><small>Prochaine activité</small><h3>"+T[x.a[2]][0]+'</h3><p class="note" id="pt"></p></div></div><div class="in2" style="border:0;padding:0;background:none">'+det(x.a[2])+"</div>"}
else pn.querySelector(".rg span").textContent=sh(x.dt);
document.getElementById("pt").textContent=when(x)}}
now=paris();tabs.innerHTML=[1,2,3,4,5,6,0].map(function(d){return'<button type="button" data-d="'+d+'"'+(d==now.d?' class="td"':"")+">"+S[d]+"<em>"+new Array(D[d].length+1).join("•")+"</em></button>"}).join("");
tabs.onclick=function(e){var b=e.target.closest("button");if(b)tab(+b.dataset.d)};
ol.onclick=function(e){var li=e.target.closest(".it");if(li&&e.target.closest("button")){var o=li.classList.toggle("open");li.querySelector("button").setAttribute("aria-expanded",o)}};
tab(now.d);setInterval(tick,30000)})();