
/* ======================== FEATURES (dome, flowing menu, globe, pixel photo, gravity lab, splash, music, terminal) ======================== */
(()=>{
/* ===== CONTACT DETAILS: fill these in (leave blank to hide) ===== */
const CONFIG={email:'rudrakoregave@gmail.com',linkedin:'https://www.linkedin.com/in/rudra-koregave-2b6547424/',github:'https://github.com/RudraKernel',instagram:'https://instagram.com/rrrudra_18',resume:'assets/Rudra_K_Resume.pdf'};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],cl=(v,a,b)=>Math.min(b,Math.max(a,v));
const isM=matchMedia('(pointer:coarse)').matches||innerWidth<800,RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let tgx=0,tgy=0,tix=0,tiy=0;
addEventListener('pointermove',e=>{tgx=(e.clientX/innerWidth-.5)*2;tgy=(e.clientY/innerHeight-.5)*2},{passive:true});
addEventListener('deviceorientation',e=>{if(e.gamma==null)return;tgx=cl(e.gamma/30,-1,1);tgy=cl(((e.beta||0)-50)/30,-1,1)},{passive:true});
const vis={};const vio=new IntersectionObserver(es=>es.forEach(e=>vis[e.target.id]=e.isIntersecting),{rootMargin:'120px'});
['hero','skills','lab'].forEach(id=>{const el=document.getElementById(id);el&&vio.observe(el)});

/* ===== menu + contact links ===== */
$('#mbtn').onclick=()=>{const o=$('#menu').classList.toggle('on');$('#mbtn').setAttribute('aria-expanded',o);$('#mbtn').textContent=o?'Close':'Menu'};
$$('#menu a').forEach(a=>a.onclick=()=>{$('#menu').classList.remove('on');$('#mbtn').textContent='Menu'});
{const mk=(h,t,x)=>`<a class="btn ghost" href="${h}"${x?' target="_blank" rel="noopener"':''}>${t}</a>`;
 $('#flinks').innerHTML=[CONFIG.email&&mk('mailto:'+CONFIG.email,'Email'),CONFIG.linkedin&&mk(CONFIG.linkedin,'LinkedIn',1),CONFIG.github&&mk(CONFIG.github,'GitHub',1),CONFIG.instagram&&mk(CONFIG.instagram,'Instagram',1),CONFIG.resume&&mk(CONFIG.resume,'Download résumé',1)].filter(Boolean).join('')}

/* ===== soft background music (fade-in, low level; iOS-safe gain when hosted) ===== */
const aud=$('#aud');let mus=0,musG=null,mctx=null,drone=null;
const actx=()=>{if(!mctx){try{mctx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}}mctx&&mctx.state=='suspended'&&mctx.resume();return mctx};
function musicGraph(){if(musG||!/^https?:/.test(location.protocol))return;try{const c=actx(),src=c.createMediaElementSource(aud);musG=c.createGain();musG.gain.value=0;src.connect(musG);musG.connect(c.destination)}catch(e){musG=null}}
function droneOn(v){const c=actx();if(!c)return;if(!drone){const g=c.createGain();g.gain.value=0;const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=380;[55,82.41,110,164.8].forEach((f,i)=>{const o=c.createOscillator();o.type='sawtooth';o.frequency.value=f;o.detune.value=i*4;o.connect(lp);o.start()});lp.connect(g);g.connect(c.destination);drone=g}
  drone.gain.setTargetAtTime(v?.014:0,c.currentTime,1.2)}
async function setMusic(v){mus=v;$('#mus').textContent=v?'Music on':'Music off';
  if(v){try{musicGraph();aud.volume=musG?1:0;await aud.play();droneOn(0);
      if(musG)musG.gain.setTargetAtTime(.22,mctx.currentTime,1.4);else{let k=0;const f=setInterval(()=>{k+=.015;aud.volume=Math.min(.22,k);if(k>=.22)clearInterval(f)},120)}}catch(e){droneOn(1)}}
  else{if(musG)musG.gain.setTargetAtTime(0,mctx.currentTime,.25);else aud.volume=0;setTimeout(()=>aud.pause(),600);droneOn(0)}}
(()=>{const a=$('#aud');a&&a.addEventListener('error',()=>{const m=$('#mus');m&&(m.style.display='none')},true)})();
window.__start=()=>{actx();setMusic(1);if(window.DeviceOrientationEvent&&DeviceOrientationEvent.requestPermission)DeviceOrientationEvent.requestPermission().catch(()=>{})};
$('#mus').onclick=()=>setMusic(!mus);
document.addEventListener('visibilitychange',()=>{if(document.hidden){aud.pause();mctx&&mctx.suspend()}else if(mus){aud.play().catch(()=>{});mctx&&mctx.resume()}});

/* ===== decrypt text on reveal (with soft ticks) ===== */
const CH='01<>/[]{}#@$%&*+=';
function scr(el,dur=800){[...el.childNodes].filter(n=>n.nodeType==3&&n.textContent.trim()).forEach(n=>{const fin=n.__o||(n.__o=n.textContent),L=fin.length,t0=performance.now();let lb=0;
  (function st(){const k=Math.min(1,(performance.now()-t0)/dur),dn=Math.floor(k*L);let o='';for(let i=0;i<L;i++)o+=(i<dn||fin[i]==' ')?fin[i]:CH[Math.random()*CH.length|0];n.textContent=o;
    const now=performance.now();if(now-lb>55&&k<1){lb=now;try{blip(600+Math.random()*900,.025,.01)}catch(e){}}
    if(k<1)requestAnimationFrame(st);else n.textContent=fin})()})}
if(!RM){const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!e.target.__s){e.target.__s=1;scr(e.target,e.target.tagName=='H2'?900:600)}}),{threshold:.5});$$('section h2, .eyebrow').forEach(e=>so.observe(e))}
/* count-up numbers */
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!e.target.__c){e.target.__c=1;const n=e.target,to=+n.dataset.n;let k=0;const it=setInterval(()=>{k+=Math.ceil(to/30);if(k>=to){k=to;clearInterval(it)}n.textContent=k},40)}}),{threshold:.6});$$('[data-n]').forEach(n=>cio.observe(n));

