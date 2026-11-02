/* VOID intro: counter, name reveal, shutter, then page zoom-in */
(()=>{const vi=document.getElementById('vintro');if(!vi)return;const $=s=>document.getElementById(s),RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
document.body.classList.add('vlock');if(matchMedia('(pointer:coarse)').matches&&((navigator.hardwareConcurrency||8)<=4||(navigator.deviceMemory||8)<=3))document.documentElement.classList.add('lite');let done=0,t0=null;const DUR=RM?300:1900,num=$('vnum');
function tick(t){if(t0===null)t0=t;const k=Math.min(1,(t-t0)/DUR),e=1-Math.pow(1-k,3);num.textContent=String(Math.round(e*100)).padStart(3,'0');vi.style.setProperty('--k',e.toFixed(3));if(k<1)requestAnimationFrame(tick);else vi.classList.add('ready')}
requestAnimationFrame(tick);
vi.addEventListener('pointermove',e=>{vi.style.setProperty('--mx',e.clientX+'px');vi.style.setProperty('--my',e.clientY+'px')});
function open(){if(done)return;done=1;vi.classList.add('open');setTimeout(()=>{window.__start&&window.__start()},0);
  setTimeout(()=>{vi.remove();document.body.classList.remove('vlock')},1300);
  if(!RM)requestAnimationFrame(()=>requestAnimationFrame(()=>{document.querySelectorAll('main,header,footer').forEach(e=>{if(e.tagName!='HEADER')e.style.transformOrigin='50% 0';e.animate([{transform:'scale(.9)',opacity:0},{transform:'none',opacity:1}],{duration:1400,delay:500,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'})});
   const L=[...document.querySelectorAll('#hero h1 > *')];L.forEach((e,i)=>e.animate([{transform:'translateY(70px)',opacity:0},{transform:'none',opacity:1}],{duration:1200,delay:800+i*130,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'}))}))}
$('venter').onclick=open;$('vskip').onclick=open;addEventListener('keydown',e=>{if(e.key=='Enter'&&vi.classList.contains('ready'))open()});
})();

/* hero headline: letters lift and glow toward the cursor */
(()=>{const h=document.querySelector('#hero h1');if(!h||matchMedia('(pointer:coarse)').matches||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
h.setAttribute('aria-label',h.textContent.replace(/\s+/g,' ').trim());const L=[];
[...h.children].forEach(line=>{line.setAttribute('aria-hidden','true');const t=line.textContent;line.textContent='';[...t].forEach(ch=>{const s=document.createElement('span');s.className='lt';s.textContent=ch==' '?'\u00a0':ch;line.appendChild(s);L.push(s)})});
let q=0,mx=-999,my=-999;const rects=()=>L.map(s=>{const r=s.getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]});
function upd(){q=0;const c=rects();L.forEach((s,i)=>{const dx=mx-c[i][0],dy=my-c[i][1],d=Math.hypot(dx,dy),k=Math.max(0,1-d/150);s.style.transform=k?`translate(${(-dx*k*.06).toFixed(1)}px,${(-14*k-dy*k*.05).toFixed(1)}px) scale(${(1+.16*k).toFixed(3)})`:'';s.style.color=k>.55?'#ff5a36':''})}
h.addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;q||(q=requestAnimationFrame(upd))});h.addEventListener('pointerleave',()=>{mx=my=-999;q||(q=requestAnimationFrame(upd))});
})();
