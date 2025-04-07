import { createRouter } from "@/util/createHono.js";
import type { Subtitle } from "stremio-addon-sdk";

export const subtitleRouter = createRouter();

subtitleRouter.get("/:type/:id.json", async (c) => {
  // hono doesn't know when to stop parsing the final ID, so we need to do a workaround
  const id = c.req.param("id.json")?.replace(/\.json$/, "");

  c.var.logger.info(`Finding subtitles for ${id}`);

  const subtitles: Subtitle[] = [
    {
      id: "addonIdPrefix:123456",
      lang: "eng",
      url: "https://link.to.subtitles.com",
    },
  ];

  return c.json({ subtitles });
});