/* ===== flowing menu ===== */
$$('.fm').forEach(nav=>{const items=JSON.parse(nav.dataset.fm);
  nav.innerHTML=items.map(it=>`<a class="fmi" tabindex="0"><div class="fmh"><b>${esc(it.t)}</b><small>${esc(it.s)}</small></div><div class="fmm"><div class="fmr">${Array(6).fill(`<span>${esc(it.t)}</span>${it.k?`<i class="kb ${it.k}"></i>`:''}`).join('')}</div></div></a>`).join('');
  [...nav.children].forEach(a=>{const m=a.querySelector('.fmm'),edge=e=>{const b=a.getBoundingClientRect();return(e.clientY-b.top)<b.height/2?-1:1};
    a.addEventListener('pointerenter',e=>{if(e.pointerType=='touch')return;m.style.transition='none';m.style.transform=`translateY(${edge(e)*101}%)`;void m.offsetWidth;m.style.transition='';m.style.transform='translateY(0)'});
    a.addEventListener('pointerleave',e=>{if(e.pointerType=='touch')return;m.style.transform=`translateY(${edge(e)*101}%)`});
    a.addEventListener('click',()=>{if(matchMedia('(hover:none)').matches){[...nav.children].forEach(x=>x!==a&&x.classList.remove('open'));a.classList.toggle('open')}})})});

/* ===== hero portrait: pixel transition cycling through your photos ===== */
const frame=$('#hf'),PXG=$('#pxg');let pxShow=0,pxBusy=0;
PXG.innerHTML='<i></i>'.repeat(180);
const pxc=()=>[...PXG.children],pxr=()=>(Math.random()*900|0)+'ms';
function pxTo(s){if(pxBusy||s==pxShow)return;pxBusy=1;pxShow=s;pxc().forEach(c=>{c.style.transitionDelay=pxr();c.style.opacity=1});
  setTimeout(()=>{frame.classList.toggle('show',!!s);pxc().forEach(c=>{c.style.transitionDelay=pxr();c.style.opacity=0});setTimeout(()=>{pxBusy=0;pxTo(+(scrollY>60))},1500)},1500)}
pxc().forEach(c=>c.style.opacity=0);
addEventListener('scroll',()=>pxTo(+(scrollY>60)),{passive:true});

/* ===== 3D skills globe (moves with scroll, pointer, tilt, plus a slow drift) ===== */
const SK=['Git & GitHub','Debugging','Leadership','Fitness','Music','Photography','Front End Dev','Backend Dev','HTML','CSS','JavaScript','Learning C','Vibe Coding','Motion Design','3D on the Web','Video Editing','Cinematography','Acting','Storytelling','Esports IGL','Gaming','Basketball','Cooking','Communication','Teamwork','Strategic Thinking','Decision Making','Adaptability','Public Speaking','Time Management','Problem Solving','Creativity','Discipline','Emotional Intelligence','Collaboration'];
const GW=$('.gw'),GL=$('#globe');GL.insertAdjacentHTML('beforeend',SK.map(s=>`<span class="gs">${esc(s)}</span>`).join(''));
const GS=$$('.gs');
const GPT=GS.map((_,i,a)=>{const n=a.length,y=1-(i/(n-1))*2,r=Math.sqrt(1-y*y),th=i*2.39996;return[Math.cos(th)*r,y,Math.sin(th)*r]});
let gya=0,gxa=.15,gvy=.004,gdn=0,gpx=0,gpy=0;
GL.addEventListener('pointerdown',e=>{gdn=1;gpx=e.clientX;gpy=e.clientY;try{GL.setPointerCapture(e.pointerId)}catch(_){}});
GL.addEventListener('pointermove',e=>{if(!gdn)return;const dx=e.clientX-gpx,dy=e.clientY-gpy;gpx=e.clientX;gpy=e.clientY;gya+=dx*.008;gxa=cl(gxa+dy*.006,-1.2,1.2);gvy=dx*.008});
['pointerup','pointercancel'].forEach(t=>GL.addEventListener(t,()=>gdn=0));
function globe(){if(!vis.skills)return;if(!gdn){gya+=gvy;gvy+=((RM?0:.004)-gvy)*.03}
  const R=Math.min(215,GL.offsetWidth*.38),b=gya,a=gxa,cb=Math.cos(b),sn=Math.sin(b),ca=Math.cos(a),sa=Math.sin(a);
  GL.style.setProperty('--R',R+'px');GW.style.transform=`rotateX(${a}rad) rotateY(${b}rad)`;
  GS.forEach((el,i)=>{const[x,y,z]=GPT[i],x1=x*cb+z*sn,z1=-x*sn+z*cb,y2=y*ca-z1*sa,z2=y*sa+z1*ca;
    el.style.transform=`translate(-50%,-50%) translate3d(${(x1*R).toFixed(1)}px,${(y2*R).toFixed(1)}px,${(z2*R).toFixed(1)}px) scale(${(.75+.35*(z2+1)/2).toFixed(2)})`;el.style.opacity=(.35+.65*(z2+1)/2).toFixed(2);el.style.zIndex=Math.round((z2+1)*50)})}

let gf=0;
/* ===== live tracker ===== */
const TR=$('#trk'),XH=$('#xh'),YH=$('#yh');let tcx=0,tcy=0,tl='';
addEventListener('pointermove',e=>{tcx=e.clientX;tcy=e.clientY;XH.style.left=tcx+'px';YH.style.top=tcy+'px'},{passive:true});
const pd=n=>String(Math.round(n)).padStart(4,'0');
function track(){const m=document.documentElement.scrollHeight-innerHeight,t=`LIVE // X ${pd(tcx)} Y ${pd(tcy)} // SCROLL ${m>0?Math.round(scrollY/m*100):0}%`;if(t!=tl){tl=t;TR.textContent=t}}

