// Shared page polish: sticky header that turns solid on scroll, the mobile menu,
// and a quiet fade in for photos and headings. No libraries.
// Respects prefers-reduced-motion. If JavaScript is off, everything still shows and works.
(function () {
  var doc = document.documentElement;
  var header = document.querySelector('.site-header, header.top, .masthead');

  // Header: solid with a shadow once the page scrolls.
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav && header) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      header.classList.toggle('nav-open', open);
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth >= 900) setOpen(false); });
  }

  // Quiet fade in on scroll, only when motion is welcome.
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;
  var items = document.querySelectorAll('.hero-media, .split-media, .vsplit-media, .meet, main section h2, .price-cards, .plans, .places');
  if (!items.length) return;
  doc.classList.add('has-reveal');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  for (var i = 0; i < items.length; i++) { items[i].classList.add('reveal'); io.observe(items[i]); }
})();
