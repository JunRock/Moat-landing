// 네비게이션 스크롤 감지 (scrolled 클래스 토글)
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

})();
