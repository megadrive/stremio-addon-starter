import { config } from "@stremio-addon/config";
import type { RequestHandler } from "express";

// before every call, decode the config, if present
export const parseConfig: RequestHandler = (req, res, next) => {
  const userConfig = req.params.config;
  console.info(`Parsing config ${userConfig}`);
  if (userConfig && userConfig.length > 0) {
    const conf = config.decode(userConfig);
    res.locals.config = conf;

    if (!conf) {
      console.error(`Invalid config: ${userConfig}`);
      res.status(500).send("Invalid config");
    }
  }

  next();
};
