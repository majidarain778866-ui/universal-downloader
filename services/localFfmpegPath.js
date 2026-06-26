import ffmpeg from "@ffmpeg-installer/ffmpeg";
import { execSync } from "node:child_process";

export const resolveLocalFfmpegPath = () => {
  if (process.platform !== "win32") {
    try {
      execSync("ffmpeg -version", { stdio: "ignore" });
      return "ffmpeg";
    } catch {
      // fallback
    }
  }
  return ffmpeg.path;
};
