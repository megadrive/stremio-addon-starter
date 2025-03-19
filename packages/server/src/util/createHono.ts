import { Hono } from "hono";
import { type Config } from "@stremio-addon/config";
import { pinoLoggerMiddleware } from "@/middleware/pinoLogger.js";
import { cors } from "hono/cors";
import type { PinoLogger } from "hono-pino";
import { serveEmojiFavicon } from "stoker/middlewares";

type Bindings = {
  Variables: {
    config?: Config;
    logger: PinoLogger;
  };
};

export function createApp() {
  return new Hono<Bindings>({ strict: false })
    .use(serveEmojiFavicon("📺"))
    .use(pinoLoggerMiddleware())
    .use(cors());
}

export function createRouter() {
  return new Hono<Bindings>({ strict: false });
}
