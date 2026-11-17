import { readFile, writeFile, mkdir, copyFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readme = await readFile(path.join(root, 'README.md'), 'utf8');
const template = await readFile(path.join(root, 'site', 'index.html'), 'utf8');
const output = path.join(root, 'dist');

const sections = [
  { id: 'experience', marker: '## 🚀', label: 'LIVE PROJECTS', title: '即刻体验', index: '01', note: '打开产品，直接体验' },
  { id: 'tools', marker: '## 🛠', label: 'PRODUCTIVITY & TOOLS', title: '效率和工具', index: '02', note: '实用工具与开源方案' },
  { id: 'learning', marker: '## 📚', label: 'LEARNING', title: '学习类', index: '03', note: '交互式课程与学习资料' },
  { id: 'hardware', marker: '## 🔧', label: 'HARDWARE & SOURCE', title: '技术开源与源码分享', index: '04', note: '设备改造与系统移植' },
  { id: 'embedded', marker: '## 💡', label: 'EMBEDDED DEVELOPMENT', title: '嵌入式开发', index: '05', note: '硬件交互实践' },
  { id: 'contributions', marker: '## 🤝', label: 'COLLABORATIVE PROJECTS', title: '共创项目', index: '06', note: '注明上游与自己的参与' },
];

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);

function safeUrl(value) {
  const url = new URL(value);
  if (!['https:', 'mailto:'].includes(url.protocol)) throw new Error(`Unsupported URL: ${value}`);
  return escapeHtml(url.href);
}

function inline(value) {
  return escapeHtml(value)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, (_match, label, url) =>
      `<a class="inline-link" href="${safeUrl(url)}" target="_blank" rel="noopener noreferrer">${label}</a>`)
    .replace(/&lt;br\s*\/?&gt;/gi, '<br>');
}

function parseRows(block, section) {
  return block.split('\n').filter((line) => line.startsWith('| ') && !line.startsWith('| 项目') && !line.startsWith('| :')).map((line) => {
    const cells = line.split('|').slice(1, -1).map((cell) => cell.trim());
    const match = cells[0].match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
    const starMatch = cells[2].match(/⭐\s*\*\*(\d+)\*\*/);
    if (!cells[0] || (!starMatch && cells[2] !== '—')) throw new Error(`Cannot parse project row: ${line}`);
    const source = cells[1].match(/ · \[源码\]\((https?:\/\/[^)]+)\)/);
    return {
      name: match?.[1] ?? cells[0], url: match?.[2] ?? null, sourceUrl: source?.[1] ?? null,
      description: cells[1].replace(/ · \[源码\]\(https?:\/\/[^)]+\)/, ''),
      stars: starMatch ? Number(starMatch[1]) : null, language: section.id === 'contributions' ? 'Open Source' : cells[3],
      section: section.id,
    };
  });
}

for (const [index, section] of sections.entries()) {
  const start = readme.indexOf(section.marker);
  const end = index + 1 < sections.length ? readme.indexOf(sections[index + 1].marker) : readme.indexOf('## 📊');
  if (start < 0 || end < 0) throw new Error(`Missing README section: ${section.title}`);
  section.projects = parseRows(readme.slice(start, end), section);
  if (!section.projects.length) throw new Error(`No projects found in ${section.title}`);
}

const allProjects = sections.flatMap((section) => section.projects);
const featured = new Set(['GoGoGo · 走不走', 'BeenHere · 来过']);

