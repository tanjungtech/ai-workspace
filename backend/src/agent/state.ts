import type { LLMMessage } from "../llm/types.js";

export interface ToolExecution {
  tool: string;
  input: string;
  output: string;
}

export type AgentState = {
  prompt: string;
  history: LLMMessage[];
  context: string;
  toolHistory: ToolExecution[];
  statusHistory: string[];
  completed: boolean;
};
