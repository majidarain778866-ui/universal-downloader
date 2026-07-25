import { getCachedDownload } from "../services/videoService.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { id } = req.query || {};
  if (!id) {
    return res.status(400).json({ error: "A valid cached download ID is required." });
  }

  const cached = getCachedDownload(id);
  if (!cached) {
    return res.status(404).json({ error: "This download link expired. Fetch the video again." });
  }

  if (cached.url) {
    return res.redirect(302, cached.url);
  }

  return res.status(400).json({ error: "Invalid download link format." });
}
