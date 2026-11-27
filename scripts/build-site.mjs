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
const arrow = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.5 8H12.5M9 4.5L12.5 8L9 11.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
// Brand signals: amber means "needs a human", neutral mono for plain facts.
function projectStatus(project) {
  if (project.name === 'Insight') return '<span class="qz-state is-amber project-status"><i aria-hidden="true"></i>域名配置中</span>';
  return `<span class="qz-meta project-status">${project.stars === null ? '源码未公开' : `${project.stars} stars`}</span>`;
}
function projectCard(project) {
  const title = project.url
    ? `<a class="project-title" href="${safeUrl(project.url)}" target="_blank" rel="noopener noreferrer"><span>${escapeHtml(project.name)}</span>${arrow}</a>`
    : `<span>${escapeHtml(project.name)}</span>`;
  return `<article class="qz-cell project-card" data-search="${escapeHtml(`${project.name} ${project.description.replace(/<[^>]+>/g, ' ')} ${project.language}`.toLowerCase())}">
    <div class="project-meta"><span class="qz-meta">${project.language.split(' / ').map(escapeHtml).join(' · ')}</span>${projectStatus(project)}</div>
    <h4>${title}</h4><p class="card-description">${inline(project.description)}</p>
    <div class="project-bottom">${project.sourceUrl ? `<a class="qz-link-arrow" href="${safeUrl(project.sourceUrl)}" target="_blank" rel="noopener noreferrer" aria-label="查看 ${escapeHtml(project.name)} 的源码"><span>查看源码</span>${arrow}</a>` : '<span>源码未公开</span>'}${project.url ? `<span aria-hidden="true">${project.section === 'experience' ? '打开作品' : '查看项目'}</span>` : ''}</div>
  </article>`;
}
const sectionHtml = sections.map((section) => `<section class="project-section" id="${section.id}" aria-labelledby="heading-${section.id}">
  <div class="section-heading"><h3 id="heading-${section.id}">${section.id === 'experience' ? '<span class="qz-led" aria-hidden="true"></span>' : ''}${section.title}<span class="qz-meta section-count">${section.projects.length}</span></h3><p>${section.note}</p></div>
  <div class="qz-rail is-grid ${section.id === 'experience' ? 'is-3' : 'is-2'} project-grid">${section.projects.map(projectCard).join('\n')}</div>
</section>`).join('\n');

const html = template
  .replaceAll('<!-- PROJECT_SECTIONS -->', sectionHtml)
  .replaceAll('<!-- PROJECT_COUNT -->', String(allProjects.length))
  .replaceAll('<!-- CATEGORY_COUNT -->', String(sections.length));

const system = path.join(root, 'Quetzalcoatl design system');
await mkdir(output, { recursive: true });
await writeFile(path.join(output, 'index.html'), html);
for (const file of ['app.js', 'favicon.ico', 'pluto-portrait.jpg', '_headers']) {
  await copyFile(path.join(root, 'site', file), path.join(output, file));
}
await copyFile(path.join(system, 'scripts', 'optics.js'), path.join(output, 'optics.js'));
// Recolour GitHub's green ramp into the brand's monochrome ramp; the busiest days catch the ice light.
const contributionSvg = await readFile(path.join(root, 'contribution-dark.svg'), 'utf8');
const contributionColors = new Map([
  ['#161b22', '#111111'],
  ['#0e4429', '#333333'],
  ['#006d32', '#6B6B6B'],
  ['#26a641', '#D4D4D4'],
  ['#39d353', '#BAE6FD'],
  ['#7d8590', '#8A8A8A'],
]);
const siteContributionSvg = contributionSvg.replace(/#[0-9a-f]{6}/gi, (color) =>
  contributionColors.get(color.toLowerCase()) ?? color,
);
await writeFile(path.join(output, 'contribution-site.svg'), siteContributionSvg);
await mkdir(path.join(output, 'fonts'), { recursive: true });
for (const file of (await readdir(path.join(system, 'fonts'))).filter((file) => /\.(woff2?|txt)$/i.test(file))) {
  await copyFile(path.join(system, 'fonts', file), path.join(output, 'fonts', file));
}
console.log(`Built ${allProjects.length} projects from README.md into dist/`);
