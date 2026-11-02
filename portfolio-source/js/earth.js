/* Procedural Earth for the intro: real continent outlines, biomes, clouds, city lights and atmosphere. No image files needed. */
(()=>{const cv=document.getElementById('earthc');if(!cv)return;
const PI=Math.PI,LITE=matchMedia('(pointer:coarse)').matches||innerWidth<700;
let gl=null;try{gl=cv.getContext('webgl2',{alpha:true,premultipliedAlpha:true,antialias:false})}catch(e){}
const GPU=!!gl,TW=GPU&&!LITE?1024:768,TH=TW/2,S=GPU?32:(LITE?300:460);cv.width=cv.height=S;const ctx=GPU?null:cv.getContext('2d');
const RAW={
NA:'-168,66 -162,70 -156,71 -141,70 -128,70 -115,68 -100,68 -95,72 -85,70 -82,66 -94,60 -93,57 -85,55 -80,52 -79,58 -77,62 -70,60 -64,60 -61,56 -56,52 -60,47 -66,45 -70,43 -70,41.5 -74,40 -76,37 -76,35 -81,31 -80,26 -82,26 -84,30 -89,30 -94,29.5 -97,27 -97.5,22 -96,19 -91,19 -90,21 -87,21 -88,16 -84,15.5 -83,10 -79.5,9 -77.5,8 -80,7.5 -83.5,8.5 -86,11 -87.5,13 -92,14.5 -96,16 -101,17.5 -105.5,20 -106,23 -109.5,26 -112.5,31 -114.8,31.5 -114.5,32 -117,32.5 -120.5,34.5 -122.5,37.5 -124,40.5 -124,46 -124.7,48.4 -123,49 -127,51 -130,54.5 -135,58 -140,59.8 -146,60.5 -150,59.5 -153,57.5 -158,56 -163,54.7 -158,58 -162,59 -165,61 -166,64',
BAJA:'-114.8,31.5 -112.5,28 -110,23 -109.5,23.2 -112,26.5 -113.5,29.5',
GL:'-73,78 -60,82 -30,83.5 -20,81 -18,76 -22,70 -30,68 -40,65 -44,60 -50,62 -53,66 -56,70 -62,76',
BAF:'-80,73.5 -72,71.5 -68,70 -62,67 -65,63 -73,64 -78,64.5 -77,69',
ELL:'-90,81 -70,83 -62,82 -75,79 -90,77',VIC:'-118,72 -105,73 -100,70 -102,68.5 -115,69',
CUBA:'-85,22 -81,23.2 -77.5,21.8 -74,20.2 -77.5,20 -80,21.8',
SA:'-77.5,8 -75,11 -72,12 -68,10.7 -62,10.5 -60,8 -55,6 -52,4.5 -50,0 -48,-1 -44,-2.5 -40,-3 -35,-5.5 -35,-9 -37.5,-12 -39,-17 -41,-22 -45,-23.5 -48.5,-26 -48.5,-28 -53,-33.5 -57,-35 -57,-38 -62,-39 -65,-41 -65,-45 -67.5,-46.5 -66,-48 -69,-51 -68.5,-53 -71,-54 -74,-52 -75.5,-47 -73.5,-42 -73.5,-37 -71.5,-30 -70.5,-23 -70.2,-18 -76,-14 -79,-8 -81,-5 -80,-2 -80,0.5 -78.5,2 -77,4',
AF:'-17,21 -16.5,15 -17.5,14.7 -15,11 -13,8 -10,6 -7.5,4.4 -4,5 0,5.8 4,6.3 8,4.3 9.8,3 9.5,0 12,-5 13.5,-11 12,-17 14.5,-23 15,-27 17.5,-32 19,-34.5 23,-34 27,-33.5 31,-30 32.5,-26 35,-22 35,-18 40,-15 40.5,-10.5 39.2,-6 41,-2 44,1.5 48,5 51,11 44,10.5 43,12.5 39,15.5 37,20 35.5,24 33,28 32.5,30 29,31 25,32 20,31 19.5,30.3 15,32.2 10.5,34 10,37 2,36.8 -2,35.2 -6,35.8 -9.5,32 -10,29 -13,27.5',
EU:'-9,43 -9,37 -6,36 -2,36.7 0,38.5 3,42 3.5,43.3 8.5,44.3 10.5,42.8 12.5,41.3 16,38 15.7,40 18.5,40.3 16.5,41.9 13.5,43.8 12.3,45.3 13.7,45.7 19,42 19.5,40.4 21.5,38.5 23,36.5 24,38.5 24,40 26.5,40.9 26.3,39.5 27,37 30,36.2 34,36.3 36,36 36,34 34.8,31.5 34.3,31.2 35,28 37,24 39,21 42,16.5 43,13 45,12.8 48.5,14 52,16 55,17.5 57.5,19.5 59.5,22.5 56.5,24.5 54,24.2 51.5,24.5 50.5,26 48,29.5 50,30 52,27.5 56.5,27 58,25.7 61.5,25.2 66.5,25.4 68,23.5 70,21 72.8,19 73.5,16 74.8,12.5 76.2,9 77.5,8 79,10 80,15.5 82,17 85,19.5 87,21.5 89,21.8 91.5,22.5 92.5,20.5 94,18 94.5,16 97.5,16.5 98.5,13 98.5,9 100,6.5 101.5,3 103.5,1.5 104.2,3 103.5,6 101,7 100.2,9.5 99.5,12.5 100.5,13.3 102.5,12 104.8,10 105,8.7 106.5,10 107.5,11.5 109,12 109,14 108,16 106.5,18.5 106,20 108,21.5 110,21.2 112,21.7 114,22.3 117,23.5 119.5,25.5 121.5,28 121.9,30.5 120.8,32.5 119,34.5 121,36.5 119.5,37.3 122.5,37 121,39 122,40.5 124.5,39.8 125,38 126.5,37 126.5,34.5 128.5,35 129.4,36 128.5,38.3 131,42.5 135,43.5 138,46 140.5,48.5 141,53 140,56 143,59.2 150,59.6 155,59.5 157,61.5 162,62 165,60.5 163.5,57 162,54.5 158,52.5 156.5,51 156.5,56 158,58.5 160,61.5 164,62.5 170,60 176,62.5 180,65 180,68.5 170,69.8 160,69.5 150,71 140,72.5 130,71 128,73 113,74 110,76.5 104,77.7 95,76 87,74.5 80,73 73,72.5 70,68.5 60,69.5 55,68.5 44,68.5 41,66.5 33,66.7 30,70 25,71 20,70 17,69 14,67 12,65 8,63 5.5,61 5.5,58.5 8,58 10.5,59.8 11,59 12.2,56.8 12.8,55.5 11,55.5 8.5,56.8 8.2,54.8 9,54.5 8,53.8 6.5,53.5 4.8,52.8 3.5,51.5 1.5,50.8 -1,49.8 -1.5,48.7 -4.7,48.4 -2.5,47.3 -1.3,46 -1.8,43.5',
AUS:'114,-22 114.2,-26 115,-34 118,-35 123,-34 126,-32.3 131,-31.5 134,-32.8 137,-35 138,-34 140,-37.5 144,-38.5 147,-38.5 150,-37.5 153,-31 153.5,-27 151,-23.5 149,-20 146,-18.5 145.4,-15 143.5,-14 142.5,-10.7 141.5,-13 141,-17 139,-17.5 136,-15.5 135,-12.5 132,-11.3 130,-12.3 127,-14 125,-15 122,-17.5 120,-19.5 116,-20.7',
GB:'-5.5,50 1.5,51.3 1.7,52.7 0,53.5 -1.5,55 -2,57.5 -4,58.6 -6,58 -5.5,56 -3,54.8 -4.8,53.3 -3,53 -4.5,51.7',IRE:'-6,52 -6,54.2 -8,55.2 -10,54 -9.8,52 -8,51.6',ICE:'-24,65.5 -22,66.4 -16,66.5 -13.5,65 -18,63.5 -22.5,63.8',
JP:'130.5,31.5 132,33.5 135,33.5 137,34.7 140,35 141,38 142,40.5 141,41.3 140,40 139.5,38 137,37 135.5,35.7 132,35.5 130.8,34.3',HOK:'140,42 141.5,45.4 145.4,43.3 143.3,42 140.3,41.7',
SUM:'95.3,5.6 98,4 104,-1 106,-3.5 105.8,-5.8 102,-4 99,0.5 97,3.5',BOR:'109,1.5 111,2 114,4.5 117,7 119,5 117.5,1.5 116,-3.5 114,-4 111.5,-3 110,-1.5',JAV:'105.3,-6.8 108,-6.5 111,-6.7 114.5,-7.8 114,-8.7 108,-7.8 106,-7.4',
NG:'131,-1 134.5,-0.8 138,-1.8 141,-2.7 145,-4.5 148,-6.2 150.5,-10.5 147,-10 143,-9 141,-9.1 138,-8.3 137.5,-6 133.5,-4 132,-2.8',PHL:'120,18.5 122,18.4 122,14 124,12.5 126,9 126,6.5 124,7 122,7.2 121,10.5 120,14',
NZN:'172.7,-34.4 175,-37 178.5,-37.7 176,-41.5 174.5,-41.2 174.8,-39.5 173.8,-36.5',NZS:'172.7,-40.5 174.3,-41.7 172.8,-43.7 171,-44.5 169,-46.5 166.7,-46 168,-44 170.5,-42.8 172,-41.2',
MAD:'49.3,-12 50.5,-15.5 49.5,-18 47.5,-24.5 45,-25.5 43.5,-22 44.3,-17 46.5,-15.5',SRI:'79.8,9.7 81.8,7.5 81,6 80,6.2 79.8,8',ANTP:'-65,-64 -57,-63.3 -60,-68 -65,-70'};
const CASP='47,45 53,45 54,41 53.5,37 50,37 49,40 47.5,42.5';
const parse=s=>s.split(' ').map(p=>p.split(',').map(Number));
const hs=(x,y,z)=>{let h=Math.imul(x,374761393)+Math.imul(y,668265263)+Math.imul(z,2147483647)|0;h=Math.imul(h^(h>>>13),1274126177);return((h^(h>>>16))>>>0)/4294967295};
const sm=t=>t*t*(3-2*t),lerp=(a,b,t)=>a+(b-a)*t,cl=(v,a,b)=>Math.min(b,Math.max(a,v)),ss=(a,b,x)=>{const t=cl((x-a)/(b-a),0,1);return t*t*(3-2*t)};
function n3(x,y,z){const xi=Math.floor(x),yi=Math.floor(y),zi=Math.floor(z),xf=sm(x-xi),yf=sm(y-yi),zf=sm(z-zi),a=(i,j,k)=>hs(xi+i,yi+j,zi+k);
  const A=lerp(lerp(a(0,0,0),a(1,0,0),xf),lerp(a(0,1,0),a(1,1,0),xf),yf),B=lerp(lerp(a(0,0,1),a(1,0,1),xf),lerp(a(0,1,1),a(1,1,1),xf),yf);return lerp(A,B,zf)}
const fbm=(x,y,z,o)=>{let s=0,a=.5,f=1,t=0;for(let i=0;i<o;i++){s+=a*n3(x*f,y*f,z*f);t+=a;f*=2.03;a*=.5}return s/t};
let alb,oc,lt,cld,row,lon0,dif,spc,rim,edge,idx=[],ready=0;
function build(){
  const m=document.createElement('canvas');m.width=TW;m.height=TH;const g=m.getContext('2d');g.fillStyle='#000';g.fillRect(0,0,TW,TH);
  const X=lo=>(lo+180)/360*TW,Y=la=>(90-la)/180*TH,poly=pts=>{g.beginPath();pts.forEach(([lo,la],i)=>i?g.lineTo(X(lo),Y(la)):g.moveTo(X(lo),Y(la)));g.closePath();g.fill()};
  g.fillStyle='#fff';Object.values(RAW).forEach(s=>poly(parse(s)));g.fillRect(0,Y(-72),TW,TH-Y(-72));g.fillStyle='#000';poly(parse(CASP));
  const md=g.getImageData(0,0,TW,TH).data;
  const sc=document.createElement('canvas');sc.width=TW/8;sc.height=TH/8;sc.getContext('2d').drawImage(m,0,0,sc.width,sc.height);
  const bc=document.createElement('canvas');bc.width=TW;bc.height=TH;const bg=bc.getContext('2d');bg.imageSmoothingEnabled=true;bg.drawImage(sc,0,0,TW,TH);const bd=bg.getImageData(0,0,TW,TH).data;
  alb=new Uint8ClampedArray(TW*TH*4);oc=new Uint8Array(TW*TH);lt=new Uint8Array(TW*TH);cld=new Float32Array(TW*TH);
  for(let y=0;y<TH;y++){const la=(.5-(y+.5)/TH)*PI,cla=Math.cos(la),sla=Math.sin(la),alat=Math.abs(la)/PI*180;
    for(let x=0;x<TW;x++){const i=y*TW+x,lo=((x+.5)/TW-.5)*2*PI,px=cla*Math.cos(lo),py=sla,pz=cla*Math.sin(lo);
      const land=md[i*4]/255,shelf=Math.min(1,bd[i*4]/255*2.4);let r,gg,b;
      const n=fbm(px*3.1,py*3.1,pz*3.1,5),mo=fbm(px*2.2+9,py*2.2+4,pz*2.2+1,4);
      if(land>.35){oc[i]=0;
        let base=[lerp(70,38,ss(40,66,alat)),lerp(118,80,ss(40,66,alat)),lerp(54,54,0)];
        const trop=1-ss(8,20,alat);base=[lerp(base[0],30,trop*.8),lerp(base[1],88,trop*.8),lerp(base[2],42,trop*.8)];
        const des=ss(.0,1,(1-ss(14,22,alat)*0)*1)*0;const band=ss(12,20,alat)*(1-ss(36,44,alat)),dry=band*ss(.55,.38,mo);
        base=[lerp(base[0],206,dry),lerp(base[1],172,dry),lerp(base[2],112,dry)];
        const mt=ss(.6,.74,n);base=[lerp(base[0],128,mt),lerp(base[1],112,mt),lerp(base[2],98,mt)];
        const ice=Math.max(ss(66,74,alat+n*8),ss(.7,.8,n)*ss(50,62,alat)*.6);
        r=lerp(base[0],236,ice);gg=lerp(base[1],241,ice);b=lerp(base[2],246,ice);const v=.88+.24*n;r*=v;gg*=v;b*=v;
        if(land<1){const k=land;r=lerp(40,r,k);gg=lerp(120,gg,k);b=lerp(170,b,k)}
        lt[i]=alat<62?Math.round(255*ss(.62,.8,fbm(px*8,py*8,pz*8,3))*(hs(x,y,5)>.5?1:.35)):0;
      }else{oc[i]=1;const s=Math.pow(shelf,.75),v=.9+.2*n;
        r=lerp(6,30,s)*v;gg=lerp(36,86,s)*v;b=lerp(88,150,s)*v;const ice=ss(74,80,alat+n*5);r=lerp(r,228,ice);gg=lerp(gg,236,ice);b=lerp(b,244,ice);if(ice>.5)oc[i]=0}
      alb[i*4]=r;alb[i*4+1]=gg;alb[i*4+2]=b;alb[i*4+3]=255;
      cld[i]=ss(.5,.74,fbm(px*2.7+11,py*2.7+3,pz*2.7+7,5))*.9}}
  /* sphere geometry (static) */
  const N=S*S,R=S/2,tilt=22*PI/180,ct=Math.cos(tilt),st=Math.sin(tilt);
  row=new Int16Array(N).fill(-1);lon0=new Float32Array(N);dif=new Float32Array(N);spc=new Float32Array(N);rim=new Float32Array(N);edge=new Float32Array(N);
  const Ld=[-.55,.35,.76],ll=Math.hypot(...Ld);Ld[0]/=ll;Ld[1]/=ll;Ld[2]/=ll;const H=[Ld[0],Ld[1],Ld[2]+1],hl=Math.hypot(...H);H[0]/=hl;H[1]/=hl;H[2]/=hl;
  for(let y=0;y<S;y++)for(let x=0;x<S;x++){const nx=(x+.5-R)/R,ny=-(y+.5-R)/R,r2=nx*nx+ny*ny;if(r2>=1)continue;const nz=Math.sqrt(1-r2),p=y*S+x;
    const ny2=ny*ct+nz*st,nz2=-ny*st+nz*ct;lon0[p]=Math.atan2(nx,nz2);const la=Math.asin(cl(ny2,-1,1));row[p]=cl(((.5-la/PI)*TH)|0,0,TH-1);
    dif[p]=Math.max(0,nx*Ld[0]+ny*Ld[1]+nz*Ld[2]);spc[p]=Math.pow(Math.max(0,nx*H[0]+ny*H[1]+nz*H[2]),55);rim[p]=Math.pow(1-nz,3);edge[p]=cl((1-Math.sqrt(r2))*R*.5,0,1);idx.push(p)}
  ready=1;if(GPU)initGL()}
const VS=`#version 300 es
out vec2 vp;void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));vp=p*2.-1.;gl_Position=vec4(vp,0.,1.);}`;
const FS=`#version 300 es
precision highp float;in vec2 vp;out vec4 o;
uniform sampler2D uA,uC;uniform float uRot,uCr,uR;
void main(){
 float r2=min(dot(vp,vp),.9999);float nz=sqrt(1.-r2);vec3 N=vec3(vp,nz);
 float ct=.9272,st=.3746; // 22 degree tilt
 float ny=N.y*ct+nz*st,nz2=-N.y*st+nz*ct;
 float lon=atan(N.x,nz2),la=asin(clamp(ny,-1.,1.));
 vec2 uv=vec2((lon+uRot)/6.2831853,.5-la/3.14159265);
 vec2 dx=dFdx(uv),dy=dFdy(uv);dx.x-=round(dx.x);dy.x-=round(dy.x);
 vec4 a=textureGrad(uA,uv,dx,dy);
 vec2 g=textureGrad(uC,uv,dx,dy).rg;
 float cl=textureGrad(uC,vec2(uv.x+(uCr-uRot)/6.2831853,uv.y),dx,dy).r*.98;
 vec3 L=normalize(vec3(-.55,.35,.76));
 float d=max(0.,dot(N,L)),sh=.05+1.02*pow(d,.8);
 vec3 col=mix(a.rgb,vec3(.957,.965,.98),cl);col*=vec3(sh,sh,sh*1.04);
 float spc=pow(max(0.,dot(N,normalize(L+vec3(0.,0.,1.)))),55.);
 col+=spc*(1.-cl)*.45*smoothstep(.4,.6,a.a);
 if(d<.2)col+=vec3(1.,.77,.41)*(1.-d/.2)*(1.-cl*.75)*g.g;
 float rim=pow(1.-nz,3.)*(.25+1.1*min(1.,d*1.6+.1));col+=vec3(.275,.51,1.)*rim;
 float e=clamp((1.-sqrt(r2))*uR*.5,0.,1.)*step(dot(vp,vp),1.);
 o=vec4(col*e,e);}`;
let U={};
function sizeGL(){const G=Math.min(1024,Math.round((cv.offsetWidth||512)*Math.min(window.devicePixelRatio||1,2)));cv.width=cv.height=G;gl.viewport(0,0,G,G);gl.uniform1f(U.R,G/2)}
function initGL(){
 const sh=(t,c)=>{const o=gl.createShader(t);gl.shaderSource(o,c);gl.compileShader(o);return o};
 const pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,VS));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,FS));gl.linkProgram(pr);
 if(!gl.getProgramParameter(pr,gl.LINK_STATUS)){console.warn(gl.getProgramInfoLog(pr));return}
 gl.useProgram(pr);U={A:gl.getUniformLocation(pr,'uA'),C:gl.getUniformLocation(pr,'uC'),Rot:gl.getUniformLocation(pr,'uRot'),Cr:gl.getUniformLocation(pr,'uCr'),R:gl.getUniformLocation(pr,'uR')};
 const mk=(unit,ifmt,fmt,data)=>{const t=gl.createTexture();gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,t);gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);
  gl.texImage2D(gl.TEXTURE_2D,0,ifmt,TW,TH,0,fmt,gl.UNSIGNED_BYTE,data);gl.generateMipmap(gl.TEXTURE_2D);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  const an=gl.getExtension('EXT_texture_filter_anisotropic');if(an)gl.texParameterf(gl.TEXTURE_2D,an.TEXTURE_MAX_ANISOTROPY_EXT,4)};
 const N=TW*TH;for(let i=0;i<N;i++)alb[i*4+3]=oc[i]?255:0;
 mk(0,gl.RGBA8,gl.RGBA,new Uint8Array(alb.buffer));
 const ct=new Uint8Array(N*2);for(let i=0;i<N;i++){ct[i*2]=Math.min(255,cld[i]*255);ct[i*2+1]=lt[i]}
 mk(1,gl.RG8,gl.RG,ct);
 gl.uniform1i(U.A,0);gl.uniform1i(U.C,1);gl.clearColor(0,0,0,0);sizeGL();
 let rt=0;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(sizeGL,150)});
 gpuOK=1}