/* ===== notify me (paste a Discord webhook or Formspree URL) ===== */
const NOTIFY_URL='';
const notify=m=>{if(!NOTIFY_URL)return;try{fetch(NOTIFY_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({content:m,message:m})})}catch(e){}};

/* ===== arcade (10 games) ===== */
const GAMES={
'Tic-Tac-Toe'(el){let b=Array(9).fill(''),over=0;const W=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],win=p=>W.some(l=>l.every(i=>b[i]==p));
  el.innerHTML='<div class="g3"></div><p class="hint">You are X</p>';const g=el.firstChild,s=el.lastChild;const dr=()=>{g.innerHTML=b.map((v,i)=>`<button class="gc" data-i="${i}">${v}</button>`).join('')};dr();
  g.onclick=e=>{const i=+e.target.dataset.i;if(over||b[i]!=='')return;b[i]='X';
    if(win('X')){over=1;s.textContent='You win!'}else if(!b.includes('')){over=1;s.textContent='Draw'}
    else{const mv=p=>{for(let k=0;k<9;k++)if(!b[k]){b[k]=p;const w=win(p);b[k]='';if(w)return k}return-1};let m=mv('O');if(m<0)m=mv('X');if(m<0){const f=b.map((v,k)=>v?-1:k).filter(k=>k>=0);m=b[4]===''?4:f[Math.random()*f.length|0]}
      b[m]='O';if(win('O')){over=1;s.textContent='NOVA wins'}else if(!b.includes('')){over=1;s.textContent='Draw'}}dr()}},
'Memory Match'(el){const c=['🚀','🪐','⭐','🌙','🎮','🎬'],cards=[...c,...c].sort(()=>Math.random()-.5);let op=[],done=0,mv=0;
  el.innerHTML='<div class="g4"></div><p class="hint">Moves: <b>0</b></p>';const g=el.firstChild,m=el.querySelector('b');g.innerHTML=cards.map((v,i)=>`<button class="gc" data-i="${i}"></button>`).join('');
  g.onclick=e=>{const i=e.target.dataset.i,b=e.target;if(i==null||op.length>1||b.textContent)return;b.textContent=cards[i];op.push(b);
    if(op.length==2){m.textContent=++mv;if(op[0].textContent==op[1].textContent){op=[];if(++done==6)m.textContent=mv+' — cleared!'}else setTimeout(()=>{op.forEach(x=>x.textContent='');op=[]},700)}}},
'Reaction Time'(el){el.innerHTML='<button class="gc big2">Click to start</button>';const b=el.firstChild;let t=0,to,st=0;
  b.onclick=()=>{if(st==0){st=1;b.textContent='Wait for green...';b.style.background='#a00';to=setTimeout(()=>{st=2;t=performance.now();b.style.background='#0a0';b.textContent='CLICK!'},1000+Math.random()*2500)}
    else if(st==1){clearTimeout(to);st=0;b.style.background='';b.textContent='Too early! Click to retry'}else{st=0;b.style.background='';b.textContent=Math.round(performance.now()-t)+' ms — click to retry'}};return()=>clearTimeout(to)},
'Click Speed'(el){el.innerHTML='<button class="gc big2">Click as fast as you can for 5s</button>';const b=el.firstChild;let n=0,t0=0,run=0,iv=0;
  b.onclick=()=>{if(!run){run=1;n=0;t0=performance.now()}if(run==1){n++;b.textContent=n+' clicks';if(!iv)iv=setInterval(()=>{if(performance.now()-t0>5000){clearInterval(iv);iv=0;run=2;b.textContent=(n/5).toFixed(1)+' clicks/sec — click to retry';setTimeout(()=>run=0,400)}},50)}};return()=>clearInterval(iv)},
'Guess the Number'(el){const s=1+Math.random()*100|0;let n=0;el.innerHTML='<p class="hint">I picked a number from 1 to 100.</p><input type="number" class="gi2" min="1" max="100"><button class="btn">Guess</button><p></p>';
  const i=el.querySelector('input'),p=el.lastChild;el.querySelector('button').onclick=()=>{const v=+i.value;if(!v)return;n++;p.textContent=v==s?`Correct in ${n} tries!`:v<s?'Higher ↑':'Lower ↓'}},
'Whack-a-Mole'(el){el.innerHTML='<div class="g3"></div><p class="hint">Score: <b>0</b> · <span>20</span>s</p>';const g=el.firstChild,sc=el.querySelector('b'),tm=el.querySelector('span');g.innerHTML='<button class="gc"></button>'.repeat(9);const c=[...g.children];let s=0,t=20,m=-1;
  const mv=setInterval(()=>{if(m>=0)c[m].textContent='';m=Math.random()*9|0;c[m].textContent='👾'},650),cd=setInterval(()=>{tm.textContent=--t;if(t<=0){clearInterval(mv);clearInterval(cd);if(m>=0)c[m].textContent='';m=-1;tm.textContent='0 — game over'}},1000);
  g.onclick=e=>{const i=c.indexOf(e.target);if(i==m&&i>=0){sc.textContent=++s;e.target.textContent='';m=-1}};return()=>{clearInterval(mv);clearInterval(cd)}},
'Rock Paper Scissors'(el){const O=['🪨','📄','✂️'];let w=0,l=0;el.innerHTML='<div class="g3">'+O.map((o,i)=>`<button class="gc" data-i="${i}">${o}</button>`).join('')+'</div><p class="hint"></p>';
  el.firstChild.onclick=e=>{const i=+e.target.dataset.i;if(isNaN(i))return;const c=Math.random()*3|0,r=i==c?'Draw':(i-c+3)%3==1?(w++,'You win'):(l++,'NOVA wins');el.lastChild.textContent=`${O[i]} vs ${O[c]} — ${r}  (W ${w} · L ${l})`}},
