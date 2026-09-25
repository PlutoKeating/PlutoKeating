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
  count.textContent = `${visible} PROJECT${visible === 1 ? '' : 'S'}`;
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
