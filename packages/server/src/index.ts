import express from "express";
import cors from "cors";
import { serverEnv } from "@stremio-addon/core";
import { manifestBase } from "./util/manifest";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/:config?/manifest.json", (req, res) => {
  // clone the manifest, modify it as necessary, and send it back
  const manifest = { ...manifestBase };

  res.json(manifest);
});

app.listen(serverEnv.PORT, () => {
  console.log(
    `Server listening on port ${serverEnv.PORT} in ${serverEnv.NODE_ENV} mode`
  );
});
