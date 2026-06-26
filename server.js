import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { mkdtemp, readFile, readdir, rm, stat } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { Readable } from "node:stream";
import { extname, join, normalize } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { fetchVideoDetails, getCachedDownload, pythonCmd, ytDlpArgs } from "./services/videoService.js";
import { resolveLocalFfmpegPath } from "./services/localFfmpegPath.js";
import { chmodSync } from "node:fs";
import { platforms } from "./public/platforms.js";
import { blogs } from "./public/blogs.js";

const ffmpegPath = resolveLocalFfmpegPath();
try { chmodSync(ffmpegPath, 0o755); } catch {}
try {
  if (pythonCmd && !pythonCmd.startsWith("python")) {
    chmodSync(pythonCmd, 0o755);
  }
} catch {}

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const publicDir = join(__dirname, "public");
const port = Number(process.env.PORT || 3000);
const DOWNLOAD_HEADER_TIMEOUT_MS = 30000;
const publicSiteUrl = process.env.SITE_URL?.replace(/\/+$/, "");
const publicApiBase = process.env.PUBLIC_API_BASE?.replace(/\/+$/, "");

const seoPages = {};

// Map all 51 platforms
for (const [key, p] of Object.entries(platforms)) {
  seoPages[p.route] = {
    title: p.title,
    description: p.description,
    canonical: p.route,
    pageKey: p.key
  };
}

// Map Blog Home
seoPages["/blog"] = {
  title: "Social Media Downloader News & Guides - Social Downloader",
  description: "Read in-depth comparisons, tutorials, reviews, and updates about social media video downloaders, AI tools, and digital platforms.",
  canonical: "/blog",
  pageKey: "blog"
};

// Map individual blogs
for (const blog of blogs) {
  seoPages[`/blog/${blog.slug}`] = {
    title: `${blog.title} - Social Downloader`,
    description: blog.excerpt,
    canonical: `/blog/${blog.slug}`,
    pageKey: "blog-detail",
    blogSlug: blog.slug
  };
}


const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

const corsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, OPTIONS",
  "access-control-allow-headers": "content-type"
};

const sendJson = (res, statusCode, body) => {
  res.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    ...corsHeaders
  });
  res.end(JSON.stringify(body));
};

const statusForError = (error) => {
  const message = String(error?.message || "");
  if (error?.name === "AbortError" || /aborted|timeout/i.test(message)) {
    return 504;
  }
  if (
    error instanceof SyntaxError ||
    /valid public video URL|request is too large|valid download URL|valid cached download ID/i.test(message)
  ) {
    return 400;
  }
  if (/expired/i.test(message)) return 404;
  if (/private|unsupported|unavailable|needs cookies|login access|no downloadable media/i.test(message)) return 422;
  if (/network permission blocked|windows firewall|restricted sandbox/i.test(message)) return 503;
  if (/yt-dlp is not installed/i.test(message)) return 503;
  return 500;
};

const readJsonBody = async (req) => {
  const chunks = [];
  let size = 0;

  for await (const chunk of req) {
    size += chunk.length;
    if (size > 1024 * 1024) {
      throw new Error("Request is too large.");
    }
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) return {};

  if (req.headers["content-type"]?.includes("application/x-www-form-urlencoded")) {
    return Object.fromEntries(new URLSearchParams(raw));
  }

  return JSON.parse(raw);
};

const safeFileName = (name) =>
  String(name || "download")
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120) || "download";

const contentDisposition = (filename) => {
  const cleanName = safeFileName(filename);
  const asciiName = cleanName.replace(/[^\x20-\x7E]/g, "").trim() || "download";
  return `attachment; filename="${asciiName.replace(/"/g, "")}"; filename*=UTF-8''${encodeURIComponent(cleanName)}`;
};

const inlineDisposition = (filename) => {
  const cleanName = safeFileName(filename);
  const asciiName = cleanName.replace(/[^\x20-\x7E]/g, "").trim() || "preview";
  return `inline; filename="${asciiName.replace(/"/g, "")}"; filename*=UTF-8''${encodeURIComponent(cleanName)}`;
};

