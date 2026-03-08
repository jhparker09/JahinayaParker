// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobile-nav');

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  mobileNav.style.display = expanded ? 'none' : 'block';
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.style.display = 'none';
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Normalize text so hyphens, en-dashes, and apostrophes are treated as spaces
function normalize(str) {
  return str.toLowerCase().replace(/[-–']/g, ' ').replace(/\s+/g, ' ').trim();
}

// Publication search + filter
const pubSearch = document.getElementById('pub-search');
const pubList = document.getElementById('pub-list');
const pubCount = document.getElementById('pub-count');
const pubItems = Array.from(pubList.querySelectorAll('.pub-item'));
const filterBtns = Array.from(document.querySelectorAll('.filter-btn'));

let activeFilter = 'all';

function applyFilters() {
  const query = normalize(pubSearch.value);
  let visible = 0;

  pubItems.forEach(item => {
    const title   = normalize(item.dataset.title   || '');
    const authors = normalize(item.dataset.authors || '');
    const year    = normalize(item.dataset.year    || '');
    const type    = (item.dataset.type || '').toLowerCase();

    const matchesSearch = !query || title.includes(query) || authors.includes(query) || year.includes(query);
    const matchesFilter = activeFilter === 'all' || type === activeFilter;

    const show = matchesSearch && matchesFilter;
    item.style.display = show ? '' : 'none';
    if (show) visible++;
  });

  pubCount.textContent = visible;
}

pubSearch.addEventListener('input', applyFilters);

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    applyFilters();
  });
});

// Back-to-top button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
