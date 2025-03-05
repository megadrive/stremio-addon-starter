import { Router } from "express";
import { MetaDetail } from "stremio-addon-sdk";
import type { Request, TypedJsonResponse } from "@/util/typedJsonResponse";

// should match: /:config/meta/:type/:id/:extras?.json
// ex: /configexample/meta/movie/123456.json
export const metaRouter: Router = Router({ mergeParams: true }).get(
  "/:type/:id.json",
  async (req: Request, res: TypedJsonResponse<{ meta: MetaDetail }>) => {
    const metaExample: MetaDetail = {
      id: "addonIdPrefix:123456",
      name: "Stremio Addon Example",
      type: "movie",
      description: "This is an example meta response.",
    };

    res.json({ meta: metaExample });
  }
);
