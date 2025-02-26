import { join, resolve } from "node:path";
import express, { Router } from "express";
import cors from "cors";
import { serverEnv } from "@stremio-addon/core";
import { createManifest } from "@/util/manifest";
import { config } from "@stremio-addon/core";
import { metaRouter } from "@/routes/meta";
import { catalogRouter } from "@/routes/catalog";
import { streamRouter } from "./routes/stream";
import { addonCatalogRouter } from "./routes/addon_catalog";
import { subtitleRouter } from "./routes/subtitle";

const app = express();
const staticPath = resolve(join(__dirname, "../../web/dist/client"));
console.info(`Serving static files from Astro: ${staticPath}`);
app.use(express.static(staticPath));

// add support for Cross-Origin Resource Sharing (CORS), necessary for Stremio to access the addon
app.use(cors());

const router = Router();

// before every call, decode the config, if present
router.use("/:config?/*", (req, res, next) => {
  const userConfig = req.params.config;
  console.log("userConfig", userConfig);
  if (userConfig) {
    const conf = config.decode(userConfig);
    res.locals.config = conf;
  }

  next();
});

router.get("/", (req, res) => {
  res.redirect("/configure");
});

router.get("/manifest.json", (req, res) => {
  // in all responses, you can access the config by using res.locals.config, it will be undefined if not provided

  // clone the manifest, modify it as necessary, and send it back
  const manifest = createManifest({
    id: "com.huge",
    name: "Huge",
    idPrefixes: ["addonIdPrefix:"],
  });

  res.json(manifest);
});

// ? Routers are added. You can leave these all as-is, as Stremio will query only the resources and types you specify in the manifest.
router.use("/addon_catalog", addonCatalogRouter);
router.use("/catalog", catalogRouter);
router.use("/meta", metaRouter);
router.use("/stream", streamRouter);
router.use("/subtitle", subtitleRouter);

app.use(router);

app.listen(serverEnv.PORT, () => {
  console.log(
    `Server listening on port ${serverEnv.PORT} in ${serverEnv.NODE_ENV} mode`
  );
});
