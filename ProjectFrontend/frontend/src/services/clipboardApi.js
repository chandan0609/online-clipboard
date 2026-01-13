const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

/**
 * Fetch clipboard content by ID
 * GET /api/clipboard/:id/
 */
// clipboardApi.js
export async function fetchClipboard(shortCode) {
  const response = await fetch(
    `${BASE_URL}/c/${shortCode}/`
  );
  if (!response.ok) throw new Error("Failed");
  return response.json();
}

