
/* intro */
const sig=document.getElementById('sig'),sub=document.getElementById('sub'),en=document.getElementById('enter'),intro=document.getElementById('intro');
let ac;
const blip=(f=900,d=.04,v=.035)=>{try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();const o=ac.createOscillator(),g=ac.createGain();o.type='square';o.frequency.value=f+Math.random()*500;g.gain.value=v;o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+d)}catch(e){}};
const dec=(el,t,sp=45,snd=false)=>new Promise(r=>{const c='#@%&*+=/<>01';let i=0;const h=setInterval(()=>{el.textContent=t.slice(0,i)+Array.from({length:Math.min(6,t.length-i)},()=>c[Math.random()*c.length|0]).join('');if(snd)blip();if(++i>t.length){clearInterval(h);el.textContent=t;r()}},sp)});
const hintEl=document.getElementById('hint'),ring=document.getElementById('ring'),skipB=document.getElementById('skip'),RMi=matchMedia('(prefers-reduced-motion:reduce)').matches;
(async()=>{await dec(sig,'NOVA·07 // ONLINE',45);await dec(sub,'Developer · Esports IGL · Filmmaker',18);})();
/* hyperdrive warp field */
const wc=document.getElementById('warp'),wx=wc.getContext('2d');let WW,WH,ws=[],wsp=.5,chg=0,holding=0,launched=0,wt=0;
const wr=()=>{WW=wc.width=innerWidth;WH=wc.height=innerHeight;ws=Array.from({length:Math.min(420,WW/3|0)},()=>({a:Math.random()*6.283,r:Math.random(),z:Math.random()}))};wr();addEventListener('resize',wr);
function wd(){if(launched==2)return;const hw=WW/2,hh=WH/2,mr=Math.hypot(hw,hh);
  wx.fillStyle='rgba(0,0,0,'+(.35-Math.min(wsp/80,.25))+')';wx.fillRect(0,0,WW,WH);
  for(const s of ws){const pr=s.r;s.r+=wsp*.0009*(.4+s.z*1.6)*(1+s.r*3);const ca=Math.cos(s.a),sa=Math.sin(s.a);
    wx.strokeStyle=s.z>.88?'#ff1f8e':s.z>.74?'#c6ff00':'#fff';wx.globalAlpha=Math.min(1,.2+s.r);wx.lineWidth=.6+s.z*1.4*(1+wsp/20);
    wx.beginPath();wx.moveTo(hw+ca*pr*mr,hh+sa*pr*mr);wx.lineTo(hw+ca*s.r*mr+.4,hh+sa*s.r*mr+.4);wx.stroke();
    if(s.r>1){s.r=Math.random()*.05;s.a=Math.random()*6.283}}
  wx.globalAlpha=1;
  if(!launched){chg=holding?Math.min(1,chg+.0125):Math.max(0,chg-.03);wsp+=((.5+chg*chg*70)-wsp)*.08;ring.style.strokeDashoffset=377*(1-chg);if(holding&&++wt%9==0)blip(180+chg*900,.05,.02);if(chg>=1)launch()}
  requestAnimationFrame(wd)}
