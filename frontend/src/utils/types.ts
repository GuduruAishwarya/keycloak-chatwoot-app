export interface User {
    id: string;
    name: string;
    email: string;
  }
  
  export interface OutlineArticle {
    id: string;
    title: string;
    text: string;
    url: string;
  }
  
  export interface ChatwootMessage {
    id: number;
    content: string;
    conversation_id: number;
    message_type: string;
    content_type: string;
    content_attributes: Record<string, any>;
    created_at: string;
    private: boolean;
    source_id: string;
    sender: {
      id: number;
      name: string;
      type: string;
    };
  }
  
  export interface ChatwootWebhookEvent {
    event: string;
    id: number;
    created_at: string;
    conversation: {
      assignee_id: number;
      id: number;
      contact_inbox: {
        id: number;
        contact_id: number;
        inbox_id: number;
      };
    };
    message?: ChatwootMessage;
  }