import { createWriteStream, existsSync, unlinkSync } from "node:fs";
import { chmod, cp, mkdir, mkdtemp, rm } from "node:fs/promises";
import https from "node:https";
import { join } from "node:path";
import { tmpdir } from "node:os";

const downloadUrl = "https://registry.npmjs.org/@ffmpeg-installer/linux-x64/-/linux-x64-4.1.0.tgz";
const dir = join(process.cwd(), "netlify", "functions", "bin");
const destPath = join(dir, "ffmpeg");

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

const extractBinary = async (archivePath, extractDir) => {
  const { spawn } = await import("node:child_process");
  await new Promise((resolve, reject) => {
    const child = spawn("tar", ["-xzf", archivePath, "-C", extractDir]);
    let stderr = "";
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(stderr || "tar extraction failed."));
    });
  });
};

(async () => {
  const tempDir = await mkdtemp(join(tmpdir(), "social-downloader-ffmpeg-"));
  const archivePath = join(tempDir, "ffmpeg.tgz");
  const extractedDir = join(tempDir, "package");

  try {
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
    }

    await download(downloadUrl, archivePath);
    await extractBinary(archivePath, tempDir);
    await cp(join(extractedDir, "ffmpeg"), destPath, { force: true });

    if (process.platform !== "win32") {
      await chmod(destPath, 0o755);
    }

    console.log("ffmpeg standalone binary installed successfully!");
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    await rm(tempDir, { recursive: true, force: true }).catch(() => {});
  }
})();
