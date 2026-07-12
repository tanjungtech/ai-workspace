export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
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

export type Source = {
  documentId: string;
  documentName: string;
  chunkIndex: number;
  similarity: number;
  preview: string;
};

export type ChatResponse = {
  answer: string;
  sources: Source[];
};
