// 스크롤 진입 시 .reveal / .reveal-stagger 요소에 .in 클래스 부여
// story-row는 슬라이드인 끝난 뒤 .settled로 전환해 hover 트랜지션이 동작하게 함
(function () {
  const els = document.querySelectorAll('.reveal, .reveal-stagger');
  if (!els.length) return;

  function settleStoryRow(el) {
    let settled = false;
    const mark = () => {
      if (settled) return;
      settled = true;
      el.classList.add('settled');
      el.removeEventListener('animationend', mark);
    };
    el.addEventListener('animationend', mark);
    // fallback: 애니메이션 안 도는 환경(reduced-motion 등)에서도 hover 가능하게
    setTimeout(mark, 1100);
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
          if (e.target.classList.contains('story-row')) {
            settleStoryRow(e.target);
          }
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach((el) => io.observe(el));
})();
