import { Router } from "express";
import { Stream } from "stremio-addon-sdk";
import type { Request, TypedJsonResponse } from "@/util/typedJsonResponse";

export const streamRouter: Router = Router();

streamRouter.get(
  "/:type/:id.json",
  async (req: Request, res: TypedJsonResponse<{ streams: Stream[] }>) => {
    const { type, id } = req.params;
    console.log({ type, id });

    // Do some logic here to determine what streams to return based on the type and id

    const streamExample: Stream[] = [
      {
        name: "An example stream that shows up on everything",
        ytId: "dQw4w9WgXcQ",
      },
    ];

    res.json({ streams: streamExample });
  },
);
