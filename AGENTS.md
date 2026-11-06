# MaciTTY site — project notes

## Conventions

- Static GitHub Pages site (knstntnkek/macittysite). User-facing copy:
  pain→solution framing, terse em-dash captions, privacy as a selling point.
- `index.html` carries a hardcoded `v<ver>` in the download note — bump on release.
- Bump `?v=` on `style.css`/`site.js` after every edit — browsers and Pages cache aggressively.
- Changelog entries: brief, user-facing features only — omit bugfixes (exception: user-blocking fixes like the 0.8.2 updater restart). Newest release gets the `· latest` marker; strip it from the previous one.
- Screenshots: 1024×680 PNGs named `shot-*.png`; blur/obscure private host names, IPs and usernames before publishing.
- Don't claim unshipped features and avoid phrases similar to "free forever" — a paid tier may come later.
- Release DMGs land here via the app's `publish-release.sh`, not manually.
