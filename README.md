# Auric Software

A responsive, static company landing page. No build step or dependencies.

## Preview

From this directory, run `python -m http.server 8000`, then visit http://localhost:8000.

## Content

The site introduces a three-engineer team, explains the restoration concept, describes the discovery process, and invites conversations. Conceptual capabilities are explicitly distinguished from a released product. There are no invented customers, testimonials, team names, integrations, or performance claims.

The contact link uses achen@auricsoftware.com and works without JavaScript. Copy, team names, and the contact link are in `index.html`; presentation is in `styles.css`.

## Publish

Upload this folder to a static website host. No build command is needed; the publishing directory is the folder containing `index.html`. Configure auricsoftware.com using the exact DNS values supplied by your chosen host. Preserve Google Workspace mail records when configuring website DNS.

Google Fonts supplies optional typography; local sans-serif fallbacks work when it is unavailable. The site has no analytics, cookies, forms, or backend. Publishing and DNS changes have not been performed.
