"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const promises_1 = __importDefault(require("fs/promises"));
const vite_1 = require("vite");
const port = process.env.PORT || 80;
const clientPath = path_1.default.join(__dirname, "..");
const isDev = process.env.NODE_ENV === "development";
const manifestPath = path_1.default.join(clientPath, "dist", "server", "manifest.json");
async function createServer() {
    const app = (0, express_1.default)();
    app.use((0, cookie_parser_1.default)());
    let vite;
    if (isDev) {
        vite = await (0, vite_1.createServer)({
            server: { middlewareMode: true },
            root: clientPath,
            appType: "custom",
        });
        app.use(vite.middlewares);
    }
    else {
        app.use(express_1.default.static(path_1.default.join(clientPath, "dist/client"), { index: false }));
    }
    app.use("/api/v2", (0, http_proxy_middleware_1.createProxyMiddleware)({
        changeOrigin: true,
        cookieDomainRewrite: {
            "*": "",
        },
        timeout: 5000,
        proxyTimeout: 5000,
        onProxyReq: http_proxy_middleware_1.fixRequestBody,
        target: "https://ya-praktikum.tech",
    }));
    app.get("*", async (req, res, next) => {
        var _a;
        const url = req.originalUrl;
        try {
            let render;
            let template;
            if (vite) {
                template = await promises_1.default.readFile(path_1.default.resolve(clientPath, "index.html"), "utf-8");
                template = await vite.transformIndexHtml(url, template);
                render = (await vite.ssrLoadModule(path_1.default.join(clientPath, "src/entry-server.tsx"))).render;
            }
            else {
                const manifestContent = await promises_1.default.readFile(manifestPath, "utf-8");
                const manifest = JSON.parse(manifestContent);
                const entryServerPath = manifest["src/entry-server.tsx"].file;
                template = await promises_1.default.readFile(path_1.default.join(clientPath, "dist/client/index.html"), "utf-8");
                const pathToServer = path_1.default.join(clientPath, "dist/server", entryServerPath);
                render = (await (_a = pathToServer, Promise.resolve().then(() => __importStar(require(_a))))).render;
            }
            const { appHtml, initialState } = await render(req);
            const html = template
                .replace(`<!--ssr-outlet-->`, appHtml)
                .replace(`<!--ssr-initial-state-->`, `<script>window.APP_INITIAL_STATE = ${JSON.stringify(initialState)}</script>`);
            res.status(200).set({ "Content-Type": "text/html" }).send(html);
        }
        catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);
            isDev && vite.ssrFixStacktrace(e);
            next(e);
        }
    });
    app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`Client is listening on port: ${port}`);
    });
}
createServer().then();
