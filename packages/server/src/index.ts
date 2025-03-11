import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { serverEnv } from "@stremio-addon/env";
import { manifestRoutes } from "./routes/manifest.js";
import { addonManifest, createManifest } from "./util/manifest.js";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { metaRouter } from "./routes/meta.js";
import { catalogRouter } from "./routes/catalog.js";
import { streamRouter } from "./routes/stream.js";
import { subtitleRouter } from "./routes/subtitle.js";

const app = new Hono();

app.use(cors());
app.use(logger());

app.get("/", (c) => {
  return c.redirect("/configure");
});

app.get("/manifest.json", (c) => {
  const manifest = createManifest({ ...addonManifest });
  return c.json(manifest);
});

const configRoute = new Hono();
configRoute.route("/manifest.json", manifestRoutes);
configRoute.route("/catalog", catalogRouter);
configRoute.route("/meta", metaRouter);
configRoute.route("/stream", streamRouter);
configRoute.route("/subtitle", subtitleRouter);

app.route("/:config", configRoute);

serve(
  {
    fetch: app.fetch,
    port: serverEnv.PORT,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
