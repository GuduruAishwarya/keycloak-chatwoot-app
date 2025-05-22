export const config = {
    // Keycloak configuration
    keycloak: {
      serverUrl: process.env.NEXT_PUBLIC_KEYCLOAK_URL || 'http://localhost:8080',
      realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || 'kb-chat-demo',
      clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || 'kb-chat-demo-client-id',
    },
    
    // Outline configuration
    outline: {
      apiUrl: process.env.NEXT_PUBLIC_OUTLINE_API_URL || 'http://localhost:3000/api/v1',
      token: process.env.NEXT_PUBLIC_OUTLINE_API_TOKEN || '',
    },
    
    // Chatwoot configuration
    chatwoot: {
      apiUrl: process.env.NEXT_PUBLIC_CHATWOOT_API_URL || 'http://localhost:3001/api/v1',
      apiToken: process.env.NEXT_PUBLIC_CHATWOOT_API_TOKEN || 'THj6qcnQdTTdFi7tNbX49buu ',
       accountId: process.env.NEXT_PUBLIC_CHATWOOT_ACCOUNT_ID || '1',
      inboxId: process.env.NEXT_PUBLIC_CHATWOOT_INBOX_ID || '1',
      webhookSecret: process.env.NEXT_PUBLIC_CHATWOOT_WEBHOOK_SECRET || 'c22bed33306a4c8e1e22a49dbbe820eca77259f839894941edd0e85ae50aa672',
      webhookUrl: process.env.NEXT_PUBLIC_CHATWOOT_WEBHOOK_URL || 'http://localhost:4000/api/chatwoot-webhook',
    },
  };