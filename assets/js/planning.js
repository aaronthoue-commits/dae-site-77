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
var S=["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"],N=["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],W={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};
var tabs=document.getElementById("tabs"),ol=document.getElementById("tl"),pn=document.getElementById("pn"),now,sel;
function mn(s){var a=s.split(":");return +a[0]*60+ +a[1]}
function fm(m){var h=Math.floor(m/60),r=m%60;return h?h+" h"+(r?" "+(r<10?"0":"")+r:""):r+" min"}
function paris(){var p={};new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/Paris",weekday:"short",hour:"2-digit",minute:"2-digit",hour12:false}).formatToParts(new Date()).forEach(function(x){p[x.type]=x.value});return{d:W[p.weekday],m:(+p.hour%24)*60+ +p.minute}}
function det(k){var t=T[k];return"<p>"+t[2]+"</p><dl><dt>Objectif</dt><dd>"+t[3]+"</dd><dt>Public</dt><dd>"+t[4]+"</dd><dt>À prévoir</dt><dd>"+t[5]+"</dd></dl>"}
function nextA(){for(var o=0;o<8;o++){var d=(now.d+o)%7,L=D[d];for(var i=0;i<L.length;i++){var s=mn(L[i][0]);if(o>0||s>now.m)return{a:L[i],o:o,d:d,s:s,dt:o*1440+s-now.m}}}}
function tab(d){sel=d;ol.innerHTML=D[d].map(function(a,i){var t=T[a[2]];return'<li class="it p'+t[1]+'" style="--i:'+i+'" data-a="'+mn(a[0])+"-"+mn(a[1])+'"><button type="button" aria-expanded="false"><span class="t">'+a[0]+" – "+a[1]+'</span><span class="n">'+t[0]+'</span><span class="s"></span></button><div class="dt"><div><div class="in2">'+det(a[2])+"</div></div></div></li>"}).join("");
[].forEach.call(tabs.children,function(b){b.classList.toggle("on",+b.dataset.d==d)});tick()}
function tick(){now=paris();var cur=null,nx=nextA(),td=sel==now.d;
D[now.d].forEach(function(a){if(now.m>=mn(a[0])&&now.m<mn(a[1]))cur=a});
[].forEach.call(ol.children,function(li){var r=li.dataset.a.split("-"),s=+r[0],e=+r[1],live=td&&now.m>=s&&now.m<e;li.classList.toggle("live",live);
li.querySelector(".s").textContent=!td?"":live?"En cours":now.m>=e?"Terminé":(nx&&nx.o==0&&nx.s==s?"À suivre":"")});
if(!td){pn.hidden=true;return}pn.hidden=false;
if(cur){var s=mn(cur[0]),e=mn(cur[1]);pn.innerHTML="<small>En ce moment</small><h3>"+T[cur[2]][0]+'</h3><p class="note">'+cur[0]+" – "+cur[1]+" · se termine dans "+fm(e-now.m)+'</p><div class="bar"><i style="transform:scaleX('+((now.m-s)/(e-s)).toFixed(3)+')"></i></div><div class="in2" style="border:0;padding:0;background:none">'+det(cur[2])+"</div>"}
else if(nx){pn.innerHTML="<small>Prochaine activité</small><h3>"+T[nx.a[2]][0]+'</h3><p class="note">'+(nx.o==0?"aujourd’hui":nx.o==1?"demain":N[nx.d])+" à "+nx.a[0]+" · dans "+(nx.dt>=1440?Math.floor(nx.dt/1440)+" j "+fm(nx.dt%1440):fm(nx.dt))+'</p><div class="in2" style="border:0;padding:0;background:none">'+det(nx.a[2])+"</div>"}}
now=paris();tabs.innerHTML=[1,2,3,4,5,6,0].map(function(d){return'<button type="button" data-d="'+d+'"'+(d==now.d?' class="td"':"")+">"+S[d]+"</button>"}).join("");
tabs.onclick=function(e){var b=e.target.closest("button");if(b)tab(+b.dataset.d)};
ol.onclick=function(e){var li=e.target.closest(".it");if(li&&e.target.closest("button")){var o=li.classList.toggle("open");li.querySelector("button").setAttribute("aria-expanded",o)}};
tab(now.d);setInterval(tick,30000)})();