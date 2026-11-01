# MaciTTY site

Static landing page for MaciTTY, a native macOS SSH/terminal client.
Plain HTML/CSS — no build step.

## Deploy on GitHub Pages

1. Create a repo (e.g. `knstntnkek/macitty-site`) and push:

   ```sh
   git init -b main
   git add .
   git commit -m "MaciTTY landing page"
   git remote add origin https://github.com/knstntnkek/macitty-site.git
   git push -u origin main
   ```

2. In the repo: **Settings → Pages → Source: "Deploy from a branch" → `main` / `/ (root)`**.

3. The site goes live at `https://knstntnkek.github.io/macitty-site/`
   (or `https://<user>.github.io/` if the repo is named `<user>.github.io`).

## Shipping a build

The download button points at `MaciTTY.zip` in the site root — drop the zipped
app next to `index.html` before pushing (or update the `href` to wherever you
host it). Note GitHub has a 100 MB per-file limit; the current zip is ~4 MB.

## Updating for a new release

Replace `MaciTTY.zip`. If you version the filename (e.g. `MaciTTY-0.2.zip`),
update both `href`s in `index.html`.
