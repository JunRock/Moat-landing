// 모바일 플로팅 CTA: hero 지나면 노출, 플랫폼별 스토어 링크 자동 설정
// 설정값은 scripts/config.js의 window.MoatConfig
(function () {
  const cta = document.getElementById('floatingCta');
  const hero = document.querySelector('.hero');
  if (!cta || !hero) return;

  const config = window.MoatConfig || {};
  const ua = navigator.userAgent || '';
  if (/android/i.test(ua) && config.playStore) {
    cta.href = config.playStore;
  } else if (/iphone|ipad|ipod/i.test(ua) && !window.MSStream && config.appStore) {
    cta.href = config.appStore;
  }
  // 그 외는 기본 #download 유지

  let ticking = false;
  function update() {
    const heroBottom = hero.getBoundingClientRect().bottom;
    cta.classList.toggle('is-visible', heroBottom < 80);
    ticking = false;
  }
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
})();
