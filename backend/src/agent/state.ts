import type { LLMMessage } from "../llm/types.js";
import type {
  AgentSource,
  ToolExecution,
} from "./types.js";

export type AgentState = {
  prompt: string;
  history: LLMMessage[];
  context: string;
  sources: AgentSource[];
  toolHistory: ToolExecution[];
  statusHistory: string[];
  completed: boolean;
};
