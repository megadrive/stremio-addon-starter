import { z } from "zod";

const ExtrasTypesSchema = z.enum(["skip", "genre", "search"]);

const ExtraSkipSchema = z.object({
  skip: z.coerce.number(),
});
const ExtraGenreSchema = z.object({
  genre: z.string(),
});
const ExtraSearchSchema = z.object({
  search: z.string(),
});
const ExtrasSchema = z.union([
  ExtraSkipSchema,
  ExtraGenreSchema,
  ExtraSearchSchema,
]);
type Extras = z.infer<typeof ExtrasSchema>;

/**
 * Converts an extras string to an object. Returns undefined if no extras are found.
 * @param extras `skip=blah&genre=whatever
 */
export const parseExtras = (extras?: string): Partial<Extras> => {
  if (!extras) {
    return {};
  }

  // Split the extras string into key-value pairs
  // and map them to an object
  // e.g. "skip=blah&genre=whatever" => [{ key: "skip", value: "blah" }, { key: "genre", value: "whatever" }]
  const mapped = extras.split("&").map((extra) => {
    const [key, value] = extra.split("=");
    return { key, value };
  });

  // Create an object from the mapped array
  // e.g. [{ key: "skip", value: "blah" }, { key: "genre", value: "whatever" }] => { skip: "blah", genre: "whatever" }
  const extrasObject = Object.fromEntries(
    mapped.map(({ key, value }) => {
      // Check if the key is a valid extras type
      if (ExtrasTypesSchema.safeParse(key).success) {
        return [key, value];
      }
      return [key, undefined];
    })
  );

  // Validate the extras object against the ExtrasSchema
  const parsedExtras = ExtrasSchema.safeParse(extrasObject);
  if (!parsedExtras.success) {
    // If the extras object is not valid, return an empty object
    return {};
  }

  return parsedExtras.data;
};
