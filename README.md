# about

> the portfolio roblox engineers couldn't ship because they were trapped in a four-hour sprint retro arguing about border radius tokens.

live deployment: **[theyh4t3-ashlxy.github.io/about](https://theyh4t3-ashlxy.github.io/about/)**

---

### why does this exist

half of roblox's web interface runs on modern foundation tokens, and the other half looks like an abandoned 2010 php forum. i got tired of the visual discrepancy, ripped their internal `@rbx/foundation-ui` design primitives, fixed their clipped 40px tab overflow math, and built an actual cohesive portfolio on top of it.

no bloated ui libraries. no generic template garbage. just pure foundation surfaces, live nixos telemetry, and zero white border leaks.

---

### features

- **which ashley do you want?**: profile picture switcher directly modeled after roblox's switch accounts modal. choose between `hiashley`, `shyash`, `sleepyash`, or emergency typography fallback monogram `AS`. persists in `localStorage`.
- **live hardware telemetry**: real-time thinkpad t16 gen 1 system status, battery juice tracking, thermal sensors, and nixos 26.11 release metrics.
- **procedural color engine**: procedural color wheel that recalculates the entire canvas, surfaces, card depths, and contrast ratios on the fly from any arbitrary hex code.
- **zero 2010 html wrappers**: eliminated the container anti-pattern. tabs mount directly into the canvas surface (`bg-surface-0`) with native state layers.
- **honeypot resistant**: zero third-tier subdomains required. deployed automatically to fastly edge cdns via github actions on every push to `main`.

---

### stack

- **runtime / build**: [vite](https://vitejs.dev/) + [react 19](https://react.dev/) + [typescript](https://www.typescriptlang.org/)
- **package manager**: [pnpm](https://pnpm.io/)
- **design tokens**: `@rbx/foundation-ui` + `@rbx/foundation-tailwind`
- **typography**: roblox builder sans, builder extended, and builder mono
- **host system**: nixos 26.11 (zokor) · hyprland · quickshell
- **ci/cd**: github actions -> github pages

---

### running locally

```bash
# clone the repo
git clone https://github.com/theyh4t3-ashlxy/about.git
cd about

# install dependencies
pnpm install

# launch dev server
pnpm dev
```

---

### license

do whatever you want with this. if roblox legal comes knocking, tell them to align their display name modal first.
