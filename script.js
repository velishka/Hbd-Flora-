// Конфетти + музыка + лайтбокс
const startBtn = document.getElementById('startBtn');
const song = document.getElementById('song');
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let particles = [];
let playing = false;

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize); resize();

function random(min,max){ return Math.random()*(max-min)+min; }

function spawnBurst(){
  const colors = ['#ffd166','#06d6a0','#4cc9f0','#f72585','#f9c74f','#bde0fe'];
  for(let i=0;i<160;i++){
    particles.push({
      x: canvas.width/2,
      y: canvas.height/3,
      vx: random(-6,6),
      vy: random(-10,-2),
      g: random(0.05,0.2),
      s: random(4,8),
      r: random(0,Math.PI*2),
      vr: random(-0.2,0.2),
      color: colors[ (Math.random()*colors.length)|0 ],
      life: random(60,140)
    });
  }
}

function tick(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.vy += p.g;
    p.x += p.vx;
    p.y += p.vy;
    p.r += p.vr;
    p.life -= 1;
    ctx.save();
    ctx.translate(p.x,p.y);
    ctx.rotate(p.r);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s);
    ctx.restore();
  });
  particles = particles.filter(p=>p.life>0 && p.y < canvas.height+40);
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

startBtn.addEventListener('click', async ()=>{
  spawnBurst();
  if(!playing){
    try{
      await song.play();
      playing = true;
      startBtn.textContent = 'Пауза ⏸️';
    }catch(err){
      alert('Нажми ещё раз, чтобы включить музыку (браузер блокирует автозапуск).');
    }
  }else{
    song.pause();
    playing = false;
    startBtn.textContent = 'Продолжить ▶️';
  }
});

// Лайтбокс
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = lightbox.querySelector('.close');
document.querySelectorAll('.grid a').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    lightboxImg.src = a.href;
    lightbox.classList.remove('hidden');
  });
});
closeBtn.addEventListener('click', ()=> lightbox.classList.add('hidden'));
lightbox.addEventListener('click', (e)=>{
  if(e.target === lightbox) lightbox.classList.add('hidden');
});