'Typing Speed'(el){const T='the quick brown fox jumps over the lazy dog while the universe keeps on expanding';el.innerHTML=`<p class="hint">${T}</p><input class="gi2" placeholder="start typing..." spellcheck="false"><p></p>`;const i=el.querySelector('input'),p=el.lastChild;let t0=0;
  i.oninput=()=>{if(!t0)t0=performance.now();if(i.value==T){p.textContent=Math.round(T.split(' ').length/((performance.now()-t0)/60000))+' WPM';i.disabled=1}}},
'Snake'(el){el.innerHTML='<canvas width="300" height="300" class="sn"></canvas><p class="hint">Arrow keys or the pad. Score: <b>0</b></p><div class="dp"><button class="btn ghost" data-d="l">←</button><button class="btn ghost" data-d="u">↑</button><button class="btn ghost" data-d="d">↓</button><button class="btn ghost" data-d="r">→</button></div>';
  const x=el.firstChild.getContext('2d'),sc=el.querySelector('b');let s=[[7,7]],d=[1,0],f=[3,3],n=0;const sd=m=>{if(m&&(m[0]!=-d[0]||m[1]!=-d[1]))d=m};
  const key=e=>{const m={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]}[e.key];if(m){sd(m);e.preventDefault()}};addEventListener('keydown',key);
  el.querySelector('.dp').onclick=e=>sd({u:[0,-1],d:[0,1],l:[-1,0],r:[1,0]}[e.target.dataset.d]);
  const iv=setInterval(()=>{let h=[s[0][0]+d[0],s[0][1]+d[1]];if(h[0]<0||h[1]<0||h[0]>14||h[1]>14||s.some(p=>p[0]==h[0]&&p[1]==h[1])){s=[];d=[1,0];n=0;h=[7,7]}
    s.unshift(h);if(h[0]==f[0]&&h[1]==f[1]){f=[Math.random()*15|0,Math.random()*15|0];n++}else s.pop();sc.textContent=n;
    x.fillStyle='#000';x.fillRect(0,0,300,300);x.fillStyle='#ff1f8e';x.fillRect(f[0]*20,f[1]*20,18,18);x.fillStyle='#c6ff00';s.forEach(p=>x.fillRect(p[0]*20,p[1]*20,18,18))},140);return()=>{clearInterval(iv);removeEventListener('keydown',key)}},
'Simon Says'(el){const C=['#ff1f8e','#c6ff00','#38bdf8','#f59e0b'];let q=[],i=0,lock=1;el.innerHTML='<div class="g2">'+C.map((c,k)=>`<button class="gc" data-i="${k}" style="background:${c};opacity:.45"></button>`).join('')+'</div><p class="hint">Watch, then repeat. Click a square to start. Round: <b>0</b></p>';
  const bs=[...el.querySelectorAll('.gc')],r=el.querySelector('b'),fl=k=>{bs[k].style.opacity=1;blip(300+k*150,.15,.03);setTimeout(()=>bs[k].style.opacity=.45,300)};
  const play=()=>{lock=1;i=0;q.push(Math.random()*4|0);r.textContent=q.length-1;q.forEach((k,j)=>setTimeout(()=>fl(k),600+j*600));setTimeout(()=>lock=0,600+q.length*600)};
  el.querySelector('.g2').onclick=e=>{const k=+e.target.dataset.i;if(isNaN(k))return;if(!q.length){play();return}if(lock)return;fl(k);if(k!=q[i]){q=[];r.textContent='0 — wrong! click to restart';return}if(++i==q.length)setTimeout(play,700)}}
};
let stopG=()=>{};const ARC=$('#arc'),AB=$('#arcBtn'),AS=$('#arcs');
$('#arcl').innerHTML=Object.keys(GAMES).map(k=>`<button class="btn ghost" data-g="${esc(k)}">${esc(k)}</button>`).join('');
AB.onclick=()=>{ARC.hidden=!ARC.hidden;AB.textContent=ARC.hidden?'Open arcade':'Close arcade'};
$('#arcl').onclick=e=>{const k=e.target.dataset.g;if(!k)return;stopG();AS.innerHTML='';stopG=GAMES[k](AS)||(()=>{})};

/* ===== rotating facts (add or edit freely) ===== */
const FACTS=['A day on Venus is longer than its year: it spins once every 243 Earth days but orbits the Sun in about 225.','Sunlight takes roughly 8 minutes and 20 seconds to reach Earth.','A teaspoon of neutron star material would weigh billions of tons.','Honey found in ancient Egyptian tombs was still edible after thousands of years.','The first computer "bug" was a real moth found in Harvard\'s Mark II in 1947.','The first website went live in 1991, built by Tim Berners-Lee at CERN.','Octopuses have three hearts and blue blood.','Bananas are botanically berries, but strawberries are not.','Saturn is less dense than water, so it would float in a big enough bathtub.','The Moon drifts away from Earth by about 3.8 cm every year.','One of the first video game tournaments was a Spacewar! contest at Stanford in 1972.','JavaScript was created by Brendan Eich in about ten days in 1995.'];
let fi=Math.random()*FACTS.length|0;const fe=$('#fact'),nf=()=>{fe.style.opacity=0;setTimeout(()=>{fe.textContent=FACTS[fi++%FACTS.length];fe.style.opacity=1},350)};nf();setInterval(()=>{if(vis.lab&&!document.hidden)nf()},7000);

