// 모바일 플로팅 CTA: hero 지나면 노출
// 클릭 시 hero의 #download 영역으로 스크롤 (App Store / Play Store 두 버튼이 함께 있는 곳)
// → 사용자가 직접 자기 OS에 맞는 스토어 선택
(function () {
  const cta = document.getElementById('floatingCta');
  const hero = document.querySelector('.hero');
  if (!cta || !hero) return;

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
