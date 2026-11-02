/* Universal space void: deep stars with parallax, a faint Milky Way band, a rising void, shooting stars */
(()=>{const cv=document.getElementById('vspace');if(!cv)return;const cx=cv.getContext('2d'),RM=matchMedia('(prefers-reduced-motion:reduce)').matches,CO=matchMedia('(pointer:coarse)').matches,dpr=Math.min(devicePixelRatio||1,CO?1.5:2);
const SHOW={band:false,rim:false};/* set true to bring back the Milky Way haze or the rising void disc */
let W,H,ST=[],band,mx=0,my=0,sy=0,lastY=scrollY,sv=0,SH=[];const rnd=Math.random,gauss=()=>(rnd()+rnd()+rnd()+rnd()-2)/2;
const COL=['255,255,255','255,244,225','200,220,255','255,200,170'];
function build(){W=cv.width=innerWidth*dpr;H=cv.height=innerHeight*dpr;
  ST=Array.from({length:Math.round(Math.min(460,innerWidth*innerHeight/3100))},()=>{const z=.12+rnd()*.88;return{x:rnd()*W,y:rnd()*H*3,z,r:(.4+z*1.1+(rnd()<.04?1:0))*dpr,a:.25+z*.6,tw:rnd()*6.28,sp:.6+rnd()*1.8,c:COL[rnd()<.7?0:rnd()*4|0]}});
  /* Milky Way band, drawn once */
  if(!SHOW.band)return;
  band=document.createElement('canvas');band.width=W;band.height=H;const b=band.getContext('2d');b.translate(W/2,H/2);b.rotate(-.42);
  const g=b.createLinearGradient(0,-H*.34,0,H*.34);g.addColorStop(0,'rgba(150,140,175,0)');g.addColorStop(.5,'rgba(190,180,205,.075)');g.addColorStop(1,'rgba(150,140,175,0)');b.fillStyle=g;b.fillRect(-W,-H*.34,W*2,H*.68);
  const dots=CO?1800:4200;for(let i=0;i<dots;i++){const x=(rnd()-.5)*W*1.8,y=gauss()*H*.2;b.fillStyle='rgba('+COL[rnd()*4|0]+','+(.05+rnd()*.28)+')';b.fillRect(x,y,dpr*(rnd()<.1?1.6:.9),dpr*(rnd()<.1?1.6:.9))}
  for(let i=0;i<5;i++){const x=(rnd()-.5)*W,y=gauss()*H*.1,r=H*(.08+rnd()*.12),gg=b.createRadialGradient(x,y,0,x,y,r);gg.addColorStop(0,'rgba(120,100,150,.05)');gg.addColorStop(1,'rgba(120,100,150,0)');b.fillStyle=gg;b.fillRect(x-r,y-r,r*2,r*2)}}
build();addEventListener('resize',build);
let cX=-1e4,cY=-1e4;addEventListener('pointermove',e=>{mx=(e.clientX/innerWidth-.5);my=(e.clientY/innerHeight-.5);cX=e.clientX*dpr;cY=e.clientY*dpr},{passive:true});
function frame(t){const y=scrollY,m=document.documentElement.scrollHeight-innerHeight,p=m>0?y/m:0;sv+=((y-lastY)-sv)*.1;lastY=y;
  document.documentElement.style.setProperty('--vp',p.toFixed(4));
  cx.clearRect(0,0,W,H);
  /* milky way (slow parallax) */
  if(SHOW.band){cx.globalAlpha=.9;cx.drawImage(band,-mx*14*dpr,-(y*.04%H)*0-p*H*.12-my*10*dpr);cx.globalAlpha=1}
  /* the rising void: a dark disc with a faint ember rim */
  if(SHOW.rim){const R=Math.min(W,H)*(.36+p*.3),vx=W*(.92-p*.25),vy=H*(1.08-p*.85);
  cx.save();cx.beginPath();cx.arc(vx,vy,R,0,6.283);cx.fillStyle='rgba(0,0,0,.92)';cx.fill();
  const rg=cx.createRadialGradient(vx,vy,R*.94,vx,vy,R*1.18);rg.addColorStop(0,'rgba(255,90,54,0)');rg.addColorStop(.28,'rgba(255,90,54,'+(.2-p*.08)+')');rg.addColorStop(1,'rgba(255,90,54,0)');cx.fillStyle=rg;cx.beginPath();cx.arc(vx,vy,R*1.18,0,6.283);cx.arc(vx,vy,R*.94,0,6.283,true);cx.fill();
  cx.lineWidth=dpr;cx.strokeStyle='rgba(255,235,220,.16)';cx.beginPath();cx.arc(vx,vy,R*1.005,0,6.283);cx.stroke();cx.restore()}
  /* stars */
  const H3=H*3,k=t*.001;
  for(const s of ST){let yy=((s.y-y*dpr*s.z*.35)%H3+H3)%H3-H;if(yy<-8||yy>H+8)continue;let xx=s.x-mx*22*s.z*dpr,glow=1;{const dx=xx-cX,dy=yy-cY,d2=dx*dx+dy*dy,R2=(150*dpr)*(150*dpr);if(d2<R2){const f=1-Math.sqrt(d2/R2);xx+=dx/Math.sqrt(d2+1)*f*34*dpr*s.z;yy+=dy/Math.sqrt(d2+1)*f*34*dpr*s.z;glow=1+f*1.6}}
    const tw=RM?1:.72+.28*Math.sin(k*s.sp+s.tw);cx.globalAlpha=Math.min(1,s.a*tw*glow);cx.fillStyle='rgb('+s.c+')';
    const st=Math.min(Math.abs(sv)*s.z*.5,14)*dpr;if(st>1.5){cx.fillRect(xx,yy-(sv>0?0:st),s.r,s.r+st)}else{cx.beginPath();cx.arc(xx,yy,s.r*.8,0,6.283);cx.fill()}}
  cx.globalAlpha=1;
  /* shooting stars */
  if(!RM&&SH.length<2&&rnd()<.003)SH.push({x:W*(.3+rnd()*.7),y:-10,vx:-(7+rnd()*6)*dpr,vy:(3.5+rnd()*3)*dpr,l:1,len:(110+rnd()*120)*dpr});
  for(let i=SH.length-1;i>=0;i--){const q=SH[i];q.x+=q.vx;q.y+=q.vy;q.l-=.011;const a=Math.atan2(q.vy,q.vx),tx=q.x-Math.cos(a)*q.len,ty=q.y-Math.sin(a)*q.len,o=Math.max(q.l,0),g=cx.createLinearGradient(q.x,q.y,tx,ty);
    g.addColorStop(0,'rgba(255,255,255,'+o+')');g.addColorStop(.4,'rgba(255,140,100,'+o*.5+')');g.addColorStop(1,'rgba(255,90,54,0)');cx.strokeStyle=g;cx.lineWidth=1.6*dpr;cx.lineCap='round';cx.beginPath();cx.moveTo(q.x,q.y);cx.lineTo(tx,ty);cx.stroke();
    if(o<=0||q.x<-q.len||q.y>H+q.len)SH.splice(i,1)}
  if(!RM)requestAnimationFrame(frame)}
if(RM){frame(0);addEventListener('scroll',()=>frame(0),{passive:true})}else requestAnimationFrame(frame);
document.addEventListener('visibilitychange',()=>{if(!RM&&!document.hidden)requestAnimationFrame(frame)});
})();
