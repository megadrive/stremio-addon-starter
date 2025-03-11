import { Hono } from "hono";
import { createManifest } from "@/util/manifest.js";
import { parseConfigFromUrl } from "@/middleware/parseConfigFromUrl.js";
import { serverEnv } from "@stremio-addon/env";

export const manifestRouter = new Hono();

manifestRouter.get("/", parseConfigFromUrl, async (c) => {
  const config = c.get("config");

  const manifest = createManifest({
    id: "com.example.addon",
    name: `Example Addon with config ${Object.keys(config).join(", ")}`,
    version: `1.0.0${serverEnv.isDev ? "-dev" : ""}`,
  });

  return c.json(manifest);
});
