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
  content: string;
  sources?: Source[];
  status?: string;
};
