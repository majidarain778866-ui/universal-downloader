export const platforms = {
  "home": {
    key: "home",
    route: "/",
    title: "Social Downloader - HD Video Downloader for Creators",
    description: "Analyze public social media links, preview media, and download HD videos, thumbnails, and creator metadata from one clean workspace.",
    eyebrow: "Creator media workspace",
    heroTitle: "Download clean social media assets.",
    heroSubtitle: "Paste a public link, preview the media, inspect creator metadata, and save the best available video or thumbnail.",
    placeholder: "Paste TikTok, Instagram, YouTube, Facebook, X...",
    icon: "download",
    badge: "SD",
    theme: {
      "--theme-a": "rgba(139, 92, 246, 0.16)",
      "--theme-b": "rgba(217, 70, 239, 0.12)",
      "--theme-accent": "#8b5cf6",
      "--theme-hot": "#d946ef",
      "--theme-button": "linear-gradient(135deg, #8b5cf6, #d946ef)",
      "--theme-cta": "linear-gradient(135deg, #ec4899, #f43f5e)"
    },
    howToUse: {
      title: "How to use Social Downloader",
      steps: [
        { title: "Copy public link", desc: "Find the public shareable video link on platforms like TikTok, Instagram, YouTube, or Pinterest.", icon: "content_copy" },
        { title: "Paste & analyze link", desc: "Paste the social media link in the input box above and click the Analyze button to parse creator assets.", icon: "link" },
        { title: "Free HD download", desc: "Select your preferred format (HD Video, Audio, or Thumbnails) and download instantly.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Which links work best?", answer: "Public video, reel, short, pin, and post links work best. Private, DRM, login-only, or region-blocked media may fail." },
      { question: "Can it download thumbnails?", answer: "Yes. If a public thumbnail is available, the app adds it as a separate ready asset." },
      { question: "Does it scrape private profile data?", answer: "No. It only shows public metadata returned by the extractor for the provided public media URL." }
    ]
  },
  "youtube-shorts": {
    key: "youtube-shorts",
    route: "/youtube-shorts-downloader",
    title: "YouTube Shorts Downloader - Save Shorts & Videos in HD",
    description: "Download YouTube Shorts, videos, and audio in high quality. Extract high-bitrate MP4s for offline playback.",
    eyebrow: "YouTube Shorts Downloader",
    heroTitle: "Download YouTube Shorts in Full HD",
    heroSubtitle: "Save public YouTube Shorts and videos instantly. Free, fast, and no account needed.",
    placeholder: "Paste a YouTube Shorts or Video URL...",
    icon: "play_circle",
    badge: "YT",
    theme: {
      "--theme-a": "rgba(255, 0, 0, 0.18)",
      "--theme-b": "rgba(20, 20, 20, 0.12)",
      "--theme-accent": "#ff0000",
      "--theme-hot": "#cc0000",
      "--theme-button": "linear-gradient(135deg, #ff0000, #cc0000)",
      "--theme-cta": "linear-gradient(135deg, #cc0000, #ff0000)"
    },
    howToUse: {
      title: "How to download YouTube Shorts",
      steps: [
        { title: "Copy YouTube Shorts URL", desc: "Find the Shorts video on YouTube, click share, and copy the public URL.", icon: "content_copy" },
        { title: "Paste link in downloader", desc: "Paste the copied URL in the input field above to parse the media streams.", icon: "link" },
        { title: "Download HD MP4 video", desc: "Select the desired quality (e.g. 720p or 1080p) and save the video.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Does it support 1080p YouTube Shorts?", answer: "Yes, our tool extracts the highest available resolutions offered by YouTube, including full HD 1080p." },
      { question: "Can I download audio from YouTube Shorts?", answer: "Yes, you can extract the background audio track as a separate high-quality MP3/M4A file." }
    ]
  },
  "tiktok-video": {
    key: "tiktok-video",
    route: "/tiktok-video-downloader",
    title: "TikTok Video Downloader No Watermark - Social Downloader",
    description: "Download TikTok videos, thumbnails, and public creator details with clean no-watermark options when available.",
    eyebrow: "TikTok video downloader",
    heroTitle: "Download TikTok videos without the clutter.",
    heroSubtitle: "Analyze public TikTok links, find no-watermark options when available, and save HD video or thumbnails.",
    placeholder: "Paste a TikTok video URL...",
    icon: "video_library",
    badge: "TT",
    theme: {
      "--theme-a": "rgba(0, 242, 234, 0.18)",
      "--theme-b": "rgba(255, 0, 80, 0.14)",
      "--theme-accent": "#00f2fe",
      "--theme-hot": "#fe0979",
      "--theme-button": "linear-gradient(135deg, #00f2fe, #fe0979)",
      "--theme-cta": "linear-gradient(135deg, #fe0979, #00f2fe)"
    },
    howToUse: {
      title: "How to download TikTok videos",
      steps: [
        { title: "Copy TikTok video link", desc: "Open the TikTok app, locate the video or slideshow you want, and copy its public share link.", icon: "content_copy" },
        { title: "Use TikTok link analyzer", desc: "Paste the copied TikTok video link into our analyzer field above to extract raw source formats.", icon: "link" },
        { title: "Download TikTok no watermark", desc: "Click the download button next to the high quality MP4 to save the clean video without watermark logo.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Can I download TikTok videos without watermark?", answer: "Yes! Our downloader identifies clean CDN links to extract TikTok videos in HD MP4 without logos when available." },
      { question: "Does it support TikTok photo slides?", answer: "Yes, it parses slide photos and lets you download individual images or the generated video." }
    ]
  },
  "tiktok-audio": {
    key: "tiktok-audio",
    route: "/tiktok-audio-downloader",
    title: "TikTok Audio Downloader - Extract MP3 Tracks - Social Downloader",
    description: "Extract and download high-quality MP3 audio tracks and sounds from any public TikTok video instantly.",
    eyebrow: "TikTok audio extractor",
    heroTitle: "Download TikTok Audio as MP3",
    heroSubtitle: "Save background music, sounds, and voices from public TikTok videos in crystal-clear audio quality.",
    placeholder: "Paste TikTok video link to extract audio...",
    icon: "audiotrack",
    badge: "TTA",
    theme: {
      "--theme-a": "rgba(244, 63, 94, 0.18)",
      "--theme-b": "rgba(0, 242, 234, 0.12)",
      "--theme-accent": "#f43f5e",
      "--theme-hot": "#00f2fe",
      "--theme-button": "linear-gradient(135deg, #f43f5e, #00f2fe)",
      "--theme-cta": "linear-gradient(135deg, #00f2fe, #f43f5e)"
    },
    howToUse: {
      title: "How to download TikTok audio",
      steps: [
        { title: "Copy TikTok sound URL", desc: "Copy the share link of the TikTok video containing the audio or sound you want to extract.", icon: "content_copy" },
        { title: "Analyze audio link", desc: "Paste the URL into our tool to analyze the media structures and isolate the audio channel.", icon: "link" },
        { title: "Save MP3 track", desc: "Choose the extracted audio format and download the MP3 track directly to your device.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "What audio formats are supported?", answer: "We support extracting audio in standard high-bitrate MP3, M4A, and WebM format." },
      { question: "Is there any limit to audio extraction length?", answer: "No, you can extract audio of any duration from public TikTok videos." }
    ]
  },
  "instagram-video": {
    key: "instagram-video",
    route: "/instagram-video-downloader",
    title: "Instagram Video Downloader - Save Videos, Reels & Stories",
    description: "Save public Instagram videos, reels, stories, and feed posts in original HD quality. Free, fast, and no account needed.",
    eyebrow: "Instagram video downloader",
    heroTitle: "Save Instagram Videos in HD",
    heroSubtitle: "Download public Instagram feed videos, IGTV, and posts instantly as high-quality MP4 files.",
    placeholder: "Paste Instagram video post link...",
    icon: "video_settings",
    badge: "IGV",
    theme: {
      "--theme-a": "rgba(131, 58, 180, 0.2)",
      "--theme-b": "rgba(252, 176, 69, 0.14)",
      "--theme-accent": "#e1306c",
      "--theme-hot": "#f77737",
      "--theme-button": "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
      "--theme-cta": "linear-gradient(135deg, #e1306c, #f77737)"
    },
    howToUse: {
      title: "How to download Instagram videos",
      steps: [
        { title: "Copy Instagram link", desc: "Tap the share icon on the Instagram post containing the video and select 'Copy Link'.", icon: "content_copy" },
        { title: "Paste into extractor", desc: "Paste the copied Instagram video URL into the link box above and hit Analyze.", icon: "link" },
        { title: "Download HD MP4", desc: "Select the desired HD quality download options and save it to your local camera roll.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Does it support IGTV videos?", answer: "Yes, you can copy any public IGTV post link and download the full video file." },
      { question: "Is registration required?", answer: "No. You do not need an account, password, or sign-up. It is 100% free and open." }
    ]
  },
  "instagram-reels": {
    key: "instagram-reels",
    route: "/instagram-reels-downloader",
    title: "Instagram Reels Downloader - Save Reels in HD",
    description: "Paste an Instagram Reel link to analyze public media, view creator details, and download HD video or thumbnails.",
    eyebrow: "Instagram Reels downloader",
    heroTitle: "Save Instagram Reels and thumbnails.",
    heroSubtitle: "Paste a public Reel or post link to preview media, profile details, and clean download options.",
    placeholder: "Paste an Instagram Reel URL...",
    icon: "camera_roll",
    badge: "IGR",
    theme: {
      "--theme-a": "rgba(131, 58, 180, 0.2)",
      "--theme-b": "rgba(252, 176, 69, 0.14)",
      "--theme-accent": "#e1306c",
      "--theme-hot": "#f77737",
      "--theme-button": "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
      "--theme-cta": "linear-gradient(135deg, #e1306c, #f77737)"
    },
    howToUse: {
      title: "How to download Instagram Reels",
      steps: [
        { title: "Copy Instagram Reels link", desc: "Go to Instagram, tap the share sheet on any Reel, post, or video, and copy the public URL.", icon: "content_copy" },
        { title: "Run Reels video extractor", desc: "Paste the link into the extractor input above to gather high-resolution assets and creator profiles.", icon: "link" },
        { title: "Download HD Reels MP4", desc: "Choose the best quality download format to save the video file directly to your local device.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "What is the maximum download resolution?", answer: "The downloader saves the exact source file resolution uploaded to Instagram, usually up to 1080p HD." },
      { question: "Can I download audio from Reels?", answer: "Yes, you can extract the background audio track as a separate file under the 'More formats' section." }
    ]
  },
  "instagram-story": {
    key: "instagram-story",
    route: "/instagram-story-downloader",
    title: "Instagram Story Downloader - Save Stories & Highlights",
    description: "Download public Instagram stories and highlights anonymously. Save story photos and videos in original quality.",
    eyebrow: "Instagram Story Downloader",
    heroTitle: "Download Instagram Stories Anonymously",
    heroSubtitle: "Save public stories and highlights from Instagram profile links in high definition without signing in.",
    placeholder: "Paste Instagram Story or profile URL...",
    icon: "history_toggle_off",
    badge: "IGS",
    theme: {
      "--theme-a": "rgba(131, 58, 180, 0.2)",
      "--theme-b": "rgba(255, 0, 80, 0.14)",
      "--theme-accent": "#fd1d1d",
      "--theme-hot": "#fcb045",
      "--theme-button": "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
      "--theme-cta": "linear-gradient(135deg, #fd1d1d, #fcb045)"
    },
    howToUse: {
      title: "How to download Instagram stories",
      steps: [
        { title: "Copy Story Link", desc: "Navigate to the public story, tap the share menu, and select 'Copy Link'.", icon: "content_copy" },
        { title: "Paste in analyzer", desc: "Paste the link in our input field and let the extractor scan for active media elements.", icon: "link" },
        { title: "Save Story", desc: "Click the download button to save the MP4 video or high-quality JPG image to your device.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Can I download stories from private accounts?", answer: "No, stories can only be parsed from public Instagram accounts due to platform privacy restrictions." },
      { question: "Are my downloads anonymous?", answer: "Yes. The account owner will not see your name in the viewer list when downloading through our tool." }
    ]
  },
  "instagram-photo": {
    key: "instagram-photo",
    route: "/instagram-photo-downloader",
    title: "Instagram Photo Downloader - Save Photos & Carousels",
    description: "Download Instagram photos, slideshows, and carousel images in original high-resolution resolution with no login.",
    eyebrow: "Instagram photo saver",
    heroTitle: "Save Instagram Photos in HD",
    heroSubtitle: "Save high-resolution images, carousels, and profile headers directly from Instagram to your device.",
    placeholder: "Paste Instagram post URL...",
    icon: "photo_library",
    badge: "IGP",
    theme: {
      "--theme-a": "rgba(131, 58, 180, 0.2)",
      "--theme-b": "rgba(252, 176, 69, 0.14)",
      "--theme-accent": "#e1306c",
      "--theme-hot": "#fcb045",
      "--theme-button": "linear-gradient(135deg, #e1306c, #fd1d1d, #fcb045)",
      "--theme-cta": "linear-gradient(135deg, #e1306c, #fcb045)"
    },
    howToUse: {
      title: "How to download Instagram photos",
      steps: [
        { title: "Copy Photo Link", desc: "Find the photo or carousel you like, tap the share button, and select copy link.", icon: "content_copy" },
        { title: "Analyze post", desc: "Paste the URL to detect and isolate all high-resolution images within the post.", icon: "link" },
        { title: "Download images", desc: "Choose the individual photos or download the entire post's media catalog.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Can I download multiple photos from a carousel?", answer: "Yes, our tool extracts all images from multi-photo posts so you can download them individually." },
      { question: "Does it compromise photo quality?", answer: "No. The images are downloaded in their original raw resolution as uploaded by the user." }
    ]
  },
  "instagram-audio": {
    key: "instagram-audio",
    route: "/instagram-audio-downloader",
    title: "Instagram Audio Downloader - Extract MP3 Reels - Social Downloader",
    description: "Instantly extract and save crystal-clear MP3 audio from any public Instagram Reel, story, or video.",
    eyebrow: "Instagram Reels audio",
    heroTitle: "Extract Audio from Instagram Reels",
    heroSubtitle: "Convert Reels videos into high-quality MP3 or M4A audio files. Ideal for creators, editors, and music lovers.",
    placeholder: "Paste Instagram Reel link to download audio...",
    icon: "library_music",
    badge: "IGA",
    theme: {
      "--theme-a": "rgba(131, 58, 180, 0.16)",
      "--theme-b": "rgba(0, 198, 251, 0.12)",
      "--theme-accent": "#833ab4",
      "--theme-hot": "#00c6fb",
      "--theme-button": "linear-gradient(135deg, #833ab4, #00c6fb)",
      "--theme-cta": "linear-gradient(135deg, #00c6fb, #833ab4)"
    },
    howToUse: {
      title: "How to extract Instagram Reels audio",
      steps: [
        { title: "Copy Reel URL", desc: "Locate the public Reel, tap the share icon, and choose 'Copy Link'.", icon: "content_copy" },
        { title: "Run audio analyzer", desc: "Paste the link in the input box and let our tool isolate the background audio track.", icon: "link" },
        { title: "Save MP3", desc: "Click the download button to save the audio file directly to your downloads folder.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "What is the audio output format?", answer: "The audio is extracted in original M4A or high-quality MP3 (320kbps fallback)." },
      { question: "Can I extract audio from stories?", answer: "Yes, if the story has an active public video link, you can extract the audio track from it." }
    ]
  },
  "instagram-highlight": {
    key: "instagram-highlight",
    route: "/instagram-highlight-downloader",
    title: "Instagram Highlight Downloader - Save Story Highlights - Social Downloader",
    description: "View and download public Instagram Highlights offline in high-quality HD format without requiring any account login.",
    eyebrow: "Instagram highlights saver",
    heroTitle: "Download Instagram Highlights",
    heroSubtitle: "Save complete highlight collections from public profiles to your device in original quality.",
    placeholder: "Paste Instagram Highlight link or URL...",
    icon: "auto_awesome_motion",
    badge: "IGH",
    theme: {
      "--theme-a": "rgba(131, 58, 180, 0.2)",
      "--theme-b": "rgba(252, 176, 69, 0.14)",
      "--theme-accent": "#e1306c",
      "--theme-hot": "#fcb045",
      "--theme-button": "linear-gradient(135deg, #833ab4, #e1306c, #fcb045)",
      "--theme-cta": "linear-gradient(135deg, #e1306c, #fcb045)"
    },
    howToUse: {
      title: "How to download Instagram highlights",
      steps: [
        { title: "Copy Highlight link", desc: "Open the highlight album on Instagram, tap the share menu, and copy the link.", icon: "content_copy" },
        { title: "Analyze collection", desc: "Paste the link into the analyzer above to load all media items in the highlight.", icon: "link" },
        { title: "Save HD files", desc: "Choose the stories you wish to archive and download them as videos or photos.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Can I download multiple stories from a highlight?", answer: "Yes. Our tool displays all the stories contained in that highlight, letting you download any or all of them." },
      { question: "Do I need to sign in to my account?", answer: "No. Our tool is entirely web-based and doesn't require your Instagram credentials." }
    ]
  },
  "instagram-dp": {
    key: "instagram-dp",
    route: "/instagram-dp-viewer-downloader",
    title: "Instagram DP Viewer & Downloader - Save Profile Pictures HD",
    description: "View and download Instagram profile pictures in full resolution. Save profile DPs in HD quality anonymously.",
    eyebrow: "Insta DP Viewer",
    heroTitle: "Instagram DP Downloader",
    heroSubtitle: "View profile photos in full scale and download high-resolution profile pictures (DP) from any public account.",
    placeholder: "Paste Instagram profile URL or username...",
    icon: "account_circle",
    badge: "IGDP",
    theme: {
      "--theme-a": "rgba(131, 58, 180, 0.18)",
      "--theme-b": "rgba(252, 176, 69, 0.1)",
      "--theme-accent": "#833ab4",
      "--theme-hot": "#fd1d1d",
      "--theme-button": "linear-gradient(135deg, #833ab4, #fd1d1d)",
      "--theme-cta": "linear-gradient(135deg, #fd1d1d, #833ab4)"
    },
    howToUse: {
      title: "How to download Instagram profile pictures",
      steps: [
        { title: "Copy profile URL", desc: "Go to the profile page on Instagram and copy the profile's share URL.", icon: "content_copy" },
        { title: "Run DP inspector", desc: "Paste the URL or username in the analyzer to fetch the full HD profile image.", icon: "link" },
        { title: "Download DP in HD", desc: "Click the high quality download button to save the full size profile photo.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Can I view profile pictures of private accounts?", answer: "Yes! Profile pictures are always public, so you can view and download them even for private profiles." },
      { question: "Is the user notified when I download their DP?", answer: "No, the process is completely anonymous. The user will never know you viewed or downloaded their DP." }
    ]
  },
  "instagram-caption": {
    key: "instagram-caption",
    route: "/instagram-caption-saver",
    title: "Instagram Caption Saver & Downloader - Copy IG Captions",
    description: "Extract and copy text captions and hashtags from any Instagram post or Reel easily. Free, web-based utility.",
    eyebrow: "Instagram caption copier",
    heroTitle: "Copy & Save Instagram Captions",
    heroSubtitle: "Easily extract text descriptions, hashtags, and captions from Instagram posts and Reels with a single click.",
    placeholder: "Paste Instagram post URL to extract text...",
    icon: "notes",
    badge: "IGC",
    theme: {
      "--theme-a": "rgba(139, 92, 246, 0.16)",
      "--theme-b": "rgba(0, 198, 251, 0.1)",
      "--theme-accent": "#8b5cf6",
      "--theme-hot": "#00c6fb",
      "--theme-button": "linear-gradient(135deg, #8b5cf6, #00c6fb)",
      "--theme-cta": "linear-gradient(135deg, #00c6fb, #8b5cf6)"
    },
    howToUse: {
      title: "How to copy Instagram captions",
      steps: [
        { title: "Copy Instagram link", desc: "Copy the public post link containing the text or caption you want to save.", icon: "content_copy" },
        { title: "Extract caption text", desc: "Paste the link into the box above to extract the post's textual description.", icon: "link" },
        { title: "Copy to clipboard", desc: "Click the copy button or select the text to save it for your next project.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Does it extract hashtags as well?", answer: "Yes, it extracts the entire description including emoji, formatting, and hashtags." },
      { question: "Can I copy captions from Reels?", answer: "Yes, it extracts captions from Instagram Reels, standard posts, and IGTV videos." }
    ]
  },
  "facebook-video": {
    key: "facebook-video",
    route: "/facebook-video-downloader",
    title: "Facebook Video Downloader - Save Public Videos",
    description: "Analyze public Facebook video links and download available MP4 video assets, thumbnails, and metadata.",
    eyebrow: "Facebook video downloader",
    heroTitle: "Download Facebook Videos & Reels",
    heroSubtitle: "GetInDevice's Facebook Downloader is a free, web-based tool that lets you save Facebook videos, reels, stories, and audio instantly.",
    placeholder: "Paste a Facebook video URL...",
    icon: "public",
    badge: "FB",
    theme: {
      "--theme-a": "rgba(24, 119, 242, 0.2)",
      "--theme-b": "rgba(0, 198, 251, 0.12)",
      "--theme-accent": "#1877f2",
      "--theme-hot": "#00c6fb",
      "--theme-button": "linear-gradient(135deg, #1877f2, #00c6fb)",
      "--theme-cta": "linear-gradient(135deg, #1877f2, #0e56b3)"
    },
    howToUse: {
      title: "How to download Facebook videos",
      steps: [
        { title: "Copy Facebook video link", desc: "Navigate to the public Facebook video, click the share menu, and select copy link.", icon: "content_copy" },
        { title: "Use Facebook media parser", desc: "Paste the video link into the analyzer to parse the SD/HD stream locations and thumbnails.", icon: "link" },
        { title: "Download Facebook videos", desc: "Press the high-quality download button to save the MP4 video file straight to your folder.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "What video formats are downloaded?", answer: "We support high-bitrate MP4 formats with audio sync, ranging from SD to HD resolutions." },
      { question: "Does it support Facebook private videos?", answer: "For private videos, check our specialized Facebook Private Downloader tool page." }
    ]
  },
  "facebook-reel": {
    key: "facebook-reel",
    route: "/facebook-reel-downloader",
    title: "Download Facebook Reels & Videos - Social Downloader",
    description: "Download Facebook Reels with metadata scrubbing for enhanced privacy. Extract high-bitrate MP4s for offline playback.",
    eyebrow: "Facebook Reels Downloader",
    heroTitle: "Save Facebook Reels in Full HD",
    heroSubtitle: "Save public Reels from Facebook instantly. No installation, fast speeds, and crystal clear MP4 outputs.",
    placeholder: "Paste a Facebook Reel URL...",
    icon: "video_collection",
    badge: "FBR",
    theme: {
      "--theme-a": "rgba(24, 119, 242, 0.18)",
      "--theme-b": "rgba(217, 70, 239, 0.12)",
      "--theme-accent": "#1877f2",
      "--theme-hot": "#d946ef",
      "--theme-button": "linear-gradient(135deg, #1877f2, #d946ef)",
      "--theme-cta": "linear-gradient(135deg, #d946ef, #1877f2)"
    },
    howToUse: {
      title: "How to download Facebook Reels",
      steps: [
        { title: "Copy Facebook Reel URL", desc: "Locate the Reel on Facebook, tap share, and select 'Copy Link'.", icon: "content_copy" },
        { title: "Run Reels extractor", desc: "Paste the Reel URL in the box above to extract available MP4 video quality options.", icon: "link" },
        { title: "Save video to device", desc: "Click the download button to save the Reel as a high-definition MP4.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Can I download Facebook Reels in HD?", answer: "Yes. Our tool fetches the highest available bitrate formats, including 1080p and 720p HD." },
      { question: "Is there a limit on how many Reels I can download?", answer: "No, you can download unlimited Facebook Reels for free." }
    ]
  },
  "facebook-private": {
    key: "facebook-private",
    route: "/facebook-private-video-downloader",
    title: "Facebook Private Video Downloader - Save Private FB Content",
    description: "Download private Facebook videos by leveraging your authorized access. Save original high-bitrate MP4 files locally without server interaction.",
    eyebrow: "Facebook Private Downloader",
    heroTitle: "Download Private Facebook Videos",
    heroSubtitle: "Save private videos from profiles or groups that you have authorized access to, safely and directly.",
    placeholder: "Paste private video page source code or URL...",
    icon: "lock",
    badge: "FBP",
    theme: {
      "--theme-a": "rgba(15, 23, 42, 0.4)",
      "--theme-b": "rgba(24, 119, 242, 0.14)",
      "--theme-accent": "#1e293b",
      "--theme-hot": "#1877f2",
      "--theme-button": "linear-gradient(135deg, #1e293b, #1877f2)",
      "--theme-cta": "linear-gradient(135deg, #1877f2, #1e293b)"
    },
    howToUse: {
      title: "How to download private Facebook videos",
      steps: [
        { title: "Open video source", desc: "Open the private Facebook video in a browser tab. Press Ctrl+U (Windows) or Cmd+Option+U (Mac) to view source.", icon: "content_copy" },
        { title: "Paste page source", desc: "Select all (Ctrl+A), copy the source text, and paste it into the analyzer input above.", icon: "link" },
        { title: "Generate download link", desc: "Our system will decode the media parameters and display direct download links for the private MP4.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Do you save my Facebook credentials?", answer: "No. The processing happens entirely client-side. We never ask for, see, or save your credentials." },
      { question: "Why do I need the page source?", answer: "Since private videos require your account permissions, you must supply the source code containing the authorized stream tokens." }
    ]
  },
  "facebook-live": {
    key: "facebook-live",
    route: "/facebook-live-video-downloader",
    title: "Facebook Live Video Downloader - Save FB Live Streams",
    description: "Download completed Facebook Live video recordings in high quality. Save Live broadcasts to your device instantly.",
    eyebrow: "FB Live Downloader",
    heroTitle: "Save Facebook Live Broadcasts",
    heroSubtitle: "Download public Live stream recordings once they have ended. Simple, fast, and secure.",
    placeholder: "Paste ended Facebook Live video link...",
    icon: "live_tv",
    badge: "FBL",
    theme: {
      "--theme-a": "rgba(239, 68, 68, 0.18)",
      "--theme-b": "rgba(24, 119, 242, 0.12)",
      "--theme-accent": "#ef4444",
      "--theme-hot": "#1877f2",
      "--theme-button": "linear-gradient(135deg, #ef4444, #1877f2)",
      "--theme-cta": "linear-gradient(135deg, #1877f2, #ef4444)"
    },
    howToUse: {
      title: "How to download Facebook Live videos",
      steps: [
        { title: "Copy completed Live URL", desc: "Find the recorded Live stream post on Facebook and copy its share link once the stream has ended.", icon: "content_copy" },
        { title: "Analyze Live link", desc: "Paste the URL in our downloader. The system extracts the cached video files.", icon: "link" },
        { title: "Save Live stream", desc: "Select the desired resolution (SD/HD) and download the file to your computer.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Can I download active, currently streaming Live videos?", answer: "No. You must wait for the Live stream to end and be published as a post before downloading it." },
      { question: "Does it support 1080p downloads?", answer: "Yes, if the broadcaster streamed in 1080p, our tool will provide the high-quality option." }
    ]
  },
  "facebook-story": {
    key: "facebook-story",
    route: "/facebook-story-downloader",
    title: "Facebook Story Downloader - Save Stories & Videos",
    description: "Download public Facebook stories and slides to your device instantly. 100% free, safe, and no watermark.",
    eyebrow: "FB Story Downloader",
    heroTitle: "Download Facebook Stories Offline",
    heroSubtitle: "Save photos and video clips from public Facebook stories directly to your phone or PC in one click.",
    placeholder: "Paste Facebook Story or profile link...",
    icon: "amp_stories",
    badge: "FBS",
    theme: {
      "--theme-a": "rgba(24, 119, 242, 0.16)",
      "--theme-b": "rgba(168, 85, 247, 0.12)",
      "--theme-accent": "#1877f2",
      "--theme-hot": "#a855f7",
      "--theme-button": "linear-gradient(135deg, #1877f2, #a855f7)",
      "--theme-cta": "linear-gradient(135deg, #a855f7, #1877f2)"
    },
    howToUse: {
      title: "How to download Facebook stories",
      steps: [
        { title: "Copy Story URL", desc: "Open the Facebook story, tap the share sheet or three-dots menu, and select copy link.", icon: "content_copy" },
        { title: "Analyze Story link", desc: "Paste the story link in the input box to scan and parse the active media assets.", icon: "link" },
        { title: "Download Story asset", desc: "Click the download button next to the extracted image or video file to save it.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Can I download private stories?", answer: "No. Only stories published publicly can be analyzed and downloaded by our server." },
      { question: "How long are story links active?", answer: "Facebook stories expire after 24 hours. Ensure you download them while they are still active on the platform." }
    ]
  },
  "pinterest-video": {
    key: "pinterest-video",
    route: "/pinterest-video-downloader",
    title: "Pinterest Video Downloader - Save Pins and Thumbnails",
    description: "Download public Pinterest videos and thumbnails while previewing available pin and creator metadata.",
    eyebrow: "Pinterest video downloader",
    heroTitle: "Save Pinterest videos and pin thumbnails.",
    heroSubtitle: "Analyze public pins, preview media, and download available video or thumbnail assets.",
    placeholder: "Paste a Pinterest video URL...",
    icon: "bookmarks",
    badge: "PI",
    theme: {
      "--theme-a": "rgba(230, 0, 35, 0.18)",
      "--theme-b": "rgba(255, 100, 100, 0.12)",
      "--theme-accent": "#e60023",
      "--theme-hot": "#bd081c",
      "--theme-button": "linear-gradient(135deg, #e60023, #bd081c)",
      "--theme-cta": "linear-gradient(135deg, #e60023, #ff4d6d)"
    },
    howToUse: {
      title: "How to download Pinterest videos",
      steps: [
        { title: "Copy Pinterest Pin link", desc: "Open the Pin you wish to save, click share, and copy the link of the video pin.", icon: "content_copy" },
        { title: "Open Pinterest Pin inspector", desc: "Paste the copied URL in the input above to decode the direct media streams and images.", icon: "link" },
        { title: "Save HD Pin downloader", desc: "Select the high-quality MP4 file or choose the HD thumbnail image to download locally.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Does it support image pins?", answer: "Yes, you can paste standard image pins to extract and download the raw original image files." },
      { question: "Are my downloads saved on the server?", answer: "No, downloads are processed anonymously and streamed directly from Pinterest's CDN servers to your device." }
    ]
  },
  "pinterest-image": {
    key: "pinterest-image",
    route: "/pinterest-image-downloader",
    title: "Pinterest Image Downloader - Save Photos & Pins",
    description: "Download Pinterest images in full resolution. Save creative inspiration, wallpapers, and drawings instantly.",
    eyebrow: "Pinterest image downloader",
    heroTitle: "Download Pinterest Pins in High Resolution",
    heroSubtitle: "Save high-definition pictures, graphics, and art from Pinterest pins directly to your device.",
    placeholder: "Paste a Pinterest Pin URL...",
    icon: "image",
    badge: "PIP",
    theme: {
      "--theme-a": "rgba(230, 0, 35, 0.16)",
      "--theme-b": "rgba(244, 63, 94, 0.12)",
      "--theme-accent": "#e60023",
      "--theme-hot": "#f43f5e",
      "--theme-button": "linear-gradient(135deg, #e60023, #f43f5e)",
      "--theme-cta": "linear-gradient(135deg, #f43f5e, #e60023)"
    },
    howToUse: {
      title: "How to download Pinterest images",
      steps: [
        { title: "Copy Pin URL", desc: "Find the Pin you want, click the three-dots menu or share icon, and select 'Copy Link'.", icon: "content_copy" },
        { title: "Paste in downloader", desc: "Paste the URL into our tool to analyze the page parameters and extract the raw photo link.", icon: "link" },
        { title: "Download full resolution", desc: "Click the download option to save the highest resolution image directly to your gallery.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Can I download GIFs from Pinterest?", answer: "Yes, our tool supports downloading animated GIFs from Pinterest pins as well." },
      { question: "Does it work on mobile?", answer: "Yes, it works seamlessly on all mobile browsers on Android and iOS." }
    ]
  },
  "linkedin": {
    key: "linkedin",
    route: "/linkedin-video-downloader",
    title: "LinkedIn Video Downloader - Save LinkedIn Videos Offline",
    description: "Download LinkedIn videos in high quality. Save tutorials, business reports, and networking clips for offline viewing.",
    eyebrow: "LinkedIn Downloader",
    heroTitle: "Download LinkedIn Videos in HD",
    heroSubtitle: "Save professional video clips and tutorials from public LinkedIn posts instantly as MP4 files.",
    placeholder: "Paste public LinkedIn post link...",
    icon: "work",
    badge: "LN",
    theme: {
      "--theme-a": "rgba(10, 102, 194, 0.2)",
      "--theme-b": "rgba(5, 5, 20, 0.12)",
      "--theme-accent": "#0a66c2",
      "--theme-hot": "#0077b5",
      "--theme-button": "linear-gradient(135deg, #0a66c2, #0077b5)",
      "--theme-cta": "linear-gradient(135deg, #0077b5, #0a66c2)"
    },
    howToUse: {
      title: "How to download LinkedIn videos",
      steps: [
        { title: "Copy LinkedIn post URL", desc: "Locate the video post, click the three-dots menu in the top right, and click 'Copy link to post'.", icon: "content_copy" },
        { title: "Paste in analyzer", desc: "Paste the post link in the link box above and let the server fetch the MP4 streams.", icon: "link" },
        { title: "Download MP4", desc: "Select the video resolution (e.g. 720p or 1080p) and save the clip directly.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Does this require a LinkedIn login?", answer: "No, you don't need to log in. You can download any public video by just pasting its post link." },
      { question: "Is there a watermark on LinkedIn downloads?", answer: "No, our tool extracts direct raw streams, meaning there are no watermarks or logos added." }
    ]
  },
  "threads": {
    key: "threads",
    route: "/threads-video-downloader",
    title: "Threads Video Downloader - Save Threads Videos & Clips",
    description: "Download Threads videos offline in high quality without any login. Save stories, clips, and photos instantly.",
    eyebrow: "Threads Downloader",
    heroTitle: "Download Threads Videos in HD",
    heroSubtitle: "Save videos, clips, and slides from Meta's Threads app instantly to your device.",
    placeholder: "Paste a Threads post link...",
    icon: "alternate_email",
    badge: "TH",
    theme: {
      "--theme-a": "rgba(255, 255, 255, 0.12)",
      "--theme-b": "rgba(20, 20, 20, 0.1)",
      "--theme-accent": "#ffffff",
      "--theme-hot": "#101010",
      "--theme-button": "linear-gradient(135deg, #111111, #333333)",
      "--theme-cta": "linear-gradient(135deg, #222222, #000000)"
    },
    howToUse: {
      title: "How to download Threads videos",
      steps: [
        { title: "Copy Threads link", desc: "Open the Threads app, tap the paper airplane (share) icon, and select 'Copy Link'.", icon: "content_copy" },
        { title: "Paste link in parser", desc: "Paste the copied Threads link into the analyzer to parse the media layout.", icon: "link" },
        { title: "Download video", desc: "Choose the high resolution option and save the MP4 video to your device.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Can I download photos from Threads?", answer: "Yes, if a post contains photos or slides, our tool will show download options for all images." },
      { question: "Is there any watermark on Threads videos?", answer: "No, the videos are saved in their original quality without watermark templates." }
    ]
  },
  "vimeo": {
    key: "vimeo",
    route: "/vimeo-video-downloader",
    title: "Vimeo Video Downloader - Save Vimeo Videos Offline",
    description: "Download any Vimeo video in high quality with no registration required. Secure, fast, and malware-free.",
    eyebrow: "Vimeo Downloader",
    heroTitle: "Save Vimeo Videos in HD & 4K",
    heroSubtitle: "Extract and download Vimeo videos, clips, and VODs in high resolution instantly.",
    placeholder: "Paste a Vimeo video link...",
    icon: "video_file",
    badge: "VI",
    theme: {
      "--theme-a": "rgba(26, 183, 234, 0.18)",
      "--theme-b": "rgba(0, 0, 0, 0.12)",
      "--theme-accent": "#1ab7ea",
      "--theme-hot": "#00adef",
      "--theme-button": "linear-gradient(135deg, #1ab7ea, #00adef)",
      "--theme-cta": "linear-gradient(135deg, #00adef, #1ab7ea)"
    },
    howToUse: {
      title: "How to download Vimeo videos",
      steps: [
        { title: "Copy Vimeo link", desc: "Locate the video on Vimeo, click the share button, and copy the URL.", icon: "content_copy" },
        { title: "Process Vimeo URL", desc: "Paste the URL in our input field. The system gathers available HD/SD streams.", icon: "link" },
        { title: "Save Vimeo video", desc: "Select the desired format, including HD or audio tracks, and save it.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Can I download password-protected Vimeo videos?", answer: "No, our tool only supports public Vimeo videos. Private or password-protected content cannot be processed." },
      { question: "Can I extract audio only?", answer: "Yes, you can extract and download the audio track as an MP3 or M4A format." }
    ]
  },
  "snapchat-story": {
    key: "snapchat-story",
    route: "/snapchat-story-downloader-viewer",
    title: "Snapchat Story Viewer & Downloader - Save Stories Anonymously",
    description: "Download and view Snapchat stories anonymously with our stealth viewer. Save high-quality video and photo files.",
    eyebrow: "Snapchat Story Downloader",
    heroTitle: "Stealth Snapchat Story Viewer & Downloader",
    heroSubtitle: "View Snapchat public stories anonymously and download them in HD quality without notify logs.",
    placeholder: "Paste Snapchat username or story link...",
    icon: "history",
    badge: "SCS",
    theme: {
      "--theme-a": "rgba(255, 252, 0, 0.22)",
      "--theme-b": "rgba(0, 0, 0, 0.15)",
      "--theme-accent": "#fffc00",
      "--theme-hot": "#e6e200",
      "--theme-button": "linear-gradient(135deg, #fffc00, #111111)",
      "--theme-cta": "linear-gradient(135deg, #111111, #fffc00)"
    },
    howToUse: {
      title: "How to download Snapchat stories",
      steps: [
        { title: "Copy Story Share Link", desc: "Copy the public story link or profile URL from the Snapchat app share menu.", icon: "content_copy" },
        { title: "Paste in Snapchat viewer", desc: "Paste the URL in the downloader search bar and click analyze to fetch active stories.", icon: "link" },
        { title: "Save Snapchat story", desc: "Click the download button next to the stories cards to save the MP4 video files.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Is the creator notified when I download a story?", answer: "No. Our tool processes the download anonymously, so it will not trigger a notification on the creator's end." },
      { question: "Does it support spotlight videos?", answer: "Yes, you can download public Spotlight videos using the same process." }
    ]
  },
  "snapchat": {
    key: "snapchat",
    route: "/snapchat-downloader",
    title: "Snapchat Video Downloader - Save Snapchat Videos Online",
    description: "Download Snapchat Spotlight and public videos online, without watermarks, directly from any device. Fast and free.",
    eyebrow: "Snapchat Downloader",
    heroTitle: "Save Snapchat Videos Instantly",
    heroSubtitle: "Save public Snapchat spotlight videos and clips to your mobile gallery or PC without watermarks.",
    placeholder: "Paste Snapchat spotlight or video link...",
    icon: "chat_bubble",
    badge: "SCV",
    theme: {
      "--theme-a": "rgba(255, 252, 0, 0.2)",
      "--theme-b": "rgba(255, 255, 255, 0.12)",
      "--theme-accent": "#fffc00",
      "--theme-hot": "#ffffff",
      "--theme-button": "linear-gradient(135deg, #fffc00, #ffffff)",
      "--theme-cta": "linear-gradient(135deg, #ffffff, #fffc00)"
    },
    howToUse: {
      title: "How to download Snapchat videos",
      steps: [
        { title: "Copy video link", desc: "In Snapchat, tap the share button on the Spotlight or clip and select 'Copy Link'.", icon: "content_copy" },
        { title: "Paste in downloader", desc: "Paste the URL into our tool to analyze the media parameters and locate the raw MP4 stream.", icon: "link" },
        { title: "Download video", desc: "Press the download button to save the MP4 file without watermarks.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Can I download snaps from chat chats?", answer: "No, our tool does not access private chat messages or direct snaps for security and privacy reasons." },
      { question: "Is it compatible with iOS and Android?", answer: "Yes, it works directly inside mobile safari or chrome browsers without installing any app." }
    ]
  },
  "rumble": {
    key: "rumble",
    route: "/rumble-video-downloader",
    title: "Rumble Video Downloader - Save Rumble Videos and Clips",
    description: "Save Rumble videos to your device in just a few seconds. No app installation or login required. High-speed MP4 downloads.",
    eyebrow: "Rumble video downloader",
    heroTitle: "Download Rumble Videos in HD",
    heroSubtitle: "Save public Rumble videos, clips, and live streams offline as MP4 files. No login required.",
    placeholder: "Paste a Rumble video URL...",
    icon: "play_arrow",
    badge: "RM",
    theme: {
      "--theme-a": "rgba(133, 199, 36, 0.2)",
      "--theme-b": "rgba(20, 20, 20, 0.12)",
      "--theme-accent": "#85c724",
      "--theme-hot": "#5b8a15",
      "--theme-button": "linear-gradient(135deg, #85c724, #1a1a1a)",
      "--theme-cta": "linear-gradient(135deg, #1a1a1a, #85c724)"
    },
    howToUse: {
      title: "How to download Rumble videos",
      steps: [
        { title: "Copy Rumble video URL", desc: "Copy the page link of the video directly from the browser address bar or share sheet.", icon: "content_copy" },
        { title: "Paste in Rumble parser", desc: "Paste the Rumble video link into the analyzer to decode the HD video qualities.", icon: "link" },
        { title: "Download video", desc: "Choose the high resolution MP4 file option and save it.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Does it support 1080p Rumble videos?", answer: "Yes. Our tool extracts all resolutions offered by the Rumble server, including HD and 4K options." },
      { question: "Can I download Rumble live streams?", answer: "Only completed live streams that have been processed and archived as videos can be downloaded." }
    ]
  },
  "tumblr": {
    key: "tumblr",
    route: "/tumblr-video-downloader",
    title: "Download Tumblr Video, Images & GIF - Social Downloader",
    description: "GetinDevice is the ultimate free online Tumblr Video Downloader. Download Tumblr videos in high-quality HD MP4, save GIFs.",
    eyebrow: "Tumblr video downloader",
    heroTitle: "Save Tumblr Videos, Images & GIFs",
    heroSubtitle: "Save your favorite Tumblr media offline. Supports video MP4 files, animated GIFs, and static pictures.",
    placeholder: "Paste a Tumblr post URL...",
    icon: "favorite",
    badge: "TM",
    theme: {
      "--theme-a": "rgba(53, 70, 92, 0.2)",
      "--theme-b": "rgba(0, 25, 53, 0.15)",
      "--theme-accent": "#35465c",
      "--theme-hot": "#001935",
      "--theme-button": "linear-gradient(135deg, #35465c, #001935)",
      "--theme-cta": "linear-gradient(135deg, #001935, #35465c)"
    },
    howToUse: {
      title: "How to download Tumblr videos",
      steps: [
        { title: "Copy Tumblr link", desc: "Click the share icon on the Tumblr post containing the video, GIF, or photo and copy link.", icon: "content_copy" },
        { title: "Extract Tumblr assets", desc: "Paste the link into our tool and hit Analyze to map the raw CDN endpoints.", icon: "link" },
        { title: "Save media file", desc: "Download the MP4 video, file, or image directly to your local workspace.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "What formats does this tool support?", answer: "We support downloading Tumblr videos in MP4, photos in JPEG/PNG, and animated files in GIF format." },
      { question: "Do I need a Tumblr account?", answer: "No, you can download public media without having a Tumblr account or signing in." }
    ]
  },
  "twitter": {
    key: "twitter",
    route: "/twitter-video-downloader",
    title: "Download X Videos, GIFs, and Audio - Twitter Downloader",
    description: "GetInDevice's X Video Downloader lets you download high-quality videos, GIFs, and audio directly to your device.",
    eyebrow: "Twitter X video downloader",
    heroTitle: "Download X & Twitter Videos",
    heroSubtitle: "Paste a public post link to extract available video formats, thumbnails, and creator metadata.",
    placeholder: "Paste an X or Twitter video URL...",
    icon: "close",
    badge: "X",
    theme: {
      "--theme-a": "rgba(255, 255, 255, 0.1)",
      "--theme-b": "rgba(60, 60, 60, 0.08)",
      "--theme-accent": "#ffffff",
      "--theme-hot": "#333333",
      "--theme-button": "linear-gradient(135deg, #111111, #444444)",
      "--theme-cta": "linear-gradient(135deg, #222222, #555555)"
    },
    howToUse: {
      title: "How to download X / Twitter videos",
      steps: [
        { title: "Copy X video post link", desc: "Click the share icon on the tweet containing the video or GIF and copy the link.", icon: "content_copy" },
        { title: "Run X / Twitter media fetcher", desc: "Paste the tweet link into the analyzer to search for available MP4 file resolutions.", icon: "link" },
        { title: "Save HD X video asset", desc: "Select the desired resolution size and download the clean video file to your system.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Can I download GIFs from X?", answer: "Yes, our tool extracts X GIFs as looping MP4 files, which is the standard format used by the platform." },
      { question: "Does it support X space audio recordings?", answer: "Yes, if the Space broadcast has ended and is public, you can extract the audio track as an MP3/M4A." }
    ]
  },
  "streamable": {
    key: "streamable",
    route: "/streamable-video-downloader",
    title: "Streamable Video Downloader - Save Streamable Clips Offline",
    description: "Save any public Streamable video offline in HD MP4 instantly without installing anything. No account needed, works on any device.",
    eyebrow: "Streamable Downloader",
    heroTitle: "Download Streamable Videos",
    heroSubtitle: "Save Streamable videos offline in HD MP4 instantly. Safe, fast, and no registration required.",
    placeholder: "Paste a Streamable video URL...",
    icon: "movie",
    badge: "ST",
    theme: {
      "--theme-a": "rgba(139, 92, 246, 0.18)",
      "--theme-b": "rgba(6, 182, 212, 0.12)",
      "--theme-accent": "#8b5cf6",
      "--theme-hot": "#06b6d4",
      "--theme-button": "linear-gradient(135deg, #8b5cf6, #06b6d4)",
      "--theme-cta": "linear-gradient(135deg, #06b6d4, #8b5cf6)"
    },
    howToUse: {
      title: "How to download Streamable videos",
      steps: [
        { title: "Copy Streamable URL", desc: "Copy the video link from your browser's URL bar or the Share menu on Streamable.", icon: "content_copy" },
        { title: "Paste in downloader", desc: "Paste the link into the box above and let the analyzer fetch the raw video file.", icon: "link" },
        { title: "Save MP4 video", desc: "Select the quality option and download the HD video file instantly.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Can I download private Streamable videos?", answer: "No. The video must be public or shareable without password constraints for our extractor to work." },
      { question: "Is the output file in MP4 format?", answer: "Yes, the downloaded file will be saved as a standard MP4 video compatible with all devices." }
    ]
  },
  "bitchute": {
    key: "bitchute",
    route: "/bitchute-video-downloader",
    title: "BitChute Video Downloader - Save BitChute Videos Offline",
    description: "Download BitChute videos in HD without watermark or software. Save offline on any device. Works on Android, iOS, Windows, Mac.",
    eyebrow: "BitChute Downloader",
    heroTitle: "Save BitChute Videos",
    heroSubtitle: "Save BitChute videos in HD quality directly to your phone or computer. 100% free and secure.",
    placeholder: "Paste BitChute video URL...",
    icon: "layers",
    badge: "BC",
    theme: {
      "--theme-a": "rgba(192, 0, 0, 0.18)",
      "--theme-b": "rgba(28, 28, 28, 0.12)",
      "--theme-accent": "#c00000",
      "--theme-hot": "#1c1c1c",
      "--theme-button": "linear-gradient(135deg, #c00000, #1c1c1c)",
      "--theme-cta": "linear-gradient(135deg, #1c1c1c, #c00000)"
    },
    howToUse: {
      title: "How to download BitChute videos",
      steps: [
        { title: "Copy BitChute URL", desc: "Copy the address of the BitChute page containing the video clip.", icon: "content_copy" },
        { title: "Paste URL here", desc: "Paste the link in the input form above and click Analyze to parse the video files.", icon: "link" },
        { title: "Download video", desc: "Click the download button next to the video resolution options to save it.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Does it add watermarks?", answer: "No, our BitChute downloader downloads the original raw files without adding any watermark logo." },
      { question: "Do I need any desktop software?", answer: "No. The entire process is web-based. No extra extensions or apps are required." }
    ]
  },
  "bandcamp": {
    key: "bandcamp",
    route: "/bandcamp-music-downloader",
    title: "Bandcamp Music Downloader - Save Music & Tracks",
    description: "Save high-quality Bandcamp tracks, albums, and video to your device instantly. No sign-ups required and your privacy is protected.",
    eyebrow: "Bandcamp Downloader",
    heroTitle: "Download Bandcamp Music & Songs",
    heroSubtitle: "Save audio tracks and songs from public Bandcamp artist pages directly to your local drive.",
    placeholder: "Paste Bandcamp track or album link...",
    icon: "music_note",
    badge: "BCM",
    theme: {
      "--theme-a": "rgba(30, 187, 187, 0.18)",
      "--theme-b": "rgba(20, 20, 20, 0.12)",
      "--theme-accent": "#1ebbbb",
      "--theme-hot": "#118888",
      "--theme-button": "linear-gradient(135deg, #1ebbbb, #111111)",
      "--theme-cta": "linear-gradient(135deg, #111111, #1ebbbb)"
    },
    howToUse: {
      title: "How to download Bandcamp music",
      steps: [
        { title: "Copy track URL", desc: "Navigate to the Bandcamp song page and copy the public URL from the browser.", icon: "content_copy" },
        { title: "Run music parser", desc: "Paste the URL into the input field above. The backend parses the song streaming link.", icon: "link" },
        { title: "Save MP3 / audio", desc: "Choose the high quality audio format (MP3/M4A) and download it.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Can I download full albums?", answer: "You can download tracks individually. Paste each song link to save it locally." },
      { question: "What is the audio bitrate?", answer: "We extract the highest quality audio stream served by Bandcamp, typically 128kbps or 192kbps MP3." }
    ]
  },
  "soundcloud": {
    key: "soundcloud",
    route: "/soundcloud-music-downloader",
    title: "SoundCloud Music Downloader - Save SoundCloud Tracks",
    description: "With SoundCloud music downloader, you can save your favorite songs directly to your device in high-quality MP3 format. No sign-ups.",
    eyebrow: "SoundCloud downloader",
    heroTitle: "Download SoundCloud Tracks as MP3",
    heroSubtitle: "Save songs, playlists, and tracks from SoundCloud instantly. Free, secure, and no credentials needed.",
    placeholder: "Paste SoundCloud track link...",
    icon: "cloud_download",
    badge: "SC",
    theme: {
      "--theme-a": "rgba(255, 85, 0, 0.2)",
      "--theme-b": "rgba(255, 51, 0, 0.15)",
      "--theme-accent": "#ff5500",
      "--theme-hot": "#ff3300",
      "--theme-button": "linear-gradient(135deg, #ff5500, #ff3300)",
      "--theme-cta": "linear-gradient(135deg, #ff3300, #ff5500)"
    },
    howToUse: {
      title: "How to download SoundCloud songs",
      steps: [
        { title: "Copy track link", desc: "Copy the share link of the SoundCloud track from the SoundCloud app or website.", icon: "content_copy" },
        { title: "Analyze audio stream", desc: "Paste the track link into the input box above to resolve the audio CDN locations.", icon: "link" },
        { title: "Save MP3 audio", desc: "Click the download button to save the MP3 audio file directly.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Can I download entire playlists?", answer: "Currently, you can download tracks individually. Paste each song's URL to download it." },
      { question: "Are tracks saved as high-quality MP3?", answer: "Yes, our tool extracts the highest available audio stream and saves it in MP3 format." }
    ]
  },
  "ifunny": {
    key: "ifunny",
    route: "/ifunny-video-downloader",
    title: "Download iFunny Videos & Memes - Social Downloader",
    description: "Download iFunny videos, memes, and GIFs in HD quality without any watermark. Save directly to your device with one click.",
    eyebrow: "iFunny Downloader",
    heroTitle: "Save iFunny Videos & Memes",
    heroSubtitle: "Download funny videos, animated GIFs, and memes from iFunny instantly. No watermark.",
    placeholder: "Paste an iFunny post URL...",
    icon: "sentiment_very_satisfied",
    badge: "IF",
    theme: {
      "--theme-a": "rgba(255, 193, 7, 0.18)",
      "--theme-b": "rgba(0, 0, 0, 0.15)",
      "--theme-accent": "#ffc107",
      "--theme-hot": "#ff9800",
      "--theme-button": "linear-gradient(135deg, #ffc107, #111111)",
      "--theme-cta": "linear-gradient(135deg, #111111, #ffc107)"
    },
    howToUse: {
      title: "How to download iFunny videos",
      steps: [
        { title: "Copy iFunny post link", desc: "Tap the share button on the iFunny app or browser post and select copy link.", icon: "content_copy" },
        { title: "Paste in analyzer", desc: "Paste the copied URL in the input field above and let the server fetch the assets.", icon: "link" },
        { title: "Save meme file", desc: "Download the video or GIF directly to your mobile or desktop gallery.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Does it support download watermark removal?", answer: "Yes, our downloader gets the clean original video file without watermarks when available." },
      { question: "Do you support iFunny GIFs?", answer: "Yes, we support downloading static images and animated GIFs from iFunny links." }
    ]
  },
  "douyin": {
    key: "douyin",
    route: "/douyin-video-downloader",
    title: "Download Douyin Videos & Stories - Social Downloader",
    description: "Save public Douyin videos, photo slideshows, and stories without watermarks. Fast online Douyin video downloader.",
    eyebrow: "Douyin Downloader",
    heroTitle: "Download Douyin Videos (No Watermark)",
    heroSubtitle: "Extract high-definition MP4 videos from Douyin links without watermarks. Free and instant.",
    placeholder: "Paste a Douyin link (抖音链接)...",
    icon: "video_library",
    badge: "DY",
    theme: {
      "--theme-a": "rgba(22, 24, 35, 0.35)",
      "--theme-b": "rgba(0, 242, 234, 0.15)",
      "--theme-accent": "#161823",
      "--theme-hot": "#00f2fe",
      "--theme-button": "linear-gradient(135deg, #161823, #00f2fe)",
      "--theme-cta": "linear-gradient(135deg, #00f2fe, #161823)"
    },
    howToUse: {
      title: "How to download Douyin videos (如何下载抖音视频)",
      steps: [
        { title: "Copy share text (复制链接)", desc: "Open Douyin, click share (分享), and choose copy link (复制链接).", icon: "content_copy" },
        { title: "Paste link in parser (粘贴链接)", desc: "Paste the copied link or share text in the downloader above.", icon: "link" },
        { title: "Download MP4 (下载视频)", desc: "Select the high-quality no-watermark MP4 option and click to save.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Does it filter out the Chinese text from the share link?", answer: "Yes. Our analyzer automatically strips any Chinese text and isolates the media URL." },
      { question: "Is the video quality high?", answer: "Yes, it downloads the video in the highest available HD MP4 format." }
    ]
  },
  "bluesky": {
    key: "bluesky",
    route: "/bluesky-video-downloader",
    title: "Bluesky Video Downloader - Save Bluesky Videos & Clips",
    description: "The Bluesky Video Downloader gives you a fast, free, and safe way to download videos without cluttering your device with extra software.",
    eyebrow: "Bluesky Downloader",
    heroTitle: "Save Bluesky Videos & Clips",
    heroSubtitle: "Download videos and clips from Bluesky social posts instantly. 100% free and secure.",
    placeholder: "Paste Bluesky post URL...",
    icon: "cloud",
    badge: "BS",
    theme: {
      "--theme-a": "rgba(0, 133, 255, 0.2)",
      "--theme-b": "rgba(255, 255, 255, 0.12)",
      "--theme-accent": "#0085ff",
      "--theme-hot": "#0055ff",
      "--theme-button": "linear-gradient(135deg, #0085ff, #0055ff)",
      "--theme-cta": "linear-gradient(135deg, #0055ff, #0085ff)"
    },
    howToUse: {
      title: "How to download Bluesky videos",
      steps: [
        { title: "Copy Bluesky link", desc: "Locate the post containing the video on Bluesky, tap share, and copy the link.", icon: "content_copy" },
        { title: "Paste in Bluesky box", desc: "Paste the link into our tool and hit Analyze to process the media streams.", icon: "link" },
        { title: "Download video clip", desc: "Click the download button next to the high quality MP4 format to save it.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Does it support GIF downloads from Bluesky?", answer: "Yes, if the post has an animated GIF, it will be extracted as a standard video or GIF file." },
      { question: "Do I need a Bluesky invite or account?", answer: "No, public post links can be downloaded without any account details." }
    ]
  },
  "kwai": {
    key: "kwai",
    route: "/kwai-video-downloader",
    title: "Kwai Video Downloader - Save Kwai Videos & Stories",
    description: "Download Kwai videos and stories online directly to your device without watermark. Fast, free, and secure.",
    eyebrow: "Kwai Downloader",
    heroTitle: "Download Kwai Videos Offline",
    heroSubtitle: "Save public videos from Kwai instantly without watermark. Works on all mobile and desktop devices.",
    placeholder: "Paste a Kwai video link...",
    icon: "play_circle_filled",
    badge: "KW",
    theme: {
      "--theme-a": "rgba(255, 102, 0, 0.18)",
      "--theme-b": "rgba(20, 20, 20, 0.12)",
      "--theme-accent": "#ff6600",
      "--theme-hot": "#e05300",
      "--theme-button": "linear-gradient(135deg, #ff6600, #1a1a1a)",
      "--theme-cta": "linear-gradient(135deg, #1a1a1a, #ff6600)"
    },
    howToUse: {
      title: "How to download Kwai videos",
      steps: [
        { title: "Copy Kwai share link", desc: "Find the video in the Kwai app, tap share, and click 'Copy Link'.", icon: "content_copy" },
        { title: "Analyze Kwai URL", desc: "Paste the Kwai URL in the downloader input field above to parse media formats.", icon: "link" },
        { title: "Save MP4 file", desc: "Click download next to the HD MP4 option to save the video without logo watermarks.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Are Kwai downloads watermarked?", answer: "Our tool extracts direct CDN links to save Kwai videos without the moving watermark icon when available." },
      { question: "Can I use the tool on iOS devices?", answer: "Yes, it works directly inside mobile Safari on iPhone and iPad." }
    ]
  },
  "telegram": {
    key: "telegram",
    route: "/telegram-video-downloader",
    title: "Download Telegram Videos & Clips - Telegram Saver",
    description: "Easily download public Telegram videos and clips offline. Paste public t.me share links to extract media instantly.",
    eyebrow: "Telegram Downloader",
    heroTitle: "Save Telegram Videos Offline",
    heroSubtitle: "Download videos and clips from public Telegram channel posts instantly. No installation, fast speeds.",
    placeholder: "Paste public Telegram post URL (t.me/...)...",
    icon: "send",
    badge: "TG",
    theme: {
      "--theme-a": "rgba(36, 161, 222, 0.18)",
      "--theme-b": "rgba(0, 136, 204, 0.12)",
      "--theme-accent": "#24a1de",
      "--theme-hot": "#0088cc",
      "--theme-button": "linear-gradient(135deg, #24a1de, #0088cc)",
      "--theme-cta": "linear-gradient(135deg, #0088cc, #24a1de)"
    },
    howToUse: {
      title: "How to download Telegram videos",
      steps: [
        { title: "Copy post share link", desc: "In Telegram, right-click or long-press a message in a public channel and select 'Copy Link'.", icon: "content_copy" },
        { title: "Paste link in downloader", desc: "Paste the public t.me link in our input field above and let the analyzer scan it.", icon: "link" },
        { title: "Download media", desc: "Click download next to the extracted file to save the MP4 video locally.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Can I download videos from private channels?", answer: "No, our tool only supports public posts (t.me links) because it does not authenticate into private accounts." },
      { question: "Is there any limit to the file size?", answer: "Large videos may take longer to process. We recommend links below 150MB for optimal web download speeds." }
    ]
  },
  "canva": {
    key: "canva",
    route: "/canva-downloader",
    title: "Download Canva Designs & Videos - Canva Downloader",
    description: "Extract and download public Canva design previews, videos, and presentation slides offline. Simple online utility.",
    eyebrow: "Canva Downloader",
    heroTitle: "Download Canva Videos & Designs",
    heroSubtitle: "Save public Canva design previews, videos, and slides directly to your local computer.",
    placeholder: "Paste Canva design share URL...",
    icon: "draw",
    badge: "CV",
    theme: {
      "--theme-a": "rgba(0, 196, 204, 0.2)",
      "--theme-b": "rgba(125, 42, 232, 0.14)",
      "--theme-accent": "#00c4cc",
      "--theme-hot": "#7d2ae8",
      "--theme-button": "linear-gradient(135deg, #00c4cc, #7d2ae8)",
      "--theme-cta": "linear-gradient(135deg, #7d2ae8, #00c4cc)"
    },
    howToUse: {
      title: "How to download Canva designs",
      steps: [
        { title: "Copy Canva share link", desc: "Ensure your Canva design is set to public preview share link, and copy the URL.", icon: "content_copy" },
        { title: "Analyze design link", desc: "Paste the design link in the analyzer above to resolve static previews or MP4 clips.", icon: "link" },
        { title: "Save design", desc: "Click the download action to save the generated PDF, image, or MP4 locally.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Can I download private Canva designs?", answer: "No. The design must be shared publicly or set to 'view only link' for our crawler to read the files." },
      { question: "What formats can be downloaded?", answer: "Depending on the design content, you can save it as an MP4 video or JPG preview images." }
    ]
  },
  "reddit": {
    key: "reddit",
    route: "/reddit-video-downloader",
    title: "Download Reddit Videos & Clips - Reddit Downloader",
    description: "Grab Reddit videos and stories with audio from any subreddit. Download clips in full quality to your device in just a few clicks.",
    eyebrow: "Reddit Downloader",
    heroTitle: "Download Reddit Videos with Audio",
    heroSubtitle: "Save video clips and stories from any subreddit instantly as MP4 files with sound sync.",
    placeholder: "Paste a Reddit post link...",
    icon: "forum",
    badge: "RD",
    theme: {
      "--theme-a": "rgba(255, 69, 0, 0.2)",
      "--theme-b": "rgba(206, 227, 248, 0.12)",
      "--theme-accent": "#ff4500",
      "--theme-hot": "#cee3f8",
      "--theme-button": "linear-gradient(135deg, #ff4500, #cee3f8)",
      "--theme-cta": "linear-gradient(135deg, #cee3f8, #ff4500)"
    },
    howToUse: {
      title: "How to download Reddit videos",
      steps: [
        { title: "Copy Reddit link", desc: "Locate the Reddit post containing the video and copy the share link.", icon: "content_copy" },
        { title: "Paste in Reddit analyzer", desc: "Paste the link into the analyzer above to merge video and audio tracks.", icon: "link" },
        { title: "Download MP4", desc: "Select the high quality download button to save the MP4 video to your device.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Why do some downloaders fail to save audio?", answer: "Reddit hosts video and audio separately. Our tool merges them on our server so your downloaded MP4 has sound." },
      { question: "Can I download NSFW subreddits?", answer: "Yes, public videos from all subreddits can be parsed by our tool." }
    ]
  },
  "likee": {
    key: "likee",
    route: "/likee-video-downloader",
    title: "Download Likee Videos & Reels - Likee Downloader",
    description: "Download Likee videos and reels directly from your browser without any app or login. Grab content without watermarks instantly.",
    eyebrow: "Likee Downloader",
    heroTitle: "Save Likee Videos (No Watermark)",
    heroSubtitle: "Save Likee videos and clips offline without watermarks. Free and compatible with all browsers.",
    placeholder: "Paste Likee video URL...",
    icon: "play_circle",
    badge: "LK",
    theme: {
      "--theme-a": "rgba(255, 0, 127, 0.18)",
      "--theme-b": "rgba(255, 230, 0, 0.12)",
      "--theme-accent": "#ff007f",
      "--theme-hot": "#ffe600",
      "--theme-button": "linear-gradient(135deg, #ff007f, #ffe600)",
      "--theme-cta": "linear-gradient(135deg, #ffe600, #ff007f)"
    },
    howToUse: {
      title: "How to download Likee videos",
      steps: [
        { title: "Copy Likee link", desc: "Find the video in the Likee app, tap share, and select copy link.", icon: "content_copy" },
        { title: "Paste in downloader", desc: "Paste the link in the input box and let our system decode the media files.", icon: "link" },
        { title: "Download video", desc: "Save the high-quality MP4 file without watermarks directly to your gallery.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Does it support no-watermark downloads?", answer: "Yes, it isolates the original source video to save it without the Likee logo." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use without limits." }
    ]
  },
  "terabox": {
    key: "terabox",
    route: "/terabox-downloader",
    title: "TeraBox Video & File Downloader - Save TeraBox Links",
    description: "Download files and videos directly from TeraBox shared links online without installing the TeraBox app. Free, fast.",
    eyebrow: "TeraBox Downloader",
    heroTitle: "Download files from TeraBox Links",
    heroSubtitle: "Save TeraBox video links and files directly from your browser without installing the TeraBox client.",
    placeholder: "Paste TeraBox shared link...",
    icon: "cloud_done",
    badge: "TB",
    theme: {
      "--theme-a": "rgba(0, 102, 255, 0.18)",
      "--theme-b": "rgba(20, 20, 20, 0.12)",
      "--theme-accent": "#0066ff",
      "--theme-hot": "#0052cc",
      "--theme-button": "linear-gradient(135deg, #0066ff, #111111)",
      "--theme-cta": "linear-gradient(135deg, #111111, #0066ff)"
    },
    howToUse: {
      title: "How to download from TeraBox",
      steps: [
        { title: "Copy TeraBox link", desc: "Copy the shared file or video link (terabox.com/...) generated by the app.", icon: "content_copy" },
        { title: "Analyze link", desc: "Paste the URL into our tool. The crawler attempts to parse the direct file link.", icon: "link" },
        { title: "Download file", desc: "Click the download action to save the target video or file directly.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Do I need the TeraBox app installed?", answer: "No, our online tool resolves direct link paths so you can download files directly on your web browser." },
      { question: "Are large files supported?", answer: "Yes, but very large files may fail on slow networks. We recommend smaller files for browser-based saving." }
    ]
  },
  "mixcloud": {
    key: "mixcloud",
    route: "/mixcloud-downloader",
    title: "MixCloud Downloader - Save MixCloud DJ Mixes & Podcasts",
    description: "Simply tap the 'Download' button. Your media will be processed and saved directly to your device gallery instantly.",
    eyebrow: "MixCloud Downloader",
    heroTitle: "Download MixCloud Mixes & Audio",
    heroSubtitle: "Save DJ sets, radio shows, and podcasts from MixCloud in high quality MP3 format offline.",
    placeholder: "Paste MixCloud track link...",
    icon: "library_music",
    badge: "MC",
    theme: {
      "--theme-a": "rgba(80, 200, 120, 0.18)",
      "--theme-b": "rgba(10, 25, 47, 0.14)",
      "--theme-accent": "#50c878",
      "--theme-hot": "#123456",
      "--theme-button": "linear-gradient(135deg, #50c878, #123456)",
      "--theme-cta": "linear-gradient(135deg, #123456, #50c878)"
    },
    howToUse: {
      title: "How to download MixCloud tracks",
      steps: [
        { title: "Copy MixCloud URL", desc: "Open the MixCloud show page and copy its link from the browser's address bar.", icon: "content_copy" },
        { title: "Extract audio streams", desc: "Paste the URL above to let our server fetch the underlying audio tracks.", icon: "link" },
        { title: "Save MP3", desc: "Click the download button to save the audio file directly to your drive.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Is the audio quality degraded?", answer: "No, our tool extracts the original audio stream served by MixCloud for the best sound." },
      { question: "Does it support long DJ sets?", answer: "Yes, you can download mixes of any length (even 2+ hours long)." }
    ]
  },
  "lemon8": {
    key: "lemon8",
    route: "/lemon8-video-downloader",
    title: "Lemon8 Video Downloader - Save Lemon8 Videos & Photos",
    description: "Simply tap the 'Download' button. Your media will be processed and saved directly to your device gallery or downloads folder instantly.",
    eyebrow: "Lemon8 Downloader",
    heroTitle: "Save Lemon8 Videos & Photos",
    heroSubtitle: "Download stories, pictures, and videos from Lemon8 posts easily. Free and fast.",
    placeholder: "Paste Lemon8 post URL...",
    icon: "face",
    badge: "L8",
    theme: {
      "--theme-a": "rgba(255, 234, 0, 0.2)",
      "--theme-b": "rgba(20, 20, 20, 0.12)",
      "--theme-accent": "#ffea00",
      "--theme-hot": "#e0cc00",
      "--theme-button": "linear-gradient(135deg, #ffea00, #111111)",
      "--theme-cta": "linear-gradient(135deg, #111111, #ffea00)"
    },
    howToUse: {
      title: "How to download Lemon8 posts",
      steps: [
        { title: "Copy Lemon8 link", desc: "Open the Lemon8 app, tap the share icon on the post, and copy link.", icon: "content_copy" },
        { title: "Analyze post", desc: "Paste the link in our analyzer tool. The system extracts the active images or video files.", icon: "link" },
        { title: "Save media", desc: "Choose the high-quality format option and download it to your folder.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Does it download photos as well?", answer: "Yes, it parses all photos from Lemon8 slide posts so you can download them." },
      { question: "Is a login required?", answer: "No, you can download public Lemon8 posts without an account." }
    ]
  },
  "vk": {
    key: "vk",
    route: "/vk-video-downloader",
    title: "VK Video Downloader - Download Videos & Clips from VK",
    description: "Why users love downloading VK videos using Social Downloader: Free, fast, and high quality. Save VK clips easily.",
    eyebrow: "VK Video Downloader",
    heroTitle: "Download VK Videos & Clips",
    heroSubtitle: "Save videos and clips from VK (VKontakte) in high quality to your device instantly.",
    placeholder: "Paste a VK video post link...",
    icon: "account_tree",
    badge: "VK",
    theme: {
      "--theme-a": "rgba(0, 119, 255, 0.18)",
      "--theme-b": "rgba(10, 25, 47, 0.12)",
      "--theme-accent": "#0077ff",
      "--theme-hot": "#0055cc",
      "--theme-button": "linear-gradient(135deg, #0077ff, #0055cc)",
      "--theme-cta": "linear-gradient(135deg, #0055cc, #0077ff)"
    },
    howToUse: {
      title: "How to download VK videos",
      steps: [
        { title: "Copy VK link", desc: "Locate the video on VK, click the share menu, and select 'Copy Link'.", icon: "content_copy" },
        { title: "Analyze link", desc: "Paste the VK video link in our parser to fetch available resolutions.", icon: "link" },
        { title: "Download video", desc: "Select the desired MP4 quality format and download it.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "What resolutions are available?", answer: "We support resolutions ranging from 360p up to 1080p HD, depending on the source upload." },
      { question: "Does it support VK clips?", answer: "Yes, you can copy the link of short VK clips and download them easily." }
    ]
  },
  "dailymotion": {
    key: "dailymotion",
    route: "/dailymotion-video-downloader",
    title: "Dailymotion Video Downloader - Save Videos & Audio",
    description: "Download Dailymotion videos in HD, MP4, and extract audio tracks online instantly. Safe, free, and cross-device compatible.",
    eyebrow: "Dailymotion Downloader",
    heroTitle: "Save Dailymotion Videos in HD",
    heroSubtitle: "Extract and download Dailymotion videos in high-quality MP4 formats without any registration.",
    placeholder: "Paste Dailymotion video link...",
    icon: "featured_video",
    badge: "DM",
    theme: {
      "--theme-a": "rgba(0, 102, 220, 0.18)",
      "--theme-b": "rgba(20, 20, 20, 0.12)",
      "--theme-accent": "#0066dc",
      "--theme-hot": "#003399",
      "--theme-button": "linear-gradient(135deg, #0066dc, #003399)",
      "--theme-cta": "linear-gradient(135deg, #003399, #0066dc)"
    },
    howToUse: {
      title: "How to download Dailymotion videos",
      steps: [
        { title: "Copy Dailymotion URL", desc: "Find the video on Dailymotion and copy the URL from the browser.", icon: "content_copy" },
        { title: "Paste in downloader", desc: "Paste the link in the input form and click Analyze to read the stream index.", icon: "link" },
        { title: "Download MP4", desc: "Select the video resolution (SD/HD) and save the file to your computer.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Can I extract audio only?", answer: "Yes, we support extracting the audio channel as an MP3/M4A under the 'More formats' menu." },
      { question: "Is there a limit on download speed?", answer: "No, downloads are processed at maximum speeds using our direct-proxy system." }
    ]
  },
  "mx-takatak": {
    key: "mx-takatak",
    route: "/mx-takatak-video-downloader",
    title: "MX TakaTak Video Downloader - Save Short Clips - Social Downloader",
    description: "Download MX TakaTak videos and clips directly to your device without watermark. Fast, secure, and free.",
    eyebrow: "MX TakaTak Downloader",
    heroTitle: "Download MX TakaTak Videos",
    heroSubtitle: "Save short video clips from MX TakaTak directly to your mobile gallery without watermark logos.",
    placeholder: "Paste MX TakaTak URL...",
    icon: "play_arrow",
    badge: "MX",
    theme: {
      "--theme-a": "rgba(255, 64, 129, 0.18)",
      "--theme-b": "rgba(20, 20, 20, 0.12)",
      "--theme-accent": "#ff4081",
      "--theme-hot": "#c51162",
      "--theme-button": "linear-gradient(135deg, #ff4081, #c51162)",
      "--theme-cta": "linear-gradient(135deg, #c51162, #ff4081)"
    },
    howToUse: {
      title: "How to download MX TakaTak videos",
      steps: [
        { title: "Copy video link", desc: "Open the MX TakaTak app, tap share on the video, and click 'Copy Link'.", icon: "content_copy" },
        { title: "Analyze video URL", desc: "Paste the link in our downloader. The analyzer searches for the direct file path.", icon: "link" },
        { title: "Download video", desc: "Click the download button next to the HD MP4 file to save it.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Does it support no-watermark downloads?", answer: "Yes, it gets the original video file without watermark branding." },
      { question: "Is there any limit to downloads?", answer: "No, you can download as many videos as you want." }
    ]
  },
  "whatsapp-dp": {
    key: "whatsapp-dp",
    route: "/whatsapp-dp-downloader",
    title: "WhatsApp DP Downloader - View & Save Profile Pictures HD",
    description: "Click the 'Download' button to fetch the full-size profile picture in HD quality. Why choose WhatsApp DP Downloader.",
    eyebrow: "WhatsApp DP Downloader",
    heroTitle: "WhatsApp Profile Picture Downloader",
    heroSubtitle: "View full-size profile pictures (DP) in HD quality and download them. Safe, fast, and anonymous.",
    placeholder: "Enter WhatsApp phone number with country code...",
    icon: "chat",
    badge: "WDP",
    theme: {
      "--theme-a": "rgba(37, 211, 102, 0.2)",
      "--theme-b": "rgba(10, 25, 47, 0.12)",
      "--theme-accent": "#25d366",
      "--theme-hot": "#128c7e",
      "--theme-button": "linear-gradient(135deg, #25d366, #128c7e)",
      "--theme-cta": "linear-gradient(135deg, #128c7e, #25d366)"
    },
    howToUse: {
      title: "How to download WhatsApp profile pictures",
      steps: [
        { title: "Get Phone Number", desc: "Locate the target phone number including country code (e.g. +1... or +91...).", icon: "content_copy" },
        { title: "Enter in analyzer", desc: "Type or paste the number into the input field above and click Analyze.", icon: "link" },
        { title: "Save profile photo", desc: "Click the download button to fetch and save the full size profile DP in HD.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Can I view the DP of anyone?", answer: "Yes, provided the user's privacy settings allow their profile picture to be visible to public or everyone." },
      { question: "Do you notify the user?", answer: "No, this check is processed through public WhatsApp API channels anonymously. The owner is not notified." }
    ]
  },
  "rednote": {
    key: "rednote",
    route: "/rednote-video-downloader",
    title: "Download RedNote Videos & Clips - Xiaohongshu Downloader",
    description: "Just fast, reliable downloads on any device. Why Social Downloader is the ultimate RedNote video downloader.",
    eyebrow: "RedNote Xiaohongshu Downloader",
    heroTitle: "Download RedNote Videos (No Watermark)",
    heroSubtitle: "Save high-quality videos and clips from RedNote (Xiaohongshu) to your device without watermark.",
    placeholder: "Paste a RedNote (Xiaohongshu) share link...",
    icon: "note",
    badge: "RN",
    theme: {
      "--theme-a": "rgba(255, 36, 66, 0.2)",
      "--theme-b": "rgba(20, 20, 20, 0.12)",
      "--theme-accent": "#ff2442",
      "--theme-hot": "#d0102b",
      "--theme-button": "linear-gradient(135deg, #ff2442, #1a1a1a)",
      "--theme-cta": "linear-gradient(135deg, #1a1a1a, #ff2442)"
    },
    howToUse: {
      title: "How to download RedNote videos",
      steps: [
        { title: "Copy share link", desc: "Open the RedNote app, click share on the post, and copy the link from the menu.", icon: "content_copy" },
        { title: "Paste link in box", desc: "Paste the copied URL in the analyzer above to decode the direct media streams.", icon: "link" },
        { title: "Download video", desc: "Select the no-watermark HD MP4 option to save the video file directly.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Can I download pictures from RedNote posts?", answer: "Yes. If the post contains images, our tool extracts all photos in original high resolution." },
      { question: "Does it support no-watermark video downloads?", answer: "Yes, it gets the original video stream directly without watermark overlays." }
    ]
  },
  "metaai": {
    key: "metaai",
    route: "/metaai-downloader",
    title: "Meta AI Downloader - Save Meta AI Videos & Images",
    description: "Simply tap the 'Download' button. Your media will be processed and saved directly to your device gallery or downloads folder instantly.",
    eyebrow: "Meta AI Downloader",
    heroTitle: "Save Meta AI Videos & Images",
    heroSubtitle: "Save generated videos and images from Meta AI posts offline to your device.",
    placeholder: "Paste Meta AI share link...",
    icon: "psychology",
    badge: "MAI",
    theme: {
      "--theme-a": "rgba(0, 132, 255, 0.2)",
      "--theme-b": "rgba(217, 70, 239, 0.12)",
      "--theme-accent": "#0084ff",
      "--theme-hot": "#d946ef",
      "--theme-button": "linear-gradient(135deg, #0084ff, #d946ef)",
      "--theme-cta": "linear-gradient(135deg, #d946ef, #0084ff)"
    },
    howToUse: {
      title: "How to download Meta AI media",
      steps: [
        { title: "Copy share link", desc: "Tap the share button on the Meta AI generation or message thread and copy link.", icon: "content_copy" },
        { title: "Paste in downloader", desc: "Paste the link in our analyzer above to find the active image or video.", icon: "link" },
        { title: "Save generated media", desc: "Select the high resolution option and download it to your folder.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "What formats does it support?", answer: "It supports saving generated images as JPG/PNG and video results as MP4 files." },
      { question: "Is it free to use?", answer: "Yes, our downloader is completely free without limits." }
    ]
  },
  "kick": {
    key: "kick",
    route: "/kick-video-downloader",
    title: "Kick Video Downloader - Save Kick Streams, Clips & VODs",
    description: "Key features of Kick Downloader: Download without watermarks, high quality, and direct downloads. Works on any device.",
    eyebrow: "Kick Downloader",
    heroTitle: "Save Kick Streams & Clips",
    heroSubtitle: "Download public Kick streams, VODs, and highlights in high-definition MP4 format.",
    placeholder: "Paste a Kick clip or VOD link...",
    icon: "sports_esports",
    badge: "KK",
    theme: {
      "--theme-a": "rgba(83, 252, 24, 0.2)",
      "--theme-b": "rgba(15, 23, 42, 0.15)",
      "--theme-accent": "#53fc18",
      "--theme-hot": "#0f172a",
      "--theme-button": "linear-gradient(135deg, #53fc18, #0f172a)",
      "--theme-cta": "linear-gradient(135deg, #0f172a, #53fc18)"
    },
    howToUse: {
      title: "How to download Kick videos",
      steps: [
        { title: "Copy Kick video link", desc: "Copy the URL of the VOD, stream highlight, or clip from Kick's share menu.", icon: "content_copy" },
        { title: "Paste in analyzer", desc: "Paste the URL into our tool above to scan the page elements and index video files.", icon: "link" },
        { title: "Download VOD", desc: "Click the download option to save the high-quality MP4 file to your device.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Can I download full-length Kick VODs?", answer: "Yes, we support downloading full VODs, though large files may take longer to process." },
      { question: "Does it support no-watermark downloads?", answer: "Yes, all files are saved in their raw streaming formats without additional watermarks." }
    ]
  },
  "9gag": {
    key: "9gag",
    route: "/9gag-video-downloader",
    title: "9GAG Video Downloader - Save 9GAG Videos & GIFs",
    description: "Download videos and animated GIFs from 9GAG. Free, fast, and no registration required. Save funny content offline.",
    eyebrow: "9GAG Downloader",
    heroTitle: "Download 9GAG Videos & GIFs",
    heroSubtitle: "Save public videos, memes, and animated GIFs from 9GAG to your device instantly.",
    placeholder: "Paste a 9GAG post link...",
    icon: "insert_emoticon",
    badge: "9G",
    theme: {
      "--theme-a": "rgba(0, 0, 0, 0.22)",
      "--theme-b": "rgba(255, 255, 255, 0.12)",
      "--theme-accent": "#000000",
      "--theme-hot": "#ffffff",
      "--theme-button": "linear-gradient(135deg, #111111, #444444)",
      "--theme-cta": "linear-gradient(135deg, #ffffff, #111111)"
    },
    howToUse: {
      title: "How to download 9GAG videos",
      steps: [
        { title: "Copy 9GAG share link", desc: "Tap the share icon on the 9GAG post containing the media, and select copy link.", icon: "content_copy" },
        { title: "Paste in downloader", desc: "Paste the URL in our input field above and let the analyzer fetch the media files.", icon: "link" },
        { title: "Download media file", desc: "Click download next to the extracted file to save the MP4 video or GIF.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Are files saved in HD?", answer: "Yes, our tool extracts the highest quality formats available from the 9GAG servers." },
      { question: "Do I need any special software?", answer: "No. The downloader is completely web-based and runs in any modern browser." }
    ]
  },
  "twitch": {
    key: "twitch",
    route: "/twitch-video-downloader",
    title: "Download Twitch Videos & Clips - Save Twitch VODs",
    description: "What sets Social Downloader apart is its direct downloading system, which allows users to save Twitch clips and VODs straight to their device.",
    eyebrow: "Twitch Downloader",
    heroTitle: "Download Twitch VODs & Clips",
    heroSubtitle: "Save Twitch clips, highlights, and full VOD broadcasts offline in high resolution instantly.",
    placeholder: "Paste a Twitch clip or VOD link...",
    icon: "videogame_asset",
    badge: "TW",
    theme: {
      "--theme-a": "rgba(145, 70, 255, 0.2)",
      "--theme-b": "rgba(100, 65, 165, 0.14)",
      "--theme-accent": "#9146ff",
      "--theme-hot": "#6441a5",
      "--theme-button": "linear-gradient(135deg, #9146ff, #6441a5)",
      "--theme-cta": "linear-gradient(135deg, #6441a5, #9146ff)"
    },
    howToUse: {
      title: "How to download Twitch videos",
      steps: [
        { title: "Copy Twitch link", desc: "Locate the clip or VOD page on Twitch and copy the link from the share dialog or URL bar.", icon: "content_copy" },
        { title: "Paste in analyzer", desc: "Paste the URL in the input field above. Our parser isolates the source stream files.", icon: "link" },
        { title: "Save Twitch video", desc: "Choose the desired quality resolution (e.g. 1080p60) and download it.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Can I download full stream VODs?", answer: "Yes, we support downloading full VOD archives, though please note that downloading several-hour-long videos takes more time." },
      { question: "Is there any watermark on Twitch clips?", answer: "No. The clips are saved in their raw, original formats without logo watermarks." }
    ]
  },
  "loom": {
    key: "loom",
    route: "/loom-video-downloader",
    title: "Download Loom Videos Offline - Save Loom Videos",
    description: "Your media will be processed and saved directly to your device gallery or downloads folder instantly. Unlimited free downloads.",
    eyebrow: "Loom Downloader",
    heroTitle: "Download Loom Videos Offline",
    heroSubtitle: "Save Loom videos, presentation recordings, and screen shares to your computer in HD MP4 format.",
    placeholder: "Paste public Loom video URL...",
    icon: "screen_share",
    badge: "LM",
    theme: {
      "--theme-a": "rgba(98, 93, 245, 0.18)",
      "--theme-b": "rgba(233, 60, 122, 0.12)",
      "--theme-accent": "#625df5",
      "--theme-hot": "#e93c7a",
      "--theme-button": "linear-gradient(135deg, #625df5, #e93c7a)",
      "--theme-cta": "linear-gradient(135deg, #e93c7a, #625df5)"
    },
    howToUse: {
      title: "How to download Loom videos",
      steps: [
        { title: "Copy Loom video link", desc: "Copy the shareable view link of the Loom video from the browser tab or share sheet.", icon: "content_copy" },
        { title: "Paste in downloader", desc: "Paste the link in the box above to extract the direct MP4 video streams.", icon: "link" },
        { title: "Download HD video", desc: "Click the download action to save the video file directly to your system.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Can I download password-protected Loom videos?", answer: "No. Only public or password-free Loom video URLs can be analyzed by our server." },
      { question: "What file extension is used?", answer: "The video will be saved as a standard MP4 file, compatible with all video players." }
    ]
  },
  "sharechat": {
    key: "sharechat",
    route: "/sharechat-video-downloader",
    title: "ShareChat Video Downloader - Save Status & Videos",
    description: "Download videos, statuses, and clips from ShareChat in HD without watermark. Free, safe, and works on all devices.",
    eyebrow: "ShareChat Downloader",
    heroTitle: "Download ShareChat Videos",
    heroSubtitle: "Save statuses, funny clips, and videos from ShareChat directly to your gallery without watermarks.",
    placeholder: "Paste a ShareChat video link...",
    icon: "comment",
    badge: "SC",
    theme: {
      "--theme-a": "rgba(235, 87, 87, 0.18)",
      "--theme-b": "rgba(20, 20, 20, 0.12)",
      "--theme-accent": "#eb5757",
      "--theme-hot": "#d03a3a",
      "--theme-button": "linear-gradient(135deg, #eb5757, #1a1a1a)",
      "--theme-cta": "linear-gradient(135deg, #1a1a1a, #eb5757)"
    },
    howToUse: {
      title: "How to download ShareChat videos",
      steps: [
        { title: "Copy share link", desc: "Find the video in the ShareChat app, tap share, and copy the link.", icon: "content_copy" },
        { title: "Paste link in parser", desc: "Paste the link into the analyzer above to resolve direct video links.", icon: "link" },
        { title: "Download video", desc: "Click the download button next to the HD MP4 file to save it without watermark.", icon: "download_for_offline" }
      ]
    },
    faq: [
      { question: "Does it support no-watermark downloads?", answer: "Yes, it retrieves the raw MP4 video directly without logo overlays." },
      { question: "Does it work on Android and iOS?", answer: "Yes, it works directly inside mobile browsers without installing any app." }
    ]
  }
};
