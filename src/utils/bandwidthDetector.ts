/**
 * Detects if the user is on a low bandwidth connection
 * Uses Network Information API, connection type, and download speed estimation
 */
export const detectLowBandwidth = async (): Promise<boolean> => {
  // Check if Network Information API is available
  const connection = (navigator as any).connection || 
                    (navigator as any).mozConnection || 
                    (navigator as any).webkitConnection;

  if (connection) {
    // Check connection type
    const effectiveType = connection.effectiveType;
    const saveData = connection.saveData;
    const downlink = connection.downlink;

    // User has explicitly enabled data saver mode
    if (saveData) {
      return true;
    }

    // Slow connection types
    if (effectiveType === "slow-2g" || effectiveType === "2g") {
      return true;
    }

    // Check downlink speed (Mbps)
    // Consider < 1.5 Mbps as low bandwidth (good for 360p video, but slow for heavy content)
    if (downlink && downlink < 1.5) {
      return true;
    }
  }

  // Fallback: Check user agent for mobile and assume potential low bandwidth
  // This is a heuristic - mobile connections can vary widely
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  // Additional check: Try to measure actual download speed with a small resource
  try {
    const startTime = performance.now();
    // Use a small, reliable asset for bandwidth testing
    const testUrl = "/vite.svg";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout
    
    const response = await fetch(testUrl, { 
      cache: "no-store",
      method: "HEAD",
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    
    const endTime = performance.now();
    const duration = endTime - startTime;

    // If even a small HEAD request takes > 2 seconds, likely slow connection
    if (duration > 2000) {
      return true;
    }

    // Estimate bandwidth from response
    if (response.headers.get("content-length")) {
      const size = parseInt(response.headers.get("content-length") || "0");
      if (size > 0) {
        const mbps = (size * 8) / (duration * 1000 * 1000); // Convert to Mbps
        if (mbps < 1.5 && mbps > 0) {
          return true;
        }
      }
    }
  } catch (error) {
    // If fetch fails (timeout, network error, etc.), be conservative
    // Only disable animations if it's a timeout (likely slow connection)
    if (error instanceof Error && error.name === "AbortError") {
      return true; // Request timed out, likely slow connection
    }
    // Other errors (CORS, 404, etc.) - allow animations
    console.debug("Bandwidth detection fetch failed:", error);
  }

  // Default: assume good bandwidth unless proven otherwise
  return false;
};

/**
 * Gets connection information for debugging/logging
 */
export const getConnectionInfo = (): Record<string, any> => {
  const connection = (navigator as any).connection || 
                    (navigator as any).mozConnection || 
                    (navigator as any).webkitConnection;

  if (!connection) {
    return { available: false };
  }

  return {
    available: true,
    effectiveType: connection.effectiveType,
    downlink: connection.downlink,
    rtt: connection.rtt,
    saveData: connection.saveData,
    type: connection.type,
  };
};