const arrow = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg>';
// Each symbol describes the project's purpose; all use one consistent stroke system.
const symbols = {
  voice: '<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8"/>',
  route: '<circle cx="5" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><path d="M7 5h8a4 4 0 0 1 0 8H9a3 3 0 0 0 0 6h8"/>',
  archive: '<rect x="3" y="5" width="18" height="4" rx="1"/><path d="M5 9v12h14V9M9 13h6M8 2h8"/>',
  game: '<path d="M8 8h8c3 0 5 4 5 8s-3 4-5 0H8c-2 4-5 4-5 0s2-8 5-8ZM6 12h4M8 10v4M15 12h.01M18 14h.01"/>',
  code: '<path d="m8 6-6 6 6 6M16 6l6 6-6 6M14 3l-4 18"/>',
  book: '<path d="M12 5v16M12 5C8 2 4 3 2 4v15c4-2 7-1 10 2 3-3 6-4 10-2V4c-2-1-6-2-10 1Z"/>',
  chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
  branch: '<circle cx="6" cy="4" r="2"/><circle cx="6" cy="20" r="2"/><circle cx="18" cy="6" r="2"/><path d="M6 6v12M18 8v2a6 6 0 0 1-6 6H6"/>',
};
function projectSymbol(project) {
  const kind = project.name.includes('SayIt') ? 'voice' : project.name.includes('GoGoGo') ? 'route' : project.name.includes('BeenHere') ? 'archive' : project.section === 'experience' ? 'game' : ({ tools: 'code', learning: 'book', hardware: 'chip', embedded: 'chip', contributions: 'branch' }[project.section] ?? 'code');
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${symbols[kind]}</svg>`;
}
function projectCard(project, number) {
  const status = project.name === 'Insight' ? '域名配置中' : null;
  const title = project.url
    ? `<a class="project-title" href="${safeUrl(project.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(project.name)}${arrow}</a>`
    : `<span>${escapeHtml(project.name)}</span>`;
  return `<article class="project-card${featured.has(project.name) ? ' project-card--featured' : ''}" data-search="${escapeHtml(`${project.name} ${project.description.replace(/<[^>]+>/g, ' ')} ${project.language}`.toLowerCase())}">
    <div class="project-visual"><span class="project-symbol">${projectSymbol(project)}</span><span class="project-type">${escapeHtml(sections.find(section => section.id === project.section).title)}</span><span class="project-status">${status ?? (project.stars === null ? '源码未公开' : `${project.stars} stars`)}</span></div>
    <div class="project-meta">${project.language.split(' / ').map(language => `<span class="language-tag">${escapeHtml(language)}</span>`).join('')}</div>
    <h4>${title}</h4><p class="card-description">${inline(project.description)}</p>
    <div class="project-bottom">${project.sourceUrl ? `<a href="${safeUrl(project.sourceUrl)}" target="_blank" rel="noopener noreferrer" aria-label="查看 ${escapeHtml(project.name)} 的源码">查看源码 ${arrow}</a>` : '<span>源码未公开</span>'}${project.url ? `<span aria-hidden="true">${project.section === 'experience' ? '打开作品' : '查看项目'}</span>` : ''}</div>
  </article>`;
}
const sectionHtml = sections.map((section) => `<section class="project-section" id="${section.id}" aria-labelledby="heading-${section.id}">
  <div class="section-heading"><h3 id="heading-${section.id}">${section.title}<span class="section-count">${section.projects.length}</span></h3><p>${section.note}</p></div>
  <div class="project-grid">${section.projects.map((project, index) => projectCard(project, index + 1)).join('\n')}</div>
</section>`).join('\n');

const html = template
  .replaceAll('<!-- PROJECT_SECTIONS -->', sectionHtml)
  .replaceAll('<!-- PROJECT_COUNT -->', String(allProjects.length))
  .replaceAll('<!-- CATEGORY_COUNT -->', String(sections.length));

await mkdir(output, { recursive: true });
await writeFile(path.join(output, 'index.html'), html);
for (const file of ['app.js', 'favicon.ico', 'pluto-portrait.jpg', '_headers']) {
  await copyFile(path.join(root, 'site', file), path.join(output, file));
}
const contributionSvg = await readFile(path.join(root, 'contribution-dark.svg'), 'utf8');
const contributionColors = new Map([
  ['#161b22', '#2D2D2B'],
  ['#0e4429', '#A86400'],
  ['#006d32', '#E89400'],
  ['#26a641', '#FFB000'],
  ['#39d353', '#FFD466'],
  ['#7d8590', '#CFC8B6'],
]);
const siteContributionSvg = contributionSvg.replace(/#[0-9a-f]{6}/gi, (color) =>
  contributionColors.get(color.toLowerCase()) ?? color,
);
await writeFile(path.join(output, 'contribution-site.svg'), siteContributionSvg);
await mkdir(path.join(output, 'fonts'), { recursive: true });
for (const file of (await readdir(path.join(root, 'site', 'fonts'))).filter((file) => /\.(woff2?|txt)$/i.test(file))) {
  await copyFile(path.join(root, 'site', 'fonts', file), path.join(output, 'fonts', file));
}
console.log(`Built ${allProjects.length} projects from README.md into dist/`);
