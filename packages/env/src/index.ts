import "dotenv/config";
import { cleanEnv, str, num } from "envalid";

const env = cleanEnv(process.env, {
  PORT: num({ default: 3000 }),
  NODE_ENV: str({ default: "development" }),
});

export default env;
