import { config } from '../utils/configs';

export async function sendChatwootMessage(
  conversationId: number, 
  content: string,
  isPrivate = false
): Promise<boolean> {
  try {
    const response = await fetch(
      `${config.chatwoot.apiUrl}/accounts/${config.chatwoot.accountId}/conversations/${conversationId}/messages`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api_access_token': config.chatwoot.apiToken,
        },
        body: JSON.stringify({
          content,
          message_type: 'outgoing',
          private: isPrivate,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Chatwoot API error: ${response.status} ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Error sending Chatwoot message:', error);
    return false;
  }
}

export function verifyWebhookSignature(body: string, signature: string): boolean {
  // In a production environment, implement proper signature verification
  // using the webhook secret from Chatwoot
  
  // For the demo, we'll return true, but in production you would:
  // 1. Create HMAC using the webhook secret
  // 2. Compare it with the provided signature
  
  return true;
}