/* warp disabled */
function launch(){if(launched)return;launched=1;wsp=120;window.__start&&window.__start();blip(120,.5,.06);
  const fl=document.createElement('div');fl.style.cssText='position:fixed;inset:0;background:#fff;z-index:10002;pointer-events:none;opacity:0';document.body.appendChild(fl);
  fl.animate([{opacity:0},{opacity:1,offset:.35},{opacity:0}],{duration:1100,easing:'ease-in-out'}).onfinish=()=>fl.remove();
  sig.textContent='JUMP COMPLETE';
  intro.animate([{transform:'scale(1)',opacity:1},{transform:'scale(1.5)',opacity:0}],{duration:900,delay:350,easing:'cubic-bezier(.6,0,.2,1)',fill:'forwards'}).onfinish=()=>{intro.classList.add('gone');launched=2;const t=document.getElementById('trk');t&&(t.style.display='none')};
  document.querySelectorAll('main,header,footer').forEach(e=>{if(e.tagName!='HEADER')e.style.transformOrigin='50% 0';e.animate([{transform:'scale(.82)',opacity:0,filter:'blur(14px)'},{transform:'scale(1)',opacity:1,filter:'blur(0)'}],{duration:1300,delay:450,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'})})}
const hs=()=>{if(launched)return;if(RMi){launch();return}holding=1;blip(220,.06,.03)},he=()=>holding=0;
en.addEventListener('pointerdown',e=>{e.preventDefault();try{en.setPointerCapture(e.pointerId)}catch(_){}hs()});
['pointerup','pointercancel'].forEach(t=>en.addEventListener(t,he));en.addEventListener('contextmenu',e=>e.preventDefault());
addEventListener('keydown',e=>{if((e.key=='Enter'||e.key==' ')&&!launched&&en.classList.contains('show')){e.preventDefault();hs()}});
addEventListener('keyup',e=>{if(e.key=='Enter'||e.key==' ')he()});
skipB.onclick=launch;

/* cursor */
const dot=document.getElementById('dot'),cr=document.getElementById('cr');
let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
let cq=0;addEventListener('mousemove',e=>{document.documentElement.classList.add('cur');mx=e.clientX;my=e.clientY;if(!cq)cq=requestAnimationFrame(()=>{cq=0;const t=mx+'px '+my+'px';dot.style.translate=t;cr.style.translate=t})},{passive:true});

document.querySelectorAll('a,button,.tile,.ring i').forEach(e=>{e.addEventListener('mouseenter',()=>cr.classList.add('hot'));e.addEventListener('mouseleave',()=>cr.classList.remove('hot'))});

/* space */
const cv=document.getElementById('space'),cx=cv.getContext('2d');
let W,H,st=[],rk=[],sy=0;
const cols=['#fff','#ff1f8e','#c6ff00'];
function sz(){W=cv.width=innerWidth;H=cv.height=innerHeight;
  st=Array.from({length:Math.min(220,W/5|0)},()=>({x:Math.random()*W,y:Math.random()*H,z:Math.random()*1.8+.3,c:cols[Math.random()<.82?0:1+(Math.random()*2|0)],t:Math.random()*6}));
  rk=[]}
sz();addEventListener('resize',sz);addEventListener('scroll',()=>sy=scrollY,{passive:true});
(function d(){if(!d.c){d.c=1;if(getComputedStyle(cv).display==='none')return}cx.fillStyle='rgba(0,0,0,.4)';cx.fillRect(0,0,W,H);const px=(mx/W-.5)*26;
  for(const s of st){s.t+=.03;s.y-=.07*s.z;if(s.y<0)s.y=H;cx.globalAlpha=.45+Math.sin(s.t)*.4;cx.fillStyle=s.c;cx.fillRect(s.x-px*s.z,(s.y+sy*.07*s.z)%H,s.z,s.z)}
  cx.globalAlpha=1;
  if(!matchMedia('(prefers-reduced-motion:reduce)').matches&&rk.length<3&&Math.random()<.007)rk.push({x:W*(.25+Math.random()*.85),y:-10,vx:-(6+Math.random()*6),vy:3+Math.random()*4,len:90+Math.random()*110,l:1});
  for(let k=rk.length-1;k>=0;k--){const r=rk[k];r.x+=r.vx;r.y+=r.vy;r.l-=.008;const a=Math.atan2(r.vy,r.vx),tx=r.x-Math.cos(a)*r.len,ty=r.y-Math.sin(a)*r.len,o=Math.max(r.l,0),g=cx.createLinearGradient(r.x,r.y,tx,ty);g.addColorStop(0,'rgba(255,255,255,'+o+')');g.addColorStop(.35,'rgba(255,31,142,'+o*.55+')');g.addColorStop(1,'rgba(255,31,142,0)');cx.strokeStyle=g;cx.lineWidth=2;cx.lineCap='round';cx.beginPath();cx.moveTo(r.x,r.y);cx.lineTo(tx,ty);cx.stroke();cx.fillStyle='rgba(255,255,255,'+o+')';cx.beginPath();cx.arc(r.x,r.y,1.8,0,6.283);cx.fill();if(o<=0||r.x<-r.len||r.y>H+r.len)rk.splice(k,1)}
  requestAnimationFrame(d)})();

/* orbit + marquee */

const words=['Developer','Esports IGL','Actor','Cinematographer','Video Editor','Gear head','Stargazer'];
document.getElementById('mq').innerHTML=[...words,...words].map(w=>`<span>${w}</span>`).join('');

/* reveal + hover tilt + photo parallax */
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('in')),{threshold:.12});
document.querySelectorAll('.rv').forEach(e=>io.observe(e));
document.querySelectorAll('.tile:not(.nt)').forEach(c=>{let tr=null,tq=0,te=null;c.addEventListener('mouseenter',()=>{tr=c.getBoundingClientRect()});c.addEventListener('mousemove',e=>{te=e;if(tq)return;tq=requestAnimationFrame(()=>{tq=0;const r=tr||c.getBoundingClientRect();c.style.transform=`perspective(800px) rotateX(${-((te.clientY-r.top)/r.height-.5)*5}deg) rotateY(${((te.clientX-r.left)/r.width-.5)*5}deg)`})},{passive:true});c.addEventListener('mouseleave',()=>{tr=null;c.style.transform=''})});
const figs=[...document.querySelectorAll('.gal figure')],hf=document.getElementById('hf');
addEventListener('scroll',()=>{figs.forEach((f,i)=>{const r=f.getBoundingClientRect(),p=(r.top+r.height/2-innerHeight/2)/innerHeight;f.style.transform=`translateY(${p*(i+1)*-30}px) rotate(${(i-1)*p*3}deg)`});hf.style.transform=`translateY(${scrollY*.06}px)`},{passive:true});
