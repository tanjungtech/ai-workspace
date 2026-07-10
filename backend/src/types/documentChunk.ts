export type DocumentChunk = {
  id: string;
  documentId: string;
  chunkIndex: number;
  content: string;
  embedding: number[] | null;
  createdAt: Date;
};
