import type { LLMMessage } from "../llm/types.js";

// export type PlannerResponse = {
//   tool: string | null;
// };

export interface AgentSource {
 id: string;
 chunkIndex: number;
 similarity: number;
 preview: string;
}

export interface AgentToolHistory {
  tool: string;
  input: string;
  output: string;
}

export interface AgentResult {
  answer: string;
  context: string;
  sources: AgentSource[];
  toolHistory: AgentToolHistory[];
  statusHistory: string[];
};

export interface PlannerDecision {
  action: "tool" | "answer";
  tool: string | null;
  reason: string;
  done: boolean;
}

export interface AgentState {
  userPrompt: string;
  history: LLMMessage[];
  context: string;
  sources: AgentSource[];
  toolHistory: AgentToolHistory[];
  statusHistory: string[];
}
