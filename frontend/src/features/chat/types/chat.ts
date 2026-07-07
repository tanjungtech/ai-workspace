export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export type Conversation = {
  id: string;
  title: string;
};

export type SendMessageRequest = {
  conversationId: string;
  message: string;
};

export type SendMessageResponse = {
  reply: string;
};
