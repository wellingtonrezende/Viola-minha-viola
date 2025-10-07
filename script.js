// script.js - interactivity for the professional static site
document.getElementById('year').textContent = new Date().getFullYear();

// Burger menu
const btnMenu = document.getElementById('btnMenu');
const nav = document.getElementById('nav');
btnMenu.addEventListener('click', ()=>{
  const open = nav.classList.toggle('open');
  btnMenu.setAttribute('aria-expanded', String(open));
});

// Smooth scroll for internal links and close nav on click
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const href = a.getAttribute('href');
    if(href.length>1){
      e.preventDefault();
      const el = document.querySelector(href);
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      if(nav.classList.contains('open')) nav.classList.remove('open');
    }
  });
});

// Counter animation
function animateCounters(){
  const items = document.querySelectorAll('.impact-card h3');
  items.forEach(h3=>{
    const target = +h3.getAttribute('data-count') || 0;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 120));
    const id = setInterval(()=>{
      current += step;
      if(current >= target){ current = target; clearInterval(id); }
      h3.textContent = current.toLocaleString('pt-BR');
    }, 12);
  });
}
let countersPlayed = false;
window.addEventListener('scroll', ()=>{
  if(!countersPlayed && window.scrollY > 200){
    animateCounters();
    countersPlayed = true;
  }
});
setTimeout(()=>{ if(!countersPlayed) { animateCounters(); countersPlayed = true; } }, 1200);

// Fake contact submit
function handleSubmit(e){
  e.preventDefault();
  const status = document.getElementById('status');
  const btn = e.target.querySelector('button[type="submit"]');
  btn.disabled = true;
  status.textContent = 'Enviando...';
  setTimeout(()=>{
    status.textContent = 'Mensagem enviada! Obrigado — (demo)';
    btn.disabled = false;
    e.target.reset();
  }, 1100);
  return false;
}
