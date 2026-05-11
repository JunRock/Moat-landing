// 스크롤 진입 시 .reveal / .reveal-stagger 요소에 .in 클래스 부여
(function () {
  const els = document.querySelectorAll('.reveal, .reveal-stagger');
  if (!els.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach((el) => io.observe(el));
})();
