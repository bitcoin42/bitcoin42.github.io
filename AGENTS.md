# AGENTS.md

## Cursor Cloud specific instructions

This repository is a single, zero-dependency static site: the entire product is `index.html` (marketing/landing page for **NightTrader**, a Bitcoin-native exchange). There is no package manager, no build system, no backend, no database, and no tests.

### Running it

- Serve the folder with any static HTTP server and open the root. Example: `python3 -m http.server 8000` from the repo root, then visit `http://localhost:8000/`.
- Opening `index.html` directly via `file://` also renders fully, but serve over HTTP if you need `navigator.clipboard` (the "Copy" button) to use the secure-context clipboard API. It falls back to select-all otherwise.

### Interactive functionality (for smoke testing)

- Clicking any annotation token (`.tok`) updates the right-margin note (`#note-tag` / `#note-body`) via inline JS at the bottom of `index.html`.
- The Bitmessage "Copy" button (`#bm-copy`) copies the address; in an insecure context it selects the address text instead.

### Build / lint / test

- There is nothing to build, lint, or test — no toolchain is defined. Any changes are to plain HTML/CSS/vanilla JS in `index.html`; verify visually in a browser.
