// 라이트/다크 테마 토글 — <html data-theme> + localStorage('moat-theme'), 기본 dark
// 초기 적용은 각 페이지 <head>의 인라인 스크립트가 페인트 전에 처리 (FOUC 방지)
(function () {
  const KEY = 'moat-theme';
  const root = document.documentElement;
  const meta = document.querySelector('meta[name="theme-color"]');

  function apply(theme) {
    root.dataset.theme = theme;
    try { localStorage.setItem(KEY, theme); } catch (e) {}
    if (meta) meta.content = theme === 'light' ? '#FFFFFF' : '#0B0D12';
  }

  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      apply(root.dataset.theme === 'light' ? 'dark' : 'light');
    });
  });

  // 저장된 테마가 light면 브라우저 크롬 색도 맞춰줌
  if (meta && root.dataset.theme === 'light') meta.content = '#FFFFFF';
})();
