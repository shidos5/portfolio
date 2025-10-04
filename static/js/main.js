// Minimal scroll reveal and animated canvas background
(function(){
  const els = Array.from(document.querySelectorAll('.reveal'));
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target);} });
  }, {threshold: 0.2});
  els.forEach(el=>io.observe(el));
})();

(function(){
  const c = document.getElementById('bg-canvas');
  if(!c) return; const ctx = c.getContext('2d');
  let dpr = window.devicePixelRatio || 1; let w=0,h=0; let dots=[];
  function resize(){ w = c.clientWidth; h = c.clientHeight; c.width = Math.floor(w*dpr); c.height = Math.floor(h*dpr); }
  function init(){ dots = Array.from({length: 70}, (_,i)=>({
    x: Math.random()*w, y: Math.random()*h, r: 1+Math.random()*2,
    vx: -0.3 + Math.random()*0.6, vy: -0.3 + Math.random()*0.6,
    hue: 195 + Math.random()*40
  })); }
  function step(){
    ctx.clearRect(0,0,c.width,c.height);
    ctx.globalAlpha=0.7; ctx.fillStyle='#ffffff';
    dots.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>w) p.vx*=-1; if(p.y<0||p.y>h) p.vy*=-1;
      ctx.beginPath(); ctx.fillStyle=`hsla(${p.hue}, 80%, 60%, 0.12)`;
      ctx.arc(p.x*dpr, p.y*dpr, p.r*dpr, 0, Math.PI*2); ctx.fill();
    });
    requestAnimationFrame(step);
  }
  resize(); init(); step();
  window.addEventListener('resize', ()=>{ resize(); init(); });
})();
