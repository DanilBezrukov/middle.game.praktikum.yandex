import dotenv from "dotenv";
dotenv.config({ path: ".env.dev" });

import cors from "cors";
import express, { json } from "express";
import { db } from "./db";
import helmet from "helmet";
import xss from "xss-clean";
import { initReactions } from "./services/initReactions";
import { router } from "./routes/router";
import cookieParser from "cookie-parser";

const port = Number(process.env.SERVER_PORT) || 3001;
const apiPath = process.env.OWNER_SERVER_POINT || "/owner-server";

function createServer() {
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(xss());
  app.use(json());
  app.use(cookieParser());

  app.use(apiPath, router);

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
