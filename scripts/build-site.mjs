import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readme = await readFile(path.join(root, 'README.md'), 'utf8');
const template = await readFile(path.join(root, 'site', 'index.html'), 'utf8');
const output = path.join(root, 'dist');

const sections = [
  { id: 'ai', marker: '## 🤖', label: 'AI PROJECTS', title: 'AI 项目', index: '01', note: '从智能助手到原生操作系统' },
  { id: 'devices', marker: '## 📱', label: 'DEVICES & FIRMWARE', title: '设备与固件', index: '02', note: '给旧设备写入新的可能' },
  { id: 'embedded', marker: '## ⚙️', label: 'EMBEDDED DEVELOPMENT', title: '嵌入式开发', index: '03', note: '让代码与物理世界相遇' },
  { id: 'utilities', marker: '## 🛠', label: 'UTILITIES', title: '效率工具', index: '04', note: '为日常工作减少摩擦' },
  { id: 'learning', marker: '## 📚', label: 'LEARNING & GROWTH', title: '学习与成长', index: '05', note: '保持好奇，持续构建' },
  { id: 'contributions', marker: '## 🤝', label: 'OPEN SOURCE', title: '参与贡献', index: '06', note: 'Fork 自他人的项目，参与其中小部分贡献' },
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
  return block.split('\n').filter((line) => /^\| \[/.test(line)).map((line) => {
    const cells = line.split('|').slice(1, -1).map((cell) => cell.trim());
    const match = cells[0].match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
    if (!match) throw new Error(`Cannot parse project row: ${line}`);
    const starMatch = cells[2].match(/⭐\s*\*\*(\d+)\*\*/);
    if (!starMatch) throw new Error(`Cannot parse stars: ${line}`);
    return {
      name: match[1], url: match[2], description: cells[1],
      stars: Number(starMatch[1]), language: section.id === 'contributions' ? 'Open Source' : cells[3],
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
const featured = new Set(['Project.J-nify', 'TaiChiOS', 'dsh-lark-bot']);

function projectCard(project, number) {
  const website = project.description.match(/· \[网站\]\((https?:\/\/[^)]+)\)/);
  const description = project.description.replace(/ · \[网站\]\(https?:\/\/[^)]+\)/, '');
  const track = project.section === 'learning'
    ? `<span class="mt-4 font-mono text-[9px] tracking-widest text-ember">${['Project.Insight', 'Project.plusOne'].includes(project.name) ? 'PROFESSIONAL SKILLS' : 'UNIVERSITY COURSES'}</span>`
    : '';
  return `<article class="project-card @container group relative flex min-h-60 flex-col overflow-hidden border border-white/15 bg-[#292929] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-orange/70 hover:shadow-[0_18px_55px_rgba(255,64,0,.12)] sm:p-6${featured.has(project.name) ? ' project-card--featured' : ''}" data-search="${escapeHtml(`${project.name} ${description.replace(/<[^>]+>/g, ' ')} ${project.language}`.toLowerCase())}">
    <div class="flex items-center justify-between gap-3 font-mono text-[10px] tracking-widest"><span class="text-white/45">${String(number).padStart(2, '0')} / ${escapeHtml(project.section.toUpperCase())}</span><span class="text-orange" aria-label="${project.stars} stars">✦ ${project.stars}</span></div>
    ${track}
    <h3 class="mt-6 font-display text-[clamp(1.1rem,6cqw,1.5rem)] leading-snug font-semibold tracking-tight break-words"><a class="transition-colors hover:text-orange" href="${safeUrl(project.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(project.name)}<span class="text-sm text-orange" aria-hidden="true"> ↗</span></a></h3>
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
