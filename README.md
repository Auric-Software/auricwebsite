# Auric Software

A responsive, static company landing page. No build step or dependencies.

## Preview

From this directory, run `python -m http.server 8000`, then visit http://localhost:8000.

## Content

The site introduces a three-engineer team, explains the restoration concept, describes the discovery process, and invites conversations. Conceptual capabilities are explicitly distinguished from a released product. There are no invented customers, testimonials, team names, integrations, or performance claims.

The contact link uses achen@auricsoftware.com and works without JavaScript. Copy, team names, and the contact link are in `index.html`; presentation is in `styles.css`.

## Hosting and updates

Live site: https://auric-software.github.io/auricwebsite/
Repository: https://github.com/Auric-Software/auricwebsite

GitHub Pages publishes the root of `main` automatically. There is no build step; `.nojekyll` keeps the site served as static files. Commit and push changes to `main` to deploy updates.

The custom domain auricsoftware.com is not connected yet. When connecting it, use the DNS values supplied by GitHub Pages and preserve Google Workspace mail records.

Google Fonts supplies optional typography; local sans-serif fallbacks work when it is unavailable. The site has no analytics, cookies, forms, or backend.
