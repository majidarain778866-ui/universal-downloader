import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";

const serviceDir = fileURLToPath(new URL(".", import.meta.url));

export const resolveBundledFfmpegPath = () => {
  const paths = [
    join(serviceDir, "..", "netlify", "functions", "bin", "ffmpeg"),
    join(process.cwd(), "netlify", "functions", "bin", "ffmpeg"),
    join(process.cwd(), "bin", "ffmpeg"),
    join(serviceDir, "bin", "ffmpeg")
  ];
  return paths.find(p => existsSync(p)) || paths[0];
};