let gpuOK=0;
function draw(rot,cr){const m=6.2831853;gl.uniform1f(U.Rot,((rot%m)+m)%m);gl.uniform1f(U.Cr,((cr%m)+m)%m);gl.clear(gl.COLOR_BUFFER_BIT);gl.drawArrays(gl.TRIANGLES,0,3)}
const img=ctx?ctx.createImageData(S,S):null,out=img?img.data:null;let rot=1.9,last=0,fl=0;
function frame(t){if(!document.getElementById('vintro'))return;requestAnimationFrame(frame);if(!ready||(!GPU&&(fl++&1)))return;
  const dt=Math.min(.05,(t-last)/1000||0);last=t;const k=parseFloat(document.getElementById('vintro').style.getPropertyValue('--k'))||0;rot+=dt*(.16+1.5*k*k);
  const cr=rot*1.14+.5;if(GPU){if(gpuOK)draw(rot,cr);return}
  for(let j=0;j<idx.length;j++){const p=idx[j],lo=lon0[p];let u=(lo+rot)/(2*PI);u-=Math.floor(u);const fx=u*TW-.5,xf=Math.floor(fx),tw=fx-xf,xa=((xf%TW)+TW)%TW,xb=xa+1>=TW?0:xa+1,rb=row[p]*TW,ti=rb+(tw>.5?xb:xa),a0=(rb+xa)*4,a1=(rb+xb)*4;
    let u2=(lo+cr)/(2*PI);u2-=Math.floor(u2);const c=cld[row[p]*TW+((u2*TW)|0)],d=dif[p],sh=.05+1.02*Math.pow(d,.8);
    let r=alb[a0]+(alb[a1]-alb[a0])*tw,g=alb[a0+1]+(alb[a1+1]-alb[a0+1])*tw,b=alb[a0+2]+(alb[a1+2]-alb[a0+2])*tw;const cc=c*.88;r=r*(1-cc)+244*cc;g=g*(1-cc)+246*cc;b=b*(1-cc)+250*cc;
    r*=sh;g*=sh;b*=sh*1.04;
    if(oc[ti]){const s=spc[p]*(1-cc)*115;r+=s;g+=s;b+=s}
    if(lt[ti]&&d<.2){const l=(1-d/.2)*(1-cc*.75)*lt[ti]/255;r+=255*l;g+=196*l;b+=105*l}
    const rm=rim[p]*(.25+1.1*Math.min(1,d*1.6+.1));r+=70*rm;g+=130*rm;b+=255*rm;
    const o=p*4;out[o]=r;out[o+1]=g;out[o+2]=b;out[o+3]=edge[p]*255}
  ctx.putImageData(img,0,0)}
setTimeout(()=>{build();requestAnimationFrame(frame)},60);
})();
