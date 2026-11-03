// Easter egg: the MaciTTY cat idles bottom-right. Every so often a little
// terminal bubble types out a random command; click the cat for a meow.
(function () {
  const COMMANDS = [
    'ssh ops@core-01',
    'sftp backup-nas',
    'ping -c1 8.8.8.8',
    'htop',
    'tail -f /var/log/auth.log',
    'telnet towel.blinkenlights.nl',
    'ssh -L 8080:web:80 gateway',
    'uname -a && uptime',
    'cat /etc/motd',
    'ssh-copy-id -i ~/.ssh/id_ed25519.pub vault',
  ];

  const cat = document.createElement('img');
  cat.src = 'icon.png';
  cat.className = 'mascot';
  cat.alt = '';
  cat.title = 'the MaciTTY cat';
  const bubble = document.createElement('div');
  bubble.className = 'mascot-bubble';
  document.body.append(bubble, cat);

  let busy = false;

  function type(text, i, done) {
    if (i <= text.length) {
      bubble.textContent = '$ ' + text.slice(0, i);
      setTimeout(() => type(text, i + 1, done), 45 + Math.random() * 60);
    } else setTimeout(done, 1600);
  }
  function erase(done) {
    const t = bubble.textContent;
    if (t.length > 2) {
      bubble.textContent = t.slice(0, -1);
      setTimeout(() => erase(done), 18);
    } else done();
  }

  function session(cmd) {
    if (busy) return;
    busy = true;
    bubble.classList.add('show');
    type(cmd, 0, () => erase(() => {
      bubble.classList.remove('show');
      busy = false;
      setTimeout(session, 9000 + Math.random() * 12000, pick());
    }));
  }
  const pick = () => COMMANDS[Math.floor(Math.random() * COMMANDS.length)];

  cat.addEventListener('click', () => {
    cat.classList.remove('hop');
    void cat.offsetWidth; // restart animation
    cat.classList.add('hop');
    if (!busy) session('meow');
  });

  setTimeout(session, 6000 + Math.random() * 6000, pick());
})();

(function () {
  const car = document.getElementById('carousel');
  if (!car) return;
  const track = car.querySelector('.carousel-track');
  const slides = track.children;
  const dotsBox = car.querySelector('.car-dots');
  let current = 0;

  const dots = [...slides].map((_, i) => {
    const d = document.createElement('button');
    d.className = 'car-dot';
    d.setAttribute('aria-label', 'Screenshot ' + (i + 1));
    d.addEventListener('click', () => go(i));
    dotsBox.appendChild(d);
    return d;
  });

  function go(i) {
    current = (i + slides.length) % slides.length;
    track.scrollTo({ left: current * track.clientWidth, behavior: 'smooth' });
  }

  function sync() {
    current = Math.round(track.scrollLeft / track.clientWidth);
    dots.forEach((d, i) => d.classList.toggle('on', i === current));
  }

  car.querySelector('.prev').addEventListener('click', () => go(current - 1));
  car.querySelector('.next').addEventListener('click', () => go(current + 1));
  track.addEventListener('scroll', sync, { passive: true });
  window.addEventListener('resize', sync);
  document.addEventListener('keydown', (e) => {
    const r = car.getBoundingClientRect();
    if (r.top > innerHeight || r.bottom < 0) return;
    if (e.key === 'ArrowLeft') go(current - 1);
    if (e.key === 'ArrowRight') go(current + 1);
  });
  sync();
})();
