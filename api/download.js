import { getCachedDownload } from "../services/videoService.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") return res.status(200).end();

  const { id } = req.query || {};

  if (!id) {
    return res.status(400).json({ error: "Missing download ID." });
  }

  let cached = null;
  try {
    cached = getCachedDownload(id);
  } catch (err) {
    console.error("[Download] Decryption failed:", err?.message);
    cached = null;
  }

  if (!cached) {
    return res.status(404).json({ error: "Download link expired. Please fetch the video again." });
  }

  const targetUrl = cached.url || cached.sourceUrl;

  if (!targetUrl || !targetUrl.startsWith("http")) {
    return res.status(400).json({ error: "No direct media URL found. Please re-fetch the video." });
  }

  // 302 redirect directly to media CDN URL
  return res.redirect(302, targetUrl);
}
