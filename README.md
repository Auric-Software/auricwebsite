# Auric Software

A responsive, static company site. No build step or dependencies.

## Preview

From this directory, run `python -m http.server 8000`, then visit http://localhost:8000.

## Content

Auric Software is the company. Prism is the product for restoration companies. The page introduces the three co-founders — Albert Chen, Stephen Tan, and Navid Boloorian, software engineers and UC San Diego graduates — and describes Prism as modernizing restoration workflows: consolidate information, easy to format, no-friction integration.

Prism website: https://prism.auricsoftware.com/

The contact address is founders@auricsoftware.com. Copy lives in `index.html`. Presentation lives in `styles.css`. Product claims should match the Prism repository's product brief (`AGENTS.md`).

The product illustration is `assets/prism-hero-v3-refined.png` (1536×1024).
Desktop and mobile display the complete image at its natural 3:2 aspect ratio.
The toolbar labels it as a product preview; the caption describes the connections shown.

The previous `assets/prism-screenshot.jpg` is the frame at 12.4 seconds of the Prism demo (`prism-demo-draft-09.mp4`), cropped above the demo's caption:

```bash
ffmpeg -ss 12.4 -i prism-demo-draft-09.mp4 -frames:v 1 frame.png
magick frame.png -crop 1400x864+0+0 +repage -strip -quality 88 assets/prism-screenshot.jpg
magick frame.png -crop 755x824+555+40 +repage -strip -quality 88 assets/prism-screenshot-mobile.jpg
```

The previous screenshots, including the tighter mobile crop, remain as source
assets but are no longer displayed on the page.

## Layout and motion

The page opens directly with the headline; the Prism introduction appears in the
product section. The animated canvas spans the full viewport; text uses centered
containers throughout. Introductions share a 1080px maximum width, centered headings,
and 680px body-copy measure. Feature and team rows are capped at 1200px, with their
individual entries left aligned for reading. Section boundaries share a combined
64–96px gap, and the hero has less vertical padding. The product preview remains
centered, capped at 1440px, and scales with viewport height to leave room for its
toolbar and the sticky header; the caption may sit below the fold on shorter screens. The complete image keeps its 3:2 aspect
ratio. Supporting text (labels, navigation, captions, roles, and footer) uses a
consistent 14px size on desktop and mobile; body text and primary actions use
16px, with introductory copy scaling up to 18px. All graphics, fonts, and product
images are local.
`styles.css` controls responsive spacing, native smooth anchor scrolling, and
entrance animations. The hero and product share one white canvas and a
continuous SVG: gold curves flow behind the introduction and around the bounded
preview, with dots travelling along them. Paths resize with the layout. Motion stops when the
combined area leaves view, the tab is hidden, or reduced motion is requested; the
graphic stays static without JavaScript. There is no background color break or
section gradient. The preview has a subtle border and shadow for separation.
`site.js` adds a subtle header border on scroll and uses
IntersectionObserver for one-time section reveals. Content remains visible with
JavaScript disabled or IntersectionObserver unavailable. Reduced-motion settings
disable animations and smooth scrolling, including when changed while browsing.

To check presentation changes, preview at desktop and phone widths, follow the
Prism, Team, contact, and back-to-top links, and check with reduced motion and
JavaScript disabled. Run `node --check site.js` for JavaScript syntax validation.

## Hosting and updates

Live site: https://auricsoftware.com/
Repository: https://github.com/Auric-Software/auricwebsite

GitHub Pages publishes the root of `main` automatically. There is no build step; `.nojekyll` keeps the site served as static files. Commit and push changes to `main` to deploy updates.

GitHub Pages lets browsers cache every file for 10 minutes, and a normal reload fetches the new `index.html` while reusing cached assets. When `styles.css` or `site.js` changes, update the version on its URL in `index.html`. Give a changed image a new file name for the same reason.

The custom domain auricsoftware.com is configured in GitHub Pages and `CNAME`. Preserve the domain configuration and Google Workspace mail records when updating hosting.

Inter and Outfit are self-hosted from `vendor/auric-design/fonts/`. The site has no analytics, cookies, forms, or backend.

## Shared visual foundations

Color, font roles, spacing primitives, radii, motion, and logo assets are owned by
the sibling `auric-design` repository. This site pins version 0.3.0 in
`vendor/auric-design/manifest.json`. Load the generated tokens and font CSS before
`styles.css`; edit shared values in the design repo rather than this vendor copy.
Inter is the standard font; upright Outfit is used for accent headings. The two
golds are reserved for brand details and readable accent text. Hero, contact,
preview, and footer surfaces use light neutrals. The hero and product section share a pure white canvas (#FFFFFF), dark text, and readable
gold accents. Secondary surfaces use near-white (#FAFAFA). Contact and footer backgrounds stay pure white. Spacing that matches the shared scale,
corner radii, and transition/entrance durations use the shared tokens; page-specific
sizes and stagger delays remain local. The corrected Prism SVG resolves its gold
from the same token as the brand accents and uses its native 824×307 proportions.
The original Auric lockup remains the header/footer logo; the optional text-only
variant is also included in the bundle.

From `../auric-design`, run:

```sh
npm run build
npm run sync -- ../auric-software/vendor/auric-design
npm run sync -- --check ../auric-software/vendor/auric-design
```

The legacy assets and original demo screenshots remain for provenance. Active
wordmarks and fonts are served from the versioned vendor directory. Page-specific
layout and responsive sizing still live in `styles.css`.

When adopting another release, update the versioned CSS and Prism-logo URLs in
`index.html` alongside the manifest and review removed or renamed tokens. The
HTML theme-color matches `color.canvas`; keep it aligned if that token changes.
