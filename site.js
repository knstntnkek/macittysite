// Screenshots carousel: scroll-snap track + arrows + dots + keyboard.
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