/* ===== VIVRE CARD: memory card + visitor wall ===== */
const WC=window.WALL_CFG||{},FS=!!(WC.projectId&&WC.apiKey),SITE_URL=WC.siteUrl||location.href.split('#')[0];
const VQ=[{k:'name',q:"Hey! I'm the VIVRE bot. What's your name?",t:'text'},{k:'photo',q:'Nice. Upload a display photo, or skip.',t:'file'},{k:'ig',q:'What is your Instagram handle? Your card will carry a QR code that opens your profile. Skip it if you prefer.',t:'text',skip:1},{k:'theme',q:'Pick a theme.',t:'opt',o:['Ember','Neon','Cyber','Royal','Mono']},{k:'bg',q:'What background do you want?',t:'opt',o:['Space','Grid','Gradient','Plain']},{k:'desc',q:'Describe your card: a tagline, your role, your vibe.',t:'text'},{k:'share',q:'Leave your card on my visitor wall? Your name, card and Instagram handle (if you gave one) will be visible to everyone who visits.',t:'opt',o:['Yes, add me','No, just download']}];
const WALL_ON=FS||/^(localhost|127\.|\[::1\]|)$/.test(location.hostname)||location.protocol=='file:';
if(!WALL_ON){const w=document.getElementById('wall');w&&(w.hidden=true);const k=VQ.findIndex(s=>s.k=='share');k>=0&&VQ.splice(k,1)}
const PAL={Ember:['#e8693a','#ffb199'],Neon:['#ff1f8e','#c6ff00'],Cyber:['#00e5ff','#7c4dff'],Royal:['#ffd54f','#b388ff'],Mono:['#ffffff','#9aa0a6']};
const mkc=s=>{const c=document.createElement('canvas');c.width=1000*s;c.height=600*s;const x=c.getContext('2d');x.scale(s,s);return[c,x]};
function drawQR(x,px,py,size,url){if(!window.QR)return;try{const q=QR.make(url),n=q.size,qz=3,cs=size/(n+qz*2);x.fillStyle='#ecebe6';x.fillRect(px,py,size,size);x.fillStyle='#0a0a0a';for(let r=0;r<n;r++)for(let c=0;c<n;c++)if(q.get(r,c))x.fillRect(px+(c+qz)*cs,py+(r+qz)*cs,cs+.5,cs+.5)}catch(e){}}
function drawCard(D,s=1){const[a,b]=PAL[D.theme]||PAL.Ember,[fc,x]=mkc(s),[bc,y]=mkc(s),nm=String(D.name||'').slice(0,24);
  x.fillStyle=D.bg=='Space'?'#02030a':D.bg=='Grid'?'#05060d':'#0b0b0f';x.fillRect(0,0,1000,600);
  if(D.bg=='Space'){for(let k=0;k<150;k++){x.globalAlpha=Math.random();x.fillStyle='#fff';x.fillRect(Math.random()*1000,Math.random()*600,1.6,1.6)}x.globalAlpha=1}
  if(D.bg=='Grid'){x.strokeStyle=a;x.globalAlpha=.14;for(let k=0;k<=1000;k+=40){x.beginPath();x.moveTo(k,0);x.lineTo(k,600);x.stroke()}for(let k=0;k<=600;k+=40){x.beginPath();x.moveTo(0,k);x.lineTo(1000,k);x.stroke()}x.globalAlpha=1}
  if(D.bg=='Gradient'){const g=x.createLinearGradient(0,0,1000,600);g.addColorStop(0,'#0b0b14');g.addColorStop(.6,a+'55');g.addColorStop(1,b+'66');x.fillStyle=g;x.fillRect(0,0,1000,600)}
  x.save();x.rotate(-.1);x.fillStyle='rgba(255,255,255,.06)';x.font="900 170px Sora,sans-serif";for(let r=0;r<4;r++)x.fillText(nm.toUpperCase().slice(0,10),-60-r*40,150+r*170);x.restore();
  [[700,60,.9],[790,22,.65],[830,10,.5]].forEach(([px,w,al])=>{x.globalAlpha=al;x.fillStyle=a;x.beginPath();x.moveTo(px,0);x.lineTo(px+w,0);x.lineTo(px+w-220,600);x.lineTo(px-220,600);x.fill()});x.globalAlpha=1;
  const im=D.img;x.save();x.beginPath();x.arc(220,300,135,0,6.283);x.clip();
  if(im){const k=Math.max(270/im.width,270/im.height);x.drawImage(im,220-im.width*k/2,300-im.height*k/2,im.width*k,im.height*k)}else{x.fillStyle=a;x.fillRect(80,160,280,280);x.fillStyle='#000';x.font="800 150px Sora,sans-serif";x.textAlign='center';x.fillText((nm[0]||'?').toUpperCase(),220,355)}x.restore();
  x.lineWidth=6;x.strokeStyle=b;x.beginPath();x.arc(220,300,143,0,6.283);x.stroke();
  x.textAlign='left';x.fillStyle=a;x.font="800 20px Sora,sans-serif";x.fillText('V I V R E   C A R D',60,70);x.fillStyle='#fff';x.font="500 30px Manrope,sans-serif";
  let l='',ty=250,ln=0;String(D.desc||'').split(' ').forEach(w=>{if(x.measureText(l+w).width>300&&l){if(ln++<4)x.fillText(l,420,ty);ty+=42;l=''}l+=w+' '});if(ln<4)x.fillText(l,420,ty);
  x.fillStyle='#9a9a9a';x.font="600 16px Sora,sans-serif";x.fillText('A MEMORY OF NOVA·07',60,560);
  y.fillStyle='#121212';y.fillRect(0,0,1000,600);y.strokeStyle='rgba(255,255,255,.035)';y.lineWidth=2;for(let k=-600;k<1000;k+=26){y.beginPath();y.moveTo(k,600);y.lineTo(k+600,0);y.stroke()}
  y.fillStyle=a;const t=nm.toUpperCase();let fs=78;do{y.font="italic 800 "+fs+"px Sora,sans-serif";fs-=3}while(y.measureText(t).width>540&&fs>34);y.fillText(t,400,320);
  y.fillStyle='#8a8a8a';y.font="600 22px Sora,sans-serif";y.fillText('VISITED NOVA·07 PORTFOLIO',402,372);y.fillText(new Date(D.ts||Date.now()).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}).toUpperCase(),402,406);if(D.ig){y.fillStyle=a;y.font="700 26px Sora,sans-serif";y.fillText('@'+D.ig,402,452);y.fillStyle='#8a8a8a';y.font="600 14px Sora,sans-serif";y.fillText('SCAN THE QR TO OPEN MY INSTAGRAM',402,480)}
  drawQR(y,56,352,204,D.ig?'https://instagram.com/'+D.ig:SITE_URL);y.fillStyle=a;y.font="700 16px Sora,sans-serif";y.textAlign='right';y.fillText('RUDRA K.  //  NOVA·07',940,556);
  return[fc,bc]}
