import { searchOutlineKb } from '@/services/outline';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only accept GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract the query parameter
    const { q } = req.query;

    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Missing query parameter' });
    }

    // Search the Outline knowledge base
    const articles = await searchOutlineKb(q);

    return res.status(200).json({ articles });
  } catch (error) {
    console.error('Error searching Outline:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}