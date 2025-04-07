# Web

This is an [Astro](https://astro.build/) project. Please see their docs for more information on how to use it.

This is the web portion of the Stremio Addon. It strictly runs in the browser. You can use any frontend framework that Astro supports.

Please note: This project is configured to build to static files.

## Development

In development mode, we have some server-side rendering (SSR) enabled to make development easier. It will automatically redirect
any requests to non-defined pages to the dev server that runs on port 3000.

To run the project locally, run:

```bash
pnpm dev # just the astro dev server
pnpm -w dev # all packages in dev mode, you'll likely want to run this
```