const flipEl=(f,b)=>{const d=document.createElement('div');d.className='flip';d.innerHTML='<div class="fi"><img class="ff" alt=""><img class="fb" alt=""></div>';d.querySelector('.ff').src=f;d.querySelector('.fb').src=b;return d};
/* storage: Firebase Firestore (public wall) when configured, otherwise this browser only */
const fsBase=()=>`https://firestore.googleapis.com/v1/projects/${WC.projectId}/databases/(default)/documents/${WC.collection||'visitors'}`;
async function wallSave(D){const r={name:D.name,theme:D.theme,bg:D.bg,desc:D.desc,photo:D.photo||'',ig:D.ig||'',ts:D.ts};
  if(FS){const s=k=>({stringValue:String(r[k])});await fetch(fsBase()+'?key='+WC.apiKey,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({fields:{name:s('name'),theme:s('theme'),bg:s('bg'),desc:s('desc'),photo:s('photo'),ig:s('ig'),ts:{integerValue:String(r.ts)}}})})}
  else try{const a=JSON.parse(localStorage.getItem('vivre_wall')||'[]');a.unshift(r);localStorage.setItem('vivre_wall',JSON.stringify(a.slice(0,60)))}catch(e){}}
async function wallLoad(){try{if(FS){const j=await(await fetch(fsBase()+'?pageSize=60&orderBy=ts%20desc&key='+WC.apiKey)).json();return(j.documents||[]).map(d=>{const f=d.fields||{},g=k=>f[k]?(f[k].stringValue??f[k].integerValue??''):'';return{name:g('name'),theme:g('theme'),bg:g('bg'),desc:g('desc'),photo:g('photo'),ig:g('ig'),ts:+g('ts')}})}return JSON.parse(localStorage.getItem('vivre_wall')||'[]')}catch(e){return[]}}
const prep=r=>new Promise(res=>{if(!r.photo)return res(r);const im=new Image;im.onload=()=>{r.img=im;res(r)};im.onerror=()=>res(r);im.src=r.photo});
const WALLG=$('#wallg'),WCNT=$('#wallcount');
async function renderWall(){const recs=(await Promise.all((await wallLoad()).map(prep)));WALLG.innerHTML='';WCNT.textContent=recs.length?recs.length+(recs.length==1?' visitor':' visitors'):'';
  if(!recs.length){WALLG.innerHTML='<p class="hint">No cards yet. Be the first: create yours in the Lab.</p>'+(!FS&&location.hostname.match(/^(localhost|127\.)/)?'<p class="hint">Dev note: set projectId and apiKey in js/wall-config.js so everyone sees the same wall.</p>':'');return}
  recs.forEach(D=>{const[f,b]=drawCard(D,.5),el=document.createElement('div');el.className='wc';const n=document.createElement('div');n.className='wn';n.textContent=D.name;if(D.ig&&/^[A-Za-z0-9._]{1,30}$/.test(D.ig)){const a=document.createElement('a');a.className='wig';a.href='https://instagram.com/'+D.ig;a.target='_blank';a.rel='noopener noreferrer';a.textContent='@'+D.ig;n.appendChild(document.createElement('br'));n.appendChild(a)}el.append(flipEl(f.toDataURL('image/jpeg',.82),b.toDataURL('image/jpeg',.82)),n);WALLG.appendChild(el)})}
WALLG.addEventListener('click',e=>{const f=e.target.closest('.flip');f&&f.classList.toggle('on')});
WALL_ON&&(document.fonts?document.fonts.ready:Promise.resolve()).then(renderWall);
/* chatbot */
const VCL=$('#vcl'),VCR=$('#vcr'),VCV=$('#vcv');let vs=0,D={};
const say=(t,me)=>{VCL.insertAdjacentHTML('beforeend',`<div class="m${me?' me':''}">${esc(t)}</div>`);VCL.scrollTop=1e9};
function vask(){if(vs>=VQ.length)return vmake();const s=VQ[vs];say(s.q);
  VCR.innerHTML=s.t=='text'?'<input class="gi2" id="vi" autocomplete="off" maxlength="'+(s.k=='name'?24:s.k=='ig'?60:140)+'"'+(s.k=='ig'?' placeholder="@yourhandle"':'')+'><button class="btn">Send</button>'+(s.skip?'<button class="btn ghost" id="vsk">Skip</button>':''):s.t=='file'?'<input type="file" accept="image/*" id="vf"><button class="btn ghost" id="vsk">Skip</button>':s.o.map(o=>`<button class="btn ghost" data-o="${o}">${o}</button>`).join('')}
