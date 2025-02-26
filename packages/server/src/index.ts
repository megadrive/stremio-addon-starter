import express from "express";
import cors from "cors";
import { serverEnv } from "@stremio-addon/core";
import { createManifest } from "./util/manifest";
import { config } from "@stremio-addon/core";

const app = express();

app.use(cors());

// before every call, decode the config, if present
app.use("/:config?", (req, res, next) => {
  const userConfig = req.params.config ?? "";
  const conf = config.decode(userConfig);
  res.locals.config = conf;

  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/manifest.json", (req, res) => {
  // in all responses, you can access the config by using res.locals.config

  // clone the manifest, modify it as necessary, and send it back
  const manifest = createManifest({
    id: "com.huge",
    name: "Huge",
  });

  res.json(manifest);
});

app.listen(serverEnv.PORT, () => {
  console.log(
    `Server listening on port ${serverEnv.PORT} in ${serverEnv.NODE_ENV} mode`
  );
});
