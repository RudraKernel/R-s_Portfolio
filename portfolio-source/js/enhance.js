/* enhance.js — enter-screen cursor/touch effects + button ripple (everything else already exists) */
(function(){'use strict';
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var intro=document.getElementById('vintro');
if(intro&&!reduce){
  var cv=document.createElement('canvas');cv.className='vi-fx';cv.setAttribute('aria-hidden','true');
  intro.insertBefore(cv,intro.firstChild);
  var g=cv.getContext('2d'),W=1,H=1,dpr=Math.min(window.devicePixelRatio||1,1.5);
  var size=function(){W=intro.clientWidth||innerWidth;H=intro.clientHeight||innerHeight;cv.width=W*dpr;cv.height=H*dpr;g.setTransform(dpr,0,0,dpr,0,0)};
  size();addEventListener('resize',size);
  var tx=W/2,ty=H/2,x=tx,y=ty,parts=[],raf=0,q=function(s){return intro.querySelector(s)};
  var btn=document.getElementById('venter'),nm=q('.vi-name'),rl=q('.vi-role'),cols=['255,90,54','239,236,228'];
  var spawn=function(px,py,n,sp){for(var i=0;i<n;i++){var a=Math.random()*6.283,s=(.3+Math.random()*1.4)*sp;
    parts.push({x:px,y:py,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:1,r:1+Math.random()*2.2,c:cols[Math.random()<.65?0:1]})}
    if(parts.length>140)parts.splice(0,parts.length-140)};
  var loop=function(){
    raf=0;if(!intro.isConnected)return;
    x+=(tx-x)*.14;y+=(ty-y)*.14;
    var nx=x/W-.5,ny=y/H-.5;
    if(nm)nm.style.translate=(nx*-20).toFixed(1)+'px '+(ny*-12).toFixed(1)+'px';
    if(rl)rl.style.translate=(nx*10).toFixed(1)+'px '+(ny*6).toFixed(1)+'px';
    if(btn){var r=btn.getBoundingClientRect(),dx=tx-(r.left+r.width/2),dy=ty-(r.top+r.height/2),d=Math.hypot(dx,dy),R=140,k=d<R?(1-d/R)*.4:0;
      btn.style.translate=(dx*k).toFixed(1)+'px '+(dy*k).toFixed(1)+'px'}
    g.clearRect(0,0,W,H);
    for(var i=parts.length-1;i>=0;i--){var p=parts[i];p.x+=p.vx;p.y+=p.vy;p.vx*=.96;p.vy*=.96;p.l-=.022;
      if(p.l<=0){parts.splice(i,1);continue}
      g.fillStyle='rgba('+p.c+','+(p.l*.85).toFixed(2)+')';g.beginPath();g.arc(p.x,p.y,p.r*p.l+.4,0,6.283);g.fill()}
    if(parts.length||Math.abs(tx-x)>.5||Math.abs(ty-y)>.5)raf=requestAnimationFrame(loop);
  };
  var kick=function(){if(!raf)raf=requestAnimationFrame(loop)};
  intro.addEventListener('pointermove',function(e){tx=e.clientX;ty=e.clientY;spawn(tx,ty,e.pointerType==='mouse'?2:3,1);kick()},{passive:true});
  intro.addEventListener('pointerdown',function(e){tx=e.clientX;ty=e.clientY;spawn(tx,ty,18,2.2);kick()},{passive:true});
  intro.addEventListener('pointerleave',function(){tx=W/2;ty=H/2;kick()});
}
/* ripple + light haptic on buttons */
document.addEventListener('pointerdown',function(e){
  var b=e.target.closest&&e.target.closest('.btn');if(!b)return;
  if(e.pointerType==='touch'&&navigator.vibrate)navigator.vibrate(6);
  if(reduce)return;
  if(getComputedStyle(b).position==='static')b.style.position='relative';
  b.style.overflow='hidden';
  var r=b.getBoundingClientRect(),s=document.createElement('span');s.className='rip';
  s.style.left=(e.clientX-r.left)+'px';s.style.top=(e.clientY-r.top)+'px';b.appendChild(s);
  setTimeout(function(){s.remove()},650)},{passive:true});
})();

/* ===== résumé tabs with sliding ink ===== */
(function(){var box=document.querySelector('.rs-tabs');if(!box)return;
var tabs=[].slice.call(box.querySelectorAll('button')),ink=box.querySelector('.rs-ink');
function ink_(b){ink.style.width=b.offsetWidth+'px';ink.style.transform='translateX('+b.offsetLeft+'px)'}
function sel(b,focus){tabs.forEach(function(t){var on=t===b;t.setAttribute('aria-selected',on);
  document.getElementById('rs-'+t.dataset.t).classList.toggle('on',on)});ink_(b);
  if(box.scrollTo)box.scrollTo({left:b.offsetLeft-12,behavior:'smooth'});if(focus)b.focus()}
tabs.forEach(function(b,i){b.addEventListener('click',function(){sel(b)});
  b.addEventListener('keydown',function(e){var n=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(n)sel(tabs[(i+n+tabs.length)%tabs.length],true)})});
var cur=function(){return box.querySelector('[aria-selected=true]')};
ink_(cur());addEventListener('resize',function(){ink_(cur())});
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){ink_(cur())});
})();
