const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

/**
 * Fetch clipboard content by ID
 * GET /api/clipboard/:id/
 */
export async function fetchClipboard(id) {
  const response = await fetch(`${BASE_URL}/api/clipboard/${id}/`);

  if (!response.ok) {
    throw new Error("Failed to fetch clipboard");
  }

  return response.json(); // { content: "..." }
}
