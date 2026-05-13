// 모바일 스토리 가로 캐러셀: dot indicator + 클릭 이동
// 데스크톱(.stories-track이 display: contents)에선 IO 없으니 사실상 no-op
(function () {
  const track = document.getElementById('storiesTrack');
  const dotsBox = document.getElementById('storiesDots');
  if (!track || !dotsBox) return;

  const stories = Array.from(track.querySelectorAll('.story'));
  if (!stories.length) return;

  // dot 동적 생성
  dotsBox.innerHTML = '';
  stories.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'stories-dot' + (idx === 0 ? ' is-active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `${idx + 1}번째 기능`);
    dot.dataset.idx = String(idx);
    dotsBox.appendChild(dot);
  });
  const dots = Array.from(dotsBox.querySelectorAll('.stories-dot'));

  // 캐러셀 활성 여부 (CSS @media 영향) — track이 가로 스크롤 가능할 때만 동작
  function isCarouselActive() {
    return track.scrollWidth > track.clientWidth + 4;
  }

  // 점 클릭 → 해당 카드로 스크롤
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = Number(dot.dataset.idx);
      const story = stories[idx];
      if (!story) return;
      if (isCarouselActive()) {
        story.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      } else {
        story.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // 스크롤 위치 → 활성 점 갱신
  let ticking = false;
  function updateActiveDot() {
    if (!isCarouselActive()) { ticking = false; return; }
    const trackRect = track.getBoundingClientRect();
    const centerX = trackRect.left + trackRect.width / 2;
    let closestIdx = 0;
    let minDist = Infinity;
    stories.forEach((story, idx) => {
      const r = story.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const d = Math.abs(cx - centerX);
      if (d < minDist) {
        minDist = d;
        closestIdx = idx;
      }
    });
    dots.forEach((dot, idx) => {
      dot.classList.toggle('is-active', idx === closestIdx);
    });
    stories.forEach((story, idx) => {
      story.classList.toggle('is-active-card', idx === closestIdx);
    });
    ticking = false;
  }

  track.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateActiveDot);
    },
    { passive: true }
  );
  window.addEventListener('resize', () => requestAnimationFrame(updateActiveDot), { passive: true });
  updateActiveDot();
})();
