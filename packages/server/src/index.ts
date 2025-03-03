import { join, resolve } from "node:path";
import express, { RequestHandler, Router } from "express";
import cors from "cors";
import { serverEnv } from "@stremio-addon/env";
import { createManifest } from "@/util/manifest";
import { Config, config } from "@stremio-addon/config";
import { metaRouter } from "@/routes/meta";
import { catalogRouter } from "@/routes/catalog";
import { streamRouter } from "@/routes/stream";
import { addonCatalogRouter } from "@/routes/addon_catalog";
import { subtitleRouter } from "@/routes/subtitle";
import expressListEndpoints from "express-list-endpoints";

const app = express();
const staticPath = resolve(join(__dirname, "../../web/dist/client"));
console.info(`Serving static files from Astro: ${staticPath}`);
app.use(express.static(staticPath));

// add support for Cross-Origin Resource Sharing (CORS), necessary for Stremio to access the addon
app.use(cors());
app.use((req, res, next) => {
  console.info(`[${req.method}] ${req.url}`);
  next();
});

// before every call, decode the config, if present
const parseConfig: RequestHandler = (req, res, next) => {
  const userConfig = req.params.config;
  console.info(`Parsing config ${userConfig}`);
  if (userConfig && userConfig.length > 0) {
    const conf = config.decode(userConfig);
    res.locals.config = conf;

    if (!conf) {
      console.error(`Invalid config: ${userConfig}`);
      res.status(500).send("Invalid config");
    }
  }

  next();
};

app.get("/", (_req, res) => {
  res.redirect("/configure");
});

// send unmodified manifest for addon sites
app.get("/manifest.json", (_req, res) => {
  const manifest = createManifest({
    id: "com.github.megadrive.stremio-addon-boilerplate-ts-unmodified",
    name: "Stremio Addon Boilerplate - Unmodified Manifest",
    idPrefixes: ["addonIdPrefix:"],
  });

  res.json(manifest);
});

// /:config/*
const configRouter = express.Router({ mergeParams: true });
configRouter.use(parseConfig);
configRouter.get("/manifest.json", (req, res) => {
  /**
   * in all responses, you can access the config by using res.locals.config,
   * it will be undefined if not provided, but a 500 error will be thrown if it is not a valid config
   */
  console.info(
    `Config: ${res.locals.config ? JSON.stringify(res.locals.config) : "undefined"}`
  );

  // TODO: "as Config" is not ideal, but it's the only way to get the type to work at the moment.
  const conf = res.locals.config as Config;

  // clone the manifest, modify it as necessary, and send it back
  const manifest = createManifest({
    id: "com.github.megadrive.stremio-addon-boilerplate-ts-parsedConfig",
    name: `Stremio Addon Boilerplate - Parsed Config Manifest - ${conf.variable1}`,
    idPrefixes: ["addonIdPrefix:"],
  });

  res.setHeader("Content-Type", "application/json");
  // long-lived cache, as the config won't change
  res.setHeader("Cache-Control", "public, max-age=31536000");
  res.json(manifest);
});

// ? Routers are added. You can leave these all as-is, as Stremio will query only the resources and types you specify in the manifest.
configRouter.use("/addon_catalog", addonCatalogRouter);
configRouter.use("/catalog", catalogRouter);
configRouter.use("/meta", metaRouter);
configRouter.use("/stream", streamRouter);
configRouter.use("/subtitle", subtitleRouter);

app.use("/:config", configRouter);

console.info(expressListEndpoints(configRouter));

app.listen(serverEnv.PORT, () => {
  console.log(
    `Server listening on port ${serverEnv.PORT} in ${serverEnv.NODE_ENV} mode`
  );
});
