import { serve } from "@hono/node-server";
import { serverEnv } from "@stremio-addon/env";
import { addonManifest, createManifest } from "@/util/manifest.js";
import { manifestRouter } from "@/routes/config/manifest.js";
import { catalogRouter } from "@/routes/config/catalog.js";
import { metaRouter } from "@/routes/config/meta.js";
import { streamRouter } from "@/routes/config/stream.js";
import { subtitleRouter } from "@/routes/config/subtitle.js";
import { serveStatic } from "hono/serve-static";
import path from "node:path";
import { readFile } from "node:fs/promises";
import { createApp, createRouter } from "@/util/createHono.js";

const app = createApp();

app.get("/", (c) => {
  return c.redirect("/configure");
});

app.get("/manifest.json", (c) => {
  const manifest = createManifest({ ...addonManifest });
  return c.json(manifest);
});

const configRouter = createRouter();
configRouter.route("/manifest.json", manifestRouter);
configRouter.route("/catalog", catalogRouter);
configRouter.route("/meta", metaRouter);
configRouter.route("/stream", streamRouter);
configRouter.route("/subtitle", subtitleRouter);

app.route("/:config", configRouter);

app.use(
  "*",
  serveStatic({
    root: "../web/dist/client",
    pathResolve(filePath) {
      return path.resolve(".", filePath);
    },
    getContent(path) {
      return readFile(path);
    },
  })
);

serve(
  {
    fetch: app.fetch,
    port: serverEnv.PORT,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
