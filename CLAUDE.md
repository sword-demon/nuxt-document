# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Nuxt 4 documentation/showcase site using Nuxt UI 4, Tailwind CSS 4, and TypeScript. Includes a landing page, documentation pages, and auth pages (login/register).

## Common Commands

```bash
# Install dependencies
pnpm install

# Start dev server (http://localhost:3000)
pnpm dev

# Lint with ESLint
pnpm lint

# Type check
pnpm typecheck

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Architecture

### Component Auto-Registration

Components are auto-registered from two sources (configured in `nuxt.config.ts`):

1. `~/components` — global components (header, footer, docs-page-shell)
2. `~/pages/**/components/**/*.vue` — page-local components (e.g. `app/pages/index/components/hero.vue`)

Page-local components use `pathPrefix: true`, so `app/pages/index/components/hero.vue` is registered as `IndexHero`.

### Page Routing

Pages use the Nuxt 4 file-based routing convention under `app/pages/`. The `pages.pattern` config excludes `**/components/**` from being treated as routes.

### Auth & API Patterns

Auth forms use `UAuthForm` from Nuxt UI with Zod schemas for validation. The login page (`app/pages/auth/login.vue`) demonstrates the API pattern:

- Uses `$fetch` directly to `http://localhost:3333/auth/login`
- Stores the auth token in a cookie: `useCookie('token', { maxAge: 60 * 60 * 24 * 7 })`
- Uses `useToast()` for user-facing error messages
- Handles request/response errors via `$fetch` interceptors (`onRequest`, `onResponse`, `onRequestError`, `onResponseError`)

### Theme & Styling

- Theme colors defined in `app/app.config.ts`: primary is `green`, neutral is `slate`
- Custom green palette defined in `app/assets/css/main.css` using Tailwind CSS 4 `@theme static` syntax
- Default sans font: `Public Sans` (loaded from Google Fonts CDN in `nuxt.config.ts`)
- Chinese fonts: `Liu Jian Mao Cao`, `ZCOOL QingKe HuangYou`
- Fonts are served locally via `@nuxt/fonts` with `provider: 'local'`

### Layout Structure

The default layout (`app/layouts/default.vue`) wraps all pages with:
- `<Header />` — site brand, login/register buttons
- `<UMain>` — main content slot
- `<Footer />` — copyright, nav, GitHub link

The app root (`app/app.vue`) wraps everything in `<UApp>` with a toast config: `{ position: 'top-center', expand: false }`.

### ESLint Configuration

Uses Nuxt ESLint flat config (`eslint.config.mjs`) with stylistic rules:
- `commaDangle: 'never'`, `braceStyle: '1tbs'`, `quotes: 'single'`, `semi: false`, `indent: 2`
- Vue-specific rules disabled: `vue/html-closing-bracket-newline`, `vue/html-indent`, `vue/multiline-html-element-content-newline`, `vue/multi-word-component-names`, `vue/singleline-html-element-content-newline`

### Prettier Configuration

- `singleQuote: true`, `semi: false`, `trailingComma: 'none'`, `bracketSameLine: true`, `singleAttributePerLine: true`

## Key Dependencies

- `nuxt`: ^4.4.2
- `@nuxt/ui`: ^4.6.0 (UI components)
- `tailwindcss`: ^4.2.2
- `zod`: ^4.3.6 (form validation)
- `@nuxt/fonts`: 0.14.0 (local font serving)
- `@nuxt/eslint`: ^1.15.2
