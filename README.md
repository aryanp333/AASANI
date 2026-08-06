# AASANI

**Healthcare Intelligence. Connected.**

AASANI is the public marketing site and interactive product experience for a healthcare intelligence platform—a secure cloud layer that unifies operational, financial, and clinical data from systems you already run (EHR, revenue cycle, scheduling, lab, HR) into one executive workspace.

**Live site:** [https://aryanp333.github.io/AASANI/](https://aryanp333.github.io/AASANI/)

**Repository:** [https://github.com/aryanp333/AASANI](https://github.com/aryanp333/AASANI)

---

## Features

- **Marketing site** — Home, Platform, Solutions, Integrations, Security, Pricing, Resources, Contact
- **Experience AASANI** (`/experience`) — Full-screen boot sequence and executive workspace with KPIs, charts, strategic insights, and board-ready reports (mock data, client-side only)
- **Design** — Enterprise light theme, Framer Motion, custom SVG visuals, responsive layout

---

## Tech stack

| Layer | Technology |
|--------|------------|
| Framework | [React 19](https://react.dev/) |
| Build | [Vite 8](https://vite.dev/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Charts | [Recharts](https://recharts.org/) |
| Routing | [React Router](https://reactrouter.com/) |

---

## Installation

**Prerequisites:** Node.js 18+ and npm.

```bash
git clone https://github.com/aryanp333/AASANI.git
cd AASANI
npm install
```

---

## Running locally

```bash
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

```bash
npm run build   # production build
npm run preview # preview dist/
npm run lint    # ESLint
```

---

## Deployment

### GitHub Pages

Pushes to `main` build the site and deploy via GitHub Actions.

1. Open **Settings → Pages → Build and deployment**.
2. Set **Source** to **GitHub Actions** (not “Deploy from a branch”).
3. After each push, wait for the **Deploy GitHub Pages** workflow to finish.

**Live URL:** [https://aryanp333.github.io/AASANI/](https://aryanp333.github.io/AASANI/)

### Vercel

Import the repo, preset **Vite**, build `npm run build`, output `dist`.

---

## Project structure

```
src/
├── components/   # layout, marketing, product, illustrations
├── data/         # platform mock data
├── hooks/
├── pages/
├── App.jsx
└── main.jsx
```

---

© AASANI. All rights reserved.