const isHttpUrl = (value) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const absoluteUrl = (req, path) => {
  if (publicSiteUrl) return `${publicSiteUrl}${path}`;
  const proto = req.headers["x-forwarded-proto"] || "http";
  return `${proto}://${req.headers.host}${path}`;
};

const buildSchema = (req, page) => {
  const pageUrl = absoluteUrl(req, page.canonical);
  const homeUrl = absoluteUrl(req, "/");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${homeUrl}#website`,
        name: "Social Downloader",
        url: homeUrl,
        potentialAction: {
          "@type": "SearchAction",
          target: `${homeUrl}?url={media_url_string}`,
          "query-input": "required name=media_url_string"
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${pageUrl}#app`,
        name: "Social Downloader",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        description: page.description,
        url: pageUrl,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: homeUrl
          },
          {
            "@type": "ListItem",
            position: 2,
            name: page.pageKey === "home" ? "Social Media Video Downloader" : page.title.split(" - ")[0],
            item: pageUrl
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Which links work best?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Public video, reel, short, pin, and post links work best. Private, DRM, login-only, or region-blocked media may fail."
            }
          },
          {
            "@type": "Question",
            name: "Can it download thumbnails?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. If a public thumbnail is available, the app adds it as a separate ready asset."
            }
          },
          {
            "@type": "Question",
            name: "Does it scrape private profile data?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. It only shows public metadata returned by the extractor for the provided public media URL."
            }
          }
        ]
      }
    ]
  };
};

