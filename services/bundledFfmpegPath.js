import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";
import { prepareServerlessBinary } from "./videoService.js";

const serviceDir = fileURLToPath(new URL(".", import.meta.url));

export const resolveBundledFfmpegPath = () => {
  const paths = [
    join(serviceDir, "..", "netlify", "functions", "bin", "ffmpeg"),
    join(process.cwd(), "netlify", "functions", "bin", "ffmpeg"),
    join(process.cwd(), "bin", "ffmpeg"),
    join(serviceDir, "bin", "ffmpeg")
  ];
  const found = paths.find(p => existsSync(p)) || paths[0];
  return prepareServerlessBinary(found, "ffmpeg");
};
