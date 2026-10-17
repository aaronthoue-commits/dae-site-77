(function(){
var q=document.getElementById("fq"),n=document.getElementById("fn"),sg=document.getElementById("sg"),ch=document.getElementById("ch"),C=document.getElementById("gl"),
H=[].slice.call(C.querySelectorAll("h2")),cat="",SW="le la les un une de du des et en au aux est que qui quoi ce ou a l d s c".split(" ");
function nz(s){return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[’']/g," ")}
function ph(s){return nz(s).replace(/[^a-z0-9 ]/g," ").replace(/ph/g,"f").replace(/qu|ck/g,"k").replace(/c(?=[eiy])/g,"s").replace(/c/g,"k").replace(/y/g,"i").replace(/eau|au/g,"o").replace(/ai|ei/g,"e").replace(/(.)\1+/g,"$1").replace(/[sxtd]\b/g,"").replace(/e\b/g,"")}
function tk(s){return nz(s).split(/[^a-z0-9]+/).filter(function(w){return w&&(w.length>1||/\d/.test(w))})}
function lev(a,b){var m=a.length,k=b.length,p=[],i,j;if(Math.abs(m-k)>2)return 9;for(j=0;j<=k;j++)p[j]=j;for(i=1;i<=m;i++){var c=[i];for(j=1;j<=k;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]==b[j-1]?0:1));p=c}return p[k]}
var I=[].slice.call(C.querySelectorAll(".g")).map(function(e){var t=e.querySelector("dt").textContent,tw=tk(t+" "+(e.dataset.a||"")),dw=tk(e.querySelector("dd").textContent);e.classList.add("in");return{e:e,t:t,c:e.dataset.c,tw:tw,tp:tw.map(ph),dw:dw,dp:dw.map(ph),tf:ph(t)}});
function m(w,P,PP,hi){var p=ph(w),b=0,i,s,d;for(i=0;i<P.length;i++){var t=P[i];s=0;
if(t==w)s=100;else if(t.indexOf(w)==0)s=80;else if(w.length>2&&t.indexOf(w)>0)s=55;else if(p.length>1&&PP[i]==p)s=70;
else{d=lev(w,t);if(w.length>3&&d<=1)s=60;else if(w.length>6&&d<=2)s=48;else if(p.length>3&&lev(p,PP[i])<=1)s=50}
if(s>b)b=s}return hi?b:b*.3}
function sc(it,Q,all){var tot=0,miss=0;Q.forEach(function(w){var s=Math.max(m(w,it.tw,it.tp,1),m(w,it.dw,it.dp,0));if(s<=0)miss++;tot+=s});return(all?miss==0:miss<Q.length)?tot:0}
function run(){var v=q.value.trim(),Q=tk(v).filter(function(w){return SW.indexOf(w)<0}),pool=I.filter(function(it){return!cat||it.c==cat}),ok=[];sg.hidden=true;
I.forEach(function(it){it.e.style.order="";it.e.hidden=!!cat&&it.c!=cat});
if(!Q.length){H.forEach(function(h){h.hidden=!!cat&&h.dataset.c!=cat});n.textContent=pool.length+" termes";return}
H.forEach(function(h){h.hidden=true});
[1,0].some(function(all){pool.forEach(function(it){it.s=sc(it,Q,all)});ok=pool.filter(function(it){return it.s>0});return ok.length});
I.forEach(function(it){it.e.hidden=true});
ok.sort(function(a,b){return b.s-a.s||a.t.localeCompare(b.t)}).forEach(function(it,i){it.e.hidden=false;it.e.style.order=i});
n.textContent=ok.length?ok.length+" résultat(s)":"Aucun résultat";
if(!ok.length||ok[0].s<60){var pv=ph(v),bt=null,bd=4;pool.forEach(function(it){var d=lev(pv,it.tf);if(d<bd){bd=d;bt=it}});
if(bt&&bt.t!=v){sg.hidden=false;sg.textContent="Vouliez-vous dire : ";var b=document.createElement("button");b.type="button";b.textContent=bt.t;b.onclick=function(){q.value=bt.t;run()};sg.appendChild(b);sg.appendChild(document.createTextNode(" ?"))}}}
["Tout"].concat(H.map(function(h){return h.dataset.c})).forEach(function(c,i){var b=document.createElement("button");b.type="button";b.textContent=c;if(!i)b.className="on";b.onclick=function(){cat=i?c:"";[].forEach.call(ch.children,function(x){x.classList.toggle("on",x===b)});run()};ch.appendChild(b)});
q.oninput=run;run()})();