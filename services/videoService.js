import { execFile, execSync } from "node:child_process";
import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from "node:crypto";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

import { join } from "node:path";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const currentDir = fileURLToPath(new URL(".", import.meta.url));
const bundledPythonPath = [
  join(currentDir, "..", "netlify", "functions", "python"),
  join(process.cwd(), "netlify", "functions", "python")
].find(p => existsSync(p));

if (bundledPythonPath) {
  process.env.PYTHONPATH = [bundledPythonPath, process.env.PYTHONPATH].filter(Boolean).join(process.platform === "win32" ? ";" : ":");
}

export let pythonCmd = "python3";
export let ytDlpArgs = ["-m", "yt_dlp"];

let hasPythonYtDlp = false;
const isNetlify = Boolean(process.env.NETLIFY || process.env.LAMBDA_TASK_ROOT);

// Respect explicit PYTHON env var (set in Dockerfile)
const envPython = process.env.PYTHON;

if (!isNetlify) {
  // Try explicit PYTHON env var first
  if (envPython) {
    try {
      execSync(`${envPython} -m yt_dlp --version`, { stdio: "ignore" });
      pythonCmd = envPython;
      ytDlpArgs = ["-m", "yt_dlp"];
      hasPythonYtDlp = true;
    } catch {
      // env python not available or no yt_dlp
    }
  }

  if (!hasPythonYtDlp) {
    try {
      execSync("python3 -m yt_dlp --version", { stdio: "ignore" });
      pythonCmd = "python3";
      ytDlpArgs = ["-m", "yt_dlp"];
      hasPythonYtDlp = true;
    } catch {
      try {
        execSync("python -m yt_dlp --version", { stdio: "ignore" });
        pythonCmd = "python";
        ytDlpArgs = ["-m", "yt_dlp"];
        hasPythonYtDlp = true;
      } catch {
        // python module not available
      }
    }
  }
}

if (!hasPythonYtDlp) {
  const currentDir2 = fileURLToPath(new URL(".", import.meta.url));
  const binName = process.platform === "win32" ? "yt-dlp.exe" : "yt-dlp";
  const binPaths = [
    join(currentDir2, "..", "netlify", "functions", "bin", binName),
    join(process.cwd(), "netlify", "functions", "bin", binName),
    join(process.cwd(), "bin", binName),
    join(currentDir2, "bin", binName)
  ];

  const binPath = binPaths.find(p => existsSync(p));
  if (binPath) {
    pythonCmd = binPath;
    ytDlpArgs = [];
    hasPythonYtDlp = true;
  } else {
    // Last resort: try system yt-dlp binary
    try {
      execSync("yt-dlp --version", { stdio: "ignore" });
      pythonCmd = "yt-dlp";
      ytDlpArgs = [];
      hasPythonYtDlp = true;
    } catch {
      // fallback to python3
      pythonCmd = envPython || "python3";
      ytDlpArgs = ["-m", "yt_dlp"];
    }
  }
}

console.log(`[videoService] Using: ${pythonCmd} ${ytDlpArgs.join(" ")}`);

const ALGORITHM = "aes-256-cbc";
const SECRET_KEY = scryptSync(process.env.DOWNLOAD_SECRET || "social-downloader-secure-key-2026", "salt-123", 32);

export const encryptData = (data) => {
  try {
    const iv = randomBytes(16);
    const cipher = createCipheriv(ALGORITHM, SECRET_KEY, iv);
    let encrypted = cipher.update(JSON.stringify(data), "utf8", "base64");
    encrypted += cipher.final("base64");
    const token = iv.toString("base64url") + "." + Buffer.from(encrypted, "base64").toString("base64url");
    return token;
  } catch (e) {
    console.error("Encryption error:", e);
    return null;
  }
};

export const decryptData = (token) => {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    const iv = Buffer.from(parts[0], "base64url");
    const encrypted = Buffer.from(parts[1], "base64url");
    const decipher = createDecipheriv(ALGORITHM, SECRET_KEY, iv);
    let decrypted = decipher.update(encrypted, undefined, "utf8");
    decrypted += decipher.final("utf8");
    return JSON.parse(decrypted);
  } catch (e) {
    console.error("Decryption error:", e);
    return null;
  }
};

const CACHE_TTL_MS = 30 * 60 * 1000;
const MAX_OPTIONS_PER_ENTRY = 24;
const BRAND_SUFFIX = "getintodevice.com";
const downloadCache = new Map();
const videoInfoCache = new Map();
const INFO_CACHE_TTL_MS = 10 * 60 * 1000; // Cache metadata for 10 minutes

