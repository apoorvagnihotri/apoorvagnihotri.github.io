# Interactive Timeline Dev Session — Handoff Log

This markdown file summarizes the current state and next steps for the interactive timeline implementation on the personal website. Use this to quickly resume work or share context with collaborators.

---

## Project Context
- **Goal:** Fullscreen, vertical, interactive timeline that dynamically extracts and displays professional experience from LaTeX resume source files.
- **Stack:** Vanilla JS (no external libraries), modular controller pattern, custom CSS, SPA-style integration.
- **Data Source:** `resume-source/src/experience.tex` (LaTeX, parsed client-side)

---

## Current Status (as of 2025-06-15)
- Timeline overlay is injected and styled with custom CSS.
- Timeline nodes are generated dynamically from parsed LaTeX experience data.
- Node UI now only displays the `role` (with ellipsis for overflow), and expanded view shows all details.
- Node positioning is fixed: evenly distributed from 10%-90% of timeline height.
- Parallax background placeholder included.
- Responsive styles for mobile/tablet.
- Fallback to mock data if LaTeX fetch/parsing fails.

### Recent Fixes
- Fixed node overflow and vertical stacking issues.
- Improved expanded panel formatting.
- CSS and JS refactored for clarity and maintainability.

### Outstanding Issues
- **CSS Syntax Error:** A block of JavaScript was accidentally inserted into `timeline.css` — must be removed for styles to work properly!
- **CORS Issues:** If loading via `file://`, fetches will fail. Always use a local HTTP server (e.g., `python3 -m http.server 8000`).
- **Chat Widget:** Fails to fetch metadata when offline or using `file://`.

---

## Next Steps
1. **Fix CSS syntax errors** (remove stray JS from `timeline.css`).
2. **Enhance timeline animations and morphing transitions**.
3. **Implement parallax background effect** (currently a placeholder).
4. **Add richer content rendering** (bullet lists, links, multimedia embeds in expanded nodes).
5. **Test and polish mobile/tablet UX**.
6. **Iterate on UI/UX based on feedback.**

---

## How to Resume
- Start a local HTTP server in `homepage-og`:
  ```sh
  python3 -m http.server 8000
  ```
- Open [http://localhost:8000](http://localhost:8000) in your browser.
- Edit `js/timeline.js` and `css/timeline.css` for timeline logic and styles.
- Use this log to quickly recall project status and pending tasks.

---

## Contact / Ownership
- **Primary Dev:** Apoorv
- **Cascade AI session log available for detailed code history and context.**

---

_This file is auto-generated for project continuity. Update as needed!_
