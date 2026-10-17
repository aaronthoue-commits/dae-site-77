(function(){
var f=document.getElementById("cand"),sel=f.poste,box=document.getElementById("qs"),m=document.getElementById("msg"),cur=[],qid="",t0=Date.now(),pastes=0,leaves=0;
function rnd(n){var a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]%n}
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){}return null}
function say(t){m.hidden=false;m.className="warn";m.textContent=t;m.scrollIntoView({block:"center"})}
function sha(s){return crypto.subtle.digest("SHA-256",new TextEncoder().encode(s)).then(function(b){return Array.prototype.map.call(new Uint8Array(b),function(x){return("0"+x.toString(16)).slice(-2)}).join("")})}
function pow(seed){return new Promise(function(ok){var n=0;(function go(){var b=[];for(var i=0;i<500;i++)b.push(sha(seed+(n+i)));Promise.all(b).then(function(h){for(var i=0;i<h.length;i++)if(h[i].slice(0,4)=="0000")return ok(n+i);n+=500;go()})})()})}
var clean=function(s){return String(s).replace(/[`*_~|>@]/g,"").trim()},T=function(s,n){return(String(s).trim().slice(0,n||1000))||"—"},words=function(s){return new Set(s.toLowerCase().split(/\s+/).filter(Boolean)).size};
f.addEventListener("paste",function(){pastes++});document.addEventListener("visibilitychange",function(){if(document.hidden)leaves++});
function pick(P,n,k,lim){var hs=[];try{hs=JSON.parse(ls(k)||"[]")}catch(e){}var c=[];P.forEach(function(_,i){if(hs.indexOf(i)<0)c.push(i)});if(c.length<n)c=P.map(function(_,i){return i});var o=[];while(o.length<n)o.push(c.splice(rnd(c.length),1)[0]);ls(k,JSON.stringify(hs.concat(o).slice(-lim)));return o}
sel.onchange=function(){var r=sel.value,Q=window.DAE_Q[r];box.innerHTML="";cur=[];if(!Q)return;
var ti=pick(Q.t,2,"dae_t_"+r,16),si=pick(Q.s,3,"dae_s_"+r,24),pl=function(x){return x+1};
qid=(r=="diplomate"?"D":"A")+" T"+ti.map(pl).join(".")+" S"+si.map(pl).join(".");
var c=ti.map(function(i){return Q.t[i]}).concat(si.map(function(i){return Q.s[i]}));for(var k=c.length-1;k>0;k--){var z=rnd(k+1),x=c[k];c[k]=c[z];c[z]=x}cur=c;
var t=document.createElement("h2");t.textContent="Questions de sélection";box.appendChild(t);
var p=document.createElement("p");p.className="note";p.textContent="Deux questions théoriques et trois mises en situation, composées au hasard ("+qid+"). Répondez seul, avec vos mots : chaque candidat reçoit des questions différentes.";box.appendChild(p);
cur.forEach(function(q,k){var lb=document.createElement("label"),ta=document.createElement("textarea");lb.textContent=(k+1)+". "+q;ta.rows=5;ta.maxLength=550;ta.required=true;ta.className="qa";lb.appendChild(ta);box.appendChild(lb)})};
f.onsubmit=function(e){e.preventDefault();if(f.website.value)return say("Candidature envoyée.");
if(!cur.length)return say("Choisissez un poste pour obtenir vos questions.");
var qa=[].slice.call(f.querySelectorAll(".qa")),sec=Math.round((Date.now()-t0)/1000),now=Date.now(),day=new Date().toDateString(),st={};
if(sec<150)return say("Prenez le temps de relire vos réponses. Réessayez dans "+(150-sec)+" s.");
if(qa.some(function(a){return a.value.trim().length<60||words(a.value)<8})||f.motiv.value.trim().length<60)return say("Développez chaque réponse : 60 caractères et 8 mots différents minimum.");
try{st=JSON.parse(ls("dae_st")||"{}")}catch(x){}if(st.d!=day)st={d:day,c:0,t:0};
if(now-st.t<600000)return say("Un envoi a déjà été fait récemment. Patientez 10 minutes.");
if(st.c>=3)return say("Limite d’envois atteinte pour aujourd’hui.");
var b=f.querySelector("button[type=submit]"),rs=function(){b.disabled=false;b.textContent="Envoyer ma candidature"};b.disabled=true;b.textContent="Vérification anti-robot…";
var all=qa.map(function(a){return a.value}).join("|")+f.motiv.value+f.pseudo.value;
sha(all).then(function(hh){if(ls("dae_hash")==hh){rs();return say("Cette candidature a déjà été envoyée.")}
return pow(hh.slice(0,16)+now).then(function(n){
var role=sel.options[sel.selectedIndex].text,mm=Math.floor(sec/60)+" min "+sec%60+" s",sus=sec<240||pastes>3,col=sel.value=="diplomate"?7213856:2046559,
ctl="⏱ "+mm+" · 📋 "+pastes+" collage(s) · 👁 "+leaves+" sortie(s) d’onglet · 🔒 preuve de travail "+n,
e1={title:(sus?"⚠️ ":"📥 ")+"Nouvelle candidature — "+role,description:"**"+T(clean(f.pseudo.value),100)+"** (`"+T(clean(f.discord.value),100)+"`) candidate au poste de **"+role+"**.",color:col,
fields:[{name:"Pseudo RP",value:T(clean(f.pseudo.value),200),inline:true},{name:"Discord",value:T(clean(f.discord.value),200),inline:true},{name:"Questionnaire",value:"`"+qid+"`",inline:true},{name:"Disponibilités",value:T(f.dispo.value,150)},{name:"Expérience RP",value:T(f.exp.value,400)},{name:"Motivations",value:T(f.motiv.value,500)},{name:"Contrôles anti-spam"+(sus?" (à vérifier)":""),value:ctl}],footer:{text:"DAE Site-77 · Recrutement"},timestamp:new Date().toISOString()},
e2={title:"📝 Réponses — questionnaire "+qid,color:col,fields:qa.map(function(a,k){return{name:T("Q"+(k+1)+" — "+cur[k],250),value:T(a.value,550)}})},
ping=window.DAE_PING,body={username:"Recrutement DAE",allowed_mentions:ping?{roles:[ping]}:{parse:[]},embeds:[e1,e2]};
if(ping)body.content="<@&"+ping+"> nouvelle candidature";
return fetch(window.DAE_WEBHOOK,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)}).then(function(r){if(!r.ok)throw 0;
st.c++;st.t=now;ls("dae_st",JSON.stringify(st));ls("dae_hash",hh);f.hidden=true;say("Candidature envoyée à la Direction du DAE. Vous serez contacté sur Discord.")}).catch(function(){rs();
var o=document.getElementById("out");o.hidden=false;o.querySelector("textarea").value=e1.fields.concat(e2.fields).map(function(x){return x.name+" :\n"+x.value}).join("\n\n");
say("L’envoi automatique a échoué. Copiez le texte ci-dessous et transmettez-le à la Direction.")})})})};
document.getElementById("cp").onclick=function(){var a=document.querySelector("#out textarea");a.select();try{navigator.clipboard.writeText(a.value)}catch(x){document.execCommand("copy")}this.textContent="Copié"}
})();