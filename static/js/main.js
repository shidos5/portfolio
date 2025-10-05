// Enhanced scroll reveal animations
(function(){
  const els = Array.from(document.querySelectorAll('.reveal'));
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        setTimeout(()=>{
          e.target.classList.add('visible');
        }, e.target.dataset.delay || 0);
        io.unobserve(e.target);
      }
    });
  }, {threshold: 0.15, rootMargin: '0px 0px -50px 0px'});
  els.forEach((el, i)=>{
    el.dataset.delay = i * 100;
    io.observe(el);
  });
})();

// Animated particle background with connections
(function(){
  const c = document.getElementById('bg-canvas');
  if(!c) return;
  const ctx = c.getContext('2d');
  let dpr = window.devicePixelRatio || 1;
  let w=0, h=0, dots=[], mouse={x:0, y:0};
  
  function resize(){
    w = c.clientWidth;
    h = c.clientHeight;
    c.width = Math.floor(w*dpr);
    c.height = Math.floor(h*dpr);
    ctx.scale(dpr, dpr);
  }
  
  function init(){
    dots = Array.from({length: 50}, ()=>({
      x: Math.random()*w,
      y: Math.random()*h,
      r: 1 + Math.random()*1.5,
      vx: -0.3 + Math.random()*0.6,
      vy: -0.3 + Math.random()*0.6,
      hue: 210 + Math.random()*40
    }));
  }
  
  function step(){
    ctx.clearRect(0, 0, w, h);
    
    // Draw connections
    dots.forEach((p1, i)=>{
      dots.slice(i+1).forEach(p2=>{
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < 120){
          ctx.beginPath();
          ctx.strokeStyle = `rgba(59,130,246,${(1-dist/120)*0.08})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });
    });
    
    // Draw and update particles
    dots.forEach(p=>{
      p.x += p.vx;
      p.y += p.vy;
      
      if(p.x < 0 || p.x > w) p.vx *= -1;
      if(p.y < 0 || p.y > h) p.vy *= -1;
      
      // Mouse interaction
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < 100){
        p.x -= dx * 0.01;
        p.y -= dy * 0.01;
      }
      
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r*2);
      gradient.addColorStop(0, `hsla(${p.hue}, 70%, 60%, 0.4)`);
      gradient.addColorStop(1, `hsla(${p.hue}, 70%, 60%, 0)`);
      ctx.fillStyle = gradient;
      ctx.arc(p.x, p.y, p.r*2, 0, Math.PI*2);
      ctx.fill();
    });
    
    requestAnimationFrame(step);
  }
  
  window.addEventListener('mousemove', e=>{
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  
  resize();
  init();
  step();
  window.addEventListener('resize', ()=>{ resize(); init(); });
})();

// Animate skill bars on page load
window.addEventListener('load', ()=>{
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  setTimeout(()=>{
    skillBars.forEach(bar=>{
      const width = bar.dataset.width;
      bar.style.width = width + '%';
    });
  }, 500);
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener('click', function(e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      target.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  });
});

// Auto-hide flash messages
setTimeout(()=>{
  document.querySelectorAll('.flash').forEach(flash=>{
    flash.style.animation = 'slideIn 0.3s ease reverse';
    setTimeout(()=> flash.remove(), 300);
  });
}, 5000);