const renderIndex = async (req, page) => {
  let templatePath = join(publicDir, "index.html");
  if (page.pageKey === "blog") {
    templatePath = join(publicDir, "blog-list.html");
  } else if (page.pageKey === "blog-detail") {
    templatePath = join(publicDir, "blog-detail.html");
  }

  let template = await readFile(templatePath, "utf8");
  const schema = buildSchema(req, page);

  const meta = platforms[page.pageKey] || platforms.home;
  const theme = meta.theme || platforms.home.theme;

  const stepsHtml = (meta.howToUse?.steps || platforms.home.howToUse.steps)
    .map(
      (step, i) => `
      <div class="step-card">
        <div class="step-icon-wrapper">
          <span class="material-symbols-outlined step-icon" id="step-${i + 1}-icon">${escapeHtml(step.icon)}</span>
          <span class="step-number">0${i + 1}</span>
        </div>
        <div class="step-info">
          <h3 id="step-${i + 1}-title">${escapeHtml(step.title)}</h3>
          <p id="step-${i + 1}-desc">${escapeHtml(step.desc)}</p>
        </div>
      </div>`
    )
    .join("\n");

  const faqHtml = (meta.faq || platforms.home.faq)
    .map(
      (item, i) => `
      <details${i === 0 ? " open" : ""}>
        <summary>${escapeHtml(item.question)}</summary>
        <p>${escapeHtml(item.answer)}</p>
      </details>`
    )
    .join("\n");

  const allToolsHtml = Object.values(platforms)
    .filter((p) => p.key !== "home" && p.key !== "blog" && p.key !== "blog-detail")
    .map((p) => `
      <a class="tool-chip glass-panel" href="${escapeHtml(p.route)}" style="--theme-accent: ${escapeHtml(p.theme["--theme-accent"])}">
        <span class="material-symbols-outlined">${escapeHtml(p.icon)}</span>
        <span>${escapeHtml(p.title.split(" - ")[0])}</span>
      </a>`
    )
    .join("\n");

  const blogsHtml = blogs
    .map(
      (post) => `
      <article class="blog-card glass-panel">
        <div class="blog-card-meta">
          <span class="blog-card-category">${escapeHtml(post.category)}</span>
          <span>•</span>
          <span>${escapeHtml(post.date)}</span>
        </div>
        <a href="/blog/${post.slug}">
          <h3>${escapeHtml(post.title)}</h3>
        </a>
        <p>${escapeHtml(post.excerpt)}</p>
        <a class="blog-card-link" href="/blog/${post.slug}">
          <span>Read article</span>
          <span class="material-symbols-outlined">arrow_forward</span>
        </a>
      </article>`
    )
    .join("\n");

  let html = template
    .replaceAll("__PAGE_TITLE__", escapeHtml(page.title))
    .replaceAll("__PAGE_DESCRIPTION__", escapeHtml(page.description))
    .replaceAll("__PAGE_CANONICAL__", escapeHtml(absoluteUrl(req, page.canonical)))
    .replaceAll("__PAGE_KEY__", escapeHtml(page.pageKey))
    .replaceAll("__APP_SCHEMA__", JSON.stringify(schema).replace(/</g, "\\u003c"))
    .replaceAll(
      "__API_BASE_SCRIPT__",
      publicApiBase
        ? `<script>window.SOCIAL_DOWNLOADER_API_BASE=${JSON.stringify(publicApiBase).replace(/</g, "\\u003c")};</script>`
        : ""
    )
    .replaceAll("__THEME_A__", theme["--theme-a"])
    .replaceAll("__THEME_B__", theme["--theme-b"])
    .replaceAll("__THEME_ACCENT__", theme["--theme-accent"])
    .replaceAll("__THEME_HOT__", theme["--theme-hot"])
    .replaceAll("__THEME_BUTTON__", theme["--theme-button"])
    .replaceAll("__THEME_CTA__", theme["--theme-cta"])
    .replaceAll("__PAGE_EYEBROW__", escapeHtml(meta.eyebrow || "Creator media workspace"))
    .replaceAll("__PAGE_HERO_TITLE__", escapeHtml(meta.heroTitle || meta.title || "Download clean social media assets."))
    .replaceAll("__PAGE_HERO_SUBTITLE__", escapeHtml(meta.heroSubtitle || meta.description || ""))
    .replaceAll("__INPUT_PLACEHOLDER__", escapeHtml(meta.placeholder || "Paste TikTok, Instagram, YouTube..."))
    .replaceAll("__BRAND_BADGE__", escapeHtml(meta.badge || "SD"))
    .replaceAll("__SUPPORTED_TITLE__", escapeHtml((meta.title || "Social Media Video").split(" - ")[0]))
    .replaceAll("__SUPPORTED_COPY__", escapeHtml(meta.description || ""))
    .replaceAll("__HOW_TO_USE_STEPS__", stepsHtml)
    .replaceAll("__ALL_TOOLS_GRID__", allToolsHtml)
    .replaceAll("__FAQ_LIST__", faqHtml)
    .replaceAll("__BLOGS_LIST_CONTAINER__", blogsHtml);

  if (page.pageKey === "blog-detail" && page.blogSlug) {
    const post = blogs.find((b) => b.slug === page.blogSlug);
    if (post) {
      html = html
        .replaceAll("__BLOG_TITLE__", escapeHtml(post.title))
        .replaceAll("__BLOG_AUTHOR__", escapeHtml(post.author))
        .replaceAll("__BLOG_DATE__", escapeHtml(post.date))
        .replaceAll("__BLOG_READ_TIME__", escapeHtml(post.readTime))
        .replaceAll("__BLOG_EXCERPT__", escapeHtml(post.excerpt))
        .replaceAll("__BLOG_CONTENT__", post.content);
    }
  }

  return html;
};

