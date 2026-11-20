const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  nav.classList.toggle('is-open', !isOpen);
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('is-open');
  });
});

const projectFilters = document.querySelectorAll('.project-filter');
const projectCards = document.querySelectorAll('.experience-projects article');
const projectCount = document.querySelector('.project-count');

projectFilters.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedFilter = button.dataset.filter;
    let visibleCount = 0;

    projectFilters.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle('is-active', isSelected);
      filterButton.setAttribute('aria-pressed', String(isSelected));
    });

    projectCards.forEach((card) => {
      const isVisible = selectedFilter === 'all' || card.dataset.category === selectedFilter;
      card.hidden = !isVisible;
      if (!isVisible) card.querySelector('details')?.removeAttribute('open');
      if (isVisible) visibleCount += 1;
    });

    if (projectCount) {
      projectCount.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? 'project' : 'projects'}`;
    }
  });
});
