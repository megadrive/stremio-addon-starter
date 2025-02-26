import express, { Router } from "express";
import cors from "cors";
import { serverEnv } from "@stremio-addon/core";
import { createManifest } from "./util/manifest";
import { config } from "@stremio-addon/core";
import { metaRouter } from "./routes/meta";
import { join } from "node:path";

const app = express();
app.use(express.static(join(__dirname, "../../../web/dist")));

// add support for Cross-Origin Resource Sharing (CORS), necessary for Stremio to access the addon
app.use(cors());

const router = Router();

// before every call, decode the config, if present
router.use("/:config?", (req, res, next) => {
  const userConfig = req.params.config;
  console.log("userConfig", userConfig);
  if (userConfig) {
    const conf = config.decode(userConfig);
    res.locals.config = conf;
  }

  next();
});

router.get("/", (req, res) => {
  res.send("Hello World!");
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

router.use("/meta", metaRouter);

app.use(router);

app.listen(serverEnv.PORT, () => {
  console.log(
    `Server listening on port ${serverEnv.PORT} in ${serverEnv.NODE_ENV} mode`
  );
});
