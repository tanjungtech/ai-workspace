export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export type Conversation = {
  id: string;
  title: string;
};

export type StreamState =
  | "idle"
  | "streaming";

export type SendMessageRequest = {
  conversationId: string;
  message: string;
};

export type SendMessageResponse = {
  reply: string;
};

export type ChatResponse = {
  answer: string;
  sources: {
    id: string;
    chunkIndex: string;
    preview: string;
  }[];
};
