// Marketplace search + category filter
const search = document.getElementById('searchInput');
const select = document.getElementById('categorySelect');
const items = document.querySelectorAll('#productGrid .product');
const empty = document.getElementById('noResults');

function filterProducts() {
  const q = search.value.trim().toLowerCase();
  const cat = select.value;
  let shown = 0;
  items.forEach(el => {
    const match = (cat === 'all' || el.dataset.cat === cat) && el.dataset.name.includes(q);
    el.classList.toggle('d-none', !match);
    if (match) shown++;
  });
  empty.classList.toggle('d-none', shown > 0);
}
search.addEventListener('input', filterProducts);
select.addEventListener('change', filterProducts);

// Highlight active nav link while scrolling
const links = document.querySelectorAll('.pn-nav .nav-link');
const sections = [...links].map(l => document.querySelector(l.getAttribute('href')));
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => s && obs.observe(s));

// Close mobile menu after clicking a link
document.querySelectorAll('.pn-nav .nav-link').forEach(l =>
  l.addEventListener('click', () => {
    const nav = document.getElementById('nav');
    if (nav.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(nav).hide();
  })
);
