import { z } from "zod";

/**
 * The config schema. Any user-configurable data should be defined here.
 * It gets encoded into a string and provided to the addon as a query parameter.
 */
const ConfigSchema = z.object({
  variable1: z.string(),
});
type Config = z.infer<typeof ConfigSchema>;

type EncoderFunc = (data: Config) => string;
type DecoderFunc = (data: string) => Config;

const builtinEncoder: EncoderFunc = (data) => btoa(JSON.stringify(data));
const builtinDecoder: DecoderFunc = (data) => JSON.parse(atob(data));

export const config = {
  decode: (data: string, decoder?: DecoderFunc): Config | undefined => {
    if (decoder) {
      return decoder(data);
    }

    try {
      const decoded = builtinDecoder(data);
      const parsed = ConfigSchema.parse(decoded);

      return parsed;
    } catch (e) {
      console.error("Could not decode config", e);
    }

    return undefined;
  },
  encode: (data: Config, encoder?: EncoderFunc): string => {
    if (encoder) {
      return encoder(data);
    }

    return builtinEncoder(data);
  },
};
