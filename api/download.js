/**
 * api/download.js — Vercel Serverless Download Handler
 *
 * Strategy: NO streaming/proxying (Vercel Hobby 4.5MB limit kills large video files).
 * Instead: decrypt token → 302 redirect to CDN URL directly.
 *
 * For images (small): buffer + send with Content-Disposition attachment.
 * For videos/audio: 302 redirect to CDN (browser downloads from CDN directly).
 */
import { getCachedDownload } from "../services/videoService.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") return res.status(200).end();

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
    return res.status(404).json({ error: "Download link expired. Please fetch the video again." });
  }

  const targetUrl = cached.url || cached.sourceUrl;

  if (!targetUrl || !targetUrl.startsWith("http")) {
    return res.status(400).json({ error: "No direct media URL found. Please re-fetch the video." });
  }

  const filename = (cached.filename || `getintodevice-download.${cached.ext || "mp4"}`).replace(/"/g, "'");
  const isImage = cached.type === "image" || ["jpg", "jpeg", "png", "webp"].includes(cached.ext);

  // Preview mode → direct redirect, no Content-Disposition
  if (preview === "1") {
    return res.redirect(302, targetUrl);
  }

  // For images: try to proxy (small file, safe under 4.5MB limit)
  if (isImage) {
    try {
      const upstream = await fetch(targetUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36",
          "Referer": "https://www.google.com/"
        },
        signal: AbortSignal.timeout(10000)
      });
      if (upstream.ok) {
        const contentType = upstream.headers.get("content-type") || "image/jpeg";
        const buf = Buffer.from(await upstream.arrayBuffer());
        res.setHeader("Content-Type", contentType);
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
        res.setHeader("Content-Length", buf.length);
        return res.send(buf);
      }
    } catch {
      // fall through to redirect
    }
  }

  // For videos & audio (and image fallback): redirect to CDN directly.
  // Browser will download when CDN sends Content-Disposition, or open player (user can Save).
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  return res.redirect(302, targetUrl);
}