const vnext=(v,show)=>{D[VQ[vs].k]=v;say(show,1);vs++;vask()};
VCR.onclick=e=>{const s=VQ[vs],b=e.target.closest('button');if(!s||!b)return;
  if(b.id=='vsk'){vnext(null,'(skipped)');return}if(s.t=='text'){const i=$('#vi'),v=i.value.trim();if(!v)return;if(s.k=='ig'){const h=v.replace(/^https?:\/\/(www\.)?instagram\.com\//i,'').replace(/^@/,'').replace(/[\/?#].*$/,'');if(!/^[A-Za-z0-9._]{1,30}$/.test(h)){say('That does not look like an Instagram handle. Try again, or skip.');return}vnext(h,'@'+h)}else vnext(v,v)}else if(s.t=='opt')vnext(b.dataset.o,b.dataset.o);else if(b.id=='vsk')vnext(null,'(skipped)')};
VCR.addEventListener('keydown',e=>{if(e.key=='Enter'&&e.target.id=='vi')VCR.querySelector('button').click()});
VCR.addEventListener('change',e=>{if(e.target.id!='vf'||!e.target.files[0])return;const im=new Image;im.onload=()=>{const c=document.createElement('canvas');c.width=c.height=160;const k=Math.max(160/im.width,160/im.height);c.getContext('2d').drawImage(im,80-im.width*k/2,80-im.height*k/2,im.width*k,im.height*k);D.img=im;vnext(c.toDataURL('image/jpeg',.7),'(photo uploaded)')};im.src=URL.createObjectURL(e.target.files[0])});
async function vmake(){VCR.innerHTML='';say('Creating your memory card...');D.ts=Date.now();const[f,b]=drawCard(D,1);VCV.innerHTML='';
  const fl=flipEl(f.toDataURL('image/jpeg',.92),b.toDataURL('image/jpeg',.92));fl.classList.add('big');VCV.appendChild(fl);
  const row=document.createElement('div');row.className='row';const dl=(t,c)=>{const a=document.createElement('a');a.className='btn';a.textContent=t;a.download='vivre-card-'+t.split(' ')[1].toLowerCase()+'.png';a.href=c.toDataURL('image/png');return a};
  const rs=document.createElement('button');rs.className='btn ghost';rs.textContent='Make another';rs.onclick=()=>{VCV.innerHTML='';VCL.innerHTML='';vs=0;D={};vask()};row.append(dl('Download front',f),dl('Download back',b),rs);VCV.appendChild(row);
  if(String(D.share).startsWith('Yes')){await wallSave(D);say('Done! Your card is now on the visitor wall below.');renderWall()}else say(D.share?'Done! Your card was not added to the wall.':'Done! Download your card below.');
  notify(`VIVRE CARD created: ${D.name} | ${D.theme} | ${D.bg} | ${D.desc} | wall: ${D.share} | ${new Date().toLocaleString('en-IN',{timeZone:'Asia/Kolkata'})} IST`)}
vask();

/* ===== terminal ===== */
const tout=$('#tout'),tin=$('#tin'),hist=[];let hi=0;const P=t=>{tout.textContent+=t+'\n';tout.scrollTop=1e9};
const CMD={help:()=>'about  edu  skills  interests  projects  clubs  esports  sports  whoami  contact  date  clear',
 about:()=>'Rudra K. aka SAM aka NOVA 07 — Mumbai, Maharashtra. B.Tech IT at NMIMS Shirpur.',whoami:()=>'Rudra K. (SAM) — front-end developer, esports IGL, actor and filmmaker · Mumbai, India',
 edu:()=>'Royal International School (1-4) | Guardian School (5-10) | Excellence Educare | B.Tech IT, NMIMS Shirpur (now)',
 skills:()=>'Front End Dev, Vibe Coder, HTML, JavaScript, learning C, video editing, cinematography, acting, esports IGL',
 interests:()=>'anime, music, series, Neighbours, physics and universe books, cars and bikes, sci-fi cinema, photography',
 projects:()=>'R.S. Poems -> https://r-s-poems-2uqi.vercel.app/\nAjeya -> https://sakshamxdaksh-phi.vercel.app/\nBeYogaWise -> https://beyogawise-omega.vercel.app/',
 clubs:()=>'OC App Development Club | OC Raw Vision Media | OC Rang Drama Club | OC Well Being Club | Class Representative | Led Green House',
 esports:()=>'IGL Team Divinity: 7 | The Exorcists: 39 | Team Dominion: 12 | NRL Eagles: 45 (Tier 2 lobby)',sports:()=>'Basketball, district level, A.Y. 2023-2024',
 contact:()=>{const l=Object.entries(CONFIG).filter(([k,v])=>v);return l.length?l.map(([k,v])=>k+': '+v).join('\n'):'Contact details are not published yet.'},
 date:()=>new Date().toLocaleString('en-IN',{timeZone:'Asia/Kolkata'})+' IST',clear:()=>{tout.textContent='';return''}};
P('Rudra K. — interactive résumé\ntype "help" to see what you can ask.');
tin.addEventListener('keydown',e=>{if(e.key=='Enter'){const v=tin.value.trim().toLowerCase();if(!v)return;hist.push(v);hi=hist.length;P('rudra@portfolio:~$ '+v);const f=CMD[v],o=f?f():`command not found: ${v}  (try help)`;if(o)P(o);tin.value=''}
  else if(e.key=='ArrowUp'){hi=Math.max(0,hi-1);tin.value=hist[hi]||'';e.preventDefault()}else if(e.key=='ArrowDown'){hi=Math.min(hist.length,hi+1);tin.value=hist[hi]||''}else if(e.key=='Tab'){const m=Object.keys(CMD).find(k=>k.startsWith(tin.value));if(m)tin.value=m;e.preventDefault()}});

/* ===== splash cursor: real-time fluid (Stam stable fluids) in the pink/lime palette ===== */
const SPC=$('#splash'),spx=SPC.getContext('2d');
const SF=(()=>{const N=isM?44:68,S=N+2,sz=S*S,mk=()=>new Float32Array(sz),IX=(i,j)=>i+S*j;
  let u=mk(),v=mk(),u0=mk(),v0=mk(),r=mk(),g=mk(),b=mk(),r0=mk(),g0=mk(),b0=mk(),pr=mk(),dv=mk();
  const bnd=(k,x)=>{for(let i=1;i<=N;i++){x[IX(0,i)]=k==1?-x[IX(1,i)]:x[IX(1,i)];x[IX(N+1,i)]=k==1?-x[IX(N,i)]:x[IX(N,i)];x[IX(i,0)]=k==2?-x[IX(i,1)]:x[IX(i,1)];x[IX(i,N+1)]=k==2?-x[IX(i,N)]:x[IX(i,N)]}
    x[IX(0,0)]=.5*(x[IX(1,0)]+x[IX(0,1)]);x[IX(0,N+1)]=.5*(x[IX(1,N+1)]+x[IX(0,N)]);x[IX(N+1,0)]=.5*(x[IX(N,0)]+x[IX(N+1,1)]);x[IX(N+1,N+1)]=.5*(x[IX(N,N+1)]+x[IX(N+1,N)])};
  const adv=(k,d,d0,uu,vv,dt)=>{const t0=dt*N;for(let j=1;j<=N;j++)for(let i=1;i<=N;i++){const id=IX(i,j);let x=i-t0*uu[id],y=j-t0*vv[id];x=x<.5?.5:x>N+.5?N+.5:x;y=y<.5?.5:y>N+.5?N+.5:y;
    const i0=x|0,j0=y|0,s1=x-i0,t1=y-j0;d[id]=(1-s1)*((1-t1)*d0[IX(i0,j0)]+t1*d0[IX(i0,j0+1)])+s1*((1-t1)*d0[IX(i0+1,j0)]+t1*d0[IX(i0+1,j0+1)])}bnd(k,d)};
  const proj=()=>{for(let j=1;j<=N;j++)for(let i=1;i<=N;i++){dv[IX(i,j)]=-.5*(u[IX(i+1,j)]-u[IX(i-1,j)]+v[IX(i,j+1)]-v[IX(i,j-1)])/N;pr[IX(i,j)]=0}bnd(0,dv);bnd(0,pr);
    for(let k=0;k<10;k++){for(let j=1;j<=N;j++)for(let i=1;i<=N;i++)pr[IX(i,j)]=(dv[IX(i,j)]+pr[IX(i-1,j)]+pr[IX(i+1,j)]+pr[IX(i,j-1)]+pr[IX(i,j+1)])/4;bnd(0,pr)}
    for(let j=1;j<=N;j++)for(let i=1;i<=N;i++){u[IX(i,j)]-=.5*N*(pr[IX(i+1,j)]-pr[IX(i-1,j)]);v[IX(i,j)]-=.5*N*(pr[IX(i,j+1)]-pr[IX(i,j-1)])}bnd(1,u);bnd(2,v)};
  SPC.width=SPC.height=N;const img=spx.createImageData(N,N);
  return{splat(x,y,dx,dy,c){const ci=Math.round(x*N)+1,cj=Math.round(y*N)+1;for(let dj=-3;dj<=3;dj++)for(let di=-3;di<=3;di++){const i=ci+di,j=cj+dj;if(i<1||j<1||i>N||j>N)continue;const w=Math.exp(-(di*di+dj*dj)/3.2),id=IX(i,j);u[id]+=dx*w;v[id]+=dy*w;r[id]+=c[0]*w;g[id]+=c[1]*w;b[id]+=c[2]*w}},
    step(dt){u0.set(u);v0.set(v);adv(1,u,u0,u0,v0,dt);adv(2,v,v0,u0,v0,dt);proj();r0.set(r);g0.set(g);b0.set(b);adv(0,r,r0,u,v,dt);adv(0,g,g0,u,v,dt);adv(0,b,b0,u,v,dt);
      let e=0;for(let k=0;k<sz;k++){u[k]*=.992;v[k]*=.992;r[k]*=.983;g[k]*=.983;b[k]*=.983;e+=r[k]+g[k]+b[k]}return e},
    draw(){const d=img.data;for(let j=1;j<=N;j++)for(let i=1;i<=N;i++){const id=IX(i,j),o=((j-1)*N+(i-1))*4,R=r[id],G=g[id],B=b[id],m=Math.max(R,G,B);if(m<.004){d[o+3]=0;continue}const k=255/Math.max(1,m);d[o]=R*k;d[o+1]=G*k;d[o+2]=B*k;d[o+3]=Math.min(235,m*255)}spx.putImageData(img,0,0)},clear(){spx.clearRect(0,0,N,N)}}})();
let spLast=null,spAct=0,spT=0;
addEventListener('pointermove',e=>{if(RM||(e.pointerType=='touch'&&!e.isPrimary))return;
  if(spLast){const dx=(e.clientX-spLast.x)/innerWidth,dy=(e.clientY-spLast.y)/innerHeight,sp=Math.hypot(dx,dy);
    if(sp>0){const t=(Math.sin(performance.now()/900)+1)/2,c=[(255*(1-t)+198*t)/255,(31*(1-t)+255*t)/255,(142*(1-t))/255],a=Math.min(1,sp*45)*.6+.12;SF.splat(e.clientX/innerWidth,e.clientY/innerHeight,dx*240,dy*240,[c[0]*a,c[1]*a,c[2]*a]);spAct=1;spT=performance.now()}}
  spLast={x:e.clientX,y:e.clientY}},{passive:true});
function splash(){if(!spAct||(isM&&(gf&1)))return;const e=SF.step(1/60);SF.draw();if(e<.6&&performance.now()-spT>2500){spAct=0;SF.clear()}}

/* ===== one animation loop for all features ===== */
(function tick(){gf++;tix+=(tgx-tix)*.06;tiy+=(tgy-tiy)*.06;track();globe();splash();requestAnimationFrame(tick)})();
})();
