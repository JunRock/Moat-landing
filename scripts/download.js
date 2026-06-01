// 다운로드 모달: "앱 받기" 클릭 시 App Store / Google Play 선택 팝업
// 트리거: [data-download-trigger] (nav CTA, 플로팅 CTA, CTA pill 등)
// 스토어 링크는 scripts/config.js의 window.MoatConfig에서 주입
(function () {
  const overlay = document.getElementById('downloadModal');
  if (!overlay) return;

  const cfg = window.MoatConfig || {};
  const appStore = overlay.querySelector('#dlAppStore');
  const playStore = overlay.querySelector('#dlPlayStore');
  if (appStore && cfg.appStore) appStore.href = cfg.appStore;
  if (playStore && cfg.playStore) playStore.href = cfg.playStore;

  const closeBtn = overlay.querySelector('.contact-close');
  let lastTrigger = null;

  function open(triggerEl) {
    lastTrigger = triggerEl || null;
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastTrigger && typeof lastTrigger.focus === 'function') lastTrigger.focus();
  }

  document.querySelectorAll('[data-download-trigger]').forEach((t) =>
    t.addEventListener('click', (e) => {
      e.preventDefault();
      open(t);
    })
  );

  closeBtn && closeBtn.addEventListener('click', close);
  // 배경(오버레이) 클릭 시 닫기
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
  });

  // 접속 기기 OS 감지 → 해당 스토어 버튼 강조
  const ua = navigator.userAgent || '';
  if (/android/i.test(ua)) {
    playStore && playStore.classList.add('dl-btn--primary');
  } else if (/iphone|ipad|ipod/i.test(ua)) {
    appStore && appStore.classList.add('dl-btn--primary');
  }
})();
