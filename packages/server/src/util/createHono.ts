import { Hono } from "hono";
import { type Config } from "@stremio-addon/config";
import { pinoLoggerMiddleware } from "@/middleware/pinoLogger.js";
import { cors } from "hono/cors";
import type { PinoLogger } from "hono-pino";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { parseConfigFromUrl } from "@/middleware/parseConfigFromUrl.js";

type Bindings = {
  Variables: {
    logger: PinoLogger;
  };
};

type BindingsWithConfig = Bindings & {
  Variables: {
    config: Config;
  };
};

export function createApp() {
  return new Hono<Bindings>({ strict: false })
    .use(serveEmojiFavicon("📺"))
    .use(pinoLoggerMiddleware())
    .use(cors())
    .onError(onError)
    .notFound(notFound);
}

export function createRouter() {
  return new Hono<BindingsWithConfig>({ strict: false }).use(
    parseConfigFromUrl
  );
}
