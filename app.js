'use strict';
// Weitere Zugangscodes hier ergänzen. Dies ist kein sicherer Passwortschutz.
const experiences = {
  '777': { question: 'Schickst du mir', highlight: 'Fußbilder?' }
};
const $ = id => document.getElementById(id);
const motion = matchMedia('(prefers-reduced-motion: reduce)');
let dodges = 0, refusals = 0, screen = 'gate';
const followups = [
  ['Bist du dir wirklich sicher?', 'Nur noch einmal nachgefragt. Versprochen … fast.', 'Der Button bleibt jetzt auch brav stehen.'],
  ['Auch nicht ein klitzekleines?', 'Okay, das war mein allerbester Überredungsversuch.', 'Ein Nein ist natürlich völlig okay.'],
  ['Letzte Nachfrage. Wirklich.', 'Bleibt es bei deinem Nein?', 'Diesmal ist es wirklich die letzte Runde.']
];
function show(id) {
  screen = id;
  ['gate', 'question', 'result'].forEach(name => { $(name).hidden = name !== id; });
  if (id !== 'gate') $(id + '-title').focus({preventScroll: true});
}
$('code-form').addEventListener('submit', event => {
  event.preventDefault();
  const entered = $('code').value.trim();
  const config = Object.hasOwn(experiences, entered) ? experiences[entered] : null;
  if (!config) {
    $('error').textContent = 'Dieser Code passt noch nicht. Versuch’s nochmal.';
    $('code').setAttribute('aria-invalid', 'true');
    $('gate').classList.remove('shake'); void $('gate').offsetWidth; $('gate').classList.add('shake');
    $('code').select(); return;
  }
  $('error').textContent = ''; $('code').removeAttribute('aria-invalid');
  $('question-title').replaceChildren(document.createTextNode(config.question), document.createElement('br'));
  const em = document.createElement('em'); em.textContent = config.highlight; $('question-title').append(em);
  show('question');
});
$('code').addEventListener('input', () => { $('error').textContent = ''; $('code').removeAttribute('aria-invalid'); });
function escapeNo() {
  if (screen !== 'question' || dodges >= 3 || refusals || motion.matches) return false;
  dodges++;
  const area = $('answer-zone'), no = $('no');
  const x = dodges % 2 ? 0 : area.clientWidth - no.offsetWidth;
  no.classList.add('escaped'); no.style.left = x + 'px'; no.style.top = '76px';
  $('tease').textContent = ['Huch. Der Button hat eigene Pläne.', 'Er ist heute etwas schüchtern.', 'Okay, genug Verstecken. Jetzt bleibt er.'][dodges - 1];
  return true;
}
$('no').addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') escapeNo(); });
$('no').addEventListener('click', event => {
  // Tastaturbedienung (detail === 0) funktioniert ohne Ausweichen.
  if (event.detail > 0 && escapeNo()) return;
  if (refusals < followups.length) {
    const [title, subtitle, tease] = followups[refusals++];
    $('question-title').textContent = title; $('subtitle').textContent = subtitle; $('tease').textContent = tease;
    $('kicker').textContent = 'Kleine Verhandlungsrunde ' + refusals;
    $('no').classList.remove('escaped'); $('no').style.left = ''; $('no').style.top = '';
    $('question-title').focus({preventScroll:true});
  } else finish(false);
});
function finish(accepted) {
  $('result-icon').textContent = accepted ? '♡' : '☾';
  $('result-label').textContent = accepted ? 'IT’S A YES' : 'ALLES GUT';
  $('result-title').textContent = accepted ? 'Yaaay!' : 'Schade …';
  $('result-text').textContent = accepted ? 'Du kannst die Bilder nun senden.' : 'Dein Nein ist angekommen.';
  $('result-note').textContent = accepted ? 'Wenn du möchtest, schick sie mir einfach in unserem Chat.' : 'Kein Stress. Danke für deine ehrliche Antwort. ♡';
  show('result'); if (accepted && !motion.matches) celebrate();
}
$('yes').addEventListener('click', () => finish(true));
$('finish-no').addEventListener('click', () => finish(false));
$('restart').addEventListener('click', () => location.reload());
function celebrate() {
  const colors = ['#c5b0ff','#f1d2f3','#fff','#a58be6','#f1d497'];
  for (let i=0;i<75;i++) {
    const piece = document.createElement('i'); piece.className='confetti-piece';
    piece.style.cssText = `left:${Math.random()*100}%;background:${colors[i%colors.length]};--duration:${2.5+Math.random()*2}s;--delay:${Math.random()*.8}s;--drift:${Math.random()*240-120}px;border-radius:${i%3===0?'50%':'2px'}`;
    $('confetti').append(piece);
  }
  setTimeout(() => $('confetti').replaceChildren(), 5500);
}
// Ein gebogenes Linienfeld mit beschleunigenden Lichtspuren erzeugt den Gravity-Effekt.
const canvas = $('gravity'), ctx = canvas.getContext('2d');
let width=0,height=0,frame=0,last=0;
const trails = Array.from({length:28}, (_,i)=>({lane:i/27,t:Math.random(),speed:.035+Math.random()*.045}));
function point(lane,t) {
  const spread=(lane-.5)*width*1.65;
  return {x:width*.5+spread*(1-.61*Math.pow(t,1.7)), y:-height*.15+t*height*1.3};
}
function resize() {
  width=innerWidth; height=innerHeight; const ratio=Math.min(devicePixelRatio||1,2);
  canvas.width=width*ratio; canvas.height=height*ratio; ctx.setTransform(ratio,0,0,ratio,0,0); draw(0);
}
function draw(dt) {
  ctx.clearRect(0,0,width,height);
  trails.forEach(trail=>{
    ctx.beginPath();
    for(let j=0;j<=55;j++){const p=point(trail.lane,j/55);j?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y);}
    ctx.strokeStyle='rgba(159,137,206,0.10)'; ctx.lineWidth=.7;ctx.stroke();
    if(!motion.matches){trail.t=(trail.t+dt*trail.speed*(.45+trail.t*2))%1;const a=point(trail.lane,Math.max(0,trail.t-.12)),b=point(trail.lane,trail.t);const gradient=ctx.createLinearGradient(a.x,a.y,b.x,b.y);gradient.addColorStop(0,'rgba(184,153,255,0)');gradient.addColorStop(1,'rgba(201,177,255,.55)');ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=gradient;ctx.lineWidth=1;ctx.stroke();}
  });
}
function animate(time){draw(last?Math.min((time-last)/1000,.05):0);last=time;frame=requestAnimationFrame(animate);}
function syncMotion(){cancelAnimationFrame(frame);last=0;if(!motion.matches&&!document.hidden)frame=requestAnimationFrame(animate);else draw(0);}
addEventListener('resize',resize);document.addEventListener('visibilitychange',syncMotion);motion.addEventListener('change',syncMotion);resize();syncMotion();
