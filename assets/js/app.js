(function () {
  'use strict';

  /* ── Theme toggle ────────────────────────────────────────────────────── */
  var THEME_KEY = 'saloni-theme';
  var root = document.documentElement;
  var themeBtns = document.querySelectorAll('[data-theme-toggle]');

  function getEffectiveTheme() {
    var saved = root.getAttribute('data-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function updateThemeButtons(theme) {
    themeBtns.forEach(function (btn) {
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  themeBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var next = getEffectiveTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
      updateThemeButtons(next);
    });
  });
  updateThemeButtons(getEffectiveTheme());

  /* ── Sticky header & mobile navigation ──────────────────────────────── */
  var header = document.querySelector('.site-header');
  var hamburger = document.querySelector('.nav-hamburger');
  var mobileNav = document.getElementById('mobile-nav');

  function onScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 16);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function setMenuOpen(open) {
    if (!hamburger || !mobileNav) return;
    hamburger.classList.toggle('open', open);
    mobileNav.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    mobileNav.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      setMenuOpen(!hamburger.classList.contains('open'));
    });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setMenuOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenuOpen(false);
    });
  }

  /* ── Project category filter ────────────────────────────────────────── */
  var filterBar = document.querySelector('.filter-bar');
  var projectCards = document.querySelectorAll('.project-card[data-category]');

  if (filterBar && projectCards.length) {
    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;

      filterBar.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      var filter = btn.dataset.filter;
      projectCards.forEach(function (card) {
        if (filter === 'all') {
          card.removeAttribute('data-hidden');
        } else {
          var cats = (card.dataset.category || '').split(',').map(function (s) { return s.trim(); });
          if (cats.indexOf(filter) !== -1) {
            card.removeAttribute('data-hidden');
          } else {
            card.setAttribute('data-hidden', 'true');
          }
        }
      });
    });
  }

  /* ── Mailto contact form ────────────────────────────────────────────── */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (document.getElementById('contact-name').value || '').trim();
      var email = (document.getElementById('contact-email').value || '').trim();
      var subject = (document.getElementById('contact-subject').value || '').trim();
      var message = (document.getElementById('contact-message').value || '').trim();
      var status = document.getElementById('form-status');

      if (!name || !email || !subject || !message) {
        if (status) {
          status.textContent = 'Please complete all required fields before sending.';
          status.style.color = 'var(--accent)';
        }
        return;
      }

      var body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + message;
      var mailtoUrl = 'mailto:Rsaloni223@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      if (status) {
        status.textContent = 'Opening your email client to send the message to Rsaloni223@gmail.com.';
        status.style.color = 'var(--text-secondary)';
      }
      window.location.href = mailtoUrl;
    });
  }

  /* ── Dynamic footer year ────────────────────────────────────────────── */
  var year = String(new Date().getFullYear());
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = year;
  });
})();
