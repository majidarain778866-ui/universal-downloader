import ffmpeg from "@ffmpeg-installer/ffmpeg";
import ffprobe from "@ffprobe-installer/ffprobe";
import { execSync } from "node:child_process";
import { dirname } from "node:path";

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

export const getFfmpegEnv = () => {
  const env = { ...process.env };
  const pathKey = Object.keys(env).find(k => k.toLowerCase() === "path") || "PATH";
  
  const extraPaths = [];
  if (ffmpeg && ffmpeg.path) {
    extraPaths.push(dirname(ffmpeg.path));
  }
  if (ffprobe && ffprobe.path) {
    extraPaths.push(dirname(ffprobe.path));
  }

  if (extraPaths.length > 0) {
    env[pathKey] = [...extraPaths, env[pathKey]].filter(Boolean).join(process.platform === "win32" ? ";" : ":");
  }
  return env;
};