const renderSitemap = (req) => {
  const now = new Date().toISOString().slice(0, 10);
  const urls = Object.values(seoPages)
    .map(
      (page) => `  <url>
    <loc>${escapeHtml(absoluteUrl(req, page.canonical))}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.pageKey === "home" ? "1.0" : "0.8"}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
};

const renderRobots = (req) => `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${absoluteUrl(req, "/sitemap.xml")}
`;

const handleDownloadProxy = async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const id = requestUrl.searchParams.get("id");
  const isPreview = requestUrl.searchParams.get("preview") === "1";
  const cached = id ? getCachedDownload(id) : null;

  if (!id) {
    sendJson(res, 400, { error: "A valid cached download ID is required." });
    return;
  }

  if (!cached) {
    sendJson(res, 404, { error: "This download link expired. Fetch the video again." });
    return;
  }

  if (cached.requiresYtDlp) {
    await streamYtDlpDownload(cached, res, { inline: isPreview });
    return;
  }

  if (!cached.url || !isHttpUrl(cached.url)) {
    sendJson(res, 400, { error: "A valid download URL is required." });
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DOWNLOAD_HEADER_TIMEOUT_MS);
  res.on("close", () => controller.abort());

  const upstream = await fetch(cached.url, {
    headers: cached.headers,
    redirect: "follow",
    signal: controller.signal
  }).finally(() => clearTimeout(timeout));

  if (!upstream.ok || !upstream.body) {
    sendJson(res, upstream.status || 502, {
      error: `Download server returned ${upstream.status || "an empty response"}.`
    });
    return;
  }

  const contentType = upstream.headers.get("content-type") || "application/octet-stream";
  const extension = extensionFromContentType(contentType, cached.url);
  const baseName = cached.filename;
  const finalName = baseName.includes(".") ? baseName : `${baseName}${extension}`;

  res.writeHead(200, {
    "content-type": contentType,
    "content-disposition": isPreview ? inlineDisposition(finalName) : contentDisposition(finalName),
    "cache-control": "no-store",
    ...corsHeaders
  });

  try {
    await new Promise((resolve, reject) => {
      const stream = Readable.from(upstream.body);
      stream.on("error", reject);
      res.on("error", reject);
      res.on("finish", resolve);
      stream.pipe(res);
    });
  } catch (error) {
    console.error("Direct fetch streaming error:", error);
    if (!res.destroyed) res.destroy(error);
  }
};

const streamYtDlpDownload = async (cached, res, options = {}) => {
  // Send headers immediately to prevent Gateway Timeout on cloud routers (Hugging Face / Render / Netlify)
  res.writeHead(200, {
    "content-type": contentTypeFromExtension(cached.ext),
    "content-disposition": options.inline ? inlineDisposition(cached.filename) : contentDisposition(cached.filename),
    "cache-control": "no-store",
    ...corsHeaders
  });

  const tempDir = await mkdtemp(join(tmpdir(), "social-downloader-"));
  const outputTemplate = join(tempDir, "download.%(ext)s");
  const isAudioMp3 = cached.type === "audio" && cached.ext === "mp3";
  const args = [
    ...ytDlpArgs,
    "--no-warnings",
    "--ffmpeg-location",
    ffmpegPath,
    "--no-check-certificate",
    "--no-call-home",
    "--impersonate", "chrome",
    "--extractor-args", "youtube:skip=hls,dash;player_client=android,web_creator"
  ];


  if (isAudioMp3) {
    args.push(
      "-f",
      cached.formatSelector || "bestaudio/best",
      "-x",
      "--audio-format",
      "mp3",
      "--audio-quality",
      "0"
    );
  } else {
    args.push(
      "--merge-output-format",
      "mp4",
      "--remux-video",
      "mp4",
      "-f",
      cached.formatSelector || cached.formatId || "bestvideo+bestaudio/best",
      "--postprocessor-args",
      "Merger:-strict -2"
    );
  }

  args.push("-o", outputTemplate, cached.sourceUrl);
  const child = spawn(pythonCmd, args, {
    env: {
      ...process.env,
      PYTHONPATH: [process.env.YTDLP_PYTHON_PATH, process.env.PYTHONPATH].filter(Boolean).join(process.platform === "win32" ? ";" : ":")
    },
    windowsHide: true,
    stdio: ["ignore", "ignore", "pipe"]
  });
  const chunks = [];
  const killChild = () => {
    if (!child.killed) child.kill("SIGTERM");
  };

  res.on("close", killChild);
  child.stderr.on("data", (chunk) => {
    chunks.push(chunk);
  });

  try {
    await new Promise((resolve, reject) => {
      child.on("error", reject);
      child.on("close", (code) => {
        res.off("close", killChild);
        const logs = Buffer.concat(chunks).toString("utf8").trim();
        if (logs.includes("WARNING:") || logs.includes("ERROR:")) {
          console.error("yt-dlp logs:", logs);
        }
        if (code === 0) resolve();
        else reject(new Error(logs || "yt-dlp download failed."));
      });
    });

    const files = await readdir(tempDir);
    const completedFiles = await Promise.all(
      files
        .filter((file) => !file.endsWith(".part") && !file.endsWith(".ytdl"))
        .map(async (file) => {
          const path = join(tempDir, file);
          const fileStat = await stat(path);
          return fileStat.isFile() ? { path, fileStat } : null;
        })
    );
    const targetFile = join(tempDir, `download.${cached.ext || "mp4"}`);
    const output = completedFiles.filter(Boolean).find((f) => f.path === targetFile) || 
                   completedFiles.filter(Boolean).sort((a, b) => b.fileStat.size - a.fileStat.size)[0];
    if (!output) throw new Error("yt-dlp did not produce a downloadable file.");

    await new Promise((resolve, reject) => {
      const stream = createReadStream(output.path);
      stream.on("error", reject);
      stream.on("end", resolve);
      stream.pipe(res);
    });
  } catch (error) {
    console.error(error);
    if (!res.destroyed) res.destroy(error);
  } finally {
    res.off("close", killChild);
    await rm(tempDir, { recursive: true, force: true });
  }
};

const contentTypeFromExtension = (extension = "") => {
  const ext = extension.toLowerCase().replace(/^\./, "");
  if (["jpg", "jpeg"].includes(ext)) return "image/jpeg";
  if (ext === "png") return "image/png";
  if (ext === "webp") return "image/webp";
  if (["mp3", "m4a", "aac"].includes(ext)) return "audio/mpeg";
  if (ext === "webm") return "video/webm";
  if (ext === "mp4") return "video/mp4";
  return "application/octet-stream";
};

const extensionFromContentType = (contentType, target) => {
  const pathExtension = extname(new URL(target).pathname);
  if (pathExtension && pathExtension.length <= 8) return pathExtension;
  if (contentType.includes("audio")) return ".mp3";
  if (contentType.includes("image/jpeg")) return ".jpg";
  if (contentType.includes("image/png")) return ".png";
  if (contentType.includes("video")) return ".mp4";
  return ".bin";
};

const serveStatic = async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  if (requestUrl.pathname === "/robots.txt") {
    res.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
    res.end(renderRobots(req));
    return;
  }

  if (requestUrl.pathname === "/sitemap.xml") {
    res.writeHead(200, { "content-type": "application/xml; charset=utf-8" });
    res.end(renderSitemap(req));
    return;
  }

  const routePage = seoPages[requestUrl.pathname === "/index.html" ? "/" : requestUrl.pathname];

  if (routePage) {
    const html = await renderIndex(req, routePage);
    res.writeHead(200, { "content-type": mimeTypes[".html"], "cache-control": "public, max-age=300" });
    if (req.method === "HEAD") {
      res.end();
      return;
    }
    res.end(html);
    return;
  }

  const requestedPath = decodeURIComponent(requestUrl.pathname);
  const filePath = normalize(join(publicDir, requestedPath));

  if (!filePath.startsWith(publicDir)) {
    sendJson(res, 403, { error: "Forbidden" });
    return;
  }

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) throw new Error("Not a file");
    res.writeHead(200, {
      "content-type": mimeTypes[extname(filePath)] || "application/octet-stream",
      "cache-control": "public, max-age=86400"
    });
    if (req.method === "HEAD") {
      res.end();
      return;
    }
    createReadStream(filePath).pipe(res);
  } catch {
    sendJson(res, 404, { error: "Not found" });
  }
};

const server = createServer(async (req, res) => {
  try {
    if (req.method === "OPTIONS") {
      res.writeHead(204, corsHeaders);
      res.end();
      return;
    }

    if (req.method === "POST" && req.url === "/api/video-info") {
      const body = await readJsonBody(req);
      const info = await fetchVideoDetails(body.url);
      sendJson(res, 200, info);
      return;
    }

    if (req.method === "GET" && req.url?.startsWith("/api/download")) {
      await handleDownloadProxy(req, res);
      return;
    }

    if (req.method === "GET" || req.method === "HEAD") {
      await serveStatic(req, res);
      return;
    }

    sendJson(res, 405, { error: "Method not allowed" });
  } catch (error) {
    console.error(error);
    sendJson(res, statusForError(error), {
      error: error?.message || "Something went wrong."
    });
  }
});

server.listen(port, () => {
  console.log(`Social downloader running at http://localhost:${port}`);
});

export { server };
