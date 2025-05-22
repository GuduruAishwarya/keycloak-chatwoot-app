import { sendChatwootMessage, verifyWebhookSignature } from '@/services/chatwoot';
import { searchOutlineKb } from '@/services/outline';
import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const signature = req.headers['x-chatwoot-signature'] as string || '';

  // IMPORTANT: Verify webhook signature in production!
  if (!verifyWebhookSignature(JSON.stringify(req.body), signature)) {
    return res.status(401).send('Invalid signature');
  }

  const event = req.body.event;
  const message = req.body.data?.message;
  const conversationId = req.body.data?.conversation?.id;

  if (event === 'message_created' && message?.content?.startsWith('/api')) {
    const query = message.content.slice(4).trim();

    try {
      const kbContent = await searchOutlineKb(query);

      if (kbContent) {
        await sendChatwootMessage(conversationId, kbContent);
      } else {
        await sendChatwootMessage(conversationId, "Sorry, I couldn't find anything about that.");
      }
    } catch (error) {
      console.error('KB search error:', error);
      await sendChatwootMessage(conversationId, 'Oops, something went wrong while searching the knowledge base.');
    }
  }

  res.status(200).end();
}
