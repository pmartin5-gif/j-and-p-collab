// Slide navigation: arrow keys, space, Page Up/Down, Home/End, the on-screen
// buttons, or clicking the left/right half of a slide. The URL hash (#3)
// keeps the current slide on reload.
(() => {
  const stage = document.getElementById('stage');
  const viewer = document.getElementById('viewer');
  const slides = [...stage.querySelectorAll('.slide')];
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const counter = document.getElementById('counter');
  let index = 0;

  slides.forEach((s, i) => {
    s.setAttribute('aria-roledescription', 'slide');
    if (!s.hasAttribute('aria-label')) s.setAttribute('aria-label', `${i + 1} of ${slides.length}`);
  });

  function fit() {
    const w = viewer.clientWidth, h = viewer.clientHeight;
    const scale = Math.min(w / 1920, h / 1080);
    stage.style.transform = `scale(${scale}) translate(-50%, -50%)`;
  }

  function show(i) {
    index = Math.max(0, Math.min(slides.length - 1, i));
    slides.forEach((s, n) => {
      const active = n === index;
      s.classList.toggle('is-active', active);
      s.setAttribute('aria-hidden', String(!active));
    });
    counter.textContent = `${index + 1} / ${slides.length}`;
    prev.disabled = index === 0;
    next.disabled = index === slides.length - 1;
    history.replaceState(null, '', `#${index + 1}`);
  }

  document.addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); show(index + 1); }
    else if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); show(index - 1); }
    else if (e.key === 'Home') show(0);
    else if (e.key === 'End') show(slides.length - 1);
  });

  viewer.addEventListener('click', e => {
    const r = viewer.getBoundingClientRect();
    show(index + (e.clientX - r.left > r.width / 2 ? 1 : -1));
  });

  prev.addEventListener('click', () => show(index - 1));
  next.addEventListener('click', () => show(index + 1));
  window.addEventListener('resize', fit);
  window.addEventListener('hashchange', () => show(parseInt(location.hash.slice(1), 10) - 1 || 0));

  fit();
  show((parseInt(location.hash.slice(1), 10) || 1) - 1);
})();
