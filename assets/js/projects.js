/**
 * projects.js
 * Filter functionality for projects.html
 * Cards are filtered by their data-category attribute.
 */
(function () {
  'use strict';

  function initProjectFilter() {
    const filterBar   = document.querySelector('.filter-bar');
    const projectCards = document.querySelectorAll('.project-card[data-category]');

    if (!filterBar || !projectCards.length) return;

    filterBar.addEventListener('click', function (e) {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      // Update active button
      filterBar.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(function (card) {
        if (filter === 'all') {
          card.removeAttribute('data-hidden');
          card.style.display = '';
        } else {
          const categories = (card.dataset.category || '').split(',').map(function (s) { return s.trim(); });
          if (categories.includes(filter)) {
            card.removeAttribute('data-hidden');
            card.style.display = '';
          } else {
            card.dataset.hidden = 'true';
            card.style.display = 'none';
          }
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectFilter);
  } else {
    initProjectFilter();
  }

})();
