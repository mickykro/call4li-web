import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "3000-iekcd7oisjr62i1rjjagu-5aa85d45.sg1.manus.computer",
      ".manus.computer",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
    hmr: {
      overlay: false,
    },
    watch: {
      // 1. Increase stability threshold to 1 second. 
      // This tells Vite: "Wait until the file has stopped changing for 1000ms 
      // before you try to restart the server."
      awaitWriteFinish: {
        stabilityThreshold: 1000, 
        pollInterval: 100,
      },
      // 2. Explicitly ignore the config files that are crashing the bootstrapper.
      // If you change these, you can just manually restart the terminal.
      ignored: [
        "**/package.json",
        "**/tsconfig.json",
        "**/tsconfig.node.json",
        "**/.env.local",
        "**/node_modules/**",
        "**/.git/**",
        "**/dist/**",
        "**/.claude/**",
        "**/.gemini/**",
        "**/brain/**",
        "**/_agents/**",
        "**/attached_assets/**",
        "**/*.tsbuildinfo",
      ],
    },
  },
});
