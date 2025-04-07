import { createRouter } from "@/util/createHono.js";
import type { Subtitle } from "stremio-addon-sdk";

export const subtitleRouter = createRouter();

subtitleRouter.get("/:type/:id.json", async (c) => {
  const config = c.var.config;
  const type = c.req.param("type");
  // hono doesn't know when to stop parsing the final ID, so we need to do a workaround
  const id = c.req.param("id.json")?.replace(/\.json$/, "") ?? "";

  const subtitleExample: Subtitle[] = [
    {
      id: "addonIdPrefix:123456",
      lang: "eng",
      url: "https://link.to.subtitles.com",
    },
  ];

  return c.json({ subtitles: subtitleExample });
});
