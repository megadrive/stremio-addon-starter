import type { Manifest } from "stremio-addon-sdk";

/**
 * The manifest base of the addon.
 *
 * This gets cloned and modified when a user installs the addon in server.
 */
export const manifestBase: Manifest = {
  id: "com.github.megadrive.stremio-addon-boilerplate-ts",
  name: "Stremio Addon Boilerplate",
  description: "A boilerplate for making Stremio Addons in TypeScript",
  version: "0.0.0",
  catalogs: [],
  resources: ["meta"],
  types: ["movie", "series"],
};
