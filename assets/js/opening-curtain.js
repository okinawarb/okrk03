(() => {
  const curtain = document.querySelector('.opening-curtain');
  const content = document.querySelector('.release-content');
  const root = document.documentElement;
  if (!curtain || !content || !root.classList.contains('curtain-pending')) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let finished = false;
  let startTimer;
  let finishTimer;
  const finish = () => {
    if (finished) return;
    finished = true;
    const restoreFocus = curtain.contains(document.activeElement);
    clearTimeout(startTimer);
    clearTimeout(finishTimer);
    clearTimeout(window.curtainFallback);
    content.inert = false;
    root.classList.remove('curtain-pending');
    curtain.hidden = true;
    if (restoreFocus) content.querySelector('.site-logo').focus({ preventScroll: true });
  };
  content.inert = true;
  clearTimeout(window.curtainFallback);
  finishTimer = setTimeout(finish, 6500);
  const open = () => {
    if (finished) return;
    curtain.classList.add('is-opening');
    clearTimeout(finishTimer);
    finishTimer = setTimeout(finish, 1900);
  };
  const ready = Promise.all([
    curtain.querySelector('.teaser__visual img'),
    document.querySelector('.hero__image')
  ].filter(Boolean).map(image => image.decode().catch(() => {})));
  Promise.race([ready, new Promise(resolve => setTimeout(resolve, 2500))]).then(() => {
    if (!finished) startTimer = setTimeout(open, 1200);
  });
  curtain.addEventListener('transitionend', event => {
    if (event.target === curtain && event.propertyName === 'transform') finish();
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') finish(); });
  motion.addEventListener('change', event => { if (event.matches) finish(); });
  window.addEventListener('pagehide', finish);
})();
