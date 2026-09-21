(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const items = [...document.querySelectorAll('.section-heading, .project, .small-project, .app-card, .expertise-grid article, .toolbox, .timeline-row, .earlier')];
  let observer;
  function revealAll() {
    observer?.disconnect();
    document.documentElement.classList.remove('motion-ready');
    items.forEach(item => item.classList.remove('reveal-pending'));
  }
  if (!motion.matches && 'IntersectionObserver' in window) {
    try {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('reveal-pending');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.07, rootMargin: '0px 0px 24px 0px' });
      document.documentElement.classList.add('motion-ready');
      items.forEach((item, index) => {
        item.classList.add('reveal-item');
        const box = item.getBoundingClientRect();
        if (box.top >= window.innerHeight || box.bottom < 0) {
          item.classList.add('reveal-pending');
          item.style.setProperty('--reveal-delay', `${index % 2 * 70}ms`);
          observer.observe(item);
        }
      });
    } catch { revealAll(); }
  }
  motion.addEventListener('change', event => { if (event.matches) revealAll(); });
  document.addEventListener('focusin', event => {
    event.target.closest('.reveal-pending')?.classList.remove('reveal-pending');
  });
  window.addEventListener('beforeprint', revealAll);
  const progress = document.querySelector('.scroll-progress');
  let queued = false;
  function updateProgress() {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0})`;
    queued = false;
  }
  function scheduleProgress() {
    if (!queued) { queued = true; window.requestAnimationFrame(updateProgress); }
  }
  window.addEventListener('scroll', scheduleProgress, { passive: true });
  window.addEventListener('resize', scheduleProgress);
  window.addEventListener('load', scheduleProgress);
  updateProgress();
})();
