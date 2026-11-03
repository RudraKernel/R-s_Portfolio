/* Holo deck: sticky 3D tunnel; scrolling flies the camera through project cards */
(()=>{const sec=document.getElementById('deck'),st=document.getElementById('dstage'),bar=document.getElementById('dbar'),head=document.querySelector('.deck-head');if(!sec||!st)return;
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches,CO=matchMedia('(pointer:coarse)').matches;
const live=[{t:'BeYogaWise',d:'A website built for a yoga teacher to present her classes and reach new students.',tag:'LIVE SITE',url:'https://beyogawise-omega.vercel.app/'},{t:'R.S. Poems',d:'A live poetry website.',tag:'LIVE SITE',url:'https://r-s-poems-2uqi.vercel.app/'},{t:'Ajeya',d:'A live website deployed on Vercel.',tag:'LIVE SITE',url:'https://sakshamxdaksh-phi.vercel.app/'}];
const adv=(window.PROJECTS_DATA||[]).map((x,i)=>({x,i})).filter(o=>o.x.k=='advanced').slice(0,5).map(o=>({t:o.x.t,d:o.x.d,tag:'ADVANCED BUILD',idx:o.i}));
const items=[...live,...adv],N=items.length,D=520;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
st.innerHTML=items.map((o,i)=>`<div class="dcard" data-i="${i}"><span class="dno">${String(i+1).padStart(2,'0')} / ${String(N).padStart(2,'0')} · ${o.tag}</span><b>${esc(o.t)}</b><small>${esc(o.d)}</small><span class="btn ghost">${o.url?'Visit site':'Open build'}</span></div>`).join('');
const cards=[...st.children];
st.addEventListener('click',e=>{const c=e.target.closest('.dcard');if(!c)return;const o=items[+c.dataset.i];
  if(o.url){window.open(o.url,'_blank','noopener');return}
  window.openBuild&&window.openBuild(window.PROJECTS_DATA[o.idx])});
const cl=(v,a,b)=>Math.min(b,Math.max(a,v));let q=0;
function upd(){q=0;const r=sec.getBoundingClientRect(),span=sec.offsetHeight-innerHeight,p=cl(-r.top/span,0,1);
  if(r.bottom<-50||r.top>innerHeight+50)return;bar.style.transform='scaleX('+p+')';head.style.opacity=cl(1-p*5,0,1);
  const shift=p*(N-.4)*D,wide=CO||innerWidth<700?innerWidth*.06:innerWidth*.2;let best=-1,bd=1e9;
  cards.forEach((c,i)=>{const z=-i*D+shift,d=Math.abs(z);if(d<bd){bd=d;best=i}
    const near=Math.max(0,1-d/D),side=i%2?1:-1,x=side*wide*(1-near*.55),y=(i%3-1)*28*(1-near);
    const far=cl(1-(-z-D*2.1)/(D*1.1),0,1),pass=cl(1-(z-80)/260,0,1),o=RM?(near>.5?1:0):Math.min(far,pass);
    c.style.transform=`translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,${z.toFixed(1)}px) rotateY(${(-side*(1-near)*18).toFixed(1)}deg)`;c.style.opacity=o.toFixed(3);c.style.pointerEvents=o>.55?'auto':'none'});
}
addEventListener('scroll',()=>{q||(q=requestAnimationFrame(upd))},{passive:true});addEventListener('resize',upd);upd();
})();
