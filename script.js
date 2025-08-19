// Year
document.getElementById('year').textContent = new Date().getFullYear();

/* ================= Reveal-on-scroll ================= */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('[data-animate]').forEach(el => io.observe(el));

/* ================= Active nav link ================= */
const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('.menu a')];
function setActive() {
  const y = window.scrollY + 120;
  let current = sections.findLast(s => s.offsetTop <= y);
  if (!current) return;
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current.id}`));
}
window.addEventListener('scroll', setActive);
setActive();

/* ================= Smooth scroll for internal anchors ================= */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
      history.replaceState(null, '', `#${id}`);
    }
  });
});

/* ================= Terminal typing line ================= */
const line = document.getElementById('type-line');
const phrases = [
  'nmap -sV -Pn target.lan  # enumerate services',
  'burp-suite -> Repeater -> PoC exploit',
  'nessus: misconfigurations & missing patches',
  'owasp-top10: xss | csrf | idor | sqli',
  'ai+security: LLM triage + AST rules = 🔥',
  'caps: campaign creation → metrics QA'
];
let pi = 0, ci = 0, typing = true;
function typeLoop() {
  const text = phrases[pi];
  if (typing) {
    ci++;
    line.textContent = text.slice(0, ci);
    if (ci === text.length) { typing = false; setTimeout(typeLoop, 1200); return; }
  } else {
    ci--;
    line.textContent = text.slice(0, ci);
    if (ci === 0) { typing = true; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(typeLoop, typing ? 28 : 16);
}
typeLoop();

/* ================= Hacker Mode (Matrix rain canvas) ================= */
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
let hackerOn = false;
let drops = [];
let fontSize = 16;
let chars = 'アィゥェォカキクケコサシスセソ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function resizeMatrix() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1 + Math.random() * 50);
}
function drawMatrix() {
  if (!hackerOn) return;
  ctx.fillStyle = 'rgba(5,7,10,0.08)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#10d481';
  ctx.font = `${fontSize}px monospace`;
  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
  requestAnimationFrame(drawMatrix);
}
window.addEventListener('resize', resizeMatrix);
resizeMatrix();

const toggle = document.getElementById('hackerToggle');
toggle.addEventListener('click', () => {
  hackerOn = !hackerOn;
  canvas.classList.toggle('on', hackerOn);
  if (hackerOn) drawMatrix();
});
