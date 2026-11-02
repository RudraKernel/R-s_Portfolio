
(()=>{const RM=matchMedia('(prefers-reduced-motion:reduce)').matches,$=s=>document.querySelector(s);
const bar=document.createElement('div');bar.id='sprog';document.body.appendChild(bar);
document.querySelectorAll('.bento').forEach(b=>[...b.children].forEach((c,i)=>{if(c.classList.contains('rv')){c.style.transitionDelay=Math.min(i*80,480)+'ms';c.addEventListener('transitionend',()=>c.style.transitionDelay='',{once:true})}}));
const hero=$('#hero > div');let t=0;
function u(){t=0;const mx=document.documentElement.scrollHeight-innerHeight;bar.style.transform='scaleX('+(mx>0?scrollY/mx:0)+')';if(!RM&&hero){const p=Math.min(scrollY/innerHeight,1);hero.style.transform='translateY('+(p*-90)+'px) scale('+(1+p*.32)+')';hero.style.opacity=Math.max(0,1-p*1.25);hero.style.filter=p>.02&&!matchMedia('(pointer:coarse)').matches?'blur('+(p*7).toFixed(1)+'px)':'none'}}
addEventListener('scroll',()=>{t||(t=requestAnimationFrame(u))},{passive:true});u();

})();

/* scroll zoom-in / fly-through transition (stronger) */
(()=>{if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
const S=[...document.querySelectorAll('main section:not(#deck):not(#journey)')],I=[...document.querySelectorAll('.gi,.frame,#globe,.vcc')];S.forEach(s=>{s.style.transformOrigin='50% 35%'});let q=0;
const cl=(v,a,b)=>Math.min(b,Math.max(a,v)),ez=t=>t*t*(3-2*t);
function z(){q=0;const vh=innerHeight;
  S.forEach(s=>{const r=s.getBoundingClientRect();if(r.bottom<-300||r.top>vh+300)return;
    const e=ez(cl((vh-r.top)/(vh*.7),0,1)),l=cl(1-r.bottom/(vh*.55),0,1),bl=matchMedia('(pointer:coarse)').matches?0:(1-e)*6+l*5;
    s.style.transform=`perspective(1400px) rotateX(${((1-e)*9-l*5).toFixed(2)}deg) scale(${((.78+.22*e)*(1+l*.14)).toFixed(4)})`;s.style.opacity=((.15+.85*e)*(1-l*.8)).toFixed(3);s.style.filter=bl>.3?`blur(${bl.toFixed(1)}px)`:'none'});
  I.forEach(el=>{const r=el.getBoundingClientRect();if(r.bottom<0||r.top>vh)return;el.style.scale=(1.18-.18*Math.min(1,cl((vh-r.top)/(vh+r.height),0,1)*1.6)).toFixed(3)})}
addEventListener('scroll',()=>{q||(q=requestAnimationFrame(z))},{passive:true});addEventListener('resize',z);z()})();
/* headers glitch every few seconds and when they scroll in */
(()=>{if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
const H=[...document.querySelectorAll('#hero h1,section h2')];H.forEach(h=>h.classList.add('glt'));
const g=h=>{if(h.classList.contains('on'))return;h.classList.add('on');setTimeout(()=>h.classList.remove('on'),520)};
const vis=h=>{const r=h.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){io.unobserve(e.target);setTimeout(()=>g(e.target),1000)}}),{threshold:.7});H.forEach(h=>io.observe(h));
(function loop(){setTimeout(()=>{if(!document.hidden){const v=H.filter(vis);if(v.length){const h=v[Math.random()*v.length|0];g(h);if(Math.random()<.4)setTimeout(()=>g(h),650)}}loop()},2200+Math.random()*3200)})()})();
