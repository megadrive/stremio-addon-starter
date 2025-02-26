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

- Node.js 22.11.0 or higher
- pnpm

### Installation

1. Navigate to a folder where you want to create the project
2. Run `pnpx tiged github:megadrive/stremio-addon-boilerplate`
3. Navigate into the folder: `cd stremio-addon-boilerplate`
4. Install dependencies: `pnpm install`

### Usage

To be decided.

