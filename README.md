# 🚀 Rocket Tools

**Fifteen tiny, elegant, fully client-side tools.** One cream-and-gold theme,
zero build steps, zero servers — everything runs in the browser and your data
never leaves your device.

## The tools

| Tool | File | What it does |
|---|---|---|
| **Meet** | `meet.html` | P2P group video calls — shareable link, avatar identities (joins muted/camera-off), screen share, host-enforced guest limit (PeerJS mesh) |
| **PeerDrop** | `peerdrop.html` | P2P file transfer of any size over encrypted WebRTC, streamed in 64 KB chunks with backpressure |
| **Whiteboard** | `whiteboard.html` | Infinite canvas (embedded Excalidraw), autosaved to localStorage |
| **Notes** | `notes.html` | Multi-note private notepad with search, autosave and word count |
| **Todo** | `todo.html` | Minimal task list — filters, drag reorder, clear completed |
| **JSON Studio** | `json.html` | Format / validate / tree view, JSON ↔ YAML, JSON → CSV |
| **Markdown** | `markdown.html` | EasyMDE editor with live preview; exports `.md` or styled HTML |
| **Image Compressor** | `image.html` | Convert/resize to WebP, JPEG, PNG (HEIC input supported); ZIP export |
| **PDF Toolkit** | `pdf.html` | Merge, split/extract, rotate, drag-reorder pages; images → PDF |
| **Color Studio** | `color.html` | Picker, harmonies, gradients, WCAG contrast checker, saved palette |
| **CSV Studio** | `csv.html` | Open CSV/XLSX, sort/filter, column stats, clean (trim/dedupe), export |
| **QR Codes** | `qr.html` | Generate (text/Wi-Fi/vCard, PNG+SVG) and scan (camera or image) |
| **Screen Recorder** | `record.html` | Record tab/window/screen with optional mic; WebM download |
| **Code Sandbox** | `sandbox.html` | HTML/CSS/JS playground — live preview, captured console, 1-file export |
| **Diagram Studio** | `diagram.html` | Mermaid editor — flowcharts, sequence, Gantt; SVG/PNG export |

## Architecture

- **No build step.** Every tool is a standalone HTML page; libraries load from
  version-pinned CDN URLs (unpkg). `theme.css` is the shared design system.
- **Local-first.** Tool data persists in `localStorage` under `rocket.*` keys.
  Meet and PeerDrop use the free public PeerJS cloud for WebRTC signaling
  only — media and files always travel directly between peers.
- **Installable PWA.** `manifest.webmanifest` + `sw.js` (network-first shell,
  cache-first CDN assets) make the suite work offline after the first visit.
- **Lightweight by default.** Vanilla JS everywhere; React is loaded only by
  the Whiteboard (Excalidraw requires it) and PeerDrop.

## Run locally

Any static file server works (service workers need `localhost` or HTTPS):

```bash
npx serve rocket-tools
# or: python3 -m http.server --directory rocket-tools 8080
```

## Deploy

Copy the folder to any static host — GitHub Pages, Netlify, Vercel,
Cloudflare Pages. HTTPS enables the PWA install prompt. No configuration.

**After choosing your domain**, replace the placeholder domain in one pass
(canonical URLs, Open Graph tags, JSON-LD, `robots.txt`, `sitemap.xml`):

```bash
grep -rl 'rocket-tools.app' . | xargs sed -i '' 's/rocket-tools\.app/your-domain.com/g'
```

## SEO

Every page ships with a unique title and meta description, canonical link,
Open Graph + Twitter card tags (`og-image.jpg`, 1200×630), and JSON-LD
structured data (`WebApplication` + `BreadcrumbList`; the hub has `WebSite` +
`ItemList`). `robots.txt` and `sitemap.xml` are included at the root.

## Notes & limits

- Meet and PeerDrop require the sender/host tab to stay open during a
  session, and very restrictive NATs may block direct WebRTC — adding a TURN
  server to the PeerJS config fixes that.
- The Whiteboard and Markdown editor need internet on first visit to fetch
  their CDN libraries; the service worker serves them offline afterwards.

## License

MIT — do whatever you like, attribution appreciated.
