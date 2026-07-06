export interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  role:
    | "system"
    | "user"
    | "assistant";
  content: string;
  createdAt: Date;
}
