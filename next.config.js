/** @type {import('next').NextConfig} */
const repoName = process.env.GITHUB_ACTIONS === 'true'
  ? (process.env.GITHUB_REPOSITORY || '').split('/')[1]
  : '';
const isUserOrOrgSite = repoName.endsWith('.github.io');
const basePath = repoName && !isUserOrOrgSite ? `/${repoName}` : '';

const nextConfig = {
  // Produces a fully static site in /out for GitHub Pages.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // The repository path is added automatically during GitHub Actions builds.
  basePath,
};

module.exports = nextConfig;
