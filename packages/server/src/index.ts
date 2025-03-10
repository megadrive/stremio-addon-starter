import { join, resolve } from "node:path";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { serverEnv } from "@stremio-addon/env";
import { addonManifest, createManifest } from "@/util/manifest";
import { metaRouter } from "@/routes/meta";
import { catalogRouter } from "@/routes/catalog";
import { streamRouter } from "@/routes/stream";
import { subtitleRouter } from "@/routes/subtitle";
import { manifestRouter } from "@/routes/manifest";
import { parseConfig } from "@/middleware/parseConfig";

const app = express();
// the reason this is only serving "client" is because this is the server, and /server is astro's dev server.
const staticPath = resolve(join(__dirname, "../../web/dist/client"));
console.info(`Serving static files from Astro: ${staticPath}`);
app.use(express.static(staticPath));

// add helmet headers. cors is set next on purpose so it overrides the helmet-set headers.
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
  })
);
// add support for Cross-Origin Resource Sharing (CORS), necessary for Stremio to access the addon
app.use(cors());
app.use((req, res, next) => {
  console.info(`[${req.method}] ${req.url}`);
  next();
});

// most addons will not have a landing page, so redirect to /configure
// if you want to add a landing page, add "index.astro" to the "packages/web/pages" folder
app.get("/", (_req, res) => {
  if (serverEnv.isDevelopment) {
    res.redirect("http://localhost:4321/configure");
    return;
  }

  res.redirect("/configure");
});

app.get("/:config/configure", (req, res) => {
  res.redirect("/configure#" + req.params.config);
});

// send unmodified manifest for addon sites
app.get("/manifest.json", (_req, res) => {
  const manifest = createManifest({
    ...addonManifest,
  });

  res.json(manifest);
});

// /:config/*
const configRouter = express.Router({ mergeParams: true });
configRouter.use(parseConfig);

// ? Routers are added. You can leave these all as-is, as Stremio will query only the resources and types you specify in the manifest.
// ? Modify these to your liking. They live in /routes
configRouter.use("/manifest.json", manifestRouter);
configRouter.use("/catalog", catalogRouter);
configRouter.use("/meta", metaRouter);
configRouter.use("/stream", streamRouter);
configRouter.use("/subtitle", subtitleRouter);

// add the /:config/* routes
app.use("/:config", configRouter);

app.listen(serverEnv.PORT, () => {
  console.log(
    `Server listening on port ${serverEnv.PORT} in ${serverEnv.NODE_ENV} mode`
  );
});
