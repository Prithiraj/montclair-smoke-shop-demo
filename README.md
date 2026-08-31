# MONTCLAIR // SIGNAL

A cinematic, frontend-only concept website for **Montclair Smoke Shop** in Montclair, New Jersey.

The experience combines React, Three.js, accessible HTML, and a local mock catalog to demonstrate how the shop could present itself online without enabling checkout, accounts, or real-time inventory.

> **Independent concept:** This repository is not the shop's official website. Public business details and demonstration content require owner confirmation before any production launch.

## Experience

- 21+ access acknowledgment
- Adaptive Three.js **Signal Core** hero scene
- Two visual atmospheres: **Obsidian** and **Chrome Ember**
- Reduced-motion mode and non-WebGL fallback
- Orbital category navigation
- Searchable, filterable mock product collection
- Product detail drawers
- Browser-local **Visit List** and counter view
- Live open/closed calculation in `America/New_York`
- Direct call and directions actions
- Responsive mobile action dock
- No checkout, customer accounts, analytics, or external trackers

## Public business data used in the demo

| Field | Value | Verification status |
|---|---|---|
| Name | Montclair Smoke Shop | Public listings |
| Address | 127 Valley Road, Montclair, NJ 07042 | Consistent across public listings |
| Phone | (973) 862-9684 | Consistent across public listings |
| Hours | Mon–Sat 9:00 AM–11:00 PM; Sun 10:00 AM–10:00 PM | Owner confirmation required |
| Email | Not included | No verified public email found |
| Official logo | Not included | No verified reusable logo asset found |

The interface uses an original concept wordmark and abstract SVG illustrations. It does not copy a directory image or claim that the concept identity is official.

## Stack

- React 19
- Vite 8
- Three.js
- React Three Fiber
- Native CSS animations and transitions
- Node's built-in test runner

## Local development

Requirements: Node.js 22.12 or newer.

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## Validation and production build

```bash
npm run validate
npm test
npm run build
npm run preview
```

`npm run validate` protects important content guardrails, including the absence of invented email/website fields and ecommerce language.

## Netlify deployment

The repository contains a complete `netlify.toml` configuration:

```text
Build command: npm run build
Publish directory: dist
Node version: 22.16.0
```

Connect this GitHub repository to Netlify and deploy from `main`. SPA redirects, security headers, immutable asset caching, and `noindex` demo protection are already configured.

## Project structure

```text
.
├── .github/workflows/ci.yml
├── docs/
│   ├── CONTENT_CHECKLIST.md
│   └── MASTER_PLAN.md
├── public/
│   ├── favicon.svg
│   ├── og-card.svg
│   ├── site.webmanifest
│   ├── _headers
│   └── _redirects
├── scripts/validate-content.mjs
├── src/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── tests/storeStatus.test.mjs
├── netlify.toml
├── package.json
└── vite.config.js
```

## Content ownership and launch checklist

Before converting the demo into an official website, obtain written confirmation of:

1. Legal business name and preferred display name
2. Current weekly and holiday hours
3. Owner-approved phone, email, and social profiles
4. Official logo files or approval of the concept identity
5. Current lawful product categories and photography permissions
6. Accessibility, parking, and service details
7. Required legal and regulatory language
8. Domain ownership and production analytics/privacy decisions

See [`docs/CONTENT_CHECKLIST.md`](docs/CONTENT_CHECKLIST.md) and [`docs/MASTER_PLAN.md`](docs/MASTER_PLAN.md) for the full plan.
