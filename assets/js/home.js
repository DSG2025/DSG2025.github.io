(() => {
  // Homepage only. CSS limits visibility changes to mobile; desktop is unchanged.
  const intro = document.querySelector('body.home-v2 #home-intro');
  if (!intro) return;
  if (!('IntersectionObserver' in window)) {
    document.body.classList.remove('home-intro-active');
    return;
  }
  const update = (bottom) => {
    document.body.classList.toggle('home-intro-active', bottom > 0);
  };
  const observer = new IntersectionObserver(([entry]) => {
    // Hide both while entering and while within Hero + Trust. Reveal only below it.
    update(entry.boundingClientRect.bottom);
  }, { threshold: 0 });
  observer.observe(intro);
  // Opt in only after setup succeeds; missing/disabled JS leaves the button visible.
  update(intro.getBoundingClientRect().bottom);
})();
