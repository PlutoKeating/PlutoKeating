import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
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
      `<a class="relative z-20 text-accent hover:text-accent-hover" href="${safeUrl(url)}" target="_blank" rel="noopener noreferrer">${label}<span aria-hidden="true"> ↗</span></a>`)
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

function projectCard(project, number) {
  const description = project.description;
  const projectName = `<span>${escapeHtml(project.name)}<span class="text-sm text-accent" aria-hidden="true"> ↗</span></span>`;
  const popularity = project.stars === null
    ? 'PRIVATE SOURCE'
    : `✦ ${project.stars}`;
  const status = project.name === 'Insight' ? '域名配置中' : null;
  const sourceLink = project.sourceUrl
    ? `<a class="relative z-20 shrink-0 text-accent transition-colors hover:text-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent" href="${safeUrl(project.sourceUrl)}" target="_blank" rel="noopener noreferrer" aria-label="查看 ${escapeHtml(project.name)} 的源码">源码 <span aria-hidden="true">↗</span></a>`
    : '<span class="text-fg-subtle">源码未公开</span>';
  return `<article class="project-card @container group relative flex min-h-60 flex-col overflow-hidden border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_18px_55px_color-mix(in srgb, var(--color-accent) 12%, transparent)] sm:p-6${featured.has(project.name) ? ' project-card--featured' : ''}" data-search="${escapeHtml(`${project.name} ${description.replace(/<[^>]+>/g, ' ')} ${project.language}`.toLowerCase())}">
    ${project.url ? `<a class="absolute inset-0 z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-accent" href="${safeUrl(project.url)}" target="_blank" rel="noopener noreferrer" aria-label="打开 ${escapeHtml(project.name)}${status ? `（${status}）` : ''}"></a>` : ''}
    <div class="flex items-center justify-between gap-3 font-mono text-[10px] tracking-widest"><span class="text-fg-subtle">${String(number).padStart(2, '0')} / ${escapeHtml(project.section.toUpperCase())}</span><span class="text-accent">${status ?? popularity}</span></div>
    <h3 class="mt-6 font-sans text-[clamp(1.1rem,6cqw,1.5rem)] leading-snug font-semibold tracking-tight break-words">${projectName}</h3>
    <p class="card-description mt-3 mb-6 text-xs leading-6 text-fg-muted">${inline(description)}</p>
    <div class="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3 font-mono text-[10px]"><span class="text-fg-muted"><span class="mr-2 text-accent">●</span>${escapeHtml(project.language)}</span>${sourceLink}</div>
  </article>`;
}

const sectionHtml = sections.map((section) => `<section class="project-section mb-20 scroll-mt-8" id="${section.id}" aria-labelledby="heading-${section.id}">
  <div class="mb-6 flex flex-col justify-between gap-3 border-b border-border-strong pb-5 sm:flex-row sm:items-end"><div><div class="font-mono text-[11px] tracking-[.16em] text-accent"><span class="font-bold">${section.index}</span> / ${section.label}</div><h2 class="mt-3 font-sans text-[clamp(2.25rem,5vw,3.5rem)] leading-tight font-bold tracking-[-.06em]" id="heading-${section.id}">${section.title}<span class="text-accent">.</span></h2></div><p class="text-sm text-fg-subtle">${section.note}</p></div>
  <div class="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">${section.projects.map((project, index) => projectCard(project, index + 1)).join('\n')}</div>
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
  ['#161b22', '#17181c'],
  ['#0e4429', '#3a2a1f'],
  ['#006d32', '#6b4527'],
  ['#26a641', '#a5623f'],
  ['#39d353', '#f0a35e'],
  ['#7d8590', '#6f6b65'],
]);
const siteContributionSvg = contributionSvg.replace(/#[0-9a-f]{6}/gi, (color) =>
  contributionColors.get(color.toLowerCase()) ?? color,
);
await writeFile(path.join(output, 'contribution-site.svg'), siteContributionSvg);
await mkdir(path.join(output, 'fonts'), { recursive: true });
for (const file of ['InterVariable.woff2', 'InterVariable-Italic.woff2']) {
  await copyFile(path.join(root, 'site', 'fonts', file), path.join(output, 'fonts', file));
}
console.log(`Built ${allProjects.length} projects from README.md into dist/`);
