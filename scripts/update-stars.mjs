import { readFile, writeFile } from 'node:fs/promises';

const readmePath = new URL('../README.md', import.meta.url);
const markerPattern = /<!-- stars:([^/\s]+)\/([^\s]+) -->.*?<!-- \/stars -->/g;
const readme = await readFile(readmePath, 'utf8');
const repositories = [
  ...new Set(
    [...readme.matchAll(markerPattern)].map(([, owner, repository]) =>
      `${owner}/${repository}`,
    ),
  ),
];

if (repositories.length === 0) {
  throw new Error('No star markers found in README.md');
}

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'PlutoKeating-profile-readme',
};

if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

const stars = new Map(
  await Promise.all(
    repositories.map(async (repository) => {
      const response = await fetch(`https://api.github.com/repos/${repository}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`GitHub API returned ${response.status} for ${repository}`);
      }

      const data = await response.json();
      return [repository, data.stargazers_count];
    }),
  ),
);

const updatedReadme = readme.replace(
  markerPattern,
  (_match, owner, repository) => {
    const name = `${owner}/${repository}`;
    return `<!-- stars:${name} -->⭐ **${stars.get(name)}**<!-- /stars -->`;
  },
);

if (process.argv.includes('--check')) {
  if (updatedReadme !== readme) {
    throw new Error('README.md contains stale star counts');
  }
} else if (updatedReadme !== readme) {
  await writeFile(readmePath, updatedReadme);
}
