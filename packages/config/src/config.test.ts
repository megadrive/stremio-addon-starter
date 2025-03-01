import { expect, test } from "vitest";
import { config, type Config } from "./config";

const data: Config = {
  variable1: "abcdef",
};

test("config encodes to a string", () => {
  const encoded = config.encode(data);
  expect(encoded).toBeTypeOf("string");
  expect(encoded).length.greaterThan(0);
});

test("config decodes from a string and to the correct object", () => {
  const encoded = config.encode(data);

  const decoded = config.decode(encoded);
  expect(decoded).toBeTypeOf("object");
  expect(decoded).toEqual({ ...data });
});
