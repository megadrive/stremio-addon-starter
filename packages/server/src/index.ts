import express from "express";
import cors from "cors";
import env from "env";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(env.PORT, () => {
  console.log(`Server listening on port ${env.PORT} in ${env.NODE_ENV} mode`);
});
