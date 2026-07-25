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

  let cached;
  try {
    cached = getCachedDownload(id);
  } catch (e) {
    cached = null;
  }

  if (!cached) {
    return res.status(404).json({ error: "This download link expired. Fetch the video again." });
  }

  const targetUrl = cached.url || cached.sourceUrl;
  if (!targetUrl || !targetUrl.startsWith("http")) {
    return res.status(400).json({ error: "No direct media URL available. Please fetch the media again." });
  }

  // For preview mode: direct 302 redirect to source URL
  if (preview === "1") {
    res.setHeader("Cache-Control", "no-store");
    return res.redirect(302, targetUrl);
  }

  // For download: try to proxy with Content-Disposition so browser downloads it
  // On Vercel, we need to be mindful of memory. We stream with fetch.
  try {
    const upstream = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Referer": "https://www.google.com/",
        ...(cached.headers || {})
      }
    });

    if (upstream.ok) {
      const contentType = upstream.headers.get("content-type") || "application/octet-stream";
      const contentLength = upstream.headers.get("content-length");
      const filename = encodeURIComponent(cached.filename || `getintodevice-download.${cached.ext || "mp4"}`);

      res.setHeader("Content-Type", contentType);
      res.setHeader("Content-Disposition", `attachment; filename="${cached.filename || "download"}"; filename*=UTF-8''${filename}`);
      if (contentLength) res.setHeader("Content-Length", contentLength);
      res.setHeader("Cache-Control", "no-store");

      // Stream the body
      const reader = upstream.body?.getReader();
      if (reader) {
        const nodeRes = res;
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) nodeRes.write(Buffer.from(value));
        }
        return nodeRes.end();
      }

      // Fallback: buffer (small files only)
      const buf = Buffer.from(await upstream.arrayBuffer());
      return res.send(buf);
    }
  } catch (err) {
    console.warn("[Vercel Download Proxy Error]", err?.message);
  }

  // Last resort: redirect browser directly to CDN
  res.setHeader("Content-Disposition", `attachment; filename="${cached.filename || "download"}"`);
  return res.redirect(302, targetUrl);
}