const PLATFORM_DEFINITIONS = [
  {
    key: "youtube",
    label: "YouTube",
    icon: "YT",
    match: ["youtube", "youtu.be", "youtube.com", "youtube shorts", "shorts"]
  },
  {
    key: "tiktok",
    label: "TikTok",
    icon: "TT",
    match: ["tiktok", "tiktok.com"]
  },
  {
    key: "instagram",
    label: "Instagram",
    icon: "IG",
    match: ["instagram", "instagr.am", "reels"]
  },
  {
    key: "facebook",
    label: "Facebook",
    icon: "FB",
    match: ["facebook", "fb.watch", "fb.com", "facebook.com"]
  },
  {
    key: "twitter",
    label: "X / Twitter",
    icon: "X",
    match: ["twitter", "x.com", "tweet"]
  },
  {
    key: "pinterest",
    label: "Pinterest",
    icon: "PI",
    match: ["pinterest", "pin.it", "pinterest.com"]
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: "LN",
    match: ["linkedin", "linkedin.com"]
  },
  {
    key: "threads",
    label: "Threads",
    icon: "TH",
    match: ["threads.net", "threads"]
  },
  {
    key: "vimeo",
    label: "Vimeo",
    icon: "VI",
    match: ["vimeo", "vimeo.com"]
  },
  {
    key: "snapchat",
    label: "Snapchat",
    icon: "SC",
    match: ["snapchat", "snapchat.com"]
  },
  {
    key: "rumble",
    label: "Rumble",
    icon: "RM",
    match: ["rumble", "rumble.com"]
  },
  {
    key: "tumblr",
    label: "Tumblr",
    icon: "TM",
    match: ["tumblr", "tumblr.com"]
  },
  {
    key: "streamable",
    label: "Streamable",
    icon: "ST",
    match: ["streamable", "streamable.com"]
  },
  {
    key: "bitchute",
    label: "BitChute",
    icon: "BC",
    match: ["bitchute", "bitchute.com"]
  },
  {
    key: "bandcamp",
    label: "Bandcamp",
    icon: "BCM",
    match: ["bandcamp", "bandcamp.com"]
  },
  {
    key: "soundcloud",
    label: "SoundCloud",
    icon: "SC",
    match: ["soundcloud", "soundcloud.com"]
  },
  {
    key: "ifunny",
    label: "iFunny",
    icon: "IF",
    match: ["ifunny", "ifunny.co"]
  },
  {
    key: "douyin",
    label: "Douyin",
    icon: "DY",
    match: ["douyin", "douyin.com"]
  },
  {
    key: "bluesky",
    label: "Bluesky",
    icon: "BS",
    match: ["bsky.app", "bluesky"]
  },
  {
    key: "kwai",
    label: "Kwai",
    icon: "KW",
    match: ["kwai", "kwai.com"]
  },
  {
    key: "telegram",
    label: "Telegram",
    icon: "TG",
    match: ["telegram", "t.me"]
  },
  {
    key: "canva",
    label: "Canva",
    icon: "CV",
    match: ["canva", "canva.com"]
  },
  {
    key: "reddit",
    label: "Reddit",
    icon: "RD",
    match: ["reddit", "reddit.com", "v.redd.it"]
  },
  {
    key: "likee",
    label: "Likee",
    icon: "LK",
    match: ["likee", "likee.video"]
  },
  {
    key: "terabox",
    label: "TeraBox",
    icon: "TB",
    match: ["terabox", "terabox.com"]
  },
  {
    key: "mixcloud",
    label: "MixCloud",
    icon: "MC",
    match: ["mixcloud", "mixcloud.com"]
  },
  {
    key: "lemon8",
    label: "Lemon8",
    icon: "L8",
    match: ["lemon8", "lemon8-app.com"]
  },
  {
    key: "vk",
    label: "VK",
    icon: "VK",
    match: ["vk.com", "vkontakte"]
  },
  {
    key: "dailymotion",
    label: "Dailymotion",
    icon: "DM",
    match: ["dailymotion", "dai.ly"]
  },
  {
    key: "mx-takatak",
    label: "MX TakaTak",
    icon: "MX",
    match: ["takatak", "mxtakatak"]
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    icon: "WDP",
    match: ["whatsapp", "whatsapp.com"]
  },
  {
    key: "rednote",
    label: "RedNote",
    icon: "RN",
    match: ["rednote", "xiaohongshu", "xhslink"]
  },
  {
    key: "metaai",
    label: "Meta AI",
    icon: "MAI",
    match: ["meta.ai", "metaai"]
  },
  {
    key: "kick",
    label: "Kick",
    icon: "KK",
    match: ["kick.com", "kick"]
  },
  {
    key: "9gag",
    label: "9GAG",
    icon: "9G",
    match: ["9gag", "9gag.com"]
  },
  {
    key: "twitch",
    label: "Twitch",
    icon: "TW",
    match: ["twitch", "twitch.tv"]
  },
  {
    key: "loom",
    label: "Loom",
    icon: "LM",
    match: ["loom.com", "loom"]
  },
  {
    key: "sharechat",
    label: "ShareChat",
    icon: "SC",
    match: ["sharechat", "sharechat.com"]
  }
];

