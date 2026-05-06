(function () {
  var io;
  var hasIO = 'IntersectionObserver' in window;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // === Reveal & stagger on scroll ===
  var revealSelectors = ['.showcase-title', '.compare-table', '.final-cta'];
  var staggerSelectors = ['.problem-grid', '.phone-row', '.faq-list'];
  var directInSelectors = ['.feat-block', '.dive-card'];

  revealSelectors.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) { el.classList.add('reveal'); });
  });
  staggerSelectors.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) { el.classList.add('stagger'); });
  });

  if (hasIO) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal, .stagger').forEach(function (el) { io.observe(el); });
    directInSelectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) { io.observe(el); });
    });
  } else {
    document.querySelectorAll('.reveal, .stagger').forEach(function (el) { el.classList.add('in'); });
    directInSelectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) { el.classList.add('in'); });
    });
  }

  // === Hero phone scroll parallax ===
  var heroPhone = document.querySelector('.hero .phone-wrap');
  var heroSection = document.querySelector('.hero');
  if (heroPhone && heroSection && !reduceMotion) {
    var ticking = false;
    var updateParallax = function () {
      var scrollY = window.scrollY;
      if (scrollY < heroSection.offsetHeight * 1.5) {
        heroPhone.style.transform = 'translateY(' + (scrollY * 0.08) + 'px)';
      }
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  // === Hero cards mouse parallax ===
  var heroCards = document.querySelectorAll('.hero-card');
  if (heroCards.length && heroSection && !reduceMotion) {
    var mouseX = 0, mouseY = 0;
    var rafPending = false;

    var applyParallax = function () {
      heroCards.forEach(function (card, idx) {
        var intensity = (idx % 2 === 0 ? 1 : -1) * 14;
        var depthY = ((idx < 2) ? -1 : 1) * 10;
        card.style.translate = (mouseX * intensity) + 'px ' + (mouseY * depthY) + 'px';
      });
      rafPending = false;
    };

    heroSection.addEventListener('mousemove', function (e) {
      var rect = heroSection.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      if (!rafPending) {
        window.requestAnimationFrame(applyParallax);
        rafPending = true;
      }
    });

    heroSection.addEventListener('mouseleave', function () {
      mouseX = 0;
      mouseY = 0;
      heroCards.forEach(function (card) {
        card.style.translate = '0 0';
      });
    });
  }

  // === Number counter (for [data-counter] elements) ===
  var animateValue = function (el, target, duration, suffix) {
    var startTime = null;
    var step = function (timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(target * eased);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(step);
  };

  var counters = document.querySelectorAll('[data-counter]');
  if (hasIO && counters.length) {
    var counterObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-counter'), 10);
          var suffix = el.getAttribute('data-suffix') || '';
          var duration = parseInt(el.getAttribute('data-duration'), 10) || 1200;
          animateValue(el, target, duration, suffix);
          counterObs.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { counterObs.observe(el); });
  }
})();
