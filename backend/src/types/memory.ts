export interface MemoryRecord {
  id: string;
  conversation_id: string;
  type: string;
  content: string;
  embedding: number;
  metadata: Record<string, unknown>;
  created_at: Date;
}

export interface RetrievedMemory
  extends MemoryRecord {
    similarity: number;
}
