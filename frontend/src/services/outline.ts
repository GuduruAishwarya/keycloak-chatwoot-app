const OUTLINE_URL = process.env.OUTLINE_URL; // e.g. https://your-outline.example.com
const OUTLINE_API_TOKEN = process.env.OUTLINE_API_TOKEN;

export async function searchOutlineKb(query: string): Promise<string | null> {
  const url = `${OUTLINE_URL}/api/search?query=${encodeURIComponent(query)}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${OUTLINE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Outline API error: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.results.length === 0) return null;

  // Return excerpt or title of first result (customize as needed)
  return data.results[0].excerpt || data.results[0].title || 'No summary available.';
}
