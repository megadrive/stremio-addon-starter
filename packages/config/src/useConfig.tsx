import { useMemo } from "react";
import { config } from "./config";

export const useConfig = (encodedConfig: string) => {
  const memoedEncodedConfig = useMemo(
    () => encodedConfig.replace(/^#/, ""),
    [encodedConfig]
  );
  const conf = useMemo(
    () => config.decode(encodedConfig),
    [memoedEncodedConfig]
  );

  return {
    config: conf,
  };
};
