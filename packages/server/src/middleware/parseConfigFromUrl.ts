import type { AppBindingsWithConfig } from "@/util/createHono.js";
import { config } from "@stremio-addon/config";
import { createMiddleware } from "hono/factory";
import { FORBIDDEN } from "stoker/http-status-codes";
import { FORBIDDEN as FORBIDDEN_TEXT } from "stoker/http-status-phrases";

class ConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigError";
  }
}

/**
 * Middleware to parse the config from the URL and set it in the context.
 */
export const parseConfigFromUrl = createMiddleware<AppBindingsWithConfig>(
  async (c, next) => {
    const configString = c.req.param("config");

    try {
      // Check if the request is not an API request and if the config string is present
      if (!c.req.routePath.startsWith("/api") && configString) {
        const conf = await config.decode(configString);
        if (!conf) throw new ConfigError("Invalid config");
        c.set("config", conf);
        /** Useful for comparisons */
        c.set("configString", configString);
      }
    } catch (error) {
      if (error instanceof Error) {
        c.var.logger.error(error);
      }
      c.text(FORBIDDEN_TEXT, FORBIDDEN);
    }

    await next();
  }
);
