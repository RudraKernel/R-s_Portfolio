
(()=>{if(!document.getElementById('vg'))return;const P=window.PROJECTS_DATA,g=document.getElementById('vg'),m=document.getElementById('vmod'),f=document.getElementById('vmf');let cur=null,blobU=null;
const e=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const show=k=>{g.innerHTML=P.map((x,i)=>x.k==k?`<button class="tile vc2 nt" data-i="${i}"><span class="no">${x.k.toUpperCase()} · ${x.n}</span><b>${e(x.t)}</b><small>${e(x.d)}</small></button>`:'').join('');document.querySelectorAll('.vt .btn').forEach(b=>{b.classList.toggle('on',b.dataset.k==k);b.classList.toggle('ghost',b.dataset.k!=k)})};
show('advanced');
document.querySelector('.vt').onclick=ev=>{const k=ev.target.dataset.k;k&&show(k)};
g.onclick=ev=>{const b=ev.target.closest('.vc2');if(!b)return;cur=P[+b.dataset.i];document.getElementById('vmt').textContent=cur.t;f.srcdoc=cur.h;m.classList.add('on')};
document.getElementById('vmo').onclick=()=>{if(!cur)return;if(blobU)URL.revokeObjectURL(blobU);blobU=URL.createObjectURL(new Blob([cur.h],{type:'text/html'}));window.open(blobU,'_blank')};
const cl=()=>{m.classList.remove('on');f.srcdoc='';cur=null};document.getElementById('vmc').onclick=cl;addEventListener('keydown',ev=>{ev.key=='Escape'&&cl()});
})();
