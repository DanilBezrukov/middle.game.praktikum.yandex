import dotenv from "dotenv";
dotenv.config({ path: ".env.dev" });

import cors from "cors";
import express, { json } from "express";
import { db } from "./db";
import { forumRouter } from "./routes/forum.router";
import helmet from "helmet";
// @ts-ignore
import xss from "xss-clean";
import { initReactions } from "./services/initReactions";

const port = Number(process.env.SERVER_PORT) || 3001;

function createServer() {
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(xss());
  app.use(json());

  app.use("/api", forumRouter);

  app.listen(port, async () => {
    await initReactions();
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
}

db.sync({ force: true })
  .then(createServer)
  .catch(err => {
    console.log(err);
  });
