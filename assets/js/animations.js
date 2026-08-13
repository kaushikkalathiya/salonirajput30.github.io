/**
 * animations.js
 * Scroll-reveal using IntersectionObserver.
 * Elements with .reveal, .reveal-left, .reveal-right are animated on scroll.
 * Respects prefers-reduced-motion.
 */
(function () {
  'use strict';

  // Honour reduced-motion preference
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    // Make everything visible immediately
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  const THRESHOLD = 0.12;
  const ROOT_MARGIN = '0px 0px -48px 0px';

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, {
    threshold: THRESHOLD,
    rootMargin: ROOT_MARGIN,
  });

  function observeAll() {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function (el) {
      observer.observe(el);
    });
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeAll);
  } else {
    observeAll();
  }

})();
