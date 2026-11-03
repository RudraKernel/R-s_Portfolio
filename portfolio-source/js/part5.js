
(()=>{const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
/* Spline: paste a scene URL (https://prod.spline.design/xxxx/scene.splinecode) to show a 3D scene in the Lab */
const SPLINE_URL='';
if(SPLINE_URL){const s=document.createElement('script');s.type='module';s.src='https://unpkg.com/@splinetool/viewer/build/spline-viewer.js';document.head.appendChild(s);const hh=$('#splHost');hh.hidden=false;hh.innerHTML='<spline-viewer loading-anim-type="spinner-small-dark" url="'+SPLINE_URL+'"></spline-viewer>'}
/* Iconoir icons */
const ic=(el,n,end)=>{if(el&&!el.querySelector('[class*="iconoir-"]'))el.insertAdjacentHTML(end?'beforeend':'afterbegin',`<i class="iconoir-${n}"></i>`)};
({about:'user',edu:'graduation-cap',skills:'code',projects:'folder',vault:'code',esports:'trophy',dome:'camera',lab:'gamepad'});
Object.entries({about:'user',edu:'graduation-cap',skills:'code',projects:'folder',vault:'code',esports:'trophy',dome:'camera',lab:'gamepad'}).forEach(([k,v])=>ic($(`#${k} .eyebrow`),v));
const btnIc={'Open arcade':'gamepad','Close arcade':'xmark','Download card':'download','Close':'xmark','Open in new tab':'arrow-up-right','Visit site':'arrow-up-right','Contact':'mail','Send':'arrow-up-right'};
const decorate=()=>$$('.btn').forEach(b=>{const t=b.textContent.trim();if(btnIc[t])ic(b,btnIc[t],/Visit|new tab|Send/.test(t))});
const soc={Email:'mail',LinkedIn:'linkedin',GitHub:'github',Instagram:'instagram'};
const decor2=()=>$$('#flinks a').forEach(a=>ic(a,soc[a.textContent.trim()]||'arrow-up-right'));
decorate();decor2();new MutationObserver(()=>{decorate();decor2()}).observe(document.body,{childList:true,subtree:true,characterData:false});
/* Motion Primitives: infinite slider */
const SKL=['Front End','Backend','HTML','CSS','JavaScript','Vibe Coding','Motion Design','Video Editing','Cinematography','Acting','Esports IGL','Storytelling','Teamwork'];
($('#slt')||{}).innerHTML=[...SKL,...SKL].map(s=>`<span>${s}</span>`).join('');
/* Cult / Skiper: spotlight, magnetic buttons, tilt cards */
document.addEventListener('pointermove',e=>{const t=e.target.closest&&e.target.closest('.tile');if(t){const r=t.getBoundingClientRect();t.style.setProperty('--mx',e.clientX-r.left+'px');t.style.setProperty('--my',e.clientY-r.top+'px')}
 if(RM||e.pointerType=='touch')return;
 $$('.btn:not(.ghost)').forEach(b=>{const r=b.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2),d=Math.hypot(dx,dy);b.style.transform=d<90?`translate(${dx*.25}px,${dy*.25}px)`:''});
 const c=e.target.closest&&e.target.closest('.vc2,.site');$$('.tilt').forEach(x=>{if(x!==c)x.style.transform=''});
 if(c){c.classList.add('tilt');const r=c.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(700px) rotateY(${px*8}deg) rotateX(${-py*8}deg) translateZ(0)`}},{passive:true});
/* Motion Primitives: text scramble on headings */
const CH='!<>-_\\/[]{}=+*^?#';
function scr(el){const ns=[],w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode())ns.push([n,n.nodeValue]);let f=0;const T=22;const iv=setInterval(()=>{f++;ns.forEach(([nd,o])=>{nd.nodeValue=[...o].map((c,i)=>c==' '||i<(o.length*f/T)?c:CH[Math.random()*CH.length|0]).join('')});if(f>=T){clearInterval(iv);ns.forEach(([nd,o])=>nd.nodeValue=o)}},40)}

/* Cult UI style dock */
const D=[['about','user','About'],['skills','code','Skills'],['holo','folder','Projects'],['esports','trophy','Esports'],['lab','gamepad','Lab'],['contact','mail','Contact']];
const dk=document.createElement('div');dk.id='dock';dk.innerHTML=D.map(([id,i,l])=>`<a href="#${id}" data-s="${id}" aria-label="${l}"><i class="iconoir-${i}"></i><span>${l}</span></a>`).join('');document.body.appendChild(dk);
const da=[...dk.children];dk.addEventListener('pointermove',e=>{if(RM)return;da.forEach(a=>{const r=a.getBoundingClientRect(),d=Math.abs(e.clientX-(r.left+r.width/2));a.style.transform=`scale(${1+Math.max(0,1-d/110)*.55})`})});dk.addEventListener('pointerleave',()=>da.forEach(a=>a.style.transform=''));
const so=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting)da.forEach(a=>a.classList.toggle('on',a.dataset.s==en.target.id))}),{rootMargin:'-45% 0px -50% 0px'});D.forEach(([id])=>{const s=document.getElementById(id);s&&so.observe(s)});
/* Loading.dev style loader for project preview */
const f=$('#vmf'),L=$('#ldr'),m=$('#vmod');new MutationObserver(()=>{if(m.classList.contains('on'))L.classList.remove('off')}).observe(m,{attributes:true,attributeFilter:['class']});f.addEventListener('load',()=>setTimeout(()=>L.classList.add('off'),250));
})();
