/** @type {import('next').NextConfig} */
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  // Export a fully static site for GitHub Pages.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },

  // GitHub Pages hosts this project under the repository path.
  // Keep local development at http://localhost:3000 without a path prefix.
  ...(isGitHubActions ? { basePath: '/itzfizz-scroll-experience' } : {}),
};

module.exports = nextConfig;
