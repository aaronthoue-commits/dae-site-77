(function(){
var f=document.getElementById("cand"),sel=f.poste,box=document.getElementById("qs"),m=document.getElementById("msg"),cur=[],qid="";
function rnd(n){var a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]%n}
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){}}
function say(t,ok){m.hidden=false;m.className="warn";m.textContent=t;m.scrollIntoView({block:"center"})}
sel.onchange=function(){var r=sel.value,Q=window.DAE_Q[r];box.innerHTML="";if(!Q)return;
var l=+ls("dae_last_"+r),i;do{i=rnd(Q.length)}while(i===l&&Q.length>1);ls("dae_last_"+r,i);
qid=(r=="diplomate"?"D":"A")+(i+1);cur=Q[i];
var h=document.createElement("h2");h.textContent="Questions de sélection";box.appendChild(h);
var p=document.createElement("p");p.className="note";p.textContent="Questionnaire tiré au hasard ("+qid+"). Répondez seul : chaque candidat reçoit des questions différentes.";box.appendChild(p);
cur.forEach(function(q,k){var lb=document.createElement("label"),ta=document.createElement("textarea");lb.textContent=(k+1)+". "+q;ta.rows=5;ta.maxLength=900;ta.required=true;ta.className="qa";lb.appendChild(ta);box.appendChild(lb)})};
f.onsubmit=function(e){e.preventDefault();if(f.website.value)return;
if(Date.now()-(+ls("dae_sent")||0)<60000)return say("Patientez une minute avant un nouvel envoi.");
var T=function(s,n){return (String(s).trim().slice(0,n||1000))||"—"},role=sel.options[sel.selectedIndex].text,
F=[{name:"Pseudo RP",value:T(f.pseudo.value,200),inline:true},{name:"Discord",value:T(f.discord.value,200),inline:true},{name:"Poste",value:role,inline:true},{name:"Questionnaire",value:qid,inline:true},{name:"Disponibilités",value:T(f.dispo.value,150),inline:true},{name:"Expérience RP",value:T(f.exp.value)},{name:"Motivations",value:T(f.motiv.value)}];
Array.prototype.forEach.call(f.querySelectorAll(".qa"),function(t,k){F.push({name:T("Q"+(k+1)+" — "+cur[k],250),value:T(t.value)})});
var b=f.querySelector("button[type=submit]");b.disabled=true;b.textContent="Envoi en cours…";
fetch(window.DAE_WEBHOOK,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:"Recrutement DAE",allowed_mentions:{parse:[]},embeds:[{title:"Nouvelle candidature — "+role,color:7213856,fields:F,timestamp:new Date().toISOString()}]})})
.then(function(r){if(!r.ok)throw 0;ls("dae_sent",Date.now());f.hidden=true;say("Candidature envoyée à la Direction du DAE. Vous serez contacté sur Discord.")})
.catch(function(){b.disabled=false;b.textContent="Envoyer ma candidature";var o=document.getElementById("out");o.hidden=false;
o.querySelector("textarea").value=F.map(function(x){return x.name+" :\n"+x.value}).join("\n\n");say("L’envoi automatique a échoué. Copiez le texte ci-dessous et transmettez-le à la Direction.")})};
document.getElementById("cp").onclick=function(){var a=document.querySelector("#out textarea");a.select();try{navigator.clipboard.writeText(a.value)}catch(x){document.execCommand("copy")}this.textContent="Copié"}
})();