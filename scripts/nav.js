// 네비게이션 스크롤 감지 + "맨 위로" 버튼 핸들러
(function () {
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener(
      'scroll',
      () => {
        nav.classList.toggle('scrolled', window.scrollY > 8);
      },
      { passive: true }
    );
  }

  // CTA pill: 모바일은 플랫폼 스토어로 직접, 데스크톱은 히어로(다운로드 영역)로 스크롤
  const ctaPill = document.getElementById('scrollTopBtn');
  if (ctaPill) {
    const ua = navigator.userAgent || '';
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    const isAndroid = /Android/.test(ua);
    const APP_STORE = 'https://apps.apple.com/kr/app/id6761710550';
    const PLAY_STORE = 'https://play.google.com/store/apps/details?id=com.moat.moat_app';

    if (isIOS) {
      ctaPill.href = APP_STORE;
    } else if (isAndroid) {
      ctaPill.href = PLAY_STORE;
    } else {
      // 데스크톱: 히어로 다운로드 영역으로 스크롤
      ctaPill.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }
})();
