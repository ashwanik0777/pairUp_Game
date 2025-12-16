# PairUp

PairUp is a small web-based memory/matching game built with React, Vite, Tailwind CSS and a lightweight Express server. The UI uses shadcn/ui-inspired components, Radix primitives, and a custom soft-pastel design system (see `ideas.md`).

## Features
- Responsive memory/matching game UI
- Theme support via `ThemeContext`
- Reusable UI primitives in `client/src/components/ui`
- Simple Express server (server/index.ts) bundled with esbuild for production
- OAuth login URL helper that uses `VITE_OAUTH_PORTAL_URL` and `VITE_APP_ID`

## Quick Start
Prerequisites:
- Node.js (v18+ recommended)
- pnpm (the project uses pnpm as package manager)

Install dependencies:

```bash
pnpm install
```

Run development server (client + Vite dev):

```bash
pnpm dev
```

Build for production (client + bundle server):

```bash
pnpm build
```

Preview the production build locally (Vite preview):

```bash
pnpm preview
```

Run production (after `pnpm build`):

```bash
pnpm start
```

Useful checks:

```bash
pnpm check   # typescript check
pnpm format  # format the codebase with Prettier
```

## Environment
The client expects the following environment variables (in `.env` or the hosting environment):

- `VITE_OAUTH_PORTAL_URL` — base URL of the OAuth portal
- `VITE_APP_ID` — application id used for building the login URL

Server-side envs depend on your deployment (see `server/index.ts`).

## Project Structure
- client/ — frontend app (Vite + React + TypeScript)
  - src/
    - App.tsx — app root and router
    - main.tsx — client mount
    - components/ — feature components (GameBoard, GameCard, GameControls, GameStats, Map)
    - components/ui/ — shadcn-style UI primitives and Radix wrappers
    - contexts/ — `ThemeContext`
    - hooks/ — custom hooks
    - lib/ — utilities
    - pages/ — `Home`, `NotFound`
- server/ — lightweight Express server entry (`server/index.ts`)
- shared/ — shared constants used by both client and server
- components.json — shadcn generator config
- ideas.md — design notes and visual direction

## Key Components
- `GameBoard` — main game grid and logic
- `GameCard` — individual card UI and flip animations
- `GameControls` — difficulty, new game, and settings
- `GameStats` — displays score, attempts, time
- UI primitives in `client/src/components/ui/*` provide consistent styling

## Development Notes
- The app uses `wouter` for routing and `sonner` for toast notifications.
- The build script runs `vite build` then bundles `server/index.ts` with esbuild to `dist/`.
- Styling is handled with Tailwind CSS; the generator config is in `components.json`.
- The `getLoginUrl` utility builds an OAuth redirect URL at runtime (see `client/src/const.ts`).

## Contributing
- Run `pnpm install` and use `pnpm dev` to start development.
- Follow existing code patterns in `client/src/components/ui` for new primitives.

## License
This project is MIT licensed (see `package.json`).

---

If you want, I can:
- add a demo GIF or screenshots to the README
- add a minimal `README` section for server configuration
- create a `.env.example` with the required env vars

