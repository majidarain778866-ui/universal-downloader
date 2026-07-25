import { getCachedDownload } from "../services/videoService.js";
import { Readable } from "node:stream";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Range");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { id, preview } = req.query || {};
  if (!id) {
    return res.status(400).json({ error: "Missing download ID." });
  }

  let cached;
  try {
    cached = getCachedDownload(id);
  } catch {
    cached = null;
  }

  if (!cached) {
    return res.status(404).json({ error: "Download link expired. Please fetch the media again." });
  }

  const targetUrl = cached.url || cached.sourceUrl;
  if (!targetUrl || !targetUrl.startsWith("http")) {
    return res.status(400).json({ error: "No direct media URL available. Please fetch the media again." });
  }

  // Preview mode — just redirect, no download
  if (preview === "1") {
    return res.redirect(302, targetUrl);
  }

  // Download mode — stream through Vercel with proper pipe
  try {
    const upstream = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Referer": "https://www.google.com/",
        "Accept": "*/*",
        ...(cached.headers || {})
      }
    });

    if (!upstream.ok || !upstream.body) {
      throw new Error(`Upstream returned ${upstream.status}`);
    }

    const contentType = upstream.headers.get("content-type") || "application/octet-stream";
    const contentLength = upstream.headers.get("content-length");
    const filename = cached.filename || `getintodevice-download.${cached.ext || "mp4"}`;

    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `attachment; filename="${filename.replace(/"/g, "'")}" `);
    if (contentLength) res.setHeader("Content-Length", contentLength);
    res.setHeader("X-Content-Type-Options", "nosniff");

    // Use Node.js pipe for proper streaming (works on Vercel)
    const nodeReadable = Readable.fromWeb(upstream.body);
    await new Promise((resolve, reject) => {
      nodeReadable.pipe(res);
      nodeReadable.on("error", reject);
      res.on("finish", resolve);
      res.on("error", reject);
    });
    return;
  } catch (err) {
    console.warn("[Vercel Download] Streaming failed, redirecting:", err?.message);
  }

  // Fallback: redirect directly to CDN URL
  res.setHeader("Content-Disposition", `attachment; filename="${(cached.filename || "download").replace(/"/g, "'")}"`);
  return res.redirect(302, targetUrl);
}
