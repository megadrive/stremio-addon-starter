// @ts-check
import { defineConfig } from "astro/config";

import node from "@astrojs/node";

import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  redirects: {
    "/": "/configure",
  },

  adapter: node({
    mode: "standalone",
  }),

  vite: {
    server: {
      cors: true,
    },
    plugins: [tailwindcss()],
  },

  integrations: [react()],
});
