/**
 * main.js
 * Handles: animated number counters, dynamic footer year, general init
 */
(function () {
  'use strict';

  /* ── Animated counters ──────────────────────────────────────────────── */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function animateCounter(el) {
    const target   = parseFloat(el.dataset.target);
    const suffix   = el.dataset.suffix || '';
    const prefix   = el.dataset.prefix || '';
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0;
    const duration = 1800; // ms
    const start    = performance.now();

    if (prefersReduced) {
      el.textContent = prefix + target.toFixed(decimals) + suffix;
      return;
    }

    function tick(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutQuart(progress);
      const current  = eased * target;

      el.textContent = prefix + current.toFixed(decimals) + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = prefix + target.toFixed(decimals) + suffix;
      }
    }

    requestAnimationFrame(tick);
  }

  function initCounters() {
    const counterEls = document.querySelectorAll('[data-counter]');
    if (!counterEls.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counterEls.forEach(function (el) { observer.observe(el); });
  }

  /* ── Dynamic year in footer ─────────────────────────────────────────── */
  function setYear() {
    const yearEls = document.querySelectorAll('[data-year]');
    const year = new Date().getFullYear();
    yearEls.forEach(function (el) { el.textContent = year; });
  }

  /* ── Code line animation delays ─────────────────────────────────────── */
  function initCodeLines() {
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach(function (line, i) {
      line.style.animationDelay = (0.06 + i * 0.07) + 's';
    });
  }

  /* ── Init ───────────────────────────────────────────────────────────── */
  function init() {
    initCounters();
    setYear();
    initCodeLines();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
