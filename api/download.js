import { getCachedDownload } from "../services/videoService.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { id, preview } = req.query || {};
  if (!id) {
    return res.status(400).json({ error: "A valid cached download ID is required." });
  }

  const cached = getCachedDownload(id);
  if (!cached) {
    return res.status(404).json({ error: "This download link expired. Fetch the video again." });
  }

  const targetUrl = cached.url || cached.sourceUrl;
  if (!targetUrl) {
    return res.status(400).json({ error: "Invalid download link." });
  }

  if (preview === "1") {
    return res.redirect(302, targetUrl);
  }

  try {
    const upstream = await fetch(targetUrl, {
      headers: cached.headers || {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
      }
    });

    if (upstream.ok && upstream.body) {
      const contentType = upstream.headers.get("content-type") || "application/octet-stream";
      res.setHeader("Content-Type", contentType);
      res.setHeader("Content-Disposition", `attachment; filename="${cached.filename || "download.mp4"}"`);
      const arrayBuffer = await upstream.arrayBuffer();
      return res.send(Buffer.from(arrayBuffer));
    }
  } catch (err) {
    console.error("[Vercel Proxy Error]", err);
  }

  return res.redirect(302, targetUrl);
}
