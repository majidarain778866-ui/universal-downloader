import { fetchVideoDetails } from "../services/videoService.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const data = await fetchVideoDetails(body.url);
    return res.status(200).json(data);
  } catch (error) {
    const msg = error?.message || "Failed to fetch video details.";
    return res.status(422).json({ error: msg });
  }
}