const isHttpUrl = (value) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

const pick = (source, keys) => {
  for (const key of keys) {
    if (source?.[key] !== undefined && source[key] !== null && source[key] !== "") {
      return source[key];
    }
  }
  return undefined;
};

const numberLabel = (value) => {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) return "";
  if (number >= 1000000000) return `${(number / 1000000000).toFixed(1)}B`;
  if (number >= 1000000) return `${(number / 1000000).toFixed(1)}M`;
  if (number >= 1000) return `${(number / 1000).toFixed(1)}K`;
  return String(number);
};

const detectPlatform = (data, entries, sourceUrl) => {
  const haystack = [
    data.extractor,
    data.extractor_key,
    data.webpage_url_domain,
    data.webpage_url,
    sourceUrl,
    ...entries.flatMap((entry) => [entry.extractor, entry.extractor_key, entry.webpage_url_domain, entry.webpage_url])
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const platform = PLATFORM_DEFINITIONS.find((item) => item.match.some((match) => haystack.includes(match)));
  return platform || { key: "generic", label: String(pick(data, ["extractor", "webpage_url_domain"]) || "Social video"), icon: "SD" };
};

const buildCreator = (data, entries) => {
  const first = entries[0] || {};
  const avatar =
    String(
      pick(data, ["uploader_avatar", "channel_avatar", "creator_avatar", "avatar_url"]) ||
        pick(first, ["uploader_avatar", "channel_avatar", "creator_avatar", "avatar_url", "profile_image_url"]) ||
        ""
    );
  const profileUrl =
    String(
      pick(data, ["uploader_url", "channel_url", "creator_url"]) ||
        pick(first, ["uploader_url", "channel_url", "creator_url"]) ||
        ""
    );
  const followers =
    numberLabel(pick(data, ["channel_follower_count", "uploader_follower_count", "followers"]) || pick(first, ["channel_follower_count", "uploader_follower_count", "followers"]));

  return {
    name: String(pick(data, ["uploader", "channel", "creator"]) || pick(first, ["uploader", "channel", "creator"]) || ""),
    handle: String(pick(data, ["uploader_id", "channel_id", "creator_id"]) || pick(first, ["uploader_id", "channel_id", "creator_id"]) || ""),
    avatar: isHttpUrl(avatar) ? avatar : "",
    profile_url: isHttpUrl(profileUrl) ? profileUrl : "",
    followers,
    video_count: numberLabel(pick(data, ["playlist_count", "n_entries"]) || pick(first, ["playlist_count", "n_entries"])),
    verified: Boolean(pick(data, ["uploader_verified", "channel_is_verified"]) || pick(first, ["uploader_verified", "channel_is_verified"]))
  };
};

const cleanupCache = () => {
  const now = Date.now();
  for (const [id, item] of downloadCache) {
    if (item.expiresAt <= now) downloadCache.delete(id);
  }
};

const formatBytes = (value) => {
  const bytes = Number(value);
  if (!Number.isFinite(bytes) || bytes <= 0) return "";
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unit = 0;
  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024;
    unit += 1;
  }
  return `${size >= 10 || unit === 0 ? size.toFixed(0) : size.toFixed(1)} ${units[unit]}`;
};

