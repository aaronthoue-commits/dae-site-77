(function(){
var f=document.getElementById("cand"),S=[].slice.call(f.querySelectorAll(".s")),pb=document.querySelector(".pbar i"),sp=[].slice.call(document.querySelectorAll(".stp li")),m=document.getElementById("msg"),box=document.getElementById("qs"),dots=document.getElementById("dots"),
cur=[],qid="",st=0,qi=0,t0=Date.now(),pastes=0,leaves=0,dt;
function rnd(n){var a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]%n}
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){}return null}
function say(t){m.hidden=false;m.className="warn";m.textContent=t;m.scrollIntoView({block:"center"})}
var T=function(s,n){return(String(s).trim().slice(0,n||1000))||"—"},clean=function(s){return String(s).replace(/[`*_~|>@]/g,"").trim()};
f.addEventListener("paste",function(){pastes++});document.addEventListener("visibilitychange",function(){if(document.hidden)leaves++});
function go(n,back){m.hidden=true;S[st].classList.remove("on");st=n;S[st].classList.toggle("back",!!back);S[st].classList.add("on");sp.forEach(function(li,i){li.classList.toggle("on",i==st);li.classList.toggle("ok",i<st)});pb.style.width=(st+1)*25+"%";document.querySelector(".stp").scrollIntoView({behavior:"smooth",block:"center"});if(st==3)recap()}
function valid(i){var els=[].slice.call(S[i].querySelectorAll("input,textarea"));for(var k=0;k<els.length;k++)if(!els[k].reportValidity())return false;return true}
function pick(P,n,k,lim){var hs=[];try{hs=JSON.parse(ls(k)||"[]")}catch(e){}var c=[];P.forEach(function(_,i){if(hs.indexOf(i)<0)c.push(i)});if(c.length<n)c=P.map(function(_,i){return i});var o=[];while(o.length<n)o.push(c.splice(rnd(c.length),1)[0]);ls(k,JSON.stringify(hs.concat(o).slice(-lim)));return o}
function build(r){var Q=window.DAE_Q[r],ti=pick(Q.t,2,"dae_t_"+r,16),si=pick(Q.s,3,"dae_s_"+r,24),pl=function(x){return x+1};
qid=(r=="diplomate"?"D":"A")+" T"+ti.map(pl).join(".")+" S"+si.map(pl).join(".");
var c=ti.map(function(i){return{q:Q.t[i],t:1}}).concat(si.map(function(i){return{q:Q.s[i],t:0}}));for(var k=c.length-1;k>0;k--){var z=rnd(k+1),x=c[k];c[k]=c[z];c[z]=x}cur=c;
box.innerHTML="";dots.innerHTML="";c.forEach(function(it,k){var d=document.createElement("div"),s=document.createElement("small"),h=document.createElement("h3"),ta=document.createElement("textarea"),cc=document.createElement("span");
d.className="qc"+(k?"":" on");s.textContent="Question "+(k+1)+" sur 5 · "+(it.t?"Théorie":"Mise en situation");h.textContent=it.q;ta.className="qa";ta.rows=7;ta.maxLength=500;cc.className="cc";cc.textContent="0/500";
ta.oninput=function(){cc.textContent=ta.value.length+"/500";dots.children[k].classList.toggle("dn",!!ta.value.trim())};d.appendChild(s);d.appendChild(h);d.appendChild(ta);d.appendChild(cc);box.appendChild(d);dots.appendChild(document.createElement("i"))});
show(0);
var dr=document.getElementById("draw"),dq=document.getElementById("dq");dr.hidden=false;dr.classList.add("go");dr.firstChild.textContent="Tirage du questionnaire";clearInterval(dt);
dt=setInterval(function(){dq.textContent=(r=="diplomate"?"D":"A")+" T"+(1+rnd(30))+"."+(1+rnd(30))+" S"+(1+rnd(40))+"."+(1+rnd(40))+"."+(1+rnd(40))},60);
setTimeout(function(){clearInterval(dt);dq.textContent=qid;dr.classList.remove("go");dr.firstChild.textContent="Questionnaire attribué"},1300)}
function show(n,back){qi=n;[].forEach.call(box.children,function(d,i){d.classList.toggle("bk",!!back);d.classList.toggle("on",i==n)});[].forEach.call(dots.children,function(d,i){d.classList.toggle("on",i==n)});document.getElementById("qn").textContent=n==4?"Terminer":"Suivant"}
f.addEventListener("change",function(e){if(e.target.name=="poste")build(e.target.value)});
document.getElementById("n0").onclick=function(){if(!f.poste.value)return say("Choisissez un poste pour continuer.");go(1)};
document.getElementById("n1").onclick=function(){if(valid(1))go(2)};document.getElementById("p1").onclick=function(){go(0,1)};
document.getElementById("qn").onclick=function(){if(qi<4)show(qi+1);else go(3)};document.getElementById("qp").onclick=function(){if(qi>0)show(qi-1,1);else go(1,1)};
document.getElementById("p3").onclick=function(){go(2,1)};
function recap(){var rc=document.getElementById("rc"),qa=[].slice.call(f.querySelectorAll(".qa")),rows=[["Poste",f.poste.value=="diplomate"?"Diplomate":"Administrateur du Corps Diplomatique"],["Pseudo RP",f.pseudo.value],["Discord",f.discord.value],["Questionnaire",qid],["Réponses",qa.filter(function(a){return a.value.trim()}).length+" sur 5"]];
rc.textContent="";rows.forEach(function(r){var a=document.createElement("dt"),b=document.createElement("dd");a.textContent=r[0];b.textContent=r[1];rc.appendChild(a);rc.appendChild(b)})}
function lim(){var n=Date.now(),a=[];try{a=JSON.parse(ls("dae_ts")||"[]")}catch(e){}a=a.filter(function(x){return n-x<864e5});
if(a.some(function(x){return n-x<6e4}))return"Un envoi vient d’être effectué. Patientez une minute.";if(a.filter(function(x){return n-x<36e5}).length>=3)return"Limite atteinte : 3 candidatures par heure.";if(a.length>=5)return"Limite atteinte : 5 candidatures par jour.";return""}
f.onsubmit=function(e){e.preventDefault();if(f.website.value)return say("Candidature envoyée.");
var cks=[].slice.call(S[3].querySelectorAll("input[type=checkbox]"));for(var k=0;k<cks.length;k++)if(!cks[k].reportValidity())return;
var l=lim();if(l)return say(l);
var qa=[].slice.call(f.querySelectorAll(".qa")),sec=Math.round((Date.now()-t0)/1000),mm=Math.floor(sec/60)+" min "+sec%60+" s",sus=sec<60||pastes>3,role=f.poste.value=="diplomate"?"Diplomate":"Administrateur du Corps Diplomatique",col=f.poste.value=="diplomate"?7213856:2046559,
b=f.querySelector("button[type=submit]");b.disabled=true;b.textContent="Envoi en cours…";
var e1={title:(sus?"⚠️ ":"📥 ")+"Nouvelle candidature — "+role,description:"**"+T(clean(f.pseudo.value),100)+"** (`"+T(clean(f.discord.value),100)+"`) candidate au poste de **"+role+"**.",color:col,
fields:[{name:"Pseudo RP",value:T(clean(f.pseudo.value),100),inline:true},{name:"Discord",value:T(clean(f.discord.value),100),inline:true},{name:"Questionnaire",value:"`"+qid+"`",inline:true},{name:"Disponibilités",value:T(f.dispo.value,150)},{name:"Expérience RP",value:T(f.exp.value,350)},{name:"Motivations",value:T(f.motiv.value,450)},{name:"Informations"+(sus?" (à vérifier)":""),value:"⏱ "+mm+" · 📋 "+pastes+" collage(s) · 👁 "+leaves+" sortie(s) d’onglet"}],footer:{text:"DAE Site-77 · Recrutement"},timestamp:new Date().toISOString()},
e2={title:"📝 Réponses — questionnaire "+qid,color:col,fields:qa.map(function(a,k){return{name:T("Q"+(k+1)+" — "+cur[k].q,250),value:T(a.value,500)}})},
fb=function(){b.disabled=false;b.textContent="Envoyer ma candidature";var o=document.getElementById("out");o.hidden=false;o.querySelector("textarea").value=e1.fields.concat(e2.fields).map(function(x){return x.name+" :\n"+x.value}).join("\n\n");say("L’envoi automatique a échoué. Copiez le texte ci-dessous et transmettez-le à la Direction.")};
if(!window.DAE_WEBHOOK)return fb();
fetch(window.DAE_WEBHOOK,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:"Recrutement DAE",allowed_mentions:{parse:[]},embeds:[e1,e2]})}).then(function(r){if(!r.ok)throw 0;
var a=[];try{a=JSON.parse(ls("dae_ts")||"[]")}catch(x){}a.push(Date.now());ls("dae_ts",JSON.stringify(a));
sp.forEach(function(li){li.classList.remove("on");li.classList.add("ok")});pb.style.width="100%";m.hidden=true;
f.innerHTML='<div class="ok2"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44"/><path d="M30 52l14 14 28-30"/></svg><h2>Candidature envoyée</h2><p>La Direction du DAE l’examinera. Vous serez contacté sur Discord.</p></div>'}).catch(fb)};
document.getElementById("cp").onclick=function(){var a=document.querySelector("#out textarea");a.select();try{navigator.clipboard.writeText(a.value)}catch(x){document.execCommand("copy")}this.textContent="Copié"}
})();