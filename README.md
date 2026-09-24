# Auric Software

A responsive, static company site. No build step or dependencies.

## Preview

From this directory, run `python -m http.server 8000`, then visit http://localhost:8000.

## Content

Auric Software is the company. Prism is the product for restoration companies. The page introduces the three co-founders — Albert Chen, Stephen Tan, and Navid Boloorian, software engineers and UC San Diego graduates — and describes Prism as modernizing restoration workflows: consolidate information, easy to format, no-friction integration.

The contact address is founders@auricsoftware.com. Copy lives in `index.html`. Presentation lives in `styles.css`. Product claims should match the Prism repository's product brief (`AGENTS.md`).

`assets/prism-screenshot.jpg` is the frame at 12.4 seconds of the Prism demo (`prism-demo-draft-09.mp4`), cropped above the demo's caption:

```bash
ffmpeg -ss 12.4 -i prism-demo-draft-09.mp4 -frames:v 1 frame.png
magick frame.png -crop 1400x864+0+0 +repage -strip -quality 88 assets/prism-screenshot.jpg
magick frame.png -crop 755x824+555+40 +repage -strip -quality 88 assets/prism-screenshot-mobile.jpg
```

Screens 720px wide and narrower get the tighter `prism-screenshot-mobile.jpg` crop.

## Hosting and updates

Live site: https://auric-software.github.io/auricwebsite/
Repository: https://github.com/Auric-Software/auricwebsite

GitHub Pages publishes the root of `main` automatically. There is no build step; `.nojekyll` keeps the site served as static files. Commit and push changes to `main` to deploy updates.

The custom domain auricsoftware.com is not connected yet. When connecting it, use the DNS values supplied by GitHub Pages and preserve Google Workspace mail records.

Inter is self-hosted from `fonts/`. The site has no analytics, cookies, forms, or backend.