const formatDuration = (seconds) => {
  const value = Number(seconds);
  if (!Number.isFinite(value) || value <= 0) return "";
  const mins = Math.floor(value / 60);
  const secs = Math.floor(value % 60);
  const hours = Math.floor(mins / 60);
  const restMins = mins % 60;
  if (hours) return `${hours}:${String(restMins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  return `${restMins}:${String(secs).padStart(2, "0")}`;
};

const safeFileName = (name) =>
  String(name || "social-download")
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120) || "social-download";

const brandedFileName = (name, extension) => {
  const cleanExtension = String(extension || "mp4").replace(/^\./, "") || "mp4";
  const baseName = String(name || "social-download")
    .replace(new RegExp(`\\s*-\\s*${BRAND_SUFFIX.replace(".", "\\.")}\\s*$`, "i"), "")
    .replace(/\.[a-z0-9]{2,5}$/i, "");
  return safeFileName(`${baseName} - ${BRAND_SUFFIX}.${cleanExtension}`);
};

const cookieHeaderFromYtDlp = (cookies) => {
  if (!cookies) return "";
  return String(cookies)
    .split(";")
    .map((part) => part.trim())
    .filter((part) => {
      const lower = part.toLowerCase();
      return part.includes("=") && !lower.startsWith("domain=") && !lower.startsWith("path=") && !lower.startsWith("expires=");
    })
    .join("; ");
};

const getHeaders = (format, entry) => {
  const headers = {
    ...(entry.http_headers || {}),
    ...(format.http_headers || {})
  };
  const cookies = cookieHeaderFromYtDlp(format.cookies || entry.cookies);
  if (cookies) headers.Cookie = cookies;
  if (!headers["User-Agent"]) {
    headers["User-Agent"] =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36";
  }
  if (!headers.Accept) headers.Accept = "*/*";
  return headers;
};

const mediaTypeFor = (format) => {
  const ext = String(format.ext || "").toLowerCase();
  if (["jpg", "jpeg", "png", "webp", "gif"].includes(ext)) return "image";
  if (format.vcodec === "none" && format.acodec && format.acodec !== "none") return "audio";
  return "video";
};

const optionLabel = (format, entryIndex) => {
  const type = mediaTypeFor(format);
  const parts = [];
  if (entryIndex > 0) parts.push(`Item ${entryIndex + 1}`);
  parts.push(type === "audio" ? "Audio" : type === "image" ? "Image" : "Video");
  if (format.resolution && format.resolution !== "audio only") parts.push(format.resolution);
  else if (format.height) parts.push(`${format.height}p`);
  if (format.format_note && !String(format.format_note).includes("unknown")) parts.push(format.format_note);
  if (format.ext) parts.push(String(format.ext).toUpperCase());
  return parts.join(" ");
};

const isWatermarked = (format) =>
  /watermark|watermarked/i.test(
    [format.format_id, format.format_note, format.format, format.url].filter(Boolean).join(" ")
  );

const qualityScore = (format) =>
  Number(format.height || 0) * 1000000 +
  Number(format.width || 0) * 1000 +
  Number(format.tbr || 0) +
  Number(format.filesize || format.filesize_approx || 0) / 1000000;

const hasAudio = (format) => Boolean(format.acodec && format.acodec !== "none");
const hasVideo = (format) => Boolean(format.vcodec && format.vcodec !== "none");

const cacheDownload = ({ format, entry = {}, title, entryIndex = 0 }) => {
  const type = mediaTypeFor(format);
  const sourceUrl = entry.webpage_url || entry.original_url || entry.url;
  const shouldMergeAudio = type === "video" && hasVideo(format) && !hasAudio(format) && format.format_id && sourceUrl;
  const mergeExt = "mp4"; // Always merge into MP4 container
  const mergeAudioSelector = "ba[ext=m4a]/ba[ext=mp4]/ba";
  
  const isVideoWebm = type === "video" && String(format.ext || "").toLowerCase() === "webm";
  const isDirectRestrictionPlatform = sourceUrl && (
    sourceUrl.includes("facebook.com") ||
    sourceUrl.includes("fb.watch") ||
    sourceUrl.includes("fb.com") ||
    sourceUrl.includes("instagram.com") ||
    sourceUrl.includes("instagr.am") ||
    sourceUrl.includes("tiktok.com")
  );
  // We need server processing (yt-dlp) if we must merge audio/video, remux webm video to mp4, if we extract audio to MP3, or if it is a platform that restricts direct downloads
  const requiresYtDlp = shouldMergeAudio || isVideoWebm || (type === "audio" && sourceUrl) || isDirectRestrictionPlatform;
  
  const ext = type === "video" ? "mp4" : type === "audio" ? "mp3" : String(format.ext || "jpg").replace(/^\./, "");
  const filename = brandedFileName(`${title}${entryIndex > 0 ? `-${entryIndex + 1}` : ""}`, ext);

  const payload = {
    url: requiresYtDlp ? "" : format.url,
    sourceUrl,
    formatId: format.format_id,
    formatSelector: shouldMergeAudio
      ? mergeAudioSelector.split('/').map(a => `${format.format_id}+${a}`).join('/') + `/${format.format_id}+bestaudio/${format.format_id}`
      : (type === "audio" ? "bestaudio/best" : ""),
    headers: getHeaders(format, entry),
    filename,
    ext,
    type,
    requiresYtDlp
  };

  return encryptData(payload);
};

const cacheMp3Download = ({ sourceUrl, title }) => {
  const filename = brandedFileName(title, "mp3");

  const payload = {
    url: "",
    sourceUrl,
    formatId: "bestaudio",
    formatSelector: "bestaudio/best",
    filename,
    ext: "mp3",
    type: "audio",
    requiresYtDlp: true
  };
  const id = encryptData(payload);

  return {
    id,
    label: "High Quality MP3 Audio",
    resolution: "320kbps",
    type: "audio",
    badge: "Audio MP3",
    extension: "mp3",
    size: "",
    download_url: `/api/download?id=${encodeURIComponent(id)}`,
    preview_url: ""
  };
};

const cacheMergedDownload = ({ sourceUrl, title, quality = "high" }) => {
  const suffix = quality === "normal" ? "normal" : "high";
  const filename = brandedFileName(`${title}-${suffix}`, "mp4");
  const formatSelector =
    quality === "normal"
      ? "bv*[height<=720][ext=mp4]+ba[ext=m4a]/bv*[height<=720]+ba/b[height<=720]/best[height<=720]/best"
      : "bv*[ext=mp4]+ba[ext=m4a]/bv*+ba/best";

  const payload = {
    url: "",
    sourceUrl,
    formatSelector,
    filename,
    ext: "mp4",
    type: "video",
    requiresYtDlp: true
  };
  const id = encryptData(payload);

  return {
    id,
    label: quality === "normal" ? "Normal quality MP4 with audio" : "High quality MP4 with audio",
    resolution: quality === "normal" ? "Normal MP4" : "Best MP4",
    type: "video",
    has_audio: true,
    has_video: true,
    badge: "Audio included",
    extension: "mp4",
    format_id: formatSelector,
    size: "",
    download_url: `/api/download?id=${encodeURIComponent(id)}`,
    preview_url: ""
  };
};

const normalizeFormat = (format, entry, title, entryIndex, optionIndex) => {
  if (!isHttpUrl(format.url)) return null;
  const type = mediaTypeFor(format);
  const id = cacheDownload({ format, entry, title, entryIndex });
  const mergedAudio = Boolean(type === "video" && hasVideo(format) && !hasAudio(format) && format.format_id);
  const isVideoWebm = type === "video" && String(format.ext || "").toLowerCase() === "webm";
  
  const sourceUrl = entry.webpage_url || entry.original_url || entry.url;
  const isDirectRestrictionPlatform = sourceUrl && (
    sourceUrl.includes("facebook.com") ||
    sourceUrl.includes("fb.watch") ||
    sourceUrl.includes("fb.com") ||
    sourceUrl.includes("instagram.com") ||
    sourceUrl.includes("instagr.am") ||
    sourceUrl.includes("tiktok.com")
  );
  const requiresYtDlp = mergedAudio || isVideoWebm || (type === "audio" && sourceUrl) || isDirectRestrictionPlatform;

  const resolution =
    format.resolution ||
    (format.width && format.height ? `${format.width}x${format.height}` : type === "audio" ? "Audio only" : "Original");

  return {
    id,
    label: optionLabel(format, entryIndex) || `Option ${optionIndex + 1}`,
    resolution,
    type,
    has_audio: mergedAudio || hasAudio(format) || isVideoWebm,
    has_video: hasVideo(format),
    badge: isWatermarked(format)
      ? "Watermarked"
      : mergedAudio
        ? "Audio included"
        : optionIndex === 0 && type === "video"
          ? "Best no watermark"
          : "",
    is_watermarked: isWatermarked(format),
    extension: type === "video" ? "mp4" : type === "audio" ? "mp3" : format.ext || "",
    format_id: format.format_id || "",
    size: mergedAudio || isVideoWebm ? "" : formatBytes(format.filesize || format.filesize_approx),
    download_url: `/api/download?id=${encodeURIComponent(id)}`,
    preview_url: requiresYtDlp ? "" : `/api/download?id=${encodeURIComponent(id)}&preview=1`
  };
};

const normalizeThumbnail = (thumbnail, title) => {
  if (!isHttpUrl(thumbnail)) return null;
  const id = cacheDownload({
    format: {
      url: thumbnail,
      ext: new URL(thumbnail).pathname.match(/\.(png|jpe?g|webp|gif)$/i)?.[1] || "jpg"
    },
    title: `${title}-thumbnail`
  });

  return {
    id,
    label: "Thumbnail download",
    resolution: "Preview image",
    type: "image",
    badge: "Thumbnail",
    extension: "jpg",
    size: "",
    download_url: `/api/download?id=${encodeURIComponent(id)}`,
    preview_url: `/api/download?id=${encodeURIComponent(id)}&preview=1`
  };
};

const collectFormats = (entry) => {
  const formats = [];
  if (Array.isArray(entry.requested_downloads)) formats.push(...entry.requested_downloads);
  if (entry.url) formats.push(entry);
  if (Array.isArray(entry.formats)) formats.push(...entry.formats);

  // 1. Sort candidates first by quality so the best format is selected first
  const sorted = formats
    .filter((format) => format && isHttpUrl(format.url))
    .filter((format) => !String(format.protocol || "").includes("m3u8"))
    .filter((format) => {
      const ext = String(format.ext || "").toLowerCase();
      if (["mhtml", "json", "srv1", "srv2", "srv3", "ttml", "vtt"].includes(ext)) return false;
      return mediaTypeFor(format) !== "video" || hasVideo(format) || hasAudio(format);
    })
    .sort((a, b) => {
      const aWatermark = isWatermarked(a) ? 1 : 0;
      const bWatermark = isWatermarked(b) ? 1 : 0;
      if (aWatermark !== bWatermark) return aWatermark - bWatermark;
      return qualityScore(b) - qualityScore(a);
    });

  // 2. Deduplicate based on type and resolution to avoid listing duplicate files
  const seen = new Set();
  const deduped = [];
  for (const format of sorted) {
    const type = mediaTypeFor(format);
    const res = format.resolution || (format.width && format.height ? `${format.width}x${format.height}` : format.height || format.format_note || format.format_id);
    const key = `${type}|${res}`;
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(format);
    }
  }

  return deduped.slice(0, MAX_OPTIONS_PER_ENTRY);
};

const buildPrimaryActions = (downloads, { sourceUrl, title }) => {
  const isNetlifyRuntime = Boolean(process.env.NETLIFY);
  const videos = downloads.filter((item) => item.type === "video");
  const completeVideos = videos.filter((item) => item.has_audio !== false);
  const images = downloads.filter((item) => item.type === "image");
  const maxResolutionSide = (item) => {
    const values = String(item?.resolution || "")
      .match(/\d+/g)
      ?.map(Number)
      .filter(Number.isFinite);
    return values?.length ? Math.max(...values) : Number.POSITIVE_INFINITY;
  };
  const pickPlayableVideo = (items, { mp4Only = false, maxHeight = Number.POSITIVE_INFINITY } = {}) => {
    const candidates = items.filter((item) => {
      if (item.has_audio === false) return false;
      if (mp4Only && item.extension !== "mp4") return false;
      return maxResolutionSide(item) <= maxHeight;
    });
    return candidates.sort((a, b) => {
      const heightDiff = maxResolutionSide(b) - maxResolutionSide(a);
      if (heightDiff !== 0) return heightDiff;
      if (a.extension !== b.extension) return a.extension === "mp4" ? -1 : 1;
      return Number(b.size || 0) - Number(a.size || 0);
    })[0] || null;
  };
  const mergedHigh = sourceUrl ? cacheMergedDownload({ sourceUrl, title, quality: "high" }) : null;
  const mergedNormal = sourceUrl ? cacheMergedDownload({ sourceUrl, title, quality: "normal" }) : null;
  const directHigh =
    pickPlayableVideo(completeVideos, { mp4Only: true, maxHeight: isNetlifyRuntime ? 1080 : Number.POSITIVE_INFINITY }) ||
    pickPlayableVideo(completeVideos, { mp4Only: true }) ||
    pickPlayableVideo(completeVideos);
  const highQuality =
    directHigh ||
    mergedHigh ||
    pickPlayableVideo(videos, { mp4Only: true, maxHeight: isNetlifyRuntime ? 1080 : Number.POSITIVE_INFINITY }) ||
    pickPlayableVideo(videos, { mp4Only: true }) ||
    pickPlayableVideo(videos) ||
    downloads.find((item) => item.type !== "audio") ||
    downloads[0] ||
    null;
  const directNormal =
    pickPlayableVideo(completeVideos.filter((item) => item !== highQuality), { mp4Only: true, maxHeight: isNetlifyRuntime ? 720 : 720 }) ||
    completeVideos.find((item) => item !== highQuality && maxResolutionSide(item) <= 720) ||
    completeVideos.find((item) => item !== highQuality && /360|480|540|normal|medium/i.test([item.label, item.resolution].join(" ")));
  const normalQuality =
    directNormal ||
    mergedNormal ||
    pickPlayableVideo(videos.filter((item) => item !== highQuality), { mp4Only: true, maxHeight: 720 }) ||
    pickPlayableVideo(videos.filter((item) => item !== highQuality), { maxHeight: 720 }) ||
    highQuality;
  const audios = downloads.filter((item) => item.type === "audio");
  const audioMp3 = audios.find((item) => item.extension === "mp3") || audios[0] || null;
  const thumbnailHd = images.find((item) => /thumbnail|preview/i.test([item.label, item.badge].join(" "))) || images[0] || null;

  return {
    high_quality: highQuality,
    normal_quality: normalQuality,
    audio_mp3: audioMp3,
    thumbnail_hd: thumbnailHd
  };
};

const cleanInfoCache = () => {
  const now = Date.now();
  for (const [key, item] of videoInfoCache) {
    if (item.expiresAt <= now) videoInfoCache.delete(key);
  }
};

const runYtDlp = async (url) => {
  try {
    const { stdout } = await execFileAsync(
      pythonCmd,
      [
        ...ytDlpArgs,
        "--dump-single-json",
        "--skip-download",
        "--no-warnings",
        "--no-playlist",
        "--no-check-formats",
        "--no-check-certificate",
        "--no-call-home",
        "--impersonate", "chrome",
        "--extractor-args", "youtube:skip=hls,dash;player_client=android,web_creator",
        url
      ],


      {
        encoding: "utf8",
        env: {
          ...process.env,
          PYTHONPATH: [process.env.YTDLP_PYTHON_PATH, process.env.PYTHONPATH].filter(Boolean).join(process.platform === "win32" ? ";" : ":")
        },
        maxBuffer: 80 * 1024 * 1024,
        timeout: 120000,
        windowsHide: true
      }
    );
    return JSON.parse(stdout);
  } catch (error) {
    const stderr = String(error.stderr || error.message || "");
    console.error("runYtDlp execution failed. Stderr:", stderr, "Error Message:", error.message);
    if (stderr.includes("No module named yt_dlp")) {
      throw new Error("yt-dlp is not installed. Run: python -m pip install -U yt-dlp");
    }
    if (process.platform === "win32" && /WinError 10013|forbidden by its access permissions/i.test(stderr)) {
      throw new Error(
        "Network permission blocked yt-dlp. Allow Python/Node through Windows Firewall or run the app outside the restricted sandbox."
      );
    }
    if (/private|login|cookies|not available|unsupported|unable to extract|unable to download webpage|http error 404|Cannot parse data/i.test(stderr)) {
      throw new Error("This video is private, unsupported, unavailable, or needs cookies/login access.");
    }
    const cleanError = stderr.split("\n")
      .map((line) => line.trim())
      .filter((line) => line && 
        !line.toLowerCase().includes("deprecated") && 
        !line.toLowerCase().includes("please remove") && 
        !line.toLowerCase().includes("github.com/yt-dlp/yt-dlp/issues/") && 
        !line.startsWith("WARNING:")
      )
      .join(" | ") || "Could not extract media from this URL.";
    throw new Error(cleanError);
  }


};

export const normalizeUrl = (urlString) => {
  try {
    const url = new URL(urlString);
    
    // YouTube
    if (url.hostname.includes("youtube.com") || url.hostname.includes("youtu.be")) {
      const v = url.searchParams.get("v");
      const cleanUrl = new URL(url.origin + url.pathname);
      if (v) cleanUrl.searchParams.set("v", v);
      return cleanUrl.toString();
    }
    
    // Social / media platforms (strip all tracking queries)
    if (
      url.hostname.includes("instagram.com") ||
      url.hostname.includes("instagr.am") ||
      url.hostname.includes("tiktok.com") ||
      url.hostname.includes("twitter.com") ||
      url.hostname.includes("x.com") ||
      url.hostname.includes("pinterest.com") ||
      url.hostname.includes("pin.it") ||
      url.hostname.includes("threads.net") ||
      url.hostname.includes("vimeo.com") ||
      url.hostname.includes("linkedin.com") ||
      url.hostname.includes("snapchat.com")
    ) {
      return url.origin + url.pathname.replace(/\/+$/, "");
    }
    
    // Facebook
    if (url.hostname.includes("facebook.com") || url.hostname.includes("fb.watch") || url.hostname.includes("fb.com")) {
      const v = url.searchParams.get("v");
      if (v) {
        const cleanUrl = new URL(url.origin + url.pathname);
        cleanUrl.searchParams.set("v", v);
        return cleanUrl.toString();
      }
      return url.origin + url.pathname.replace(/\/+$/, "");
    }
    
    // General fallback: delete UTM parameters, Facebook click IDs, and YouTube sharing tokens
    const stripParams = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "fbclid", "gclid", "si"];
    for (const p of stripParams) {
      url.searchParams.delete(p);
    }
    return url.toString().replace(/\/+$/, "");
  } catch {
    return urlString;
  }
};

export const fetchVideoDetails = async (url) => {
  if (!isHttpUrl(url)) {
    throw new Error("Please enter a valid public video URL.");
  }

  const normalized = normalizeUrl(url);

  cleanInfoCache();
  
  let data;
  const cached = videoInfoCache.get(normalized);
  if (cached && cached.expiresAt > Date.now()) {
    data = cached.data;
  } else {
    data = await runYtDlp(normalized);
    videoInfoCache.set(normalized, {
      data,
      expiresAt: Date.now() + INFO_CACHE_TTL_MS
    });
  }

  const entries = Array.isArray(data.entries) && data.entries.length ? data.entries.filter(Boolean) : [data];
  let title = String(pick(data, ["title", "fulltitle", "playlist_title"]) || "Social media download");

  // Clean up title and extract likes/shares if prepended
  let parsedReactions = null;
  let parsedShares = null;
  let parsedViews = null;
  
  const twoStatsPattern = /^(?:[^\d]*\s*)?([\d.]+[KMB]?)\s*(reactions|likes|views)\s*(?:·|•|·|-|\||\s)+\s*([\d.]+[KMB]?)\s*(shares|comments|views|reactions|likes)?\s*(?:\||-)\s*(.*)/i;
  const oneStatPattern = /^(?:[^\d]*\s*)?([\d.]+[KMB]?)\s*(reactions|likes|views|shares|comments)\s*(?:\||-)\s*(.*)/i;

  let match = title.match(twoStatsPattern);
  if (match) {
    const val1 = match[1];
    const label1 = match[2].toLowerCase();
    const val2 = match[3];
    const label2 = match[4] ? match[4].toLowerCase() : "";
    title = match[5];

    if (label1.includes("reaction") || label1.includes("like")) {
      parsedReactions = val1;
    } else if (label1.includes("view")) {
      parsedViews = val1;
    }

    if (label2.includes("share") || label2.includes("comment")) {
      parsedShares = val2;
    } else if (label2.includes("reaction") || label2.includes("like")) {
      parsedReactions = val2;
    } else if (label2.includes("view")) {
      parsedViews = val2;
    }
  } else {
    match = title.match(oneStatPattern);
    if (match) {
      const val1 = match[1];
      const label1 = match[2].toLowerCase();
      title = match[3];

      if (label1.includes("reaction") || label1.includes("like")) {
        parsedReactions = val1;
      } else if (label1.includes("view")) {
        parsedViews = val1;
      } else if (label1.includes("share") || label1.includes("comment")) {
        parsedShares = val1;
      }
    }
  }

  const thumbnail =
    String(pick(data, ["thumbnail"]) || pick(entries[0], ["thumbnail"]) || pick(entries[0]?.thumbnails?.at?.(-1), ["url"]) || "");
  const platform = detectPlatform(data, entries, url);
  const creator = buildCreator(data, entries);

  const videos = entries.flatMap((entry, entryIndex) => {
    const entryTitle = String(pick(entry, ["title", "fulltitle"]) || title);
    return collectFormats(entry)
      .map((format, optionIndex) => normalizeFormat(format, entry, entryTitle, entryIndex, optionIndex))
      .filter(Boolean);
  });
  const sourceUrl = String(pick(data, ["webpage_url", "original_url"]) || pick(entries[0], ["webpage_url", "original_url", "url"]) || url);
  const mp3Option = sourceUrl ? cacheMp3Download({ sourceUrl, title }) : null;
  if (mp3Option) videos.push(mp3Option);

  const thumbnailOption = normalizeThumbnail(thumbnail, title);
  if (thumbnailOption) videos.push(thumbnailOption);

  if (!videos.length) {
    throw new Error("No downloadable media links were found for this URL.");
  }
  const primaryActions = buildPrimaryActions(videos, { sourceUrl, title });

  return {
    title,
    thumbnail,
    platform: platform.label,
    platform_key: platform.key,
    platform_label: platform.label,
    platform_icon: platform.icon,
    uploader: creator.name,
    duration: formatDuration(pick(data, ["duration"]) || pick(entries[0], ["duration"])),
    source_url: url,
    media: {
      title,
      thumbnail,
      duration: formatDuration(pick(data, ["duration"]) || pick(entries[0], ["duration"])),
      view_count: parsedViews || numberLabel(pick(data, ["view_count"]) || pick(entries[0], ["view_count"])),
      like_count: parsedReactions || numberLabel(pick(data, ["like_count"]) || pick(entries[0], ["like_count"])),
      share_count: parsedShares || numberLabel(pick(data, ["share_count"]) || pick(entries[0], ["share_count"])),
      upload_date: String(pick(data, ["upload_date"]) || pick(entries[0], ["upload_date"]) || "")
    },
    creator,
    primary_actions: primaryActions,
    downloads: videos,
    videos
  };
};

export const getCachedDownload = (id) => {
  return decryptData(id);
};

