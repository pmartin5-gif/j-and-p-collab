(() => {
  'use strict';

  const slides = [...document.querySelectorAll('.slide')];
  const controls = document.querySelector('.controls');
  const previous = document.getElementById('previous');
  const next = document.getElementById('next');
  const counter = document.getElementById('counter');
  const announcement = document.getElementById('announcement');
  const overview = document.getElementById('overview');
  const help = document.getElementById('help');
  const imageView = document.getElementById('image-view');
  const fullscreen = document.getElementById('fullscreen');
  let current = 0;

  function indexFromHash() {
    const match = /^#slide-(\d+)$/.exec(window.location.hash);
    return match ? Math.min(slides.length - 1, Math.max(0, Number(match[1]) - 1)) : 0;
  }

  function showSlide(index, updateHash = true, announce = true) {
    current = Math.min(slides.length - 1, Math.max(0, index));
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    previous.disabled = current === 0;
    next.disabled = current === slides.length - 1;
    counter.textContent = `${current + 1} / ${slides.length}`;
    counter.setAttribute('aria-label', `Slide ${current + 1} of ${slides.length}`);
    const title = slides[current].querySelector('h1, h2').textContent;
    document.title = `${title} — Farmers markets`;
    document.querySelectorAll('#slide-list button').forEach((button, i) => {
      if (i === current) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
    if (updateHash && window.location.hash !== `#slide-${current + 1}`) {
      // Hash navigation works when opened directly from the filesystem, too.
      window.location.hash = `slide-${current + 1}`;
    }
    if (announce) announcement.textContent = `Slide ${current + 1} of ${slides.length}: ${title}`;
    if (announce) window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function openDialog(dialog, trigger) {
    dialog.returnFocus = trigger || document.activeElement;
    dialog.showModal();
  }

  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => dialog.returnFocus?.focus());
  });

  const list = document.getElementById('slide-list');
  slides.forEach((slide, index) => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = slide.querySelector('h1, h2').textContent;
    button.addEventListener('click', () => {
      overview.close();
      showSlide(index);
    });
    item.append(button);
    list.append(item);
  });

  previous.addEventListener('click', () => showSlide(current - 1));
  next.addEventListener('click', () => showSlide(current + 1));
  document.getElementById('overview-open').addEventListener('click', event => openDialog(overview, event.currentTarget));
  document.getElementById('help-open').addEventListener('click', event => openDialog(help, event.currentTarget));
  document.getElementById('print').addEventListener('click', () => window.print());

  document.querySelectorAll('[data-image]').forEach(button => {
    button.addEventListener('click', () => {
      const image = document.getElementById('enlarged-image');
      image.src = button.dataset.image;
      image.alt = button.querySelector('img').alt;
      document.getElementById('image-title').textContent = button.dataset.caption;
      document.getElementById('image-original').href = button.dataset.image;
      openDialog(imageView, button);
    });
  });

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      announcement.textContent = 'Fullscreen is unavailable in this browser.';
    }
  }
  if (!document.documentElement.requestFullscreen) fullscreen.hidden = true;
  fullscreen.addEventListener('click', toggleFullscreen);
  document.addEventListener('fullscreenchange', () => {
    fullscreen.textContent = document.fullscreenElement ? 'Exit fullscreen' : 'Fullscreen';
  });

  document.addEventListener('keydown', event => {
    if (event.ctrlKey || event.metaKey || event.altKey || event.defaultPrevented) return;
    if (document.querySelector('dialog[open]')) return;
    const target = event.target instanceof Element ? event.target : document.body;
    if (target.closest('input, textarea, select, [contenteditable="true"]')) return;
    if (event.key === ' ' && target.closest('button, a')) return;
    let destination;
    switch (event.key) {
      case 'ArrowRight': case 'PageDown': destination = current + 1; break;
      case 'ArrowLeft': case 'PageUp': destination = current - 1; break;
      case ' ': destination = current + (event.shiftKey ? -1 : 1); break;
      case 'Home': destination = 0; break;
      case 'End': destination = slides.length - 1; break;
      case 'o': case 'O': openDialog(overview); break;
      case 'f': case 'F': toggleFullscreen(); break;
      case '?': openDialog(help); break;
      default: return;
    }
    event.preventDefault();
    if (destination !== undefined) showSlide(destination);
  });

  window.addEventListener('hashchange', () => {
    if (!/^#slide-\d+$/.test(window.location.hash)) return;
    const destination = indexFromHash();
    if (destination !== current) showSlide(destination, false);
  });

  showSlide(indexFromHash(), false, false);
  controls.hidden = false;
  document.body.classList.add('presenting');
})();
