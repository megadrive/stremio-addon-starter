import { Router } from "express";
import { AddonCatalog } from "stremio-addon-sdk";
import type { Request, TypedJsonResponse } from "@/util/typedJsonResponse";

export const addonCatalogRouter: Router = Router();

addonCatalogRouter.get(
  "/:type/:id/:extras?.json",
  async (req: Request, res: TypedJsonResponse<{ addons: AddonCatalog[] }>) => {
    const addonCatalogExample: AddonCatalog[] = [
      {
        manifest: {
          id: "exampleAddonId",
          name: "Example Addon",
          version: "1.0.0",
          description: "This is an example addon.",
          types: ["movie", "series"],
          catalogs: [],
          resources: ["meta"],
        },
        transportName: "http",
        transportUrl: "http://localhost:3000/manifest.json",
      },
    ];

    res.json({ addons: addonCatalogExample });
  }
);
