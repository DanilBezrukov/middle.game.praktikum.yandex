import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import express from "express";
import { db } from "./db";
import routers from "./routes/index";

const app = express();
app.use(cors());
const port = Number(process.env.SERVER_PORT) || 3001;

app.use("/own-server", routers);

app.get("/", async (_, res) => {
  res.json("👋 Howdy from the server :)");
});

db.sync({ force: true })
  .then(async () => {
    app.listen(port, async () => {
      // eslint-disable-next-line no-console
      console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
    });
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.log(err);
  });
