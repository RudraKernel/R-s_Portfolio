/* 3D holographic world: one persistent Three.js scene, camera flies through it as you scroll.
   Needs three.js (loaded from cdnjs). If it fails to load, the rest of the site works as before. */
(()=>{if(!window.THREE)return;
const T=THREE,cv=document.getElementById('gl'),RM=matchMedia('(prefers-reduced-motion:reduce)').matches,CO=matchMedia('(pointer:coarse)').matches;
let R;try{R=new T.WebGLRenderer({canvas:cv,alpha:true,antialias:!CO,powerPreference:'high-performance'})}catch(e){return}
try{
R.setPixelRatio(Math.min(devicePixelRatio||1,CO?1.25:1.75));R.setClearColor(0x000000,0);
const S=new T.Scene();S.fog=new T.FogExp2(0x02030a,.016);
const cam=new T.PerspectiveCamera(60,1,.1,400);
const PINK=0xff1f8e,LIME=0xc6ff00,CYAN=0x38e8ff,VIO=0x8b5cf6;
const wire=(g,c,o)=>new T.LineSegments(new T.EdgesGeometry(g),new T.LineBasicMaterial({color:c,transparent:true,opacity:o,blending:T.AdditiveBlending,depthWrite:false}));
const grp=(n,f)=>{const g=new T.Group();for(let i=0;i<n;i++)g.add(f(i,n));return g};
const N=10,GAP=14;
/* one hologram per chapter (hero, about, edu, skills, projects, builds, esports, why, lab, wall) */
const mk=[
 ()=>wire(new T.IcosahedronGeometry(3.4,1),PINK,.85),
 ()=>wire(new T.TorusKnotGeometry(2.3,.6,64,8),CYAN,.7),
 ()=>wire(new T.BoxGeometry(3.4,3.4,3.4),LIME,.8),
 ()=>grp(14,(i,n)=>{const m=wire(new T.OctahedronGeometry(.55),i%2?PINK:CYAN,.9),a=i/n*6.283;m.position.set(Math.cos(a)*3.2,Math.sin(a*2)*.8,Math.sin(a)*3.2);return m}),
 ()=>grp(5,(i)=>{const m=wire(new T.BoxGeometry(3.2,2,.08),i%2?VIO:PINK,.8);m.position.set((i-2)*1.1,(i%2)*.6-.3,-i*.9);m.rotation.y=-.35;return m}),
 ()=>wire(new T.DodecahedronGeometry(3,0),LIME,.8),
 ()=>wire(new T.TetrahedronGeometry(3.6,0),PINK,.9),
 ()=>wire(new T.IcosahedronGeometry(3.2,2),VIO,.55),
 ()=>grp(9,(i)=>{const m=wire(new T.BoxGeometry(1,1,1),i%3?CYAN:LIME,.85);m.position.set((i%3-1)*1.7,(((i/3)|0)-1)*1.7,0);return m}),
 ()=>grp(3,(i)=>wire(new T.TorusGeometry(2.2+i*.8,.06,8,64),[PINK,LIME,CYAN][i],.8))
];
const obj=[];mk.forEach((f,i)=>{const o=f(),side=i%2?1:-1;o.position.set(side*(CO?3.2:7.5),(i%3-1)*1.2,-i*GAP-12);o.userData={sp:.2+(i%4)*.08,side};S.add(o);obj.push(o)});
/* particle tunnel */
const PN=CO?900:2000,pp=new Float32Array(PN*3),pc=new Float32Array(PN*3),cl=[new T.Color(PINK),new T.Color(LIME),new T.Color(CYAN),new T.Color(0xffffff)];
for(let i=0;i<PN;i++){pp[i*3]=(Math.random()-.5)*90;pp[i*3+1]=(Math.random()-.5)*50;pp[i*3+2]=20-Math.random()*(N*GAP+60);const c=cl[Math.random()*4|0];pc.set([c.r,c.g,c.b],i*3)}
const pg=new T.BufferGeometry();pg.setAttribute('position',new T.BufferAttribute(pp,3));pg.setAttribute('color',new T.BufferAttribute(pc,3));
const pts=new T.Points(pg,new T.PointsMaterial({size:.16,vertexColors:true,transparent:true,opacity:.85,blending:T.AdditiveBlending,depthWrite:false,sizeAttenuation:true}));S.add(pts);
/* holographic floor grid */
const grid=new T.GridHelper(400,80,PINK,0x25254a);grid.position.set(0,-9,-(N*GAP)/2);grid.material.transparent=true;grid.material.opacity=.28;S.add(grid);
/* resize */
const rs=()=>{const w=innerWidth,h=innerHeight;R.setSize(w,h,false);cam.aspect=w/h;cam.fov=w<700?72:60;cam.updateProjectionMatrix()};rs();addEventListener('resize',rs);
let mx=0,my=0,sp=0,sv=0,lastP=0;
addEventListener('pointermove',e=>{mx=(e.clientX/innerWidth-.5)*2;my=(e.clientY/innerHeight-.5)*2},{passive:true});
const ez=t=>t*t*(3-2*t);
function loop(t){requestAnimationFrame(loop);if(document.hidden)return;
  const m=document.documentElement.scrollHeight-innerHeight,p=m>0?scrollY/m:0;sp+=(p-sp)*.075;sv+=((sp-lastP)*400-sv)*.1;lastP=sp;
  const z=8-sp*(N-1)*GAP-2,sec=sp*(N-1),sway=RM?0:1;
  cam.position.x+=(mx*1.4*sway-cam.position.x)*.05;cam.position.y+=((-my*.9+Math.sin(sp*14)*.5)*sway-cam.position.y)*.05;cam.position.z=z;
  cam.rotation.z=Math.sin(sp*9)*.04*sway;cam.rotation.y=-cam.position.x*.02;cam.rotation.x=cam.position.y*.015;
  const k=t*.001;
  obj.forEach((o,i)=>{const d=Math.abs(sec-i),near=1-Math.min(d,1.5)/1.5;o.rotation.y=k*o.userData.sp+i;o.rotation.x=k*o.userData.sp*.6;const s=.85+near*.35+Math.abs(sv)*.02;o.scale.setScalar(s);
    o.position.x=o.userData.side*(CO?3.2:7.5)*(1-near*.15);
    o.traverse(c=>{if(c.material&&c.material.opacity!==undefined)c.material.opacity=Math.min(.95,.25+near*.7)})});
  pts.rotation.z=k*.01+sp*.4;pts.position.z=sv*.2;grid.position.z=-(N*GAP)/2;
  R.render(S,cam)}
requestAnimationFrame(loop);
}catch(e){console.warn('3D world disabled:',e&&e.message)}
})();
