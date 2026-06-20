import { build } from "esbuild";
import { mkdir, rm, cp } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");
const publicDir = path.join(root, "public");

await rm(distDir, { recursive: true, force: true });
await mkdir(path.join(distDir, "assets"), { recursive: true });

// copy HTML
await cp(
  path.join(publicDir, "index.html"),
  path.join(distDir, "index.html")
);

// build JS
await build({
  entryPoints: [path.join(root, "src", "main.js")],
  bundle: true,
  minify: true,
  format: "esm",
  target: ["es2019"],
  outfile: path.join(distDir, "assets", "main.js"),
});