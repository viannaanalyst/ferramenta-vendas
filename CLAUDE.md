# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint over the repo (flat config in `eslint.config.js`)

There is no test runner configured.

## Architecture

This is a **single-page marketing/landing page** ("wesales-landing") built with React 18 + Vite + Tailwind CSS. It is not a multi-route app — there is no router. The entire page is composed in [src/App.jsx](src/App.jsx) by stacking section components in a fixed vertical order:

`TopBanner → Hero → Features → Centralize → Comparison → HowItWorks → Pricing → FAQ → Footer`

Each section lives in [src/components/sections/](src/components/sections/) and is self-contained (own copy, styling, and animation). Cross-section coordination happens only at the App level — currently only the checkout flow:

- `App.jsx` owns `showUpsellModal` state.
- `Pricing` receives `onOpenCheckout` to trigger the modal.
- [UpsellModal.jsx](src/components/UpsellModal.jsx) is a 2-step checkout that lets the user add upsells (Suporte Mensal, Configuração pela Equipe) on top of the main product, then redirects to the appropriate Asaas payment link. The `links` and `products` constants at the top of that file are the source of truth for prices and checkout URLs — when prices/URLs change, edit them there.

When adding a new section, import it in `App.jsx` and place it in the desired position in the JSX. Sections that need to open the checkout should accept an `onOpenCheckout` prop rather than managing their own modal state.

## Styling

Tailwind CSS with two custom brand colors defined in [tailwind.config.js](tailwind.config.js):
- `roxo` (`#6A11CB`) and `azul` (`#2574FC`)
- `bg-gradient-roxo-azul` utility for the brand gradient

Use these tokens instead of hardcoding hex values. Animations use `framer-motion`; icons come from `react-icons/fi` (Feather set).

## Conventions

- JSX files only (no TypeScript). ESLint enforces `no-unused-vars` but ignores names starting with uppercase or `_` (so unused component imports flag, but unused destructured constants like `_foo` don't).
- The codebase is in **Brazilian Portuguese** — all user-facing copy, and many identifiers/comments, are in pt-BR. Keep new copy in Portuguese unless told otherwise.
