import "dotenv/config";
import { cleanEnv, str, num } from "envalid";

/**
 * Environment variables.
 */
export const serverEnv = cleanEnv(process.env, {
  PORT: num({ default: 3000 }),
  NODE_ENV: str({ default: "development" }),
});
