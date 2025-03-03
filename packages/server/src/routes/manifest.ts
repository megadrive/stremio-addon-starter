import { Router } from "express";
import { Manifest } from "stremio-addon-sdk";
import type { Request, TypedJsonResponse } from "@/util/typedJsonResponse";
import { Config } from "@stremio-addon/config";
import { addonManifest, createManifest } from "@/util/manifest";

// should match: /:config/manifest.json
export const manifestRouter: Router = Router({ mergeParams: true }).get(
  "/:type/:id/:extras?.json",
  async (req: Request, res: TypedJsonResponse<Manifest>) => {
    /**
     * In all responses, you can access the config by using res.locals.config.
     *
     * NOTE: ASIDE FROM `/:config/manifest.json`, if a config is not provided,
     * the server will return a 500 error as it is required.
     */
    console.info(
      `Config: ${res.locals.config ? JSON.stringify(res.locals.config) : "undefined"}`
    );

    // TODO: "as Config" is not ideal, but it's the only way to get the type to work at the moment.
    const conf = res.locals.config as Config | undefined;
    // create a copy of an unmodified manifest
    let manifest = createManifest(addonManifest);

    // if we have a configuration, make changes as necessary
    if (conf) {
      const { name } = addonManifest;
      manifest = createManifest({
        ...addonManifest,
        name: `${name} - configured with ${conf.variable1}`,
      });
    }

    res.setHeader("Content-Type", "application/json");
    // long-lived cache, as the config very likely won't change
    res.setHeader("Cache-Control", "public, max-age=31536000");
    res.json(manifest);
  }
);
