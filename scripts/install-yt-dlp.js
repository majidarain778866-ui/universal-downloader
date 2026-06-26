import { createWriteStream, existsSync, unlink } from "node:fs";
import { chmod, mkdir } from "node:fs/promises";
import https from "node:https";
import path from "node:path";

const targetPlatform = String(process.env.YTDLP_TARGET_PLATFORM || process.platform).toLowerCase();
const isWin = targetPlatform === "win32" || targetPlatform === "windows";
const binaryName = isWin ? "yt-dlp.exe" : "yt-dlp";
const staleBinaryName = isWin ? "yt-dlp" : "yt-dlp.exe";
const releaseAsset = isWin ? "yt-dlp.exe" : "yt-dlp_linux";
const downloadUrl = `https://github.com/yt-dlp/yt-dlp/releases/latest/download/${releaseAsset}`;

const dir = path.join(process.cwd(), "netlify", "functions", "bin");
const destPath = path.join(dir, binaryName);
const stalePath = path.join(dir, staleBinaryName);

console.log(`Downloading ${downloadUrl} to ${destPath}`);

import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

const download = async (url, dest) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download: ${response.statusText} (${response.status})`);
  }
  const fileStream = createWriteStream(dest);
  await pipeline(Readable.fromWeb(response.body), fileStream);
};

(async () => {
  try {
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
    }
    await download(downloadUrl, destPath);
    if (!isWin) {
      await chmod(destPath, 0o755);
    }
    console.log("yt-dlp standalone binary installed successfully!");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
