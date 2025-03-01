import { z } from "zod";

/**
 * ? The config schema. Any user-configurable data should be defined here.
 * ? It gets encoded into a string and provided to the addon as a query parameter.
 *
 * If you wanted to add stuff like a debrid apikey, for instance. You would add it here.
 */
export const ConfigSchema = z.object({
  variable1: z.string().min(1, { message: "Variable 1 is required" }),
});
export type Config = z.infer<typeof ConfigSchema>;

type EncoderFunc = (data: Config) => string;
type DecoderFunc = (data: string) => Config;

const builtinEncoder: EncoderFunc = (data) => btoa(JSON.stringify(data));
const builtinDecoder: DecoderFunc = (data) => JSON.parse(atob(data));

export const config = {
  /**
   * Decodes the config from a string.
   * @param data Datastring from a URL
   * @param decoder a custom decoder function. By default, it decodes a base64 string to an object
   * @returns Config object or undefined if decoding failed
   */
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
  /**
   * Encodes the config into a string.
   * @param data Config object to encode
   * @param encoder a custom encoder function. By default, it encodes a stringified object to base64
   * @returns Encoded string
   */
  encode: (data: Config, encoder?: EncoderFunc): string => {
    if (encoder) {
      return encoder(data);
    }

    return builtinEncoder(data);
  },
};
