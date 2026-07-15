export type PlannerResponse = {
  tool: string | null;
};

export interface AgentSource {
  documentId: string;
  documentName?: string;
  chunkIndex: number;
  similarity: number;
  preview: string;
}

export interface ToolExecution {
  tool: string;
  input: string;
  output: string;
}

export interface AgentResult {
  answer: string;
  context: string;
  sources: AgentSource[];
  toolHistory: ToolExecution[];
  statusHistory: string[];
};
