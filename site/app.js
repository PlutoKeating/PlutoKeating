const search = document.querySelector('#project-search');
const cards = [...document.querySelectorAll('.project-card')];
const sections = [...document.querySelectorAll('.project-section')];
const count = document.querySelector('#result-count');
const empty = document.querySelector('#empty-state');

search?.addEventListener('input', () => {
  const query = search.value.trim().toLocaleLowerCase();
  let visible = 0;
  for (const card of cards) {
    const match = card.dataset.search.includes(query);
    card.hidden = !match;
    if (match) visible++;
  }
  for (const section of sections) {
    section.hidden = !section.querySelector('.project-card:not([hidden])');
  }
  count.textContent = `${visible} 个项目`;
  empty.hidden = visible !== 0;
});

document.querySelector('#year').textContent = new Date().getFullYear();

// 贡献墙在窄屏上需要横向滚动时，默认显示最右侧（最近的几个月）
const activityChart = document.querySelector('.activity-chart');
const chartImage = activityChart?.querySelector('img');
const scrollChartToLatest = () => {
  if (activityChart) activityChart.scrollLeft = activityChart.scrollWidth;
};
if (chartImage?.complete) scrollChartToLatest();
else chartImage?.addEventListener('load', scrollChartToLatest, { once: true });
window.addEventListener('resize', scrollChartToLatest);

// Keep category links as native anchors, with the active section indicated visually.
const categoryLinks = [...document.querySelectorAll('.category-link')];
const siteHeader = document.querySelector('.site-header');
const catalogToolbar = document.querySelector('.catalog-toolbar');
let activeFrame;
function updateActiveCategory() {
  activeFrame = null;
  const boundary = siteHeader.getBoundingClientRect().height + catalogToolbar.getBoundingClientRect().height + 24;
  const visibleSections = sections.filter(section => !section.hidden);
  let active = visibleSections[0];
  for (const section of visibleSections) {
    if (section.getBoundingClientRect().top <= boundary) active = section;
  }
  for (const link of categoryLinks) {
    if (active && link.hash === `#${active.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}
function measureCatalogChrome() {
  document.documentElement.style.setProperty('--site-header-height', `${siteHeader.getBoundingClientRect().height}px`);
  document.documentElement.style.setProperty('--catalog-toolbar-height', `${catalogToolbar.getBoundingClientRect().height}px`);
  updateActiveCategory();
}
const chromeObserver = new ResizeObserver(measureCatalogChrome);
chromeObserver.observe(siteHeader);
chromeObserver.observe(catalogToolbar);
measureCatalogChrome();
window.addEventListener('scroll', () => {
  if (!activeFrame) activeFrame = requestAnimationFrame(updateActiveCategory);
}, { passive: true });
search?.addEventListener('input', updateActiveCategory);
categoryLinks.forEach(link => link.addEventListener('click', event => {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const target = document.querySelector(link.hash);
  if (!target || target.hidden) return;
  event.preventDefault();
  measureCatalogChrome();
  const offset = siteHeader.getBoundingClientRect().height + catalogToolbar.getBoundingClientRect().height + 20;
  history.pushState(null, '', link.hash);
  window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top - offset,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
}));

document.querySelector('#clear-search')?.addEventListener('click', () => {
  search.value = '';
  search.dispatchEvent(new Event('input'));
  search.focus();
});
// Remote statistics retain useful alternative text if a third-party image is unavailable.
document.querySelectorAll('.remote-stat').forEach((img) => {
  const fallback = () => {
    const link = document.createElement('a');
    link.href = 'https://github.com/PlutoKeating';
    link.textContent = `${img.alt}：前往 GitHub 查看`;
    link.className = 'text-link';
    img.replaceWith(link);
  };
  if (img.complete && !img.naturalWidth) fallback();
  else img.addEventListener('error', fallback, { once: true });
});
