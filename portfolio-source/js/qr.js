/* Minimal QR code generator (byte mode, error correction M, versions 1 to 6, up to 106 bytes). No network needed. */
(()=>{const EXP=new Uint8Array(512),LOG=new Uint8Array(256);{let x=1;for(let i=0;i<255;i++){EXP[i]=x;LOG[x]=i;x<<=1;if(x&256)x^=0x11d}for(let i=255;i<512;i++)EXP[i]=EXP[i-255]}
const mul=(a,b)=>a&&b?EXP[LOG[a]+LOG[b]]:0;
function gen(n){let g=[1];for(let i=0;i<n;i++){const h=new Array(g.length+1).fill(0);for(let j=0;j<g.length;j++){h[j]^=g[j];h[j+1]^=mul(g[j],EXP[i])}g=h}return g}
function rs(data,n){const g=gen(n),r=new Array(n).fill(0);for(const d of data){const f=d^r.shift();r.push(0);for(let i=0;i<n;i++)r[i]^=mul(g[i+1],f)}return r}
const V=[null,{ec:10,nb:1,dl:16},{ec:16,nb:1,dl:28},{ec:26,nb:1,dl:44},{ec:18,nb:2,dl:32},{ec:24,nb:2,dl:43},{ec:16,nb:4,dl:27}];
function make(text){const bytes=[...new TextEncoder().encode(text)];let ver=0;for(let v=1;v<=6;v++)if(12+8*bytes.length<=V[v].nb*V[v].dl*8){ver=v;break}if(!ver)throw new Error('QR text too long');
  const cfg=V[ver],cap=cfg.nb*cfg.dl,bits=[],put=(val,len)=>{for(let i=len-1;i>=0;i--)bits.push((val>>>i)&1)};
  put(4,4);put(bytes.length,8);bytes.forEach(b=>put(b,8));put(0,Math.min(4,cap*8-bits.length));while(bits.length%8)bits.push(0);
  const cw=[];for(let i=0;i<bits.length;i+=8){let b=0;for(let j=0;j<8;j++)b=b<<1|bits[i+j];cw.push(b)}for(let p=0xEC;cw.length<cap;p^=0xEC^0x11)cw.push(p);
  const blocks=[],ecs=[];for(let b=0;b<cfg.nb;b++){const d=cw.slice(b*cfg.dl,(b+1)*cfg.dl);blocks.push(d);ecs.push(rs(d,cfg.ec))}
  const out=[];for(let i=0;i<cfg.dl;i++)blocks.forEach(b=>out.push(b[i]));for(let i=0;i<cfg.ec;i++)ecs.forEach(e=>out.push(e[i]));
  const data=[];out.forEach(b=>put2(b));function put2(b){for(let i=7;i>=0;i--)data.push((b>>>i)&1)}
  const n=17+4*ver,m=Array.from({length:n},()=>new Array(n).fill(0)),fn=Array.from({length:n},()=>new Array(n).fill(false));
  const set=(x,y,v)=>{if(x>=0&&y>=0&&x<n&&y<n){m[y][x]=v?1:0;fn[y][x]=true}};
  const finder=(cx,cy)=>{for(let dy=-4;dy<=4;dy++)for(let dx=-4;dx<=4;dx++){const d=Math.max(Math.abs(dx),Math.abs(dy));set(cx+dx,cy+dy,d!=2&&d!=4)}};
  finder(3,3);finder(n-4,3);finder(3,n-4);for(let i=0;i<n;i++){set(6,i,i%2==0);set(i,6,i%2==0)}finder(3,3);finder(n-4,3);finder(3,n-4);
  if(ver>1){const c=n-7;for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++)set(c+dx,c+dy,Math.max(Math.abs(dx),Math.abs(dy))!=1)}
  const fmt=mk=>{const d=(0<<3)|mk;let r=d;for(let i=0;i<10;i++)r=(r<<1)^((r>>>9)*0x537);const b=((d<<10)|r)^0x5412,g=i=>((b>>>i)&1)==1;
    for(let i=0;i<=5;i++)set(8,i,g(i));set(8,7,g(6));set(8,8,g(7));set(7,8,g(8));for(let i=9;i<15;i++)set(14-i,8,g(i));
    for(let i=0;i<8;i++)set(n-1-i,8,g(i));for(let i=8;i<15;i++)set(8,n-15+i,g(i));set(8,n-8,true)};
  fmt(0);
  let k=0;for(let right=n-1;right>=1;right-=2){if(right==6)right=5;for(let vert=0;vert<n;vert++)for(let j=0;j<2;j++){const x=right-j,up=((right+1)&2)==0,y=up?n-1-vert:vert;if(!fn[y][x]){m[y][x]=k<data.length?data[k]:0;k++}}}
  const mask=(mk,x,y)=>[(x+y)%2==0,y%2==0,x%3==0,(x+y)%3==0,(((x/3)|0)+((y/2)|0))%2==0,x*y%2+x*y%3==0,(x*y%2+x*y%3)%2==0,((x+y)%2+x*y%3)%2==0][mk];
  const apply=mk=>{for(let y=0;y<n;y++)for(let x=0;x<n;x++)if(!fn[y][x]&&mask(mk,x,y))m[y][x]^=1};
  const pen=()=>{let p=0;for(let pass=0;pass<2;pass++){for(let a=0;a<n;a++){let run=1;for(let b=1;b<n;b++){const c=pass?m[b][a]:m[a][b],pr=pass?m[b-1][a]:m[a][b-1];if(c==pr){run++;if(run==5)p+=3;else if(run>5)p++}else run=1}}}
    for(let y=0;y<n-1;y++)for(let x=0;x<n-1;x++){const c=m[y][x];if(c==m[y][x+1]&&c==m[y+1][x]&&c==m[y+1][x+1])p+=3}
    const pat=[1,0,1,1,1,0,1,0,0,0,0],pat2=[0,0,0,0,1,0,1,1,1,0,1];for(let a=0;a<n;a++)for(let b=0;b<=n-11;b++){let h1=true,h2=true,v1=true,v2=true,h3=true,v3=true;for(let i=0;i<11;i++){const hv=m[a][b+i],vv=m[b+i][a];if(hv!=pat[i])h1=false;if(hv!=pat2[i])h2=false;if(vv!=pat[i])v1=false;if(vv!=pat2[i])v2=false}if(h1||h2)p+=40;if(v1||v2)p+=40}
    let dark=0;for(let y=0;y<n;y++)for(let x=0;x<n;x++)dark+=m[y][x];p+=Math.floor(Math.abs(dark*20-n*n*10)/(n*n))*10;return p};
  let best=0,bp=1e9;for(let mk=0;mk<8;mk++){apply(mk);fmt(mk);const p=pen();if(p<bp){bp=p;best=mk}apply(mk)}
  apply(best);fmt(best);return{size:n,get:(r,c)=>m[r][c]==1}}
window.QR={make};
})();
