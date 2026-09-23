import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readme = await readFile(path.join(root, 'README.md'), 'utf8');
const template = await readFile(path.join(root, 'site', 'index.html'), 'utf8');
const output = path.join(root, 'dist');

const sections = [
  { id: 'experience', marker: '## 🚀', label: 'LIVE PROJECTS', title: '即刻体验', index: '01', note: '先看得见，再深入了解' },
  { id: 'upcoming', marker: '## 🧪', label: 'COMING SOON', title: '正在开放', index: '02', note: '公开入口筹备中' },
  { id: 'engineering', marker: '## 🛠', label: 'ENGINEERING & SOURCE', title: '源码与工程实践', index: '03', note: '代码、硬件与移植经验' },
  { id: 'contributions', marker: '## 🤝', label: 'OPEN SOURCE', title: '参与贡献', index: '04', note: '注明上游与自己的参与' },
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
      `<a href="${safeUrl(url)}" target="_blank" rel="noopener noreferrer">${label}<span aria-hidden="true"> ↗</span></a>`)
    .replace(/&lt;br\s*\/?&gt;/gi, '<br>');
}

function parseRows(block, section) {
  return block.split('\n').filter((line) => line.startsWith('| ') && !line.startsWith('| 项目') && !line.startsWith('| :')).map((line) => {
    const cells = line.split('|').slice(1, -1).map((cell) => cell.trim());
    const match = cells[0].match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
    const starMatch = cells[2].match(/⭐\s*\*\*(\d+)\*\*/);
    if (!cells[0] || (!starMatch && cells[2] !== '—')) throw new Error(`Cannot parse project row: ${line}`);
    return {
      name: match?.[1] ?? cells[0], url: match?.[2] ?? null, description: cells[1],
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
const featured = new Set(['dsh-lark-bot', '走不走 · GoGoGo', 'Project.BeenHere · 来过']);

function projectCard(project, number) {
  const website = project.description.match(/· \[网站\]\((https?:\/\/[^)]+)\)/);
  const description = project.description.replace(/ · \[网站\]\(https?:\/\/[^)]+\)/, '');
  const projectName = project.url
    ? `<a class="transition-colors hover:text-orange" href="${safeUrl(project.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(project.name)}<span class="text-sm text-orange" aria-hidden="true"> ↗</span></a>`
    : `<span>${escapeHtml(project.name)}</span>`;
  const popularity = project.stars === null
    ? (project.url ? 'PRIVATE SOURCE' : 'PREVIEW')
    : `✦ ${project.stars}`;
  return `<article class="project-card @container group relative flex min-h-60 flex-col overflow-hidden border border-white/15 bg-[#292929] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-orange/70 hover:shadow-[0_18px_55px_rgba(255,64,0,.12)] sm:p-6${featured.has(project.name) ? ' project-card--featured' : ''}" data-search="${escapeHtml(`${project.name} ${description.replace(/<[^>]+>/g, ' ')} ${project.language}`.toLowerCase())}">
    <div class="flex items-center justify-between gap-3 font-mono text-[10px] tracking-widest"><span class="text-white/45">${String(number).padStart(2, '0')} / ${escapeHtml(project.section.toUpperCase())}</span><span class="text-orange">${popularity}</span></div>
    <h3 class="mt-6 font-display text-[clamp(1.1rem,6cqw,1.5rem)] leading-snug font-semibold tracking-tight break-words">${projectName}</h3>
    <p class="card-description mt-3 mb-6 text-xs leading-6 text-white/65">${inline(description)}</p>
    <div class="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-white/15 pt-3 font-mono text-[10px]"><span class="text-white/60"><span class="mr-2 text-orange">●</span>${escapeHtml(project.language)}</span>${website ? `<a class="text-orange hover:text-flare" href="${safeUrl(website[1])}" target="_blank" rel="noopener noreferrer">访问网站 <span aria-hidden="true">↗</span></a>` : ''}</div>
  </article>`;
}

const sectionHtml = sections.map((section) => `<section class="project-section mb-20 scroll-mt-8" id="${section.id}" aria-labelledby="heading-${section.id}">
  <div class="mb-6 flex flex-col justify-between gap-3 border-b border-white/25 pb-5 sm:flex-row sm:items-end"><div><div class="font-mono text-[11px] tracking-[.16em] text-orange"><span class="font-bold">${section.index}</span> / ${section.label}</div><h2 class="mt-3 font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-tight font-bold tracking-[-.06em]" id="heading-${section.id}">${section.title}<span class="text-orange">.</span></h2></div><p class="text-sm text-white/50">${section.note}</p></div>
  <div class="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">${section.projects.map((project, index) => projectCard(project, index + 1)).join('\n')}</div>
</section>`).join('\n');

const html = template
  .replaceAll('<!-- PROJECT_SECTIONS -->', sectionHtml)
  .replaceAll('<!-- PROJECT_COUNT -->', String(allProjects.length))
  .replaceAll('<!-- CATEGORY_COUNT -->', String(sections.length));

await mkdir(output, { recursive: true });
await writeFile(path.join(output, 'index.html'), html);
for (const file of ['app.js', 'favicon.svg', 'pluto-portrait.jpg', '_headers']) {
  await copyFile(path.join(root, 'site', file), path.join(output, file));
}
const contributionSvg = await readFile(path.join(root, 'contribution-dark.svg'), 'utf8');
const contributionColors = new Map([
  ['#161b22', '#383838'],
  ['#0e4429', '#57372f'],
  ['#006d32', '#91412d'],
  ['#26a641', '#d45532'],
  ['#39d353', '#ff805a'],
  ['#7d8590', '#b5b5b5'],
]);
const siteContributionSvg = contributionSvg.replace(/#[0-9a-f]{6}/gi, (color) =>
  contributionColors.get(color.toLowerCase()) ?? color,
);
await writeFile(path.join(output, 'contribution-site.svg'), siteContributionSvg);
console.log(`Built ${allProjects.length} projects from README.md into dist/`);
