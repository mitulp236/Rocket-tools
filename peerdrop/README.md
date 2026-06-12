# PeerDrop

Elegant peer-to-peer file transfer in the browser. Files of any size stream
directly between two devices over encrypted WebRTC — no backend, no database,
no file ever touches a server.

## How it works

1. **Sender** opens the app and drops in a file. PeerDrop generates a
   6-character room code (e.g. `AB12CD`) and a shareable link
   (`https://yourapp.com/?code=AB12CD`).
2. **Receiver** opens the link or types the code. The browsers connect
   directly via WebRTC (PeerJS handles the handshake through the free public
   `peerjs.com` signaling server — signaling only, never file data).
3. The file is sliced into **64 KB chunks** and streamed over the data channel
   with backpressure (pause above 8 MB buffered, resume below 1 MB).
4. Both ends show live **progress, speed (MB/s), and ETA**.
5. On Chromium browsers the receiver streams straight to disk via the File
   System Access API (true "no size limit"); elsewhere it assembles an
   in-memory Blob and triggers a download.

## Files

| File | Purpose |
|---|---|
| `index.html` | The entire React app (React 18 + PeerJS via CDN, JSX via Babel standalone) |
| `manifest.webmanifest` | PWA manifest — installable on mobile |
| `sw.js` | Service worker — caches the app shell + CDN assets for offline/installed use |
| `icon.svg` / `icon-maskable.svg` | App icons |

## Run locally

Any static file server works (the service worker needs `http://localhost` or HTTPS):

```bash
cd peerdrop
python3 -m http.server 8080
# or: npx serve .
```

Open `http://localhost:8080` in two tabs (or two devices on any network) to test.

## Deploy

Drop the folder onto any static host — GitHub Pages, Netlify, Vercel,
Cloudflare Pages. HTTPS is required for PWA install and recommended for
WebRTC. No server configuration needed.

## Notes & limits

- The sender's tab must stay open until the transfer finishes (it *is* the server).
- The public PeerJS cloud is used for the initial handshake only; for
  production traffic you can self-host `peerjs-server` and change one line in
  `newPeer()`.
- Very restrictive corporate NATs can block direct WebRTC; adding a TURN
  server to the PeerJS config fixes that (at the cost of relaying bytes).
