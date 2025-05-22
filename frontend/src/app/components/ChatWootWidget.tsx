import { useEffect } from 'react';
import { getKeycloak, initKeycloak } from '../../services/keycloak';
import { config } from '../../utils/configs';

declare global {
  interface Window {
    chatwootSettings?: {
      widget_selection: string;
      websiteToken: string;
      host: string;
      custom_attributes?: Record<string, string>;
      webhook?: {
        url: string;
        events: string[];
        secret: string;
      };
      init?: () => void;
    };
  }
}

const ChatWootWidget = () => {
  useEffect(() => {
    const keycloak = getKeycloak();
    const isAuthenticated = keycloak?.authenticated;

    const user = isAuthenticated
      ? {
          identifier: keycloak?.tokenParsed?.sub,
          name: keycloak?.tokenParsed?.name || keycloak?.tokenParsed?.preferred_username,
          email: keycloak?.tokenParsed?.email,
          avatar_url: keycloak?.tokenParsed?.picture,
        }
      : undefined;

    console.log('keycloak:', keycloak, keycloak?.authenticated, keycloak?.tokenParsed);

    console.log('Chatwoot widget initializing...');
    console.log('Webhook URL:', config.chatwoot.webhookUrl);
    console.log('Chatwoot API URL:', config.chatwoot.apiUrl);

    // Initialize Chatwoot widget settings
    window.chatwootSettings = {
      widget_selection: 'full_widget',
      websiteToken: 'jukBv3MbLeVtvgwvDuxtRG1m', // Your Chatwoot widget token
      host: config.chatwoot.apiUrl.replace('/api/v1', ''), // Base Chatwoot URL without '/api/v1'
      custom_attributes: {
        user_id: keycloak?.subject,
        email: keycloak?.tokenParsed?.email,
        name: keycloak?.tokenParsed?.name,
      },
      init: initKeycloak(),
    };

    // Set webhook URL to your Next.js API route that handles Chatwoot webhooks
    window.chatwootSettings.webhook = {
      url: config.chatwoot.webhookUrl, // e.g., https://yourdomain.com/api/chatwoot-webhook
      events: ['message_created'],     // Events you want to listen to
      secret: config.chatwoot.webhookSecret, // Your webhook secret from Chatwoot
    };

    console.log('Chatwoot settings:', window.chatwootSettings);

    // Dynamically load the Chatwoot widget script
    const script = document.createElement('script');
    script.src = `${config.chatwoot.apiUrl.replace('/api/v1', '')}/chatwoot.js`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.chatwootSettings?.init) {
        console.log('Initializing Chatwoot widget...');
        window.chatwootSettings.init();
      }
    };

    document.body.appendChild(script);

  }, []);

  return null;
};

export default ChatWootWidget;
