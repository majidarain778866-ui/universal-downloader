import { server } from "./server.js";

async function runTest() {
  console.log("=== Starting Downloader Integration Test ===");
  try {
    const port = process.env.PORT || 3000;
    // 1. Test video info retrieval
    const videoUrl = "https://www.youtube.com/watch?v=jNQXAC9IVRw";
    console.log(`Step 1: Fetching video details for: ${videoUrl}`);
    
    const infoResponse = await fetch(`http://localhost:${port}/api/video-info`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: videoUrl })
    });
    
    if (!infoResponse.ok) {
      throw new Error(`Failed to get video info: ${infoResponse.status} ${infoResponse.statusText}`);
    }
    
    const info = await infoResponse.json();
    console.log("Step 1 Success!");
    console.log(`- Title: "${info.title}"`);
    console.log(`- Platform: "${info.platform}"`);
    console.log(`- Found ${info.downloads?.length || 0} download option(s).`);
    
    if (!info.downloads || info.downloads.length === 0) {
      throw new Error("No download options returned in metadata!");
    }
    
    // Find a very small option or the first option to test download streaming
    const option = info.downloads.find(d => d.type === "video" || d.type === "audio") || info.downloads[0];
    console.log(`Step 2: Testing download stream for format: "${option.label}" (${option.resolution})`);
    console.log(`- Download URL: ${option.download_url}`);
    
    const downloadResponse = await fetch(`http://localhost:${port}${option.download_url}`);
    if (!downloadResponse.ok) {
      throw new Error(`Failed to download stream: ${downloadResponse.status} ${downloadResponse.statusText}`);
    }
    
    console.log(`- Status: ${downloadResponse.status}`);
    console.log(`- Content-Type: ${downloadResponse.headers.get("content-type")}`);
    console.log(`- Content-Disposition: ${downloadResponse.headers.get("content-disposition")}`);
    
    // Read the stream to verify bytes are received
    const reader = downloadResponse.body.getReader();
    let totalBytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.length;
      if (totalBytes > 0 && totalBytes < 500 * 1024) {
        // Just print progress initially
        console.log(`- Stream progress: received ${totalBytes} bytes...`);
      }
      // Stop reading after 1MB to save bandwidth/time since we only want to verify the stream works
      if (totalBytes > 1024 * 1024) {
        console.log("- Exceeded 1MB, aborting stream read (success).");
        await reader.cancel();
        break;
      }
    }
    
    console.log(`Step 2 Success! Total verified bytes downloaded: ${totalBytes}`);
    console.log("=== Integration Test Passed Successfully! ===");
  } catch (error) {
    console.error("=== Integration Test Failed ===");
    console.error(error);
    process.exitCode = 1;
  } finally {
    console.log("Shutting down the test server...");
    server.close(() => {
      console.log("Server closed.");
      setTimeout(() => {
        process.exit(process.exitCode || 0);
      }, 100);
    });
  }
}

// Give the server a moment to start listening
setTimeout(runTest, 1000);
