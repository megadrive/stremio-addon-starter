import express from "express";
import cors from "cors";
import { serverEnv } from "@stremio-addon/core";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(serverEnv.PORT, () => {
  console.log(
    `Server listening on port ${serverEnv.PORT} in ${serverEnv.NODE_ENV} mode`
  );
});
