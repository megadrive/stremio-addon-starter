import { pino } from "pino";
import { pinoLogger } from "hono-pino";
import pretty from "pino-pretty";
import { serverEnv } from "@stremio-addon/env";

/**
 * Used within Hono routes, access it with `c.var.logger`
 */
export function pinoLoggerMiddleware() {
  return pinoLogger({
    pino: pino(
      {
        level: serverEnv.isDevelopment ? "debug" : "info",
      },
      serverEnv.isDevelopment ? pretty() : undefined
    ),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  });
}

/**
 * Use this instance of Pino logger in your standalone code.
 */
export const pinoLoggerStandalone = pino({
  level: serverEnv.isDevelopment ? "debug" : "info",
  transport: serverEnv.isDevelopment
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      }
    : undefined,
});
