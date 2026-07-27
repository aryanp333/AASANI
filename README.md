# AASANI

**Analytics as a Service** — a premium marketing and product-demo site for a human-led analytics company. Clients upload business data; professional analysts deliver dashboards and insights using SQL, Python, Power BI, Tableau, and Excel. This is **not** an AI analytics platform.

---

## Features

- **Home** — Hero, positioning, and scroll-animated “How AASANI Works” workflow
- **Simulation** — Full client journey demo: fake `sales.csv` upload, analyst assignment, progress bars, pipeline timeline, live activity feed, chart reveal, and completion screen (all client-side, no backend)
- **Dashboard** — Executive KPIs, revenue trends, regional sales, segmentation, top products, and latest reports (dummy data)
- **About** — Analytics as a Service explained, workflow, and company values
- **Contact** — Contact form (demo only), email, consultation CTA, and FAQ
- **UI/UX** — Stripe/Linear-inspired dark theme, glassmorphism, Framer Motion animations, fully responsive layout

---

## Tech stack

| Layer | Technology |
|--------|------------|
| Framework | [React 19](https://react.dev/) |
| Build tool | [Vite 8](https://vite.dev/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Charts | [Recharts](https://recharts.org/) |
| Routing | [React Router](https://reactrouter.com/) |
| Utilities | `clsx`, `dayjs` |

Data is static JSON in `src/data/`. There is no API, authentication, or database.

---

## Installation

**Prerequisites:** Node.js 18+ and npm.

```bash
git clone <your-repository-url>
cd AASANI
npm install
```

---

## Running locally

Start the development server with hot reload:

```bash
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

Other scripts:

```bash
npm run lint    # ESLint
npm run build   # Production build to dist/
npm run preview # Preview production build locally
```

---

## Building for production

```bash
npm run build
```

Output is written to `dist/`. Serve that folder with any static host.

Verify locally before deploying:

```bash
npm run preview
```

---

## Deployment

### Vercel (recommended)

1. Push this repository to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Use the defaults: **Framework Preset: Vite**, build command `npm run build`, output directory `dist`.
4. Deploy. Vercel handles SPA routing for React Router automatically.

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- Add a redirect rule for SPA: `/* /index.html 200`

### GitHub Pages

GitHub Pages serves from a subpath (`https://<user>.github.io/<repo>/`). Configure Vite `base` in `vite.config.js`:

```js
export default defineConfig({
  base: '/YOUR-REPO-NAME/',
  // ...
})
```

Then rebuild, deploy `dist/` (e.g. via GitHub Actions or `gh-pages` branch), and enable **Pages** in the repository settings. For client-side routing, add a `404.html` that redirects to `index.html` or use a hash-based router.

---

## Project structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable UI (layout, home, simulation, charts, dashboard)
├── data/            # Dummy JSON / constants
├── hooks/           # Simulation, activity feed, scroll reveal
├── pages/           # Route-level pages
├── App.jsx          # Routes and layout shell
├── main.jsx         # Entry + BrowserRouter
└── index.css        # Tailwind theme tokens
```

---

## Brand colours

| Token | Hex |
|--------|-----|
| Background | `#020617` |
| Cards | `#0F172A` |
| Borders | `#1E293B` |
| Primary | `#06B6D4` |
| Accent | `#22D3EE` |
| Text | `#F8FAFC` |
| Muted | `#94A3B8` |

---

## License

Private / all rights reserved unless otherwise specified by the repository owner.
