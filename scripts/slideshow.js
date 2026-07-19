// 히어로 폰 슬라이드쇼 + 슬라이드에 매칭된 플로팅 뱃지만 표시
//
// 슬라이드 HTML: <div class="slide active" data-screen="schedule">...
// 뱃지 HTML:    <div class="float ..." data-screens="schedule notification">
// 슬라이드의 data-screen이 뱃지의 data-screens 중 하나와 일치하면 표시,
// 아니면 .dimmed 클래스로 fade-out.
(function () {
  const slides = document.querySelectorAll('#phoneSlideshow .slide');
  if (!slides.length) return;
  const floats = document.querySelectorAll('.hero-stage .float');

  function syncFloats(screen) {
    floats.forEach((f) => {
      const screens = (f.dataset.screens || '').split(' ').filter(Boolean);
      const match = screens.includes(screen);
      f.classList.toggle('dimmed', !match);
    });
  }

  // 초기 동기화: 첫 active 슬라이드와 일치하는 뱃지만 보이게
  syncFloats(slides[0].dataset.screen);

  const INTERVAL_MS = 3400; // 슬라이드 전환 주기
  const EXIT_MS = 900; // CSS transition 시간과 맞춤

  let idx = 0;
  setInterval(() => {
    const cur = slides[idx];
    idx = (idx + 1) % slides.length;
    const next = slides[idx];
    cur.classList.remove('active');
    cur.classList.add('exit');
    next.classList.add('active');
    syncFloats(next.dataset.screen);
    setTimeout(() => cur.classList.remove('exit'), EXIT_MS);
  }, INTERVAL_MS);
})();
