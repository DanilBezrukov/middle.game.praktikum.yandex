import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";

import fs from "fs/promises";
import { createServer as createViteServer, ViteDevServer } from "vite";

const port = process.env.PORT || 80;
const clientPath = path.join(__dirname, "..");
const isDev = process.env.NODE_ENV === "development";

const manifestPath = path.join(clientPath, "dist", "server", ".vite", "manifest.json");

async function createServer() {
  const app = express();
  let vite: ViteDevServer | undefined;
  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(clientPath, "dist/client"), { index: false }));
  }

  app.get("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let render: () => Promise<string>;
      let template: string;

      if (vite) {
        template = await fs.readFile(path.resolve(clientPath, "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule(path.join(clientPath, "src/entry-server.tsx"))).render;
      } else {
        const manifestContent = await fs.readFile(manifestPath, "utf-8");
        const manifest = JSON.parse(manifestContent);
        const entryServerPath = manifest["src/entry-server.tsx"].file;

        template = await fs.readFile(path.join(clientPath, "dist/client/index.html"), "utf-8");
        const pathToServer = path.join(clientPath, "dist/server", entryServerPath);
        render = (await import(pathToServer)).render;
      }

      const appHtml = await render();

      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Client is listening on port: ${port}`);
  });
}

createServer().then();
