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

// Screenshot showcase: tabs + crossfade, autoplay until the user picks a tab
(function () {
  const box = document.getElementById('showcase');
  if (!box) return;
  const tabs = [...box.querySelectorAll('.sc-tab')];
  const shots = [...box.querySelectorAll('.sc-shot')];
  const panel = document.getElementById('sc-panel');
  const desc = document.getElementById('sc-desc');
  const DUR = 6000;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0, timer = null, auto = !still, hovered = false;
  box.style.setProperty('--sc-dur', DUR + 'ms');

  function show(i, focus) {
    current = (i + tabs.length) % tabs.length;
    tabs.forEach((t, k) => {
      const on = k === current;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
    });
    shots.forEach((s, k) => { s.classList.toggle('on', k === current); if (k === current) s.removeAttribute('aria-hidden'); else s.setAttribute('aria-hidden', 'true'); });
    panel.setAttribute('aria-labelledby', tabs[current].id);
    desc.innerHTML = shots[current].dataset.desc;
    if (focus) tabs[current].focus();
    const t = tabs[current];
    const row = t.parentElement;
    if (t.offsetLeft < row.scrollLeft || t.offsetLeft + t.offsetWidth > row.scrollLeft + row.clientWidth)
      row.scrollTo({ left: t.offsetLeft - 8, behavior: still ? 'auto' : 'smooth' });
    schedule();
  }
  function schedule() {
    clearTimeout(timer);
    box.classList.remove('playing');
    if (!auto) return;
    void box.offsetWidth; // restart the progress animation
    box.classList.add('playing');
    if (!hovered && !document.hidden) timer = setTimeout(() => show(current + 1), DUR);
  }
  function stopAuto() { auto = false; schedule(); }

  tabs.forEach((t, i) => t.addEventListener('click', () => { stopAuto(); show(i); }));
  box.querySelector('.sc-tabs').addEventListener('keydown', (e) => {
    const k = { ArrowRight: current + 1, ArrowLeft: current - 1, Home: 0, End: tabs.length - 1 }[e.key];
    if (k === undefined) return;
    e.preventDefault();
    stopAuto();
    show(k, true);
  });
  function pause(on) {
    hovered = on;
    box.classList.toggle('paused', on);
    if (on) clearTimeout(timer); else schedule();
  }
  box.addEventListener('pointerenter', () => pause(true));
  box.addEventListener('pointerleave', () => pause(false));
  box.addEventListener('focusin', () => pause(true));
  box.addEventListener('focusout', (e) => { if (!box.contains(e.relatedTarget)) pause(false); });
  document.addEventListener('visibilitychange', () => document.hidden ? clearTimeout(timer) : schedule());
  show(0);
})();
