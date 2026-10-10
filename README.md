# ITZFIZZ — Scroll Experience

A premium scroll-driven landing-page concept created for the **Itzfizz Digital Web Development internship assignment**. The hero uses a pinned GSAP/ScrollTrigger timeline to move a custom vector sports car across a road, progressively illuminate the headline, and track scroll progress. The rest of the page is designed to feel like a compact digital-agency homepage rather than a standalone animation demo.

> **Concept note:** The four percentages in the hero are illustrative design content, not actual Itzfizz or client results.

## Live demo
 URL here:

`https://sanjj17.github.io/itzfizz-scroll-experience/`

## Tech stack

- Next.js App Router with static export
- React
- Tailwind CSS
- GSAP + ScrollTrigger
- Vanilla CSS for custom visual treatments and responsive behavior

## Features

- First-screen hero with spaced headline and staggered load-in
- Scroll-pinned, scrubbed car motion; scroll progress drives the animation instead of autoplay
- Sequential headline reveal, road glow, car trail, background parallax and a subtle scroll-velocity glow response
- Animated metrics with an explicit illustrative-data disclaimer
- Responsive layout for desktop, tablet and mobile
- Reduced-motion fallback
- Three agency service cards and a contact footer
- Static export to `out/` for GitHub Pages
- GitHub Pages workflow includes `.nojekyll` so underscore-prefixed Next assets are served
- No remote image dependencies or API keys

## Run locally

Use Node.js 20.9 or newer (Node.js 22 is recommended).

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

To build the deployable static site:

```bash
npm run build
```

The generated static site will be in `out/`. To preview that production export locally, run `npx serve out` after the build (or use the development server with `npm run dev`).

## Deploy to GitHub Pages

1. Create a GitHub repository named `itzfizz-scroll-experience` and push this folder to its `main` branch.
2. In the repository, open **Settings → Pages** and set the source to **GitHub Actions**.
3. The included `.github/workflows/deploy.yml` will build the static export and publish `out/` whenever you push to `main`.
4. Once the workflow succeeds, copy the published Pages URL into the Live demo section above.

If you name your repository differently, the GitHub Actions build automatically reads the repository name and adds the correct project-site base path. Update the live URL in this README after publishing. This project uses a static export (`output: 'export'`) so it does not require a Node server at runtime.

## Suggested submission checks

- Scroll slowly and quickly through the hero; car position and the headline reveal should follow scroll progress.
- Scroll back up; the reveal and movement should reverse smoothly.
- Test at 1440px desktop width and around 390px mobile width.
- Test with the browser's reduced-motion preference enabled.
- Confirm there are no console errors and that every nav link reaches a real section.

## Project structure

```text
app/
  globals.css          # Tailwind layers + responsive visual design
  layout.js            # Metadata and root layout
  page.js              # Page composition
components/
  HeroExperience.jsx   # GSAP intro + ScrollTrigger timeline
  CarIllustration.jsx  # Original inline SVG car
  Services.jsx         # Agency service cards
  Footer.jsx           # Contact section
.github/workflows/
  deploy.yml           # GitHub Pages static deployment
```

## Implementation notes

The scroll-driven animation is created with a GSAP timeline attached to ScrollTrigger using `pin`, `scrub`, `invalidateOnRefresh` and transform-based movement. Animations are scoped to the hero and reverted on unmount. A `prefers-reduced-motion` fallback leaves the page readable without the pinned journey.
