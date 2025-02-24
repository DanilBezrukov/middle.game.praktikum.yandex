import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __API_ENDPOINT__: process.env.SERVER_PORT || {
      protocol: "http",
      domain: "localhost",
      port: 80,
      url: "http://localhost",
    },
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
  build: {
    outDir: path.join(__dirname, "dist/client"),
    manifest: true,
    rollupOptions: {
      input: {
        app: "./index.html",
        sw: "./sw.js",
      },
      output: {
        entryFileNames: assetInfo =>
          assetInfo.name === "sw" ? "[name].js" : "assets/js/[name]-[hash].js",
        format: "cjs",
      },
    },
  },
});
