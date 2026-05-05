(function () {
  var revealSelectors = ['.showcase-title', '.compare-table', '.final-cta', '.feat-block'];
  var staggerSelectors = ['.problem-grid', '.phone-row', '.dive-grid', '.faq-list'];

  revealSelectors.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) { el.classList.add('reveal'); });
  });
  staggerSelectors.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) { el.classList.add('stagger'); });
  });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal, .stagger').forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal, .stagger').forEach(function (el) {
      el.classList.add('in');
    });
  }
})();
