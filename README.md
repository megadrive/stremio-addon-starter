# Stremio Addon Boilerplate

This is a boilerplate for creating Stremio Addons using TypeScript, Astro and Express.

The boilerplate is a monorepo, with the following packages:

- `web`: Astro, which serves the configure page
- `server`: ExpressJS, which is the bulk of the addon
- `core`: Shared functionality between the two, plus any shared utils

## Why use this?

This leverages some really great packages to ensure smooth development and deployment.

- [Astro](https://astro.build/) for the frontend. One of my favourite frontends, it allows for you to use any existing knowledge of React, Vue, Svelte, etc. to build your frontend.
- [Express](https://expressjs.com/) for the backend, battle-tested, easy to use, and has a large ecosystem of plugins, if needed.
- [Zod](https://zod.dev/) for type safety, including ensuring any user-provided content is valid and safe. An incredible library.
- [Envalid](https://envalid.dev/) for environment variables, which is a great way to ensure that the addon is configured correctly.

## Getting started

### Prerequisites

- pnpm - https://pnpm.io/installation
- Node.js 22.11.0 or higher

### Installation

1. Navigate to a folder where you want to create the project
2. Run `pnpx tiged github:megadrive/stremio-addon-boilerplate`
3. Navigate into the folder: `cd stremio-addon-boilerplate`
4. Install dependencies: `pnpm install`

### Usage notes

For development: run `pnpm dev` to start the addon in development mode. Navigate to `http://localhost:4321` to see the addon. Any changes will be auto-reloaded. If you change any environment variables, you will need to restart the server.
For production: run `pnpm build` to build the addon, then run the project with `pnpm -w start`. The addon will be available at `http://localhost:3000`.

Note: You may have noticed the ports are different. During development, Astro's dev server runs on port 4321, and the addon server runs on port 3000. When you build the addon and run in prod, the server runs on port 3000.

From the root of the project, run `pnpm install` to install dependencies.

### How it works:

The project is a monorepo, with the following packages, in the "@stremio-addon" namespace:

- `core`: Shared functionality between the two, plus any shared utils.
- `web`: Astro, which serves the configure page, plus anything else that is a static asset/page.
- `server`: ExpressJS, which is the bulk of the addon, plus any other code that is server-side.

`server` serves static files from `web`. There is a `server` folder within `web`'s dist folder, but is only needed for development.

## Known issues

- `server`: `res.locals` is not typed. Need to figure out how to type it based on `core/src/config.ts:Config`
