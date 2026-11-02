/* Page-scroll-driven effects: word reveal, pinned horizontal chapters, side rail */
(()=>{const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],RM=matchMedia('(prefers-reduced-motion:reduce)').matches,cl=(v,a,b)=>Math.min(b,Math.max(a,v));
/* word-by-word scrubbed text */
const SC=[];if(!RM)$$('#about .tile p,#why .lead,#resume h3+p,.jy-panel p').forEach(el=>{if(el.children.length||!el.textContent.trim())return;const ws=el.textContent.trim().split(/\s+/);el.innerHTML=ws.map(w=>'<span class="w">'+w.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))+'</span>').join(' ');SC.push({el,w:[...el.children]})});
/* pinned horizontal chapters */
const J=$('#journey'),T=$('#jytrack'),JB=$('#jybar'),panels=$$('.jy-panel');
function jsize(){if(!J||!T)return;J.style.height=(innerHeight+Math.max(0,T.scrollWidth-innerWidth)*1.0)+'px'}
jsize();addEventListener('resize',jsize);addEventListener('load',jsize);
/* side rail */
const ids=['hero','about','journey','edu','skills','deck','holo','esports','why','resume','lab','wall','contact'],names={hero:'Intro',about:'About',journey:'Chapters',edu:'Education',skills:'Skills',deck:'Deck',holo:'Projects',esports:'Esports',why:'Why me',resume:'Résumé',lab:'Lab',wall:'Wall',contact:'Contact'};
const rail=document.createElement('nav');rail.id='rail';rail.setAttribute('aria-label','Sections');rail.innerHTML=ids.filter(i=>{const e=document.getElementById(i);return e&&!e.hidden}).map(i=>`<a href="#${i}" data-s="${i}" aria-label="${names[i]}"><span>${names[i]}</span></a>`).join('');document.body.appendChild(rail);
const ra=[...rail.children];const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)ra.forEach(a=>a.classList.toggle('on',a.dataset.s==e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});ids.forEach(i=>{const s=document.getElementById(i);s&&so.observe(s)});
const wait=setInterval(()=>{if(!document.getElementById('vintro')){rail.classList.add('on');clearInterval(wait)}},300);
let q=0;function upd(){q=0;const vh=innerHeight;
  SC.forEach(({el,w})=>{const r=el.getBoundingClientRect();if(r.bottom<-50||r.top>vh+50)return;const p=cl((vh*.9-r.top)/(vh*.5+r.height*.5),0,1),n=w.length;w.forEach((s,i)=>{s.style.opacity=(.16+.84*cl(p*(n+5)-i,0,1)).toFixed(2)})});
  if(J&&T){const r=J.getBoundingClientRect(),span=J.offsetHeight-vh;if(r.bottom>-50&&r.top<vh+50){const p=cl(-r.top/Math.max(1,span),0,1),dist=Math.max(0,T.scrollWidth-innerWidth);T.style.transform='translate3d('+(-p*dist).toFixed(1)+'px,0,0)';JB.style.transform='scaleX('+p+')';
    panels.forEach(pn=>{const b=pn.getBoundingClientRect(),c=b.left+b.width*.35,d=Math.abs(c-innerWidth*.45)/innerWidth;pn.classList.toggle('on',d<.22);pn.style.opacity=(1-cl(d-.25,0,.6)).toFixed(2)})}}}
addEventListener('scroll',()=>{q||(q=requestAnimationFrame(upd))},{passive:true});addEventListener('resize',upd);upd();
})();
