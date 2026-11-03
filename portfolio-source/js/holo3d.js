/* 3D project explorer: a ring of panels (live sites, 45 playable builds with live previews, edits and film). Drag to rotate. */
(()=>{const $=s=>document.querySelector(s),cl=(v,a,b)=>Math.min(b,Math.max(a,v)),esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const ring=$('#hring'),holo=$('#holo3d'),info=$('#hinfo'),tabs=$('#ptabs');if(!ring)return;
const P=window.PROJECTS_DATA||[],isM=matchMedia('(pointer:coarse)').matches||innerWidth<800,RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
/* ---- modals ---- */
const vmod=$('#vmod'),vmf=$('#vmf'),vidm=$('#vidm'),vidb=$('#vidb');let cur=null,bu=null;
window.openBuild=o=>{cur=o;$('#vmt').textContent=o.t;vmf.srcdoc=o.h;vmod.classList.add('on')};
const closeB=()=>{vmod.classList.remove('on');vmf.srcdoc='';cur=null};
$('#vmc')&&($('#vmc').onclick=closeB);$('#vmo')&&($('#vmo').onclick=()=>{if(!cur)return;bu&&URL.revokeObjectURL(bu);bu=URL.createObjectURL(new Blob([cur.h],{type:'text/html'}));window.open(bu,'_blank')});
const closeV=()=>{vidm.classList.remove('on');vidb.innerHTML=''};$('#vidc')&&($('#vidc').onclick=closeV);
addEventListener('keydown',e=>{if(e.key=='Escape'){closeB();closeV()}});
const igCode=a=>{if(a.ig)return{type:a.igType||'reel',code:a.ig};const m=(a.url||'').match(/instagram\.com\/(reel|reels|p|tv)\/([A-Za-z0-9_-]+)/);return m?{type:m[1]=='p'?'p':'reel',code:m[2]}:null};
function openFilm(a){const ig=igCode(a);if(ig){vidb.innerHTML=`<iframe class="ig" src="https://www.instagram.com/${ig.type}/${esc(ig.code)}/embed" allow="autoplay;encrypted-media;fullscreen" allowfullscreen scrolling="no"></iframe>`;$('#vidt').textContent=a.title||'';vidm.classList.add('on');return}
  if(a.url&&!a.src&&!a.yt&&!a.drive){window.open(a.url,'_blank','noopener');return}
  vidb.innerHTML=a.yt?`<iframe src="https://www.youtube.com/embed/${esc(a.yt)}?autoplay=1&rel=0" allow="autoplay;encrypted-media;fullscreen" allowfullscreen></iframe>`:a.drive?`<iframe src="https://drive.google.com/file/d/${esc(a.drive)}/preview" allow="autoplay;fullscreen" allowfullscreen></iframe>`:`<video src="${esc(a.src)}" controls autoplay playsinline${a.poster?` poster="${esc(a.poster)}"`:''}></video>`;
  $('#vidt').textContent=a.title||'';vidm.classList.add('on')}
/* ---- data sets ---- */
const live=[{t:'BeYogaWise',d:'A website built for a yoga teacher to present her classes and reach new students.',url:'https://beyogawise-omega.vercel.app/'},{t:'R.S. Poems',d:'A live poetry website.',url:'https://r-s-poems-2uqi.vercel.app/'},{t:'Ajeya',d:'A live website deployed on Vercel.',url:'https://sakshamxdaksh-phi.vercel.app/'}].map(o=>({...o,type:'site'}));
const mk=k=>P.filter(x=>x.k==k).map(x=>({...x,type:'build'}));const mini=mk('mini');
const AW=(window.ART_WORKS||[]).map(a=>({t:a.title,d:a.desc||'',role:a.role||'Film',type:'film',...a}));
const IGP='https://www.instagram.com/thegalacticrudra/';const PH=[{t:'Video editing',d:'Reels, cuts and edits. Watch them on @thegalacticrudra.',role:'Editor'},{t:'Cinematography',d:'Shot composition and film work with Raw Vision Media.',role:'Cinematographer'},{t:'Acting',d:'Stage and screen with Rang Drama Club.',role:'Actor'}].map(o=>({...o,type:'film',url:IGP,profile:1}));
const SETS=[['live','Live sites',live],['adv','Advanced builds',mk('advanced')],['m1','Mini builds I',mini.slice(0,15)],['m2','Mini builds II',mini.slice(15)],['film','Edits and film',AW.length?AW:PH]].filter(s=>s[2].length);
tabs.innerHTML=SETS.map(s=>`<button class="btn ghost" data-s="${s[0]}">${s[1]} <small>${s[2].length}</small></button>`).join('');
/* ---- dome: panels sit on the inside of a dome around you; drag to look around ---- */
let items=[],N=0,pos=[],panels=[],R=1000,PW=290,yaw=0,pitch=0,tyaw=0,tpit=0,drag=0,moved=0,px=0,py=0,vis=true,active=-1,mx=0,my=0,hx=0,hy=0,downP=null,lim={x:40,y:26};
const tag={site:'LIVE SITE',build:'BUILD',film:'FILM'},ang=(a,b)=>Math.hypot(a,b);
function layout(){const rows=N<=5?1:N<=12?2:N<=20?3:4,cols=Math.ceil(N/rows),sx=isM?22:16,sy=isM?30:21;pos=[];
  for(let i=0;i<N;i++){const r=Math.floor(i/cols),inRow=r==rows-1?N-cols*(rows-1):cols,c=i%cols;pos.push({lon:(c-(inRow-1)/2)*sx,lat:((rows-1)/2-r)*sy})}
  lim={x:Math.max(...pos.map(p=>Math.abs(p.lon)))+8,y:Math.max(...pos.map(p=>Math.abs(p.lat)))+8}}
function build(key){const set=SETS.find(s=>s[0]==key)||SETS[0];items=set[2];N=items.length;PW=isM?200:250;R=isM?620:1100;layout();yaw=tyaw=0;pitch=tpit=0;active=-1;
  holo.style.setProperty('--pw',PW+'px');holo.style.setProperty('--sc',((PW-28)/1000).toFixed(4));holo.style.perspective=R+'px';const fn=$('#fnote');fn&&(fn.hidden=key!='film');
  let wire='';[-50,-25,0,25,50].forEach(L=>{const r=R*Math.cos(L*Math.PI/180),y=-R*Math.sin(L*Math.PI/180);wire+=`<i class="hw" style="width:${2*r}px;height:${2*r}px;transform:translate(-50%,-50%) translateY(${y}px) rotateX(90deg)"></i>`});
  [0,30,60,90,120,150].forEach(m=>{wire+=`<i class="hw" style="width:${2*R}px;height:${2*R}px;transform:translate(-50%,-50%) rotateY(${m}deg)"></i>`});
  ring.innerHTML=wire+items.map((o,i)=>{let v;
    if(o.type=='build')v=`<div class="hv"><iframe tabindex="-1" title="${esc(o.t)} preview" sandbox="allow-scripts allow-same-origin"></iframe></div>`;
    else if(o.type=='site')v=`<div class="hv site"><div class="bar"><i></i><i></i><i></i></div><b>${esc(o.t)}</b><small>${esc(o.url.replace('https://',''))}</small></div>`;
    else if(igCode(o)&&!o.poster){v=`<div class="hv film ig"><span class="pl">&#9654;&nbsp; REEL</span></div>`}
    else if(o.profile){v=`<div class="hv film ig"><span class="pl">@THEGALACTICRUDRA</span></div>`}
    else{const th=o.poster?`url('${esc(o.poster)}')`:o.yt?`url('https://i.ytimg.com/vi/${esc(o.yt)}/hqdefault.jpg')`:'none';
      v=`<div class="hv film" style="--th:${th}">${o.src&&!o.poster?`<video muted loop playsinline preload="metadata" src="${esc(o.src)}#t=0.8"></video>`:''}<span class="pl">${o.soon?'COMING SOON':'&#9654;'}</span></div>`}
    const p=pos[i];return `<article class="hp" data-i="${i}" style="transform:rotateY(${-p.lon}deg) rotateX(${-p.lat}deg) translateZ(${-R}px) translate(-50%,-50%)"><span class="hk">${tag[o.type]} · ${String(i+1).padStart(2,'0')}</span>${v}<h3>${esc(o.t||o.title)}</h3><p>${esc(o.d||'')}</p><span class="btn sm ghost">${o.type=='build'?'Open build':o.type=='site'?'Visit site':igCode(o)?'Watch reel':o.profile?'Open Instagram':'Watch'}</span></article>`}).join('');
  panels=[...ring.querySelectorAll('.hp')];tabs.querySelectorAll('button').forEach(b=>{const on=b.dataset.s==set[0];b.classList.toggle('on',on);b.classList.toggle('ghost',!on)})}
const clampT=()=>{tyaw=cl(tyaw,-lim.x,lim.x);tpit=cl(tpit,-lim.y,lim.y)};
const fly=i=>{const p=pos[((i%N)+N)%N];tyaw=p.lon;tpit=p.lat;clampT()};
const nearest=(y,p)=>{let b=0,bd=1e9;pos.forEach((q,i)=>{const d=ang(q.lon-y,q.lat-p);if(d<bd){bd=d;b=i}});return b};
function openItem(o){if(o.type=='build')window.openBuild(o);else if(o.type=='site')window.open(o.url,'_blank','noopener');else if(!o.soon)openFilm(o)}
tabs.onclick=e=>{const b=e.target.closest('button');b&&build(b.dataset.s)};
$('#hprev').onclick=()=>fly(active-1);$('#hnext').onclick=()=>fly(active+1);
holo.addEventListener('pointerdown',e=>{drag=1;moved=0;px=e.clientX;py=e.clientY;downP=e.target.closest('.hp')});
addEventListener('pointermove',e=>{if(drag){const dx=e.clientX-px,dy=e.clientY-py;px=e.clientX;py=e.clientY;moved+=Math.abs(dx)+Math.abs(dy);if(moved>6){yaw=cl(yaw-dx*(isM?.16:.11),-lim.x,lim.x);pitch=cl(pitch+dy*(isM?.14:.1),-lim.y,lim.y);tyaw=yaw;tpit=pitch}}
  if(vis&&e.pointerType!='touch'){const r=holo.getBoundingClientRect();mx=((e.clientX-r.left)/r.width-.5)*2;my=((e.clientY-r.top)/r.height-.5)*2}},{passive:true});
addEventListener('pointerup',()=>{if(!drag)return;drag=0;if(moved<=6){if(downP){const i=+downP.dataset.i;if(i===active&&ang(pos[i].lon-yaw,pos[i].lat-pitch)<9)openItem(items[i]);else fly(i)}}else fly(nearest(yaw,pitch))});
addEventListener('keydown',e=>{if(!vis||vmod.classList.contains('on')||vidm.classList.contains('on'))return;if(e.key=='ArrowRight')fly(active+1);if(e.key=='ArrowLeft')fly(active-1)});
new IntersectionObserver(es=>{vis=es[0].isIntersecting},{rootMargin:'100px'}).observe(holo);
function lazy(){panels.forEach((p,i)=>{const d=ang(pos[i].lon-yaw,pos[i].lat-pitch),f=p.querySelector('iframe'),v=p.querySelector('video');
  if(f){if(d<30&&!f.dataset.on){f.srcdoc=items[i].h;f.dataset.on=1}else if(d>62&&f.dataset.on){f.srcdoc='';f.dataset.on=''}}
  if(v){if(i===active)v.play&&v.play().catch(()=>{});else v.pause&&v.pause()}})}
let lt=0;
function frame(t){requestAnimationFrame(frame);if(!vis||!N)return;
  if(!drag){yaw+=(tyaw-yaw)*.085;pitch+=(tpit-pitch)*.085}
  hx+=(mx*2.2-hx)*.06;hy+=(my*-1.6-hy)*.06;const bob=RM?0:Math.sin(t/1700)*.5;
  ring.style.transform=`translateZ(${R}px) rotateX(${(pitch+hy+bob).toFixed(2)}deg) rotateY(${(yaw+hx).toFixed(2)}deg)`;
  let a=0,ad=1e9;panels.forEach((p,i)=>{const d=ang(pos[i].lon-yaw,pos[i].lat-pitch);if(d<ad){ad=d;a=i}const o=cl(1-(d-34)/34,0,1);p.style.opacity=o.toFixed(2);p.style.pointerEvents=o>.35?'auto':'none'});
  if(a!==active){active=a;panels.forEach((p,i)=>p.classList.toggle('act',i===a));const o=items[a];info.textContent=`${String(a+1).padStart(2,'0')} / ${String(N).padStart(2,'0')}  ·  ${(o.t||o.title).toUpperCase()}`}
  if(t-lt>260){lt=t;lazy()}}
build(SETS[0][0]);requestAnimationFrame(frame);
})();
