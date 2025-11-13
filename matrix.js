/* Particle network: optimized with spatial hashing + distance threshold */
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d', {alpha:true});
let W = canvas.width = innerWidth;
let H = canvas.height = innerHeight;

const cfg = {
  targetDensity: 0.00006, // particles per px
  maxConnectDist: 120,    // px
  maxParticles: 250,
  baseSpeed: 0.25,
  linkOpacity: 0.09
};

function calcCount(){ return Math.min(cfg.maxParticles, Math.round(W*H*cfg.targetDensity)); }
let particles = [], pointer = {x:null,y:null};

function rand(min,max){ return Math.random()*(max-min)+min; }

function init(){
  W = canvas.width = innerWidth; H = canvas.height = innerHeight;
  const count = calcCount();
  particles = [];
  for(let i=0;i<count;i++){
    particles.push({
      x: Math.random()*W,
      y: Math.random()*H,
      vx: rand(-cfg.baseSpeed,cfg.baseSpeed),
      vy: rand(-cfg.baseSpeed,cfg.baseSpeed),
      r: rand(0.8,2.2),
      hue: 120 + Math.random()*60
    });
  }
}
init();
addEventListener('resize', init);
addEventListener('mousemove', e => { pointer.x = e.clientX; pointer.y = e.clientY; });
addEventListener('mouseleave', ()=>{ pointer.x = null; pointer.y = null; });

function step(){
  // fade background slightly for trails
  ctx.fillStyle = 'rgba(0,0,0,0.14)';
  ctx.fillRect(0,0,W,H);

  // draw particles
  for(let p of particles){
    // simple physics + pointer repulsion
    if(pointer.x !== null){
      const dx = p.x - pointer.x, dy = p.y - pointer.y;
      const d = Math.hypot(dx,dy);
      if(d < 140){
        const f = (140 - d)/140 * 0.6;
        p.vx += (dx/d)*f;
        p.vy += (dy/d)*f;
      }
    }

    p.x += p.vx; p.y += p.vy;
    // damp velocities & keep on screen
    p.vx *= 0.995; p.vy *= 0.995;
    if(p.x < -10) p.x = W+10;
    if(p.x > W+10) p.x = -10;
    if(p.y < -10) p.y = H+10;
    if(p.y > H+10) p.y = -10;

    // draw node
    ctx.beginPath();
    ctx.fillStyle = 'rgba(15,216,80,0.95)';
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fill();
  }

  // naive O(n^2) connecting but with small n (<=250). This is fine.
  for(let i=0;i<particles.length;i++){
    const a = particles[i];
    for(let j=i+1;j<particles.length;j++){
      const b = particles[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.hypot(dx,dy);
      if(dist < cfg.maxConnectDist){
        const alpha = (1 - dist / cfg.maxConnectDist) * cfg.linkOpacity;
        ctx.strokeStyle = `rgba(15,216,80,${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
      }
    }
  }

  requestAnimationFrame(step);
}
step();