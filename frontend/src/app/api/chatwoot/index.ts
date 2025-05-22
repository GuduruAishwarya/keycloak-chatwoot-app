import { NextApiRequest, NextApiResponse } from 'next';
import { ChatwootWebhookEvent } from '../../../utils/types';
import { verifyWebhookSignature } from '../../../services/chatwoot';
import { sendChatwootMessage } from '../../../services/chatwoot';
import { searchOutlineKb } from '@/services/outline';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Chatwoot webhook received');
  
  // Only accept POST requests
  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify the webhook signature
    const signature = req.headers['x-chatwoot-signature'] as string;
    const rawBody = JSON.stringify(req.body);

    console.log('Webhook headers:', req.headers);
    console.log('Webhook body:', req.body);

    if (!signature || !verifyWebhookSignature(rawBody, signature)) {
      console.error('Invalid webhook signature');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const webhookEvent = req.body as ChatwootWebhookEvent;

    // We're only interested in incoming message events
    if (webhookEvent.event !== 'message_created' || !webhookEvent.message) {
      console.log('Ignoring non-message event:', webhookEvent.event);
      return res.status(200).json({ status: 'ignored' });
    }

    const message = webhookEvent.message;
    const conversationId = webhookEvent.conversation.id;

    console.log('Processing message:', {
      content: message.content,
      conversationId,
      messageId: message.id
    });

    // Check if the message starts with /ask
    if (message.content.startsWith('/ask')) {
      console.log('Processing /ask command:', message.content);
      
      // Extract the query from the message
      const query = message.content.substring(5).trim();
      
      if (!query) {
        await sendChatwootMessage(
          conversationId, 
          "Please provide a question after /ask. For example: `/ask How do I reset my password?`"
        );
        return res.status(200).json({ status: 'processed' });
      }

      try {
        console.log('Searching Outline for query:', query);
        const response = await searchOutlineKb(query) ||'';

          await sendChatwootMessage(conversationId, response);
        
      } catch (error) {
        console.error('Error processing Outline search:', error);
        await sendChatwootMessage(
          conversationId,
          "I'm having trouble accessing the knowledge base. Please try again later."
        );
      }

      return res.status(200).json({ status: 'processed' });
    }

    // For other messages, just acknowledge
    console.log('Ignoring non-ask message');
    return res.status(200).json({ status: 'ignored' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}