const menuBtn=document.querySelector('.menu'),nav=document.querySelector('.topbar nav');
menuBtn.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.topbar nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.getElementById('year').textContent=new Date().getFullYear();

const roles=['AI / ML Engineer','Data Science Graduate','Computer Vision Builder','Data Analyst'];
const roleEl=document.getElementById('typedRole');let r=0,c=0,deleting=false;
function typeRole(){const text=roles[r];if(!deleting){c++;roleEl.textContent=text.slice(0,c);if(c===text.length){deleting=true;setTimeout(typeRole,1300);return}}else{c--;roleEl.textContent=text.slice(0,c);if(c===0){deleting=false;r=(r+1)%roles.length}}setTimeout(typeRole,deleting?45:80)} typeRole();

document.querySelectorAll('[data-target]').forEach(el=>{const t=+el.dataset.target;let n=0;const id=setInterval(()=>{el.textContent=++n;if(n>=t)clearInterval(id)},t>10?45:180)});

const canvas=document.getElementById('networkCanvas'),ctx=canvas.getContext('2d');let W,H,dpr=Math.min(devicePixelRatio||1,2),nodes=[],particles=[];
function resize(){const r=canvas.getBoundingClientRect();W=r.width;H=r.height;canvas.width=W*dpr;canvas.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);scene()}
function scene(){nodes=[];particles=[];const cx=W*.70,cy=H*.48,layers=[3,5,6,5,3],xs=[-.16,-.08,0,.08,.17].map(v=>cx+v*W),colors=['#12dfea','#934dff','#1bc44e','#e02f6f','#f1b600'];
layers.forEach((count,li)=>{for(let i=0;i<count;i++)nodes.push({x:xs[li],y:cy+(i-(count-1)/2)*Math.min(76,H*.095),li,r:5+Math.random()*2,color:colors[(i+li)%colors.length],phase:Math.random()*6.28})});
for(let i=0;i<32;i++)particles.push({x:W*(.36+Math.random()*.6),y:H*(.14+Math.random()*.74),r:1+Math.random()*3,dx:(Math.random()-.5)*.18,dy:(Math.random()-.5)*.18,color:colors[Math.floor(Math.random()*colors.length)]})}
function rgba(hex,a){const h=hex.slice(1),r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16);return `rgba(${r},${g},${b},${a})`}
function draw(t){ctx.clearRect(0,0,W,H);particles.forEach(p=>{p.x+=p.dx;p.y+=p.dy;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,6.283);ctx.fillStyle=rgba(p.color,.4);ctx.fill()});
for(let a=0;a<nodes.length;a++)for(let b=a+1;b<nodes.length;b++){let A=nodes[a],B=nodes[b];if(B.li===A.li+1){ctx.beginPath();ctx.moveTo(A.x,A.y);ctx.lineTo(B.x,B.y);ctx.strokeStyle='rgba(15,229,242,.09)';ctx.lineWidth=.7;ctx.stroke()}}
nodes.forEach(n=>{let p=(Math.sin(t/700+n.phase)+1)/2;ctx.beginPath();ctx.arc(n.x,n.y,18+p*5,0,6.283);ctx.fillStyle=rgba(n.color,.05+.04*p);ctx.fill();ctx.beginPath();ctx.arc(n.x,n.y,n.r+p*1.4,0,6.283);ctx.fillStyle=rgba(n.color,.78);ctx.shadowBlur=14;ctx.shadowColor=n.color;ctx.fill();ctx.shadowBlur=0});requestAnimationFrame(draw)}
addEventListener('resize',resize);resize();requestAnimationFrame(draw);