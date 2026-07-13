export type Source = {
  documentId: string;
  documentName: string;
  chunkIndex: number;
  similarity: number;
  preview: string;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  status?: string;
  content: string;
  sources?: Source[];
  statusHistory?: string[];
};

export type ChatResponse = {
  conversation: {
    id: string;
    title: string;
  };
  assistantMessage: ChatMessage;
  sources: Source[];
};
