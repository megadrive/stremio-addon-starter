import { Router } from "express";
import { Subtitle } from "stremio-addon-sdk";
import type { Request, TypedJsonResponse } from "@/util/typedJsonResponse";

export const subtitleRouter: Router = Router();

subtitleRouter.get(
  "/:type/:id.json",
  async (req: Request, res: TypedJsonResponse<{ streams: Subtitle[] }>) => {
    const subtitleExample: Subtitle[] = [
      {
        id: "addonIdPrefix:123456",
        lang: "en",
        url: "https://link.to.subtitles.com",
      },
    ];

    res.json({ streams: subtitleExample });
  },
);
