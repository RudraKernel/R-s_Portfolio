/* Cosmos layer: scroll-driven universe, splash cursor, curved loop, smooth scroll, anime.js intro */
(()=>{const $=s=>document.querySelector(s),RM=matchMedia('(prefers-reduced-motion:reduce)').matches,CO=matchMedia('(pointer:coarse)').matches,dpr=Math.min(devicePixelRatio||1,CO?1.5:2);
const cos=$('#cosmos');let sv=0,sp=0,last=scrollY,curVis=true;{const ce=document.querySelector('.curve');if(ce&&'IntersectionObserver' in window)new IntersectionObserver(en=>{curVis=en[0].isIntersecting},{rootMargin:'250px'}).observe(ce)}
/* smooth scroll (Lenis) */
let lenis=null;if(window.Lenis&&!RM){try{lenis=new Lenis({duration:1.15,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t))});document.documentElement.classList.add('lenis');
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=$(a.getAttribute('href'));if(t){e.preventDefault();lenis.scrollTo(t,{offset:-10})}}))}catch(e){lenis=null}}
/* depth starfield: parallax + warp streaks tied to scroll speed */
const dc=$('#depth'),dx=dc.getContext('2d');let W,H,ST=[];
const rs=()=>{W=dc.width=innerWidth*dpr;H=dc.height=innerHeight*dpr;ST=Array.from({length:CO?70:170},()=>({x:Math.random()*W,y:Math.random()*H*3,z:.2+Math.random()*.8,c:Math.random()}))};rs();addEventListener('resize',rs);
/* splash cursor: glowing fluid-like ink */
const fc=$('#fluid'),fx=fc.getContext('2d'),P=[];let FW,FH,lx=-1,ly=-1,hue=320;
const fr=()=>{FW=fc.width=innerWidth*dpr;FH=fc.height=innerHeight*dpr};fr();addEventListener('resize',fr);
const emit=(x,y)=>{if(RM)return;if(lx>=0){const dxn=x-lx,dyn=y-ly,d=Math.hypot(dxn,dyn),n=Math.min(CO?2:4,1+(d/18|0));hue=(hue+d*.35)%360;for(let i=0;i<n;i++)P.push({x:x-dxn*i/n,y:y-dyn*i/n,vx:dxn*.06+(Math.random()-.5)*1.2,vy:dyn*.06+(Math.random()-.5)*1.2,r:(CO?26:34)+Math.random()*16,l:1,h:hue+Math.random()*40})}lx=x;ly=y;if(P.length>(CO?60:140))P.splice(0,P.length-(CO?60:140))};
addEventListener('pointermove',e=>emit(e.clientX,e.clientY),{passive:true});addEventListener('pointerleave',()=>lx=-1);addEventListener('pointerup',()=>lx=-1);
/* main loop */
function tick(){const y=scrollY,m=document.documentElement.scrollHeight-innerHeight,p=m>0?y/m:0;sv+=((y-last)-sv)*.12;last=y;lenis&&lenis.raf(performance.now());
  cos.style.setProperty('--p',p.toFixed(4));const eE=document.getElementById('earthE'),eW=document.getElementById('earthW'),ef=(1+Math.cos(p*9))/2;eE&&(eE.style.opacity=ef.toFixed(3));eW&&(eW.style.opacity=(1-ef).toFixed(3));
  
  curVis&&curve();requestAnimationFrame(tick)}
/* curved loop marquee (draggable, reacts to scroll speed) */
const tp=$('#ctp'),UNIT='BEYOND LOGIC ✦ BEYOND LIMITS ✦ BEYOND ORDINARY ✦ ';let uw=0,off=0,cv=-1.2,drag=0,px=0;
if(tp){tp.textContent=UNIT;uw=tp.getComputedTextLength()||1400;tp.textContent=UNIT.repeat(Math.ceil(3400/uw)+2);
  const sv2=$('#csvg');sv2.addEventListener('pointerdown',e=>{drag=1;px=e.clientX;try{sv2.setPointerCapture(e.pointerId)}catch(_){}});
  sv2.addEventListener('pointermove',e=>{if(!drag)return;const d=e.clientX-px;px=e.clientX;off+=d*2.2;cv=d*.6});['pointerup','pointercancel'].forEach(t=>sv2.addEventListener(t,()=>drag=0))}
function curve(){if(!tp||drag)return;cv+=((cv<0?-1.2:1.2)-cv)*.04;off+=cv-sv*.25;if(off<-uw)off+=uw;if(off>0)off-=uw;tp.setAttribute('startOffset',off.toFixed(1))}
tick();
/* hero entrance (anime.js, falls back to Web Animations) */
const io=new MutationObserver(()=>{if($('#intro').classList.contains('gone')){io.disconnect();const L=[...document.querySelectorAll('#hero h1 > *')];if(RM)return;
  if(window.anime)anime({targets:L,translateY:[60,0],opacity:[0,1],letterSpacing:['.25em','0em'],filter:['blur(12px)','blur(0px)'],delay:anime.stagger(140,{start:350}),duration:1100,easing:'easeOutExpo'});
  else L.forEach((e,i)=>e.animate([{transform:'translateY(60px)',opacity:0,filter:'blur(12px)'},{transform:'none',opacity:1,filter:'blur(0)'}],{duration:1100,delay:350+i*140,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'}))}});
$('#intro')&&io.observe($('#intro'),{attributes:true,attributeFilter:['class']});
})();
