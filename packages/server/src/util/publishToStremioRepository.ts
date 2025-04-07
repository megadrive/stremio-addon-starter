import { pinoLoggerStandalone as logger } from "@/middleware/pinoLogger.js";
import readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import { z } from "zod";

/**
 * !IMPORTANT!
 *
 * You only need to publish to the official repository if you intend the addon to be used by the public.
 *
 * You also only need to publish your addon _once_.
 */

const DEFAULT_API_URL = "https://api.strem.io";

class PublishError extends Error {
  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = "PublishError";
    this.cause = cause;
  }
}

const publishToCentral = async (addonURL: string, apiURL = DEFAULT_API_URL) => {
  try {
    const res = await fetch(`${apiURL}/api/addonPublish`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transportUrl: addonURL, transportName: "http" }),
    });
    if (!res.ok) {
      throw new PublishError(
        "Failed to publish to stremio official repository",
        res.statusText
      );
    }

    const json = (await res.json()) as { error?: string; result?: string };
    if (json.error) {
      throw new PublishError(
        `Failed to publish to stremio official repository`,
        json
      );
    }
    logger.info(json);
  } catch (error) {
    logger.error(error);
  }
};

/**
 *
 */
(() => {
  const rl = readline.createInterface({ input, output });
  rl.question(
    "Please enter the URL to your addon manifest: ",
    (url: string) => {
      rl.close();

      // must be a valid, HTTPS URL
      const parsedUrl = z.string().startsWith("https://").url().safeParse(url);
      if (!parsedUrl.success) {
        console.error("Invalid URL provided");
        return;
      }

      console.log(
        `Publishing to the official Stremio repository with URL: ${url}`
      );

      publishToCentral(parsedUrl.data).catch((error) => {
        console.error("Error publishing to Stremio repository:", error);
        process.exit(1);
      });

      console.log(`Successfully published to the official Stremio repository.`);
    }
  );
})();
