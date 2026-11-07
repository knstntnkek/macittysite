/* docs.js — renders docs/*.md into the guide. Edit the markdown, not this file.
   Page list lives in PAGES; hash routing: docs.html#<page>/<anchor>. */

const PAGES = [
  { slug: "getting-started", title: "Getting started" },
  { slug: "sessions",        title: "Sessions & the library" },
  { slug: "connection-types",title: "Connection types" },
  { slug: "authentication",  title: "Authentication" },
  { slug: "proxies-tunnels", title: "Proxies & tunnels" },
  { slug: "sftp",            title: "File transfer (SFTP)" },
  { slug: "snippets",        title: "Snippets" },
  { slug: "monitoring",      title: "Server monitoring" },
  { slug: "terminal",        title: "Customizing the terminal" },
  { slug: "logging",         title: "Session logging" },
  { slug: "privacy",         title: "Privacy & security" },
  { slug: "shortcuts",       title: "Keyboard shortcuts" },
  { slug: "troubleshooting", title: "Troubleshooting & FAQ" },
];

const navEl  = document.getElementById("docs-nav");
const bodyEl = document.getElementById("doc-body");
const tocEl  = document.getElementById("docs-toc");

const slugify = s => s.toLowerCase().replace(/<[^>]+>/g, "")
  .replace(/&amp;/g, "and").replace(/[^\p{L}\p{N}]+/gu, "-")
  .replace(/^-+|-+$/g, "");

function route() {
  const h = decodeURIComponent(location.hash.replace(/^#/, ""));
  const [page, anchor] = h.split("/");
  return {
    page: PAGES.some(p => p.slug === page) ? page : PAGES[0].slug,
    anchor: anchor || "",
  };
}

async function render() {
  const { page, anchor } = route();

  [...navEl.querySelectorAll("a")].forEach(a =>
    a.classList.toggle("on", a.dataset.slug === page));

  let md;
  try {
    const r = await fetch(`docs/${page}.md`);
    if (!r.ok) throw new Error(r.status);
    md = await r.text();
  } catch {
    bodyEl.innerHTML = `<h1>Couldn't load this page</h1>
      <p>The file <code>docs/${page}.md</code> didn't come through —
      check your connection or read it
      <a href="https://github.com/knstntnkek/macittysite/blob/main/docs/${page}.md">on GitHub</a>.</p>`;
    return;
  }

  marked.setOptions({ headerIds: false, mangle: false });
  bodyEl.innerHTML = marked.parse(md);

  // img/x.png in the .md files → docs/img/x.png (files also preview on GitHub)
  bodyEl.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute("src");
    if (src && !src.includes("/") && !src.includes(":")) img.src = `docs/img/${src}`;
    else if (src && src.startsWith("img/")) img.src = `docs/${src}`;
    img.setAttribute("loading", "lazy");
  });

  // a.md links → #a (hash routing); a.md#b → #a/b
  bodyEl.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute("href");
    const m = href.match(/^([\w-]+)\.md(?:#(.*))?$/);
    if (m) a.setAttribute("href", `#${m[1]}${m[2] ? "/" + m[2] : ""}`);
    else if (/^(https?:)?\/\//.test(href)) { a.target = "_blank"; a.rel = "noopener"; }
  });

  // heading ids + in-page TOC from h2s
  const used = new Set();
  const h2s = [];
  bodyEl.querySelectorAll("h1, h2, h3").forEach(h => {
    let id = slugify(h.textContent);
    for (let i = 2; used.has(id); i++) id = `${slugify(h.textContent)}-${i}`;
    used.add(id);
    h.id = id;
    if (h.tagName === "H2") h2s.push(h);
  });

  tocEl.innerHTML = h2s.length > 1
    ? `<p class="toc-title">On this page</p>` +
      h2s.map(h => `<a href="#${page}/${h.id}">${h.textContent}</a>`).join("")
    : "";

  // prev / next footer
  const i = PAGES.findIndex(p => p.slug === page);
  const prev = PAGES[i - 1], next = PAGES[i + 1];
  bodyEl.insertAdjacentHTML("beforeend",
    `<nav class="docs-prevnext">
       ${prev ? `<a class="pn" href="#${prev.slug}">← ${prev.title}</a>` : "<span></span>"}
       ${next ? `<a class="pn" href="#${next.slug}">${next.title} →</a>` : "<span></span>"}
     </nav>`);

  document.title = `${PAGES[i].title} — MaciTTY docs`;

  const target = anchor && document.getElementById(anchor);
  (target || bodyEl).scrollIntoView(target ? {} : { block: "start" });
  if (!target) window.scrollTo(0, 0);
}

// sidebar
navEl.innerHTML = `<p class="docs-nav-title">Guide</p>` +
  PAGES.map(p => `<a href="#${p.slug}" data-slug="${p.slug}">${p.title}</a>`).join("");

addEventListener("hashchange", render);
render();
