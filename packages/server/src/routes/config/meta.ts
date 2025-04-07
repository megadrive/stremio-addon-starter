import { createRouter } from "@/util/createHono.js";
import type { MetaDetail } from "stremio-addon-sdk";
import { z } from "zod";

// should match: /:config/meta/:type/:id/:extras?.json
// ex: /configexample/meta/movie/123456.json
export const metaRouter = createRouter();

const ContentTypeSchema = z.enum(["movie", "series", "tv", "channel"]);

metaRouter.get("/:type/:id.json", async (c) => {
  const type = c.req.param("type");
  const id = c.req.param("id.json")?.replace(/\.json$/, "");

  const contentType = ContentTypeSchema.parse(type);

  c.var.logger.info(`Finding meta for ${contentType} with id ${id}`);

  const meta: MetaDetail = {
    id: "addonIdPrefix:123456",
    name: "Stremio Addon Example",
    type: contentType,
    description: "This is an example meta response.",
  };

  return c.json({ meta });
});
