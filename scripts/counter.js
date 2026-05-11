// [data-count] 요소가 화면에 들어오면 0 → 목표값까지 카운트 애니메이션
(function () {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;

  function animateCount(el, to, suffix = '', duration = 1100) {
    const start = performance.now();
    function frame(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const v = Math.round(to * eased);
      el.textContent = v + suffix;
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target;
          animateCount(el, parseInt(el.dataset.count, 10), el.dataset.suffix || '');
          io.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  els.forEach((el) => io.observe(el));
})();
