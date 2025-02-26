import { Router } from "express";
import { MetaDetail } from "stremio-addon-sdk";

export const metaRouter: Router = Router();

type MetaResponse = {
  meta: MetaDetail;
};

metaRouter.get("/:type/:id.json", async (req, res) => {
  const metaExample: MetaDetail = {
    id: "addonIdPrefix:123456",
    name: "Stremio Addon Example",
    type: "movie",
    description: "This is an example meta response.",
  };

  res.json(metaExample);
});
