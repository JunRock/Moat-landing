// 네비게이션: 스크롤 감지(scrolled) + 모바일 햄버거 메뉴 토글
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;

  // 스크롤 시 하단 보더 표시
  window.addEventListener(
    'scroll',
    () => {
      nav.classList.toggle('scrolled', window.scrollY > 8);
    },
    { passive: true }
  );

  // 모바일 햄버거 메뉴
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  function closeMenu() {
    nav.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // 메뉴 안 링크 클릭 시 닫기
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));

  // 데스크톱으로 리사이즈되면 메뉴 상태 초기화
  window.addEventListener(
    'resize',
    () => {
      if (window.innerWidth > 960) closeMenu();
    },
    { passive: true }
  );

  // ESC로 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeMenu();
  });
})();
