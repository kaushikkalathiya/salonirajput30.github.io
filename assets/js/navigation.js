/**
 * navigation.js
 * Handles: sticky header scroll state, mobile menu toggle, active nav links
 */
(function () {
  'use strict';

  const header   = document.querySelector('.site-header');
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  /* ── Scroll: add .scrolled class to header ──────────────────────────── */
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ── Mobile menu toggle ─────────────────────────────────────────────── */
  function openMenu() {
    hamburger.classList.add('open');
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.setAttribute('aria-hidden', 'false');
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
  }

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });

    // Close when a link is clicked
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ── Active nav link highlighting ──────────────────────────────────── */
  function setActiveLink() {
    const currentPath = window.location.pathname
      .replace(/\/$/, '')           // remove trailing slash
      .replace(/\/index\.html$/, ''); // treat /index.html as /

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function (link) {
      let linkPath = link.getAttribute('href') || '';
      // Normalise relative paths
      linkPath = linkPath.replace(/\/$/, '').replace(/\/index\.html$/, '');
      // Handle root
      const isRoot = (linkPath === '' || linkPath === '.') && (currentPath === '' || currentPath.endsWith('/'));
      const isMatch = linkPath !== '' && currentPath.endsWith(linkPath);
      link.classList.toggle('active', isRoot || isMatch);
    });
  }

  setActiveLink();

})();
