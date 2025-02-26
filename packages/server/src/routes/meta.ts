import { Router } from "express";
import { MetaDetail } from "stremio-addon-sdk";
import type { Request, TypedJsonResponse } from "../util/typedJsonResponse";

export const metaRouter: Router = Router();

metaRouter.get(
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
