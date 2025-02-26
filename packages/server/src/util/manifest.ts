import type { Manifest } from "stremio-addon-sdk";

/**
 * The manifest base of the addon.
 *
 * This gets cloned and modified when a user installs the addon in server.
 */
const manifestBase: Manifest = {
  id: "com.github.megadrive.stremio-addon-boilerplate-ts",
  name: "Stremio Addon Boilerplate",
  description: "A boilerplate for making Stremio Addons in TypeScript",
  version: "0.0.0",
  catalogs: [],
  resources: ["meta"],
  types: ["movie", "series"],
};

export const createManifest = (
  opts: Pick<Manifest, "id" | "name"> & Partial<Omit<Manifest, "id" | "name">>
): Manifest => {
  return {
    ...manifestBase,
    ...opts,
  };
};

/**
 * If you like, you can export your own custom manifestBase here.
 */
export const manifestBaseCustom: Manifest = createManifest({
  id: "com.github.megadrive.stremio-addon-boilerplate-ts",
  name: "Stremio Addon Boilerplate",
});
