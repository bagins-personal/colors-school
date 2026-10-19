# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Sanity CMS

Content (announcements, events, news & education articles + parent tips, gallery, About Us,
Contact Us, Site Settings) is fetched
from Sanity at runtime with a read-only, token-less client (`src/lib/sanity.js`, queries in
`src/lib/queries.js`). The Studio lives in `../colors-cms/client-website-cms`.

1. `cp .env.example .env.local` and fill in `VITE_SANITY_PROJECT_ID` / `VITE_SANITY_DATASET`.
2. Add `http://localhost:5173` (and your production URL) under API → CORS origins at
   https://www.sanity.io/manage — no credentials needed.
3. `npm run dev`. Published content appears on reload; drafts are never shown.
